import { vi } from "date-fns/locale";
import { Camera, CameraOff, LogOut, Mic, MicOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function MeetingRoom({ session, subcribers, publisher }) {
   const videoRef1 = useRef();
   const videoRef2 = useRef();
   const [isMicEnable, setIsMicEnable] = useState(false);
   const [isCamEnable, setIsCamEnable] = useState(false);
   useEffect(()=> {
      if(!publisher &&!!videoRef1) return
      publisher.addVideoElement(videoRef1.current)
      console.log("subcriber", subcribers)
      if(subcribers.length === 0) return 
      subcribers[0].addVideoElement(videoRef2.current)
   }, [subcribers, publisher])

   return (
      <div className="w-full h-screen flex flex-col">
         {/* Camera section */}
         <div className="flex justify-center items-stretch h-full gap-5 p-5 flex-wrap">
            <video style={{}} autoPlay={true} ref={videoRef1} className="border border-black rounded flex-grow" />
            <video autoPlay={true} ref={videoRef2} className="border border-black rounded flex-grow" />
         </div>

         {/* toolbar */}
         <div className="h-14 flex justify-center gap-5 items-center rounded mx-3 mb-3">
            <button className="border border-gray-300 rounded-lg p-2 bg-red-500" onClick={(e) => {}}>
               <LogOut className="stroke-white stroke-[3]" />
            </button>
            <button
               className={`border border-gray-300 rounded-lg p-2 ${isMicEnable ? "bg-green-600" : "bg-gray-400"}`}
               onClick={(e) => setIsMicEnable(!isMicEnable)}
            >
               {isMicEnable ? <Mic className="stroke-white stroke-[2]" /> : <MicOff className="stroke-black stroke-[2]"/>}
            </button>
            <button
               className={`border border-gray-300 rounded-lg p-2 ${isCamEnable ? "bg-green-600" : "bg-gray-400"}`}
               onClick={(e) => setIsCamEnable(!isCamEnable)}
            >
               {isCamEnable ? <Camera className="stroke-white stroke-[2]" /> : <CameraOff className="stroke-black stroke-[2]"/>}
            </button>
         </div>
      </div>
   );
}
export { MeetingRoom };
