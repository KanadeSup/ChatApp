import { useEffect, useState } from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { OpenVidu } from "openvidu-browser";
import { MeetingRoom } from "./MeetingRoom";

export default function () {
   const [hub, setHub] = useState(null);
   const [sessionId, setSessionId] = useState("");
   const [session, setSession] = useState(null);
   const [subcribers, setSubcribers] = useState([]);
   const [publisher, setPublisher] = useState(null);
   const [ov, setOV] = useState(null)
   useEffect(() => {
      // check access token is valid or not expired
      if (!localStorage.getItem("token")) {
         setHub(null);
         return
      } 
      if(hub) return;
      async function connect() {
         const connection = new HubConnectionBuilder()
            .withUrl(`https://api.firar.live/chatHub`, {
               accessTokenFactory: () => {
                  return localStorage.getItem("token");
               },
            })
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build();
         try {
            await connection.start();
            console.log("connect success");
            setHub(connection);
         } catch (e) {
            console.log("error", e);
         }
      }
      connect();
   }, []);

   function leaveSession() {
      if(session) session.disconnect()
      setOV(null)
      setSession(null)
      setSubcribers([])
      setSessionId("")
      setPublisher(null)
   }

   return (
      <div>
         {session === null ? (
            <div>
               <input className="border border-black" value={sessionId} onChange={(e) => setSessionId(e.target.value)} />
               <input type="button" className="border px-2 py-1 border-black" value="create" 
                  onClick={async e=> {
                     const OV = new OpenVidu();
                     setOV(OV)
                     const session = OV.initSession();
                     setSession(session);
                     session.on("streamCreated", (e) => {
                        const subcriber = session.subscribe(e.stream, undefined);
                        subcribers.push(subcriber)
                        setSubcribers([...subcribers])
                     });
                     const id = await hub.invoke("CreateSession", { customSessionId: sessionId })
                     const token = await hub.invoke("CreateToken", id)
                     await session.connect(token)
                     let publisher = await OV.initPublisherAsync(undefined, {
                        audioSource: undefined, // The source of audio. If undefined default microphone
                        videoSource: undefined, // The source of video. If undefined default webcam
                        publishAudio: false, // Whether you want to start publishing with your audio unmuted or not
                        publishVideo: false, // Whether you want to start publishing with your video enabled or not
                        resolution: '1280x540', // The resolution of your video
                        frameRate: 30, // The frame rate of your video
                        insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
                        mirror: false, // Whether to mirror your local video or not
                     });
                     session.publish(publisher);
                     setPublisher(publisher)
                  }}
               />
               <input type="button" className="border px-2 py-1 border-black" value="join"
                  onClick={async e=> {
                     const OV = new OpenVidu();
                     setOV(OV)
                     const session = OV.initSession();
                     setSession(session);
                     session.on("streamCreated", (e) => {
                        const subcriber = session.subscribe(e.stream, undefined);
                        subcribers.push(subcriber)
                        setSubcribers([...subcribers])
                     });
                     const token = await hub.invoke("CreateToken", sessionId)
                     await session.connect(token)
                     let publisher = await OV.initPublisherAsync(undefined, {
                        audioSource: undefined, // The source of audio. If undefined default microphone
                        videoSource: undefined, // The source of video. If undefined default webcam
                        publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                        publishVideo: true, // Whether you want to start publishing with your video enabled or not
                        resolution: '640x480', // The resolution of your video
                        frameRate: 30, // The frame rate of your video
                        insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
                        mirror: false, // Whether to mirror your local video or not
                     });
                     session.publish(publisher);
                     setPublisher(publisher)
                  }}
               />
            </div>
         ) : null}
         {
            session !== null ? (
               <MeetingRoom session={session} subcribers={subcribers} publisher={publisher} leaveSession={leaveSession} />
            ) : null
         }
      </div>
   );
}
