import { OpenVidu } from "openvidu-browser";
import { useEffect, useRef, useState } from "react"
import { useLoaderData, useNavigate } from "react-router-dom"
import useInfo from "/storages/useInfo"
import { Camera, Loader2, Mic, User2, X } from "lucide-react";
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
   Avatar,
   AvatarFallback,
   AvatarImage,
 } from "@/components/ui/avatar"
import {getUserById} from "/api"
import { VideoSection } from "./VideoSection";
function MeetingRoom() {
   const {token, meeting} = useLoaderData()
   const [session, setSession] = useState(null);
   const [subcribers, setSubcribers] = useState([]);
   const [publisher, setPublisher] = useState(null);
   const [ov, setOV] = useState(null);
   const { user, setUser } = useInfo()
   const [isMicEnable, setIsMicEnable] = useState(false)
   const [isCamEnable, setIsCamEnable] = useState(false)
   const joinRef = useRef()
   const loaderRef=useRef()
   const navigate = useNavigate()
   const sessionRef = useRef()
   function leaveSession() {
      if (sessionRef.current) {
         sessionRef.current.disconnect();
      }
      setOV(null);
      setSession(null);
      setSubcribers([]);
      setPublisher(null);
   }
   useEffect(()=>{
      sessionRef.current = session
   },[session])
   useEffect(()=>{
      return ()=>{
         leaveSession()
      }
   }, [])
   useEffect(()=>{
      if(user) return
      async function fetchUser() {
         const userId = localStorage.getItem("userId");
         const data = await getUserById(userId)
         setUser(data)
      }
      fetchUser()
   },[user])
   async function initialize() {
      joinRef.current.disabled = true
      loaderRef.current.classList.remove("hidden")
      const OV = new OpenVidu();
      setOV(OV);
      const session = OV.initSession();
      session.on("streamCreated", (e) => {
         const connectionData = JSON.parse(e.stream.connection.data)
         const subcriber = session.subscribe(e.stream, undefined);
         subcribers.push({
            id: `subcriber_${subcribers.length}`,
            streamManager: subcriber,
            isMute: false,
            isAudio: e.stream.audioActive,
            isVideo: e.stream.videoActive,
            name: connectionData.name,
            avatar: connectionData.avatar,
         });
         subcriber.on("streamPropertyChanged", (e) => {
            if (e.changedProperty === "audioActive") {
               for (let i = 0; i < subcribers.length; i++) {
                  if (subcribers[i].streamManager === subcriber) {
                     subcribers[i].isAudio = e.newValue;
                     setSubcribers([...subcribers]);
                     return;
                  }
               }
            }
            if (e.changedProperty === "videoActive") {
               for (let i = 0; i < subcribers.length; i++) {
                  if (subcribers[i].streamManager === subcriber) {
                     subcribers[i].isVideo = e.newValue;
                     setSubcribers([...subcribers]);
                     return;
                  }
               }
            }
         });
         setSubcribers([...subcribers]);
      });
      session.on("streamDestroyed", (e) => {
         let idx = -1;
         subcribers.map((data, i) => {
            if (data.streamManager === e.stream.streamManager) idx = i;
         });
         if (idx === -1) return;
         subcribers.splice(idx, 1);
         setSubcribers([...subcribers]);
      });
      await session.connect(token, {
         name: user.username,
         avatar: user.picture,
      });
      const publisher = await OV.initPublisherAsync(undefined, {
         audioSource: undefined, // The source of audio. If undefined default microphone
         videoSource: undefined, // The source of video. If undefined default webcam
         publishAudio: isMicEnable, // Whether you want to start publishing with your audio unmuted or not
         publishVideo: isCamEnable, // Whether you want to start publishing with your video enabled or not
         resolution: "640x360", // The resolution of your video
         frameRate: 30, // The frame rate of your video
         insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
         mirror: false, // Whether to mirror your local video or not
      });
      session.publish(publisher);
      setPublisher({
         id: "publiser",
         streamManager: publisher,
         isMute: false,
         isAudio: isMicEnable,
         isVideo: isCamEnable,
         name: user.username,
         avatar: user.picture
      });
      setSession(session)
   }
   if(!user) return (
      <div className="w-full h-screen flex items-center justify-center">
         <Loader2 className="w-32 h-32 animate-spin"/>
      </div>
   )
   return (
      <div>
         {
            session === null ? (
               <div className="flex  flex-col items-center justify-center h-screen">
                  <X 
                     className="absolute right-5 top-5 w-10 h-10 p-2 border-2 border-gray-600 stroke-gray-600 rounded-full stroke-[3] cursor-pointer"
                     onClick={e=>navigate("..", {relative: "path"})}   
                  />
                  <div className="text-lg text-gray-600 mb-5 flex flex-col gap-3 items-center">
                     Choose your video and audio setting before join the meeting
                     <h1 className="text-black text-2xl font-bold"> {meeting.name} </h1>
                  </div>
                  <div className="py-10 px-40 rounded-lg flex flex-col items-center justify-center border border-gray-300">
                     <Avatar className="w-40 h-40 ">
                        <AvatarImage src={user.picture} alt="@shadcn"  className="w-40 h-40"/>
                        <AvatarFallback className="w-40 h-40"> <User2 /> </AvatarFallback>
                     </Avatar>
                     <Button className="px-10 font-semibold mt-5"
                        ref={joinRef}
                        onClick={e=>{
                           initialize()
                        }}
                     >
                        <Loader2 ref={loaderRef} className="w-4 h-4 mr-2 animate-spin hidden"/>
                        Join now
                     </Button>
                     <div className="flex items-center gap-20 mt-5">
                        <div className="flex gap-2 items-center">
                           <Camera className="stroke-gray-500"/>
                           <Switch checked={isCamEnable} onCheckedChange={check=>setIsCamEnable(check)} />
                        </div>
                        <div className="flex gap-2 items-center">
                           <Mic className="stroke-gray-500"/>
                           <Switch checked={isMicEnable} onCheckedChange={check=>setIsMicEnable(check)}/>
                        </div>
                     </div>
                  </div> 
               </div>
            ) : null
         }
         {
            session !== null ? (
               <VideoSection 
                  defaultCamera={isCamEnable}
                  defaultMic={isMicEnable}
                  setSubcribers={setSubcribers}
                  subcribers={subcribers}
                  setPublisher={setPublisher}
                  publisher={publisher}
                  leaveSession={leaveSession}
               />
            ) : null
         }
      </div>
   )
}
export { MeetingRoom } 