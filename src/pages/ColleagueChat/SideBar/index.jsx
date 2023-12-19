import FriendMessagePreview from "./FriendMessagePreview";
import SideBarHeader from "./SideBarHeader";
import { useState, useEffect } from "react";
import getConversions from "../../../api/colleague/getConversions";
import convertTime from "../../../utils/convertTime";
import useIsNewMessage from "../../../storages/useIsNewMessage";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import useColleagueStore from "@/storages/useColleagueStore";


export default function () {
  const { isNewMessage, setIsNewMessage } = useIsNewMessage();
  const [conversations, setConversations] = useState([]); // Danh sách các cuộc trò chuyện
  const { isClickedReply, setIsClickedReply } = useColleagueStore();
  const { conversationId } = useParams();
  const navigate = useNavigate();
  const { workspaceId } = useParams()
  useEffect(() => {
    async function fetchConversions() {
      const response = await getConversions("", 0, 10);
      setConversations(response);
      setIsNewMessage(false);
      if (!conversationId && response.length > 0) {
        console.log("conversationId: ", response[0].id);
        navigate(workspaceId ? `/${workspaceId}/colleague-chat/${response[0].id}` : `/colleague-chat/${response[0].id}`);
      }

    }
    // if (isNewMessage) {
      fetchConversions();
    //}
  }, [isNewMessage]);
  return (
    <div className="h-screen w-72 shadow-xl flex-shrink-0 border-r">
      <SideBarHeader />

      <div
        style={{ height: "calc(100vh - 3rem)" }}
        className="flex flex-col flex-grow -z-10 justify-start overflow-y-auto space-y-1"
      >
        {conversations.length === 0 && (<p className="flex items-center justify-center h-10 font-medium text-gray-600">No one here</p>)}
        {conversations.map((user) => (
          <NavLink
            key={user.id}
            to={workspaceId ? `/${workspaceId}/colleague-chat/${user.id}` : `/colleague-chat/${user.id}`}
            className={({ isActive, isPending }) =>
              isPending ? "" : isActive ? "bg-gray-100" : ""
            }
            onClick={() => setIsClickedReply(false)}

          >
            <FriendMessagePreview
              key={user.id}
              id={user.id}
              name={user.name}
              avatar={user.avatar}
              lastMessage={user.lastMessage}
              time={user.lastMessageTime}
              isRead={user.isRead}
              isActive={user.isActive}
              isOnline={user.isOnline}
            />
          </NavLink>
        ))}
      </div>
    </div>
  );
}
