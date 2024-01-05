import Message from "../../../components/Message";
import ChatBox from "/components/ChatBox";
import ReplySection from "../../../components/ReplySection";
import { useEffect, useState, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import { getMessagesColleague } from "../../../api";
import useIsNewMessage from "../../../storages/useIsNewMessage";
import { getUserById } from "../../../api";
import useColleagueStore from "@/storages/useColleagueStore";
// import useHubStore from "@/storages/useHubStore";
import HubContext from "../../../contexts/HubContext";
import { InfiniteScroll } from "@/components/InfinityScroll";
import {
  SendMessage,
  UpdateMessage,
  DeleteMessage,
  SendEmoji,
  PinMessage,
  DeleteFileColleague,
} from "@/utils/hubs";
import ColleagueContext from "@/contexts/ColleagueContext";
import ColleagueUtility from "./ColleagueUtility";

export default function ChatBoxContent() {
  const { conversationId } = useParams();
  // const { hub, setHub } = useHubStore();
  const { hub, setHub } = useContext(HubContext);
  const { messages, setMessages, messagesChild, setMessagesChild } =
    useContext(ColleagueContext);
  const [jumpId, setJumpId] = useState(null);
  const [pinMessages, setPinMessages] = useState([]); // Lưu lại tin nhắn pin của channel

  // const [messages, setMessages] = useState([]);
  // const [messagesChild, setMessagesChild] = useState([]); // Lưu lại tin nhắn con của tin nhắn đang được reply
  const { isNewMessage, setIsNewMessage } = useIsNewMessage(); // Cập nhập danh sách hiển thị tin nhắn ở sideBar
  const [user, setUser] = useState(null);
  const {
    isClickedReply,
    setIsClickedReply,
    isChatOption,
    setIsChatOption,
    messageParent,
    setMessageParent,
  } = useColleagueStore();
  const [forceScroll, setForceScroll] = useState({});
  const scrollDivRef = useRef();

  // Lấy thêm tin nhắn khi kéo lên trên
  const fetchMoreData = async () => {
    if (messages.length === 0) {
      return;
    }
    const timeFirst = messages[0].sendAt;
    const now = new Date(timeFirst);
    const timeCursor = encodeURIComponent(now.toISOString());
    const data = await getMessagesColleague(conversationId, timeCursor, 6);
    if (data.length === 0) {
      return 0;
    }
    setMessages((prev) => [...data.reverse(), ...prev]);
    return data.length;
  };
   // Lấy thêm tin nhắn khi kéo xuống dưới
   const fetchMoreDataBottom = async () => {
    if (messages.length === 0) {
      return;
    }
    const timeLast = messages[messages.length - 1].sendAt;
    let now = new Date(timeLast);
    now.setMilliseconds(now.getMilliseconds() + 10)
    const timeCursor = encodeURIComponent(now.toISOString());
    const data = await getMessagesColleague(conversationId, timeCursor, 6, null, false, false);
    if (data.length === 0) {
      return 0;
    }
    setMessages((prev) => [...prev, ...data.reverse()]);
    return data.length
  };

  //Lấy thông tin user
  async function fetchData() {
    const data = await getUserById(localStorage.getItem("userId"));
    setUser(data);
    console.log("user", data);
  }
  useEffect(() => {
    fetchData();
  }, []);

  // Xoas tin nhắn khi chuyển sang conversation khác
  useEffect(() => {
    setMessages([]);
    setMessagesChild([]);
  }, [conversationId]);
  //Lấy tin nhắn khi vào conversation
  useEffect(() => {
    async function fetchData() {
      const data = await getMessagesColleague(conversationId, null, 15);
      // Sắp xếp tin nhắn theo thời gian
      if (data.length > 0) {
        setMessages(data.reverse());
      } 
    }
    fetchData();
  }, [conversationId]);

  // Hub nhận tin nhắn update
  useEffect(() => {
    if (hub) {
      hub.off("update_message");
      hub.on("update_message", (message_updated) => {
        console.log("đã chạy nhận update message: ", message_updated);
        if (message_updated.parentId === null) {
          setMessages((messages) =>
            messages.map((message) =>
              message.id === message_updated.id ? message_updated : message
            )
          );
        } else { // Nếu tin nhắn có parentId
          setMessagesChild((messagesChild) =>
            messagesChild.map((messageChild) => {
              if (messageChild.id === message_updated.id) {
                return message_updated;
              } else {
                return messageChild;
              }
            })
          );
        }
        // Lưu lại tin nhắn để hiển thị trong reply box
        if (message_updated.id === localStorage.getItem("idMessage")) {
          setMessageParent(message_updated);
        }
        // Lưu tin nhắn pinned
        if (message_updated.isPined) {
          setPinMessages((pinMessages) => {
            const index = pinMessages.findIndex(
              (pinMessage) => pinMessage.id === message_updated.id
            );
            if (index !== -1) {
              // Nếu tin nhắn đã được ghim, cập nhật nó
              return pinMessages.map((pinMessage) =>
                pinMessage.id === message_updated.id
                  ? message_updated
                  : pinMessage
              );
            } else {
              // Nếu tin nhắn chưa được ghim, thêm nó vào danh sách
              return [message_updated, ...pinMessages];
            }
          });
        } else {
          setPinMessages((pinMessages) =>
            pinMessages.filter(
              (pinMessage) => pinMessage.id !== message_updated.id
            )
          );
        }
        setIsNewMessage(true);
        return () => {
          if (hub) {
            hub.off("update_message");
          }
        };
      });
    } else {
      console.error("Hub is not connected");
    }
  }, [hub]);

  // Hub nhận tin nhắn delete
  useEffect(() => {
    if (hub) {
      hub.off("delete_message");
      hub.on("delete_message", (message_deleted) => {

        if (message_deleted.senderId === localStorage.getItem("userId")) {
          return;
        }

        console.log("đã chạy delete message");
        if (message_deleted.parentId === null) {
          setMessages((messages) =>
            messages.filter((message) => message.id !== message_deleted.id)
          );
        } else {
          console.log("đã chạy delete message child", message_deleted);
          setMessages((currentMessages) => {
            const messages = [...currentMessages]; // Create a new copy of messages
            const parentMessageIndex = messages.findIndex(
              (m) => m.id === message_deleted.parentId
            );
            if (parentMessageIndex !== -1) {
              // If the message has a parent in the current set of messages
              const parentMessage = { ...messages[parentMessageIndex] }; // Create a new copy of the parent message
              parentMessage.childCount -= 1;
              // Lưu lại tin nhắn để hiển thị trong reply box
              setMessageParent(parentMessage);
              setMessagesChild((messagesChild) =>
                messagesChild.filter(
                  (messageChild) => messageChild.id !== message_deleted.id
                )
              );
              // Replace the old parent message with the updated one
              messages[parentMessageIndex] = parentMessage;
              return messages;
            }
            return messages;
          });
        }
        if (message_deleted.id === localStorage.getItem("idMessage")) {
          setMessageParent(null);
          setIsClickedReply(false);
        }
        //setIsNewMessage(true);
        return () => {
          if (hub) {
            hub.off("delete_message");
          }
        };
      });
    } else {
      console.error("Hub is not connected");
    }
  }, [hub]);

  //Hub nhận emoji
  useEffect(() => {
    if (hub) {
      hub.off("receive_emoji");
      hub.on("receive_emoji", (emoji) => {
        console.log("da nhan emoji", emoji);
        setMessages((messages) =>
          messages.map((message) =>
            message.id === emoji.messageId
              ? { ...message, emojiCount: emoji.emojiCount }
              : message
          )
        );
      });
      return () => {
        if (hub) {
          hub.off("receive_emoji");
        }
      };
    } else {
      console.error("Hub is not connected");
    }
  }, [hub]);

  // Hub nhận lỗi
  useEffect(() => {
    if (hub) {
      hub.off("error");
      hub.on("error", (error) => {
        console.log("error", error);
      });
      return () => {
        if (hub) {
          hub.off("error");
        }
      };
    }
  }, [hub]);

  // scroll to bottom
  const scrollToBottom = () => {
    setForceScroll({});
  };

  useEffect(() => {
    if (scrollDivRef.current) {
      scrollDivRef.current.scroll({
        top: scrollDivRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [forceScroll]);

  // if (messages.length === 0) {
  //   console.log("messages null");
  //   return (
  //     <div className="flex flex-col justify-center items-center h-full">
  //       <Avatar>
  //         <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
  //         <AvatarFallback>CN</AvatarFallback>
  //       </Avatar>
  //       <span>{user?.firstName }</span>
  //       <p className="text-gray-500 text-lg font-semibold">
  //         Bắt đầu cuộc trò chuyện
  //       </p>
  //     </div>
  //   );
  // }

  return (
    <div className="flex flex-row">
      <div
        style={{ height: "calc(100vh - 3.5rem)" }}
        className="flex flex-col w-full"
      >
        <InfiniteScroll
          getMore={fetchMoreData}
          getMoreBottom={fetchMoreDataBottom}
          invokeHeight={5}
          scrollDivRef={scrollDivRef}
          className="flex flex-col justify-start overflow-y-scroll h-full min-w-[400px] py-4 gap-1"
          jump={jumpId}
        >
          {messages.map((message) => (
            <Message
              id={`message-${message.id}`}
              key={message.id}
              message={message}
              setMessage={setMessageParent}
              setIsClickedReply={setIsClickedReply}
              setIsClickedChannelUtility={setIsChatOption}
              DeleteMessage={(idMessage) =>
                DeleteMessage(hub, idMessage, setMessages, setIsClickedReply)
              }
              UpdateMessage={(idMessage, message) =>
                UpdateMessage(hub, idMessage, message, false)
              }
              SendEmoji={(emoji) => SendEmoji(hub, message.id, emoji)}
              PinMessage={(messageId) =>
                PinMessage(hub, messageId, !message.isPined)
              }
              DeleteFile={(fileId) =>
                DeleteFileColleague(
                  hub,
                  fileId,
                  message.id,
                  setMessages,
                  setIsClickedReply,
                  false
                )
              }
            />
          ))}
        </InfiniteScroll>

        <ChatBox
          SendMessage={(message, files) =>
            SendMessage(
              hub,
              conversationId,
              message,
              setMessages,
              setIsNewMessage,
              user,
              scrollToBottom,
              false,
              files
            )
          }
          isMention={false}
        />
      </div>
      {isClickedReply && (
        <ReplySection
          message={messageParent}
          setMessage={setMessageParent}
          setIsClickedReply={setIsClickedReply}
          messages={messages}
          setMessages={setMessages}
          messagesChild={messagesChild}
          setMessagesChild={setMessagesChild}
          conversationId={conversationId}
          isChannel={false}
        />
      )}

      {isChatOption && (
        <ColleagueUtility
          setIsChatOption={setIsChatOption}
          setJump={setJumpId}
          isChannel={false}
          conversationId={conversationId}
          setMessages={setMessages}
          setPinMessages={setPinMessages}
          pinMessages={pinMessages}
        />
      )}
    </div>
  );
}
