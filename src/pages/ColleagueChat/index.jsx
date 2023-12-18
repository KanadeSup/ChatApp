import { useState, useEffect } from "react";
import SideBar from "./SideBar";
import ChatSection from "./ChatSection";
import "/assets/styles/scrollBar.css";
import UtilityBar from "/components/UtilityBar";
import { Outlet } from "react-router-dom";
import useHubStore from "@/storages/useHubStore";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

export default function () {
  const { hub, setHub } = useHubStore();
  
  // Kết nối với hub
  useEffect(() => {
    // check access token is valid or not expired
    if (!localStorage.getItem("token")) {
      setHub(null);
      return;
    }
    async function connect() {
      const connection = new HubConnectionBuilder()
        .withUrl(`https://api.firar.live/chatHub`, {
          accessTokenFactory: () => {
            return localStorage.getItem("token");
          },
        })
        .withAutomaticReconnect()
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

  
  return (
    <div className="flex ">
      {/* Utility bar */}
      <UtilityBar logo colleague notification/>

      {/* list friend */}
      {/* <SideBar isNewChat={isNewChat} setIsNewChat={setIsNewChat} /> */}
      <SideBar />

      {/* chat box */}
      <Outlet />
      
    </div>
  );
}
