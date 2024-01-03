import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MailPlus, X, Search, User2 } from "lucide-react"
import { getMemberList } from "/api/workspace";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function() {
   const [memberList, setMemberList] = useState([]);
   const {workspaceId} = useParams()
   useEffect(() => {
      async function fetchData() {
         let data = await getMemberList(workspaceId,3);
         setMemberList(data);
         console.log(data)
      }
      fetchData();
   }, []);
   return (
      <div className="">
         <div className="space-y-5 w-[800px]">
            <div>
               <h1 className="text-lg font-medium"> Invites </h1>
               <p className="text-muted-foreground text-sm"> Manage all invitation</p>
            </div>
            <Separator />
            <div className="flex justify-end gap-5">
               <div className="flex items-center gap-2 mr-auto text-md text-black font-medium">
                  <MailPlus className="w-5 h-5 stroke-gray-700"/> ({memberList.length})
               </div>
               <Input className="w-60" placeholder="Search ..."/>
               {/* <Button> Invite </Button> */}
            </div>
            <div className="flex flex-col gap-3 max-h-[calc(100vh-300px)] overflow-auto">
               {
                  memberList
                  .map(member=> (
                     <div key={member.id}>
                        <div className="flex gap-2">
                           <Avatar className="w-14 h-14">
                              <AvatarImage src={member.picture} className="w-14 h-14"/>
                              <AvatarFallback>
                                 <User2 />
                              </AvatarFallback>
                           </Avatar>
                           <div className="flex flex-col justify-center">
                              <span className="font-bold"> {member.username} </span>
                              <span className="text-gray-500 italic"> {member.email} </span>
                           </div>
                        </div>
                     </div>
                  ))
               }
            </div>
         </div>
      </div>
   )
}
