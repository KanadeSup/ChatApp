import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
   Table,
   TableBody,
   TableCaption,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
 } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import WorkspaceMemberDialog from "./WorkspaceMemberDialog"
import { useEffect, useState } from "react"
import { getMemberList as getWorkspaceMemberList } from "../../api/workspace"
import { GetMemberList as getChannelMemberList } from "../../api/channel"
import { useParams } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreVertical, User, User2 } from "lucide-react"

export default function() {
   const { workspaceId, channelId } = useParams()
   const [channelMembers, setChannelMembers] = useState([])
   const [workspaceMembers, setWorkspaceMembers] = useState([])
   useEffect(()=> {
      async function fetchData() {
         const workspaceMemberList = await getWorkspaceMemberList(workspaceId)
         const channelMemberList = await getChannelMemberList(channelId)
         setWorkspaceMembers(workspaceMemberList)
         setChannelMembers(channelMemberList)
      }
      fetchData()
   },[])
   return (
      <div className="w-[700px] space-y-5">
         <div>
            <h1 className="text-lg font-medium"> Members </h1>
            <p className="text-muted-foreground text-sm"> Add your workspace's member to this channel </p>
         </div>
         <Separator />
         <div className="flex flex-col justify-between gap-10 p-5 border border-gray-300 rounded-lg">
            <div className="flex w-full gap-3">
               <Input 
                  placeholder="Search ...."
                  className="w-full grow-1"
               />
               <WorkspaceMemberDialog members={workspaceMembers}>
                  <Button className="shrink-0"> Add Members </Button>
               </WorkspaceMemberDialog>
            </div>
            <Table>
               <TableHeader>
                  <TableRow>
                     <TableHead> User </TableHead>
                     <TableHead> Workspace Role </TableHead>
                     <TableHead> Channel Role </TableHead>
                     <TableHead> </TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {
                     channelMembers ? 
                     channelMembers.map(member=>(
                        <TableRow key={member.id}>
                           <TableCell className="flex gap-3 items-center"> 
                              <Avatar>
                                 <AvatarImage src={member.picture}/>
                                 <AvatarFallback> <User /> </AvatarFallback>
                              </Avatar>
                              <div> { member.username } </div>
                           </TableCell>
                           <TableCell></TableCell>
                           <TableCell></TableCell>
                           <TableCell> 
                              <MoreVertical className="w-5 h-5" 
                                 onClick={e=> {
                                    
                                 }}
                              />
                           </TableCell>
                        </TableRow>
                     )) : ""
                  }
               </TableBody>
            </Table>
         </div>
      </div>
   )
}
