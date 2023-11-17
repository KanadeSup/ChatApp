import UtilityBar from "/components/UtilityBar"
import { Outlet } from "react-router-dom"
import WSection from './WorkspaceSection'

export default function() {
   return (
      <div className="flex flex-row min-h-screen items-stretch">
         <UtilityBar logo colleague notification/>
         <WSection />
      </div>
   )
}
