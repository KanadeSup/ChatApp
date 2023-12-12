import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose,
    DialogTrigger,
 } from "@/components/ui/dialog";
 import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
 import { Checkbox } from "@/components/ui/checkbox";
 import { Button } from "@/components/ui/button";
 import { Label } from "@/components/ui/label";
 import { Input } from "@/components/ui/input";
 import { Loader2, Search, User, X } from "lucide-react";
 import { useState } from "react";
import { AddMember } from "../../api/channel";
import { useParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
 
 export default function ({ children, members, forceLoad }) {
   const [checkedMember, setCheckedMember] = useState([]);
   const [open, setOpen] = useState(false)
   const {channelId } = useParams()
   const {toast} = useToast()
    return (
      <div className="shrink-0">
         <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="space-y-2">
               <DialogHeader className="space-y-5">
                  <DialogTitle className="text-center shrink-0"> Add Members </DialogTitle>
                  <div className="relative">
                     <Search className="absolute left-3 top-2 w-5 h-6 stroke-gray-500" />
                     <Input className="pl-10" />
                  </div>
               </DialogHeader>
               <h2 className="text-gray-700 font-bold"> Members </h2>
               <div className="flex flex-col justify-start h-[300px] overflow-y-auto">
                  {members
                     ? members.map((member) => {
                           return (
                              <div key={member.id}>
                                 <div
                                    className="flex items-center gap-3 hover:bg-gray-200 px-3 py-2 rounded cursor-pointer"
                                    onClick={(e) => {
                                       if (checkedMember.includes(member.id)) {
                                          checkedMember.splice(
                                             checkedMember.indexOf(member.id),
                                             1,
                                          );
                                       } else {
                                          checkedMember.push(member.id);
                                       }
                                       setCheckedMember([...checkedMember]);
                                    }}
                                 >
                                    <Checkbox
                                       checked={checkedMember.includes(member.id)}
                                    />
                                    <Avatar>
                                       <AvatarImage src={member.picture} />
                                       <AvatarFallback>
                                          <User />
                                       </AvatarFallback>
                                    </Avatar>
                                    <div> {member.username}</div>
                                 </div>
                              </div>
                           );
                        })
                     : ""}
               </div>
               <DialogFooter className="flex gap-3">
                  <DialogClose> Cancel </DialogClose>
                  <form className="shrink-0"
                     onSubmit={async e=>{
                        e.preventDefault()
                        document.querySelector(".add-submit-but").disabled = true
                        document.querySelector(".add-loader").classList.remove("hidden")
                        const idList = []
                        checkedMember.map(id=>idList.push(id))
                        if(idList.length === 0) {
                           setOpen(false)
                           document.querySelector(".add-submit-but").disabled = false
                           document.querySelector(".add-loader").classList.add("hidden")
                           return
                        }
                        
                        const data = await AddMember(channelId, idList)
                        forceLoad()
                        setCheckedMember([])
                        setOpen(false)
                        document.querySelector(".add-submit-but").disabled = false
                        document.querySelector(".add-loader").classList.add("hidden")

                        // notify
                        if(data.status === 403) {
                           toast({
                              title:
                                 <p>
                                    <X className="stroke-red-600 mr-2" />
                                    <span className="text-red-600"> You don't have permission to add member </span>
                                 </p>
                           })
                           return
                        }
                        if(!data.ok) {
                           toast({
                              title:
                                 <p>
                                    <X className="stroke-red-600 mr-2" />
                                    <span className="text-red-600"> Something went wrong. please try again </span>
                                 </p>
                           })
                           return
                        }

                     }}
                  >
                     <Button
                        type="submit"
                        className="add-submit-but w-[80px]"
                     >
                        <Loader2 className="add-loader w-4 h-4 animate-spin mr-2 hidden" />
                        Add
                     </Button>
                  </form>
                  
               </DialogFooter>
            </DialogContent>
         </Dialog>
         <Toaster />
         </div>
    );
 }
 