import { useContext, useEffect, useRef, useState } from "react";
import HubContext from "../../contexts/HubContext";
import Message from "../Message";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { getMessages } from "../../api";
import { getUserById } from "@/api";
import { InfiniteScroll } from "@/components/InfinityScroll";
import ChatBox from "@/components/ChatBox";
import GetMemberList from "../../api/channel/GetMemberList";
import ReplySection from "../ReplySection";
import {
    SendMessage,
    UpdateMessage,
    DeleteMessage,
    SendEmoji,
    PinMessage,
    DeleteFile,
} from "@/utils/hubs";
import useChannelIdOfMeeting from "../../storages/useChannelIdOfMeeting";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";

export default function ChatMeeting({setIsChatMeeting}) {
    const { hub, setHub } = useContext(HubContext);
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState(null);
    const [forceScroll, setForceScroll] = useState({});
    const [isNewMessage, setIsNewMessage] = useState(false); // khoong dung
    const [isClickedReply, setIsClickedReply] = useState(false);
    const scrollDivRef = useRef();
    const { channelIdOfMeeting } = useChannelIdOfMeeting();
    const [messageParent, setMessageParent] = useState(null);
    const [messagesChild, setMessagesChild] = useState([]); // Lưu lại tin nhắn con của tin nhắn đang được reply

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
        console.log("hub laf: ", hub)
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
                setMessages((currentMessages) => {
                    const messages = [...currentMessages]; // Create a new copy of messages
                    const newMessage = { ...message }; // Copy the message object to avoid mutation
                    const parentMessageIndex = messages.findIndex(
                        (m) => m.id === newMessage.parentId
                    );
                    if (
                        newMessage.receiverId === channelIdOfMeeting &&
                        parentMessageIndex !== -1
                    ) {
                        // If the message has a parent in the current set of messages
                        const parentMessage = {
                            ...messages[parentMessageIndex],
                        }; // Create a new copy of the parent message

                        if (
                            message.parentId ===
                            localStorage.getItem("idMessage")
                        ) {
                            setMessagesChild((messagesChild) => [
                                ...messagesChild,
                                message,
                            ]);
                        }
                        parentMessage.childCount += 1;

                        // Lưu lại tin nhắn để hiển thị trong reply box
                        if (
                            parentMessage.id ===
                            localStorage.getItem("idMessage")
                        ) {
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
        }
        return () => {
            if (hub) {
                hub.off("receive_message");
            }
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
                if (message_updated.parentId === null) {
                    // Nếu tin nhắn không có parentId
                    setMessages((messages) =>
                        messages.map((message) =>
                            message.id === message_updated.id
                                ? message_updated
                                : message
                        )
                    );
                } else {
                    // Nếu tin nhắn có parentId
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
                // setMessages((prev) => {
                //     const newMessages = prev.map((message) => {
                //         if (message.id === message_updated.id) {
                //             return message_updated;
                //         }
                //         return message;
                //     });
                //     return newMessages;
                // });
            });
        }
        return () => {
            if (hub) {
                hub.off("update_message");
            }
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
                if (message_deleted.parentId === null) {
                    setMessages((messages) =>
                        messages.filter(
                            (message) => message.id !== message_deleted.id
                        )
                    );
                } else {
                    setMessages((messages) => {
                        const messagesNew = messages.map((message) => {
                            if (message.id === message_deleted.parentId) {
                                message.childCount -= 1;
                                console.log(
                                    "message child count:",
                                    message.childCount
                                );
                                setMessageParent(message);
                                setMessagesChild((messagesChild) =>
                                    messagesChild.filter(
                                        (messageChild) =>
                                            messageChild.id !==
                                            message_deleted.id
                                    )
                                );
                            }
                            return message;
                        });
                        return messagesNew;
                    });
                }

                if (message_deleted.id === localStorage.getItem("idMessage")) {
                    setMessageParent(null);
                    setIsClickedReply(false);
                }
                // setMessages((prev) => {
                //     const newMessages = prev.filter((message) => {
                //         return message.id !== message_deleted.id;
                //     });
                //     return newMessages;
                // });
            });
        }
        return () => {
            if (hub) {
                hub.off("delete_message");
            }
        };
    }, [hub]);

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
        <div
            style={{
                boxShadow:
                    "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
            }}
            className="relative 2xl:w-[600px] flex flex-col my-2 mr-2 justify-end border rounded-xl"
        >
            <div className="flex items-center justify-between h-full max-h-10 mx-3 bg-white">
                <span className="font-bold text-gray-800 flex justify-between w-full">Meeting Chat <X className="cursor-pointer text-gray-700 p-0.5" onClick={() => setIsChatMeeting(false)}/></span>
            </div>
            <Separator />

            <div className="flex flex-col bg-white h-[calc(89vh)] 2xl:h-[94%] mb-2">
                <InfiniteScroll
                    getMore={fetchMoreData}
                    invokeHeight={5}
                    scrollDivRef={scrollDivRef}
                    className="flex flex-col justify-start min-w-[400px] h-full overflow-y-scroll pb-4"
                >
                    {messages.map((message) => (
                        <Message
                            id={`message-${message.id}`}
                            key={message.id}
                            message={message}
                            setMessage={setMessageParent}
                            setIsClickedReply={setIsClickedReply}
                            DeleteMessage={(idMessage) =>
                                DeleteMessage(
                                    hub,
                                    idMessage,
                                    setMessages,
                                    setIsClickedReply
                                )
                            }
                            UpdateMessage={(idMessage, message) =>
                                UpdateMessage(hub, idMessage, message, true)
                            }
                            SendEmoji={(emoji) =>
                                SendEmoji(hub, message.id, emoji)
                            }
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
            {isClickedReply && (
                <div className="absolute left-0 h-full rounded-xl w-full bg-white">
                    <ReplySection
                        message={messageParent}
                        setMessage={setMessageParent}
                        setIsClickedReply={setIsClickedReply}
                        messages={messages}
                        setMessages={setMessages}
                        messagesChild={messagesChild}
                        setMessagesChild={setMessagesChild}
                        conversationId={channelIdOfMeeting}
                        isChannel={true}
                        className="rounded-t-xl"
                    />
                </div>
            )}
        </div>
    );
}
