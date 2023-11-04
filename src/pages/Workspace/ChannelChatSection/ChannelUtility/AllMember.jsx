function AvatarName(props) {
  return (
    <div className="flex justify-start items-center my-1 px-5 py-2 cursor-pointer hover:bg-bold-blue group">
      <img className="h-7 w-7 rounded-md" src={props.avatar} alt="" />
      <span className="ml-3 font-medium text-sm text-gray-700 group-hover:text-white">{props.name}</span>
    </div>
  );
}

export default function AllMember(props) {
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
        <span className="ml-2 text-sm">All Member</span>
      </div>
      <div
        style={{ height: "calc(100vh - 6.5rem)" }}
        className="overflow-y-scroll"
      >
        <AvatarName
          name="Aaaaaaaa"
          avatar="https://www.famousbirthdays.com/headshots/russell-crowe-1.jpg"
        />
        <AvatarName
          name="Russell Crowe"
          avatar="https://www.famousbirthdays.com/headshots/russell-crowe-2.jpg"
        />
        <AvatarName
          name="Russell Crowe"
          avatar="https://www.famousbirthdays.com/headshots/russell-crowe-3.jpg"
        />
        <AvatarName
          name="Aaaaaaaa"
          avatar="https://www.famousbirthdays.com/headshots/russell-crowe-1.jpg"
        />
      </div>
    </>
  );
}
