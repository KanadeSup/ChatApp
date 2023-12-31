import { Await, Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { LogOut, UserCog, User2, Users, Bell, Video } from "lucide-react";
import { Logo } from "/assets/img/MySvg";
import { Separator } from "@/components/ui/separator";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Suspense } from "react";
import { useState, useEffect } from "react";
import { getUserById } from "../api";
import OneSignal from "react-onesignal";
import useInfo from "../storages/useInfo";
import { getWorkspace } from "../api";
import getUnreadCount from "../api/notification/getUnreadCount";
import useNotification from "../storages/useNotification";

export default function (props) {
   const { workspaceId } = useParams();
   const { workspace, user, setWorkspace, setUser } = useInfo();
   const {unreadCount, setUnreadCount} = useNotification()
   const utilites = Object.keys(props);
   const navigate = useNavigate();
   useEffect(()=> {
      async function fetchData() {
         const res = await getUnreadCount()
         if(!res.ok) return
         if(res.data === unreadCount) return
         setUnreadCount(res.data)
      }  
      fetchData()
   })
   
   useEffect(() => {
      async function fetchWorkspace() {
         if(workspace === null && workspaceId) {
            const data = await getWorkspace(workspaceId)
            setWorkspace(data)
         }
      }
      fetchWorkspace()

      async function fetchUser() {
         if(user === null) {
            const userId = localStorage.getItem("userId");
            const data = await getUserById(userId)
            setUser(data)
         }
      }
      fetchUser()
   }, []);

   function handleLogout() {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      const uuid = localStorage.getItem("userId");
      if (uuid) OneSignal.logout(uuid);
      navigate("/login");
   }

   return (
      <div className="w-16 flex flex-col items-center flex-shrink-0 py-[1px] bg-white border-2 border-gray gap-2">
         {/* Utilites */}
         {utilites.map((utility) => {
            switch (utility) {
               case "colleague":
                  return (
                     <div key={utility} className="flex items-center group">
                        <div className="line h-0 bg-black w-[4px] rounded-r-full transition-all group-hover:h-5 absolute left-0"> </div>
                        <NavLink
                           to={workspaceId ? `/${workspaceId}/colleague-chat` : "/colleague-chat"}
                           className={({ isActive }) =>
                              [
                                 isActive ? "before:animate-vline-expand" : "before:h-0 before:group-hover:h-5 hover:bg-gray-100",
                                 "before:block before:w-1 before:bg-black before:absolute before:left-0 before:rounded-r-full before:transition-all",
                                 "flex w-12 h-12 items-center justify-center rounded",
                              ].join(" ")
                           }
                        >
                           <Users className="w-7 h-7" />
                        </NavLink>
                     </div>
                  );
               case "notification":
                  return (
                     <div key={utility} className="flex items-center group">
                        <NavLink
                           to={workspaceId ? `/${workspaceId}/Notification` : "/Notification"}
                           className={({ isActive }) =>
                              [
                                 isActive ? "before:animate-vline-expand" : "before:h-0 before:group-hover:h-5 hover:bg-gray-100",
                                 "before:block before:w-1 before:bg-black before:absolute before:left-0 before:rounded-r-full before:transition-all",
                                 "flex w-12 h-12 items-center justify-center rounded",
                              ].join(" ")
                           }
                        >
                           <div className="relative">
                              <Bell className="w-7 h-7" />
                              <div className="bg-green-600 absolute right-[-8px] bottom-[-3px] text-[10px] text-white rounded px-1 font-bold"> 
                                 {unreadCount !== 0 ? unreadCount : ""} 
                              </div>
                           </div>
                        </NavLink>
                     </div>
                  );
               case "workspace":
                  return (
                     <div key={utility} className="w-12 h-12 bg-gray-200 rounded border border-gray-300 cursor-pointer overflow-hidden mt-2">
                        <NavLink to={`/Workspace/${workspace?.id}`}>
                           <Avatar className="w-12 h-12 rounded">
                              <AvatarImage src={workspace?.avatarUrl} className="w-12 h-12 rounded"/>
                              <AvatarFallback className="w-12 h-12 rounded">

                              </AvatarFallback>
                           </Avatar>
                        </NavLink>
                     </div>
                  );
               case "logo":
                  return (
                     <div key={utility} className="w-full flex flex-col items-center gap-2 mt-2">
                        <Link to="/Workspace">
                           <Logo className="fill-gray-800 w-11 h-11" />
                        </Link>
                        <Separator className="w-9 bg-gray-400" />
                     </div>
                  );

               case "meeting":
                  return (
                     <div key={utility} className="flex items-center group">
                        <div className="line h-0 bg-black w-[4px] rounded-r-full transition-all group-hover:h-5 absolute left-0"> </div>
                        <NavLink
                           to={`/Workspace/${workspaceId}/Meeting`}
                           className={({ isActive }) =>
                              [
                                 isActive ? "before:animate-vline-expand" : "before:h-0 before:group-hover:h-5 hover:bg-gray-100",
                                 "before:block before:w-1 before:bg-black before:absolute before:left-0 before:rounded-r-full before:transition-all",
                                 "flex w-12 h-12 items-center justify-center rounded",
                              ].join(" ")
                           }
                        >
                           <Video className="w-7 h-7" />
                        </NavLink>
                     </div>
                  );
            }
         })}
         {/* Avatar */}
         <DropdownMenu>
            <DropdownMenuTrigger className="mt-auto outline-none mb-3">
               <Avatar className="rounded w-12 h-12">
                  <AvatarImage className="rounded" src={user?.picture} />
                  <AvatarFallback className="rounded-lg border border-gray-500 bg-gray-200">
                     <User2 className="stroke-gray-800" />
                  </AvatarFallback>
               </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="absolute left-6 bottom-1 w-48">
               <DropdownMenuLabel  className="truncate"> {user?.username} </DropdownMenuLabel>
               <DropdownMenuSeparator />
               <Link to={workspaceId ? `/${workspaceId}/UserSetting` : "/UserSetting"}>
                  <DropdownMenuItem className="cursor-pointer">
                     <UserCog className="w-4 h-4 mr-2" />
                     User Setting
                  </DropdownMenuItem>
               </Link>
               <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Log out
               </DropdownMenuItem>
            </DropdownMenuContent>
         </DropdownMenu>
      </div>
   );
}
