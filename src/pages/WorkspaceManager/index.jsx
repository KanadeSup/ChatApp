import UtilityBar from "/components/UtilityBar"
import { Outlet } from "react-router-dom"
import WSection from './WorkspaceSection'
import OneSignal from 'react-onesignal';
import { useEffect } from "react";

export default function() {
   useEffect(() => {
      OneSignal.Slidedown.promptPush();
   },[])

   return (
      <div className="flex flex-row min-h-screen items-stretch">
         <UtilityBar logo colleague notification/>
         <WSection />
      </div>
   )
}