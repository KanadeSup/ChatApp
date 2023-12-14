import React, { useEffect, useRef, useState } from "react";
import ReplyList from "./ReplyList";
import MessageReply from "./MessageReply";
import ChatBox from "/components/ChatBox";
import useColleagueStore from "@/storages/useColleagueStore";
import useHubStore from "@/storages/useHubStore";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { getUserById } from "@/api";


async function SendMessage(
  hub,
  message,
  conversationId,
  content,
  setMessages,
  user,
  setMessage
) {
  if (hub) {
    console.log("conversationId reply: ", conversationId)
    const data = await hub.invoke("SendMessageAsync", {
      //ReceiverId: message.senderId,
      ReceiverId: conversationId,
      Content: content,
      IsChannel: false,
      ReplyTo: message.id
    });
    const message2 = {
      id: data,
      sendAt: new Date().toISOString(),
      senderName: user.lastName + " " + user.firstName,
      senderId: localStorage.getItem("userId"),
      content: content,
      parentId: message.id
    };

    // Update setMessages
    setMessages((currentMessages) => {
      const messages = [...currentMessages]; // Create a new copy of messages
      const parentMessageIndex = messages.findIndex(m => m.id === message2.parentId);

      if (parentMessageIndex !== -1) {
        // If the message has a parent in the current set of messages
        const parentMessage = {...messages[parentMessageIndex]}; // Create a new copy of the parent message

        // Check if parentMessage.children is an array, if not initialize it as an empty array
        if (!Array.isArray(parentMessage.children)) {
          parentMessage.children = [];
        }

        // Add the new message to the children of the parent message
        parentMessage.children = [...parentMessage.children, message2];
        setMessage(parentMessage);
        console.log("Message reply: ", parentMessage);

        // Replace the old parent message with the updated one
        messages[parentMessageIndex] = parentMessage;
      } else {
        // If the message doesn't have a parent in the current set of messages, add it to the set
        messages.push(message2);
      }

      return messages;
    });
  } else {
    console.error("Hub is not connected");
  }
}

export default function ReplyBox(props) {
  const { message, setMessage } = useColleagueStore();
  const { hub } = useHubStore();
  const chatBoxRef = useRef(null);
  const [user, setUser] = useState(null);

  async function fetchData() {
    const data = await getUserById(localStorage.getItem("userId"));
    setUser(data);
  }
  useEffect(() => {
    fetchData();
  }, []);
  
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
              props.conversationId,
              content,
              props.setMessages,
              user,
              setMessage
            )
          }
        />
      <div ref={chatBoxRef} />
    </div>
  );
}
