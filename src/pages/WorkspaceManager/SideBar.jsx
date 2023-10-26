import { Link } from 'react-router-dom'
export default function() {
   return (
      <div className="bg-gray-100 w-72 flex flex-col items-stretch gap-2 py-3 px-3 shadow-xl">
         {/* Title */}
         <div className="flex justify-center mb-3">
            <h1 className="font-medium text-xl text-neutral-700 ml-12"> Workspace List</h1>
            <Link to="CreateWorkspace" className="ml-auto"> 
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
               </svg>
            </Link>
         </div>

         {/* Workspaces */}
         <div className="flex items-center cursor-pointer mb-3">
            <div className="flex justify-center items-center bg-blue-500 text-white px-2 py-2 rounded-md mr-1 text-xl font-bold w-11 h-11 text-center "> 
               S 
            </div>
            <div>
               <h1 className="font-medium text-md text-gray-800 "> Secret Workspace</h1>
               <span className="font-medium text-sm text-gray-700"> 3 members </span>
            </div>
            <div className="flex justify-center items-center text-white text-xs font-bold bg-red-400 rounded-full w-5 h-5 ml-auto"> 1 </div>
         </div>
         <div className="flex items-center cursor-pointer mb-3">
            <div className="flex justify-center items-center bg-blue-500 text-white px-2 py-2 rounded-md mr-1 text-xl font-bold w-11 h-11 text-center "> 
               S 
            </div>
            <div>
               <h1 className="font-medium text-md text-gray-800 "> Secret Workspace</h1>
               <span className="font-medium text-sm text-gray-700"> 3 members </span>
            </div>
            <div className="flex justify-center items-center text-white text-xs font-bold bg-red-400 rounded-full w-5 h-5 ml-auto"> 1 </div>
         </div>
         <div className="flex items-center cursor-pointer mb-3">
            <div className="flex justify-center items-center bg-blue-500 text-white px-2 py-2 rounded-md mr-1 text-xl font-bold w-11 h-11 text-center "> 
               S 
            </div>
            <div>
               <h1 className="font-medium text-md text-gray-800 "> Secret Workspace</h1>
               <span className="font-medium text-sm text-gray-700"> 3 members </span>
            </div>
            <div className="flex justify-center items-center text-white text-xs font-bold bg-red-400 rounded-full w-5 h-5 ml-auto"> 1 </div>
         </div>
      </div>
   )
}
