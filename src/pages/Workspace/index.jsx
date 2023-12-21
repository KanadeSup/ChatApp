import { useState, useEffect } from "react";
import UtilityBar from "/components/UtilityBar";
import SideBar from "./SideBar";
import { Outlet, useLoaderData } from "react-router-dom";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import useHubStore from "@/storages/useHubStore";

export default function () {
   const { workspace } = useLoaderData()
   const [channelName, setChannelName]= useState("")
   const { hub, setHub } = useHubStore();

   //Kết nối với hub
  useEffect(() => {
   // check access token is valid or not expired
   if (!localStorage.getItem("token")) {
     setHub(null);
     return;
   }
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

   return (
      <div className="flex h-screen w-full">
         <UtilityBar workspace={workspace} colleague notification/>
         <SideBar workspace={workspace} setChannelName={setChannelName}/>
         <Outlet />
      </div>
   );
}

