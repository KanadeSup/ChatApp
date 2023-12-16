import { Await, Link, NavLink, useNavigate } from "react-router-dom";
import { LogOut, UserCog, User2, Users, Bell } from 'lucide-react';
import { Logo } from '/assets/img/MySvg'
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Suspense } from "react";
import { useState, useEffect } from "react";
import { getUserById } from "../api";
import OneSignal from 'react-onesignal';

function showMenu(event) {
   document.querySelector(".user-menu").classList.toggle("hidden");
}
export default function (props) {
   const [user, setUser] = useState({});
   const [workspaceId, setWorkspaceId] = useState();
   const utilites = Object.keys(props);
   const navigate = useNavigate();

   useEffect(() => {
      const userId = localStorage.getItem("userId");
      getUserById(userId).then((data) => {
         setUser(data);
      });
   }, []);
   function handleLogout() {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      const uuid = localStorage.getItem("userId")
      if(uuid) OneSignal.logout(uuid)
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
                           to="/colleague-chat"
                           className= {
                              ({ isActive }) =>
                                 [
                                    isActive ? "before:animate-vline-expand":"before:h-0 before:group-hover:h-5 hover:bg-gray-300",
                                    "before:block before:w-1 before:bg-black before:absolute before:left-0 before:rounded-r-full before:transition-all",
                                    "flex w-12 h-12 items-center justify-center rounded",
                                 ].join(" ")
                           }
                        >
                           <Users className="w-7 h-7"/>
                        </NavLink>
                     </div>
                  );
               case "notification":
                  return (
                     <div key={utility} className="flex items-center group">
                        <NavLink 
                           to="/Notification"
                           className= {
                              ({ isActive }) =>
                                 [
                                    isActive ? "before:animate-vline-expand":"before:h-0 before:group-hover:h-5 hover:bg-gray-300",
                                    "before:block before:w-1 before:bg-black before:absolute before:left-0 before:rounded-r-full before:transition-all",
                                    "flex w-12 h-12 items-center justify-center rounded",
                                 ].join(" ")
                           }
                        >
                           <Bell className= "w-7 h-7" />
                        </NavLink>
                     </div>
                  );
               case "workspace":
                  return (
                     <div key={utility} className="w-12 h-12 bg-gray-200 rounded border border-gray-300 cursor-pointer overflow-hidden">
                        <Suspense>
                           <Await resolve={props.workspace}>
                              {
                                 (workspace) => {
                                    setWorkspaceId(workspace.id)
                                    return (
                                       <NavLink to={`/Workspace/${workspace.id}`}>
                                          <img src={workspace.avatarUrl} className="w-12 h-12 rounded" />
                                       </NavLink>
                                    )
                                 }
                              }
                           </Await>
                        </Suspense>
                     </div>
                  );
               case "logo":
                  return (
                     <div key={utility} className="w-full flex flex-col items-center gap-2 mt-2">
                        <Link to="/Workspace">
                           <Logo className="fill-gray-800 w-11 h-11"/>
                        </Link>
                        <Separator className="w-9 bg-gray-400"/>
                     </div>
                  );
            }
         })}

         {/* Avatar */}
         <DropdownMenu>
            <DropdownMenuTrigger className="mt-auto outline-none mb-3">
               <Avatar className="rounded w-12 h-12">
                  <AvatarImage className="rounded" src={user.picture} />
                  <AvatarFallback className="rounded-lg border border-gray-500 bg-gray-200">
                     <User2 className="stroke-gray-800" />
                  </AvatarFallback>
               </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="absolute left-6 bottom-1 w-48">
               <DropdownMenuLabel> {user.username} </DropdownMenuLabel>
               <DropdownMenuSeparator />
               <Link to={workspaceId ? `/${workspaceId}/UserSetting` : "/UserSetting"}>
                  <DropdownMenuItem className="cursor-pointer">
                     <UserCog className="w-4 h-4 mr-2"/>
                     User Setting
                  </DropdownMenuItem>
               </Link>
               <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2"/>
                  Log out
               </DropdownMenuItem>
            </DropdownMenuContent>
         </DropdownMenu>
      </div>
   );
}
