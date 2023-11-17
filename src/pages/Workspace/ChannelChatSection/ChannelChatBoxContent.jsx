import Message from "../../../components/Message";
import ChatBox from "/components/ChatBox";
import ReplySection from "../../../components/ReplySection";
import ChannelUtility from "./ChannelUtility";

export default function ChannelChatBoxContent(props) {
  return (
    <div className="flex flex-row bg-white">
      <div
        style={{ height: "calc(100vh - 4rem)" }}
        className="flex flex-col flex-grow"
      >
        <div className="flex flex-col justify-start overflow-y-scroll min-w-[480px]" >
          <Message setIsClickedReply={props.setIsClickedReply} setIsClickedChannelUtility={props.setIsClickedChannelUtility}/>
          <Message setIsClickedReply={props.setIsClickedReply} setIsClickedChannelUtility={props.setIsClickedChannelUtility}/>
          <Message setIsClickedReply={props.setIsClickedReply} setIsClickedChannelUtility={props.setIsClickedChannelUtility}/>
          <Message setIsClickedReply={props.setIsClickedReply} setIsClickedChannelUtility={props.setIsClickedChannelUtility}/>
          <Message setIsClickedReply={props.setIsClickedReply} setIsClickedChannelUtility={props.setIsClickedChannelUtility}/>
          <Message setIsClickedReply={props.setIsClickedReply} setIsClickedChannelUtility={props.setIsClickedChannelUtility}/>
          <Message setIsClickedReply={props.setIsClickedReply} setIsClickedChannelUtility={props.setIsClickedChannelUtility}/>
          <Message setIsClickedReply={props.setIsClickedReply} setIsClickedChannelUtility={props.setIsClickedChannelUtility}/>
          <Message setIsClickedReply={props.setIsClickedReply} setIsClickedChannelUtility={props.setIsClickedChannelUtility}/>
          <Message setIsClickedReply={props.setIsClickedReply} setIsClickedChannelUtility={props.setIsClickedChannelUtility}/>
        </div>
        <ChatBox />
      </div>
      {props.isClickedReply && (
        <ReplySection setIsClickedReply={props.setIsClickedReply} setIsClickedChannelUtility={props.setIsClickedChannelUtility}/>
      )}
      {props.isClickedChannelUtility && (
        <ChannelUtility setIsClickedChannelUtility={props.setIsClickedChannelUtility} />
      )}
    </div>
  );
}
