import { Separator } from "@/components/ui/separator";
import { Await, Link, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ArrowDownWideNarrow, Check, Contact, Loader2, LogOut, MoreHorizontal, User, User2, X } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton"

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
} from "@/components/ui/alert-dialog";
import { deleteMember } from "../../api/workspace";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { getMemberList } from "/api/workspace";
import ProfileDialog from "../../components/ProfileDiaglog";

export default function () {
   const [memberList, setMemberList] = useState([]);
   const [open, setOpen] = useState({});
   const { workspaceId } = useParams();
   const { toast } = useToast();
   const [force, setForce] = useState({});
   const [search, setSearch] = useState("");
   const userId = localStorage.getItem("userId")
   const navigate = useNavigate()
   function forceLoad() {
      setForce({});
   }
   useEffect(() => {
      async function fetchData() {
         const data = await getMemberList(workspaceId);
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
                                       <h1> {member.username} </h1>
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
                                       {
                                          userId === member.id ?
                                          <LogOut 
                                             className={`stroke-red-600 stroke-[3] cursor-pointer w-5 h-5`}
                                                onClick={(e) => {
                                                   open[member.id] = true;
                                                   setOpen({ ...open });
                                                }}
                                          />:
                                          <X
                                             className={`stroke-red-600 stroke-[3] cursor-pointer w-6 h-6}`}
                                             onClick={(e) => {
                                                open[member.id] = true;
                                                setOpen({ ...open });
                                             }}
                                          />
                                       }
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
                                                This action will kick member from this channel. And you need the permission to do this. If not, the action will
                                                be failed
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
                                                      if(userId === member.id) {
                                                         navigate("/Workspace")
                                                         return
                                                      }
                                                      toast({
                                                         title: (
                                                            <p className="flex">
                                                               <Check className="stroke-green-600 mr-2" />
                                                               <span className="text-green-600">Delete Successfully!</span>
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
                                                               <span className="text-red-600">You don't have permission to kick member</span>
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
