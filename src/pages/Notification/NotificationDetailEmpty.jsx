export default function NotificationDetailEmpty() {
  return (
    <div className="flex justify-center items-center flex-grow">
      <div className="flex flex-col">
        <img
          className="w-36 h-36"
          src="https://res-h3.public.cdn.office.net/owamail/20231020006.20/resources/images/illustration_mail-hash-c4bc6831.m.svg"
          alt=""
        />
        <div className="text-base font-semibold text-gray-700 text-center mt-3">
          Chọn mục để đọc
        </div>
        <div className="text-base text-gray-600 text-center">Chưa chọn mục nào</div>
      </div>
    </div>
  );
}
