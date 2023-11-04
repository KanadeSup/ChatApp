import ChannelItem from "./ChannelItem";

export default function ChannelList() {
  return (
    <div className="flex flex-col px-2 mt-4 text-base font-medium text-gray-600">
      <ChannelItem />
      <ChannelItem />
      <ChannelItem />
      
    </div>
  );
}
