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
import { deleteMember, GetMemberList as getChannelMemberList, getUnchannelMembers } from "../../api/channel"
import { useParams } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, Contact, Loader2, User, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
 } from "@/components/ui/alert-dialog"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function() {
   const { workspaceId, channelId } = useParams()
   const [channelMembers, setChannelMembers] = useState([])
   const [workspaceMembers, setWorkspaceMembers] = useState([])
   const {toast} = useToast()
   const [open, setOpen] = useState({})
   const [deleteId, setDeleteId] = useState("")
   const [load, setLoad] = useState({})
   function forceLoad() {
      setLoad({});
   }
   useEffect(()=> {
      async function fetchData() {
         const workspaceMemberList = await getUnchannelMembers(workspaceId, channelId)
         const channelMemberList = await getChannelMemberList(channelId)
         console.log(channelMemberList)
         setWorkspaceMembers(workspaceMemberList.data)
         setChannelMembers(channelMemberList)
         Object.keys(open).forEach(key=>open[key] = undefined)
      }
      fetchData()
   },[load])
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
               <WorkspaceMemberDialog members={workspaceMembers} forceLoad={forceLoad}>
                  <Button className="shrink-0"> Add Members </Button>
               </WorkspaceMemberDialog>
            </div>
            <Table>
               <TableHeader>
                  <TableRow>
                     <TableHead> User </TableHead>
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
                           <TableCell>
                              {
                                 member.role ?
                                    <Badge style={{backgroundColor: `${member.role.color}`}}> {member.role.name} </Badge>
                                    : ""
                              }
                           </TableCell>
                           <TableCell className="flex gap-6 justify-end">
                              <Contact className="cursor-pointer stroke-blue-600 stroke-[2]" />
                              <AlertDialog open={open[member.id]} onOpenChange={e=>{
                                 open[member.id] = undefined
                                 setOpen({...open})
                              }}>
                                 <X className="stroke-red-500 stroke-[3] cursor-pointer"
                                    onClick= {e=>{
                                       open[member.id] = true
                                       setOpen({...open})
                                    }}
                                 />
                                 <AlertDialogContent>
                                    <AlertDialogHeader>
                                       <AlertDialogTitle> Are you sure? </AlertDialogTitle>
                                       <AlertDialogDescription>
                                          This action will kick member from this channel. And you need the permission to do this. If not, the action will be failed
                                       </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                       <AlertDialogCancel> Cancel </AlertDialogCancel>
                                       <form    
                                          onSubmit={async e=>{
                                             e.preventDefault()
                                             document.querySelector(`.submit-${member.id}`).disabled = true
                                             document.querySelector(`.loader-${member.id}`).classList.remove("hidden")
                                             const data = await deleteMember(channelId, member.id)
                                             forceLoad()
                                             if(data.ok) {
                                                toast({
                                                   title: 
                                                      <p className="flex">
                                                         <Check className="stroke-green-600 mr-2" />
                                                         <span className="text-green-600"> Delete Successfully! </span>
                                                      </p>
                                                })
                                                setDeleteId(member.id)
                                                return
                                             }
                                             if(data.status === 403) {
                                                toast({
                                                   title: 
                                                      <p className="flex">
                                                         <X className="stroke-red-600 mr-2" />
                                                         <span className="text-red-600"> You don't have permission to kick member </span>
                                                      </p>
                                                })
                                                return
                                             }
                                             toast({
                                                title: 
                                                   <p className="flex">
                                                      <X className="stroke-red-600 mr-2" />
                                                      <span className="text-red-600"> Something went wrong. Please try agains </span>
                                                   </p>
                                             })

                                          }}
                                       >
                                          <Button type="submit" className={`submit-${member.id}`}>
                                             <Loader2 className={`w-4 h-4 animate-spin mr-2 hidden loader-${member.id}`} />
                                             Kick
                                          </Button>
                                       </form>
                                    </AlertDialogFooter>
                                 </AlertDialogContent>
                              </AlertDialog>
                           </TableCell>
                        </TableRow>
                     )) : ""
                  }
               </TableBody>
            </Table>
            <Toaster />
         </div>
      </div>
   )
}
