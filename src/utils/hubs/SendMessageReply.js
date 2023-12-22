
async function SendMessageReply(
    hub,
    message,
    conversationId,
    content,
    setMessages,
    user,
    setMessage,
    setMessagesChild,
    isChannel,

) {
    if (isChannel) {
        if (hub) {
            await hub.invoke("SendMessageAsync", {
                ReceiverId: conversationId,
                Content: content,
                IsChannel: true,
                ReplyTo: message.id,
            });
        }
        return;
    }
    if (hub) {
        console.log("conversationId reply: ", conversationId);
        const newMessageChild = await hub.invoke("SendMessageAsync", {
            ReceiverId: conversationId,
            Content: content,
            IsChannel: isChannel,
            ReplyTo: message.id,
        });
        // const messageChild = {
        //     id: message.id,
        //     sendAt: new Date().toISOString(),
        //     senderName: user.firstName + " " + user.lastName,
        //     senderId: localStorage.getItem("userId"),
        //     content: content,
        //     parentId: message.id,
        //     senderAvatar: user.picture,
        //     reactionCount: {}
        // };

        // Update setMessages
        setMessages((currentMessages) => {
            const messages = [...currentMessages]; // Create a new copy of messages
            const parentMessageIndex = messages.findIndex(
                (m) => m.id === newMessageChild.parentId
            );

            if (parentMessageIndex !== -1) {
                // If the message has a parent in the current set of messages
                const parentMessage = { ...messages[parentMessageIndex] }; // Create a new copy of the parent message
                 
                setMessage(parentMessage);
                console.log("Message reply: ", parentMessage);
                parentMessage.childCount += 1;
                setMessagesChild((messagesChild) => [...messagesChild, newMessageChild]);

                // Replace the old parent message with the updated one
                messages[parentMessageIndex] = parentMessage;
            } else {
                // If the message doesn't have a parent in the current set of messages, add it to the set
                messages.push(newMessageChild);
            }

            return messages;
        });
    } else {
        console.error("Hub is not connected");
    }
}

export default SendMessageReply;