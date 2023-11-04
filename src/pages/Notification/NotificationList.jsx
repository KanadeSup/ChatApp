import NotificationItem from "./NotificationItem";

export default function (props) {
  return (
    <div className="h-screen w-72 bg-gray-100 shadow-xl flex-shrink-0 flex flex-col">
      <div className="text-md flex justify-start items-center py-3 px-3 border-b bg-gradient-to-l from-gray-100 to-gray-200 h-12 shadow">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-5 h-5 mr-2 stroke-neutral-500 relative top-[1px]"
        >
          <path d="M10 21h4a2 2 0 01-4 0zm-6.924-2.617a1 1 0 01.217-1.09L5 15.586V10a7.006 7.006 0 016-6.92V2a1 1 0 012 0v1.08A7.006 7.006 0 0119 10v5.586l1.707 1.707A1 1 0 0120 19H4a1 1 0 01-.924-.617zM6.414 17h11.172l-.293-.293A1 1 0 0117 16v-6a5 5 0 00-10 0v6a1 1 0 01-.293.707z"></path>
        </svg>
        <span className="font-semibold text-neutral-700">Notification</span>
      </div>
      <div className="flex flex-col overflow-y-scroll">
        <NotificationItem
          sender={"WorkSpace 1"}
          title={"You have"}
          img={"https://www.famousbirthdays.com/headshots/russell-crowe-1.jpg"}
          time={"31/10/2023"}
          content={"Họp bàn chính trị"}
          onclick={() => {
            props.setIsDetail(true);
          }}
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
