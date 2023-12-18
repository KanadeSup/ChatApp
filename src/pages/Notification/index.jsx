import UtilityBar from "../../components/UtilityBar";
import NotificationList from "./NotificationList";
import NotificationDetail from "./NotificationDetail";
import NotificationDetailEmpty from "./NotificationDetailEmpty";
import { useEffect, useState } from "react";
import { getWorkspace } from "../../api";
import { useParams } from "react-router-dom";

export default function () {
   const [isDetail, setIsDetail] = useState(false);
   const [workspace, setWorkspace] = useState(null);
   const { workspaceId } = useParams();
   useEffect(() => {
      if(!workspaceId) return
      const data = getWorkspace(workspaceId);
      setWorkspace(data);
   }, []);
   return (
      <div className="flex">
         {workspace ? <UtilityBar workspace={workspace} colleague notification /> : <UtilityBar logo colleague notification />}
         <NotificationList setIsDetail={setIsDetail} />
         {isDetail ? <NotificationDetail img={"https://www.famousbirthdays.com/headshots/russell-crowe-1.jpg"} /> : <NotificationDetailEmpty />}
      </div>
   );
}
