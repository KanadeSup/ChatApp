import UtilityBar from "/components/UtilityBar"
import SideBar from "./SideBar"
import { Outlet } from "react-router-dom"
export default function() {
   return (
      <div className="flex flex-row min-h-screen items-stretch">
         <UtilityBar colleague notification/>
         <SideBar />
         <Outlet />
      </div>
   )
}
