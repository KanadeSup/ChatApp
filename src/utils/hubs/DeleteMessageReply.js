async function DeleteMessageReply(hub, childrenMessage, setMessage, setMessagesChild, setMessages, isChannel) {
    if (hub) {
        if (isChannel) {
            await hub.invoke(
                "DeleteMessageAsync",
                childrenMessage.id,
                true
            );
            return;
        }
        const data = await hub.invoke(
            "DeleteMessageAsync",
            childrenMessage.id,
            true
        );
        console.log("Delete message: ", data);
        // Update setMessages
        setMessages((currentMessages) => {
            const messages = [...currentMessages];
            const parentMessageIndex = messages.findIndex(
                (m) => m.id === childrenMessage.parentId
            );
            if (parentMessageIndex !== -1) {
                const parentMessage = { ...messages[parentMessageIndex] };
                parentMessage.childCount -= 1;
                setMessagesChild((messagesChild) =>
                    messagesChild.filter(
                        (m) => m.id !== childrenMessage.id
                    )
                );
                messages[parentMessageIndex] = parentMessage;
                setMessage(parentMessage);
                return messages;
            }
            return messages;
        });
    }
}

export default DeleteMessageReply;