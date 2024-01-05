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
 import { parseISO, addHours, format, parse } from "date-fns";
import updateMeeting from "../../api/meeting/updateMeeting";


function convertToISO(dateString, timeString) {
   let [year, month, day] = dateString.split("-");
   let [hour, minute] = timeString.split(":");
   month -= 1;
   const date = new Date(year, month, day, Number(hour), Number(minute));
   return date.toISOString();
}
function getCurrentDate(offset) {
   const date = new Date()
   date.setHours(date.getHours() + offset);
   let year = date.getFullYear();
   let month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are zero based
   let day = ("0" + date.getDate()).slice(-2);
   return `${year}-${month}-${day}`
}
function getCurrentTime(offset) {
   const date = new Date()
   date.setHours(date.getHours() + offset);
   let hours = ("0" + date.getHours()).slice(-2);
   let minutes = ("0" + date.getMinutes()).slice(-2);
   return `${hours}:${minutes}`
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
function iso2Date(isoTime) {
   let date = parseISO(isoTime);
   date = addHours(date, 0);
   return format(date, "yyyy-MM-dd")
}
function iso2Time(isoTime) {
   let date = parseISO(isoTime);
   date = addHours(date, 0);
   return format(date, "HH:mm")
}

function CreateMeetingDialog({ children, loadData, editData, loadMeeting}) {
   const [open, setOpen] = useState();
   return (
      <Dialog open={open} onOpenChange={setOpen} asChild>
         <DialogTrigger asChild>{children}</DialogTrigger>
         <DialogContent className="w-auto max-w-[1000px] min-w-[800px]">
            <DialogHeader>
               <DialogTitle> Create new meeting </DialogTitle>
            </DialogHeader>
            <MeetingForm  setOpen={setOpen} loadData={loadData} editData={editData} loadMeeting={loadMeeting} />
         </DialogContent>
      </Dialog>
   );
}
function MeetingForm({ setOpen, loadData, editData, loadMeeting }) {
   const [dateStart, setDateStart] = useState(editData ? iso2Date(editData.timeStart) : getCurrentDate(0))
   const [dateEnd, setDateEnd] = useState(editData ? iso2Date(editData.timeEnd) : getCurrentDate(2))
   const [timeStart, setTimeStart] = useState(editData ? iso2Time(editData.timeStart) : getCurrentTime(0))
   const [timeEnd, setTimeEnd] = useState(editData ? iso2Time(editData.timeEnd) : getCurrentTime(2))
   const [name, setName] = useState(editData ? editData.name : "")
   const [id, setId] = useState(editData ? editData.sessionId : "")
   const [description, setDescription] = useState(editData ? editData.description : "")
   const [password, setPassword] = useState(editData ? editData.password : "")
   const [memberList, setMemberList] = useState("")
   const {workspaceId, meetingId} = useParams()
   const {toast} = useToast()
   const submitRef = useRef()
   const cancelRef = useRef()
   const loaderRef = useRef()
   const dateStartRef = useRef()
   const dateEndRef = useRef()
   const timeStartRef = useRef()
   const timeEndRef = useRef()
   const errorRef = useRef()
   const [selectedMembers, setSelectedMembers] = useState([])
   const [search, setSearch] = useState("")
   useEffect(() => {
      async function fetchMemberList() {
         const data = await getMemberList(workspaceId)
         const uid = localStorage.getItem("userId")
         setMemberList(data.filter(member=> member.id !== uid))
         if(editData) {
            const seclections = []
            editData.participants.map(parti => seclections.push(parti.id))
            setSelectedMembers(seclections)
         }
      }
      fetchMemberList()
   }, [])
   function handleSchedule() {
      if(dateStartRef.current.value === "") return
      if(dateEndRef.current.value === "") return
      if(timeEndRef.current.value === "") return
      if(timeStartRef.current.value === "") return
      if(compareDate(dateStartRef.current.value, dateEndRef.current.value) === 1){
         errorRef.current.textContent = "The 'meeting start' must be before 'meeting end'"
         dateStartRef.current.classList.add("border-red-500")
         dateEndRef.current.classList.add("border-red-500")
         return
      }
      if(compareDate(dateStartRef.current.value, dateEndRef.current.value) === 0
         && compareTime(timeStartRef.current.value, timeEndRef.current.value) === 1
      ){
         errorRef.current.textContent = "The 'meeting start' must be before 'meeting end'"
         timeEndRef.current.classList.add("border-red-500")
         timeStartRef.current.classList.add("border-red-500")
         return
      }
      errorRef.current.textContent = ""
      dateStartRef.current.classList.replace("border-red-500", "border-black")
      dateEndRef.current.classList.replace("border-red-500", "border-black")
      timeStartRef.current.classList.replace("border-red-500", "border-black")
      timeEndRef.current.classList.replace("border-red-500", "border-black")
   }
   return (
      <Form 
         onSubmit={async e=>{
            e.preventDefault()
            const meetingStart = convertToISO(dateStart, timeStart)
            const meetingEnd = convertToISO(dateEnd, timeEnd)
            submitRef.current.disabled = true
            cancelRef.current.disabled = true
            loaderRef.current.classList.remove("hidden")
            let res;
            if(editData) {
               res = await updateMeeting(workspaceId, null, meetingId, name, password, description, meetingStart, meetingEnd, selectedMembers)
            } else {
               res = await createMeeting(workspaceId, null, id, name, password, description, meetingStart, meetingEnd, selectedMembers)
            }
            submitRef.current.disabled = false
            cancelRef.current.disabled = false
            loaderRef.current.classList.add("hidden")
            if(res.ok) {
               loadData()
               if(editData) loadMeeting()
               toast({
                  title: (
                     <p className="flex items-center gap-2">
                        <Check className="stroke-green-600"/>
                        {editData ? "Edit sucessfully" : "Create meeting successfully"}
                     </p>
                  )
               })
               setOpen(false)
               return
            }
            if(res.status === 403) {
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
               <Label className="font-medium text-[16px] col-span-2"> Meeting id </Label>
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
                  disabled={
                     editData ? true : false
                  }
               />

               {/* Meeting name */}
               <Label className="font-medium text-[16px] col-span-2"> Meeting name </Label>
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
               <Label className="font-medium text-[16px] col-span-2"> Meeting password </Label>
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

               {/* Schedular start */}
               <Label className="font-medium text-[16px] col-span-2"> Meeting start at </Label>
               <div className="flex col-span-4 items-center gap-1">
                  <Input type="date" 
                     className="" 
                     ref={dateStartRef}
                     value={dateStart}
                     onChange={e=>{setDateStart(e.currentTarget.value)}} 
                     onBlur={e=>{
                        handleSchedule()
                     }}
                  />
                  -
                  <Input type="time" 
                     className="basis-[180px]"
                     ref={timeStartRef}
                     value={timeStart}
                     onChange={e=>{setTimeStart(e.currentTarget.value)}}
                     onBlur={e=>{
                        handleSchedule()
                     }}
                  />   
               </div>

               {/* Schedule end*/}
               <Label className="font-medium text-[16px] col-span-2"> Meeting end at: </Label>
               <div className="flex col-span-4 items-center gap-1">
                  <Input type="date" className="col-span-2"
                     ref={dateEndRef}
                     value={dateEnd}
                     onChange={e=>{setDateEnd(e.currentTarget.value)}} 
                     onBlur={e=>{
                        handleSchedule()
                     }}
                  />
                  -
                  <Input type="time" 
                     ref={timeEndRef}
                     value={timeEnd}
                     className="basis-[180px]" 
                     onChange={e=>{setTimeEnd(e.currentTarget.value)}}
                     onBlur={e=>{
                        handleSchedule()
                     }}
                  />
               </div>
               
               {/* Description */}
               <div className="col-span-6">
                  <Label> Description </Label>
                  <Textarea value={description} 
                     spellCheck="false" maxLength={255}
                     onChange={e=>{
                        const inputValue = e.currentTarget.value.replace("\n", "")
                        setDescription(inputValue)
                     }}  
                  />
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
                                 checked={selectedMembers.includes(member.id)}
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
         <div className="flex justify-end items-center col-span-6 gap-2 mt-2">
            <p className="text-red-500 italic mr-auto" ref={errorRef}> 
            </p>
            <Button type="button" variant="outline" onClick={e=>setOpen(false)} ref={cancelRef}> Cancel </Button>
            <Button ref={submitRef} 
               className="flex items-center"
               disabled={
                  !dateEnd || !dateStart || !timeStart || !timeEnd || !name || !id || !password
                  || name.trim() === "" || id.trim() === ""
                  || compareDate(dateStart, dateEnd) === 1 || (compareDate(dateStart, dateEnd) === 0 && compareTime(timeStart, timeEnd) === 1)
               }
            >
               <Loader2 className="w-4 h-4 mr-2 hidden animate-spin" ref={loaderRef} />
               {
                  editData ? "Edit" : "Create"
               } 
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
