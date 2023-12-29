import { Plus } from "lucide-react"
import { CreateMeetingDialog } from "./CreateMeetingDialog"

function Sidebar() {
    return (
        <div className="w-72 border-r border-r-600">
            {/* Header */}
            <div className="px-3 py-3 border-b border-b-gray-300 flex justify-between items-center">
                <h1 className="font-bold text-xl text-gray-700"> Meeting </h1>
                <CreateMeetingDialog>
                    <Plus className="w-7 h-7 stroke-[3px] stroke-gray-700 cursor-pointer p-1 hover:bg-gray-100 rounded"/>
                </CreateMeetingDialog>
            </div>

            {/* List meeting */}
            <div className="">
                <div className="px-3 py-2 border-b border-b-gray-300 rounded-b-lg hover:bg-gray-100 cursor-pointer">
                    <h1 className="font-bold text-lg truncate"> New Meeting </h1>
                    <p className="text-gray-500"> This is descipriton about meeting, you can read for more information </p>
                </div>
                <div className="px-3 py-2 border-b border-b-gray-300 rounded-b-lg hover:bg-gray-100 cursor-pointer">
                    <h1 className="font-bold text-lg truncate"> New Meeting </h1>
                    <p className="text-gray-500"> This is descipriton about meeting, you can read for more information </p>
                </div>
            </div>
        </div>
    )
}
export { Sidebar }