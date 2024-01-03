import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MailPlus, X, Search, User2, Contact, Loader2 } from "lucide-react";
import { getMemberList } from "/api/workspace";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableCell, TableHead, TableRow } from "@/components/ui/table";
import {
   AlertDialog,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { deleteMember } from "../../api/workspace";
import ProfileDialog from "../../components/ProfileDiaglog";
import { useNavigate, useParams } from "react-router-dom";
import InviteUserDialog  from "/components/InviteUserDialog"

export default function () {
   const [memberList, setMemberList] = useState([]);
   const { workspaceId } = useParams();
   const [open, setOpen] = useState({});
   const { toast } = useToast();
   const [search, setSearch] = useState("");
   const [openInvite, setOpenInvite] = useState(false)

   const navigate = useNavigate();
   const [force, setForce] = useState({});
   function forceLoad() {
      setForce({});
   }
   useEffect(() => {
      async function fetchData() {
         let data = await getMemberList(workspaceId, 3);
         setMemberList(data);
      }
      fetchData();
   }, [force]);
   return (
      <div className="">
         <div className="space-y-5 w-[800px]">
            <div>
               <h1 className="text-lg font-medium"> Invites </h1>
               <p className="text-muted-foreground text-sm"> Manage all invitation</p>
            </div>
            <Separator />
            <div className="flex justify-end gap-5">
               <Input className="w-60" placeholder="Search ..." />
               <Button 
                  onClick={e=>{
                     setOpenInvite(true)
                  }}
               > 
                  Invite 
               </Button>
            </div>
            <Table>
               <TableRow>
                  <TableHead>
                     <div className="flex items-center gap-2 mr-auto text-md text-black font-medium">
                        <MailPlus className="w-5 h-5 stroke-gray-700" /> ({memberList.length})
                     </div>
                  </TableHead>
                  <TableHead></TableHead>
               </TableRow>
               {memberList
                  ? memberList.map((member) => (
                       <TableRow key={member.id}>
                          <TableCell>
                             <div className="flex items-center gap-2">
                                <Avatar className="w-12 h-12">
                                   <AvatarImage src={member.picture} className="w-12 h-12" />
                                   <AvatarFallback className="w-12 h-12">
                                      <User2 />
                                   </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                   <span className="text-lg font-medium"> {member.username} </span>
                                   <span className="italic text-gray-500"> {member.email} </span>
                                </div>
                             </div>
                          </TableCell>
                          <TableCell>
                             <div className="flex justify-end gap-5">
                                 <ProfileDialog member={member}>
                                    <Contact className="stroke-blue-600 cursor-pointer" />
                                 </ProfileDialog>
                                 <X
                                    className="stroke-red-500 stroke-[3] cursor-pointer"
                                    onClick={(e) => {
                                       open[member.id] = true;
                                       setOpen({ ...open });
                                    }}
                                 />
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
                                         This action will remove the invitation of this member and this member cannot join your
                                         workspace
                                      </AlertDialogDescription>
                                   </AlertDialogHeader>
                                   <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <form
                                         onSubmit={async (e) => {
                                            e.preventDefault();
                                            document.querySelector(`.submit-${member.id}`).disabled = true;
                                            document.querySelector(`.loader-${member.id}`).classList.remove("hidden");
                                            const data = await deleteMember(workspaceId, member.id);
                                            document.querySelector(`.submit-${member.id}`).disabled = false;
                                            document.querySelector(`.loader-${member.id}`).classList.add("hidden");
                                            forceLoad();
                                            open[member.id] = false;
                                            setOpen({ ...open });
                                            if (data.ok) {
                                               if (userId === member.id) {
                                                  navigate("/Workspace");
                                                  return;
                                               }
                                               toast({
                                                  title: (
                                                     <p className="flex">
                                                        <Check className="stroke-green-600 mr-2" />
                                                        <span className="text-green-600">Remove Successfully!</span>
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
                                                        <span className="text-red-600">
                                                           You don't have permission to remove inviation
                                                        </span>
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
                                                     <span className="text-red-600">
                                                        Something went wrong. Please try agains
                                                     </span>
                                                  </p>
                                               ),
                                            });
                                         }}
                                      >
                                         <Button type="submit" className={`submit-${member.id}`}>
                                            <Loader2
                                               className={`loader-${member.id} w-4 h-4 mr-2 animate-spin hidden`}
                                            />
                                            Remove
                                         </Button>
                                      </form>
                                   </AlertDialogFooter>
                                </AlertDialogContent>
                             </AlertDialog>
                          </TableCell>
                       </TableRow>
                    ))
                  : null}
            </Table>
         </div>
         <InviteUserDialog open={openInvite} onOpenChange={setOpenInvite} load={forceLoad}></InviteUserDialog>
      </div>
   );
}
