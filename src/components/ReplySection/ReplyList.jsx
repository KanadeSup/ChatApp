import MessageReply from "./MessageReply";

export default function ReplyList(props) {
  return (
    <div
      className="flex flex-col justify-start min-w-[360px]"
    >
      {props.message.children.map((message) => (
        <MessageReply
          key={message.id}
          message={message}
          setMessages={props.setMessages}
          conversationId={props.conversationId}
        />
      ))}
    </div>
  );
}
