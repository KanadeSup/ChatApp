import FriendMessagePreview from "./FriendMessagePreview";
import SideBarHeader from "./SideBarHeader";
import { useState, useEffect, useContext, useRef } from "react";
import getConversions from "../../../api/colleague/getConversions";
import useIsNewMessage from "../../../storages/useIsNewMessage";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import useColleagueStore from "@/storages/useColleagueStore";
import useHubStore from "@/storages/useHubStore";
import ColleagueContext from "../../../contexts/ColleagueContext";
import audio from "@/assets/bip.mp3";


export default function () {
  const { messages, setMessages, messagesChild, setMessagesChild } = useContext(ColleagueContext);
  const { hub } = useHubStore();
  const { isNewMessage, setIsNewMessage } = useIsNewMessage();
  const [conversations, setConversations] = useState([]); // Danh sách các cuộc trò chuyện
  const { isClickedReply, setIsClickedReply, messageParent, setMessageParent } = useColleagueStore();
  const [conversationId, setConversationId] = useState(null); // Id của cuộc trò chuyện đang được chọn
  const navigate = useNavigate();
  const { workspaceId } = useParams()
  const audioRef = useRef();

  useEffect(() => {
    async function fetchConversions() {
      const response = await getConversions("", 0, 10);
      console.log("conversations: ", response);
      setConversations(response);
      setIsNewMessage(false);
      // if (!conversationId && response.length > 0) {
      //   console.log("conversationId cai dau tien: ", response[0].id);
      //   navigate(workspaceId ? `/${workspaceId}/colleague-chat/${response[0].id}` : `/colleague-chat/${response[0].id}`);
      // }

    }
    // if (isNewMessage) {
      fetchConversions();
    //}
  }, [isNewMessage]);

  // Hub nhận tin nhắn mới
  useEffect(() => {
    if (hub) {
      hub.off("receive_message");
      hub.on("receive_message", (message) => {
        console.log("message đã nhận: ", message);
        setIsNewMessage(true);
        console.log("conversationId", conversationId);
        console.log("message.senderId", message.senderId);
        if ((message.senderId !== conversationId) || (message.receiverId !== localStorage.getItem("userId"))) {
          audioRef.current.play();
          return;
        }

        // Nếu tin nhắn là của mình thì không hiển thị
        if (message.senderId === localStorage.getItem("userId")) {
          return;
        }

        setMessages((currentMessages) => {
          const messages = [...currentMessages];
          const newMessage = { ...message };
          const parentMessageIndex = messages.findIndex(
            (m) => m.id === newMessage.parentId
          );
          if (
            newMessage.senderId === conversationId &&
            parentMessageIndex !== -1
          ) {
            const parentMessage = { ...messages[parentMessageIndex] };

            if (message.parentId === localStorage.getItem("idMessage")) {
              setMessagesChild((messagesChild) => [
                ...messagesChild,
                newMessage,
              ]);
            }
            parentMessage.childCount += 1;

            // Lưu lại tin nhắn để hiển thị trong reply box
            if (parentMessage.id === localStorage.getItem("idMessage")) {
              setMessageParent(parentMessage);
            }
            // Replace the old parent message with the updated one
            messages[parentMessageIndex] = parentMessage;
          } else {
            // If the message doesn't have a parent in the current set of messages, add it to the set
            messages.push(newMessage);
          }
          return messages;
        });
      });
      return () => {
        hub.off("receive_message");
      };
    } else {
      console.error("Hub is not connected");
    }
  }, [hub, conversationId]);


  return (
    <div className="h-screen w-72 shadow-xl flex-shrink-0 border-r">
      <audio ref={audioRef} preload="metadata">
        <source type="audio/mpeg" src={audio} />
      </audio>
      <SideBarHeader />

      <div
        style={{ height: "calc(100vh - 3.5rem)" }}
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
            onClick={() => {setIsClickedReply(false);}}
          >
            <FriendMessagePreview
              key={user.id}
              id={user.id}
              name={user.name}
              avatar={user.avatar}
              lastMessage={user.lastMessage}
              lastMessageSender={user.lastMessageSender}
              time={user.lastMessageTime}
              isRead={user.isRead}
              isActive={user.isActive}
              isOnline={user.isOnline}

              setConversationId={setConversationId}
            />
          </NavLink>
        ))}
      </div>
    </div>
  );
}
