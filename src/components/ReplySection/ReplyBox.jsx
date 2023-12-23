import React, { useEffect, useRef, useState } from "react";
import ReplyList from "./ReplyList";
import MessageReply from "./MessageReply";
import ChatBox from "/components/ChatBox";
import useColleagueStore from "@/storages/useColleagueStore";
import useHubStore from "@/storages/useHubStore";
import { getUserById } from "@/api";
import {
  SendMessageReply,
  UpdateMessage,
  DeleteMessageReply,
  SendEmoji,
  DeleteFile,
  DeleteMessage,
} from "@/utils/hubs";
import { getMessagesColleague } from "../../api";

export default function ReplyBox(props) {
  // const { message, setMessage } = useColleagueStore();
  const { hub } = useHubStore();
  const chatBoxRef = useRef(null);
  const [user, setUser] = useState(null);
  // const [messagesChild, setMessagesChild] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getUserById(localStorage.getItem("userId"));
      setUser(data);
    }
    async function fetchMessages() {
      // const now = new Date();
      // const timeCursor = encodeURIComponent(now.toISOString());
      const data = await getMessagesColleague(
        props.conversationId,
        null,
        20,
        props.message.id,
        props.isChannel
      );
      const reversedData = data.reverse();
      props.setMessagesChild(reversedData);
      console.log("data con:", data);
    }
    fetchMessages();
    fetchData();
  }, []);

  useEffect(() => {
    chatBoxRef.current.scrollIntoView();
  }, [props.messagesChild]);

  return (
    <div
      style={{ height: "calc(100vh - 6rem)" }}
      className="flex flex-col overflow-y-scroll gap-1"
    >
      <MessageReply
        message={props.message}
        setMessage={props.setMessage}
        messageHead={true}
        DeleteMessage={(childrenMessage) => {
          DeleteMessage(
            hub,
            props.message.id,
            props.setMessages,
            props.setIsClickedReply,
            props.isChannel
          );
        }}
        DeleteFile={(fileId) => DeleteFile(hub, fileId)}
      />

      <div className="flex items-center px-2">
        <span className="text-sm font-medium text-gray-600">
          {props.message.childCount}{" "}
          {props.message.childCount > 1 ? "replies" : "reply"}
        </span>
        <div className="block border-b flex-grow mx-2"></div>
      </div>

      <div className="flex flex-col justify-start min-w-[360px]">
        {props.messagesChild.map((message) => (
          <MessageReply
            key={message.id}
            message={message}
            DeleteMessage={(childrenMessage) => {
              DeleteMessageReply(
                hub,
                childrenMessage,
                props.setMessage,
                props.setMessagesChild,
                props.setMessages,
                props.isChannel
              );
            }}
            UpdateMessage={(messageId, content) => {
              UpdateMessage(hub, messageId, content, props.isChannel);
            }}
            SendEmoji={(emoji) => {
              SendEmoji(hub, message.id, emoji);
            }}
            DeleteFile={(fileId) => DeleteFile(hub, fileId)}
          />
        ))}
      </div>
      <ChatBox
        SendMessage={(content, files) =>
          SendMessageReply(
            hub,
            props.message,
            props.conversationId,
            content,
            props.setMessages,
            user,
            props.setMessage,
            props.setMessagesChild,
            props.isChannel,
            files
          )
        }
      />
      <div ref={chatBoxRef} />
    </div>
  );
}
