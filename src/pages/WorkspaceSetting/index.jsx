import UtilityBar from "/components/UtilityBar"
import SideBar from "./SideBar"
import { Outlet, useLoaderData, useMatch } from "react-router-dom"
import { Separator } from "@/components/ui/separator"


export default function() {
   const workspace = useLoaderData();
   const sidebarItems = [
      {
         title: "Overview",
         to: `/Workspace/${workspace.id}/WorkspaceSetting`,
      },
      {
         title: "Members",
         to: `/Workspace/${workspace.id}/WorkspaceSetting/Members`,
      },
      {
         title: "Invites",
         to: `/Workspace/${workspace.id}/WorkspaceSetting/Invites`,
      },
      {
         title: "Permisson & Role",
         to: `/Workspace/${workspace.id}/WorkspaceSetting/Role`,
      },
   ]
   return (
      <div className="flex flex-row min-h-screen items-stretch">
         <UtilityBar colleague notification/>
         <div className="pl-10 pt-6 w-full">
            <div className="w-full">
               <div className="space-y-0.5">
                  <h2 className="text-2xl font-bold"> Workspace Settings </h2>
                  <p className="text-muted-foreground">
                     Manage your workspace settings and invite member
                  </p>
               </div>
               <Separator className="my-6"/>
            </div>
            <div className="flex gap-10 flex-wrap">
               <SideBar items={sidebarItems} workspaceId={workspace.id}/>
               <Outlet context={workspace}/>
            </div>
         </div>
      </div>
   )
}
