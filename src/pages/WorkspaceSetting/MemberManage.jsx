import { Separator } from "@/components/ui/separator"
import { Link } from 'react-router-dom'
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ArrowDownWideNarrow, MoreHorizontal, User } from "lucide-react"

export default function() {
   return (
      <div className="">
         <div className="space-y-5 w-[800px]">
            <div>
               <h1 className="text-lg font-medium"> Members </h1>
               <p className="text-muted-foreground text-sm"> Manage your workspace members</p>
            </div>
            <Separator />
            <div className="flex justify-end gap-3">
               <div className="flex items-center gap-2 mr-auto text-md text-black font-medium">
                  <User className="w-5 h-5 stroke-gray-700 " strokeWidth={2.5}/> (2)
               </div>
               <Input className="w-60" placeholder="Search ..."/>
               <Button variant="ghost" size="icon">
                  <ArrowDownWideNarrow className="w-6 h-6 stroke-gray-500"/>
               </Button>
            </div>
            <div className="flex gap-3 items-center">
               <div className="w-14 h-14 border border-gray-400 rounded-lg items-center">
               </div>
               <div className="flex flex-col justify-center gap-1">
                  <div className="flex gap-3">
                     <h1 className="text-md font-medium text-black"> Putin Lord </h1>
                     <span className="bg-gray-200 rounded-lg px-2 text-xs flex items-center font-bold"> Owner </span>
                  </div>
                  <h2 className="text-sm text-gray-600"> putinlord@gmail.com </h2>
               </div>
               <Button variant="ghost" size="icon" className="ml-auto">
                  <MoreHorizontal />
               </Button>
            </div>
         </div>
      </div>
   )
}
