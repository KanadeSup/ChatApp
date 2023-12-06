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
import { Search, User } from "lucide-react";
import { useState } from "react";

export default function ({ children, members, addMembers }) {
   const [checkedMember, setCheckedMember] = useState([]);
   return (
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
               <DialogClose asChild>
                  <Button
                     className="w-[80px]"
                     onClick={(e) => {
                        const memberList = [];
                        members.map((member) => {
                           if (checkedMember.includes(member.id)) {
                              memberList.push(member);
                           }
                        });
                        setCheckedMember([]);
                        addMembers(memberList);
                     }}
                  >
                     Add
                  </Button>
               </DialogClose>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
}
