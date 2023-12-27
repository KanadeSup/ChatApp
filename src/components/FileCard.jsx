import { ArrowDownToLine, Trash2 } from "lucide-react";
import { useState } from "react";
import { imgFile, typeFile } from "@/utils/supportImgFile";

function Display(file) {
  const fileType = file.type;
  if (fileType.startsWith("image/")) {
    return <img src={file.url} alt="" className="max-w-xs h-auto" />;
  } else if (fileType.startsWith("video/")) {
    return (
      <video
        src={file.url}
        controls
        className="max-w-300px max-h-[200px] object-cover"
      ></video>
    );
  } else if (fileType.startsWith("audio/")) {
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
            src={imgFile(file.name, file.url)}
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
          <span className="text-xs font-medium text-gray-500 truncate w-48 mt-1.5">
            {file.type}
          </span>
        </div>
      </>
    );
  }
}

export default function FileCard({ file, DeleteFile, allowDeletion }) {
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
      className="relative flex flex-row items-center px-4 py-3 select-none bg-white cursor-pointer border border-slate-300 min-w-fit rounded-xl w-full lg:w-2/5 2xl:w-[31%]"
    >
      {Display(file)}
      {isHover && (
        <div className="absolute flex flex-row gap-2 border border-slate-300 px-2 py-0.5 rounded-sm top-2 right-3 bg-white">
          <ArrowDownToLine
            onClick={downloadFile}
            className="h-6 w-6 p-1 text-gray-600 rounded-[1px] hover:bg-gray-200"
          />
          {allowDeletion && (
            <Trash2
              onClick={() => DeleteFile(file.id)}
              className="h-6 w-6 p-1 text-gray-600 rounded-[1px] hover:bg-gray-200"
            />
          )}
        </div>
      )}
    </div>
  );
}
