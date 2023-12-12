import Message from "../../../components/Message";
import ChatBox from "/components/ChatBox";
import ReplySection from "../../../components/ReplySection";
import { useEffect, useState, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { getMessagesColleague } from "../../../api";
import useIsNewMessage from "../../../storages/useIsNewMessage";
import { getUserById } from "../../../api";
import useColleagueStore from "@/storages/useColleagueStore";


async function SendMessage(
  hub,
  conversationId,
  message,
  setMessages,
  setIsNewMessage,
  user
) {
  if (hub) {
    const data = await hub.invoke("SendMessageAsync", {
      ReceiverId: conversationId,
      Content: message,
      IsChannel: false,
      ParentId: "83ecc9e6-ea9d-4cf3-ac0f-08dbfa0ea29b"
    });
    setIsNewMessage(true);
    const message2 = {
      id: data,
      sendAt: new Date().toISOString(),
      senderName: user.lastName + " " + user.firstName,
      senderId: localStorage.getItem("userId"),
      content: message,
    };
    setMessages((messages) => [...messages, message2]);
  } else {
    console.error("Hub is not connected");
  }
}

async function UpdateMessage(hub, messageId, message) {
  if (hub) {
    const data = await hub.invoke("UpdateMessageAsync", {
      id: messageId,
      Content: message,
    });
  } else {
    console.error("Hub is not connected");
  }
}

async function DeleteMessage(hub, messageId, setMessages) {
  if (hub) {
    console.log("id message: ", messageId);
    const data = await hub.invoke("DeleteMessageAsync", messageId, true);
    console.log("id message delete: ", data);
    setMessages((messages) =>
      messages.filter((message) => message.id !== messageId)
    );
  } else {
    console.error("Hub is not connected");
  }
}

export default function ChatBoxContent(props) {
  const { conversationId } = useParams();
  const [hub, setHub] = useState(null);
  const [messages, setMessages] = useState([]);
  const { isNewMessage, setIsNewMessage } = useIsNewMessage(); // Cập nhập danh sách hiển thị tin nhắn ở sideBar
  const [user, setUser] = useState(null);
  const { isClickedReply, setIsClickedReply } = useColleagueStore();

  async function fetchData() {
    const data = await getUserById(localStorage.getItem("userId"));
    setUser(data);
  }
  useEffect(() => {
    fetchData();
  }, []);

  console.log("Hellllllllllllllllllllllllllllllllllllllo");

  // Kết nối với hub
  useEffect(() => {
    // check access token is valid or not expired
    if (!localStorage.getItem("token")) {
      setHub(null);
      return;
    }
    async function connect() {
      const connection = new HubConnectionBuilder()
        .withUrl(`https://api.firar.live/chatHub`, {
          accessTokenFactory: () => {
            return localStorage.getItem("token");
          },
        })
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Information)
        .build();
      try {
        await connection.start();
        console.log("connect success");
        setHub(connection);
      } catch (e) {
        console.log("error", e);
      }
    }
    connect();
  }, []);

  // Tự động kéo xuống cuối khi có tin nhắn mới
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  //Lấy tin nhắn khi vào conversation
  useEffect(() => {
    async function fetchData() {
      const now = new Date();
      const timeCursor = encodeURIComponent(now.toISOString());
      const data = await getMessagesColleague(conversationId, timeCursor, 5);
      // Sắp xếp tin nhắn theo thời gian
      const sortedData = data.sort(
        (a, b) => new Date(a.sendAt) - new Date(b.sendAt)
      );

      setMessages(sortedData);
    }
    fetchData();
  }, [conversationId]);

  // Hub nhận tin nhắn mới
  useEffect(() => {
    if (hub) {
      console.log("hub is not null");
      hub.off("receive_message");
      hub.on("receive_message", (message) => {
        console.log("đã chạy receive message");
        if (message.senderId === conversationId)
          setMessages((messages) => [...messages, message]);
        else setMessages((messages) => [...messages]);
        setIsNewMessage(true);
      });
    } else {
      console.error("Hub is not connected");
    }
  }, [hub, conversationId]);

  // Hub nhận tin nhắn update
  useEffect(() => {
    if (hub) {
      hub.off("update_message");
      hub.on("update_message", (message_updated) => {
        console.log("đã chạy update message");
        setMessages((messages) =>
          messages.map((message) =>
            message.id === message_updated.id ? message_updated : message
          )
        );
        setIsNewMessage(true);
      });
    } else {
      console.error("Hub is not connected");
    }
  }, [hub, conversationId]);

  // Hub nhận tin nhắn delete
  useEffect(() => {
    if (hub) {
      hub.off("delete_message");
      hub.on("delete_message", (message_deleted) => {
        console.log("đã chạy delete message");
        setMessages((messages) =>
          messages.filter((message) => message.id !== message_deleted.id)
        );
        setIsNewMessage(true);
      });
    } else {
      console.error("Hub is not connected");
    }
  }, [hub, conversationId]);
  useEffect(() => {
    if (hub) {
      hub.off("error");
      hub.on("error", (error) => {
        console.log("error", error);
      });
    }
  }, [hub]);

  return (
    <div className="flex flex-row">
      <div
        style={{ height: "calc(100vh - 3rem)" }}
        className="flex flex-col w-full"
      >
        <div className="flex flex-col justify-start overflow-y-scroll h-full min-w-[400px]">
          {messages.map((message, index) => (
            <Message
              key={message.id}
              index={index}
              message={message}
              DeleteMessage={(idMessage) =>
                DeleteMessage(hub, idMessage, setMessages)
              }
              UpdateMessage={(idMessage, message) =>
                UpdateMessage(hub, idMessage, message)
              }
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
        <ChatBox
          SendMessage={(message) =>
            SendMessage(
              hub,
              conversationId,
              message,
              setMessages,
              setIsNewMessage,
              user
            )
          }
        />
      </div>
      {isClickedReply && (
        <ReplySection setIsClickedReply={setIsClickedReply} hub={hub} user={user} setMessages={setMessages} />
      )}
    </div>
  );
}
