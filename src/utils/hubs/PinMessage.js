
async function PinMessage(hub, messageId, isPin) {
    console.log("click pin:", messageId);
    if (hub) {
        const data = await hub.invoke("PinMessage", 
            messageId, isPin
        );
        console.log("Pin message: ", data);
    } else {
        console.error("Hub is not connected");
    }
}

export default PinMessage;