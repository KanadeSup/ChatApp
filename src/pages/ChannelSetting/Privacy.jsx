import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { LockKeyhole } from "lucide-react"
export default function() {
   return (
      <div className="w-[700px] space-y-5">
         <div>
            <h1 className="text-lg font-medium"> Privacy </h1>
            <p className="text-muted-foreground text-sm"> Update your channel Privacy </p>
         </div>
         <Separator />
         <div className="flex justify-between gap-10 p-5 border border-gray-300 rounded-lg">
            <div>
               <h1 className="flex items-baseline gap-2 text-lg font-medium"> 
                  <LockKeyhole className="w-5 h-5"/>
                  Private Channel 
               </h1>
               <p className="text-muted-foreground text-sm"> 
                  By making a channel private, only select members and roles will be able to view this channel. 
               </p>
            </div>
            <Switch />
         </div>
      </div>
   )
}
