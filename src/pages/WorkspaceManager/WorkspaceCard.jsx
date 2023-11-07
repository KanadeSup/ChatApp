import { Link } from "react-router-dom"
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function() {

   return(
      <Link to="/workspace" className="px-2 py-3 w-1/2 group max-w-[400px] min-w-[400px]" >
         <Card className="group-hover:bg-gray-50 transition-colors">
            <CardHeader className="flex">
               <Avatar className="rounded w-14 h-14 group-hover:border border-gray-300 transition-all">
                  <AvatarImage src="a" />
                  <AvatarFallback className="rounded font-medium"> SW </AvatarFallback>
               </Avatar>
               <CardTitle className="font-medium text-xl"> Secret Workspace </CardTitle>
               <CardDescription>
                  10 members
               </CardDescription>
            </CardHeader>
            <CardContent>
               <div className="flex items-center gap-5">
                  <div className="grid grid-cols-3 w-20">
                     <Avatar className="rounded">
                        <AvatarImage src="a" />
                        <AvatarFallback className="rounded font-medium border border-gray-300"> S </AvatarFallback>
                     </Avatar>
                     <Avatar className="rounded">
                        <AvatarImage src="a" />
                        <AvatarFallback className="rounded font-medium border border-gray-300"> S </AvatarFallback>
                     </Avatar>
                     <Avatar className="rounded">
                        <AvatarImage src="a" />
                        <AvatarFallback className="rounded font-medium border border-gray-300"> S </AvatarFallback>
                     </Avatar>
                  </div>
                  <span className="text-gray-500"> +2 </span>
               </div>
            </CardContent>
         </Card>
      </Link>
   )
}
