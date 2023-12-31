import Search from "/components/Search";
import { useState, useEffect } from "react";
import { getUserById } from "../../../api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User2 } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export default function ChatBoxHeader(props) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const data = await getUserById(props.conversationId);
      setUser(data);
    }
    fetchData();
  }, [props.conversationId]);
  return (
    <div className="flex flex-row justify-between items-center bg-gray-50 h-14 shadow">
      <HoverCard>
        <HoverCardTrigger className="flex flex-row justify-start items-center cursor-default gap-1 px-5">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.picture} alt="@shadcn" />
            <AvatarFallback className="bg-gray-300 p-1">
              <User2 />
            </AvatarFallback>
          </Avatar>
          <div className="flex ml-1 items-center justify-between">
            <p className="font-bold text-md">
              {user?.firstName} {user?.lastName}
            </p>
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="flex flex-col gap-2 items-center">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user?.picture} alt="@shadcn" />
            <AvatarFallback className="bg-gray-300 p-1">
              <User2 />
            </AvatarFallback>
          </Avatar>
          <span className="text-lg font-bold">
            {user?.firstName + " " + (user?.lastName ? user.lastName : "")}
          </span>
          <div className="w-full border border-slate-300"></div>
          <div className="grid gap-6 -space-y-3">
            <div className="flex items-center justify-start space-x-2 text-sm">
              <span className="w-14">Phone:</span>
              <span>{user?.phone}</span>
            </div>
            <div className="flex items-center justify-start space-x-2 text-sm">
              <span className="w-14">Email:</span>
              <span>{user?.email}</span>
            </div>
            <div className="flex items-center mt-4 justify-start space-x-2 text-sm">
              <span className="w-14">Gender:</span>
              <span>
                {user?.gender ? "Male" : "female"}
              </span>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>

      <div className="flex relative items-center flex-row w-1/2 h-12 justify-end select-none">
        <Search />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 mx-5 cursor-pointer text-gray-600 hover:text-black"
          onClick={() => props.setIsChatOption(!props.isChatOption)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
          />
        </svg>
      </div>
    </div>
  );
}
