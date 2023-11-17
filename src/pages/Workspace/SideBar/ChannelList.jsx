import { Hash, Loader2, Plus } from "lucide-react";
import ChannelItem from "./ChannelItem";
import ChannelCreation from "/components/ChannelCreation"
import { Skeleton } from "@/components/ui/skeleton"
import { useActionData, useFetcher, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getChannelList } from "/api"

export default function ChannelList({ fetcher, name, avatar }) {
   const [channelList, setChannelList] = useState(null)
   const { workspaceId } = useParams()
   const formCId = useActionData()
   const fetcherCId = fetcher.data
   useEffect(()=>{
      async function fetchData() {
         const data = await getChannelList(workspaceId)
         setChannelList(data)
      }
      fetchData()
   },[fetcherCId,formCId])
   if(channelList === null) return (
      <div className="w-full flex justify-center h-full items-center">
         <Loader2 className="animate-spin w-10 h-10 stroke-gray-400"/>
      </div>
   )
   return (
      <div className="px-2 py-3">
         {
            channelList.map((channel)=>(
               <ChannelItem key={channel.id} name={channel.name} cid={channel.id}/>
            ))
         }
         {
            fetcher.formData 
               && (
                  <div className="w-full flex items-center justify-start mt-2">
                     <Hash className="w-4 h-4 ml-4 mr-2 stroke-gray-400"/>
                     <p className="text-gray-400">{fetcher.formData.get("name")}</p>
                     <Loader2 className="animate-spin w-4 h-4 stroke-gray-600 ml-auto"/>
                  </div>
               )
         }
         <ChannelCreation fetcher={fetcher}>
            <div className="w-full flex pl-[14px] hover:bg-gray-100 py-2 cursor-pointer items-center rounded"> 
               <Plus className="w-6 h-6 border border-gray-200 rounded p-1 mr-[6px]"/>
               <span className="text-sm font-medium text-gray-600">
                  Create Channel
               </span>
            </div>
         </ChannelCreation>
      </div>
   );
}
