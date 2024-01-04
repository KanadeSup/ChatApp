import { useState, useEffect } from "react";
import UtilityBar from "/components/UtilityBar";
import SideBar from "./SideBar";
import {
    Outlet,
    useParams,
    useNavigate,
} from "react-router-dom";
import useInfo from "../../storages/useInfo";
import { getWorkspace } from "/api";

export default function () {
    const [channelName, setChannelName] = useState("");
    const navigate = useNavigate();
    const { workspace, setWorkspace } = useInfo();
    const { workspaceId } = useParams();
    useEffect(() => {
        async function fetchData() {
            if (!workspace) {
                const data = await getWorkspace(workspaceId);
                if (data.status === 500) navigate("/Workspace/");
                setWorkspace(data);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="flex h-screen w-full">
            {workspaceId ? (
                <UtilityBar workspace colleague notification meeting />
            ) : (
                <UtilityBar logo colleague notification />
            )}
            <SideBar workspace={workspace} setChannelName={setChannelName} />
            <Outlet />
        </div>
    );
}
