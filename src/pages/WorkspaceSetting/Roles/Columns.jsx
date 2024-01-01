import { Loader2, Pencil, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
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
import { Button } from "@/components/ui/button"
import { Form, useActionData, useNavigate, useNavigation } from "react-router-dom"
import { useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast";

export default [
   {
      accessorKey: "name",
      header: "Roles",
      cell: props => {
         const row = props.row.original
         return (
            <Badge
               style={{backgroundColor: `${row.color}`}}
            >
               {row.name}
            </Badge>
         )
      }
   },
   {
      accessorKey: "numberOfMembers",
      header: "Members",
   },
   {
      id: "more",
      header: "",
      cell: ({ row }) => {
         const roleId = row.original.id
         const navigation = useNavigation()
         const [open, setOpen] = useState(false)
         const res = useActionData()
         const { toast } = useToast()
         useEffect(()=> {
            if(navigation.state === "idle") {
               setOpen(false)
            }
         },[navigation])
         useEffect(()=> {
            if(!res) return
            if(res.ok) {
               toast({
                  title: (
                     <p className="text-green-500">delete Successfully</p>
                  ),
                  duration: 1500,
               });
               return
            }
            if(res.status === 403) {
               toast({
                  title: (
                     <p className="text-red-600">You don't have permission to do this</p>
                  ),
                  duration: 1500,
               });
               return
            }
            toast({
               title: (
                  <p className="text-red-600">Something went wrong, please try again</p>
               ),
               duration: 1500,
            });
         },[res])
         return (
            <div className="flex justify-end gap-8 items-center">
               <Pencil className="w-5 h-5 stroke-gray-500 group-hover:visible invisible transition-all duration-30"/>

               <AlertDialog open={open} onOpenChange={setOpen}>
                  <AlertDialogTrigger className="delete-but-trigger">
                     <X  className="stroke-red-500 w-6 h-6 cursor-pointer stroke-[4]"/>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                     <AlertDialogHeader>
                        <AlertDialogTitle>
                           Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                           This action cannot be undone. 
                           This will permanently delete role and cannot be reverted.
                        </AlertDialogDescription>
                     </AlertDialogHeader>
                     <AlertDialogFooter>
                        <AlertDialogCancel>
                           Cancel
                        </AlertDialogCancel>
                        <Form method="POST">
                           <Button type="submit" className="delete-but" name="roleid" value={roleId}
                              disabled={navigation.state !== "idle"}
                           >
                              <Loader2 
                                 className={`loader w-4 h-4 animate-spin mr-2 ${navigation.state === "idle"? "hidden":""}`}
                              />
                              Delete
                           </Button>
                        </Form>
                     </AlertDialogFooter>
                  </AlertDialogContent>
               </AlertDialog>
            </div>
         )
      }
   }
]
