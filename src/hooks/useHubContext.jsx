import { useContext, useEffect, useState } from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

export const useHubContext = () => {
   const [hub, setHub] = useState(null);
   useEffect(() => {
      // check access token is valid or not expired
      if (!localStorage.getItem("token")) {
         setHub(null);
         return
      } 
      async function connect() {
         const connection = new HubConnectionBuilder()
            .withUrl(`https://api.firar.live/chatHub`, {
               accessTokenFactory: () => {
                  return localStorage.getItem("token");
               },
            })
            .configureLogging(LogLevel.Information)
            .build();
         try {
            await connection.start();
            console.log("connect success");
            setHub(connection);
         } catch (e) {
            console.log("error", e);
         }
      }
      connect();
   }, []);
   return [hub, setHub];
};
