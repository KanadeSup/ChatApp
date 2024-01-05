import ReplyHeader from "./ReplyHeader";
import ReplyBox from "./ReplyBox";

export default function (props) {
  return (
    <div className={"flex flex-col bg-white w-full shadow gap-1 " + props.className}>
      <ReplyHeader setIsClickedReply={props.setIsClickedReply} className={props.className} />
      <ReplyBox
        setIsClickedReply={props.setIsClickedReply}
        message={props.message}
        setMessage={props.setMessage}
        messagesChild={props.messagesChild}
        setMessagesChild={props.setMessagesChild}
        messages={props.messages}
        setMessages={props.setMessages}
        conversationId={props.conversationId}
        isChannel={props.isChannel}
      />
    </div>
  );
}
