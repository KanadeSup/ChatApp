import { useState } from "react";
import ChannelOption from "./ChannelOption";
import PinnedMessageList from "./PinnedMessageList";
import AllMember from "./AllMember";
import Media from "./Media";
import Files from "./Files";
import Links from "./Links";
export default function (props) {
  const [selectedOption, setSelectedOption] = useState("");
  return (
    <div className="flex flex-col w-1/3 flex-shrink-0 shadow">
      {selectedOption === "" && <ChannelOption setSelectedOption={setSelectedOption} />}
      {selectedOption === "pinnedMessageList" && <PinnedMessageList setSelectedOption={setSelectedOption}/>}
      {selectedOption === "allMember" && <AllMember setSelectedOption={setSelectedOption}/>}
      {selectedOption === "media" && <Media setSelectedOption={setSelectedOption}/>}
      {selectedOption === "files" && <Files setSelectedOption={setSelectedOption}/>}
      {selectedOption === "links" && <Links setSelectedOption={setSelectedOption}/>}
    </div>
  );
}
