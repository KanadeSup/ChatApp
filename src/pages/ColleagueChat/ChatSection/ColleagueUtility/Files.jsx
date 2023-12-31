import { ArrowDownToLine } from "lucide-react";
import { Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import getFiles from "@/api/file/getFiles";
import { typeFile, imgFile } from "../../../../utils/supportImgFile";


function FileCard({file}) {
  return (
    <div className="relative flex flex-row items-center px-4 py-3 select-none cursor-pointer hover:bg-slate-100">
      <div className="relative">
        <img
          src={imgFile(file.name, file.url)}
          alt=""
          className="w-10 h-10"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1 text-[10px] font-medium text-white">
          {typeFile(file.name)}
        </div>
      </div>

      <div className="flex flex-col w-3/5 ml-2">
        <span className="font-semibold truncate text-sm">{file.name}</span>
        <span className="text-xs font-medium text-gray-500 mt-1.5">
          {file.type}
        </span>
      </div>

      <div className="absolute flex flex-row gap-2 px-2 py-0.5 rounded-sm top-2 right-3 shadow bg-white">
      <ArrowDownToLine className="h-6 w-6 p-1 text-gray-600 rounded-[1px] hover:bg-gray-200"/>
      <Trash2 className="h-6 w-6 p-1 hover:bg-gray-200 rounded-[1px] text-gray-600"/>
      </div>
    </div>
  );
}

export default function Files(props) {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    async function getFilesChannel() {
      const result = await getFiles(props.conversationId, 0, 10, false);
      setFiles(result);
      console.log(result);
    }
    getFilesChannel();
  }, [props.conversationId]);
  return (
    <>
      <div className="font-medium text-sm flex items-center py-2 px-3 border-b-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="relative top-0.5 w-6 h-6 p-1 rounded-full hover:bg-slate-300"
          onClick={() => props.setSelectedOption("")}
        >
          <path
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 12h14M5 12l6-6m-6 6l6 6"
          ></path>
        </svg>
        <span className="ml-2 text-sm">Media, Files, Links</span>
      </div>
      <div className="flex flex-row justify-evenly py-2 font-medium text-gray-600 text-sm">
        <div
          className="cursor-pointer px-2 py-1 rounded-md hover:bg-gray-200 transition-all duration-500"
          onClick={() => props.setSelectedOption("media")}
        >
          Media
        </div>
        <div className="cursor-pointer px-2 py-1 border-b-2 border-gray-600">
          Files
        </div>
        <div
          className="cursor-pointer px-2 py-1 rounded-md hover:bg-gray-200 transition-all duration-500"
          onClick={() => props.setSelectedOption("links")}
        >
          Links
        </div>
      </div>
      {/* Files */}
      <div
        style={{ height: "calc(100vh - 11rem)" }}
        className="flex flex-col overflow-y-scroll mt-5"
      >
        {files.map((file) => (
          <FileCard key={file.id} file={file} />
        ))}
      </div>
    </>
  );
}
