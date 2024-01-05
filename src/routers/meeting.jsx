import { redirect, useNavigate, useParams } from "react-router-dom";
import joinMeeting from "../api/meeting/joinMeeting";
import Meeting from "../pages/Meeting";
import { MeetingDetail } from "../pages/Meeting/MeetingDetail";
import getMeetingById from "/api/meeting/getMeetingById"
import { MeetingRoom } from "../pages/Meeting/MeetingRoom";
import { useEffect } from "react";

const RoomLoader = async ({ params }) =>{
   const { meetingId, workspaceId } = params
   const meetingRes  = await getMeetingById(meetingId)
   console.log("meeting res:", meetingRes)
   if(!meetingRes.ok) return redirect(`/Workspace/${workspaceId}/Meeting`)
   const meeting = meetingRes.data
   const tokenRes = await joinMeeting(meeting.sessionId, meeting.password)
   if(!tokenRes.ok) return redirect(`/Workspace/${workspaceId}/Meeting`)
   return {
      token: tokenRes.data,
      meeting: meeting,
   }
}
export default [
   {
      path: "/Workspace/:workspaceId/Meeting",
      element: <Meeting />,
      children: [
         {
            path: ":meetingId",
            element: <MeetingDetail />
         }
      ],
   },
   {
      path: "/:deviceType?/Workspace/:workspaceId/Meeting/:meetingId/Room/",
      loader: RoomLoader,
      element: <MeetingRoom />
   },
   {
      path: "/:deviceType?/Workspace/:workspaceId/Meeting/:meetingId/",
      element: (
         <div className="h-screen w-full flex items-center justify-center">
            <span className="font-bold text-xl"> You has leave the meeting </span>
         </div>
      )
   },
   {
      path: "/mobilemeeting",
      loader: ({ params, request })=>{
         const url = new URL(request.url);
         const token =  url.searchParams.get("token");
         const userId =  url.searchParams.get("userId");
         const workspaceId =  url.searchParams.get("workspaceId");
         const meetingId =  url.searchParams.get("meetingId");
         localStorage.setItem("token", token)
         localStorage.setItem("userId", userId)
         return redirect(`/mobile/Workspace/${workspaceId}/Meeting/${meetingId}/room`)
      },
      element: <div/>
   }
]
