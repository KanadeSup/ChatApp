import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./routers";
import { HubContext } from "./contexts/HubContext";
import { useEffect, useState } from "react";
import { useHubContext } from "./hooks/useHubContext";

const App = function () {
   const [hub, setHub] = useHubContext()
   return (
      <HubContext.Provider value={[hub, setHub]}>
         <RouterProvider router={router} />;
      </HubContext.Provider>
   )
};
const node = document.querySelector("#root");
const root = createRoot(node);
root.render(<App />);
