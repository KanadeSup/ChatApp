import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, MailPlus, MessageSquare, UserX, X } from "lucide-react";

const GENERAL = 1;
const MESSAGE = 2;
const CHANNEL_INVITE = 4;
const CHANNEL_REMOVE = 5;
const WORKSPACE_INVITE = 6;
const WORKSPACE_REMOVE = 7;
export default function NotificationDetail({ notification }) {
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
         </div>
         <div className="text-lg mt-2 flex-grow">
            <ContentRender notification={notification} />
         </div>
      </div>
   );
}
function ContentRender({ notification }) {
   if (notification.type === WORKSPACE_INVITE) {
      return <WorkspaceInviteTemplate notification={notification} />;
   }
   if (notification.type === WORKSPACE_REMOVE) {
      return <WorkspaceRemoveTemplate notification={notification} />;
   }
   return <div className="text-lg mt-2">{notification.content}</div>;
}
function WorkspaceInviteTemplate({ notification }) {
   const data = notification.data;
   const detail = JSON.parse(data.Detail);
   return (
      <div className="flex flex-col justify-center items-center gap-3 h-[calc(100vh-200px)] ">
         <div className="text-xl flex gap-1 items-center mb-3 border-b pb-5">
            <span className="font-bold text-xl">{detail.InviterName}</span>
            invite you to his workspace
         </div>
         <Avatar className="w-48 h-48">
            <AvatarImage src={data.Avatar} className="w-48 h-48" />
            <AvatarFallback></AvatarFallback>
         </Avatar>
         <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold"> Workspace </h1>
            <h2 className="text-4xl font-medium text-gray-500"> {detail.GroupName} </h2>
         </div>
         <div className="mt-3 flex gap-3">
            <button className="px-3 py-1 text-lg font-bold bg-green-700 hover:bg-green-600 rounded text-white">Accept</button>
            <button className="px-3 py-1 text-lg font-bold bg-red-700 hover:bg-red-600 rounded text-white">Reject</button>
         </div>
      </div>
   );
}
function WorkspaceRemoveTemplate({ notification }) {
   const data = notification.data;
   const detail = JSON.parse(data.Detail);
   console.log(data)
   return (
      <div className="flex flex-col justify-center items-center gap-3 h-[calc(100vh-200px)] ">
         <h1 className="text-2xl text-red-600 flex items-center"> 
            <span className="flex items-center"><X className="stroke-[3] mr-2"/> You have been removed from &nbsp;</span>
            <span className="font-bold text-2xl">
               {detail.GroupName}
            </span>
         </h1>
         <Avatar className="w-48 h-48">
            <AvatarImage src={data.Avatar} className="w-48 h-48" />
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
