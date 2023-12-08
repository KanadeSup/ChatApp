import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog"
import { Loader2, Tags, X } from "lucide-react"
import { useEffect, useState } from "react"
import { AddUserByEmails } from "/api/workspace"
import { useParams } from "react-router-dom"


export default function InviteUserDialog({ children,open, onOpenChange }) {
   const {workspaceId} = useParams()
   const [tags, setTags] = useState([])
   const [emailInput, setEmailInput] = useState("")
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
                  await AddUserByEmails(workspaceId, tags)
                  document.querySelector(".invite-submit-but").disabled = false
                  document.querySelector(".invite-loader").classList.add("hidden")
                  onOpenChange(false)
               }}
            >
               <div>
                  <h1 className="font-bold">To: </h1>
                  <div className="space-y-3 mt-3">
                     <div className="flex flex-wrap gap-2 max-h-[150px] overflow-y-scroll">
                        {
                           tags.map((tag)=> {
                              return (
                                 <span key={tag} className="flex items-center justify-center bg-gray-100 px-2 rounded-md cursor-pointer"
                                    onClick={e=>{
                                       tags.splice(tags.indexOf(tag),1)
                                       setTags([...tags])
                                    }}
                                 > 
                                    {tag}
                                    <X className="w-3 h-3 ml-2"/> 
                                 </span>
                              )
                           })
                        }
                     </div>
                     <Input 
                        placeholder="name1@gmail.com name2@gmail.com ..."
                        value={emailInput}
                        maxLength="50"
                        onChange={(e)=>{
                           const value = e.target.value
                           if(value[value.length-1] === "\n" || value[value.length-1] === " "){
                              setEmailInput("")
                              if(tags.includes(emailInput)) return
                              if(emailInput.length === 0) return
                              setTags([...tags, emailInput])
                           } else {
                              setEmailInput(value)
                           }
                        }}
                     />
                  </div>
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
