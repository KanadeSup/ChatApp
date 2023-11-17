import SideBar from "./Sidebar"
import { Link, Outlet, useLoaderData, useMatch, useParams } from "react-router-dom"
import { Separator } from "@/components/ui/separator"
import { Suspense } from "react"
import {  XCircle } from "lucide-react"


export default function() {
   const { workspaceId, channelId } = useParams()
   const sidebarItems = [
      {
         title: "Overview",
         to: `/Workspace/${workspaceId}/${channelId}/ChannelSetting`,
      },
      {
         title: "Privacy",
         to: `/Workspace/${workspaceId}/${channelId}/ChannelSetting/Privacy`,
      },
      {
         title: "Permisson",
         to: `/Workspace/${workspaceId}/WorkspaceSetting/Members`,
      },
   ]
   return (
      <div className="flex flex-row min-h-screen items-stretch">
         <div className="px-10 pt-6 w-full">
            <div className="w-full">
               <div className="flex justify-between">
                  <div className="space-y-0.5">
                     <h2 className="text-2xl font-bold"> Channel Settings </h2>
                     <p className="text-muted-foreground">
                        Manage your channel settings and invite member
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
               <Suspense>
                  <Outlet />
               </Suspense>
            </div>
         </div>
      </div>
   )
}
