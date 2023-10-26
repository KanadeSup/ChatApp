import { useState } from "react";
import SideBar from "./SideBar";
import ChatSection from "./ChatSection";
import "../../assets/styles/scrollBar.css";
export default function () {
  const [isChatOption, setIsChatOption] = useState(false);
  const [isNewChat, setIsNewChat] = useState(false);

  return (
    <div className="flex ">
      {/* left side bar */}
      <div className="bg-gradient-to-t from-gray-300 to-gray-200 h-screen w-16 flex flex-col">
        <div className=" h-16">
          <svg
            className="p-4"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.3103 1.77586C11.6966 1.40805 12.3034 1.40805 12.6897 1.77586L20.6897 9.39491L23.1897 11.7759C23.5896 12.1567 23.605 12.7897 23.2241 13.1897C22.8433 13.5896 22.2103 13.605 21.8103 13.2241L21 12.4524V20C21 21.1046 20.1046 22 19 22H14H10H5C3.89543 22 3 21.1046 3 20V12.4524L2.18966 13.2241C1.78972 13.605 1.15675 13.5896 0.775862 13.1897C0.394976 12.7897 0.410414 12.1567 0.810345 11.7759L3.31034 9.39491L11.3103 1.77586ZM5 10.5476V20H9V15C9 13.3431 10.3431 12 12 12C13.6569 12 15 13.3431 15 15V20H19V10.5476L12 3.88095L5 10.5476ZM13 20V15C13 14.4477 12.5523 14 12 14C11.4477 14 11 14.4477 11 15V20H13Z"
              fill="#000000"
            />
          </svg>
        </div>
        <div className="flex flex-col justify-evenly h-2/5 p-2">
          <div className="">
            <i className="mdi mdi-account-multiple text-black text-2xl w-full flex justify-center" />
          </div>
          <div className="">
            <i className="mdi mdi-headphones text-black text-2xl w-full flex justify-center" />
          </div>
          <div className="">
            <i className="mdi mdi-bell-outline text-black text-2xl w-full flex justify-center" />
          </div>
          <div className="">
            <i className="mdi mdi-cog text-black text-2xl w-full flex justify-center" />
          </div>
        </div>
        <div className=" p-2 flex items-end flex-grow">
          <div className="inline-block w-full">
            <i className="mdi mdi-account text-black text-2xl w-full flex justify-center" />
          </div>
        </div>
      </div>

      {/* list friend */}
      <SideBar isNewChat={isNewChat} setIsNewChat={setIsNewChat} />

      {/* chat box */}
      <ChatSection
        isChatOption={isChatOption}
        setIsChatOption={setIsChatOption}
        isNewChat={isNewChat}
        setIsNewChat={setIsNewChat}
      />
      
    </div>
  );
}
