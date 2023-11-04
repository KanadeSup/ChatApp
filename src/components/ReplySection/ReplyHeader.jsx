export default function ReplyHeader(props) {
  return (
    <div className="flex flex-col">
      <div className="text-xs font-semibold h-8 flex justify-between items-center px-4 bg-gray-100 border-b shadow">
        View Reply
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-6 h-6 hover:bg-gray-200 rounded-full cursor-pointer"
          onClick={() => {
            props.setIsClickedReply(false);
          }}
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
    </div>
  );
}
