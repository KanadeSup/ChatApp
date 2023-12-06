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
import { Form, useNavigate, useNavigation } from "react-router-dom"
import { useEffect, useState } from "react"

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
         useEffect(()=> {
            if(navigation.state === "idle") {
               setOpen(false)
            }
         },[navigation])
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
