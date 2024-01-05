import { X } from "lucide-react";

export default function ReplyHeader(props) {
  return (
    <div className={"flex flex-col " + props.className}>
      <div className={"text-[13px] font-semibold h-8 flex justify-between items-center px-4 bg-gray-100 border-b shadow " + props.className}>
        View Reply
        <X
          className="w-6 h-6 text-gray-600 hover:text-gray-800 rounded-full cursor-pointer"
          onClick={() => {
            props.setIsClickedReply(false);
          }}
        />
      </div>
    </div>
  );
}
