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
import { Loader2, Tags, X } from "lucide-react"
import { useEffect, useState } from "react"
import { AddUserByEmails } from "/api/workspace"
import { useParams } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"


export default function InviteUserDialog({ children,open, onOpenChange }) {
   const {workspaceId} = useParams()
   const [tags, setTags] = useState([])
   const [existTag, setExistTag] = useState(["", true])
   const [emailInput, setEmailInput] = useState("")
   const [emailErr, setEmailErr] = useState(false)
   const { toast } = useToast()

   return (
         <Dialog
            open={open}
            onOpenChange={ e=> {
               onOpenChange()
               setExistTag(["",true])
               setTags([])
            }}
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
                  const res = await AddUserByEmails(workspaceId, tags)
                  document.querySelector(".invite-submit-but").disabled = false
                  document.querySelector(".invite-loader").classList.add("hidden")
                  onOpenChange(false)
                  setTags([])
                  setEmailInput("")
                  if(res.ok) return
                  if(res.status === 403) {
                     toast({
                        title: 
                           <p className="flex items-center">
                              <X className="stroke-red-600 mr-2" />
                              <span className="text-red-600"> You don't have permission to Invite other people </span>
                           </p>
                     })
                     return
                  }
                  toast({
                     title: 
                        <p className="flex items-center">
                           <X className="stroke-red-600 mr-2" />
                           <span className="text-red-600"> Something went wrong, please try again ! </span>
                        </p>
                  })
               }}
            >
               <div>
                  <h1 className="font-bold">To: </h1>
                  <div className="space-y-3 mt-3">
                     <div className="flex flex-wrap gap-2 max-h-[150px] overflow-y-scroll">
                        {
                           tags.map((tag)=> {
                              return (
                                 <span key={tag === existTag[0] ? (tag + existTag[1]) : tag} className={"select-none flex items-center justify-center bg-gray-100 px-2 rounded-md cursor-pointer " + (tag===existTag[0] ? "animate-error":"")}
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
                     <Textarea 
                        placeholder="name@gmail.com ..."
                        value={emailInput}
                        maxLength="50"
                        rows="1"
                        className={"min-h-[12px] " + (emailErr ? "text-red-500": "")}
                        onChange={(e)=>{
                           const value = e.target.value
                           setEmailErr(false)
                           if(value[value.length-1] === "\n" || value[value.length-1] === " " || value[value.length-1] === "\t"){
                              setExistTag(["", existTag[1]])
                              const regrex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                              if(!emailInput.toLowerCase().match(regrex)){
                                 setEmailErr(true)
                                 return
                              }

                              if(tags.includes(emailInput)){
                                 setExistTag([emailInput, !existTag[1]])
                                 setEmailErr(true)
                                 return
                              }
                              if(emailInput.length === 0) return
                              setTags([...tags, emailInput])
                              setEmailInput("")
                           } else {
                              setEmailInput(value.trim())
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
