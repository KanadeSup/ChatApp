import { Link } from "react-router-dom";
import { toCharacter } from "/utils/ParseName"

function wNameOnChange(e) {
   const remainLength = document.querySelector(".remain-length-wname")
   const wNameInput = document.querySelector(".wname-input")
   const length = wNameInput.value.length
   remainLength.innerHTML = 50 - length 

   const textLogo = document.querySelector(".text-logo")
   textLogo.innerHTML = toCharacter(wNameInput.value)

   // validate
   const butCreate = document.querySelector(".but-create")
   const wname = wNameInput.value.trim()
   console.log(wname.length)
   if(wname.length === 0) {
      butCreate.disabled = true
      butCreate.classList.remove("text-green-500")
      butCreate.classList.add("text-gray-300")
      return
   }
   butCreate.disabled = false
   butCreate.classList.remove("text-gray-300")
   butCreate.classList.add("text-green-500")

}
function descKeyHandler(e) {
   if(e.key === 'Enter')
      e.preventDefault()
}

function descOnChange(e) {
   const remainLength = document.querySelector(".remain-length-desc")
   const descInput = document.querySelector(".desc-input")
   const length = descInput.value.length
   remainLength.innerHTML = 300 - length 
}
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
function removeUpload(e){
   const lbSize = document.querySelector(".lb-size")
   const removeUpload = document.querySelector(".remove-upload")
   const wLogo = document.querySelector(".wlogo")
   const textLogo = document.querySelector(".text-logo")

   removeUpload.classList.add("hidden")
   lbSize.classList.remove("hidden")
   wLogo.classList.add("hidden")
   textLogo.classList.remove("hidden")
}


export default function() {
   return (
      <div className="grow flex justify-center items-start shadow-xl">
         <form className=" p-10">
            {/* Top */}
            <div className="flex gap-20">
               {/* col 1 */}
               <div className="flex w-1/2 gap-7">
                  {/* col 1.1 */}
                  <div className="flex flex-col items-center w-24 h-24">
                     <label htmlFor="upload" className="cursor-pointer relative"
                        onMouseOver={(e) => document.querySelector(".icon-add-logo").classList.remove("invisible")}
                        onMouseOut={(e) => document.querySelector(".icon-add-logo").classList.add("invisible")}
                     >
                        <div className="icon-add-logo absolute invisible hover:bg-gray-300 hover:bg-opacity-90 rounded-md  w-full h-full flex justify-center items-center" >
                           <svg className="w-10 h-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                           </svg>
                        </div>
                        {/* Logo workspace */}
                        <img src="" className="hidden wlogo w-24 h-24 rounded-lg"/>
                        <div className="text-logo w-24 h-24 rounded-lg bg-gray-400 flex justify-center items-center text-5xl text-white font-medium">
                        </div>
                     </label>
                     <span className="lb-size text-xs font-medium text-black">
                        512x512 
                     </span>
                     <div className="remove-upload hidden cursor-pointer text-xs font-medium text-black"
                        onClick={removeUpload}
                     >
                        remove 
                     </div>
                  </div>
                  {/* col 1.2 */}
                  <div className="flex flex-col justify-between items-start relative bottom-1">
                     <div className="text-sm w-48 font-medium text-black"> 
                        We recommend an image of at least 512x512 for the server. 
                     </div>
                     <label className="cursor-pointer inline-flex rounded border border-[#000322] py-1 px-6 text-base font-medium text-[#07074D]" >
                        Upload
                        <input className="file-input hidden" id="upload" type="file" name="wlogo" 
                           onChange={uploadImg}
                        />
                     </label>
                  </div>
               </div>

               {/* col 2 */}
               <div className="w-1/2 flex flex-col flex-1/2 relative bottom-2">
                  <label className="text-md font-medium"> 
                     Workspace name 
                  </label>
                  <div className="flex items-center gap-2">
                     <input className="wname-input border border-black py-1 px-2 rounded w-64" type="text" maxLength="50" onChange={wNameOnChange}/>
                     <span className="remain-length-wname font-medium text-lg w-6"> 50 </span>
                  </div>
               </div>
            </div>

            {/* Description */}
            <div className="flex flex-col mt-10 gap-1 relative">
               <label className="font-medium text-black text-md"> 
                  Description 
               </label>
               <textarea className="desc-input resize-none border border-black rounded-md p-3 text-md" maxLength="300" placeholder="Enter to descript what your workspace do for ..." rows="6"
                  onKeyDown={descKeyHandler} onChange={descOnChange}
               >
               </textarea>
               <span className="remain-length-desc text-right font-medium text-lg w-6 absolute bottom-1 right-5"> 300 </span>
            </div>

            {/* Invite */}
            <div className="flex flex-col mt-10 font-medium text-md">
               <label> Add coworker by email </label>
               <textarea className="resize-none rounded px-2 py-1 border border-black " placeholder="ex. billgate@gmail.com putin@gmail.com">

               </textarea>
               <div className="flex justify-end py-2">
                  <button className="border border-black rounded text-md font-medium px-3 py-2 flex gap-3"> 
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                     </svg>
                     Copy Invite Link 
                  </button>
               </div>
            </div>

            <div className="flex justify-end gap-10 mt-10">
               <Link className="cursor-pointer text-lg text-red-500 font-medium px-3 py-2 border border-gray-200 rounded shadow-xl" to='..'> 
                  Cancel
               </Link>
               <input className="but-create cursor-pointer text-lg px-3 py-2 text-gray-300 font-medium border border-gray-200 rounded shadow-xl" disabled={true} type="submit" value="Create"/>
            </div>

         </form>
      </div>
   )
}
