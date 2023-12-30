import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";
import { Form, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Loader2, X } from "lucide-react";
import createMeeting from "../../api/meeting/createMeeting";
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from "@/components/ui/textarea"

function convertToISO(dateString, timeString) {
   let [year, month, day] = dateString.split("-");
   let [hour, minute] = timeString.split(":");
   console.log(hour,minute)
   month -= 1;
   let date = new Date(year, month, day, Number(hour), Number(minute));
   return date.toISOString();
}

function CreateMeetingDialog({ children }) {
   const [open, setOpen] = useState();
   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger>{children}</DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle> Create new meeting </DialogTitle>
            </DialogHeader>
            <MeetingForm  setOpen={setOpen}/>
         </DialogContent>
      </Dialog>
   );
}
function MeetingForm({ setOpen }) {
   const [dateStart, setDateStart] = useState()
   const [dateEnd, setDateEnd] = useState()
   const [timeStart, setTimeStart] = useState()
   const [timeEnd, setTimeEnd] = useState()
   const [name, setName] = useState("")
   const [id, setId] = useState("")
   const [emails, setEmails] = useState([])
   const [description, setDescription] = useState("")
   const [password, setPassword] = useState("")
   const {workspaceId} = useParams()
   const {toast} = useToast()
   const submitRef = useRef()
   const cancelRef = useRef()
   const loaderRef = useRef()
   return (
      <Form 
         className="grid grid-cols-6 items-center gap-2"
         onSubmit={async e=>{
            e.preventDefault()

            if(!dateEnd || !dateStart) return
            if(!timeStart || !timeStart) return
            if(!name || !id || !password) return
            const meetingStart = convertToISO(dateStart, timeStart)
            const meetingEnd = convertToISO(dateEnd, timeEnd)
            submitRef.current.disabled = true
            cancelRef.current.disabled = true
            loaderRef.current.classList.remove("hidden")
            const res = await createMeeting(workspaceId, null, id, name, password, description, meetingStart, meetingEnd, [])
            submitRef.current.disabled = false
            cancelRef.current.disabled = false
            loaderRef.current.classList.add("hidden")
            if(res.ok) {
               toast({
                  title: (
                     <p className="flex items-center gap-2">
                        <Check className="stroke-green-600"/>
                        Create meeting successfully
                     </p>
                  )
               })
               setOpen(false)
               return
            }
            if(res.status === "403") {
               toast({
                  title: (
                     <p className="flex items-center gap-2">
                        <X className="stroke-red-600"/>
                        You don't have permission to do this
                     </p>
                  )
               })
               setOpen(false)
               return
            }
            toast({
               title: (
                  <p className="flex items-center gap-2">
                     <X className="stroke-red-600"/>
                     Something when wrong please try again
                  </p>
               )
            })
         }}
      >
         {/* Meeting id */}
         <Label className="font-medium text-[16px] col-span-2"> Meeting id: </Label>
         <Input type="text"
            value={id}
            onChange={e=>setId(e.currentTarget.value)}
            maxLength={10}
            onBlur={e=>{
               const inputEle = e.currentTarget
               if(inputEle.value.trim() === "") {
                  inputEle.classList.add("border-red-500")
                  return
               }
               inputEle.classList.replace("border-red-500","border-black")
            }}
            className="col-span-4" 
         />

         {/* Meeting name */}
         <Label className="font-medium text-[16px] col-span-2"> Meeting name: </Label>
         <Input type="text"
            value={name}
            onChange={e=>setName(e.currentTarget.value)} 
            maxLength={50}
            onBlur={e=>{
               const inputEle = e.currentTarget
               if(inputEle.value.trim() === "") {
                  inputEle.classList.add("border-red-500")
                  return
               }
               inputEle.classList.replace("border-red-500","border-black")
            }}
            className="col-span-4" 
         />

         {/* Password */}
         <Label className="font-medium text-[16px] col-span-2"> Meeting password: </Label>
         <Input type="password" 
            maxLength={50}
            className="col-span-4" 
            value={password}
            onChange={e=>setPassword(e.currentTarget.value)} 
            onBlur={e=>{
               const inputEle = e.currentTarget
               if(inputEle.value.trim() === "") {
                  inputEle.classList.add("border-red-500")
                  return
               }
               inputEle.classList.replace("border-red-500","border-black")
            }}
         />

         {/* Date */}
         <Label className="font-medium text-[16px] col-span-2"> Date: </Label>
         <div className="flex col-span-4 items-center gap-1">
            <Input type="date" className="col-span-2" 
               onChange={e=>{setDateStart(e.currentTarget.value)}} 
               onBlur={e=>{
                  if(e.currentTarget.value === "") {
                     e.currentTarget.classList.add("border-red-500")
                     e.currentTarget.classList.add("text-red-500")
                     return
                  }
                  e.currentTarget.classList.replace("border-red-500","border-black")
                  e.currentTarget.classList.replace("text-red-500","text-black")
               }}
            />
            -
            <Input type="date" className="col-span-2" 
               onChange={e=>{setDateEnd(e.currentTarget.value)}} 
               onBlur={e=>{
                  if(e.currentTarget.value === "") {
                     e.currentTarget.classList.add("border-red-500")
                     e.currentTarget.classList.add("text-red-500")
                     return
                  }
                  e.currentTarget.classList.replace("border-red-500","border-black")
                  e.currentTarget.classList.replace("text-red-500","text-black")
               }}
            />
         </div>

         {/* Time */}
         <Label className="font-medium text-[16px] col-span-2"> Time: </Label>
         <div className="flex col-span-4 items-center gap-1">
            <Input type="time" className="col-span-2" 
               onChange={e=>{setTimeStart(e.currentTarget.value)}}
               onBlur={e=>{
                  if(e.currentTarget.value === "") {
                     e.currentTarget.classList.add("border-red-500")
                     e.currentTarget.classList.add("text-red-500")
                     return
                  }
                  e.currentTarget.classList.replace("border-red-500","border-black")
                  e.currentTarget.classList.replace("text-red-500","text-black")
               }}
            />
            -
            <Input type="time" 
               className="col-span-2" 
               onChange={e=>{setTimeEnd(e.currentTarget.value)}}
               onBlur={e=>{
                  if(e.currentTarget.value === "") {
                     e.currentTarget.classList.add("border-red-500")
                     e.currentTarget.classList.add("text-red-500")
                     return
                  }
                  e.currentTarget.classList.replace("border-red-500","border-black")
                  e.currentTarget.classList.replace("text-red-500","text-black")
               }}
            />
         </div>
         
         {/* Description */}
         <div className="col-span-6">
            <Label> Description </Label>
            <Textarea value={description} onChange={e=>setDescription(e.currentTarget.value)} spellCheck="false" maxLength={255} />
         </div>

         {/* add Member */}
         <div className="col-span-6">
            <span> Members </span>
            <InviteInput setEmails={setEmails} emails={emails} />
         </div>
         <div className="flex justify-end col-span-6 gap-2 mt-2">
            <Button variant="outline" onClick={e=>setOpen(false)} ref={cancelRef}> Cancel </Button>
            <Button ref={submitRef} className="flex items-center"> 
               <Loader2 className="w-4 h-4 mr-2 hidden animate-spin" ref={loaderRef} />
               Create 
            </Button>
         </div>
      </Form>
   );
}

