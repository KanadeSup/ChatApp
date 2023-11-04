import { useState } from "react";

export default function PinnedMessage(props) {
  const [isHoverUnpin, setIsHoverUnpin] = useState(false);
  return (
    <div className="mx-3 border-gray-300">
      <div
        className="flex w-full my-2 border bg-gray-100 rounded-md p-3 mb-4"
        style={{ fontFamily: "'Roboto', Arial, sans-serif" }}
      >
        <div className="flex-shrink-0 mr-2">
          <img
            className="h-7 w-7 rounded-md"
            src="https://www.famousbirthdays.com/headshots/russell-crowe-8.jpg"
          />
        </div>

        <div>
          <div className="flex justify-between relative bottom-1">
            <span className="font-bold text-sm">username</span>
            {}
            <div className="flex relative">
              <button className="text-[11px] px-1 my-0.5 rounded-sm bg-gray-200 text-gray-500 hover:text-gray-700">
                Jump
              </button>
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 hover:bg-gray-200 text-gray-500 hover:text-gray-700 font-bold rounded-full cursor-pointer ml-1"
                xmlns="http://www.w3.org/2000/svg"
                onMouseEnter={() => setIsHoverUnpin(true)}
                onMouseLeave={() => setIsHoverUnpin(false)}
              >
                <path
                  d="M7 17L16.8995 7.10051"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 7.00001L16.8995 16.8995"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {isHoverUnpin && (
                <>
                  <div className="absolute z-20 w-2 h-2 right-2.5 top-7 bg-black transform rotate-45"></div>

                  <div className="absolute flex justify-center items-center w-28 h-6 z-20 top-8 -right-3 bg-black text-white text-xs rounded-md">
                    <span>Unpin a message</span>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-sm">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic
              molestiae vero nam cum, fuga, aliquid, quod quis nesciunt
              dignissimos ut eligendi quos iusto consequuntur recusandae fugit
              ea voluptates alias eaque!
            </span>
            <span className="text-gray-500 text-xs mt-3">
              28/08/2023 1:50 AM
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
