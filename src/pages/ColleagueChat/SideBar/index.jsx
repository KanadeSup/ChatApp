import FriendMessagePreview from "./FriendMessagePreview";
import SideBarHeader from "./SideBarHeader";
import { useState, useEffect } from "react";
import getConversions from "../../../api/colleague/getConversions";
import convertTime from "../../../utils/convertTime";
import useIsNewMessage from "../../../storages/useIsNewMessage";
import { is } from "date-fns/locale";
export default function () {
  const { isNewMessage, setIsNewMessage } = useIsNewMessage();
  const [conversations, setConversations] = useState([]); // Danh sách các cuộc trò chuyện
  useEffect(() => {
    async function fetchConversions() {
      const response = await getConversions("", 0, 10);
      console.log("response", response);
      setConversations(response);
      setIsNewMessage(false);
      console.log("đã reset");
    }
    fetchConversions();
  }, [isNewMessage]);
  return (
    <div className="h-screen w-72 shadow-xl flex-shrink-0">
      <SideBarHeader />

      <div
        style={{ height: "calc(100vh - 3rem)" }}
        className="flex flex-col flex-grow -z-10 justify-start overflow-y-auto"
      >
        {conversations.map((user) => (
          <FriendMessagePreview
            key={user.id}
            id={user.id}
            name={user.name}
            avatar={user.avatar}
            lastMessage={user.lastMessage}
            time={convertTime(user.lastMessageTime)}
            isRead={user.isRead}
            isActive={user.isActive}
          />
        ))}
      </div>
    </div>
  );
}
