import UtilityBar from "../../components/UtilityBar";
import { Sidebar } from "./Sidebar";
export default function Meeting() {
    return (
        <div className="flex h-screen">
            <UtilityBar workspace colleague notification meeting/>
            <Sidebar />
        </div>
        
    )
}