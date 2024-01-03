import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowDownWideNarrow, Check, Contact, Loader2, MoreVertical, RefreshCcw, User, User2, X } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton"
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
 } from "@/components/ui/popover"
import {
   AlertDialog,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteMember } from "../../api/workspace";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { getMemberList } from "/api/workspace";
import ProfileDialog from "../../components/ProfileDiaglog";
import { useNavigate, useParams } from "react-router-dom";
import transferOwner from "../../api/workspace/transferOwner";

const TRANSFEROWNER = 0
const DELETEMEMBER = 1
export default function () {
   const [memberList, setMemberList] = useState([]);
   const [open, setOpen] = useState({});
   const { workspaceId } = useParams();
   const { toast } = useToast();
   const [force, setForce] = useState({});
   const [search, setSearch] = useState("");
   const userId = localStorage.getItem("userId")
   const navigate = useNavigate()
   const [ownerId, setOwnerId] = useState()
   const [dialogType, setDialogType] = useState()
   function forceLoad() {
      setForce({});
   }
   useEffect(() => {
      async function fetchData() {
         let data = await getMemberList(workspaceId);
         data.map(member=>{
            if(member.isOwner) setOwnerId(member.id)
         })
         setMemberList(data);
      }
      fetchData();
   }, [force]);
   return (
      <div className="">
         <div className="space-y-5 w-[800px]">
            <div>
               <h1 className="text-lg font-medium"> Members </h1>
               <p className="text-muted-foreground text-sm">Manage your workspace members</p>
            </div>
            <Separator />
            <div>
               <div className="flex justify-end gap-3">
                  <Input
                     className="w-60"
                     placeholder="Search ..."
                     onChange={(e) => {
                        setSearch(e.target.value.trim());
                     }}
                  />
                  <Button variant="ghost" size="icon">
                     <ArrowDownWideNarrow className="w-6 h-6 stroke-gray-500" />
                  </Button>
               </div>
               <Table>
                  <TableHeader>
                     <TableRow>
                        <TableHead>
                           <div className="flex items-center gap-2 mr-auto text-md text-black font-medium">
                              <User className="w-5 h-5 stroke-gray-700 " strokeWidth={2.5} />({memberList.length})
                           </div>
                        </TableHead>
                        <TableHead> Workspace Role </TableHead>
                        <TableHead> </TableHead>
                     </TableRow>
                  </TableHeader>
                  <TableBody>
                     {
                     memberList.length !== 0 ?
                     memberList
                        .filter((member) => (search === "" ? true : member.username.toLowerCase().includes(search.toLowerCase())))
                        .map((member) => {
                           return (
                              <TableRow key={member.id}>
                                 <TableCell>
                                    <div className="flex items-center gap-3">
                                       <Avatar>
                                          <AvatarImage src={member.picture} />
                                          <AvatarFallback>
                                             <User2 />
                                          </AvatarFallback>
                                       </Avatar>
                                       <div className="flex flex-col justify-center">
                                          <div className="flex items-center gap-2">
                                             <h1> {member.username} </h1>
                                             {member.isOwner ? (
                                                <div className="px-1 bg-red-500 text-white font-bold text-xs rounded-full"> 
                                                   owner
                                                </div>
                                             ): null}
                                          </div>
                                          <p className="text-sm text-gray-500 italic"> {member.email} </p>
                                       </div>
                                    </div>
                                 </TableCell>
                                 <TableCell>
                                    {member.role ? (
                                       <Badge
                                          style={{
                                             backgroundColor: `${member.role.color}`,
                                          }}
                                       >
                                          {member.role.name}
                                       </Badge>
                                    ) : (
                                       ""
                                    )}
                                 </TableCell>
                                 <TableCell>
                                    <div className="flex justify-end gap-6 items-center h-full">
                                       <ProfileDialog member={member}>
                                          <Contact className="stroke-blue-600 cursor-pointer" />
                                       </ProfileDialog>
                                       <Popover>
                                          <PopoverTrigger asChild>
                                             <MoreVertical 
                                                className={`cursor-pointer 
                                                   ${member.id !== ownerId && userId === member.id? " invisible" :""}
                                                   ${member.id === ownerId ? " invisible" :""}
                                                `}
                                             />
                                          </PopoverTrigger> 
                                          <PopoverContent className="w-52 p-0">
                                             <div className={`cursor-pointer hover:bg-gray-100 p-2 flex items-center text-blue-600 font-semibold  ${userId !== ownerId ? "hidden" : ""}`}
                                                onClick={e=>{
                                                   open[member.id] = true;
                                                   setOpen({ ...open });
                                                   setDialogType(TRANSFEROWNER)
                                                }} 
                                             >
                                                <RefreshCcw className="w-5 h-5 mr-2 stroke-[3] stroke-blue-500"/>
                                                Transfer owner
                                             </div>
                                             <div 
                                                className={`cursor-pointer hover:bg-gray-100 p-2 flex items-center text-red-500 font-semibold  ${userId === member.id ? "hidden" : ""}`}
                                                onClick={e=>{
                                                   open[member.id] = true;
                                                   setOpen({ ...open });
                                                   setDialogType(DELETEMEMBER)
                                                }}   
                                             >
                                                <X className={`w-5 h-5 stroke-[3] stroke-red-600 mr-2`} />
                                                Kick this member
                                             </div>
                                          </PopoverContent>   
                                       </Popover>
                                    </div>
                                    <AlertDialog
                                       open={open[member.id]}
                                       onOpenChange={(e) => {
                                          open[member.id] = undefined;
                                          setOpen({ ...open });
                                       }}
                                    >
                                       <AlertDialogContent>
                                          <AlertDialogHeader>
                                             <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                             <AlertDialogDescription>
                                                {
                                                   dialogType === DELETEMEMBER ? (
                                                      <p>
                                                         This action will kick member from this channel. And you need the permission to do this. If not, the action will
                                                         be failed
                                                      </p>
                                                   ) : null
                                                }
                                                {
                                                   dialogType === TRANSFEROWNER ? (
                                                      <p>
                                                         This action will transfer owner to <span className="font-bold text-black"> {member.username} </span> and you will loose your permission.
                                                         This action will apply permanently, carefully your choice
                                                      </p>
                                                   ) : null
                                                }
                                             </AlertDialogDescription>
                                          </AlertDialogHeader>
                                          <AlertDialogFooter>
                                             <AlertDialogCancel>Cancel</AlertDialogCancel>
                                             <form
                                                onSubmit={async (e) => {
                                                   e.preventDefault();
                                                   document.querySelector(`.submit-${member.id}`).disabled = true;
                                                   document.querySelector(`.loader-${member.id}`).classList.remove("hidden");
                                                   let data;
                                                   if(dialogType === DELETEMEMBER) {
                                                      data = await deleteMember(workspaceId, member.id);
                                                   }
                                                   else {
                                                      data = await transferOwner(workspaceId, member.id)
                                                   }
                                                   document.querySelector(`.submit-${member.id}`).disabled = false;
                                                   document.querySelector(`.loader-${member.id}`).classList.add("hidden");
                                                   forceLoad();
                                                   open[member.id] = false;
                                                   setOpen({ ...open });
                                                   if (data.ok) {
                                                      if(userId === member.id){
                                                         navigate("/Workspace")
                                                         return
                                                      }
                                                      toast({
                                                         title: (
                                                            <p className="flex">
                                                               <Check className="stroke-green-600 mr-2" />
                                                               <span className="text-green-600">
                                                                  {
                                                                     dialogType === DELETEMEMBER ? "Delete Successfully!": "Transfer successfully"
                                                                  }
                                                               </span>
                                                            </p>
                                                         ),
                                                      });
                                                      return;
                                                   }
                                                   if (data.status === 403) {
                                                      toast({
                                                         title: (
                                                            <p className="flex">
                                                               <X className="stroke-red-600 mr-2" />
                                                               <span className="text-red-600">You don't have permission to kick member </span>
                                                            </p>
                                                         ),
                                                      });
                                                      return;
                                                   }
                                                   if (data.status === 400) {
                                                      toast({
                                                         title: (
                                                            <p className="flex">
                                                               <X className="stroke-red-600 mr-2" />
                                                               <span className="text-red-600">{data.data.title}</span>
                                                            </p>
                                                         ),
                                                      });
                                                      return;
                                                   }
                                                   toast({
                                                      title: (
                                                         <p className="flex">
                                                            <X className="stroke-red-600 mr-2" />
                                                            <span className="text-red-600">Something went wrong. Please try agains</span>
                                                         </p>
                                                      ),
                                                   });
                                                }}
                                             >
                                                <Button type="submit" className={`submit-${member.id}`}>
                                                   <Loader2 className={`loader-${member.id} w-4 h-4 mr-2 animate-spin hidden`} />
                                                   Ok
                                                </Button>
                                             </form>
                                          </AlertDialogFooter>
                                       </AlertDialogContent>
                                    </AlertDialog>
                                 </TableCell>
                              </TableRow>
                           )
                        }): (
                           [
                              (
                                 <TableRow key={1}>
                                    <TableCell><Skeleton className="w-full h-9"/></TableCell>
                                    <TableCell><Skeleton className="w-full h-9"/></TableCell>
                                    <TableCell><Skeleton className="w-full h-9"/></TableCell>
                                 </TableRow>
                              ),
                              (
                                 <TableRow key={2}>
                                    <TableCell><Skeleton className="w-full h-9"/></TableCell>
                                    <TableCell><Skeleton className="w-full h-9"/></TableCell>
                                    <TableCell><Skeleton className="w-full h-9"/></TableCell>
                                 </TableRow>
                              ),
                              (
                                 <TableRow key={3}>
                                    <TableCell><Skeleton className="w-full h-9"/></TableCell>
                                    <TableCell><Skeleton className="w-full h-9"/></TableCell>
                                    <TableCell><Skeleton className="w-full h-9"/></TableCell>
                                 </TableRow>
                              )
                           ]
                           
                        )
                        }
                  </TableBody>
               </Table>
            </div>
         </div>
         <Toaster />
      </div>
   );
}
