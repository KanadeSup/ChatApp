import { Outlet, Link } from 'react-router-dom'
import WCard from './WorkspaceCard.jsx'
import { Button } from "@/components/ui/button"
import {Plus} from 'lucide-react'
import { Input } from "@/components/ui/input"

export default function() {
   return (
      <div className="min-w-[800px] px-10 flex-grow shadow-xl flex justify-center overflow-y-scroll h-screen">
         <div className="w-full">
            {/* Top */}
            <div className="flex mt-10"> 
               <h1 className="text-2xl font-bold text-black">
                  Your Workspace 
               </h1>
               <div className="ml-auto flex gap-5">
                  <Input placeholder="Search ..."  className="w-60"/>
                  <Link to={'CreateWorkspace'}> 
                     <Button>
                        <Plus className="w-[20px] h-[20px] fill-white mr-2" strokeWidth={3} /> 
                        <span className="font-medium">
                           Create
                        </span> 
                     </Button>
                  </Link>
               </div>
            </div>

            {/* Workspace list */}
            <div className="flex mt-10 flex-wrap gap-5 w-full">
               <WCard />
               <WCard />
               <WCard />
               <WCard />
               <WCard />
               <WCard />
               <WCard />
               <WCard />
            </div>
         </div>
      </div>
   )
}
