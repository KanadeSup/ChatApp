export default function Links(props) {
  return (
    <>
      <div className="font-medium flex items-center py-1 px-3 border-b shadow">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="relative top-0.5 w-6 h-6 p-1 rounded-full hover:bg-slate-300"
          onClick={() => props.setSelectedOption("")}
        >
          <path
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 12h14M5 12l6-6m-6 6l6 6"
          ></path>
        </svg>
        <span className="ml-2 text-sm">Media, Files, Links</span>
      </div>
      <div className="flex flex-row justify-evenly py-2 font-medium text-gray-600 text-sm">
        <div
          className="cursor-pointer px-2 py-1 rounded-md hover:bg-gray-200 transition-all duration-500"
          onClick={() => props.setSelectedOption("media")}
        >
          Media
        </div>
        <div
          className="cursor-pointer px-2 py-1 rounded-md hover:bg-gray-200 transition-all duration-500"
          onClick={() => props.setSelectedOption("files")}
        >
          Files
        </div>
        <div className="cursor-pointer px-2 py-1 border-b-2 border-gray-600">
          Links
        </div>
      </div>
    </>
  );
}
