import { AccountSvg } from '/assets/img/SettingSvg'
export default function() {
   return(
      <div className="flex-shrink-0 bg-gray-100 w-72 flex flex-col items-stretch gap-2 py-3 px-3 shadow-xl">
         {/* header */}
         <div className="font-bold text-center text-gray-600">
            User Setting
         </div>

         {/* Settings */}
         <div className="flex items-center gap-3 bg-gray-300 px-2 py-1 rounded-md cursor-pointer font-bold">
            <AccountSvg />
            <span className="text-md"> My Account </span>
         </div>
      </div>
   )
}
