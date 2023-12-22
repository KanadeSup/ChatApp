async function DeleteFileColleague(hub, fileId, messageId, setMessages, setIsClickedReply, isChannel) {
    const arrayId = []
    arrayId.push(fileId);
    console.log("click delete file:", arrayId);
    if (hub) {
        const data = await hub.invoke("DeleteFileAsync", arrayId);
        setMessages((currentMessages) => {
            const messages = [...currentMessages]; // Create a new copy of messages
            const parentMessageIndex = messages.findIndex(
                (m) => m.id === messageId
            );
    
            if (parentMessageIndex !== -1) {
                const parentMessage = { ...messages[parentMessageIndex] };
                
                // delete file have id = fileId in files of message
                const files = parentMessage.files.filter((file) => file.id !== fileId);
                parentMessage.files = files;
                // Replace the old parent message with the updated one
                messages[parentMessageIndex] = parentMessage;
            } 
            return messages;
        });
        return;
    } else {
        console.error("Hub is not connected");
    }
}

export default DeleteFileColleague;