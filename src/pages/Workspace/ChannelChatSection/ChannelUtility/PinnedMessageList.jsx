import PinnedMessage from "/components/PinnedMessage";
import { getPinMessages } from "@/api";
import { da } from "date-fns/locale";
import { useEffect, useState } from "react";
export default function PinnedMessageList(props) {
  const [pinMessages, setPinMessages] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getPinMessages(
        props.conversationId,
        0,
        10,
        props.isChannel
      );
      setPinMessages(data);
    }
    fetchData();
  }, []);
  return (
    <>
      <div className="font-medium flex items-center py-2 px-3 border-b shadow">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="relative top-0.5 w-6 h-6 p-1 rounded-full hover:bg-slate-300"
          onClick={() => props.setSelectedOption("")}
        >
          <path
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 12h14M5 12l6-6m-6 6l6 6"
          ></path>
        </svg>
        <span className="ml-2 text-sm">Pinned messages</span>
      </div>
      <div
        style={{ height: "calc(100vh - 6.5rem)" }}
        className="overflow-y-scroll"
      >
        {pinMessages.length === 0 ? (
          <p className="flex items-center justify-center h-10 font-medium text-gray-600">
            No pinned messages
          </p>
        ) : (
          pinMessages?.map((message) => (
            <PinnedMessage
              key={message.id}
              message={message}
              isChannel={props.isChannel}
              setPinMessages={setPinMessages}
              pinMessages={pinMessages}
            />
          ))
        )}
      </div>
    </>
  );
}
