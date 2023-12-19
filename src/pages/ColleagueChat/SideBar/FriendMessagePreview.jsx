import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User2 } from "lucide-react";
import timeDifferent from "@/utils/timeDifferent";
import convertTime from "../../../utils/convertTime";

export default function FriendMessagePreview(props) {
  const [isHover, setIsHover] = useState(false);
  const ref = useRef()
  const [shortMessage, setShortMessage] = useState()
  // const shortMessage =
  //   props.lastMessage.length > 15
  //     ? props.lastMessage.substring(0, 12) + "..."
  //     : props.lastMessage;
  useEffect(() => {
    if(ref.current) {
      ref.current.innerHTML = props.lastMessage
      ref.current.textContent = ref.current.textContent
    }
  },[props.lastMessage])
  return (
      <div
        className="relative px-1.5 py-2.5 flex rounded-lg items-center hover:bg-gray-100 cursor-pointer"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <div className="relative">
          <Avatar>
            <AvatarImage src={props.avatar} alt="@shadcn" />
            <AvatarFallback className="bg-gray-300">
              <User2 />
            </AvatarFallback>
          </Avatar>
          <div
            className={`${
              props.isOnline ? "bg-green-600" : "bg-red-600"
            } absolute
            border-white border-2 rounded-full p-1 right-0 bottom-0`}
          ></div>
        </div>
        <div className="ml-1 flex-1">
          <div className="flex items-center justify-between relative bottom-0.5">
            <p className={`${props.isRead ? "" : "font-bold"} text-sm truncate w-24`}>
              {props.name}
            </p>
            <p
              className={`${
                props.isRead ? "" : "font-bold"
              } text-xs text-gray-600`}
            >
              {convertTime(props.time)}
            </p>
          </div>
          <p
            className={`${
              props.isRead ? "" : "font-bold"
            } text-gray-900 mt-1 text-sm truncate w-40`
            }
            ref={ref}
          >
          </p>
        </div>

        {/* Hiện more khi hover */}
        {/* {isHover && (
        <div
          style={{
            boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.4)", // This line adds the shadow
          }}
          className="flex absolute right-2 justify-between items-center bg-white w-7 h-7 rounded"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.0049 16.005L12.0049 15.995"
              stroke="#323232"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />{" "}
            <path
              d="M12.0049 12.005L12.0049 11.995"
              stroke="#323232"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />{" "}
            <path
              d="M12.0049 8.005L12.0049 7.995"
              stroke="#323232"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />{" "}
          </svg>
        </div>
      )} */}
      </div>
  );
}
