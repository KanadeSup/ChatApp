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
import EditProfile from "./EditCardProfile"

export default function() {
   return (
      <Card className="relative shadow">
         <CardHeader>
            <div className="flex items-center gap-5">
               <Avatar className="rounded-lg h-20 w-20">
                  <AvatarImage src="i"/>
                  <AvatarFallback className="rounded-lg text-3xl"> P </AvatarFallback>
               </Avatar>
               <div>
                  <h1 className="text-xl font-medium"> Putin Lord </h1>
                  <h2 className="italic text-md text-muted-foreground"> putinlord@gmail.com </h2>
               </div>
               <EditProfile />
            </div>
         </CardHeader>
         <CardContent className="grid grid-cols-[80px_50px_auto] grid-flow-row items-center gap-y-3">
            <Label> Full name </Label>
            <span> : </span>
            <p> Putin Adam </p>

            <Label> Gender </Label>
            <span> : </span>
            <p> Male </p>

            <Label> Phone </Label>
            <span> : </span>
            <p> 0123459559 </p>

            <Label> Birthday </Label>
            <span> : </span>
            <p> 10/6/2000 </p>
         </CardContent>
      </Card>
   )
}
