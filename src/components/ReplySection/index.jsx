import ReplyHeader from "./ReplyHeader";
import ReplyBox from "./ReplyBox";

export default function (props) {
  console.log("tin nhawns nhajn: ", props.message);
  return (
    <div className="flex flex-col bg-white w-full shadow">
      <ReplyHeader setIsClickedReply={props.setIsClickedReply}/>
      <ReplyBox message={props.message} setMessage={props.setMessage} messages={props.messages} setMessages={props.setMessages} conversationId={props.conversationId} isChannel={props.isChannel}/>
    </div>
  );
}
