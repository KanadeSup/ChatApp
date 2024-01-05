import { useState } from "react";
import Assets from "./Assets";
import { GoPin } from "react-icons/go";
import { IoPeopleOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { Ban } from "lucide-react";
export default function ChannelOption({setIsChatOption, setSelectedOption}) {
  const [showAssets, setShowAssets] = useState(false);
  return (
    <>
      <div className="flex  justify-between items-center font-medium py-2 px-5 border-b-2 border-gray-300 text-slate-700 text-base">
      Conversation Options 
        <IoClose className="cursor-pointer w-5 h-5" onClick={() => setIsChatOption(false)}/>
      </div>

      {/* Pinned Message */}
      <div
        className="flex flex-row  pl-5 py-2 mt-2 cursor-pointer group text-gray-600 hover:bg-slate-100"
        onClick={() => setSelectedOption("pinnedMessageList")}
      >
        <GoPin className="w-6 h-6 text-gray-600 " />
        <span className="text-sm ml-3 relative top-0.5 font-medium select-none">
          Pinned messages
        </span>
      </div>
      {/* All Member */}
      {/* <div
        className="flex flex-row pl-5 py-2 cursor-pointer group text-gray-600 hover:bg-slate-100"
        onClick={() => setSelectedOption("allMember")}
      >
        <IoPeopleOutline className="w-6 h-6 text-gray-600 " />
        <span className="text-sm ml-3 relative top-0.5 font-medium select-none">
          All memmber
        </span>
      </div> */}
      {/* Media, files, links */}
      <div
        className="flex flex-row pl-5 py-2 cursor-pointer group  text-gray-600 hover:bg-slate-100"
        onClick={() => setShowAssets(!showAssets)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className={`w-6 h-6 py-1 text-gray-600  transform transition-transform duration-200 ${showAssets ? 'rotate-90' : ''}`}
        >
          <path
            fill="currentColor"
            d="M8.489 31.975a1.073 1.073 0 01-.757-1.831L21.99 15.88 7.94 1.83c-.417-.417-.417-1.098 0-1.515s1.098-.417 1.515 0l14.807 14.807a1.074 1.074 0 010 1.515L9.247 31.659a1.078 1.078 0 01-.757.316z"
          ></path>
        </svg>
        <span className="text-sm ml-3 relative top-0.5 font-medium select-none">
          Media, files
        </span>
      </div>
      {/* Assets */}
      {showAssets && <Assets setSelectedOption={setSelectedOption}/>}

      {/* Ban chat */}
      {/* <div className="flex flex-row pl-5 py-2 cursor-pointer group text-gray-600 hover:bg-slate-100">
        <Ban className="w-5 h-5 text-gray-600"/>
        <span className="text-sm ml-3 relative font-medium select-none">
          Block
        </span>
      </div> */}
    </>
  );
}
