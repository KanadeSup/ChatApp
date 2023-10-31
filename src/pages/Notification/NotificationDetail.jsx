export default function NotificationDetail(props) {
  return (
    <div className="flex flex-col flex-grow py-3">
      <div className="text-lg font-medium ml-7">You have Meeting today</div>
      <div className="flex flex-row mt-7 ml-5">
        <div className="px-1 ml-1">
          <img
            className="h-9 w-9 rounded-md text-xs mt-1.5"
            src={props.img}
            alt="anh"
          />
        </div>
        <div className="flex flex-col ml-5 flex-grow border-b mr-10">
          <div className="flex flex-row justify-between">
            <div className="text-base font-medium">Admin</div>
            <div className="text-xs text-gray-500 mt-1.5">23:10 17/10/2023</div>
          </div>
          <div className="text-sm text-gray-600 pb-2">Đến tôi</div>
        </div>
      </div>

      <div className="flex flex-shrink mt-5 ml-20 mr-6 px-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia nobis
        reprehenderit sequi illo minima quibusdam cum! Veniam officiis aperiam
        possimus exercitationem recusandae, dignissimos voluptatem soluta
        repellat rerum. Sed, ab qui?
      </div>
    </div>
  );
}
