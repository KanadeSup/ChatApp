import ChatBoxHeader from "./ChatBoxHeader";
import NewChatHeader from "./NewChatHeader";
import ChatBoxContent from "./ChatBoxContent";


export default function (props) {
  return (
    <div className="flex flex-col bg-white flex-grow shadow">
      {/* chat box header */}
      {props.isNewChat ? (
        <NewChatHeader setIsNewChat={props.setIsNewChat} />
      ) : (
        <ChatBoxHeader
          isChatOption={props.isChatOption}
          setIsChatOption={props.setIsChatOption}
        />
      )}

      {/* chat box content */}
      <ChatBoxContent isClickedReply={props.isClickedReply} setIsClickedReply={props.setIsClickedReply} />
    </div>
  );
}
