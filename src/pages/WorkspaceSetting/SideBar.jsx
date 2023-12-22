import { NavLink, useActionData, useNavigation, useParams } from 'react-router-dom'
import { Loader2, X } from "lucide-react"
import { AccountSvg } from '/assets/img/SettingSvg'
import { buttonVariants, Button } from "@/components/ui/button"
import { Form } from "react-router-dom"
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
import { useEffect } from 'react'
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

function AcceptButton({ state }) {
   if (state !== "idle") return (
      <AlertDialogAction type="submit" disabled> 
         <Loader2 className="animate-spin mr-2 h-4 w-4"/>
         Delete
      </AlertDialogAction>
   )
   else return (
      <Button type="submit" name="type" value="delete">
         Delete
      </Button>
   )
}
function CancelButton({ state }) {
   if (state !== "idle") return <AlertDialogCancel disabled className="mr-2"> Cancel </AlertDialogCancel>
   else return <AlertDialogCancel className="mr-2"> Cancel </AlertDialogCancel>
}
export default function({ items }) {
   const {toast} = useToast()
   const navigation = useNavigation()
   const { workspaceId } = useParams()
   const actionData = useActionData()
   useEffect(() => {
      if(!actionData) return
      if(actionData.status === 403) {
         toast({
            title: 
               <p className="flex">
                  <X className="stroke-red-600 mr-2" />
                  <span className="text-red-600"> You don't have permission to delete workspace </span>
               </p>
         })
         return
      }
      toast({
         title: 
            <p className="flex">
               <X className="stroke-red-600 mr-2" />
               <span className="text-red-600"> Something went wrong please try again </span>
            </p>
      })
   },[actionData])
   return(
      <nav className="flex-shrink-0 w-full flex lg:flex-col lg:w-[13%] items-stretch gap-1">
         {
            items.map((item) => (
               <NavLink 
                  key={item.title}
                  to={item.to}
                  relative="path"
                  end
                  className={
                     ({isActive}) => 
                        [
                           isActive ? "bg-muted hover:bg-muted":"hover:bg-transparent hover:underline",
                           buttonVariants({variant: "ghost"}).replace("justify-center",""),
                           "justify-start"
                        ].join(" ")
                  }
               >
                  {item.title}
               </NavLink>
            ))
         }
         <AlertDialog>
            <AlertDialogTrigger asChild modal="false">
               <span className={
                  [
                     buttonVariants({variant: "ghost"}).replace("justify-center",""),
                     "justify-start hover:bg-transparent hover:underline text-red-500 hover:text-red-500 cursor-pointer font-extrabold text-lg"
                  ].join(" ")
               }>
                  Delete Workspace
               </span>
            </AlertDialogTrigger>
            <AlertDialogContent>
               <AlertDialogHeader>
                  <AlertDialogTitle> Are you absolutely sure? </AlertDialogTitle>
                  <AlertDialogDescription>
                     This action cannot be undone. This will permanently delete your
                     workspace and cannot be reverted
                  </AlertDialogDescription>
               </AlertDialogHeader>
               <AlertDialogFooter>
                  <Form method="POST">
                     <input type="hidden" value={workspaceId} name="workspaceid"/>
                     <CancelButton state={navigation.state}/>
                     <AcceptButton state={navigation.state}/>
                  </Form>
               </AlertDialogFooter>
            </AlertDialogContent>
         </AlertDialog>
         <Toaster />
      </nav>
   )
}
