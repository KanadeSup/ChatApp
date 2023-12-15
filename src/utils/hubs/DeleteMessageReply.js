async function DeleteMessageReply(hub, childrenMessage, setMessage, setMessages) {
    if (hub) {
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
                parentMessage.children = parentMessage.children.filter(
                    (m) => m.id !== childrenMessage.id
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