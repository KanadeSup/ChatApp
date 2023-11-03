import { toCharacter } from "/utils/ParseName"
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
      <div className=" flex-grow flex flex-col px-32 gap-10">
         <h1 className="mt-10 font-bold text-xl"> Workspace Overview </h1>
         <div className="w-[687px] flex flex-col gap-5">
            {/* workspace logo & name */}
            <div className="flex pb-10 border-b border-b-gray-300 justify-between">
               {/* Workspace Logo section */}
               <div className="flex gap-7">
                  {/* Workspace Logo */}
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

                        <img src="" className="hidden wlogo w-24 h-24 rounded-lg"/>
                        <div className="text-logo w-24 h-24 rounded-lg bg-blue-500 flex justify-center items-center text-5xl text-white font-medium">
                        </div>
                     </label>

                     {/* logo size*/}
                     <span className="lb-size text-xs font-medium text-black">
                        512x512 
                     </span>
                     {/* remove logo */}
                     <div className="remove-upload hidden cursor-pointer text-xs font-medium text-black"
                        onClick={removeUpload}
                     >
                        remove 
                     </div>
                  </div>
                  {/* Upload Logo Section */}
                  <div className="flex flex-col justify-between items-start relative bottom-1">
                     <div className="text-sm w-48 font-medium text-black"> 
                        We recommend an image of at least 512x512 for the server. 
                     </div>
                     <label className="cursor-pointer inline-flex rounded border border-[#000322] py-[5px] px-6 text-sm font-medium text-[#07074D]" >
                        Upload
                        <input className="file-input hidden" id="upload" type="file" name="wlogo" 
                           onChange={uploadImg}
                        />
                     </label>
                  </div>
               </div>

               {/* Workspace Name */}
               <div className="flex flex-col flex-1/2 relative bottom-2">
                  <label className="text-md font-medium"> 
                     Workspace name 
                  </label>
                  <div className="flex items-center gap-2">
                     <input className="wname-input shadow-inner py-1 px-2 rounded w-64 bg-[#EBEBEB]" type="text" maxLength="50" onChange={wNameOnChange}/>
                     <span className="remain-length-wname font-medium text-lg w-6"> 50 </span>
                  </div>
               </div>
            </div>
            {/* Description */}
            <div className="pb-8 border-b border-b-gray-300">
               <div className="flex flex-col gap-1 relative">
                  <label className="font-medium text-black text-md"> 
                     Description 
                  </label>
                  <textarea className="desc-input resize-none border border-black rounded-md p-3 text-md" maxLength="300" placeholder="Enter to descript what your workspace do for ..." rows="6"
                     onKeyDown={descKeyHandler} onChange={descOnChange}
                  >
                  </textarea>
                  <span className="remain-length-desc text-right font-medium text-lg w-6 absolute bottom-1 right-5"> 300 </span>
               </div>
            </div>

            {/* Workspace Option */}
            <div>
               {/* option */}
               <div className="flex justify-between">
                  <div>
                     <h1 className="text-lg font-medium"> Hide private channel </h1>
                     <p className="text-sm text-gray-600"> All member which is a not  private channel member cannot see that chanel </p>
                  </div>
                  
                  <label className="relative inline-flex items-center cursor-pointer">
                     <input type="checkbox" value="" class="sr-only peer" />
                     <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[14px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
               </div>
            </div>
         </div>
      </div>
   )
}
