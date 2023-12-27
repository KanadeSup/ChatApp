import { vi } from "date-fns/locale";
import { Camera, CameraOff, LogOut, Mic, MicOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { UserVideo } from "./UserVideo";

function MeetingRoom({ session, subcribers, publisher, leaveSession }) {
   const [isMicEnable, setIsMicEnable] = useState(false);
   const [isCamEnable, setIsCamEnable] = useState(false);
   return (
      <div className="w-full h-screen flex flex-col">
         {/* Camera section */}
         <div 
            className={`grid grid-flow-row gap-4 h-full items-center justify-items-center p-5 flex-grow-0 min-h-0 min-w-0
               ${
                  subcribers.length === 0 ? "grid-cols-1" : 
                  subcribers.length > 0 && subcribers.length <= 3 ? "grid-cols-2" :
                  subcribers.length > 3 && subcribers.length <= 8 ? "grid-cols-3" :
                  subcribers.length > 8 && subcribers.length <= 15 ? "grid-cols-4" :
                  subcribers.length > 15 ? "grid-cols-5" : ""
               }`
            }
         >
            <UserVideo streamManager={publisher} className="" />

            {
               subcribers.length !== 0 ? 
                  subcribers.map(subcriber => (
                     <UserVideo streamManager={subcriber} className="" />
                  )) : null
            }
         </div>

         {/* toolbar */}
         <div className="h-14 flex justify-center gap-5 items-center rounded mx-3 mb-3">

            {/* Logout */}
            <button className="border border-gray-300 rounded-lg p-2 bg-red-500" onClick={(e) => {leaveSession()}}>
               <LogOut className="stroke-white stroke-[3]" />
            </button>

            {/* Mic */}
            <button
               className={`border border-gray-300 rounded-lg p-2 ${isMicEnable ? "bg-green-600" : "bg-gray-400"}`}
               onClick={(e) => {
                  setIsMicEnable(!isMicEnable)
                  publisher.publishAudio(!isMicEnable)
               }}
            >
               {isMicEnable ? <Mic className="stroke-white stroke-[2]" /> : <MicOff className="stroke-black stroke-[2]"/>}
            </button>

            {/* Camera */}
            <button
               className={`border border-gray-300 rounded-lg p-2 ${isCamEnable ? "bg-green-600" : "bg-gray-400"}`}
               onClick={(e) => {
                  setIsCamEnable(!isCamEnable)
                  publisher.publishVideo(!isCamEnable)
               }}
            >
               {isCamEnable ? <Camera className="stroke-white stroke-[2]" /> : <CameraOff className="stroke-black stroke-[2]"/>}
            </button>
         </div>
      </div>
   );
}
export { MeetingRoom };
