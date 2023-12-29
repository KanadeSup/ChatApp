import { vi } from "date-fns/locale";
import { Camera, CameraOff, LogOut, Mic, MicOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { UserVideo } from "./UserVideo";
import { useFetcher, useParams } from "react-router-dom";

function MeetingRoom({ session, subcribers, setSubcribers, publisher, setPublisher, leaveSession }) {
   const [isMicEnable, setIsMicEnable] = useState(false);
   const [isCamEnable, setIsCamEnable] = useState(false);
   const [participants, setParticipants] = useState([]);
   const [pinnedUser, setPinnedUser] = useState(null);
   const { deviceType } = useParams();
   useEffect(() => {
      const datas = [];
      if (publisher) {
         datas.push(publisher);
      }
      subcribers.map((sub) => datas.push(sub));
      setParticipants(datas);
   }, [publisher, subcribers]);
   function setParticipant(parti) {
      if (parti.id === publisher.id) {
         setPublisher({ ...parti });
         return;
      }
      for (let i = 0; i < subcribers; i++) {
         if (subcribers[i].id === parti.id) {
            subcribers[i] === parti;
            setSubcribers([...subcribers]);
            return;
         }
      }
   }
   return (
      <div className="w-full h-screen flex flex-col">
         {/* Pinned layout */}
         {pinnedUser !== null && !deviceType ? (
            <div className={`flex h-full items-center justify-items-center p-5 min-h-0 min-w-0 gap-5`}>
               {/* Main Stream */}
               <div className="rounded-lg w-[75%] h-full flex">
                  <UserVideo
                     participant={pinnedUser}
                     setParticipant={setParticipant}
                     isPublisher={publisher === pinnedUser}
                     setPinnedUser={setPinnedUser}
                     className="w-full"
                  />
               </div>

               {/* Sub Stream */}
               <div className="h-full w-[25%] flex flex-wrap items-start justify-between content-start gap-1 overflow-y-scroll">
                  {participants.length !== 0
                     ? participants
                          .filter((participant) => participant !== pinnedUser)
                          .map((participant) => (
                             <UserVideo
                                key={participant.id}
                                setParticipant={setParticipant}
                                participant={participant}
                                isPublisher={publisher === participant}
                                setPinnedUser={setPinnedUser}
                                className="w-[calc(50%-3px)]"
                             />
                          ))
                     : null}
               </div>
            </div>
         ) : null}

         {/* Grid layout */}
         {pinnedUser === null && !deviceType ? (
            <div
               className={`grid grid-flow-row gap-4 h-full items-center justify-items-center p-5 min-h-0 min-w-0 overflow-hidden
                     ${
                        subcribers.length === 0
                           ? "grid-cols-1"
                           : subcribers.length > 0 && subcribers.length <= 3
                           ? "grid-cols-2"
                           : subcribers.length > 3 && subcribers.length <= 8
                           ? "grid-cols-3"
                           : subcribers.length > 8 && subcribers.length <= 15
                           ? "grid-cols-4"
                           : subcribers.length > 15
                           ? "grid-cols-5"
                           : ""
                     }`}
            >
               <UserVideo
                  participant={publisher}
                  publisher
                  className={`h-full w-full min-w-0 min-h-0 rounded-lg ${
                     subcribers.length > 0 && subcribers.length <= 3 ? "flex items-center" : ""
                  }`}
                  setPinnedUser={setPinnedUser}
                  setParticipant={setParticipant}
                  isPublisher
               />
               {subcribers.length !== 0
                  ? subcribers.map((subcriber) => (
                       <UserVideo
                          key={subcriber.id}
                          participant={subcriber}
                          className={`h-full w-full min-w-0 min-h-0 rounded-lg ${
                             subcribers.length > 0 && subcribers.length <= 3 ? "flex items-center" : ""
                          }`}
                          setPinnedUser={setPinnedUser}
                          setParticipant={setParticipant}
                       />
                    ))
                  : null}
            </div>
         ) : null}

         {/* Mobile Grid Layout */}
         {deviceType?.toUpperCase() === "MOBILE" ? (
            <div className="flex flex-col h-full min-h-0 min-w-0">
               <div className="flex overflow-x-auto">
                  {
                     subcribers.slice(2).map(sub=>(
                        <UserVideo
                           key={sub.id}
                           setParticipant={setParticipant}
                           participant={sub}
                           className={`h-full min-w-0 min-h-0 rounded-lg`}
                           isPublisher
                           setPinnedUser={setPinnedUser}
                        />
                     ))
                  }
               </div>
               {
                  subcribers.slice(0,2).map(sub=>(
                     <UserVideo
                        key={sub.id}
                        className={`h-full w-full min-w-0 min-h-0 rounded-lg ${
                           subcribers.length > 0 && subcribers.length <= 3 ? "flex items-center" : ""
                        }`}
                        setParticipant={setParticipant}
                        participant={sub}
                        isPublisher
                        setPinnedUser={setPinnedUser}
                     />
                  ))
               }
               <UserVideo
                  setParticipant={setParticipant}
                  participant={publisher}
                  isPublisher
                  className={`h-full w-full min-w-0 min-h-0 rounded-lg ${
                     subcribers.length > 0 && subcribers.length <= 3 ? "flex items-center" : ""
                  }`}
                  setPinnedUser={setPinnedUser}
               />
            </div>
         ) : null}

         {/* toolbar */}
         <div className="h-14 flex justify-center gap-5 items-center rounded mx-3 mb-3">
            {/* Logout */}
            <button
               className="border border-gray-300 rounded-lg p-2 bg-red-500"
               onClick={(e) => {
                  leaveSession();
               }}
            >
               <LogOut className="stroke-white stroke-[3]" />
            </button>

            {/* Mic */}
            <button
               className={`border border-gray-300 rounded-lg p-2 ${isMicEnable ? "bg-green-600" : "bg-gray-400"}`}
               onClick={(e) => {
                  setIsMicEnable(!isMicEnable);
                  publisher.streamManager.publishAudio(!isMicEnable);
                  publisher.isAudio = !isMicEnable;
                  setPublisher({ ...publisher });
               }}
            >
               {isMicEnable ? (
                  <Mic className="stroke-white stroke-[2]" />
               ) : (
                  <MicOff className="stroke-black stroke-[2]" />
               )}
            </button>

            {/* Camera */}
            <button
               className={`border border-gray-300 rounded-lg p-2 ${isCamEnable ? "bg-green-600" : "bg-gray-400"}`}
               onClick={(e) => {
                  setIsCamEnable(!isCamEnable);
                  publisher.streamManager.publishVideo(!isCamEnable);
               }}
            >
               {isCamEnable ? (
                  <Camera className="stroke-white stroke-[2]" />
               ) : (
                  <CameraOff className="stroke-black stroke-[2]" />
               )}
            </button>
         </div>
      </div>
   );
}
export { MeetingRoom };
