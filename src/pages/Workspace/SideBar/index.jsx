import SideBarHeader from "./SideBarHeader";
import ChannelList from "./ChannelList";

export default function () {
    return (
        <div className="flex-shrink-0 bg-gray-100 w-72 flex flex-col items-stretch shadow-xl">
            <SideBarHeader />
            <ChannelList />
        </div>
    );
}