import SideBarHeader from "./SideBarHeader";
import ChannelList from "./ChannelList";
import { useEffect, useState } from "react";
import { useActionData, useFetcher, useParams } from "react-router-dom";

export default function ({ workspace, setChannelName }) {
   const fetcher = useFetcher()
   return (
      <div className="flex-shrink-0 bg-white w-72 flex flex-col items-stretch border-r border-r-gray-200">
         <SideBarHeader workspace={workspace} fetcher={fetcher}/>
         <ChannelList fetcher={fetcher} setChannelName={setChannelName}/>
      </div>
   );
}
