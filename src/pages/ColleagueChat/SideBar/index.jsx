import FriendMessagePreview from "./FriendMessagePreview";
import SideBarHeader from "./SideBarHeader";
import { useState, useEffect } from "react";
import axios from "axios";

export default function (props) {
  const [chatUserList, setChatUserList] = useState([]); // Danh sách user chat
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:3000/users");
      setChatUserList(result.data);
    };
    fetchData();
  }, []);
  return (
    <div className="h-screen w-72 bg-gray-100 shadow-xl flex-shrink-0">
      <SideBarHeader isNewChat={props.isNewChat} setIsNewChat={props.setIsNewChat} />

      <div
        style={{ height: "calc(100vh - 3rem)" }}
        className="flex flex-col flex-grow -z-10 justify-start overflow-y-auto"
      >
        {chatUserList.map((user) => (
          <FriendMessagePreview
            key={user.id}
            name={user.name}
            avatar={user.avatar}
            lastMessage={user.lastMessage}
            time={user.time}
            isRead={user.isRead}
            isActive={user.isActive}
          />
        ))}
      </div>
    </div>
  );
}
