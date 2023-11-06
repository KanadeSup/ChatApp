import { Colleague, Notification } from "/assets/img/UtilSvg";
import { Link } from "react-router-dom";
import { LogOut, UserCog, User2 } from 'lucide-react';
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
      <div className="w-16 flex flex-col items-center flex-shrink-0 py-3 bg-gray-200 border-2 border-gray shadow-xl gap-5">
         {/* Logo */}
         <Link to="/">
            <svg
               className="w-11 h-11 text-blue-500 cursor-pointer"
               fill="currentColor"
               viewBox="0 0 20 20"
            >
               <path
                  fillRule="evenodd"
                  d="M11.757 2.034a1 1 0 01.638.519c.483.967.844 1.554 1.207 2.03.368.482.756.876 1.348 1.467A6.985 6.985 0 0117 11a7.002 7.002 0 01-14 0c0-1.79.684-3.583 2.05-4.95a1 1 0 011.707.707c0 1.12.07 1.973.398 2.654.18.374.461.74.945 1.067.116-1.061.328-2.354.614-3.58.225-.966.505-1.93.839-2.734.167-.403.356-.785.57-1.116.208-.322.476-.649.822-.88a1 1 0 01.812-.134zm.364 13.087A2.998 2.998 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879.586.585.879 1.353.879 2.121s-.293 1.536-.879 2.121z"
                  clipRule="evenodd"
               />
            </svg>
         </Link>

         {/* Utilites */}
         {utilites.map((utility) => {
            switch (utility) {
               case "colleague":
                  return (
                     <Link
                        to="/colleague"
                        className="flex w-12 h-12 items-center justify-center hover:bg-gray-300 rounded-md"
                     >
                        <Colleague />
                     </Link>
                  );
               case "notification":
                  return (
                     <Link
                        to="/notification"
                        className="flex w-12 h-12 items-center justify-center hover:bg-gray-300 rounded-md"
                     >
                        <Notification />
                     </Link>
                  );
            }
         })}
         {/* avatar */}

         {/* Menu */}
         <DropdownMenu>
            <DropdownMenuTrigger className="mt-auto outline-none">
               <Avatar className="rounded w-12 h-12">
                  <AvatarImage className="rounded" src="https://igithub.com/shadcn.png" />
                  <AvatarFallback className="rounded-lg border border-gray-300 bg-gray-100">
                     <User2 className="stroke-gray-600" />
                  </AvatarFallback>
               </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="absolute left-6 bottom-1 w-48">
               <DropdownMenuLabel> Putin lord </DropdownMenuLabel>
               <DropdownMenuSeparator />
               <Link to="usersetting">
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
