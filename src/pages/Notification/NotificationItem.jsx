import {
   Avatar,
   AvatarFallback,
   AvatarImage,
 } from "@/components/ui/avatar"
import { Bell, MailPlus, MessageSquare, MessageSquareDashed, Trash2, UserX } from "lucide-react";
import {
   ContextMenu,
   ContextMenuCheckboxItem,
   ContextMenuContent,
   ContextMenuItem,
   ContextMenuLabel,
   ContextMenuRadioGroup,
   ContextMenuRadioItem,
   ContextMenuSeparator,
   ContextMenuShortcut,
   ContextMenuSub,
   ContextMenuSubContent,
   ContextMenuSubTrigger,
   ContextMenuTrigger,
 } from "@/components/ui/context-menu"
 import { Checkbox } from "@/components/ui/checkbox"
import deleteNotification from "../../api/notification/deleteNotification";
import useNotification from "../../storages/useNotification";
import { useEffect, useRef, useState } from "react";


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
   const { notifications, setNotifications } = useNotification()
   const [checked, setChecked] = useState(false)
   useEffect(()=> {
      setChecked(false)
   },[props.selection])

   return (
      <ContextMenu>
         <ContextMenuTrigger>
            <div className="flex flex-row p-1 border-b border-gray-200 hover:bg-gray-100 select-none items-start py-3 cursor-pointer"
               onClick={e=> {
                  if(props.selection){
                     setChecked(!checked)
                     if(checked) {
                        for(let i = 0; i < props.deletes.length; i++) {
                           if(props.deletes[i] === notification.id) {
                              props.deletes.splice(i,1)
                              props.setDeletes([...props.deletes])
                              break
                           }
                        }
                     }
                     if(props.deletes.indexOf(notification.id) !== -1) return
                     props.setDeletes([...props.deletes, notification.id])
                     return
                  }
                  props.onClick()
               }}
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
                  <div className="text-gray-500 text-sm">{truncatedContent} </div>
               </div>
               {
                  props.selection ? (
                     <Checkbox checked={checked} className="mr-2" />
                  ): ""
               }
            </div>
         </ContextMenuTrigger>
         <ContextMenuContent>
            <ContextMenuItem className="flex gap-2"
               onClick={async e=>{
                  const res = await deleteNotification([notification.id])
                  if(res.ok) {
                     for(let i = 0; i < notifications.length; i++) {
                        if(notifications[i].id === notification.id) {
                           notifications.splice(i,1)
                           break
                        }
                     }
                     setNotifications([...notifications])
                  }
               }}
            >
               <Trash2 className="w-5 h-5 stroke-red-500" />
               Delete
            </ContextMenuItem>
         </ContextMenuContent>
      </ContextMenu>
   );
}
