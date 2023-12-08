import { useState } from "react";
import UtilityBar from "/components/UtilityBar";
import SideBar from "./SideBar";
import { Outlet, useLoaderData } from "react-router-dom";

export default function () {
   const { workspace } = useLoaderData()
   const [channelName, setChannelName]= useState("")
   return (
      <div className="flex min-h-screen w-screen">
         <UtilityBar workspace={workspace} colleague notification/>
         <SideBar workspace={workspace} setChannelName={setChannelName}/>
         <Outlet />
      </div>
   );
}
