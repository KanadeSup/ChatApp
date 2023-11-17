import { NavLink, useNavigation, useParams } from 'react-router-dom'
import { Loader2 } from "lucide-react"
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
   const navigation = useNavigation()
   const { workspaceId, channelId } = useParams()
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
                  Delete Channel
               </span>
            </AlertDialogTrigger>
            <AlertDialogContent>
               <AlertDialogHeader>
                  <AlertDialogTitle> Are you absolutely sure? </AlertDialogTitle>
                  <AlertDialogDescription>
                     This action cannot be undone. This will permanently delete your
                     channel and cannot be reverted
                  </AlertDialogDescription>
               </AlertDialogHeader>
               <AlertDialogFooter>
                  <Form method="POST" action={`/Workspace/${workspaceId}/${channelId}/ChannelSetting`}>
                     <input type="hidden" value={workspaceId} name="cid"/>
                     <CancelButton state={navigation.state}/>
                     <AcceptButton state={navigation.state}/>
                  </Form>
               </AlertDialogFooter>
            </AlertDialogContent>
         </AlertDialog>
      </nav>
   )
}
