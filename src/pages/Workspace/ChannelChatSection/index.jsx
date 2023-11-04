import { useState } from "react";
import ChannelHeader from "./ChannelHeader";
import ChannelChatBoxContent from "./ChannelChatBoxContent";

export default function ChannelChatSection(props) {
  const [isClickedReply, setIsClickedReply] = useState(false);
  const [isClickedChannelUtility, setIsClickedChannelUtility] = useState(false);
  return (
    <div className="flex flex-col flex-grow">
      <ChannelHeader
        isClickedChannelUtility={isClickedChannelUtility}
        setIsClickedChannelUtility={setIsClickedChannelUtility}
        setIsClickedReply={setIsClickedReply}
      />
      <ChannelChatBoxContent
        isClickedReply={isClickedReply}
        setIsClickedReply={setIsClickedReply}
        isClickedChannelUtility={isClickedChannelUtility}
        setIsClickedChannelUtility={setIsClickedChannelUtility}
      />
    </div>
  );
}
