import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import convertTime from "../utils/convertTime";
import useHubStore from "../storages/useHubStore";
import { PinMessage } from "../utils/hubs";
import { getMessageJump } from "../api";
export default function PinnedMessage(props) {
  const [isHoverUnpin, setIsHoverUnpin] = useState(false);
  const { hub } = useHubStore();

  async function fetchData() {
    const data = await getMessageJump(props.message.id);
    // sort data by sendAt
    data.sort(function (a, b) {
      return new Date(a.sendAt) - new Date(b.sendAt);
    });
    props.setMessages(data);
    console.log("data jump:", data);
    console.log("data nhan:", props.message);
  }

  return (
    <div className="mx-4 border-gray-300">
      <div
        className="flex w-full border bg-white rounded-md p-3"
        style={{ fontFamily: "'Roboto', Arial, sans-serif" }}
      >
        <Avatar className="w-10 h-10 mr-2">
          <AvatarImage src={props.message.senderAvatar} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className="w-full">
          <div className="flex justify-between relative bottom-1">
            <span className="font-bold text-sm">
              {props.message.senderName}
            </span>
    
            <div className="flex relative">
              <button className="text-[11px] px-1 my-0.5 rounded-sm bg-gray-200 text-gray-500 hover:text-gray-700"
              onClick={() => fetchData()}>
                Jump
              </button>
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 hover:bg-gray-200 text-gray-500 hover:text-gray-700 font-bold rounded-full cursor-pointer ml-1"
                xmlns="http://www.w3.org/2000/svg"
                onMouseEnter={() => setIsHoverUnpin(true)}
                onMouseLeave={() => setIsHoverUnpin(false)}
                onClick={() => {
                  PinMessage(hub, props.message.id, false);
                  props.setPinMessages(
                    props.pinMessages.filter(
                      (message) => message.id !== props.message.id
                    )
                  );
                }}
              >
                <path
                  d="M7 17L16.8995 7.10051"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 7.00001L16.8995 16.8995"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {isHoverUnpin && (
                <>
                  <div className="absolute z-20 w-2 h-2 right-2.5 top-7 bg-black transform rotate-45"></div>

                  <div className="absolute flex justify-center items-center w-28 h-6 z-20 top-8 -right-3 bg-black text-white text-xs rounded-md">
                    <span>Unpin a message</span>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <span
              className="text-sm text-gray-700"
              dangerouslySetInnerHTML={{ __html: props.message.content }}
            ></span>
            <span className="text-gray-500 text-xs mt-3">
              {convertTime(props.message.sendAt)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
