import UserDropList from "./UserDropList";
import { useState } from "react";
export default function NewChatHeader(props) {
  const [isChanged, setIsChanged] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  return (
    <div className= {"h-12 flex flex-row relative justify-between items-center shadow " + (isFocus ? "border-b-2 border-bold-blue" : "border-b-2 border-transparent")}>
      <div className="flex relative items-center flex-row w-full justify-end select-none">
        <div className="relative text-gray-600 py-1 px-2 h-12 w-full">
          <input
            className="h-10 px-12 text-sm focus:outline-none w-full"
            type="text"
            name="search"
            placeholder="Enter name, email"
            onChange={(e) => setIsChanged(true)}
            onFocus={() => setIsFocus(true)}
            onBlur={() => {
              console.log("blur");
              setIsFocus(false)} }
          />
          <p className="absolute top-3.5 left-5 text-sm">To:</p>
          { isFocus && <UserDropList isChanged={isChanged} />}
        </div>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-8 h-8 py-1.5 hover:bg-gray-100 mr-2 rounded cursor-pointer"
        onClick={() => props.setIsNewChat(false)}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </div>
  );
}
