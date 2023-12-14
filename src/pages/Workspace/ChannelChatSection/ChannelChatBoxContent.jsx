import Message from "../../../components/Message";
import ChatBox from "/components/ChatBox";
import ReplySection from "../../../components/ReplySection";
import ChannelUtility from "./ChannelUtility";
import { useRef, useContext, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useOutletContext, useParams } from "react-router-dom";
import { getMessages } from "../../../api";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import {InfiniteScroll} from "@/components/InfinityScroll";

// Do có dùng key là id channel bên routes nên khi chuyển channel sẽ re-render
// mỗi component có một “key” duy nhất, Khi một component được cập nhật, React sẽ so sánh key hiện tại với
// key trước đó để xem component có thay đổi hay không. Nếu key không thay đổi, React sẽ cập nhật component hiện tại thay vì tạo lại từ đầu

function SendMessage(hub, channelId, message) {
  console.log("channelId: ", channelId, "send message: ", message);

  if (hub) {
    hub.invoke("SendMessageAsync", {
      ReceiverId: channelId,
      Content: message,
      IsChannel: true,
    });
  } else {
    console.error("Hub is not connected");
  }
}

export default function ChannelChatBoxContent(props) {
  const { channelId } = useParams();
  const [hub, setHub] = useState(null);
  const [messages, setMessages] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [isBottom, setIsBottom] = useState(true);

  const scrollParentRef = useRef(null);
  // Kết nối với hub
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

  // Tự động kéo xuống cuối khi có tin nhắn mới
  // const messagesEndRef = useRef(null);
  // const scrollToBottom = () => {
  //   messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  // };
  // useEffect(() => {
  //   if (isBottom) {
  //     scrollToBottom();
  //   }
  // }, [messages]);

  //Lấy tin nhắn lần đầu khi vào channel
  useEffect(() => {
    console.log("id channel: ", channelId);
    async function fetchData() {
      const now = new Date();
      const timeCursor = encodeURIComponent(now.toISOString());
      const data = await getMessages(channelId, timeCursor, 14);
      if (data.length > 0) setHasMore(true);
      // Sắp xếp tin nhắn theo thời gian
      const sortedData = data.sort(
        (a, b) => new Date(a.sendAt) - new Date(b.sendAt)
      );
      setMessages(sortedData);
    }
    fetchData();
  }, [channelId]);

  // Lấy thêm tin nhắn khi kéo lên trên
  const fetchMoreData = async () => {
    console.log("fetch more data");
    //setIsBottom(false);
    if (messages.length === 0) return;
    const now = new Date(messages[0].sendAt);
    const timeCursor = encodeURIComponent(now.toISOString());
    const data = await getMessages(channelId, timeCursor, 1);
    // Sắp xếp tin nhắn theo thời gian
    const sortedData = data.sort(
      (a, b) => new Date(a.sendAt) - new Date(b.sendAt)
    );
    setMessages((prev) => [...sortedData, ...prev]);
    if (data.length === 0) setHasMore(false);
  };

  // Nhận tin nhắn mới
  useEffect(() => {
    console.log("hub: ", hub);
    if (hub) {
      console.log("hub is not null");
      hub.on("receive_message", (message) => {
        console.log("đã chạy receive message");
        if (message.receiverId !== channelId) return;
        setMessages((prev) => {
          if (prev) return [...prev, message];
          else return [message];
        });
        console.log("receive message: ", message);
        console.log("messages: ", messages);
      });
    } else {
      console.log("error there is no hub to establish function");
    }
  }, [hub, channelId]);

  return (
    <div className="flex flex-row bg-white">
      <div
        style={{ height: "calc(100vh - 4rem)" }}
        className="flex flex-col w-full"
      >
        <InfiniteScroll
          getMore={fetchMoreData}
          invokeHeight={10}
          className="view flex flex-col justify-start min-w-[480px] h-full py-10 overflow-auto"
        >
            {messages.map((message, index) => (
              <Message
                key={message.id}
                index={index}
                message={message}
                setIsClickedReply={props.setIsClickedReply}
                setIsClickedChannelUtility={props.setIsClickedChannelUtility}
              />
            ))}
          {/* <div ref={messagesEndRef} /> */}
        </InfiniteScroll>

        <ChatBox
          SendMessage={(message) => SendMessage(hub, channelId, message)}
        />
      </div>
      {props.isClickedReply && (
        <ReplySection
          setIsClickedReply={props.setIsClickedReply}
          setIsClickedChannelUtility={props.setIsClickedChannelUtility}
        />
      )}
      {props.isClickedChannelUtility && (
        <ChannelUtility
          setIsClickedChannelUtility={props.setIsClickedChannelUtility}
        />
      )}
    </div>
  );
}
