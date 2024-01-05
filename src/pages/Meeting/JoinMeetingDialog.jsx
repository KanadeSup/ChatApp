import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { Check, Loader2, X } from "lucide-react";
import joinMeeting from "../../api/meeting/joinMeeting";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast"

export default function ({ children, loadData }) {
   const [meetingId, setMeetingId] = useState("")
   const [password, setPassword] = useState("")
   const [open, setOpen] = useState(false)
   const {toast} = useToast()
   return (
      <Dialog open={open} onOpenChange={setOpen} >
         <DialogTrigger>{children}</DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle> Join a meeting </DialogTitle>
            </DialogHeader>
            <form
               onSubmit={async (e) => {
                  e.preventDefault();
                  console.log("calls");
                  document.querySelector(".loader-join").classList.toggle("hidden");
                  document.querySelector(".join-but").disabled = true;
                  document.querySelector(".close-but").disabled = true;
                  const res = await joinMeeting(meetingId, password)
                  if(res.ok) {
                     loadData()
                     toast({
                        title: (
                           <p className="flex items-center gap-2">
                              <Check className="stroke-green-600"/>
                              Join meeting successfully
                           </p>
                        )
                     })
                     setOpen(false)
                     return
                  }
                  if(res.status === 400) {
                     toast({
                        title: (
                           <p className="flex items-center gap-2">
                              <X className="stroke-red-600"/>
                              {res.data.title}
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
                  loadData()
                  setOpen(false)
               }}
            >
               <div className="space-y-2">
                  <div>
                     <Label> Meeting id </Label>
                     <Input type="text" spellCheck="off" value={meetingId} onChange={e=>setMeetingId(e.currentTarget.value)}/>
                  </div>
                  <div>
                     <Label> Password </Label>
                     <Input type="password"  value={password} onChange={e=>setPassword(e.currentTarget.value)}/>
                  </div>
               </div>
               <DialogFooter className="mt-5">
                  <DialogClose asChild>
                     <Button type="button" variant="outline" className="close-but">
                        Close
                     </Button>
                  </DialogClose>
                  <Button type="submit" className="join-but flex items-center"
                     disabled={meetingId === "" || password===""}
                  >
                     <Loader2 className="loader-join w-4 h-4 animate-spin mr-2 hidden" />
                     Join
                  </Button>
               </DialogFooter>
            </form>
         </DialogContent>
      </Dialog>
   );
}
