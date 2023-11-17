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

export default function SideBarHeader({ fetcher, workspace }) {
   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center h-14 border-b border-b-gray-300 justify-between px-4 cursor-pointer rounded-none rounded-b-md focus-visible:ring-0 focus-visible:ring-offset-0">
               <h2 className="text-lg font-semibold tracking-tight">
                  <Suspense>
                     <Await resolve={workspace}>
                        {
                           workspace => <p>{ workspace.name }</p>
                        }
                     </Await>
                  </Suspense>
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
               <DropdownMenuItem className="cursor-pointer h-9" onClick={()=>{}}>
                  <UserPlus className="w-4 h-4 mr-3"/>
                  <span className="font-medium"> Invite People to Workspace </span>
               </DropdownMenuItem>
               <ChannelCreation fetcher={fetcher}>
                  <DropdownMenuItem className="cursor-pointer h-9" 
                     onSelect={(e)=>{
                        e.preventDefault()
                     }}
                  >
                     <Hash className="w-4 h-4 mr-3"/>
                     <span className="font-medium"> Create Channel </span>
                  </DropdownMenuItem>
               </ChannelCreation>
            </DropdownMenuGroup>
         </DropdownMenuContent>
      </DropdownMenu>
   );
}
