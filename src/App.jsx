import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./routers";
import { useEffect, useRef, useState } from "react";
import { InfiniteScroll } from "./components/InfinityScroll";
import OneSignal from "react-onesignal";
import config from "/appconfig.js";
import { Toaster } from "@/components/ui/toaster"

const App = function () {
   useEffect(() => {
      try {
         initialize();
      } catch (e) {
        console.log("error", e)
      }
   }, []);
   // const [hub, setHub] = useHubContext();
   return (
      <>
      {/* //<HubContext.Provider value={[hub, setHub]}> */}
      <RouterProvider router={router} />
      <Toaster />
      {/* //</HubContext.Provider> */}
      </>
   );
};
const node = document.querySelector("#root");
const root = createRoot(node);
root.render(<App />);

const initialize = async () => {
   await OneSignal.init({
      appId: config.oneSignalKey,
      autoResubscribe: true,
   });
}
