import UtilityBar from "../../components/UtilityBar";
import NotificationList from "./NotificationList";
import NotificationDetail from "./NotificationDetail";
import NotificationDetailEmpty from "./NotificationDetailEmpty";
import { useEffect, useState } from "react";
import { getWorkspace } from "../../api";
import { useParams } from "react-router-dom";

export default function () {
   const [notification, setNotification] = useState(null);
   const {workspaceId } = useParams()
   return (
      <div className="flex">
         {
            workspaceId ? <UtilityBar workspace colleague notification /> : <UtilityBar logo colleague notification />
         }
         <NotificationList setNotification={setNotification} />
         {notification ? <NotificationDetail notification={notification} /> : <NotificationDetailEmpty />}
      </div>
   );
}
