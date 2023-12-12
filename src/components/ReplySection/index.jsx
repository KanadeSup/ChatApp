import ReplyHeader from "./ReplyHeader";
import ReplyBox from "./ReplyBox";

export default function (props) {
  return (
    <div className="flex flex-col bg-white w-full shadow">
      <ReplyHeader setIsClickedReply={props.setIsClickedReply}/>
      <ReplyBox />
    </div>
  );
}
