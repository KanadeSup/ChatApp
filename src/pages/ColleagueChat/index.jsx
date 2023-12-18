import { useEffect, useState } from "react";
import SideBar from "./SideBar";
import ChatSection from "./ChatSection";
import "/assets/styles/scrollBar.css";
import UtilityBar from "/components/UtilityBar";
import { Outlet, useParams } from "react-router-dom";
import { getWorkspace } from "../../api";
export default function () {
   // const [isChatOption, setIsChatOption] = useState(false);
   // const [isNewChat, setIsNewChat] = useState(false);
   // const [isClickedReply, setIsClickedReply] = useState(false);
   const [workspace, setWorkspace] = useState(null);
   const { workspaceId } = useParams();
   useEffect(() => {
      if (!workspaceId) return;
      const data = getWorkspace(workspaceId);
      setWorkspace(data);
   }, []);
   return (
      <div className="flex ">
         {workspace ? <UtilityBar workspace={workspace} colleague notification /> : <UtilityBar logo colleague notification />}
         <SideBar />
         <Outlet />
      </div>
   );
}
