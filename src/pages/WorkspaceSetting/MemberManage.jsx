import { AccountSvg } from '/assets/img/SettingSvg'
import SearchSvg from '/assets/img/Search'
import { useState } from 'react'
export default function() {
   const [memberOption, setMemberOption] = useState(false)
   return (
      <div className="flex-grow flex justify-center">
         <div className="w-[980px] flex flex-col gap-5 mt-10">
            <h1 className="text-xl font-medium"> Workspace Members </h1>
            {/* Header */}
            <div className="pb-4 border-b border-b-gray-600 flex">
               <div className="flex items-center">
                  <AccountSvg />
                  10
               </div>
               <div className="ml-auto">
                  {/* Search member */}
                  <div className="relative">
                     <div className="absolute top-[5px] left-2">
                        <SearchSvg />
                     </div>
                     <input className="border border-black w-64 rounded py-[3px] pl-[33px] pr-3" type="text" placeholder="Username"/>
                  </div>
               </div>
            </div>
            {/* Member List */}
            <div className="flex flex-col">
               {/* Member */}
               <div className="flex items-center gap-3 hover:bg-gray-50 p-3 rounded cursor-pointer">
                  {/* Avatar */}
                  <div className="w-14 h-14 border border-black rounded">

                  </div>
                  {/* User info */}
                  <div className="flex flex-col">
                     <span className="text-lg font-medium"> PutinLord </span>
                     <span className="text-sm text-gray-600"> Putin@gmail.com </span>
                  </div>
                  <div className="ml-auto relative inline">
                     <button className=""
                        onClick={()=> setMemberOption(true)}
                     >
                        <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                           <g> <g> <g>
                              <path d="M12 16a2 2 0 11-2 2 2 2 0 012-2zM10 6a2 2 0 102-2 2 2 0 00-2 2zm0 6a2 2 0 102-2 2 2 0 00-2 2z"></path>
                           </g> </g> </g> 
                        </svg>
                     </button>
                     <div className={"z-20 absolute shadow-xl bg-gray-100 border border-gray-400 rounded-lg w-[130px] " + (memberOption?"":"hidden")}>
                        <div className="hover:bg-gray-200 px-2 py-1"> See Profile </div>
                        <div className="hover:bg-gray-200 px-2 py-1 text-red-500 font-medium"> Kick </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div className={"fixed w-full h-full top-0 left-0 z-10 " + (memberOption?"":"hidden")}
            onClick={(e) => {e.target === e.currentTarget && setMemberOption(false)}}
         >

         </div>
      </div>
   )
}
