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
import { Form, useNavigation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

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
export default function({ children, cid }) {
   const navigation = useNavigation()
   return (
      <AlertDialog>
         <AlertDialogTrigger asChild>
            {children}
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
               <Form method="DELETE">
                  <input type="hidden" name="cid" value={cid} />
                  <CancelButton state={navigation.state} />
                  <AcceptButton state={navigation.state} />
               </Form>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   )
}
