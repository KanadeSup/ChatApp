import { Link as LucideLink } from "lucide-react";

const shortLink = (link) =>  {
  if (link.length > 30) {
    return link.slice(0, 30) + "...";
  }
  return link;
}
const shortTitle = (url) =>  {
  return new URL(url).hostname;
}

function LinkCard(props) {
  const handleClick = () => {
    window.open(props.url, '_blank');
  };

  return (
    <div onClick={handleClick} className="flex flex-row items-center px-4 py-3 select-none cursor-pointer hover:bg-gray-100">
      <LucideLink className="w-10 h-10 text-gray-800 block p-3 bg-gray-50 rounded-sm border" />
      <div className="flex flex-col ml-2">
        <span className="font-semibold text-sm">{shortLink(props.url)}</span>
        <span className="text-xs font-medium text-bold-blue">{shortTitle(props.url)}</span>
      </div>
    </div>
  );
}

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
      {/* Links */}
      <div
        style={{ height: "calc(100vh - 9.5rem)" }}
        className="flex flex-col overflow-y-scroll mt-5"
      >
        <LinkCard url={"https://mv5bhgr5-5000.asse.devtunnels.ms/swagger/index.html"}/>
        <LinkCard url={"https://mv5bhgr5-5000.asse.devtunnels.ms/swagger/index.html"}/>
        <LinkCard url={"https://mv5bhgr5-5000.asse.devtunnels.ms/swagger/index.html"}/>
        <LinkCard url={"https://nhattruyenup.com"}/>
        <LinkCard url={"https://tnt2106.000webhostapp.com/"}/>

      </div>
    </>
  );
}
