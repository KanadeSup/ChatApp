import ChatBoxHeader from "./ChatBoxHeader";
import NewChatHeader from "./NewChatHeader";
import ChatBoxContent from "./ChatBoxContent";
import useColleagueStore from "@/storages/useColleagueStore";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function (props) {
  const { conversationId } = useParams();
  console.log(conversationId);
  const { isNewChat, setIsNewChat, isChatOption, setIsChatOption } = useColleagueStore();
  useEffect(() => {
    setIsNewChat(false);
    setIsChatOption(false);
  }, [conversationId]);
  
  return (
    <div className="flex flex-col bg-white w-full shadow" key={conversationId}>
      {/* chat box header */}
      {isNewChat ? (
        <NewChatHeader setIsNewChat={setIsNewChat} />
      ) : (
        <ChatBoxHeader
          conversationId={conversationId}
          isChatOption={isChatOption}
          setIsChatOption={setIsChatOption}
        />
      )}

      {/* chat box content */}
      <ChatBoxContent
        isClickedReply={props.isClickedReply}
        setIsClickedReply={props.setIsClickedReply}
      />
    </div>
  );
}
