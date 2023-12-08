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
 import { Loader2, Search, User } from "lucide-react";
 import { useState } from "react";
import { AddMember } from "../../api/channel";
import { useParams } from "react-router-dom";
 
 export default function ({ children, members }) {
    const [checkedMember, setCheckedMember] = useState([]);
   const {channelId } = useParams()
    return (
      <form className="shrink-0"
         onSubmit={async e=>{
            document.querySelector(".add-submit-but").disabled = true
            document.querySelector(".add-loader").classList.remove("hidden")
            const idList = []
            checkedMember.map(member=>idList.push(member.id))
            const data = await AddMember(channelId, idList)
            document.querySelector(".add-submit-but").disabled = false
            document.querySelector(".add-loader").classList.add("hidden")
         }}
      >
         <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="space-y-2">
               <DialogHeader className="space-y-5">
                  <DialogTitle className="text-center"> Add Members </DialogTitle>
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
                  <Button
                     className="add-submit-but w-[80px]"
                     onClick={(e) => {
                        const memberList = [];
                        members.map((member) => {
                           if (checkedMember.includes(member.id)) {
                              memberList.push(member);
                           }
                        });
                        setCheckedMember([]);
                     }}
                  >
                     <Loader2 className="add-loader w-4 h-4 animate-spin mr-2 hidden" />
                     Add
                  </Button>
               </DialogFooter>
            </DialogContent>
         </Dialog>
       </form>
    );
 }
 