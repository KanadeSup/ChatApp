// Khi click update. Đều nhận được tin nhắn của server (receive_message).

async function UpdateMessage(hub, messageId, content, isChannel) {
    if (hub) {
        await hub.invoke("UpdateMessageAsync", {
            id: messageId,
            Content: content,
            IsChannel: isChannel,
        });
    } else {
        console.error("Hub is not connected");
    }
}

export default UpdateMessage;