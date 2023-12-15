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
import useHubStore from "@/storages/useHubStore";
import { InfiniteScroll } from "@/components/InfinityScroll";
import { SendMessage, UpdateMessage, DeleteMessage } from "@/utils/hubs";

export default function ChatBoxContent(props) {
  const { conversationId } = useParams();
  const { hub, setHub } = useHubStore();
  const [messages, setMessages] = useState([]);
  const { isNewMessage, setIsNewMessage } = useIsNewMessage(); // Cập nhập danh sách hiển thị tin nhắn ở sideBar
  const [user, setUser] = useState(null);
  const { isClickedReply, setIsClickedReply, message, setMessage } =
    useColleagueStore();
  const [forceScroll, setForceScroll] = useState({});
  const scrollDivRef = useRef();

  //Lấy thông tin user
  async function fetchData() {
    const data = await getUserById(localStorage.getItem("userId"));
    setUser(data);
  }
  useEffect(() => {
    fetchData();
  }, []);

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

  //Lấy tin nhắn khi vào conversation
  useEffect(() => {
    async function fetchData() {
      const now = new Date();
      const timeCursor = encodeURIComponent(now.toISOString());
      const data = await getMessagesColleague(conversationId, timeCursor, 9);
      // Sắp xếp tin nhắn theo thời gian
      const sortedData = data.sort(
        (a, b) => new Date(a.sendAt) - new Date(b.sendAt)
      );

      setMessages(sortedData);
    }
    fetchData();
  }, [conversationId]);

  const fetchMoreData = async () => {
    if (messages.length === 0) {
      return;
    }
    const timeFirst = messages[0].sendAt;
    const now = new Date(timeFirst);
    const timeCursor = encodeURIComponent(now.toISOString());
    const data = await getMessagesColleague(conversationId, timeCursor, 3);
    // Sắp xếp tin nhắn theo thời gian
    const sortedData = data.sort(
      (a, b) => new Date(a.sendAt) - new Date(b.sendAt)
    );

    setMessages((prev) => [...sortedData, ...prev]);
  };

  // Hub nhận tin nhắn mới
  useEffect(() => {
    if (hub) {
      hub.off("receive_message");
      hub.on("receive_message", (message) => {
        console.log("message đã nhận: ", message);
        setIsNewMessage(true);

        if (message.senderId !== conversationId) {
          return;
        }

        setMessages((currentMessages) => {
          const messages = [...currentMessages]; // Create a new copy of messages
          const newMessage = { ...message }; // Copy the message object to avoid mutation
          const parentMessageIndex = messages.findIndex(
            (m) => m.id === newMessage.parentId
          );
          if (
            newMessage.senderId === conversationId &&
            parentMessageIndex !== -1
          ) {
            // If the message has a parent in the current set of messages
            const parentMessage = { ...messages[parentMessageIndex] }; // Create a new copy of the parent message
            // Check if parentMessage.children is an array, if not initialize it as an empty array
            if (!Array.isArray(parentMessage.children)) {
              parentMessage.children = [];
            }
            // Add the new message to the children of the parent message
            parentMessage.children = [...parentMessage.children, newMessage];
            // Lưu lại tin nhắn để hiển thị trong reply box
            if (parentMessage.id === localStorage.getItem("idMessage")) {
              setMessage(parentMessage);
            }
            // Replace the old parent message with the updated one
            messages[parentMessageIndex] = parentMessage;
          } else {
            // If the message doesn't have a parent in the current set of messages, add it to the set
            messages.push(newMessage);
          }
          return messages;
        });
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
        if (message_updated.parentId === null) {
          setMessages((messages) =>
            messages.map((message) =>
              message.id === message_updated.id ? message_updated : message
            )
          );
        }

        else {
          setMessages((messages) => {
            let updatedParentMessage;
            const updatedMessages = messages.map((message) => {
              if (message.id === message_updated.parentId) {
                const updatedMessage = {
                  ...message,
                  children: message.children.map((child) =>
                    child.id === message_updated.id ? message_updated : child
                  ),
                };
                updatedParentMessage = updatedMessage;
                return updatedMessage;
              } else {
                return message;
              }
            });
            setMessage(updatedParentMessage);
            return updatedMessages;
          });
        }
        // Lưu lại tin nhắn để hiển thị trong reply box
        if (message_updated.id === localStorage.getItem("idMessage")) {
          setMessage(message_updated);
        }
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
        if (message_deleted.parentId === null) {
          setMessages((messages) =>
          messages.filter((message) => message.id !== message_deleted.id)
          );
        }

        else {
          setMessages((messages) => {
            let updatedParentMessage;
            const updatedMessages = messages.map((message) => {
              if (message.id === message_deleted.parentId) {
                const updatedMessage = {
                  ...message,
                  children: message.children.filter(
                    (child) => child.id !== message_deleted.id
                  ),
                };
                updatedParentMessage = updatedMessage;
                return updatedMessage;
              } else {
                return message;
              }
            });
            setMessage(updatedParentMessage);
            return updatedMessages;
          });          
        }
        if (message_deleted.id === localStorage.getItem("idMessage")) {
          setMessage(null);
          setIsClickedReply(false);
        }
        //setIsNewMessage(true);
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

  // scroll to bottom
  const scrollToBottom = () => {
    setForceScroll({});
  };

  useEffect(() => {
    scrollDivRef.current.scrollTop = scrollDivRef.current.scrollHeight;
  }, [forceScroll]);

  return (
    <div className="flex flex-row">
      <div
        style={{ height: "calc(100vh - 3rem)" }}
        className="flex flex-col w-full"
      >
        <InfiniteScroll
          getMore={fetchMoreData}
          invokeHeight={5}
          scrollDivRef={scrollDivRef}
          className="flex flex-col justify-start overflow-y-scroll h-full min-w-[400px]"
        >
          {messages.map((message, index) => (
            <Message
              key={index}
              index={index}
              message={message}
              setMessage={setMessage}
              setIsClickedReply={setIsClickedReply}
              DeleteMessage={(idMessage) =>
                DeleteMessage(hub, idMessage, setMessages, setIsClickedReply)
              }
              UpdateMessage={(idMessage, message) =>
                UpdateMessage(hub, idMessage, message, false)
              }
            />
          ))}
        </InfiniteScroll>
        <ChatBox
          SendMessage={(message) =>
            SendMessage(
              hub,
              conversationId,
              message,
              setMessages,
              setIsNewMessage,
              user,
              scrollToBottom,
              false
            )
          }
        />
      </div>
      {isClickedReply && (
        <ReplySection
          message={message}
          setMessage={setMessage}
          setIsClickedReply={setIsClickedReply}
          messages={messages}
          setMessages={setMessages}
          conversationId={conversationId}
          isChannel={false}
        />
      )}
    </div>
  );
}
