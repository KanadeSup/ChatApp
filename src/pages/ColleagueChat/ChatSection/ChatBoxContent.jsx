import Message from "../../../components/Message";
import ChatBox from "/components/ChatBox";
import ReplySection from "../../../components/ReplySection";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { getMessagesColleague } from "../../../api";
import useIsNewMessage from "../../../storages/useIsNewMessage";

function SendMessage(hub, conversationId, message, setMessages, setIsNewMessage) {
  console.log("channelId: ", conversationId, "send message: ", message);

  if (hub) {
    hub.invoke("SendMessageAsync", {
      ReceiverId: conversationId,
      Content: message,
      IsChannel: false,
    });
    console.log("đã gửi");
    // setMessages((messages) => [...messages, message]);
    setIsNewMessage(true);
  } else {
    console.error("Hub is not connected");
  }
}

export default function ChatBoxContent(props) {
  const { conversationId } = useParams();
  const [hub, setHub] = useState(null);
  const [messages, setMessages] = useState([]);
  const { isNewMessage, setIsNewMessage } = useIsNewMessage();

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
      const data = await getMessagesColleague(conversationId, timeCursor, 7);
      // Sắp xếp tin nhắn theo thời gian
      const sortedData = data.sort((a, b) => new Date(a.sendAt) - new Date(b.sendAt));
      
      setMessages(sortedData);
    }
    fetchData();
  }, [conversationId]);  
  

  useEffect(() => {
    console.log("hub: ", hub);
    if (hub) {
      console.log("hub is not null");
      hub.off("receive_message");
      hub.on("receive_message", (message) => {
        console.log("đã chạy receive message");
        setMessages((messages) => [...messages, message]);
        setIsNewMessage(true);
        console.log(isNewMessage)
      });
    } else {
      console.error("Hub is not connected");
    }
  }, [hub, conversationId]);

  return (
    <div className="flex flex-row">
      <div
        style={{ height: "calc(100vh - 3rem)" }}
        className="flex flex-col flex-grow"
      >
        <div className="flex flex-col justify-start overflow-y-scroll h-full min-w-[400px]">
          {messages.map((message, index) => (
            <Message key={message.id} index={index} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
        <ChatBox
          SendMessage={(message) => SendMessage(hub, conversationId, message, setMessages, setIsNewMessage)}
        />
      </div>
      {props.isClickedReply && (
        <ReplySection setIsClickedReply={props.setIsClickedReply} />
      )}
    </div>
  );
}
