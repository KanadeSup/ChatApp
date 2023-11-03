import { useState } from 'react'
import { AccountSvg } from '/assets/img/SettingSvg'

function uploadImg(e) {
   const fileInput = document.querySelector(".file-input")
   const lbSize = document.querySelector(".lb-size")
   const removeUpload = document.querySelector(".remove-upload")
   const wLogo = document.querySelector(".wlogo")
   const textLogo = document.querySelector(".text-logo")

   if(fileInput.files && fileInput.files[0]) {
      wLogo.src = URL.createObjectURL(fileInput.files[0])
      removeUpload.classList.remove("hidden")
      lbSize.classList.add("hidden")
      wLogo.classList.remove("hidden")
      textLogo.classList.add("hidden")
   }
}
export default function() {
   const [togglePass, setTogglePass] = useState(false)
   const [toggleEmail, setToggleEmail] = useState(false)
   const [avatar, setAvatar] = useState(null)

   return(
      <div className=" flex-grow flex flex-col items-center">

         {/* Header */}
         <div className="w-1/2 min-w-[700px] mt-20 mb-5 flex gap-3 items-center"> 
            <AccountSvg />
            <span className="text-3xl font-bold text-gray-600"> My Account </span>
         </div>

         {/* Setting */}
         <div className="w-1/2 min-w-[700px] bg-gray-50 p-10 rounded border border-gray-300 shadow-xl">

            {/* Avatar */}
            <div className="pb-4 border-b-gray-500 border-b flex justify-between items-center">
               <div className="flex flex-col items-center gap-1">
                  <div className="border border-gray-600 w-20 h-20 rounded">
                     {
                        avatar && <img src={URL.createObjectURL(avatar)} className="w-20 h-20"/>
                     }
                  </div>
                  {
                     avatar && 
                     <button className="text-xs font-bold" onClick={()=>setAvatar(null)} > 
                        remove 
                     </button> || <span className="font-bold text-xs"> 80x80 </span>

                  }
               </div>
               <div>
                  { 
                     avatar && (
                     <button className="mr-3 rounded px-3 py-2 bg-[#007A5A] text-white font-bold">
                        Save Avatar
                     </button>
                     )
                  }
                  <label htmlFor="upload" className="cursor-pointer border-gray-600 border rounded px-2 py-2 font-medium text-md" >
                     Change
                  </label>
               </div>
               <input type="file" id="upload" className="hidden" 
                  onChange={(e) =>  setAvatar(e.target.files[0])}
               />

            </div>

            {/* Password */}
            <div className="py-4 border-b-gray-500 border-b transition-all duration-500">
               <div className="flex justify-between items-center">
                  <span className="text-xl font-medium"> 
                     Password
                  </span>

                  <button className="border-gray-600 border rounded px-2 py-2 font-medium text-md"
                  onClick={()=>setTogglePass(!togglePass)}
                  >
                     Change
                  </button>
               </div>

               <div className={"mt-5 " + (togglePass ? "" : "hidden")}>
                  <div className="flex flex-col items-start">
                     <label className="text-md font-medium"> Current Password </label>
                     <input className="border border-black rounded py-1 px-2 text-lg" type="password"/>
                  </div>
                  <div className="mt-5 flex flex-col items-start">
                     <label className="text-md font-medium"> New Password </label>
                     <input className="border border-black rounded py-1 px-2 text-lg" type="password"/>
                  </div>

                  <button className="rounded px-3 py-2 bg-[#007A5A] text-white font-bold mt-5">
                     Update Password
                  </button>
               </div>
            </div>

            {/* Email */}
            <div className="py-4 border-b-gray-500 border-b">
               <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                     <div className="text-xl font-medium"> 
                        Email Address 
                     </div>
                     <div> Your email address is <b> Putin@gmail.com </b></div>
                  </div>

                  <button className="border-gray-600 border rounded px-2 py-2 font-medium text-md"
                  onClick={()=>setToggleEmail(!toggleEmail)}
                  >
                     Change
                  </button>
               </div>

               <div className={"mt-5 " + (toggleEmail ? "" : "hidden")}>
                  <div className="flex flex-col items-start">
                     <label className="text-md font-medium"> Current Password </label>
                     <input className="border border-black rounded py-1 px-2 text-lg" type="password"/>
                  </div>
                  <div className="mt-5 flex flex-col items-start">
                     <label className="text-md font-medium"> New Email Address </label>
                     <input className="border border-black rounded py-1 px-2 text-lg" type="text"/>
                  </div>

                  <button className="rounded px-3 py-2 bg-[#007A5A] text-white font-bold mt-5"> Update Email </button>
               </div>
            </div>

            {/* Username */}
            <div className="py-4 border-b-gray-500 border-b">
               <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                     <div className="text-xl font-medium"> 
                        Username
                     </div>
                     <div> Your Username is <b> PutinLord </b></div>
                  </div>

               </div>

               <div className="mt-5 hidden">
                  <div className="flex flex-col items-start">
                     <label className="text-md font-medium"> Current Password </label>
                     <input className="border border-black rounded py-1 px-2 text-lg" type="password"/>
                  </div>
                  <div className="mt-5 flex flex-col items-start">
                     <label className="text-md font-medium"> New Email Address </label>
                     <input className="border border-black rounded py-1 px-2 text-lg" type="text"/>
                  </div>

                  <button className="rounded px-3 py-2 bg-[#007A5A] text-white font-bold mt-5"> Update Email </button>
               </div>
            </div>


         </div>
      </div>
   )
}
