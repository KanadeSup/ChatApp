import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Pencil } from 'lucide-react'
import { Button } from "@/components/ui/button"
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
