import { useEffect, useState } from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { OpenVidu } from "openvidu-browser";
import { MeetingRoom } from "./MeetingRoom";

async function createSession(sessionId) {
   const res = await fetch("https://demos.openvidu.io/api/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customSessionId: sessionId }),
   });
   return res.text();
}
async function getToken(sessionId) {
   const res = await fetch(`https://demos.openvidu.io/api/sessions/${sessionId}/connections`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
   });
   return res.text();
}
async function joinSession(hub, sessionId, setSession, subcribers, setSubcribers, setPublisher) {
   const OV = new OpenVidu();
   const session = OV.initSession();
   setSession(session);
   session.on("streamCreated", (e) => {
      const subcriber = session.subscribe(e.stream, undefined);
      subcribers.push(subcriber)
      setSubcribers([...subcribers])
   });
   
   // const id = await createSession("SessionA");
   console.log("id",id)
   const token = await getToken(id);
   // const token = await hub.invoke("CreateToken", id)
   await session.connect(token, { clientData: (sessionId === "123" ? "bbb": "aaa")});
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
   var devices = await OV.getDevices();
   var videoDevices = devices.filter(device => device.kind === 'videoinput');
   var currentVideoDeviceId = publisher.stream.getMediaStream().getVideoTracks()[0].getSettings().deviceId;
   var currentVideoDevice = videoDevices.find(device => device.deviceId === currentVideoDeviceId);
   setPublisher(publisher)
}

export default function () {
   const [hub, setHub] = useState();
   const [sessionId, setSessionId] = useState("");
   const [session, setSession] = useState(null);
   const [subcribers, setSubcribers] = useState([]);
   const [publisher, setPublisher] = useState();
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
   useEffect(()=> {
      if(!hub) return
      
   }, [hub])

   return (
      <div>
         {session === null ? (
            <div>
               <input className="border border-black" value={sessionId} onChange={(e) => setSessionId(e.target.value)} />
               <input type="button" className="border px-2 py-1 border-black" value="create" 
                  onClick={async e=> {
                     const OV = new OpenVidu();
                     const session = OV.initSession();
                     setSession(session);
                     session.on("streamCreated", (e) => {
                        const subcriber = session.subscribe(e.stream, undefined);
                        subcribers.push(subcriber)
                        setSubcribers([...subcribers])
                     });
                     const id = await hub.invoke("CreateSession", { customSessionId: sessionId })
                     console.log("sessionId", id)
                     const token = await hub.invoke("CreateToken", id)
                     console.log("token",token)
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
               <input type="button" className="border px-2 py-1 border-black" value="join"
                  onClick={async e=> {
                     const OV = new OpenVidu();
                     const session = OV.initSession();
                     setSession(session);
                     session.on("streamCreated", (e) => {
                        const subcriber = session.subscribe(e.stream, undefined);
                        subcribers.push(subcriber)
                        setSubcribers([...subcribers])
                     });
                     const token = await hub.invoke("CreateToken", sessionId)
                     console.log("token",token)
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
               <MeetingRoom session={session} subcribers={subcribers} publisher={publisher} />
            ) : null
         }
      </div>
   );
}
