import { Separator } from "@/components/ui/separator"
import { Form, Link } from 'react-router-dom'
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Avatar } from "@/components/ui/avatar"
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { toCharacters } from '/utils/ParseName'
import { useState } from "react"
import { useOutletContext } from "react-router-dom"

export default function() {
   const workspace = useOutletContext()
   const [ name, setName ] = useState(workspace.name)
   const [ description, setDescription ] = useState(workspace.description)
   const [logo, setLogo] = useState(workspace.avatarUrl)

   return (
      <Form method="POST" encType="multipart/form-data">
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
                              <AvatarImage src={logo}/>
                              <AvatarFallback className="w-20 h-20"> {toCharacters(name).trim().toUpperCase()} </AvatarFallback>
                           </Avatar>
                           <input type="file" className="hidden" name="logo"
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
               <Button variant="ghost" disabled> Reset </Button>
               <Button 
                  type="submit"
                  disabled={ 
                     (name.trim().length <= 5
                     || name.trim() === workspace.name)
                     && description === workspace.description
                     && (logo === workspace.avatarUrl)
                  }
                  name="workspaceid"
                  value={workspace.id}
               > 
                  Save change 
               </Button>
            </div>
         </div>
      </Form>
   )
}
