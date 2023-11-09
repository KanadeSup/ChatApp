import { Separator } from "@/components/ui/separator"
import { Link } from 'react-router-dom'
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

export default function() {
   return (
      <div className="">
         <div className="space-y-5 w-[800px]">
            <div>
               <h1 className="text-lg font-medium"> Overview </h1>
               <p className="text-muted-foreground text-sm">Update your workspace overview</p>
            </div>
            <Separator />
            <div className="space-y-10">
               <div>
                  <div className="w-20 h-20 border border-gray-500 rounded-lg">

                  </div>
                  <p className="text-muted-foreground text-sm italic"> We recommend an image of at least 512x512 for the server. </p>
               </div>
               <div className="space-y-1">
                  <Label className="text-md"> Workspace Name </Label>
                  <Input defaultValue="Secret Workspace"/>
                  <p className="text-muted-foreground text-sm italic"> Workspace name length must be shorter than 50 character. </p>
               </div>
               <div className="space-y-1">
                  <Label className="text-md"> Workspace Description </Label>
                  <Textarea placeholder="Your workspace description ..."/>
                  <p className="text-muted-foreground text-sm italic"> Workspace description length must be shorter than 100 character. </p>
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
               <Button disabled> Save change </Button>
            </div>
         </div>
      </div>
   )
}
