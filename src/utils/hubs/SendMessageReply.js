async function SendMessageReply(
    hub,
    message,
    conversationId,
    content,
    setMessages,
    user,
    setMessage,
    isChannel
) {
    if (hub) {
        console.log("conversationId reply: ", conversationId);
        const data = await hub.invoke("SendMessageAsync", {
            ReceiverId: conversationId,
            Content: content,
            IsChannel: isChannel,
            ReplyTo: message.id,
        });
        const messageChild = {
            id: data,
            sendAt: new Date().toISOString(),
            senderName: user.lastName + " " + user.firstName,
            senderId: localStorage.getItem("userId"),
            content: content,
            parentId: message.id,
        };

        // Update setMessages
        setMessages((currentMessages) => {
            const messages = [...currentMessages]; // Create a new copy of messages
            const parentMessageIndex = messages.findIndex(
                (m) => m.id === messageChild.parentId
            );

            if (parentMessageIndex !== -1) {
                // If the message has a parent in the current set of messages
                const parentMessage = { ...messages[parentMessageIndex] }; // Create a new copy of the parent message

                // Check if parentMessage.children is an array, if not initialize it as an empty array
                if (!Array.isArray(parentMessage.children)) {
                    parentMessage.children = [];
                }

                // Add the new message to the children of the parent message
                parentMessage.children = [...parentMessage.children, messageChild];
                setMessage(parentMessage);
                console.log("Message reply: ", parentMessage);

                // Replace the old parent message with the updated one
                messages[parentMessageIndex] = parentMessage;
            } else {
                // If the message doesn't have a parent in the current set of messages, add it to the set
                messages.push(messageChild);
            }

            return messages;
        });
    } else {
        console.error("Hub is not connected");
    }
}

export default SendMessageReply;