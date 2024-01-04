export default async function ReadMessage (hub, messageId) {
    if (hub) {
        console.log("Read message id: ", messageId);
        
        const data = await hub.invoke("ReadMessage", 
            messageId
        );
        console.log("Read message: ", data);
    } else {
        console.error("Hub is not connected");
    }
} 

