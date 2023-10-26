function AvatarNameFilter(props) {
  return (
    <div className="flex justify-start items-center px-3 py-1 rounded cursor-pointer hover:bg-bold-blue hover:text-white">
      <img className="h-7 w-7" src={props.avatar} alt="" />
      <span className="ml-2">{props.name}</span>
    </div>
  );
}

export default function UserDropList(props) {
  return (
    <div
      style={{
        maxHeight: "12rem", // This line sets the maximum height
        overflowY: "auto", // This line adds the scroll bar when necessary
      }}
      className="absolute z-10 top-[50px] p-1 w-11/12 border border-gray-300 left-10 shadow-xl  bg-white rounded-b-md py-2 flex flex-col flex-grow justify-start"
    >
      <AvatarNameFilter
        name="Aaaaaaaa"
        avatar="https://www.famousbirthdays.com/headshots/russell-crowe-1.jpg"
      />
      <AvatarNameFilter
        name="Russell Crowe"
        avatar="https://www.famousbirthdays.com/headshots/russell-crowe-2.jpg"
      />
      <AvatarNameFilter
        name="Russell Crowe"
        avatar="https://www.famousbirthdays.com/headshots/russell-crowe-3.jpg"
      />
      <AvatarNameFilter
        name="Aaaaaaaa"
        avatar="https://www.famousbirthdays.com/headshots/russell-crowe-1.jpg"
      />
    </div>
  );
}
