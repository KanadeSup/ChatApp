import UtilityBar from "../../components/UtilityBar";
import NotificationList from "./NotificationList";
import NotificationDetail from "./NotificationDetail";
import NotificationDetailEmpty from "./NotificationDetailEmpty";
import { useState } from "react";

export default function () {
  const [isDetail, setIsDetail] = useState(false);
  return (
    <div className="flex">
      <UtilityBar colleague notification />
      <NotificationList setIsDetail={setIsDetail}/>
      {isDetail ? <NotificationDetail img={"https://www.famousbirthdays.com/headshots/russell-crowe-1.jpg"}/> : <NotificationDetailEmpty />}
    </div>
  );
}
