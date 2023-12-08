import React, { useEffect, useRef } from "react";
import ReplyList from "./ReplyList";
import MessageReply from "./MessageReply";
import ChatBox from "/components/ChatBox";

export default function ReplyBox() {
  // const chatBoxRef = useRef(null);

  // useEffect(() => {
  //   chatBoxRef.current.scrollIntoView();
  // }, []);

  return (
    <div
      style={{ height: "calc(100vh - 6rem)"}}
      className="flex flex-col overflow-y-scroll"
    >
      <MessageReply />
      <div className="flex items-center px-2">
        <span className="text-xs text-gray-800">10 replies</span>
        <div className="block border-b flex-grow mx-2"></div>
      </div>
      <ReplyList />
      {/* <ChatBox ref={chatBoxRef} /> */}
      <ChatBox />
    </div>
  );
}
