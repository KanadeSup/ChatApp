import UtilityBar from "../../components/UtilityBar";
import { Sidebar } from "./Sidebar";
import { Toaster } from "@/components/ui/toaster"
export default function Meeting() {
    return (
        <div className="flex h-screen">
            <UtilityBar workspace colleague notification meeting/>
            <Sidebar />
            <Toaster />
        </div>
    )
}