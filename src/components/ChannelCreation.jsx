import { Switch } from "@/components/ui/switch"
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogClose,
   DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Hash, Loader2 } from "lucide-react"
import { Form, useFetcher, useNavigation, useParams, useSubmit } from "react-router-dom"
import { useEffect, useState } from "react"

export default function({ children, fetcher, open, onOpenChange }) {
   const { workspaceId } = useParams()
   const [ name, setName ] = useState("")
   const [ isOpen, setIsOpen ] = useState(false)
   const navigate = useNavigation()
   useEffect(()=>{
      setName("")
   },[isOpen])
   const submit = useSubmit()

   return (
      <Dialog
         open={open}
         onOpenChange={onOpenChange}
      >
         <DialogTrigger asChild>
            {children}
         </DialogTrigger>
         <DialogContent>
            <DialogHeader> 
               <DialogTitle> Create a channel </DialogTitle>
            </DialogHeader>
            <fetcher.Form method="post" action={`/Workspace/${workspaceId}`} >
               <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="channel-name"> Name </Label>
                  <div className="relative">
                     <Input name="name" type="text" className="w-full pl-9" id="channel-name" placeholder="Marketing channel" maxLength="50"
                        autoComplete="off"
                        value={name}
                        onChange={(e)=> setName(e.target.value)}
                     />
                     <Hash className="w-5 h-5 stroke-gray-500 absolute left-2 top-[10px]"/>
                  </div>
               </div>
               <div className="flex justify-between items-center mt-5">
                  <div>
                     <h1 className="text-md font-medium"> Private Channel </h1>
                     <p className="text-sm text-muted-foreground"> 
                        Members who is added can access this channel
                     </p>
                  </div>
                  <Switch />
               </div>
               <DialogFooter className="mt-5">
                  <DialogClose 
                     disabled={navigate.state !== "idle"}
                     className="mr-2"
                  >
                     Cancel
                  </DialogClose>
                  <DialogClose asChild>
                     <Button type="submit" disabled={name.trim().length === 0} name="type" value="create">
                        Create
                     </Button>
                  </DialogClose>
               </DialogFooter>
            </fetcher.Form>
         </DialogContent>
      </Dialog>
   )
}
