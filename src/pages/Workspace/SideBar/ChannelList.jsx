import { Hash, Loader2, Plus, X } from "lucide-react";
import ChannelItem from "./ChannelItem";
import ChannelCreation from "/components/ChannelCreation"
import { Skeleton } from "@/components/ui/skeleton"
import { useActionData, useFetcher, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getChannelList } from "/api"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"

export default function ChannelList({ fetcher, name, avatar, setChannelName }) {
   const [channelList, setChannelList] = useState(null)
   const { workspaceId } = useParams()
   const { channelId } = useParams()
   const formCId = useActionData()
   const fetcherData = fetcher.data
   const { toast } = useToast()
   const navigate = useNavigate()
   useEffect(()=>{
      if(fetcherData || formCId) {
         if(fetcherData?.status === 403 || formCId?.status === 403) {
            toast({
               title: 
                  <p className="flex items-center">
                     <X className="stroke-red-600 mr-2" />
                     <span className="text-red-600"> You don't have permission to do this action </span>
                  </p>
            })
            return
         }
         if(fetcherData?.ok === false || formCId?.ok === false) {
            toast({
               title: 
                  <p className="flex items-center">
                     <X className="stroke-red-600 mr-2" />
                     <span className="text-red-600"> Something went wrong, please try again ! </span>
                  </p>
            })
            return
         }
      }
      async function fetchData() {
         const data = await getChannelList(workspaceId, channelId);
         setChannelList(data)
         if (!channelId && data.length > 0) {
            navigate(`/Workspace/${workspaceId}/${data[0].id}`)
         }
      }
      fetchData()
   },[fetcherData,formCId])
   if(channelList === null) return (
      <div className="px-2 py-3 flex flex-col gap-1">
         <Skeleton className="w-48 h-9"/>
         <Skeleton className="w-full h-9"/>
         <Skeleton className="w-40 h-9"/>
         <Skeleton className="w-full h-9"/>
         <Skeleton className="w-40 h-9"/>
         <Skeleton className="w-52 h-9"/>
         <Skeleton className="w-full h-9"/>
      </div>
   )
   return (
      <div className="px-2 py-3 flex flex-col gap-1">
         {
            channelList
            .sort((a,b)=>a.name > b.name)
            .map((channel)=>(
               <ChannelItem key={channel.id} name={channel.name} category={channel.category} cid={channel.id} setChannelName={setChannelName}/>
            ))
         }
         {
            fetcher.formData 
               && (
                  <div className="w-full flex items-center justify-start mt-2">
                     <Hash className="w-4 h-4 ml-4 mr-2 stroke-gray-400 shrink-0"/>
                     <p className="text-gray-400 text-ellipsis truncate font-medium">{fetcher.formData.get("name")}</p>
                     <Loader2 className="animate-spin w-4 h-4 stroke-gray-600 ml-auto shrink-0"/>
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
         <Toaster />
      </div>
   );
}
