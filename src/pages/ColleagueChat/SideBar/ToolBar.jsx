import React, { useState } from "react";
import useColleagueStore from "@/storages/useColleagueStore";

export default function ToolbarIconComponent(props) {
  const [isHoveredFilter, setIsHoveredFilter] = useState(false);
  const [isHoveredNewChat, setIsHoveredNewChat] = useState(false);
  const { isNewChat, setIsNewChat } = useColleagueStore();
  return (
    <div className="flex h-14 rounded-b-md border-gray-300 justify-end items-center bg-gray-50 border-b">
      <div className="mx-4 font-semibold text-lg w-full">Colleague chat</div>
      {/* Filter */}
      {/* <div
        className="cursor-pointer relative"
        onMouseEnter={() => setIsHoveredFilter(true)}
        onMouseLeave={() => setIsHoveredFilter(false)}
        onClick={() => {
          props.setIsClickedFilter(true);
          props.setIsClosedFilter(false);
        }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7 p-1 fill-gray-500 transition-colors duration-200 ease-in-out hover:bg-gray-300 hover:fill-black rounded-md"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3 7C3 6.44772 3.44772 6 4 6H20C20.5523 6 21 6.44772 21 7C21 7.55228 20.5523 8 20 8H4C3.44772 8 3 7.55228 3 7ZM6 12C6 11.4477 6.44772 11 7 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H7C6.44772 13 6 12.5523 6 12ZM9 17C9 16.4477 9.44772 16 10 16H14C14.5523 16 15 16.4477 15 17C15 17.5523 14.5523 18 14 18H10C9.44772 18 9 17.5523 9 17Z"
          />
        </svg>

        {isHoveredFilter && (
          <>
            <div className="absolute z-20 w-2 h-2 right-2.5 top-9 bg-black transform rotate-45"></div>

            <div className="absolute flex justify-center items-center w-36 h-8 z-20 top-10 bg-black text-white text-sm rounded-md">
              <span>Filter Conversations</span>
            </div>
          </>
        )}
      </div> */}

      {/* New Chat */}
      <div
        className="cursor-pointer relative"
        onMouseEnter={() => setIsHoveredNewChat(true)}
        onMouseLeave={() => setIsHoveredNewChat(false)}
        onClick={() => setIsNewChat(!isNewChat)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          className="w-7 h-7 p-1 fill-gray-500 transition-colors duration-200 ease-in-out hover:bg-gray-300 hover:fill-black rounded-md"
        >
          <path d="M120-160v-600q0-33 23.5-56.5T200-840h480q33 0 56.5 23.5T760-760v203q-10-2-20-2.5t-20-.5q-10 0-20 .5t-20 2.5v-203H200v400h283q-2 10-2.5 20t-.5 20q0 10 .5 20t2.5 20H240L120-160Zm160-440h320v-80H280v80Zm0 160h200v-80H280v80Zm400 280v-120H560v-80h120v-120h80v120h120v80H760v120h-80ZM200-360v-400 400Z" />
        </svg>
        {isHoveredNewChat && (
          <>
            <div className="absolute z-20 w-2 h-2 right-2.5 top-9 bg-black transform rotate-45"></div>

            <div className="absolute flex justify-center items-center w-36 h-8 z-20 top-10 bg-black text-white text-sm rounded-md">
              <span>Create a Conversation</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
