import {
   Avatar,
   AvatarFallback,
   AvatarImage,
 } from "@/components/ui/avatar"
import { Bell, MailPlus, MessageSquare, MessageSquareDashed, UserX } from "lucide-react";

function convertDate(dateTime) {
   let date = dateTime.slice(0,10) 
   const splits = date.split("-")
   date = `${splits[2]}/${splits[1]}/${splits[0]}`
   return date
}
const GENERAL = 1
const MESSAGE = 2
const CHANNEL_INVITE = 4
const CHANNEL_REMOVE = 5
const WORKSPACE_INVITE = 6
const WORKSPACE_REMOVE = 7
export default function (props) {
   const notification = props.notification
   const truncatedContent = notification.content > 120 ? notification.content.slice(0,120) + " ..." : notification.content
   return (
      <div className="flex flex-row p-1 border-b border-gray-200 hover:bg-gray-100 select-none items-start py-3 cursor-pointer"
         onClick={props.onClick}
      >
         <Avatar className="w-12 h-12">
            <AvatarImage className="w-12 h-12" src={notification.Avatar} />
            <AvatarFallback className="bg-gray-200">
               { notification.type === GENERAL ? <Bell /> : "" }
               { notification.type === MESSAGE ? <MessageSquare /> : "" }
               { notification.type === CHANNEL_INVITE ? <MailPlus /> : "" }
               { notification.type === CHANNEL_REMOVE ? <UserX /> : "" }
               { notification.type === WORKSPACE_INVITE ? <MailPlus /> : "" }
               { notification.type === WORKSPACE_REMOVE ? <UserX /> : "" }
            </AvatarFallback>
         </Avatar>
         <div className="flex flex-col text-sm flex-grow ml-2 gap-1">
            <div className="flex justify-between">
               <div className="font-semibold text-md w-[200px] truncate">{notification.title}</div>
               <div className="text-xs font-bold text-gray-500 mr-2"> {convertDate(notification.createdAt)} </div>
            </div>
            <div className="text-gray-500 text-sm">{truncatedContent}</div>
         </div>
      </div>
   );
}
