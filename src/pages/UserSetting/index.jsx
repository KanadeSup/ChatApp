import UtilityBar from "/components/UtilityBar";
import SideBar from "./SideBar";
import { Outlet, useParams } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { getWorkspace } from "/api";

export default function () {
   const { workspaceId } = useParams();
   const [workspace, setWorkspace] = useState(null);
   const sidebarItems = [
      {
         title: "My Account",
         to: workspaceId ? `/${workspaceId}/UserSetting` : "/UserSetting",
      },
      {
         title: "Profile",
         to: "Profile",
      },
   ];
   useState(() => {
      if (!workspaceId) return;
      const data = getWorkspace(workspaceId);
      setWorkspace(data);
   }, []);
   return (
      <div className="flex flex-row min-h-screen items-stretch">
         {workspaceId ? <UtilityBar workspace colleague notification /> : <UtilityBar logo colleague notification />}
         <div className="pl-10 pt-6 w-full">
            <div className="w-full">
               <div className="space-y-0.5">
                  <h2 className="text-2xl font-bold"> Settings </h2>
                  <p className="text-muted-foreground">Manage your account settings and set e-mail preferences.</p>
               </div>
               <Separator className="my-6" />
            </div>
            <div className="flex gap-10 flex-wrap">
               <SideBar items={sidebarItems} />
               <Outlet />
            </div>
         </div>
      </div>
   );
}
