import { useState } from 'react'
import SearchSvg from '/assets/img/Search'
export default function() {
   const [ openInvite, setOpenInvite ] = useState(false)
   return (
      <div className="flex-grow flex justify-center">
         <div className="flex flex-col w-[980px] mt-10 gap-4">
            <h1 className="font-medium text-xl"> Invites </h1>
            {/* toolbar */}
            <div className="flex justify-end gap-5 pb-5 border-b border-b-gray-400 relative">
               <div className="relative">
                  <div className="absolute left-[5px] top-[7px]">
                     <SearchSvg />
                  </div>
                  <input className="border border-black rounded pl-8 pr-3 py-1 w-60" type="text" />
               </div>
               <button className="border border-black rounded px-3 py-1 font-bold text-md shadow-xl cursor-pointer"
                  onClick={() => setOpenInvite(true) }
               > 
                  Invite 
               </button>
            </div>

            <table>
               <tr className="border-b border-b-gray-400">
                  <th className="text-left pb-3"> User </th>
                  <th className="text-left pb-3"> Invite date </th>
                  <th className="text-left pb-3"></th>
               </tr>
               <tr>
                  <td className="">
                     <div className="flex gap-3 items-center py-3">
                        <div className="border border-black w-14 h-14">

                        </div>
                        <div className="flex flex-col">
                           <span className="font-medium text-md"> Username 1</span>
                           <span className="text-sm text-gray-600 italic"> email@gmail.com </span>
                        </div>
                     </div>
                  </td>

                  <td className="">
                        12/8/2023
                  </td>

                  <td className="">
                     <div className="flex justify-end gap-4">
                        <button>
                           <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <g stroke="#1C274C" strokeWidth="1.5">
                                 <circle cx="9" cy="9" r="2"></circle>
                                 <path d="M13 15c0 1.105 0 2-4 2s-4-.895-4-2 1.79-2 4-2 4 .895 4 2z"></path>
                                 <path
                                    strokeLinecap="round"
                                    d="M22 12c0 3.771 0 5.657-1.172 6.828C19.657 20 17.771 20 14 20h-4c-3.771 0-5.657 0-6.828-1.172C2 17.657 2 15.771 2 12c0-3.771 0-5.657 1.172-6.828C4.343 4 6.229 4 10 4h4c3.771 0 5.657 0 6.828 1.172.47.47.751 1.054.92 1.828M19 12h-4M19 9h-5M19 15h-3"
                                 ></path>
                              </g>
                           </svg>
                        </button>
                        <button>
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-8 h-8 fill-red-500"
                              viewBox="-3.5 0 19 19"
                           >
                              <path d="M11.383 13.644A1.03 1.03 0 019.928 15.1L6 11.172 2.072 15.1a1.03 1.03 0 11-1.455-1.456l3.928-3.928L.617 5.79a1.03 1.03 0 111.455-1.456L6 8.261l3.928-3.928a1.03 1.03 0 011.455 1.456L7.455 9.716z"></path>
                           </svg>
                        </button>
                     </div>
                  </td>
               </tr>
            </table>
         </div>
         <div className={"w-full h-full absolute top-0 left-0 bg-gray-800 bg-opacity-60 flex justify-center items-center " + (openInvite ? "" : "hidden")}
            onClick={(e)=>{
               e.currentTarget === e.target && setOpenInvite(false)}
            }
         >
            {/* modal */}
            <div className="border border-black bg-white flex flex-col justify-center items-start gap-3 px-8 py-5 rounded-lg">
               <div className="flex justify-between w-full items-center">
                  <h1 className="text-xl font-medium"> Invite people to Workspace </h1>
                  <button onClick={()=> setOpenInvite(false)}>
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 fill-gray-500"
                        viewBox="-3.5 0 19 19"
                     > 
                        <path d="M11.383 13.644A1.03 1.03 0 019.928 15.1L6 11.172 2.072 15.1a1.03 1.03 0 11-1.455-1.456l3.928-3.928L.617 5.79a1.03 1.03 0 111.455-1.456L6 8.261l3.928-3.928a1.03 1.03 0 011.455 1.456L7.455 9.716z"></path>
                     </svg>
                  </button>

               </div>
               <input type="text"  className="py-1 px-2 border border-black w-[500px]" placeholder="email@gmail.com ..."/>
               <button className="border border-black rounded py-1 px-2 self-end"
                  onClick={()=>setOpenInvite(false)}
               > 
                  Send 
               </button>
            </div>
         </div>
      </div>
   )
}
