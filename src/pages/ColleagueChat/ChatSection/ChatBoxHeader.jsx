import Search from "/components/Search";
import ChatOption from "./ChatOption";
export default function ChatBoxHeader(props) {
  return (
    <div className="flex flex-row justify-between items-center bg-gradient-to-l from-gray-200 to-gray-100 h-12 shadow">
      <div className="flex flex-row justify-start items-center px-5 ">
        <img
          className="h-6 w-6 rounded-md"
          src="https://www.famousbirthdays.com/headshots/russell-crowe-8.jpg"
        />
        <div className="flex ml-1 items-center justify-between">
          <p className="font-bold text-md">Username</p>
        </div>
      </div>
      <div className="flex relative items-center flex-row w-2/5 h-12 justify-end select-none">
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
        {props.isChatOption && <ChatOption />}
      </div>
    </div>
  );
}
