import { Button } from "@/components/ui/button"
import {Plus, ImagePlus} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { DialogClose } from "@radix-ui/react-dialog"
import { useState } from "react"

export default function() {
   const [logo, setLogo] = useState(null)
   return (
      <Dialog>
         <DialogTrigger>
            <Button>
               <Plus className="w-[20px] h-[20px] fill-white mr-2" strokeWidth={3} /> 
               <span className="font-medium"> Create </span> 
            </Button>
         </DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle className="text-xl"> Create Workspace </DialogTitle>
               <DialogDescription> 
                  Give your new workspace a personality with a name and an icon. You can change it later
               </DialogDescription>
            </DialogHeader>
            <div className="flex justify-center">
               <label htmlFor="upload" className="cursor-pointer">
                  {
                     logo 
                     && 
                     <img className="border border-gray-200 w-20 h-20 rounded-lg" src={URL.createObjectURL(logo)}/>
                     || 
                     <div className="border-2 border-dashed border-gray-400 rounded-lg w-20 h-20 flex flex-col items-center justify-center hover:bg-gray-100">
                        <ImagePlus strokeWidth={2} className="stroke-gray-300 w-8 h-8"/>
                     </div>
                  }
               </label>
               <input type="file" className="hidden" id="upload" 
                  onChange={(e)=> setLogo(e.target.files[0])}
               />
            </div>
            <div>
               <Label HtmlFor="wname" className=""> Workspace Name </Label>
               <Input id="wname" className="border-gray-500 outline-none" defaultValue="Putin's Workspace" maxlength={50}></Input>
            </div>
            <DialogFooter>
               <DialogClose>
                  <Button variant="secondary"> Cancel </Button>
               </DialogClose>
               <Button>
                  Create
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   )
}
