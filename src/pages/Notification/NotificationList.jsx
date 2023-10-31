import NotificationItem from "./NotificationItem";

export default function (props) {
  return (
    <div className="h-screen w-72 bg-gray-100 shadow-xl flex-shrink-0 flex flex-col">
      <div className="text-md flex justify-top items-center py-3 px-2 border-b border-gray-400">
        <span className="font-semibold">Notification</span>
      </div>
      <div className="flex flex-col overflow-y-scroll">
        <NotificationItem
          sender={"WorkSpace 1"}
          title={"You have"}
          img={"https://www.famousbirthdays.com/headshots/russell-crowe-1.jpg"}
          time={"31/10/2023"}
          content={"Họp bàn chính trị"}
          onclick={() => {props.setIsDetail(true)}}
        />

        <NotificationItem
          sender={"WorkSpace 2"}
          title={"You have meeting at 17:00 31/10/2023"}
          img={"https://www.famousbirthdays.com/headshots/russell-crowe-1.jpg"}
          time={"31/10/2023"}
          content={"Họp bàn chính trị"}
        />

        <NotificationItem
          sender={"System"}
          title={"Your prenium will be expired at 17:00 31/10/2023"}
          img={"https://www.famousbirthdays.com/headshots/russell-crowe-1.jpg"}
          time={"31/10/2023"}
          content={
            "Your prenium will be exired at 17:00 31/10/2023. Bạn nên gia hạn để được sử dụng các tính năng vip của hệ thống"
          }
        />
        <NotificationItem
          sender={"WorkSpace 1"}
          img={"https://www.famousbirthdays.com/headshots/russell-crowe-1.jpg"}
          title={"You have meeting at 17:00 31/10/2023"}
          time={"31/10/2023"}
          content={"Họp bàn chính trị"}
        />

        <NotificationItem
          sender={"WorkSpace 2"}
          title={"You have meeting at 17:00 31/10/2023"}
          time={"31/10/2023"}
          content={"Họp bàn chính trị"}
        />

        <NotificationItem
          sender={"System"}
          title={"You have meeting at 17:00 31/10/2023"}
          time={"31/10/2023"}
          content={
            "Your prenium will be exired at 17:00 31/10/2023. Bạn nên gia hạn để được sử dụng các tính năng vip của hệ thống"
          }
        />
      </div>
    </div>
  );
}
