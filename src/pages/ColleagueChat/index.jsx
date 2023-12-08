import { useState } from "react";
import SideBar from "./SideBar";
import ChatSection from "./ChatSection";
import "/assets/styles/scrollBar.css";
import UtilityBar from "/components/UtilityBar";
import { Outlet } from "react-router-dom";
export default function () {
  // const [isChatOption, setIsChatOption] = useState(false);
  // const [isNewChat, setIsNewChat] = useState(false);
  // const [isClickedReply, setIsClickedReply] = useState(false);
  return (
    <div className="flex ">
      {/* Utility bar */}
      <UtilityBar colleague notification/>

      {/* list friend */}
      {/* <SideBar isNewChat={isNewChat} setIsNewChat={setIsNewChat} /> */}
      <SideBar />

      {/* chat box */}
      <Outlet />
      
    </div>
  );
}
