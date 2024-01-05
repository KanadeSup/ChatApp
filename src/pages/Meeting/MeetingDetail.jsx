import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import getMeetingById from "../../api/meeting/getMeetingById";
import { Check, Loader2, Trash, Video, X } from "lucide-react";
import convertTime from "../../utils/convertTime";
import { Button } from "@/components/ui/button";
import joinMeeting from "../../api/meeting/joinMeeting";
import { isBeforeCurrentDate } from "../../utils/compareCurrentTime";
import { CreateMeetingDialog } from "./CreateMeetingDialog";
import { useToast } from "@/components/ui/use-toast"
import {
   AlertDialog,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import deleteMeeting from "../../api/meeting/deleteMeeting";
function MeetingDetail() {
   const loadData = useOutletContext();
   const { meetingId } = useParams();
   const [meeting, setMeeting] = useState();
   const navigate = useNavigate();
   const [forceLoad, setForceLoad] = useState();
   const [open, setOpen] = useState();
   const {toast} = useToast()
   function loadMeeting() {
      setForceLoad({});
   }
   useEffect(() => {
      async function fetchData() {
         const res = await getMeetingById(meetingId)
         if(!res.ok) return
         setMeeting(res.data)
         setChannelIdOfMeeting(res.data.channelId)
         console.log(res.data.description)
         console.log("channel id of meeting: ", res.data.channelId)
      }
      fetchData();
   }, [meetingId, forceLoad]);
   if (!meeting) return <div></div>;
   return (
      <div className="px-5 w-full">
         <div className="flex items-center gap-3 border-b border-b-gray-300 py-3">
            <Video className="border border-gray-300 rounded p-1 w-7 h-7 stroke-gray-500" />
            <h1 className="text-lg font-bold">{meeting.name}</h1>
            <div>
               {meeting.status === 1 ? (
                  <div className="ml-auto text-[10px] font-bold bg-green-600 rounded-full text-white px-[8px] py-[2px]">
                     Live
                  </div>
               ) : null}
            </div>
            <AlertDialog open={open} onOpenChange={setOpen}>
               <AlertDialogTrigger asChild>
                  <Trash className="ml-auto stroke-red-500 cursor-pointer" />
               </AlertDialogTrigger>
               <AlertDialogContent>
                  <AlertDialogHeader>
                     <AlertDialogTitle> Are you sure delete this meeting </AlertDialogTitle>
                     <AlertDialogDescription>
                        After delete meeting, you will never meet it again. So carefully your choice
                     </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                     <AlertDialogCancel> Cancel </AlertDialogCancel>
                     <Button
                        className="delete-but"
                        onClick={async (e) => {
                           document.querySelector(".delete-but").disabled = true;
                           document.querySelector(".delete-loader").classList.toggle("hidden");
                           const res = await deleteMeeting(meeting.id);
                           if (res.ok) {
                              loadData()
                              navigate("..",{relative: "path"})
                              toast({
                                 title: (
                                    <p className="flex items-center"> 
                                       <Check className="stroke-green-500 w-6 h-6 stroke-[3] mr-2"/> 
                                       Delete successfully
                                    </p>
                                 )
                                 
                              })
                              return
                           }
                           if(res.status === 403) {
                              toast({
                                 title: (
                                    <p className="flex items-center"> 
                                       <X className="stroke-red-500 w-6 h-6 stroke-[3] mr-2"/> 
                                       You don't have permission to delete meeting
                                    </p>
                                 )
                              })
                              setOpen(false)
                              return
                           }
                           toast({
                              title: (
                                 <p className="flex items-center"> 
                                    <X className="stroke-red-500 w-6 h-6 stroke-[3] mr-2"/> 
                                    Something went wrong, please try again
                                 </p>
                              )
                           })
                           document.querySelector(".delete-but").disabled = true;
                           document.querySelector(".delete-loader").classList.toggle("hidden");
                        }}
                     >
                        <Loader2 className="delete-loader w-4 h-4 mr-2 animate-spin hidden" />
                        Delete
                     </Button>
                  </AlertDialogFooter>
               </AlertDialogContent>
            </AlertDialog>
         </div>
         <div className="border border-gray-200 inline-block px-7 pb-3 rounded-lg mt-5 max-w-[500px] min-w-[400px]">
            <div className="font-bold text-lg flex items-center justify-center border-b border-b-black py-1 mb-3">
               Meeting infomation
            </div>
            <div>
               <span className="text-lg font-semibold"> Meeting id: </span>
               <span className="text-lg text-gray-500"> {meeting.sessionId} </span>
            </div>
            {meeting.description !== "" ? (
               <div>
                  <span className="text-lg font-semibold"> Description: </span>
                  <p className="break-words text-gray-500"> {meeting.description} </p>
               </div>
            ) : null}
            <div className="">
               <div>
                  <span className="text-lg font-semibold"> Time Start: </span>
                  <span className="text-lg text-gray-500"> {convertTime(meeting.timeStart, true)} </span>
               </div>
               <div>
                  <span className="text-lg font-semibold"> Time End: </span>
                  <span className="text-lg text-gray-500"> {convertTime(meeting.timeEnd, true)} </span>
               </div>
            </div>
            <div className="mt-2 flex justify-end items-center">
               <CreateMeetingDialog editData={meeting} loadData={loadData} loadMeeting={loadMeeting}>
                  <Button variant="link" className="text-md font-bold">
                     Edit
                  </Button>
               </CreateMeetingDialog>

               {true ? (
                  <button
                     className="px-3 font-semibold bg-black text-white text-md rounded flex items-center"
                     onClick={async (e) => {
                        const butEle = e.currentTarget;
                        butEle.disabled = true;
                        butEle.classList.replace("bg-black", "bg-gray-300");
                        butEle.querySelector(".loader").classList.remove("hidden");
                        navigate("room");
                     }}
                  >
                     <Loader2 className="loader w-4 h-4 animate-spin hidden mr-2" />
                     Join
                  </button>
               ) : null}
            </div>
         </div>
      </div>
   );
}
export { MeetingDetail };
