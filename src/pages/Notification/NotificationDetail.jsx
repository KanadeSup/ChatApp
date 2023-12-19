import {
   Avatar,
   AvatarFallback,
   AvatarImage,
 } from "@/components/ui/avatar"
import { Bell, MailPlus, MessageSquare, UserX } from "lucide-react"


const GENERAL = 1
const MESSAGE = 2
const CHANNEL_INVITE = 4
const CHANNEL_REMOVE = 5
const WORKSPACE_INVITE = 6
const WORKSPACE_REMOVE = 7
export default function NotificationDetail({notification}) {
   return (
      <div className="px-5 flex-grow">
         <div className="flex items-center gap-3 mt-3 pb-3 border-b">
            <Avatar>
               <AvatarImage src={notification.Avatar} />
               <AvatarFallback>
                  { notification.type === GENERAL ? <Bell /> : "" }
                  { notification.type === MESSAGE ? <MessageSquare /> : "" }
                  { notification.type === CHANNEL_INVITE ? <MailPlus /> : "" }
                  { notification.type === CHANNEL_REMOVE ? <UserX /> : "" }
                  { notification.type === WORKSPACE_INVITE ? <MailPlus /> : "" }
                  { notification.type === WORKSPACE_REMOVE ? <UserX /> : "" }                 
               </AvatarFallback>
            </Avatar>
            <h1 className="text-2xl font-bold"> {notification.title} </h1>
         </div>
         <p className="text-lg mt-2"> {notification.content} </p>
      </div>
   );
}
