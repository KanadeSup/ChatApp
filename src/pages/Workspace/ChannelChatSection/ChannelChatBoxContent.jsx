import Message from "../../../components/Message";
import ChatBox from "/components/ChatBox";
import ReplySection from "../../../components/ReplySection";
import ChannelUtility from "./ChannelUtility";
import { useRef, useContext, useEffect, useState } from "react";
import { HubContext } from "../../../contexts/HubContext";
import { Loader2 } from "lucide-react";
import { useOutletContext, useParams } from "react-router-dom";
import { getMessages } from "../../../api";
import InfiniteScroll from "react-infinite-scroller";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

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
    })
  } else {
    console.error('Hub is not connected');
  }
}

export default function ChannelChatBoxContent(props) {
  const { channelId } = useParams();
  const [hub, setHub] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // check access token is valid or not expired
    if (!localStorage.getItem("token")) {
       setHub(null);
       return
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
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  

  //Lấy tin nhắn khi vào channel
  useEffect(() => {
    console.log("id channel: ", channelId);
    async function fetchData() {
      const now = new Date();
      const timeCursor = encodeURIComponent(now.toISOString());
      const data = await getMessages(channelId, timeCursor, 7);
      // Sắp xếp tin nhắn theo thời gian
      const sortedData = data.sort((a, b) => new Date(a.sendAt) - new Date(b.sendAt));
      setMessages(sortedData);
    }
    fetchData();
  }, [channelId]);

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
      <div style={{ height: "calc(100vh - 4rem)" }} className="flex flex-col w-full">
        <div
          className="flex flex-col justify-start min-w-[480px] h-full overflow-y-scroll py-2"
        >
          {/* <InfiniteScroll
            initialLoad={false}
            pageStart={0}
            loadMore={fetchMoreData}
            hasMore={true}
            isReverse={true}
            loader={
              <div className="flex w-full justify-center" key={0}>
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
            }
            useWindow={false}
          > */}
          {messages.map((message, index) => (
            <Message
              key={index}
              index={index}
              message={message}
              setIsClickedReply={props.setIsClickedReply}
              setIsClickedChannelUtility={props.setIsClickedChannelUtility}
            />
          ))}
          {/* </InfiniteScroll> */}
          <div ref={messagesEndRef} />
        </div>
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
