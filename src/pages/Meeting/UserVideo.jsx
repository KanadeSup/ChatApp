import { Mic, MicOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function UserVideo({ streamManager, userName, className }) {
   const videoRef = useRef(null);
   const [isMicEnable, setIsMicEnable] = useState(false)
   useEffect(() => { 
      if (!streamManager || !videoRef) return;
      streamManager.addVideoElement(videoRef.current);
      streamManager.on("streamPropertyChanged", e=> {
         if(e.changedProperty === "audioActive") {
            setIsMicEnable(e.newValue)
         }
      })
   }, [streamManager]);
   userName = "test"
   return (
      <div className="flex items-center justify-center border border-gray-300 w-full h-full overflow-clip relative rounded-lg bg-gray-900">
        <video autoPlay={true} ref={videoRef} className={`${className} object-cover h-full w-full`} />
        <div className="absolute left-0 bottom-0 bg-gray-700 text-white pl-1 pr-2 font-bold text-sm py-1 flex gap-1 items-center justify-center">
            <MicOff className={`w-4 h-4 stroke-red-500 ${isMicEnable ? "hidden" : ""}`}/>
            {userName} 
         </div> 
      </div>
   );
}
export { UserVideo };
