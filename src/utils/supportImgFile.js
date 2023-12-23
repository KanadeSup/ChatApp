const typeFile = (name) => {
    const extension = name.split(".")[1]
        ? name.split(".").pop().slice(0, 3).toUpperCase()
        : "";
    return ["PDF", "DOC", "XLS", "RAR", "ZIP", "MP3", "WAV", "MP4", "AVI", "MOV", "IMG", "PNG", "JPG"].includes(extension) ? "" : extension;
};

const imgFile = (file) => {
    const name = file.name;
    const typeFile = name.split(".")[1]
        ? name.split(".").pop().slice(0, 3).toUpperCase()
        : "";
    switch (typeFile) {
        case "DOC":
            return "https://chat.zalo.me/assets/icon-word.d7db8ecee5824ba530a5b74c5dd69110.svg";
        case "PDF":
            return "https://chat.zalo.me/assets/icon-pdf.53e522c77f7bb0de2eb682fe4a39acc3.svg";
        case "XLS":
            return "https://chat.zalo.me/assets/icon-excel.fe93010062660a8332b5f5c7bb2a43b1.svg";
        case "ZIP" || "RAR":
            return "https://chat.zalo.me/assets/icon-zip.e1e9b9936e66e90d774fcb804f39167f.svg";
        case "MP3" || "WAV":
            return "https://chat.zalo.me/assets/icon-music.296f2763390ba5423f405b18e670d471.svg";
        case "MP4" || "AVI" || "MOV":
            return "https://chat.zalo.me/assets/icon-video.651f286c9db0a8e1125cee5fd01269ba.svg";
        case "IMG":
        case "PNG":
        case "JPG":
            return file.url;
        default:
            return "https://chat.zalo.me/assets/icon-file-empty.6796cfae2f36f6d44242f7af6104f2bb.svg";
    }
};

export { typeFile, imgFile };