async function DeleteMessage(hub, messageId, setMessages, setIsClickedReply, isChannel) {
    if (hub) {
        if (isChannel) {
            await hub.invoke("DeleteMessageAsync", messageId, true);
            return;
        }
        console.log("click delete message:", messageId);
        const data = await hub.invoke("DeleteMessageAsync", messageId, true);

        setMessages((messages) =>
            messages.filter((message) => message.id !== data)
        );
        console.log("data delete: ", data);
        if (messageId === localStorage.getItem("idMessage")) {
            setIsClickedReply(false);
        }
    } else {
        console.error("Hub is not connected");
    }
}

export default DeleteMessage;