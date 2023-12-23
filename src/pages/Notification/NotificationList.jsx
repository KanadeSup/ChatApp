import { Bell, ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import NotificationItem from "./NotificationItem";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import getNotifications from "../../api/notification/getNotifications";
import { Skeleton } from "@/components/ui/skeleton";
import readNotification from "../../api/notification/readNotification";
import { Button } from "@/components/ui/button"
import useNotification from "../../storages/useNotification";
import deleteNotification from "../../api/notification/deleteNotification";

const categories = ["All", "General", "Message", "Workspace", "Channel"];
const ALL = "0";
const GENERAL = "1";
const MESSAGE = "2";
const CHANNEL = "45";
const WORKSPACE = "67";
export default function ({setNotification, forceLoad, setForceLoad }) {
   const [category, setCategory] = useState(categories[0]);
   const { notifications, setNotifications } = useNotification()
   const [unread, setUnread] = useState(false);
   const { notificationId } = useParams();
   const { workspaceId } = useParams();
   const navigate = useNavigate();
   const [loadMore, setLoadMore] = useState(null)
   const [isMutilpleDelete, setIsMutilpleDelete] = useState(false)
   const [deletes, setDeletes] = useState([])
   console.log(deletes)
   useEffect(() => {
      async function fetchData() {
         const nNotification = 20
         document.querySelector(".load-more").disabled = true
         let res;
         if(loadMore === null)  {
            res = await getNotifications(0, nNotification);
         } else {
            res = await getNotifications(notifications.length, nNotification);
         }

         document.querySelector(".load-more").disabled = false
         if (!res.ok) throw new Error("Cannot get Notification data");
         const data = res.data;
         document.querySelector(".load-more").classList.remove("hidden")
         if(data.length < 20) {
            document.querySelector(".load-more").classList.add("hidden")
         }
         if(loadMore === null) setNotifications([...data]);
         else setNotifications([...notifications, ...data]);
         data.map((noti) => {
            if (notificationId === noti.id) setNotification(noti);
         });
      }
      fetchData(); 
   }, [loadMore]);

   return (
      // header
      <div className="h-screen w-96 border-r flex-shrink-0 flex flex-col">
         <div className="text-md flex justify-between items-center py-3 px-3 h-12 mt-1">
            <span className="font-bold text-neutral-800 text-xl">Notification</span>
            <div className="flex items-center gap-1">
               <span className="text-sm font-bold"> unread </span>
               <Switch className="" 
                  onCheckedChange={check=> setUnread(check)}
               />
            </div>
         </div>

         {/* categories */}
         <div className="flex justify-between w-full px-2 mt-4 border-b border-gray-300">
            {categories.map((cate) => (
               <div
                  className={`transition-all px-1 font-semibold text-gray-600 cursor-pointer pb-1 border-b-2 ${
                     cate === category ? "border-blue-700" : "border-transparent"
                  }`}
                  key={cate}
                  onClick={(e) => {
                     setCategory(cate);
                  }}
               >
                  {cate}
               </div>
            ))}
         </div>

         {/* notifications */}
         <div className="flex flex-col overflow-y-auto">
            {notifications ? (
               notifications
                  .filter((noti) => {
                     if (category === "All") return unread ? !noti.isRead : true;
                     if (category === "General") return unread ? !noti.isRead && GENERAL.includes(noti.type) : GENERAL.includes(noti.type);
                     if (category === "Message") return unread ? !noti.isRead && MESSAGE.includes(noti.type) : MESSAGE.includes(noti.type);
                     if (category === "Workspace") return unread ? !noti.isRead && WORKSPACE.includes(noti.type) : WORKSPACE.includes(noti.type);
                     if (category === "Channel") return unread ? !noti.isRead && CHANNEL.includes(noti.type) : CHANNEL.includes(noti.type);
                     return true;
                  })
                  .map((noti, idx) => {
                     return (
                        <NotificationItem
                           key={noti.id}
                           selection={isMutilpleDelete}
                           setDeletes={setDeletes}
                           deletes={deletes}
                           notification={noti}
                           setForceLoad={setForceLoad}
                           onClick={(e) => {
                              readNotification(noti.id);
                              notifications[idx].isRead = true
                              setNotifications([...notifications])
                              if (MESSAGE.includes(noti.type)) {
                                 const detail = JSON.parse(noti.data.Detail);
                                 if (!detail.IsChannel) {
                                    navigate(workspaceId ? `/${workspaceId}/colleague-chat/${detail.UserId}` : `/colleague-chat/${detail.UserId}`);
                                    return;
                                 }
                              }
                              setNotification(noti);
                           }}
                        />
                     );
                  })
            ) : (
               <div className="space-y-5 mt-5 px-2">
                  {[
                     <Skeleton key={1} className="w-full h-12" />,
                     <Skeleton key={2} className="w-full h-12" />,
                     <Skeleton key={3} className="w-full h-12" />,
                     <Skeleton key={4} className="w-full h-12" />,
                     <Skeleton key={5} className="w-full h-12" />,
                  ]}
               </div>
            )}
            <div className="flex justify-center px-2 items-center mt-2 mb-2">
               <Button variant="outline" className="load-more hidden"
                  onClick={e=>{setLoadMore({})}}
               > 
                  Load more 
               </Button>
            </div> 
         </div>
         <div className="flex justify-end border-t border-t-gray-500 py-2 pr-3 mt-auto">
            {
               !isMutilpleDelete ? (
                  <Trash2 className="stroke-red-500 cursor-pointer"
                     onClick={e=>{
                        setIsMutilpleDelete(true)
                     }}
                  />
               ) : (
                  <div>
                     <Button variant="secondary" className="mr-2" 
                        onClick={e=>{
                           setIsMutilpleDelete(false)
                           setDeletes([])
                        }}>
                         Cancel 
                     </Button>
                     <Button
                        className="button"
                        onClick={async e=> {
                           const res = await deleteNotification(deletes)
                           if(!res.ok) return
                           const notis = []
                           for(let i = 0; i < notifications.length; i++) {
                              if(deletes.includes(notifications[i].id)) continue
                              notis.push(notifications[i])
                           }
                           setNotifications([...notis])
                           setDeletes([])
                        }}
                     > 
                        Remove
                     </Button>
                  </div>
               )
            }
         </div>
      </div>
   );
}
