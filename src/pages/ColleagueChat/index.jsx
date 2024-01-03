import SideBar from "./SideBar";
import { useEffect, useState } from "react";
import "/assets/styles/scrollBar.css";
import UtilityBar from "/components/UtilityBar";
import { Outlet, useParams } from "react-router-dom";
import ColleagueContext from "@/contexts/ColleagueContext";


export default function () {
  const { workspaceId } = useParams();

  const [messages, setMessages] = useState([]);
  const [messagesChild, setMessagesChild] = useState([]); // Lưu lại tin nhắn con của tin nhắn đang được reply

  return (
    <ColleagueContext.Provider
      value={{ messages, setMessages, messagesChild, setMessagesChild }}
    >
      <div className="flex ">
         {/* Utility bar */}
         {workspaceId ? <UtilityBar workspace colleague notification meeting /> : <UtilityBar logo colleague notification />}

        {/* list friend */}
        <SideBar />

        {/* chat box */}
        <Outlet />
      </div>
    </ColleagueContext.Provider>
  );
}
