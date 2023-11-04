import PinnedMessage from "/components/PinnedMessage";
export default function PinnedMessageList(props) {
  return (
    <>
      <div className="font-medium flex items-center py-2 px-3 border-b shadow">
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
        <span className="ml-2 text-sm">Pinned messages</span>
      </div>
      <div
        style={{ height: "calc(100vh - 6.5rem)" }}
        className="overflow-y-scroll"
      >
        <PinnedMessage />
        <PinnedMessage />
        <PinnedMessage />
        <PinnedMessage />
        <PinnedMessage />
        <PinnedMessage />
      </div>
    </>
  );
}
