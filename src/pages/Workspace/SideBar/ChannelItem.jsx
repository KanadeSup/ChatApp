import useChannelStore from "@/storages/useChannelStore";
import { Button } from "@/components/ui/button";
import { Hash, Settings } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import DeleteChannelDialog from "/components/DeleteChannelDialog";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";

export default function ChannelItem({ name, cid, setChannelName }) {
   const { workspaceId } = useParams();
   const { setIsClickedReply } = useChannelStore();
   return (
      <ContextMenu modal={false}>
         <ContextMenuTrigger asChild>
            <NavLink to={`${cid}`}
               onClick={()=>{setChannelName(name); setIsClickedReply(false)}}
            >
               {({ isActive }) => (
                  <Button variant="ghost" className={"w-full justify-start group items-center " + (isActive ? "bg-muted" : "")}>
                     <Hash className="w-5 h-5 mr-2 stroke-gray-500" />
                     <span className="text-gray-500 text-md text-ellipsis truncate w-full text-left">{name}</span>
                     <TooltipProvider delayDuration={10} disableHoverableContent={true} skipDelayDuration={10}>
                        <Tooltip>
                           <TooltipTrigger asChild>
                              <div 
                                 onClick={e=>{
                                    window.location.replace(`/Workspace/${workspaceId}/${cid}/ChannelSetting`)
                                 }}
                              >
                                 <Settings className="w-5 h-5 stroke-gray-900 ml-auto invisible group-hover:visible" strokeWidth={2} />
                              </div>
                           </TooltipTrigger>
                           <TooltipContent>
                              <p> Edit Channel </p>
                           </TooltipContent>
                        </Tooltip>
                     </TooltipProvider>
                  </Button>
               )}
            </NavLink>
         </ContextMenuTrigger>
         <ContextMenuContent className="w-[200px]">
            <Link to={`/Workspace/${workspaceId}/${cid}/ChannelSetting`}>
               <ContextMenuItem className="flex justify-between cursor-pointer">
                  Edit Channel
                  <Settings className="w-5 h-5" />
               </ContextMenuItem>
            </Link>
            <DeleteChannelDialog cid={cid}>
               <ContextMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer">
                  <p className="text-red-500"> Delete Channel </p>
               </ContextMenuItem>
            </DeleteChannelDialog>
         </ContextMenuContent>
      </ContextMenu>
   );
}
