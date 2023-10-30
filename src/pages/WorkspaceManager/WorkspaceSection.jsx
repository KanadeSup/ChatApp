import { Outlet, Link } from 'react-router-dom'
import WCard from './WorkspaceCard.jsx'
export default function() {
   return (
      <div className="px-10 flex-grow shadow-xl flex justify-center">
         <div className="w-2/3 min-w-[700px] max-w-[850px]">
            {/* Top */}
            <div className="flex mt-10"> 
               <h1 className="text-2xl font-medium text-gray-700">
                  Your Workspace 
               </h1>
               <Link className="font-medium text-blue-800 px-2 py-1 rounded-md ml-auto border border-gray-500 shadow-xl mr-3" to={'CreateWorkspace'}> 
                  Create new 
               </Link>
            </div>

            {/* Workspace list */}
            <div className="flex mt-10 flex-col justify-stretch">
               <WCard />
               <WCard />
               <WCard />
            </div>
         </div>
      </div>
   )
}
