import SideBar from "./SideBar";
import { useEffect, useState } from "react";
import "/assets/styles/scrollBar.css";
import UtilityBar from "/components/UtilityBar";
import useHubStore from "@/storages/useHubStore";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { Outlet, useParams } from "react-router-dom";
import ColleagueContext from "@/contexts/ColleagueContext";


export default function () {
  const { hub, setHub } = useHubStore();
  const { workspaceId } = useParams();

  const [messages, setMessages] = useState([]);
  const [messagesChild, setMessagesChild] = useState([]); // Lưu lại tin nhắn con của tin nhắn đang được reply

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
    <ColleagueContext.Provider
      value={{ messages, setMessages, messagesChild, setMessagesChild }}
    >
      <div className="flex ">
         {/* Utility bar */}
         {workspaceId ? <UtilityBar workspace colleague notification meeting /> : <UtilityBar logo colleague notification />}

        {/* list friend */}
        <SideBar />

        {/* chat box */}
        <Outlet />
      </div>
    </ColleagueContext.Provider>
  );
}
