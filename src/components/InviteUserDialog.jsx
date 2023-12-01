import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog"
import { Loader2, X } from "lucide-react"
import { useEffect, useState } from "react"
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { AddUserByEmails } from "/api/workspace"
import { useParams } from "react-router-dom"

export default function InviteUserDialog({ children,open, onOpenChange }) {
   const [inviteText, setInviteText] = useState()
   const {workspaceId} = useParams()
   return (
         <Dialog
            open={open}
            onOpenChange={onOpenChange}
         >
            <DialogTrigger asChild>
               {children}
            </DialogTrigger>
            <DialogContent 
               className="min-w-[700px]"
            >
               <DialogHeader>
                  <DialogTitle className="text-2xl font-bold"> Invite People to your workspace </DialogTitle>
            </DialogHeader>
            <form
               onSubmit={async (e) => {
                  e.preventDefault()
                  document.querySelector(".invite-submit-but").disabled = true
                  document.querySelector(".invite-loader").classList.remove("hidden")
                  const emails = inviteText.split(" ")
                  await AddUserByEmails(workspaceId, emails)
                  document.querySelector(".invite-submit-but").disabled = false
                  document.querySelector(".invite-loader").classList.add("hidden")
                  onOpenChange(false)
               }}
            >
               <div>
                  <h1 className="font-bold">To: </h1>
                  <Textarea placeholder="Name@gmail.com"
                     onChange={e=>setInviteText(e.target.value)}
                     value={inviteText}
                     spellCheck="false"
                  />
               </div>
               <DialogFooter className="mt-5">
                  <Button type="submit" className="invite-submit-but">
                     <Loader2 className="invite-loader w-4 h-4 animate-spin mr-2 hidden"/>
                     Invite
                  </Button>
               </DialogFooter>
            </form>
         </DialogContent>
      </Dialog>
   )
}
