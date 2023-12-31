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
import { useEffect, useRef, useState } from "react";
import { Form, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Loader2, User2, X } from "lucide-react";
import createMeeting from "../../api/meeting/createMeeting";
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from "@/components/ui/textarea"
import getMemberList from "../../api/workspace/getMemberList";
import {
   Avatar,
   AvatarFallback,
   AvatarImage,
 } from "@/components/ui/avatar"
 import { Checkbox } from "@/components/ui/checkbox"

function convertToISO(dateString, timeString) {
   let [year, month, day] = dateString.split("-");
   let [hour, minute] = timeString.split(":");
   month -= 1;
   const date = new Date(year, month, day, Number(hour), Number(minute));
   return date.toISOString();
}
function compareDate(date1, date2) {
   const [year1, month1, day1] = date1.split("-")
   const [year2, month2, day2] = date2.split("-")
   if(year1 > year2) return 1
   if(year1 < year2) return -1
   if(month1 > month2) return 1
   if(month1 < month2) return -1
   if(day1 > day2) return 1
   if(day1 < day2) return -1
   return 0
}
function compareTime(time1, time2) {
   const [hour1, minute1] = time1.split(":");
   const [hour2, minute2] = time2.split(":");
   if(hour1 > hour2) return 1
   if(hour1 < hour2) return -1
   if(minute1 > minute2) return 1
   if(minute1 < minute2) return -1
   return 0
}

function CreateMeetingDialog({ children, loadData }) {
   const [open, setOpen] = useState();
   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger>{children}</DialogTrigger>
         <DialogContent className="w-auto max-w-[1000px]">
            <DialogHeader>
               <DialogTitle> Create new meeting </DialogTitle>
            </DialogHeader>
            <MeetingForm  setOpen={setOpen} loadData={loadData} />
         </DialogContent>
      </Dialog>
   );
}
function MeetingForm({ setOpen, loadData }) {
   const [dateStart, setDateStart] = useState()
   const [dateEnd, setDateEnd] = useState()
   const [timeStart, setTimeStart] = useState()
   const [timeEnd, setTimeEnd] = useState()
   const [name, setName] = useState("")
   const [id, setId] = useState("")
   const [description, setDescription] = useState("")
   const [password, setPassword] = useState("")
   const [memberList, setMemberList] = useState("")

   const {workspaceId} = useParams()
   const {toast} = useToast()
   const submitRef = useRef()
   const cancelRef = useRef()
   const loaderRef = useRef()
   const [selectedMembers, setSelectedMembers] = useState([])
   const [search, setSearch] = useState("")

   useEffect(() => {
      async function fetchMemberList() {
         const data = await getMemberList(workspaceId)
         const uid = localStorage.getItem("userId")
         setMemberList(data.filter(member=> member.id !== uid))
         console.log("data", data)
      }
      fetchMemberList()
   }, [])
   return (
      <Form 
         onSubmit={async e=>{
            e.preventDefault()
            const meetingStart = convertToISO(dateStart, timeStart)
            const meetingEnd = convertToISO(dateEnd, timeEnd)
            submitRef.current.disabled = true
            cancelRef.current.disabled = true
            loaderRef.current.classList.remove("hidden")
            const res = await createMeeting(workspaceId, null, id, name, password, description, meetingStart, meetingEnd, selectedMembers)
            submitRef.current.disabled = false
            cancelRef.current.disabled = false
            loaderRef.current.classList.add("hidden")
            if(res.ok) {
               loadData()
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
         <div className="flex gap-5">
            <div
               className="grid grid-cols-6 items-center gap-2 flex-shrink-0"
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
            </div>

            {/* add Member */}
            <div className="flex-shrink-0 border-l border-l-black pl-5">
               <div className="flex flex-col gap-2">
                  <Input placeholder="search" 
                     value={search}
                     onChange={e=>setSearch(e.currentTarget.value)}
                  />
                  <div className="flex flex-col min-w-[300px] mt-3 overflow-y-auto">
                     {
                        memberList ?
                        memberList
                        .filter(member=>search === "" ? true : member.username.includes(search))
                        .map(member=> (
                           <Label
                              key={member.id}
                              className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded cursor-pointer w-full" 
                           > 
                              <Avatar>
                                 <AvatarImage src={member.picture} />
                                 <AvatarFallback> <User2 /> </AvatarFallback>
                              </Avatar>
                              <span className="truncate">
                                 {member.username}
                              </span>
                              <Checkbox 
                                 className="ml-auto"
                                 onCheckedChange={checked=>{
                                    if(checked) {
                                       selectedMembers.push(member.id)
                                    } else {
                                       selectedMembers.splice(selectedMembers.indexOf(member.id),1)
                                    }
                                    setSelectedMembers([...selectedMembers])
                                 }} 
                              />
                           </Label>
                        )) : null
                     }
                  </div>
               </div>
            </div>
         </div>
         {/* Submit  */}
         <div className="flex justify-end col-span-6 gap-2 mt-2">
            <Button variant="outline" onClick={e=>setOpen(false)} ref={cancelRef}> Cancel </Button>
            <Button ref={submitRef} 
               className="flex items-center"
               disabled={
                  !dateEnd || !dateStart || !timeStart || !timeStart || !name || !id || !password
                  || name.trim() === "" || id.trim() === ""
                  || compareDate(dateStart, dateEnd) === 1 || compareTime(timeStart, timeEnd) === 1
               }
            > 
               <Loader2 className="w-4 h-4 mr-2 hidden animate-spin" ref={loaderRef} />
               Create 
            </Button>
         </div>
      </Form>
   );
}

function validateEmail(email) {
   return email
      .toLowerCase()
      .match(
         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
}
export { CreateMeetingDialog };
