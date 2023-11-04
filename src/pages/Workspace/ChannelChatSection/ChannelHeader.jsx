import Search from "/components/Search";
export default function ChannelHeader(props) {
  return (
    <div className="flex flex-row justify-between items-center bg-gradient-to-l from-gray-200 to-gray-100 h-12 shadow">
      <h2 className="text-base font-semibold ml-4"># channel 1</h2>

      <div className="flex relative items-center flex-row w-1/2 h-12 justify-end select-none">
        <Search />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 mx-5 cursor-pointer text-gray-600 hover:text-black"
          onClick={() => {props.setIsClickedChannelUtility(!props.isClickedChannelUtility); props.setIsClickedReply(false)}}
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
