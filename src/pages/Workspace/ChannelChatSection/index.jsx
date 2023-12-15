import {  useEffect, useState } from "react";
import ChannelHeader from "./ChannelHeader";
import ChannelChatBoxContent from "./ChannelChatBoxContent";
import { useOutletContext, useParams } from "react-router-dom";
import { getChannel } from "/api"
import useChannelStore from "@/storages/useChannelStore";

export default function ChannelChatSection() {
   const {isClickedReply, setIsClickedReply, isClickedChannelUtility, setIsClickedChannelUtility} = useChannelStore();
   const {channelId} = useParams()
   const [channel,setChannel] = useState(null)
   useEffect(()=>{
      async function fetchData() {
         const data = await getChannel(channelId)
         setChannel(data)
      }
      fetchData()
   },[channelId])
   return (
      <div className="flex flex-col h-full w-full">
         <ChannelHeader
            channel={channel}
            isClickedChannelUtility={isClickedChannelUtility}
            setIsClickedChannelUtility={setIsClickedChannelUtility}
            setIsClickedReply={setIsClickedReply}
         />
         <ChannelChatBoxContent
            isClickedReply={isClickedReply}
            setIsClickedReply={setIsClickedReply}
            isClickedChannelUtility={isClickedChannelUtility}
            setIsClickedChannelUtility={setIsClickedChannelUtility}
         />
      </div>
   );
}
