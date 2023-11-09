import { Label } from "@/components/ui/label"
import {
   Dialog,
   DialogFooter,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog"
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
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { DialogClose } from "@radix-ui/react-dialog"

export default function() {
   return (
      <Dialog>
         <DialogTrigger>
            <Button variant="outline" size="icon" className="ml-auto self-start w-7 h-7 absolute top-2 right-2" >
               <Pencil className="stroke-gray-500 w-4 h-4"/>
            </Button>
         </DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <div className="flex items-center gap-5">
                  <Avatar className="rounded-lg h-20 w-20">
                     <AvatarImage src="i"/>
                     <AvatarFallback className="rounded-lg text-3xl"> P </AvatarFallback>
                  </Avatar>
                  <div>
                     <h1 className="text-xl font-medium"> Putin Lord </h1>
                     <h2 className="italic text-md text-muted-foreground"> putinlord@gmail.com </h2>
                  </div>
               </div>
            </DialogHeader>
            <div className="grid grid-cols-[80px_50px_auto] grid-flow-row items-center gap-y-3">
               <Label> Full name </Label>
               <span> : </span>
               <Input defaultValue="Putin Adam"/>

               <Label> Gender </Label>
               <span> : </span>
               <RadioGroup defaultValue="male" className="flex items-center gap-10">
                  <div className="flex items-center gap-1">
                     <RadioGroupItem value="male" id="male"/>
                     <Label htmlFor="male"> Male </Label>
                  </div>
                  <div className="flex items-center gap-1">
                     <RadioGroupItem value="female" id="female"/>
                     <Label htmlFor="female"> Female </Label>
                  </div>
               </RadioGroup>

               <Label> Phone </Label>
               <span> : </span>
               <Input defaultValue="0123459559"/>

               <Label> Birthday </Label>
               <span> : </span>
               <Input type="date" />
            </div>

            <DialogFooter>
               <DialogClose>
                  <Button variant="secondary"> Cancel </Button>
               </DialogClose>
               <Button> Save </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   )
}
