import React, { useEffect, useRef, useState } from "react";
import ReplyList from "./ReplyList";
import MessageReply from "./MessageReply";
import ChatBox from "/components/ChatBox";
import useColleagueStore from "@/storages/useColleagueStore";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { getUserById } from "@/api";


async function SendMessage(
  hub,
  message,
  content,
  setMessages,
  user
) {
  if (hub) {
    const data = await hub.invoke("SendMessageAsync", {
      ReceiverId: message.senderId,
      Content: content,
      IsChannel: false,
      ParentId: message.id
    });
    const message2 = {
      id: data,
      sendAt: new Date().toISOString(),
      senderName: user.lastName + " " + user.firstName,
      senderId: localStorage.getItem("userId"),
      content: message,
      parentId: message.id
    };
  } else {
    console.error("Hub is not connected");
  }
}
export default function ReplyBox(props) {
  const { message, setMessage } = useColleagueStore();
  const chatBoxRef = useRef(null);
  const [hub, setHub] = useState(null);
  const [user, setUser] = useState(null);

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

  // Hub nhận tin nhắn mới
  useEffect(() => {
    if (hub) {
      console.log("hub is not null");
      hub.off("receive_message");
      hub.on("receive_message", (message) => {
        console.log("đã chạy receive message");
        // if (message.senderId === conversationId)
        //   setMessages((messages) => [...messages, message]);
        // else setMessages((messages) => [...messages]);
        // setIsNewMessage(true);
      });
    } else {
      console.error("Hub is not connected");
    }
  }, [hub, message.id]);

  console.log("hub: ", hub);
  console.log("user: ", user);
  console.log("message: ", message);
  
  useEffect(() => {
    chatBoxRef.current.scrollIntoView();
  }, []);

  return (
    <div
      style={{ height: "calc(100vh - 5.5rem)"}}
      className="flex flex-col overflow-y-scroll"
    >
      <MessageReply message={message} setMessage={setMessage}/>
      <div className="flex items-center px-2">
        <span className="text-xs text-gray-800">{message.children.length} replies</span>
        <div className="block border-b flex-grow mx-2"></div>
      </div>
      <ReplyList message={message} setMessage={setMessage}/>
      <ChatBox
          SendMessage={(content) =>
            SendMessage(
              hub,
              message,
              content,
              props.setMessages,
              user
            )
          }
        />
      <div ref={chatBoxRef} />
    </div>
  );
}
