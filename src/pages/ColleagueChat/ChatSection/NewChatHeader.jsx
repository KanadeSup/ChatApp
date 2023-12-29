import UserDropList from "./UserDropList";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { searchUser } from "@/api";

export default function NewChatHeader(props) {
  const [searchValue, setSearchValue] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [dataSearch, setDataSearch] = useState([]);

  const [timerId, setTimerId] = useState(null);

  useEffect(() => {
    if (timerId) clearTimeout(timerId); // if there's a timer, clear it
    if (searchValue) {
      const id = setTimeout(async () => {
        const response = await searchUser(searchValue);
        setDataSearch(response);
      }, 200); 
      setTimerId(id); // save the timer id
    }
  }, [searchValue]);

  return (
    <div
      className={
        "h-14 flex flex-row relative justify-between items-center shadow " +
        (isFocus
          ? "border-b-2 border-bold-blue"
          : "border-b-2 border-transparent")
      }
    >
      <div className="flex relative items-center flex-row w-full justify-end select-none">
        <div className="relative text-gray-600 py-1 px-2 h-12 w-full">
          <input
            className="h-10 px-12 text-sm focus:outline-none w-full"
            type="text"
            name="search"
            autoComplete="off"
            placeholder="Enter email"
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setIsFocus(true)}
            onBlur={() => {
              setIsFocus(false);
            }}
          />
          <p className="absolute top-3.5 left-5 text-sm">To:</p>
          <UserDropList dataSearch={dataSearch} />
        </div>
      </div>
      <X
        className="w-16 cursor-pointer"
        onClick={() => props.setIsNewChat(false)}
      />
    </div>
  );
}
