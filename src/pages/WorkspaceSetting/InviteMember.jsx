import { Separator } from "@/components/ui/separator"
import { Link } from 'react-router-dom'
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { MailPlus, X, Search } from "lucide-react"

export default function() {
   return (
      <div className="">
         <div className="space-y-5 w-[800px]">
            <div>
               <h1 className="text-lg font-medium"> Invites </h1>
               <p className="text-muted-foreground text-sm"> Manage all invitation</p>
            </div>
            <Separator />
            <div className="flex justify-end gap-5">
               <div className="flex items-center gap-2 mr-auto text-md text-black font-medium">
                  <MailPlus className="w-5 h-5 stroke-gray-700"/> (5)
               </div>
               <Input className="w-60" placeholder="Search ..."/>
               <Button> Invite </Button>
            </div>
            <div className="flex gap-3 items-center">
               <div className="w-14 h-14 border border-gray-300 rounded-lg">
               </div>
               <div className="flex flex-col justify-center gap-1">
                  <h1 className="text-md font-medium text-black"> Ducky Donal </h1>
                  <h2 className="text-sm text-gray-600"> duckydonal@gmail.com </h2>
               </div>
               <div className="ml-auto flex gap-1">
                  <Button variant="ghost" size="icon">
                     <Search className="stroke-gray-500"/>
                  </Button>
                  <Button variant="ghost" size="icon">
                     <X className="stroke-red-500"/>
                  </Button>
               </div>
            </div>
         </div>
      </div>
   )
}
