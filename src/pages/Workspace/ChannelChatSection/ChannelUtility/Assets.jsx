export default function Assets(props) {
  return (
    <div className="flex flex-col">
      {/* Media */}
      <div
        className="flex flex-row pl-9 py-2 cursor-pointer group text-gray-600 hover:bg-bold-blue hover:text-white"
        onClick={() => props.setSelectedOption("media")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="w-6 h-6 p-1 text-gray-600 group-hover:text-white"
        >
          <path
            fill="currentColor"
            d="M30 2.497H2c-1.099 0-2 .901-2 2v23.006c0 1.099.9 2 2 2h28c1.099 0 2-.901 2-2V4.497c0-1.099-.901-2-2-2zm0 25.006H2v-5.892l8.027-7.779 8.275 8.265c.341.414.948.361 1.379.035l3.652-3.306 6.587 6.762c.025.025.053.044.08.065v1.85zm0-4.697l-5.876-6.013a1.002 1.002 0 00-1.311-.086l-3.768 3.282-8.28-8.19a1.006 1.006 0 00-.709-.363c-.275-.01-.547.08-.749.27l-7.309 7.112V4.496h28v18.309zm-7-10.302a1.995 1.995 0 100-3.99 1.995 1.995 0 000 3.99z"
          ></path>
        </svg>
        <span className="text-sm ml-3 relative top-0.5 font-medium select-none">
          Media
        </span>
      </div>
      {/* Files */}
      <div
        className="flex flex-row pl-9 py-2 cursor-pointer group text-gray-600 hover:bg-bold-blue hover:text-white"
        onClick={() => props.setSelectedOption("files")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-6 h-6 stroke-gray-600 text-white"
        >
          <path
            fill="currentColor"
            d="M9 17h6m-6-4h6M9 9h1m3-6H8.2c-1.12 0-1.68 0-2.108.218a2 2 0 00-.874.874C5 4.52 5 5.08 5 6.2v11.6c0 1.12 0 1.68.218 2.108a2 2 0 00.874.874C6.52 21 7.08 21 8.2 21h7.6c1.12 0 1.68 0 2.108-.218a2 2 0 00.874-.874C19 19.48 19 18.92 19 17.8V9m-6-6l6 6m-6-6v4.4c0 .56 0 .84.109 1.054a1 1 0 00.437.437C13.76 9 14.04 9 14.6 9H19"
          ></path>
        </svg>
        <span className="text-sm ml-3 relative top-0.5 font-medium select-none">
          Files
        </span>
      </div>
      {/* Links */}
      <div
        className="flex flex-row pl-9 py-2 cursor-pointer group text-gray-600 hover:bg-bold-blue hover:text-white"
        onClick={() => props.setSelectedOption("links")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="w-6 h-6 p-1 stroke-gray-600 group-hover:stroke-white group-hover:text-white"
        >
          <g strokeLinecap="round" strokeWidth="1.5">
            <path d="M15.197 3.355c1.673-1.68 4.25-1.816 5.757-.305 1.506 1.512 1.37 4.1-.303 5.78l-2.424 2.433M10.047 14c-1.507-1.512-1.37-4.1.302-5.779L12.5 6.062"></path>
            <path d="M13.954 10c1.506 1.512 1.37 4.1-.303 5.779l-2.424 2.433-2.424 2.433c-1.673 1.68-4.25 1.816-5.757.305-1.506-1.512-1.37-4.1.303-5.78l2.424-2.433"></path>
          </g>
        </svg>
        <span className="text-sm ml-3 relative top-0.5 font-medium select-none">
          Links
        </span>
      </div>
    </div>
  );
}
