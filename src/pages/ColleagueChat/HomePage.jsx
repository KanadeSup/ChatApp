import React, { useState } from "react";
import NewChatHeader from "./ChatSection/NewChatHeader";
import useColleagueStore from "@/storages/useColleagueStore";
import { HomeChat } from "../../assets/img/MySvg";
export default function HomePage() {
  const { isNewChat, setIsNewChat } = useColleagueStore();
  return (
    <div className="flex flex-col relative justify-start bg-white w-full shadow">
      <div className="w-full">
        {isNewChat && <NewChatHeader setIsNewChat={setIsNewChat} />}
      </div>

      <div className="flex absolute top-[50%] -translate-x-1/2 left-[50%] -translate-y-1/2 flex-col items-center justify-center">
        <HomeChat className="w-1/2 h-1/2" />
        <p className="text-gray-500 text-lg font-semibold mt-4">
          Chọn một cuộc trò chuyện để bắt đầu
        </p>
      </div>
    </div>
  );
}
