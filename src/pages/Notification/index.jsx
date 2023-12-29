import UtilityBar from "../../components/UtilityBar";
import NotificationList from "./NotificationList";
import NotificationDetail from "./NotificationDetail";
import NotificationDetailEmpty from "./NotificationDetailEmpty";
import { useEffect, useState } from "react";
import { getWorkspace } from "../../api";
import { useParams } from "react-router-dom";

export default function () {
   const [notification, setNotification] = useState(null);
   const [forceLoad, setForceLoad] = useState({});
   const {workspaceId } = useParams()
   return (
      <div className="flex">
         {
            workspaceId ? <UtilityBar workspace colleague notification meeting/> : <UtilityBar logo colleague notification />
         }
         <NotificationList setNotification={setNotification} forceLoad={forceLoad} setForceLoad={setForceLoad} />
         {notification ? <NotificationDetail notification={notification} setNotification={setNotification} setForceLoad={setForceLoad} /> : <NotificationDetailEmpty />}
      </div>
   );
}
