import { NavLink } from 'react-router-dom'
import { AccountSvg } from '/assets/img/SettingSvg'
import { buttonVariants } from "@/components/ui/button"
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

export default function({ items,workspaceId }) {
   return(
      <nav className="flex-shrink-0 w-full flex lg:flex-col lg:w-[13%] items-stretch gap-1">
         {
            items.map((item) => (
               <NavLink 
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
            <AlertDialogTrigger asChild>
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
                  <AlertDialogTitle>
                     Are you absolutely sure?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                     This action cannot be undone. This will permanently delete your
                     workspace and cannot be reverted
                  </AlertDialogDescription>
               </AlertDialogHeader>
               <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <Form method="POST">
                     <input type="hidden" value={workspaceId} name="workspaceid"/>
                     <AlertDialogAction type="submit" name="type" value="delete">Continue</AlertDialogAction>
                  </Form>
               </AlertDialogFooter>
            </AlertDialogContent>
         </AlertDialog>
      </nav>
   )
}
