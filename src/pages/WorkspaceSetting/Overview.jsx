import { Separator } from "@/components/ui/separator"
import { Await, Form, Link, useLoaderData, useParams } from 'react-router-dom'
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Avatar } from "@/components/ui/avatar"
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { toCharacters } from '/utils/ParseName'
import { Suspense, useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"
import { getWorkspace, updateWorkspace } from '/api'
import { Check, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function() {
   const { toast } = useToast()
   const [workspace, setWorkspace] = useState(null)
   const [name, setName] = useState("")
   const [description, setDescription] = useState("")
   const [logo, setLogo] = useState("")
   const { workspaceId } = useParams()
   const [defaultValue, setDefaultValue] = useState({
      name: "",
      description: "",
      logo: "",
   })

   useEffect(()=> {
      const fetchData = async() => {
         const data = await getWorkspace(workspaceId)
         setWorkspace(data)
         setName(data.name)
         setDescription(data.description)
         setLogo(data.avatarUrl)
         setDefaultValue({
            name: data.name,
            description: data.description,
            logo: data.avatarUrl
         })
      }
      fetchData()
   },[])

   if(workspace === null) return (
      <div className="flex-grow self-stretch flex justify-center items-center">
         <Loader2 className="w-14 h-14 animate-spin stroke-gray-400"/>        
      </div>
   )
   return (
      <form method="POST" encType="multipart/form-data"
         onSubmit={async (e)=>{
            e.preventDefault()
            document.querySelector(".loader").classList.remove("hidden")
            document.querySelector(".submit-but").setAttribute("disabled","")
            document.querySelector(".reset-but").setAttribute("disabled","")
            const logoObj = document.querySelector(".workspace-logo").files[0]
            await updateWorkspace(workspaceId, logoObj, name, description)
            document.querySelector(".loader").classList.add("hidden")
            document.querySelector(".submit-but").removeAttribute("disabled")
            document.querySelector(".reset-but").removeAttribute("disabled")
            setDefaultValue({
               name: name.trim(),
               description: description.trim(),
               logo: logo,
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
         }}
      >
         <div className="space-y-5 w-[800px]">
            <div>
               <h1 className="text-lg font-medium"> Overview </h1>
               <p className="text-muted-foreground text-sm">Update your workspace overview</p>
            </div>
            <Separator />
            <div className="space-y-10">
               <div className="flex flex-col items-start">
                  <div className="flex flex-col items-center ">
                     <div className="w-20 h-20 border border-gray-500 rounded-lg">
                        <label className="cursor-pointer">
                           <Avatar className="w-20 h-20 border border-gray-500 rounded-lg">
                              <AvatarImage src={logo} />
                              <AvatarFallback className="w-20 h-20"> {toCharacters(name).trim().toUpperCase()} </AvatarFallback>
                           </Avatar>
                           <input type="file" className="hidden workspace-logo" name="logo"
                              onChange={(e) => {
                                 e.target.files[0] && setLogo(URL.createObjectURL(e.target.files[0]))
                              }}
                           />
                        </label>
                     </div>
                     {
                        logo !== workspace.avatarUrl && 
                           <span className="font-bold text-sm cursor-pointer"
                              onClick={()=>setLogo(workspace.avatarUrl)}
                           > 
                              remove 
                           </span>
                     }
                  </div>
                  <p className="text-muted-foreground text-sm italic"> We recommend an image of at least 512x512 for the server. </p>
               </div>
               <div className="space-y-1">
                  <Label className="text-md"> Workspace Name </Label>
                  <Input value={name} name="name"
                     onChange={(e)=>setName(e.target.value)}
                  />
                  <p className="text-muted-foreground text-sm italic"> Workspace name length must be shorter than 50 character. </p>
               </div>
               <div className="space-y-1">
                  <Label className="text-md"> Workspace Description </Label>
                  <Textarea placeholder="Your workspace description ..." value={description} maxLength={255} name="description"
                     onChange={(e)=>setDescription(e.target.value)}
                  />
                  <p className="text-muted-foreground text-sm italic"> Workspace description length must be shorter than 255 character. </p>
               </div>
               <Separator />
            </div>
            <div>
               <div className="space-y-1">
                  <div className="flex justify-between">
                     <Label className="text-md"> Hide Private Channel </Label>
                     <Switch />
                  </div>
                  <p className="text-muted-foreground italic text-sm"> All member which is a not private channel member cannot see that channel </p>
               </div>
            </div>
            {/* Footer */}
            <div className="flex justify-end gap-5 pt-10">
               <Button variant="ghost"
                  className="reset-but"
                  onClick={(e)=>{
                     setLogo(defaultValue.logo)
                     setName(defaultValue.name)
                     setDescription(defaultValue.description)
                     e.preventDefault()
                  }}
               > 
                  Reset
               </Button>
               <Button 
                  className="submit-but"
                  type="submit"
                  disabled={ 
                     workspace !== null &&
                     (name.trim().length <= 5
                        || name.trim() === defaultValue.name)
                        && description === defaultValue.description
                        && (logo === defaultValue.logo)
                  }
                  name="workspaceid"
                  value={workspace.id}
               > 
                  <Loader2 className="loader mr-2 h-4 w-4 animate-spin hidden" />
                  Save change 
               </Button>
            </div>
            <Toaster />
         </div>
      </form>
   )
}