function InviteInput({emails, setEmails}) {
   const inputRef = useRef()
   const containerRef = useRef()
   const [value, setValue] = useState("")
   const [isError, setIsError] = useState(false)
   return(
      <div 
         ref={containerRef}
         className="w-full h-20 border border-black rounded cursor-text px-2 py-1 flex items-baseline gap-x-2 gap-y-1 flex-wrap overflow-auto"
         onClick={e=>{
            inputRef.current.focus()
         }}
      >
         {
            emails.map(email=> (
               <span 
                  key={email} 
                  className="border border-gray-500 rounded px-[3px] cursor-pointer flex items-center gap-1"
                  onClick={e=>{
                     emails.splice(emails.indexOf(email),1)
                     setEmails([...emails])
                  }}
               >
                  {email}
                  <X className="w-3 h-3 stroke-[3]"/>
               </span>
            ))
         }
         <input 
            ref={inputRef} 
            className={`outline-none text-sm flex-grow h-[26px] ${isError ? "text-red-500" : ""}`}
            size={15}
            maxLength={50}
            value={value}
            onChange={e=>{
               const inputValue = e.currentTarget.value
               setIsError(false)
               if(inputValue === " ") return
               if(inputValue.includes(" ")) {
                  if(!validateEmail(value)) {
                     setIsError(true)
                     return
                  }
                  if(emails.map(v=>v.toLowerCase()).includes(value)) {
                     setIsError(true)
                     return
                  }
                  setEmails([...emails, value])
                  setValue("")
                  return
               }
               setValue(inputValue)
            }}
         />
      </div>
   )
}
function validateEmail(email) {
   return email
      .toLowerCase()
      .match(
         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
}
export { CreateMeetingDialog };
