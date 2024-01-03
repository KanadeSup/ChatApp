import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import CardProfile from "./CardProfile"

export default function() {
   const [isEditing, setIsEditing] = useState(false)
   return (
      <div className="space-y-4 w-[600px]">
         <div>
            <h1 className="text-lg font-medium"> Profile </h1>
            <p className="text-muted-foreground text-sm"> This is how others will see you on the site. </p>
         </div>
         <Separator />
         <CardProfile />
      </div>
   )
}
