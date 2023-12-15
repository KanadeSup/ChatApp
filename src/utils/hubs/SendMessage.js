import { is } from "date-fns/locale";

async function SendMessage(
    hub,
    conversationId,
    message,
    setMessages,
    setIsNewMessage,
    user,
    scrollToBottom,
    isChannel
) {
    if (isChannel) {
        if (hub) {
            await hub.invoke("SendMessageAsync", {
                ReceiverId: conversationId,
                Content: message,
                IsChannel: true,
            });
        }
        return;
    }

    if (hub) {
        const data = await hub.invoke("SendMessageAsync", {
            ReceiverId: conversationId,
            Content: message,
            IsChannel: isChannel,
            children: [],
        });
        setIsNewMessage(true);
        scrollToBottom();
        const message2 = {
            id: data,
            sendAt: new Date().toISOString(),
            senderName: user.lastName + " " + user.firstName,
            senderId: localStorage.getItem("userId"),
            content: message,
            children: [],
        };
        setMessages((messages) => [...messages, message2]);
    } else {
        console.error("Hub is not connected");
    }
}

export default SendMessage;