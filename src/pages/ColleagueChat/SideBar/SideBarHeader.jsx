import ToolBar from "./ToolBar";
import FilterConversation from "./FilterConversation";
import { useState } from "react";
export default function SideBarHeader(props) {
  const [isClickedFilter, setIsClickedFilter] = useState(false);
  const [isClosedFilter, setIsClosedFilter] = useState(true);
  const [isFilterName, setFilterName] = useState(""); // Biến lưu giá trị của ô input, để tạm chưa dùng
  return (
    <div className="z-10">
        { isClickedFilter && <FilterConversation setIsClickedFilter={setIsClickedFilter} setIsClosedFilter={setIsClosedFilter} setFilterName={setFilterName} />}
        { isClosedFilter && <ToolBar setIsClosedFilter={setIsClosedFilter} setIsClickedFilter={setIsClickedFilter}/>}
    </div>
  );
}
{/*  */}