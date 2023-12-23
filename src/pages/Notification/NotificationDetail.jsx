import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlertTriangle, Bell, Loader2, MailPlus, MessageSquare, Trash2, UserX, X } from "lucide-react";
import acceptWorkspaceInvite from "../../api/workspace/acceptWorkspaceInvite";
import { useNavigate } from "react-router-dom";
import deleteNotification from "../../api/notification/deleteNotification";
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
 } from "@/components/ui/alert-dialog"
 import { Button } from "@/components/ui/button"
import useNotification from "../../storages/useNotification";
import rejectWorkspaceInvite from "../../api/workspace/rejectWorkspaceInvite";
import rejectChannelInvite from "../../api/channel/rejectChannelInvite";
import acceptChannelInvite from "../../api/channel/acceptChannelInvite";
import useInfo from "../../storages/useInfo";

const GENERAL = 1;
const MESSAGE = 2;
const CHANNEL_INVITE = 4;
const CHANNEL_REMOVE = 5;
const WORKSPACE_INVITE = 6;
const WORKSPACE_REMOVE = 7;
export default function NotificationDetail({ notification, setNotification }) {
   const navigate = useNavigate()
   const { notifications, setNotifications } = useNotification()
   return (
      <div className="px-5 flex-grow">
         <div className="flex items-center gap-3 mt-3 pb-3 border-b">
            <Avatar>
               <AvatarImage src={notification.Avatar} />
               <AvatarFallback>
                  {notification.type === GENERAL ? <Bell /> : ""}
                  {notification.type === MESSAGE ? <MessageSquare /> : ""}
                  {notification.type === CHANNEL_INVITE ? <MailPlus /> : ""}
                  {notification.type === CHANNEL_REMOVE ? <UserX /> : ""}
                  {notification.type === WORKSPACE_INVITE ? <MailPlus /> : ""}
                  {notification.type === WORKSPACE_REMOVE ? <UserX /> : ""}
               </AvatarFallback>
            </Avatar>
            <h1 className="text-2xl font-bold"> {notification.title} </h1>
            <AlertDialog>
               <AlertDialogTrigger asChild>
                  <Trash2 className="stroke-red-500 w-6 h-6 ml-auto cursor-pointer" />
               </AlertDialogTrigger>
               <AlertDialogContent>
                  <AlertDialogHeader>
                     <AlertDialogTitle> Are you sure delete this notification </AlertDialogTitle>
                     <AlertDialogDescription> After delete notification, you will never meet it again. So carefully your chose </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                     <AlertDialogCancel> Cancel </AlertDialogCancel>
                     <Button className="delete-but"
                        onClick={async e=> {
                           document.querySelector(".delete-but").disabled = true
                           document.querySelector(".delete-loader").classList.toggle("hidden")
                           const res = await deleteNotification([notification.id])
                           if(res.ok) {
                              setNotification(null)
                              for(let i = 0; i < notifications.length; i++) {
                                 if(notifications[i].id === notification.id) {
                                    notifications.splice(i,1)
                                    break
                                 }
                              }
                              setNotifications([...notifications])
                           }
                           document.querySelector(".delete-but").disabled = true
                           document.querySelector(".delete-loader").classList.toggle("hidden")
                        }}
                     > 
                        <Loader2 className="delete-loader w-4 h-4 mr-2 animate-spin hidden"/>
                        Delete 
                     </Button>
                  </AlertDialogFooter>
               </AlertDialogContent>
            </AlertDialog>
         </div>
         <div className="text-lg mt-2 flex-grow">
            <ContentRender key={notification.id} notification={notification} navigate={navigate} setNotification={setNotification}/>
         </div>
      </div>
   );
}
function ContentRender({ notification, navigate, setNotification }) {
   if (notification.type === WORKSPACE_INVITE) {
      return <WorkspaceInviteTemplate notification={notification} navigate={navigate} setNotification={setNotification}/>;
   }
   if (notification.type === WORKSPACE_REMOVE) {
      return <WorkspaceRemoveTemplate notification={notification} />;
   }
   if (notification.type === CHANNEL_INVITE) {
      return <ChannelInviteTemplate notification={notification} navigate={navigate} setNotification={setNotification}/>;
   }
   return <div className="text-lg mt-2">{notification.content}</div>;
}

