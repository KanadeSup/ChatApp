
async function SendEmoji(hub, messageId, emoji) {
    console.log("emoji: ", emoji);
    if (hub) {
        const data = await hub.invoke("ReactMessageAsync", {
            MessageId: messageId,
            Emoji: emoji,
        });
        console.log("Đã gửi emoji: ", data);
    } else {
        console.error("Hub is not connected");
    }
}

export default SendEmoji;