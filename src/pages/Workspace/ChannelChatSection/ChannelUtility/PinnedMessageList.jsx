import PinnedMessage from "/components/PinnedMessage";
import { getPinMessages } from "@/api";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { SlArrowLeft } from "react-icons/sl";
import { RiArrowLeftSLine } from "react-icons/ri";

export default function PinnedMessageList(props) {
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await getPinMessages(
        props.conversationId,
        0,
        10,
        props.isChannel
      );
      props.setPinMessages(data);
      setIsLoaded(false);
    }
    fetchData();
  }, []);
  return (
    <>
      <div className="font-medium flex items-center px-3 border-b-2 border-gray-300 py-1">
      <SlArrowLeft className="w-8 h-8 p-2 text-slate-600 hover:bg-slate-200 rounded-full" onClick={() => props.setSelectedOption("")}/>
        <span className="ml-2 text-sm text-slate-600">Pinned messages</span>
      </div>
      <div
        style={{ height: "calc(100vh - 6.5rem)" }}
        className="overflow-y-scroll flex flex-col gap-2 py-2 bg-[rgb(248,248,248)]"
      >
        {isLoaded ? (
          <p className="flex items-center justify-center h-10 font-medium text-gray-600">
            <Loader2 className="w-8 h-8 mr-2 animate-spin" />
            Loading...
          </p>
        ) : isLoaded === false && props.pinMessages.length === 0 ? (
          <p className="flex items-center justify-center h-10 font-medium text-gray-600">
            No pinned messages
          </p>
        ) : (
          props.pinMessages?.map((message) => (
            <PinnedMessage
              key={message.id}
              message={message}
              isChannel={props.isChannel}
              setPinMessages={props.setPinMessages}
              pinMessages={props.pinMessages}
              setMessages={props.setMessages}
            />
          ))
        )}
      </div>
    </>
  );
}
