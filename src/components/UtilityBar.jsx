import { Link, NavLink } from "react-router-dom";
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

function showMenu(event) {
   document.querySelector(".user-menu").classList.toggle("hidden");
}
export default function (props) {
   const utilites = Object.keys(props);
   return (
      <div className="w-16 flex flex-col items-center flex-shrink-0 py-3 bg-gray-200 border-2 border-gray gap-2">
         {/* Logo */}
         <Link to="/">
            <Logo className="fill-gray-800 w-11 h-11"/>
         </Link>

         <Separator className="w-9 bg-gray-400"/>

         {/* Utilites */}
         {utilites.map((utility) => {
            switch (utility) {
               case "colleague":
                  return (
                     <div className="flex items-center group">
                        <div className="line h-0 bg-black w-[4px] rounded-r-full transition-all group-hover:h-5 absolute left-0"> </div>
                        <NavLink
                           to="/colleague"
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
                     <div className="flex items-center group">
                        <NavLink 
                           to="/notification"
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
            }
         })}

         {/* Avatar */}
         <DropdownMenu>
            <DropdownMenuTrigger className="mt-auto outline-none">
               <Avatar className="rounded w-12 h-12">
                  <AvatarImage className="rounded" src="https://igithub.com/shadcn.png" />
                  <AvatarFallback className="rounded-lg border border-gray-500 bg-gray-200">
                     <User2 className="stroke-gray-800" />
                  </AvatarFallback>
               </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="absolute left-6 bottom-1 w-48">
               <DropdownMenuLabel> Putin lord </DropdownMenuLabel>
               <DropdownMenuSeparator />
               <Link to="/usersetting">
                  <DropdownMenuItem className="cursor-pointer">
                     <UserCog className="w-4 h-4 mr-2"/>
                     User Setting
                  </DropdownMenuItem>
               </Link>
               <DropdownMenuItem className="cursor-pointer">
                  <LogOut className="w-4 h-4 mr-2"/>
                  Log out
               </DropdownMenuItem>
            </DropdownMenuContent>
         </DropdownMenu>
      </div>
   );
}
