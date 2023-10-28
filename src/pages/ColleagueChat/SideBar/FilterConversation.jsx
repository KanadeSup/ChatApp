import { useState } from "react";

export default function FilterConversation(props) {
  const [isChanged, setIsChanged] = useState(false);
  return (
    <>
      <div className="relative flex h-12 justify-start items-center px-1">
        <input
          type="text"
          className="h-8 rounded-md border w-full border-gray-300 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Filter by name"
          onChange={(e) => {setIsChanged(true); props.setFilterName(e.target.value)}} // Khi thay đổi giá trị của ô input thì set giá trị cho biến filterName
        />
        <div
          className="cursor-pointer hover:bg-white rounded-md ml-1 hover:border"
          onClick={() => {
            props.setIsClickedFilter(false);
            props.setIsClosedFilter(true);
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-8 h-8"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width={24} height={24} fill="" />
            <path
              d="M7 17L16.8995 7.10051"
              stroke="#000000"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7 7.00001L16.8995 16.8995"
              stroke="#000000"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
          {/* Danh sách các cuộc trò chuyện cần tìm */}
      </div>
    </>
  );
}
