// Khi click update. Đều nhận được tin nhắn của server (receive_message).

async function UpdateMessage(hub, messageId, content, isChannel) {
    if (hub) {
        const data = await hub.invoke("UpdateMessageAsync", {
            id: messageId,
            Content: content,
            IsChannel: isChannel,
        });
        console.log("UpdateMessageAsync: ", data);
    } else {
        console.error("Hub is not connected");
    }
}

export default UpdateMessage;