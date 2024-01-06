import { Separator } from "@/components/ui/separator"
import { Await, Form, Link, useLoaderData, useParams } from 'react-router-dom'
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Avatar } from "@/components/ui/avatar"
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { Suspense, useEffect, useState } from "react"
import { getChannel, updateChannel } from "/api"
import { Check, Loader2, RefreshCcw, RefreshCw, X } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function() {
   const { toast } = useToast()
   const { channelId, workspaceId } = useParams()
   const [channel, setChannel] = useState(null)
   const [name, setName] = useState("")
   const [description, setDescription] = useState("")
   const [defaultValue, setDefaultValue] = useState({
      name: "",
      description: "",
   })

   useEffect(()=>{
      async function fetchData() {
         const data = await getChannel(channelId)
         setChannel(data)
         setName(data.name)
         setDescription(data.description)
         setDefaultValue({
            name: data.name,
            description: data.description
         })
      }
      fetchData()
   },[])
   if(channel === null) return (
      <div className="flex-grow self-stretch flex justify-center items-center">
         <Loader2 className="w-14 h-14 animate-spin stroke-gray-400"/>        
      </div>
   )
   return (
      <form
         onSubmit={
            async (e)=>{
               e.preventDefault()
               document.querySelector(".loader").classList.remove("hidden")
               document.querySelector(".submit-but").setAttribute("disabled","")
               document.querySelector(".reset-but").setAttribute("disabled","")
               const res = await updateChannel(workspaceId,channelId,name,description)
               document.querySelector(".loader").classList.add("hidden")
               document.querySelector(".submit-but").removeAttribute("disabled")
               document.querySelector(".reset-but").removeAttribute("disabled")
               if(res.ok){
                  setDefaultValue({
                     name: name.trim(),
                     description: description.trim()
                  })
                  toast({
                     duration: 1000,
                     title: (
                        <p className="text-green-600 flex items-center">
                           <Check className="w-6 h-6 stroke-green-600 mr-2"/>
                           Update successfully!
                        </p>
                     )
                  })
                  return
               }
               if(res.status === 403) {
                  toast({
                     duration: 1000,
                     title: (
                        <p className="text-red-600 flex items-center">
                           <X className="w-6 h-6 stroke-red-600 mr-2" />
                           You don't have permission to do this action
                        </p>
                     ),
                  });
                  return
               }
               toast({
                  duration: 1000,
                  title: (
                     <p className="text-red-600 flex items-center">
                        <X className="w-6 h-6 stroke-red-600 mr-2" />
                        Something went wrong, please try again
                     </p>
                  ),
               });
            }
         }
      >
         <div className="w-[600px] space-y-5">
            <div>
               <h1 className="text-lg font-medium"> Overview </h1>
               <p className="text-muted-foreground text-sm">Update your channel overview</p>
            </div>
            <Separator />
            <div className="space-y-1">
               <Label> Channel Name </Label>
               <Input type="text" autoComplete="off" name="name"
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
               />
               <p className="text-muted-foreground text-sm italic" > 
                  Channel name length must be shorter than 50 character.
               </p>
            </div>
            <div className="space-y-1">
               <Label> Channel Description </Label>
               <Textarea className="" placeholder="Your channel description ..." name="description"
                  value={description}
                  onChange={(e)=>setDescription(e.target.value)}
               />
               <p className="text-muted-foreground text-sm italic"> 
                  Channel name length must be shorter than 255 character. 
               </p>
            </div>
            <div className="flex justify-end gap-2">
               <Button variant="ghost"
                  className="reset-but"
                  onClick={(e)=>{
                     setName(defaultValue.name)
                     setDescription(defaultValue.description)
                     e.preventDefault()
                  }}
               > 
                  Reset 
               </Button>
               <Button className="submit-but flex" type="submit" 
                  disabled={
                     name.trim().length === 0 ||
                     (name.trim() === defaultValue.name && description.trim() === defaultValue.description)
                  }
               > 
                  <Loader2 className="loader mr-2 h-4 w-4 animate-spin hidden" />
                  Save Change 
               </Button>
            </div>
         </div>
         <Toaster />
      </form>
   )
}
