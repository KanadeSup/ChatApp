import UtilityBar from "/components/UtilityBar"
import SideBar from "./SideBar"
import { Link, Outlet, useLoaderData, useMatch, useParams } from "react-router-dom"
import { Separator } from "@/components/ui/separator"
import { Suspense } from "react"
import {  XCircle } from "lucide-react"


export default function() {
   const { workspaceId } = useParams()
   const sidebarItems = [
      {
         title: "Overview",
         to: `/Workspace/${workspaceId}/WorkspaceSetting`,
      },
      {
         title: "Members",
         to: `/Workspace/${workspaceId}/WorkspaceSetting/Members`,
      },
      {
         title: "Invites",
         to: `/Workspace/${workspaceId}/WorkspaceSetting/Invites`,
      },
      {
         title: "Permission & Role",
         to: `/Workspace/${workspaceId}/WorkspaceSetting/Role`,
      },
   ]
   return (
      <div className="flex flex-row min-h-screen items-stretch">
         <div className="px-10 pt-6 w-full">
            <div className="w-full">
               <div className="flex justify-between">
                  <div className="space-y-0.5">
                     <h2 className="text-2xl font-bold"> Workspace Settings </h2>
                     <p className="text-muted-foreground">
                        Manage your workspace settings and invite member
                     </p>
                  </div>
                  <Link 
                     to={`/Workspace/${workspaceId}`}
                  >
                     <XCircle className="w-10 h-10 stroke-gray-600"/>
                  </Link>
               </div>
               <Separator className="my-6"/>
            </div>
            <div className="flex gap-10 flex-wrap">
               <SideBar items={sidebarItems} />
               <Outlet />
            </div>
         </div>
      </div>
   )
}
