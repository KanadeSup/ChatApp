
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
        });
        setIsNewMessage(true);
        scrollToBottom();
        const message2 = {
            id: data,
            sendAt: new Date().toISOString(),
            senderName: user.firstName + " " + user.lastName,
            senderId: localStorage.getItem("userId"),
            content: message,
            senderAvatar: user.picture,
            childCount: 0,
        };
        setMessages((messages) => [...messages, message2]);
    } else {
        console.error("Hub is not connected");
    }
}

export default SendMessage;