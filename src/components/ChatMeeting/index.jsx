import { useContext, useEffect, useRef, useState } from "react";
import HubContext from "../../contexts/HubContext";
import Message from "../Message";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { getMessages } from "../../api";
import { getUserById } from "@/api";
import { InfiniteScroll } from "@/components/InfinityScroll";
import ChatBox from "@/components/ChatBox";
import GetMemberList from "../../api/channel/GetMemberList";
import {
    SendMessage,
    UpdateMessage,
    DeleteMessage,
    SendEmoji,
    PinMessage,
    DeleteFile,
} from "@/utils/hubs";
import useChannelIdOfMeeting from "../../storages/useChannelIdOfMeeting";

export default function ChatMeeting() {
    const { hub, setHub } = useContext(HubContext);
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState(null);
    const [forceScroll, setForceScroll] = useState({});
    const [isNewMessage, setIsNewMessage] = useState(false); // khoong dung
    const [isClickedReply, setIsClickedReply] = useState(false);// khong dung
    const scrollDivRef = useRef();
    const { channelIdOfMeeting } = useChannelIdOfMeeting();

    // const channelId = "1b8bc266-fd82-45a2-9fbb-08dc0d2b31c6";
    console.log("channelIdOfMeeting chatbox: ", channelIdOfMeeting);

    // Lấy danh sách thành viên trong channel
    async function getMembersChannel() {
        const data = await GetMemberList(channelIdOfMeeting);
        return data;
    }
    //Lấy thông tin user
    async function fetchData() {
        const data = await getUserById(localStorage.getItem("userId"));
        setUser(data);
    }
    useEffect(() => {
        fetchData();
    }, []);
    // Lấy thêm tin nhắn khi kéo lên trên
    const fetchMoreData = async () => {
        if (messages.length === 0) {
            return;
        }
        const timeFirst = messages[0].sendAt;
        const now = new Date(timeFirst);
        const timeCursor = encodeURIComponent(now.toISOString());
        let data = await getMessages(channelIdOfMeeting, 10, timeCursor);
        console.log("data in fetch more data:", data);
        
        if (data.length === 0) {
            return 0;
        }
        data = data.filter((message) => {
            if (message.type !== 1) return message;
        });
        setMessages((prev) => [...data.reverse(), ...prev]);
        return data.length;
    };

    // //Kết nối với hub
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

    //Lấy tin nhắn lần đầu khi vào channel
    useEffect(() => {
        async function fetchData() {
            const now = new Date();
            const timeCursor = encodeURIComponent(now.toISOString());
            let data = await getMessages(channelIdOfMeeting, 20);
            if (data.length === 0) {
                return;
            }
            data = data.filter((message) => {
                if (message.type !== 1) return message;
            });
            setMessages(data.reverse());
        }
        fetchData();
    }, [channelIdOfMeeting]);
    
    useEffect(() => {
        console.log("hub", hub);
        if (hub) {
            hub.off("receive_message");
            hub.on("receive_message", (message) => {
                console.log("da nhan message trong meeting: ", message);
                if (message.receiverId !== channelIdOfMeeting) {
                    return;
                }
                setMessages((prev) => [...prev, message]);
            });
        }
        return () => {
            hub.off("receive_message");
        };
    }, [hub]);

    useEffect(() => {
        if (hub) {
            hub.off("update_message");
            hub.on("update_message", (message_updated) => {
                console.log(
                    "da nhan message update trong meeting: ",
                    message_updated
                );
                if (message_updated.receiverId !== channelIdOfMeeting) {
                    return;
                }
                setMessages((prev) => {
                    const newMessages = prev.map((message) => {
                        if (message.id === message_updated.id) {
                            return message_updated;
                        }
                        return message;
                    });
                    return newMessages;
                });
            });
        }
        return () => {
            hub.off("update_message");
        };
    }, [hub]);

    useEffect(() => {
        if (hub) {
            hub.off("delete_message");
            hub.on("delete_message", (message_deleted) => {
                console.log(
                    "da nhan message delete trong meeting: ",
                    message_deleted
                );
                if (message_deleted.receiverId !== channelIdOfMeeting) {
                    return;
                }
                setMessages((prev) => {
                    const newMessages = prev.filter((message) => {
                        return message.id !== message_deleted.id;
                    });
                    return newMessages;
                });
            });
        }
        return () => {
            hub.off("delete_message");
        };
    }, [hub]);

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
    }, [hub, channelIdOfMeeting]);

    // scroll to bottom
    const scrollToBottom = () => {
        setForceScroll({});
    };

    useEffect(() => {
        scrollDivRef.current.scroll({
            top: scrollDivRef.current.scrollHeight,
            behavior: "smooth",
        });
    }, [forceScroll]);

    return (
        <div className="flex flex-col bg-white 2xl:w-[600px] shadow-lg rounded-md h-screen">
            <InfiniteScroll
                getMore={fetchMoreData}
                invokeHeight={5}
                scrollDivRef={scrollDivRef}
                className="flex flex-col gap-1 justify-start min-w-[400px] h-full overflow-y-scroll pb-4"
            >
                {messages.map((message) => (
                    <Message
                        id={`message-${message.id}`}
                        key={message.id}
                        message={message}
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
                        isMeeting={true}
                    />
                ))}
            </InfiniteScroll>
            <ChatBox
                SendMessage={(message, files) =>
                    SendMessage(
                        hub,
                        channelIdOfMeeting,
                        message,
                        setMessages,
                        setIsNewMessage,
                        user,
                        scrollToBottom,
                        true,
                        files
                    )
                }
                getMembersChannel={getMembersChannel}
                isMention={true}
            />
        </div>
    );
}
