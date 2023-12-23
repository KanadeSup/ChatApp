import {  useEffect, useState } from "react";
import ChannelHeader from "./ChannelHeader";
import ChannelChatBoxContent from "./ChannelChatBoxContent";
import { useOutletContext, useParams } from "react-router-dom";
import { getChannel } from "/api"
import useChannelStore from "@/storages/useChannelStore";
import { useNavigate } from "react-router-dom";

export default function ChannelChatSection() {
   const { workspaceId } = useParams();
   const {isClickedReply, setIsClickedReply, isClickedChannelUtility, setIsClickedChannelUtility} = useChannelStore();
   const {channelId} = useParams()
   const [channel,setChannel] = useState(null)
   const navigate = useNavigate()
   useEffect(()=>{
      async function fetchData() {
         const data = await getChannel(channelId)
         if(data.status === 404) navigate("/Workspace/" + workspaceId)
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
