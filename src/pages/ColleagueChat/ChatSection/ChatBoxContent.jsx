import Message from "../../../components/Message";
import ChatBox from "/components/ChatBox";
import ReplySection from "../../../components/ReplySection";

export default function ChatBoxContent(props) {
  return (
    <div className="flex flex-row">
    <div style={{ height: "calc(100vh - 3rem)" }} className="flex flex-col flex-grow">
      <div
        // style={{
        //   height: "calc(100vh - 7rem)",
        //   width: "calc(100vw - 22rem)",
        // }}
        className="flex flex-col justify-start overflow-y-scroll min-w-[400px]"
      >
        <Message setIsClickedReply={props.setIsClickedReply} />
        <Message setIsClickedReply={props.setIsClickedReply} />
        <Message setIsClickedReply={props.setIsClickedReply} />
        <Message setIsClickedReply={props.setIsClickedReply} />
        <Message setIsClickedReply={props.setIsClickedReply} />
        <Message setIsClickedReply={props.setIsClickedReply} />
        <Message setIsClickedReply={props.setIsClickedReply} />
        <Message setIsClickedReply={props.setIsClickedReply} />
        <Message setIsClickedReply={props.setIsClickedReply} />
        <Message setIsClickedReply={props.setIsClickedReply} />
      </div>
      <ChatBox />
    </div>
    {props.isClickedReply && <ReplySection setIsClickedReply={props.setIsClickedReply}/>}
    </div>
  );
}
