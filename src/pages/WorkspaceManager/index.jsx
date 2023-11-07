import UtilityBar from "/components/UtilityBar"
import { Outlet } from "react-router-dom"

export default function() {
   return (
      <div className="flex flex-row min-h-screen items-stretch">
         <UtilityBar colleague notification/>
         <Outlet />
      </div>
   )
}
