export default function Media(props) {
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
        <div className="cursor-pointer px-2 py-1 border-b-2 border-gray-600">
          Media
        </div>
        <div
          className="cursor-pointer px-2 py-1 rounded-md hover:bg-gray-200 transition-all duration-500"
          onClick={() => props.setSelectedOption("files")}
        >
          Files
        </div>
        <div
          className="cursor-pointer px-2 py-1 rounded-md hover:bg-gray-200 transition-all duration-500"
          onClick={() => props.setSelectedOption("links")}
        >
          Links
        </div>
      </div>

      {/* Media */}
      <div
        style={{ height: "calc(100vh - 9.5rem)" }}
        className="flex flex-row flex-wrap overflow-y-scroll px-2 mt-5"
      >
        <img className="w-1/3 h-1/4 p-1 object-cover"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQImOo-yO0ONI3cXOq0ZPhQN5Bv8bceXZaK6Q&usqp=CAU"
          alt=""
        />
        <img className="w-1/3 h-1/4 p-1 object-cover"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQImOo-yO0ONI3cXOq0ZPhQN5Bv8bceXZaK6Q&usqp=CAU"
          alt=""
        />
        <img className="w-1/3 h-1/4 p-1 object-cover"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQImOo-yO0ONI3cXOq0ZPhQN5Bv8bceXZaK6Q&usqp=CAU"
          alt=""
        />
        <img className="w-1/3 h-1/4 p-1 object-cover"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQImOo-yO0ONI3cXOq0ZPhQN5Bv8bceXZaK6Q&usqp=CAU"
          alt=""
        />
        <img className="w-1/3 h-1/4 p-1 object-cover"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQImOo-yO0ONI3cXOq0ZPhQN5Bv8bceXZaK6Q&usqp=CAU"
          alt=""
        />
        <img className="w-1/3 h-1/4 p-1 object-cover"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQImOo-yO0ONI3cXOq0ZPhQN5Bv8bceXZaK6Q&usqp=CAU"
          alt=""
        />
        <img className="w-1/3 h-1/4 p-1 object-cover"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQImOo-yO0ONI3cXOq0ZPhQN5Bv8bceXZaK6Q&usqp=CAU"
          alt=""
        />
        <img className="w-1/3 h-1/4 p-1 object-cover"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQImOo-yO0ONI3cXOq0ZPhQN5Bv8bceXZaK6Q&usqp=CAU"
          alt=""
        />
        <img className="w-1/3 h-1/4 p-1 object-cover"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQImOo-yO0ONI3cXOq0ZPhQN5Bv8bceXZaK6Q&usqp=CAU"
          alt=""
        />
        <img className="w-1/3 h-1/4 p-1 object-cover"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQImOo-yO0ONI3cXOq0ZPhQN5Bv8bceXZaK6Q&usqp=CAU"
          alt=""
        />
        <img className="w-1/3 h-1/4 p-1 object-cover"
          src="https://top10tphcm.com/wp-content/uploads/2023/06/tong-hop-anh-chill-dep-buon-nhat-e1687142799615.jpg"
          alt=""
        />
        <img className="w-1/3 h-1/4 p-1 object-cover"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQImOo-yO0ONI3cXOq0ZPhQN5Bv8bceXZaK6Q&usqp=CAU"
          alt=""
        />
        <img className="w-1/3 h-1/4 p-1 object-cover"
          src="https://top10tphcm.com/wp-content/uploads/2023/06/tong-hop-anh-chill-dep-buon-nhat-e1687142799615.jpg"
          alt=""
        />
        <img className="w-1/3 h-1/4 p-1 object-cover"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQImOo-yO0ONI3cXOq0ZPhQN5Bv8bceXZaK6Q&usqp=CAU"
          alt=""
        />
        <img className="w-1/3 h-1/4 p-1 object-cover"
          src="https://top10tphcm.com/wp-content/uploads/2023/06/tong-hop-anh-chill-dep-buon-nhat-e1687142799615.jpg"
          alt=""
        />
        <img className="w-1/3 h-1/4 p-1 object-cover"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQImOo-yO0ONI3cXOq0ZPhQN5Bv8bceXZaK6Q&usqp=CAU"
          alt=""
        />
        <img className="w-1/3 h-1/4 p-1 object-cover"
          src="https://top10tphcm.com/wp-content/uploads/2023/06/tong-hop-anh-chill-dep-buon-nhat-e1687142799615.jpg"
          alt=""
        />
      </div>
    </>
  );
}
