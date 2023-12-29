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
import { Form } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns"
import { CalendarDays } from "lucide-react";
import { Textarea } from "@/components/ui/textarea"

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
   const [date, setDate] = useState()
   return (
      <Form className="grid grid-cols-6 items-center gap-2">
         {/* Meeting id */}
         <Label className="font-medium text-[16px] col-span-2"> Meeting id: </Label>
         <Input className="col-span-4" />

         {/* Meeting name */}
         <Label className="font-medium text-[16px] col-span-2"> Meeting name: </Label>
         <Input className="col-span-4" />

         {/* Password */}
         <Label className="font-medium text-[16px] col-span-2"> Meeting password: </Label>
         <Input type="password" className="col-span-4" />

         {/* Date */}
         <Label className="font-medium text-[16px] col-span-2"> Date: </Label>
         <div className="flex col-span-4 items-center gap-1">
            <Input type="" className="col-span-2" />
            -
            <Input type="" className="col-span-2" />
         </div>

         {/* Time */}
         <Label className="font-medium text-[16px] col-span-2"> Time: </Label>
         <div className="flex col-span-4 items-center gap-1">
            <Input type="" className="col-span-2" />
            -
            <Input type="" className="col-span-2" />
         </div>
         <div className="col-span-6">
            <span> Members </span>
            <InviteInput />
         </div>
         <div className="flex justify-end col-span-6 gap-2 mt-2">
            <Button variant="outline" onClick={e=>setOpen(false)}> Cancel </Button>
            <Button> Create </Button>
         </div>
      </Form>
   );
}

function InviteInput() {
   const inputRef = useRef()
   const containerRef = useRef()
   const [value, setValue] = useState("")
   const [emails, setEmails] = useState([])
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
               <span key={email} className="border border-gray-500 rounded px-[3px]" > {email} </span>
            ))
         }
         <input 
            ref={inputRef} 
            className="outline-none text-sm flex-grow h-[26px]"
            size={10}
            maxLength={50}
            value={value}
            onScroll={e=>{
               const scrollEle = e.currentTarget
               if(scrollEle.scrollWidth === scrollEle.clientWidth) {
                  scrollEle.style.width = "auto"
                  return
               }
               scrollEle.style.width = "200px"
            }}
            onChange={e=>{
               const inputValue = e.currentTarget.value
               if(inputValue === " ") return
               if(inputValue[inputValue.length -1] === " ") {
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
export { CreateMeetingDialog };
