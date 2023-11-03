export default function (props) {
  let smallTitle = props.title.length > 20 ? props.title.substring(0, 20) + "..." : props.title;
  let smallContent = props.content.length > 30 ? props.content.substring(0, 30) + "..." : props.content;
  return (
    <div className="flex flex-row bg-white p-1 border-b hover:bg-gray-200 select-none" onClick={props.onclick}>
      <div className="px-1 ml-1"><img className="h-8 w-8 rounded-md text-xs mt-1.5" src={props.img} alt="anh" /></div>
      <div className="flex flex-col text-sm flex-grow ml-2">
        <div className="font-semibold">{props.sender}</div>
        <div className="flex flex-row ">
          <div className="flex-1 font-medium text-bold-blue">{smallTitle}</div>
          <div className="px-2 text-xs py-0.5 text-gray-500">{props.time}</div>
        </div>
        <div className="text-gray-500">{smallContent}</div>
      </div>
    </div>
  );
}
