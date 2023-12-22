import { Await, Link } from "react-router-dom"
import { ArrowLeftRight, ChevronDown, Settings, UserPlus, Hash } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import ChannelCreation from "/components/ChannelCreation"
import { Suspense, useState } from "react";
import InviteUserDialog  from "/components/InviteUserDialog"

export default function SideBarHeader({ fetcher, workspace }) {
   const [openCreate, setOpenCreate] = useState(false)
   const [openInvite, setOpenInvite] = useState(false)
   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center h-14 border-b border-b-gray-300 justify-between px-4 cursor-pointer rounded-none rounded-b-md focus-visible:ring-0 focus-visible:ring-offset-0">
               <h2 className="text-lg font-semibold tracking-tight">
                  <p>{ workspace ? workspace.name : "" }</p>
               </h2>
               <ChevronDown className="w-4 h-4"/>
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent className="w-[275px]">
            <DropdownMenuGroup>
               <Link to="WorkspaceSetting">
                  <DropdownMenuItem className="cursor-pointer h-9">
                     <Settings className="w-4 h-4 mr-3"/>
                     <span className="font-medium"> Workspace Setting </span>
                  </DropdownMenuItem>
               </Link>
               <Link to="/Workspace">
                  <DropdownMenuItem className="cursor-pointer h-9">
                     <ArrowLeftRight className="w-4 h-4 mr-3"/>
                     <span className="font-medium"> Change Workspace </span>
                  </DropdownMenuItem>
               </Link>
               <DropdownMenuItem className="cursor-pointer h-9" onSelect={()=>setOpenInvite(true)}>
                  <UserPlus className="w-4 h-4 mr-3"/>
                  <span className="font-medium"> Invite People to Workspace </span>
               </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer h-9" 
                     onSelect={(e)=>{
                        setOpenCreate(true)
                     }}
                  >
                     <Hash className="w-4 h-4 mr-3"/>
                     <span className="font-medium"> Create Channel </span>
                  </DropdownMenuItem>
            </DropdownMenuGroup>
         </DropdownMenuContent>
         <ChannelCreation fetcher={fetcher} open={openCreate} onOpenChange={setOpenCreate}> </ChannelCreation>
         <InviteUserDialog open={openInvite} onOpenChange={setOpenInvite}></InviteUserDialog>
      </DropdownMenu>
   );
}
