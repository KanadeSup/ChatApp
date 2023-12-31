import Message from "../../../components/Message";
import ChatBox from "/components/ChatBox";
import ReplySection from "../../../components/ReplySection";
import ChannelUtility from "./ChannelUtility";
import { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMessages } from "../../../api";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { InfiniteScroll } from "@/components/InfinityScroll";
import useHubStore from "../../../storages/useHubStore";
import {
  SendMessage,
  UpdateMessage,
  DeleteMessage,
  SendEmoji,
  PinMessage,
  DeleteFile
} from "@/utils/hubs";
import useChannelStore from "@/storages/useChannelStore";
import { getUserById } from "@/api";
import audio from "@/assets/bip.mp3";

// Do có dùng key là id channel bên routes nên khi chuyển channel sẽ re-render
// mỗi component có một “key” duy nhất, Khi một component được cập nhật, React sẽ so sánh key hiện tại với
// key trước đó để xem component có thay đổi hay không. Nếu key không thay đổi, React sẽ cập nhật component hiện tại thay vì tạo lại từ đầu

export default function ChannelChatBoxContent(props) {
  const { channelId } = useParams();
  const { hub, setHub } = useHubStore();
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const [forceScroll, setForceScroll] = useState({});
  const [isNewMessage, setIsNewMessage] = useState(false);
  const [messagesChild, setMessagesChild] = useState([]); // Lưu lại tin nhắn con của tin nhắn đang được reply
  const [pinMessages, setPinMessages] = useState([]); // Lưu lại tin nhắn pin của channel
  // const {jumpId} = useJump()
  const [jumpId, setJumpId] = useState(null)
  const scrollDivRef = useRef();
  const audioRef = useRef();
  const {
    messageParent,
    setMessageParent,
    isClickedReply,
    setIsClickedReply,
    isClickedChannelUtility,
    setIsClickedChannelUtility,
  } = useChannelStore();

  //Kết nối với hub
  useEffect(() => {
    // check access token is valid or not expired
    if (!localStorage.getItem("token")) {
      setHub(null);
      return;
    }
    async function connect() {
      const connection = new HubConnectionBuilder()
        .withUrl(`https://api.firar.live/chatHub`, {
          accessTokenFactory: () => {
            return localStorage.getItem("token");
          },
        })
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Information)
        .build();
      try {
        await connection.start();
        console.log("connect success");
        setHub(connection);
      } catch (e) {
        console.log("error", e);
      }
    }
    connect();
  }, []);

  //Lấy thông tin user
  async function fetchData() {
    const data = await getUserById(localStorage.getItem("userId"));
    setUser(data);
  }
  useEffect(() => {
    fetchData();
  }, []);

  //Lấy tin nhắn lần đầu khi vào channel
  useEffect(() => {
    async function fetchData() {
      const now = new Date();
      const timeCursor = encodeURIComponent(now.toISOString());
      const data = await getMessages(channelId, 15);
      if (data.length === 0) {
        return;
      }
      setMessages(data.reverse());
    }
    fetchData();
  }, [channelId]);

  // Lấy thêm tin nhắn khi kéo lên trên
  const fetchMoreData = async () => {
    if (messages.length === 0) {
      return;
    }
    const timeFirst = messages[0].sendAt;
    const now = new Date(timeFirst);
    const timeCursor = encodeURIComponent(now.toISOString());
    const data = await getMessages(channelId, 6, timeCursor);

    if (data.length === 0) {
      return 0;
    }
    setMessages((prev) => [...data.reverse(), ...prev]);
    return data.length
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
    const data = await getMessages(channelId, 6, timeCursor, false);
    if (data.length === 0) {
      return 0;
    }
    setMessages((prev) => [...prev, ...data.reverse()]);
    return data.length
  };

  // Hub nhận tin nhắn mới
  useEffect(() => {
    if (hub) {
      hub.off("receive_message");
      hub.on("receive_message", (message) => {
        //setIsNewMessage(true);
        console.log("đã chạy receive message");
        if (message.receiverId !== channelId) {
          audioRef.current.play();
          return;
        }

        setMessages((currentMessages) => {
          const messages = [...currentMessages]; // Create a new copy of messages
          const newMessage = { ...message }; // Copy the message object to avoid mutation
          const parentMessageIndex = messages.findIndex(
            (m) => m.id === newMessage.parentId
          );
          if (
            newMessage.receiverId === channelId &&
            parentMessageIndex !== -1
          ) {
            // If the message has a parent in the current set of messages
            const parentMessage = { ...messages[parentMessageIndex] }; // Create a new copy of the parent message

            if (message.parentId === localStorage.getItem("idMessage")) {
              setMessagesChild((messagesChild) => [...messagesChild, message]);
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
  }, [hub, channelId]);

  // Hub nhận tin nhắn update
  useEffect(() => {
    if (hub) {
      hub.off("update_message");
      hub.on("update_message", (message_updated) => {
        console.log("đã chạy update message:", message_updated);
        if (message_updated.parentId === null) {  // Nếu tin nhắn không có parentId
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
        //setIsNewMessage(true);
      });
      return () => {
        hub.off("update_message");
      };
    } else {
      console.error("Hub is not connected");
    }
  }, [hub, channelId]);

  // Hub nhận tin nhắn delete
  useEffect(() => {
    if (hub) {
      hub.off("delete_message");
      hub.on("delete_message", (message_deleted) => {
        console.log("đã chạy delete message");
        if (message_deleted.parentId === null) {
          setMessages((messages) =>
            messages.filter((message) => message.id !== message_deleted.id)
          );
        } else {
          setMessages((messages) => {
            const messagesNew = messages.map((message) => {
              if (message.id === message_deleted.parentId) {
                message.childCount -= 1;
                console.log("message child count:", message.childCount);
                setMessageParent(message);
                setMessagesChild((messagesChild) =>
                  messagesChild.filter(
                    (messageChild) => messageChild.id !== message_deleted.id
                  )
                );
              }
              return message;
            });
            return messagesNew;
          });
        }
        // Lưu tin nhắn pinned
        setPinMessages((pinMessages) =>
          pinMessages.filter(
            (pinMessage) => pinMessage.id !== message_deleted.id
          )
        );
        if (message_deleted.id === localStorage.getItem("idMessage")) {
          setMessageParent(null);
          setIsClickedReply(false);
        }
        //setIsNewMessage(true);
        return () => {
          hub.off("delete_message");
        };
      });
    } else {
      console.error("Hub is not connected");
    }
  }, [hub, channelId]);
  useEffect(() => {
    if (hub) {
      hub.off("error");
      hub.on("error", (error) => {
        console.log("error", error);
      });
      return () => {
        hub.off("error");
      };
    }
  }, [hub, channelId]);

  // scroll to bottom
  const scrollToBottom = () => {
    setForceScroll({});
  };

  useEffect(() => {
    scrollDivRef.current.scroll({top: scrollDivRef.current.scrollHeight, behavior:"smooth"})
  }, [forceScroll]);

  return (
    <div className="flex flex-row bg-white">
      <div
        style={{ height: "calc(100vh - 4rem)" }}
        className="flex flex-col w-full"
      >
        <InfiniteScroll
          getMore={fetchMoreData}
          getMoreBottom={fetchMoreDataBottom}
          invokeHeight={5}
          scrollDivRef={scrollDivRef}
          className="flex flex-col gap-1 justify-start min-w-[400px] h-full overflow-y-scroll pb-4"
          jump={jumpId}
        >
          {messages.map((message) => (
            <Message
              id={`message-${message.id}`}
              key={message.id}
              message={message}
              setMessage={setMessageParent}
              setIsClickedReply={setIsClickedReply}
              setIsClickedChannelUtility={props.setIsClickedChannelUtility}
              DeleteMessage={(idMessage) =>
                DeleteMessage(hub, idMessage, setMessages, setIsClickedReply)
              }
              UpdateMessage={(idMessage, message) =>
                UpdateMessage(hub, idMessage, message, true)
              }
              SendEmoji={(emoji) => SendEmoji(hub, message.id, emoji)}
              PinMessage={(messageId) =>
                PinMessage(hub, messageId, !message.isPined)
              }
              DeleteFile={(fileId) => DeleteFile(hub, fileId)}
            />
          ))}
        </InfiniteScroll>

        <ChatBox
          SendMessage={(message, files) =>
            SendMessage(
              hub,
              channelId,
              message,
              setMessages,
              setIsNewMessage,
              user,
              scrollToBottom,
              true,
              files
            )
          }
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
          conversationId={channelId}
          isChannel={true}
          setIsClickedChannelUtility={props.setIsClickedChannelUtility}
        />
      )}

      {props.isClickedChannelUtility && (
        <ChannelUtility
          setIsClickedChannelUtility={props.setIsClickedChannelUtility}
          conversationId={channelId}
          isChannel={true}
          setPinMessages={setPinMessages}
          pinMessages={pinMessages}
          setMessages={setMessages}
          setJump={setJumpId}
        />
      )}
      <audio ref={audioRef} preload="metadata">
        <source type="audio/mpeg" src={audio} />
      </audio>
    </div>
  );
}
