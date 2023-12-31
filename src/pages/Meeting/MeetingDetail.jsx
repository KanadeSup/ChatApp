import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import getMeetingById from "../../api/meeting/getMeetingById"
import { Video } from "lucide-react"
import convertTime from "../../utils/convertTime"
import { Button } from "@/components/ui/button"
import joinMeeting from "../../api/meeting/joinMeeting"
import { isBeforeCurrentDate } from "../../utils/compareCurrentTime"

function MeetingDetail() {
   const {meetingId} = useParams()
   const [meeting, setMeeting] = useState()
   const navigate = useNavigate()
   useEffect(()=>{
      async function fetchData() {
         const res = await getMeetingById(meetingId)
         if(!res.ok) return
         setMeeting(res.data)
         console.log(res.data)
      }
      fetchData()
   }, [meetingId])
   if(!meeting) return <div></div>
   return (
      <div className="px-5 w-full">
         <div className="flex items-center gap-3 border-b border-b-gray-300 py-3">
            <Video className="border border-gray-300 rounded p-1 w-7 h-7 stroke-gray-500"/>
            <h1 className="text-lg font-bold">
               {meeting.name}
            </h1>
            <div>
               {
                  isBeforeCurrentDate(meeting.timeStart) && !isBeforeCurrentDate(meeting.timeEnd) ? (
                     <div className="ml-auto text-[10px] font-bold bg-green-600 rounded-full text-white px-[8px] py-[2px]">
                        Live
                     </div>
                  ): 
                  isBeforeCurrentDate(meeting.timeEnd) ? (
                     <div className="ml-auto text-[10px] font-bold bg-red-600 rounded-full text-white px-[10px] py-[2px]">
                        End
                     </div>
                  ): null
               }
            </div>
         </div>
         <div>
            <div >
               <span className="text-lg font-semibold"> Time Start:  </span>
               <span className="text-lg text-gray-500"> {convertTime(meeting.timeStart,true)} </span>
            </div>
            <div> 
            <span className="text-lg font-semibold"> Time End:  </span> 
               <span className="text-lg text-gray-500"> {convertTime(meeting.timeEnd,true)} </span>
            </div>
         </div>
         <Button 
            className="px-4 font-semibold py-1 text-md mt-3"
            onClick={async e=>{
               navigate("room")
            }}
         > 
            Join 
         </Button>
      </div>
   )
}
export { MeetingDetail }