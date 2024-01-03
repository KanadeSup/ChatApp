import { NavLink, Navigate, useActionData, useNavigate, useNavigation, useParams } from 'react-router-dom'
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
import leaveChannel from '../../api/channel/leaveChannel'

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
   const actionData = useActionData()
   const {toast} = useToast()
   const navigate = useNavigate()
   useEffect(() => {
      console.log(actionData)
      if(!actionData) return
      if(actionData.status === 403) {
         toast({
            title: 
               <p className="flex items-center">
                  <X className="stroke-red-600 mr-2" />
                  <span className="text-red-600"> You don't have permission to delete channel </span>
               </p>
         })
         return
      }
      
      toast({
         title: 
            <p className="flex items-center">
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
                  Leave channel
               </span>
            </AlertDialogTrigger>
            <AlertDialogContent>
               <AlertDialogHeader>
                  <AlertDialogTitle> Are you sure to leave channel </AlertDialogTitle>
                  <AlertDialogDescription>
                     This action cannot be undone. After this action you cannot access to this channel
                  </AlertDialogDescription>
               </AlertDialogHeader>
               <AlertDialogFooter>
                  <Form
                     onSubmit={async e=> {
                        e.preventDefault()
                        document.querySelector(".leave-but").disabled = true
                        document.querySelector(".leave-cancel-but").disabled = true
                        document.querySelector(".leave-loader").classList.toggle("hidden")
                        const res = await leaveChannel(channelId)
                        if(res.ok) {
                           navigate(`/Workspace/${workspaceId}`)
                           return
                        }
                        document.querySelector(".leave-but").disabled = false
                        document.querySelector(".leave-cancel-but").disabled = false
                        document.querySelector(".leave-loader").classList.toggle("hidden")
                        if(res.status === 400) {
                           toast({
                              title: 
                                 <p className="flex items-center">
                                    <X className="stroke-red-600 mr-2" />
                                    <span className="text-red-600"> {res.data.title}  </span>
                                 </p>
                           })
                           return
                        }
                        toast({
                           title: 
                              <p className="flex items-center">
                                 <X className="stroke-red-600 mr-2" />
                                 <span className="text-red-600"> Something when wrong please try again </span>
                              </p>
                        })
                     }}
                  >
                     <input type="hidden" value={workspaceId} name="workspaceid"/>
                     <AlertDialogCancel className="leave-cancel-but mr-2">
                        Cancel
                     </AlertDialogCancel>
                     <Button type="submit" className="leave-but">
                        <Loader2 className='leave-loader mr-2 animate-spin w-4 h-4 hidden'/>
                        Leave 
                     </Button>
                  </Form>
               </AlertDialogFooter>
            </AlertDialogContent>
         </AlertDialog>
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
         <Toaster />
      </nav>
   )
}