function WorkspaceInviteTemplate({ notification, setNotification, navigate }) {
   const data = notification.data;
   const detail = JSON.parse(data.Detail);
   const { setWorkspace } = useInfo()
   const { notifications, setNotifications } = useNotification()
   return (
      <div className="flex flex-col justify-center items-center gap-3 h-[calc(100vh-200px)] ">
         <div className="text-xl flex gap-1 items-center mb-3 border-b pb-5">
            <span className="font-bold text-xl">{detail.InviterName}</span>
            invite you to his workspace
         </div>
         <Avatar className="w-48 h-48">
            <AvatarImage src={detail.GroupAvatar} className="w-48 h-48" />
            <AvatarFallback></AvatarFallback>
         </Avatar>
         <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold"> Workspace </h1>
            <h2 className="text-4xl font-medium text-gray-500"> {detail.GroupName} </h2>
         </div>
         <div className="mt-3 flex gap-3">
            <button className="accept-but px-3 py-1 text-lg font-bold bg-green-700 hover:bg-green-600 rounded text-white"
               onClick={async e=> {
                  // e.currentTarget.disabled = true
                  document.querySelector(".accept-but").disabled = true
                  document.querySelector(".accept-but").classList.replace("bg-green-700","bg-gray-400")
                  document.querySelector(".accept-but").classList.add("hover:bg-gray-400")
                  document.querySelector(".reject-but").classList.replace("bg-red-700","bg-gray-400")
                  document.querySelector(".reject-but").classList.add("hover:bg-gray-400")
                  const res = await acceptWorkspaceInvite(detail.GroupId)
                  await deleteNotification([notification.id])
                  if(res.ok) {
                     navigate(`/Workspace/${detail.GroupId}`)
                     setWorkspace(null)
                     return
                  }
                  setNotification(null)
                  document.querySelector(".accept-but").classList.replace("bg-gray-400","bg-green-700")
                  document.querySelector(".accept-but").classList.add("hover:bg-green-700")
                  document.querySelector(".reject-but").classList.replace("bg-gray-400","bg-red-700")
                  document.querySelector(".reject-but").classList.add("hover:bg-red-700")
               }}
            >
               Accept
            </button>
            <button className="reject-but px-3 py-1 text-lg font-bold bg-red-700 hover:bg-red-600 rounded text-white"
               onClick={async e=> {
                  let res = await rejectWorkspaceInvite(detail.GroupId)
                  if(!res.ok) return
                  res = await deleteNotification([notification.id])
                  if(!res.ok) return
                  for(let i = 0; i < notifications.length; i++) {
                     if(notifications[i].id === notification.id) {
                        notifications.splice(i,1)
                        break
                     }
                  }
                  setNotifications([...notifications])
                  setNotification(null)
               }}
            >
               Reject
            </button>
         </div>
      </div>
   );
}

function WorkspaceRemoveTemplate({ notification }) {
   const data = notification.data;
   const detail = JSON.parse(data.Detail);
   return (
      <div className="flex flex-col justify-center items-center gap-3 h-[calc(100vh-200px)] ">
         <h1 className="text-2xl text-red-600 flex items-center"> 
            <span className="flex items-center"><X className="stroke-[3] mr-2"/> You have been removed from &nbsp;</span>
            <span className="font-bold text-2xl">
               {detail.GroupName}
            </span>
         </h1>
         <Avatar className="w-48 h-48">
            <AvatarImage src={detail.GroupAvatar} className="w-48 h-48" />
            <AvatarFallback></AvatarFallback>
         </Avatar>
         <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold text-red-700"> Workspace </h1>
            <h2 className="text-4xl font-medium text-gray-300"> {detail.GroupName} </h2>
         </div>
         <div className="text-lg flex flex-col gap-2">
            You have been kick by &nbsp;
            <span className="font-bold flex items-center gap-2">
               <Avatar>
                  <AvatarImage src={detail.RemoverAvatar} className="w-10 h-10" />
                  <AvatarFallback></AvatarFallback>
               </Avatar>
               {detail.RemoverName}
            </span>
         </div>
      </div>
   )
}

function ChannelInviteTemplate({ notification, setNotification, navigate }) {
   const data = notification.data;
   const detail = JSON.parse(data.Detail);
   const { notifications, setNotifications } = useNotification()
   return (
      <div className="flex flex-col justify-center items-center gap-3 h-[calc(100vh-200px)] ">
         <div className="text-xl flex gap-1 items-center mb-3 border-b pb-5">
            <span className="font-bold text-xl">{detail.InviterName}</span>
            invite you to his Channel
         </div>
         <Avatar className="w-48 h-48">
            <AvatarImage src={detail.GroupAvatar} className="w-48 h-48" />
            <AvatarFallback></AvatarFallback>
         </Avatar>
         <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold"> Channel </h1>
            <h2 className="text-4xl font-medium text-gray-500"> {detail.GroupName} </h2>
         </div>
         <div className="mt-3 flex gap-3">
            <button className="accept-but px-3 py-1 text-lg font-bold bg-green-700 hover:bg-green-600 rounded text-white"
               onClick={async e=> {
                  document.querySelector(".accept-but").disabled = true
                  document.querySelector(".accept-but").classList.replace("bg-green-700","bg-gray-400")
                  document.querySelector(".accept-but").classList.add("hover:bg-gray-400")
                  document.querySelector(".reject-but").classList.replace("bg-red-700","bg-gray-400")
                  document.querySelector(".reject-but").classList.add("hover:bg-gray-400")
                  const res = await acceptChannelInvite(detail.GroupId)
                  await deleteNotification([notification.id])
                  for(let i = 0; i < notifications.length; i++) {
                     if(notifications[i].id === notification.id) {
                        notifications.splice(i,1)
                        break
                     }
                  }
                  setNotifications([...notifications])
                  setNotification(null)
                  document.querySelector(".accept-but").classList.replace("bg-gray-400","bg-green-700")
                  document.querySelector(".accept-but").classList.add("hover:bg-green-700")
                  document.querySelector(".reject-but").classList.replace("bg-gray-400","bg-red-700")
                  document.querySelector(".reject-but").classList.add("hover:bg-red-700")
               }}
            >
               Accept
            </button>
            <button className="reject-but px-3 py-1 text-lg font-bold bg-red-700 hover:bg-red-600 rounded text-white"
               onClick={async e=> {
                  console.log(detail)
                  let res = await rejectChannelInvite(detail.GroupId)
                  if(!res.ok) return
                  res = await deleteNotification([notification.id])
                  if(!res.ok) return
                  for(let i = 0; i < notifications.length; i++) {
                     if(notifications[i].id === notification.id) {
                        notifications.splice(i,1)
                        break
                     }
                  }
                  setNotifications([...notifications])
                  setNotification(null)
               }}
            >
               Reject
            </button>
         </div>
      </div>
   );
}