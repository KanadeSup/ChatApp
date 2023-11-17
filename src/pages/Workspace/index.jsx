import { useState } from "react";
import UtilityBar from "/components/UtilityBar";
import SideBar from "./SideBar";
import ChannelChatSection from "./ChannelChatSection";
import { useLoaderData } from "react-router-dom";

export default function () {
   const { workspace } = useLoaderData()
   return (
      <div className="flex min-h-screen">
         <UtilityBar workspace={workspace} colleague notification/>
         <SideBar workspace={workspace}/>
         <ChannelChatSection />
      </div>
   );
}
