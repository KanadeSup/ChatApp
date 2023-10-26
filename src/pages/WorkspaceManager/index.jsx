import UtilityBar from "./UtilityBar.jsx"
import SideBar from "./SideBar.jsx"
import WList from "./WorkspaceList.jsx"
import { Outlet } from "react-router-dom"

export default function() {
   return (
      <div className="flex flex-row min-h-screen items-stretch">
         <UtilityBar />
         <SideBar />
         <Outlet />
      </div>
   )
}
