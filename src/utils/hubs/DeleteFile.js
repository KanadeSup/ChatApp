async function DeleteFile(hub, fileId) {
    const arrayId = []
    arrayId.push(fileId);
    console.log("click delete file:", arrayId);
    if (hub) {
        const data = await hub.invoke("DeleteFileAsync", arrayId);
        console.log("Delete file: ", data);
        return;
    } else {
        console.error("Hub is not connected");
    }
}

export default DeleteFile;