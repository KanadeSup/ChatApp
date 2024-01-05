import { useState } from "react";
import ColleagueOption from "./ColleagueOption";
import PinnedMessageList from "./PinnedMessageList";
import AllMember from "./AllMember";
import Media from "./Media";
import Files from "./Files";
import Links from "./Links";
export default function ({setIsChatOption, setJump, conversationId, isChannel, setMessages, setPinMessages, pinMessages}) {
  const [selectedOption, setSelectedOption] = useState("");
  return (
    <div className="flex flex-col w-2/5 2xl:w-1/3 flex-shrink-0 border shadow">
      {selectedOption === "" && <ColleagueOption setSelectedOption={setSelectedOption} setIsChatOption={setIsChatOption}/>}
      {selectedOption === "pinnedMessageList" && <PinnedMessageList setJump={setJump} setSelectedOption={setSelectedOption} conversationId={conversationId} isChannel={false} setPinMessages={setPinMessages} pinMessages={pinMessages} setMessages={setMessages}/>}
      {selectedOption === "allMember" && <AllMember setSelectedOption={setSelectedOption} conversationId={props.conversationId}/>}
      {selectedOption === "media" && <Media setSelectedOption={setSelectedOption} conversationId={conversationId}/>}
      {selectedOption === "files" && <Files setSelectedOption={setSelectedOption} conversationId={conversationId}/>}
      {/* {selectedOption === "links" && <Links setSelectedOption={setSelectedOption}/>} */}
    </div>
  );
}
