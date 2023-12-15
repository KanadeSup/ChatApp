import React, { useEffect, useRef, useState } from "react";
import ReplyList from "./ReplyList";
import MessageReply from "./MessageReply";
import ChatBox from "/components/ChatBox";
import useColleagueStore from "@/storages/useColleagueStore";
import useHubStore from "@/storages/useHubStore";
import { getUserById } from "@/api";
import { SendMessageReply, UpdateMessage, DeleteMessageReply } from "@/utils/hubs";

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
      style={{ height: "calc(100vh - 5.5rem)" }}
      className="flex flex-col overflow-y-scroll"
    >
      <MessageReply message={props.message} setMessage={props.setMessage} />

      <div className="flex items-center px-2">
        <span className="text-xs text-gray-800">
          {props.message.children?.length} {props.message.children?.length > 1 ? "replies" : "reply"}
        </span>
        <div className="block border-b flex-grow mx-2"></div>
      </div>

      <div className="flex flex-col justify-start min-w-[360px]">
        {props.message.children?.map((message) => (
          <MessageReply
            key={message.id}
            message={message}
            setMessages={props.setMessages}
            conversationId={props.conversationId}
            DeleteMessage={(childrenMessage) => {
              DeleteMessageReply(hub, childrenMessage, props.setMessage, props.setMessages);
            }}
            UpdateMessage={(messageId, content) => {
              UpdateMessage(hub, messageId, content, false);
            }}
          />
        ))}
      </div>
      <ChatBox
        SendMessage={(content) =>
          SendMessageReply(
            hub,
            props.message,
            props.conversationId,
            content,
            props.setMessages,
            user,
            props.setMessage,
            props.isChannel
          )
        }
      />
      <div ref={chatBoxRef} />
    </div>
  );
}
