import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function() {
   const [openDelete, setOpenDelete] = useState(false)
   return(
      <div className="flex-shrink-0 bg-gray-100 w-72 flex flex-col items-stretch gap-2 py-3 px-3 shadow-xl">
         {/* header */}
         <div className="font-bold text-center text-gray-600">
            Workspace Setting
         </div>

         {/* Settings */}
         <NavLink to="" end className={({isActive}) => (isActive?"bg-gray-300 ":"") + "flex items-center gap-3 px-2 py-1 rounded-md cursor-pointer font-bold"}>
            <span className="text-md"> Overview </span>
         </NavLink>

         <NavLink to="MemberManage" className={({isActive}) => (isActive?"bg-gray-300 ":"") + "flex items-center gap-3 px-2 py-1 rounded-md cursor-pointer font-bold"}>
            <span className="text-md"> Member </span>
         </NavLink>

         <NavLink to="InviteMember" className={({isActive}) => (isActive?"bg-gray-300 ":"") + "flex items-center gap-3 px-2 py-1 rounded-md cursor-pointer font-bold"}>
            <span className="text-md"> Invites </span>
         </NavLink>

         <div className="flex items-center gap-3 px-2 py-1 rounded-md cursor-pointer font-bold text-red-600"
            onClick={()=>setOpenDelete(true)}
         >
            <span className="text-md"> Delete server </span>
         </div>

         <div className={"fixed w-full h-full top-0 left-0 z-50 bg-gray-600 bg-opacity-60 flex justify-center items-center " + (openDelete?"" : "hidden")} 
            onClick={(e)=>{e.target === e.currentTarget && setOpenDelete(false)}}
         >
            <div className="bg-white px-5 py-3 flex flex-col rounded-lg gap-5 w-[500px]">
               <h1 className="font-medium text-xl"> Delete Workspace </h1>
               <p className="bg-yellow-800 text-white px-3 py-3 rounded"> Are you sure you want to delete workspace ? This action cannot be undone </p>
               <div className="self-end flex gap-5">
                  <button className="text-gray-500 font-medium hover:underline" onClick={()=>setOpenDelete(false)}> Cancel </button>
                  <button className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600"> Delete </button>
               </div>
            </div>
         </div>
      </div>
   )
}
