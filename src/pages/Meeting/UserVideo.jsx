import { Mic, MicOff, MoreVertical, Pin, PinOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio"

function UserVideo({ setParticipant, participant, isPublisher, setPinnedUser,  className }) {
   const videoRef = useRef(null);
   const [isMuted, setIsMuted] = useState(false)
   useEffect(() => { 
      if (!participant || !videoRef) return;
      participant.streamManager.addVideoElement(videoRef.current);
   }, [participant]);
   return (
      <div className={`${className}`}>
         <div className={`flex items-center justify-center relative rounded-lg bg-gray-900 group h-full w-full`}>
            <video autoPlay={true} ref={videoRef} className={`h-full aspect-video`} />
            <div className="absolute left-0 bottom-0 bg-gray-700 text-white pl-1 pr-2 font-bold text-sm py-1 flex gap-1 items-center justify-center">
               <MicOff className={`w-4 h-4 stroke-red-500 ${participant?.isAudio ? "hidden" : ""}`}/>
               {participant?.name} 
            </div> 
            <div className={`absolute bg-gray-300 bg-opacity-50 px-2 rounded-full py-1 flex gap-2 invisible group-hover:visible`}>
               {
                  participant?.isMute ? (
                     <MicOff className={`w-8 h-8 stroke-gray-800 cursor-pointer hover:bg-gray-100 hover:bg-opacity-30 p-1 rounded-full ${isPublisher ? "hidden" : ""}`}
                        onClick={e=>{
                           participant.streamManager.subscribeToAudio(true)
                           participant.isMute = false
                           setParticipant(participant)
                           setIsMuted(!isMuted)
                        }}
                     />
                  ): (
                     <Mic className={`w-8 h-8 stroke-gray-800 cursor-pointer hover:bg-gray-100 hover:bg-opacity-30 p-1 rounded-full ${isPublisher ? "hidden" : ""}`}
                        onClick={e=>{
                           participant.streamManager.subscribeToAudio(false)
                           participant.isMute = true
                           setParticipant(participant)
                           setIsMuted(!isMuted)
                        }}
                     />
                  )
               }

               <Pin className="w-8 h-8 stroke-gray-800 cursor-pointer hover:bg-gray-100 hover:bg-opacity-30 p-1 rounded-full"
                  onClick={e=>{
                     setPinnedUser(prev=>{
                        if(prev === participant) return null
                        return participant
                     })
                  }}
               />
            </div>
         </div>
      </div>
   );
}
export { UserVideo };
