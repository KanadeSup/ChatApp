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
      <Link to="/workspace" className="w-full lg:w-[calc(100%/2-20px*1/2)] xl:w-[calc(100%/3-20px*2/3)] 2xl:w-[calc(25%-20px*3/4)] group">
         <Card className="group-hover:bg-gray-100 transition-colors h-60">
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
