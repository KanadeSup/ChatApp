import { Hash, MoreVertical, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";

export default function ChannelHeader(props) {
   return (
      <div className="flex flex-row justify-between items-center h-14 bg-white border-b border-b-gray-300">
         <h2 className="ml-4 flex items-center">
            <Hash className="w-5 h-5 mr-2" />
            <span className="text-lg font-semibold">{props.channel?.name}</span>
         </h2>

         <div className="flex relative items-center flex-row h-12 justify-end select-none">
            <div className="relative">
               <Input placeholder="search" className="w-[300px]" />
               <Search className="absolute right-2 top-2 stroke-gray-500" />
            </div>
            <MoreVertical
               className="w-6 h-6 cursor-pointer mr-4 ml-3"
               onClick={() => {
                  props.setIsClickedChannelUtility(
                     !props.isClickedChannelUtility,
                  );
                  props.setIsClickedReply(false);
               }}
            />
         </div>
      </div>
   );
}
