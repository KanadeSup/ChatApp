import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Children } from "react";
import { Label } from "@/components/ui/label";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User2 } from "lucide-react";
import { convertDate } from "../utils/convertTime";

export default function ProfileDialog({ children, member }) {
   return (
      <Dialog>
         <DialogTrigger asChild>{children}</DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <div className="flex items-center gap-5">
                  <Avatar className="rounded-lg h-20 w-20">
                     <AvatarImage src={member.picture} />
                     <AvatarFallback>
                        <User2 className="w-10 h-10" />
                     </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                     <h1 className="text-xl font-bold"> { (member.firstName || "") + " " + (member.lastName || "")}</h1>
                     <p className="italic text-gray-500"> {member.email} </p>
                  </div>
               </div>
            </DialogHeader>
            <div className="grid grid-cols-[80px_50px_auto] grid-flow-row items-center gap-y-3"> 
               <Label> Full name </Label>
               <span> : </span>
               <p>
                  {member.lastName} {member.firstName}{" "}
               </p>

               <Label> Gender </Label>
               <span> : </span>
               <p> {member.gender ? "Male" : "Female"} </p>

               <Label> Phone </Label>
               <span> : </span>
               <p> {member.phone} </p>

               <Label> Birthday </Label>
               <span> : </span>
               <p> {convertDate(member.birthDay)} </p>
            </div>
         </DialogContent>
      </Dialog>
   );
}
