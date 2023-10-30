import ChatBoxHeader from "./ChatBoxHeader";
import NewChatHeader from "./NewChatHeader";
import Message from "./Message";
import ChatBox from "/components/ChatBox"

export default function (props) {
  return (
    <div className="flex flex-col h-screen bg-white flex-grow shadow">
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
      <div
        style={{
          height: "calc(100vh - 7rem)",
          width: "calc(100vw - 22rem)",
        }}
        className="flex flex-col justify-start overflow-scroll hover:overflow-y-scroll min-w-[480px]"
      >
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
      </div>

      <ChatBox />
    </div>
  );
}
