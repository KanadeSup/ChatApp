import { Bell } from "lucide-react";
import NotificationItem from "./NotificationItem";
import { Switch } from "@/components/ui/switch" 
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import getNotifications from "../../api/notification/getNotifications";

const categories = [
   "All",
   "General",
   "Message",
   "Workspace",
   "Channel",
]
const ALL = "0"
const GENERAL = "1"
const MESSAGE = "2"
const CHANNEL = "45"
const WORKSPACE = "67"
export default function ({ setNotification }) {
   const [category, setCategory] = useState(categories[0])
   const [notifications, setNotifications] = useState(null)
   const [unread, setUnread] = useState(false)
   const {notificationId} = useParams()
   useEffect(() => {
      async function fetchData() {
         const res = await getNotifications()
         if(!res.ok) throw new Error('Cannot get Notification data');
         const data = res.data
         setNotifications(data)
         console.log(data)
         data.map(noti=>{
            if(notificationId === noti.id) setNotification(noti)
         })
      }
      fetchData()
   }, [])
   return (
      // header
      <div className="h-screen w-96 bg-gray-50 border-r flex-shrink-0 flex flex-col">
         <div className="text-md flex justify-between items-center py-3 px-3 h-12 bg-gray-50 mt-1">
            <span className="font-bold text-neutral-800 text-xl">Notification</span>
            <div className="flex items-center gap-1">
              <span className="text-sm font-bold"> unread </span>
              <Switch className=""/>
            </div>
         </div>

         {/* categories */}
         <div className="flex justify-between w-full px-2 mt-4 border-b border-gray-300">
            {
               categories.map(cate => (
                  <div className={`transition-all px-1 font-semibold text-gray-600 cursor-pointer pb-1 border-b-2 ${cate === category ? "border-blue-700":"border-transparent"}`} key={cate}
                     onClick={e=>{
                        setCategory(cate)
                     }}
                  > 
                     {cate}
                  </div>
               ))
            }
         </div>
         {/* notifications */}
         <div className="flex flex-col overflow-y-auto">
         {
            notifications ? 
               notifications
               .filter(noti => {
                  if(category === "All") return unread ? noti.isRead : true
                  if(category === "General") return unread ? noti.isRead && GENERAL.includes(noti.type) : GENERAL.includes(noti.type)
                  if(category === "Message") return unread ? noti.isRead && MESSAGE.includes(noti.type) : MESSAGE.includes(noti.type)
                  if(category === "Workspace") return unread ? noti.isRead && WORKSPACE.includes(noti.type) : WORKSPACE.includes(noti.type)
                  if(category === "Channel") return unread ? noti.isRead && CHANNEL.includes(noti.type) : CHANNEL.includes(noti.type)
                  return true
               })
               .map(noti => {
                  return (
                     <NotificationItem 
                        key={noti.id}
                        notification={noti}
                        onClick={e=>setNotification(noti)}
                     />
                  )
               }) : ""
         }
         </div>
      </div>
   );
}
