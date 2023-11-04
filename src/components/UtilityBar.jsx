import { Colleague, Notification } from "/assets/img/UtilSvg";
import { Link } from "react-router-dom";

function showMenu(event) {
  document.querySelector(".user-menu").classList.toggle("hidden");
}
export default function (props) {
  const utilites = Object.keys(props);
  return (
    <div className="w-16 flex flex-col items-center flex-shrink-0 py-3 bg-gray-200 border-2 border-gray shadow-xl gap-5">
      {/* Logo */}
      <Link to="/">
        <svg
          className="w-11 h-11 text-blue-500 cursor-pointer"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M11.757 2.034a1 1 0 01.638.519c.483.967.844 1.554 1.207 2.03.368.482.756.876 1.348 1.467A6.985 6.985 0 0117 11a7.002 7.002 0 01-14 0c0-1.79.684-3.583 2.05-4.95a1 1 0 011.707.707c0 1.12.07 1.973.398 2.654.18.374.461.74.945 1.067.116-1.061.328-2.354.614-3.58.225-.966.505-1.93.839-2.734.167-.403.356-.785.57-1.116.208-.322.476-.649.822-.88a1 1 0 01.812-.134zm.364 13.087A2.998 2.998 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879.586.585.879 1.353.879 2.121s-.293 1.536-.879 2.121z"
            clipRule="evenodd"
          />
        </svg>
      </Link>

      {/* Utilites */}
      {utilites.map((utility) => {
        switch (utility) {
          case "colleague":
            return (
              <Link
                to="/colleague"
                className="flex w-12 h-12 items-center justify-center hover:bg-gray-300 rounded-md"
              >
                <Colleague />
              </Link>
            );
          case "notification":
            return (
              <Link
                to="/notification"
                className="flex w-12 h-12 items-center justify-center hover:bg-gray-300 rounded-md"
              >
                <Notification />
              </Link>
            );
        }
      })}
      {/* avatar */}
      <div
        className="cursor-pointer flex items-center justify-center bg-gray-400 mt-auto w-10 h-10 rounded-lg"
        onClick={showMenu}
      >
        <svg
          className="w-6 h-6 fill-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {/* Menu */}
      <div className="user-menu hidden absolute bottom-4 left-[53px] border border-stone-300 bg-white rounded">
        <ul className="space-y-1">
          <li>
            <Link to="/usersetting"
              className="flex items-center gap-2 rounded-lg pl-2 pr-5 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 opacity-75"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <div className="text-sm font-medium"> User Setting </div>
            </Link>
          </li>
          <li>
            <a
              href=""
              className="flex items-center gap-2 rounded-lg pl-2 pr-5 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="red"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>
              <span className="text-sm font-medium text-red-400"> Logout </span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
