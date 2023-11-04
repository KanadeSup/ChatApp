import { useState } from "react";
import UtilityBar from "/components/UtilityBar";
import SideBar from "./SideBar";
import ChannelChatSection from "./ChannelChatSection";

export default function () {
  return (
    <div className="flex min-h-screen">
      <UtilityBar colleague notification />
      <SideBar />
      <ChannelChatSection />
    </div>
  );
}
