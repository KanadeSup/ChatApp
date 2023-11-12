import { ArrowDownToLine } from "lucide-react";
import { Trash2 } from "lucide-react";

const typeFile = (name) => {
  const extension = name.split(".")[1] ? name.split(".").pop().slice(0, 3).toUpperCase() : "";
  return ['PDF', 'DOC', 'XLS'].includes(extension) ? "" : extension;
};

  
const imgFile = (name) => {
  const typeFile = name.split(".")[1] ? name.split(".").pop().slice(0, 3).toUpperCase() : "";
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
function FileCard(props) {
  return (
    <div className="relative flex flex-row items-center px-4 py-3 select-none cursor-pointer hover:bg-gray-200">
      <div className="relative">
        <img
          src={imgFile(props.name)}
          alt=""
          className="w-10 h-10"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1 text-[10px] font-medium text-white">
          {typeFile(props.name)}
        </div>
      </div>

      <div className="flex flex-col ml-2">
        <span className="font-semibold text-sm">{props.name}</span>
        <span className="text-xs font-medium text-gray-500 mt-1.5">
          106.5kb
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
  return (
    <>
      <div className="font-medium flex items-center py-1 px-3 border-b">
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
        style={{ height: "calc(100vh - 9.5rem)" }}
        className="flex flex-col overflow-y-scroll mt-5"
      >
        <FileCard name="file1.txt" />
        <FileCard name="file2.docx" />
        <FileCard name="file3.pdf" />
        <FileCard name="file4.js" />
        <FileCard name="file5.xlsx" />
        <FileCard name="file6.java" />
        <FileCard name="file7.cpp" />
        <FileCard name="file8" />
      </div>
    </>
  );
}
