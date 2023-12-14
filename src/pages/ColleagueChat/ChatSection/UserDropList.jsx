import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User2 } from "lucide-react";
import { Link } from "react-router-dom";
function AvatarNameFilter(props) {
  return (
    <div className="flex justify-start items-center px-3 py-1 space-x-3 rounded cursor-pointer hover:bg-bold-blue group">
      <Avatar>
        <AvatarImage src={props.avatar} alt="@shadcn" />
        <AvatarFallback className="bg-gray-300"><User2 /></AvatarFallback>
      </Avatar>
      <div className="flex flex-col group-hover:text-white">
        <p className="font-bold text-md">{props.name}</p>
        <p className="text-sm">{props.email}</p>
      </div>
    </div>
  );
}

export default function UserDropList(props) {
  console.log("props",props.dataSearch);
  console.log("props",props.dataSearch.length);
  return (
    <div
      style={{
        maxHeight: "12rem", // This line sets the maximum height
        overflowY: "auto", // This line adds the scroll bar when necessary
      }}
      className="absolute z-10 top-[50px] p-1 w-11/12 border border-gray-300 left-10 shadow-xl  bg-white rounded-b-md py-2 flex flex-col flex-grow justify-start"
    >
      {props.dataSearch?.data?.length ? (
        props.dataSearch.data.map((user) => (
          <Link to={`/colleague-chat/${user.id}`} key={user.id}>
            <AvatarNameFilter
              name={user.lastName + " " + user.firstName}
              avatar={user.picture}
              email={user.email}
            />
          </Link>
        ))
      ) : (
        <p className="text-center">No result</p>
      )}
    </div>
  );
}