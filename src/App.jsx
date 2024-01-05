import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./routers";
import { useEffect, useRef, useState } from "react";
import OneSignal from "react-onesignal";
import config from "/appconfig.js";
import { Toaster } from "@/components/ui/toaster";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import HubContext from "./contexts/HubContext";

const App = function () {
    const [hub, setHub] = useState(null);

    // Kết nối với hub
    // useEffect(() => {
    //     // check access token is valid or not expired
    //     if (!localStorage.getItem("token")) {
    //         setHub(null);
    //         return;
    //     }
    //     async function connect() {
    //         console.log("Bắt đầu chạy hub");
    //         const connection = new HubConnectionBuilder()
    //             .withUrl(`https://api.firar.live/chatHub`, {
    //                 accessTokenFactory: () => {
    //                     return localStorage.getItem("token");
    //                 },
    //             })
    //             .withAutomaticReconnect()
    //             .configureLogging(LogLevel.Information)
    //             .build();
    //         try {
    //             await connection.start();
    //             console.log(
    //                 "connectionqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq",
    //                 connection
    //             );
    //             setHub(connection);
    //         } catch (e) {
    //             console.log("error", e);
    //         }
    //     }
    //     connect();
    // }, []);

    useEffect(() => {
        try {
            initialize();
        } catch (e) {
            console.log("error", e);
        }
    }, []);
    return (
        <>
            <HubContext.Provider value={{hub, setHub}}>
                <RouterProvider router={router} />
                <Toaster />
            </HubContext.Provider>
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
};
