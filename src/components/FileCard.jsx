import { ArrowDownToLine, Trash2 } from "lucide-react";
import { useState } from "react";

const typeFile = (name) => {
  const extension = name.split(".")[1]
    ? name.split(".").pop().slice(0, 3).toUpperCase()
    : "";
  return ["PDF", "DOC", "XLS"].includes(extension) ? "" : extension;
};

const imgFile = (name) => {
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
    default:
      return "https://chat.zalo.me/assets/icon-file-empty.6796cfae2f36f6d44242f7af6104f2bb.svg";
  }
};

function Display(file) {
  if (
    typeFile(file.name) === "PNG" ||
    typeFile(file.name) === "JPG" ||
    typeFile(file.name) === "JPE" ||
    typeFile(file.name) === "GIF"
  ) {
    return <img src={file.url} alt="" className="max-w-xs h-auto" />;
  } else if (typeFile(file.name) === "MP4") {
    return (
      <video
        src={file.url}
        controls
        className="max-w-300px] max-h-[200px] object-cover"
      ></video>
    );
  } else if (typeFile(file.name) === "MP3") {
    return (
      <audio
        src={file.url}
        controls
        className="max-w-[300px] max-h-[200px] object-cover"
      ></audio>
    );
  } else {
    return (
      <>
        <div className="relative">
          <img
            src={imgFile(file.name)}
            alt=""
            className="w-10 h-10 min-w-[40px]"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1 text-[10px] font-medium text-white">
            {typeFile(file.name)}
          </div>
        </div>

        <div className="flex flex-col ml-2">
          <span className="font-semibold text-sm truncate w-36">
            {file.name}
          </span>
          <span className="text-xs font-medium text-gray-500 mt-1.5">
            {file.type}
          </span>
        </div>
      </>
    );
  }
}

export default function FileCard({ file }) {
  const [isHover, setIsHover] = useState(false);
  const downloadFile = () => {
    const link = document.createElement("a");
    link.href = file.url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="relative flex flex-row items-center px-4 py-3 bg-white select-none cursor-pointer border border-slate-300 min-w-fit rounded-xl w-full lg:w-2/5 2xl:w-[31%]"
    >
      {Display(file)}
      {isHover && (
        <div className="absolute flex flex-row gap-2 border border-slate-300 px-2 py-0.5 rounded-sm top-2 right-3 bg-white">
          <ArrowDownToLine
            onClick={downloadFile}
            className="h-6 w-6 p-1 text-gray-600 rounded-[1px] hover:bg-gray-200"
          />
          <Trash2 className="h-6 w-6 p-1 hover:bg-gray-200 rounded-[1px] text-gray-600" />
        </div>
      )}
    </div>
  );
}
