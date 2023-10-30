import { useState } from "react";
import SideBar from "./SideBar";
import ChatSection from "./ChatSection";
import "/assets/styles/scrollBar.css";
import UtilityBar from "/components/UtilityBar";
export default function () {
  const [isChatOption, setIsChatOption] = useState(false);
  const [isNewChat, setIsNewChat] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  return (
    <div className="flex ">
      {/* Utility bar */}
      <UtilityBar colleague notification/>

      {/* list friend */}
      <SideBar isNewChat={isNewChat} setIsNewChat={setIsNewChat} />

      {/* chat box */}
      <ChatSection
        isChatOption={isChatOption}
        setIsChatOption={setIsChatOption}
        isNewChat={isNewChat}
        setIsNewChat={setIsNewChat}
      />
      
    </div>
  );
}
