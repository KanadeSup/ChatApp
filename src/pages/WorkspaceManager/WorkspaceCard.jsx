import { Link } from "react-router-dom"

function showIcon(event) {
   event.currentTarget.querySelector(".join-icon").classList.remove("hidden")
}
function hideIcon(event) {
   event.currentTarget.querySelector(".join-icon").classList.add("hidden")
}
export default function() {

   return(
      <Link to="/workspace" className="px-2 py-3"
         onMouseOver={showIcon}
         onMouseOut={hideIcon}
         >
            <div className=" hover:bg-blue-200 cursor-pointer w-full flex items-stretch gap-2 border-2 border-gray-300 px-5 py-5 rounded-lg bg-gray-100 shadow-xl">
               <div className="flex justify-center items-center w-16 h-16 rounded-md bg-blue-500 font-bold text-white text-2xl">
                  S
               </div>
               <div className="flex flex-col justify-between">
                  <h1 className="text-xl font-medium text-gray-700">
                     Secret workspace
                  </h1>
                  <h2 className="text-md font-medium text-gray-600"> 
                     3 member 
                  </h2>
               </div>
               <div className="ml-auto flex items-center">
                  <svg className="join-icon hidden w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
               </div>
            </div>
         </Link>
   )
}
