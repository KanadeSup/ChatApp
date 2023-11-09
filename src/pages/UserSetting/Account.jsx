import { Separator } from "@/components/ui/separator"
import { Link } from 'react-router-dom'
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function() {
   return (
      <div className="space-y-4 w-[600px]">
         <div>
            <h1 className="text-lg font-medium"> Account </h1>
            <p className="text-muted-foreground text-sm">Update your account settings</p>
         </div>
         <Separator />
         <div>
            <div className="flex items-center justify-between">
               <Label className="text-md text-muted-foreground"> Username </Label>
            </div>
            <p className="text-lg font-medium"> PutinLord </p>
         </div>
         <Separator />

         <div>
            <div className="flex items-center justify-between">
               <Label className="text-md text-muted-foreground"> Email </Label>
            </div>
            <p className="text-lg font-medium"> PutinLord@gmail.com </p>
         </div>
         <Separator />

         <div>
            <div className="flex items-center justify-between">
               <Label className="text-md text-muted-foreground"> Password </Label>
               <Button variant="link" className="text-muted-foreground hover:text-black"> Edit </Button>
            </div>
            <p className="text-lg font-medium"> *********** </p>
         </div>
         <Separator />

         <div>
            <div className="flex items-center justify-between">
               <Label className="text-md text-muted-foreground"> Profile </Label>
               <Link to="Profile">
                  <Button variant="link" className="text-muted-foreground hover:text-black"> Edit </Button>
               </Link>
            </div>
         </div>
      </div>
   )
}
