import Message from "../../../components/Message";
import ChatBox from "/components/ChatBox";
import ReplySection from "../../../components/ReplySection";
import ChannelUtility from "./ChannelUtility";
import { useContext, useEffect, useState } from "react";
import { HubContext } from "../../../contexts/HubContext";
import { Loader2 } from "lucide-react";
import { useOutletContext, useParams } from "react-router-dom";

export default function ChannelChatBoxContent(props) {
   const { channelId } = useParams();
   const [channel, setChannel] = useState(null);
   const [hub, _] = useContext(HubContext);
   const [messages, setMessages] = useState({});
   useEffect(() => {
   }, [channelId]);
   useEffect(() => {
      if (hub) {
         console.log("there is a hub");
         hub.on("ReceiveMessage", (message) => {
            setMessages((prev) => {
               if(prev[message.receiverId]) prev[message.receiverId] = [...prev[message.receiverId], message]
               else prev[message.receiverId] = [message]
               return {...prev}
            })
         })
      } else {
         console.log("error there is no hub to establish function");
      }
      return () => {
         if (hub) hub.off("ReceiveMessage");
      };
   }, [hub, channelId]);

   return (
      <div className="flex flex-row bg-white">
         <div
            style={{ height: "calc(100vh - 4rem)" }}
            className="flex flex-col flex-grow"
         >
            <div className="flex flex-col justify-start overflow-y-scroll min-w-[480px] h-full py-2">
               {messages[channelId] ? (
                  messages[channelId].map((message) => {
                     return (
                        <Message
                           key={message.id}
                           message={message}
                           setIsClickedReply={props.setIsClickedReply}
                           setIsClickedChannelUtility={
                              props.setIsClickedChannelUtility
                           }
                        />
                     );
                  })
               ) : (
                  <div>
                     <Loader2 className="animate-spin w-10 h-10" />
                  </div>
               )}
            </div>
            <ChatBox />
         </div>
         {props.isClickedReply && (
            <ReplySection
               setIsClickedReply={props.setIsClickedReply}
               setIsClickedChannelUtility={props.setIsClickedChannelUtility}
            />
         )}
         {props.isClickedChannelUtility && (
            <ChannelUtility
               setIsClickedChannelUtility={props.setIsClickedChannelUtility}
            />
         )}
      </div>
   );
}
