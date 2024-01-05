import { Outlet, useParams } from "react-router-dom";
import UtilityBar from "../../components/UtilityBar";
import { Sidebar } from "./Sidebar";
import { Toaster } from "@/components/ui/toaster"
import { useEffect, useState } from "react";
import getMeetings from "../../api/meeting/getMeetings";
export default function Meeting() {
    const [meetings, setMeetings] = useState()
    const { workspaceId } = useParams()
    const [forceLoad, setForceLoad] = useState({})
    function loadData() {
        setForceLoad({})
    }
    useEffect(()=> {
        async function fetchData() {
            const res = await getMeetings(workspaceId)
            if(!res.ok) return
            setMeetings(res.data.filter(meeting=>(meeting.status !== 3)))
        }
        fetchData()
    },[forceLoad])
    return (
        <div className="flex h-screen">
            <UtilityBar workspace colleague notification meeting/>
            <Sidebar meetings={meetings} loadData={loadData} />
            <Outlet context={loadData}/>
            <Toaster />
        </div>
    )
}