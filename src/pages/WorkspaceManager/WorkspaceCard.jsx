import { Link } from "react-router-dom";
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toCharacters } from "/utils/ParseName";
import { User, User2 } from "lucide-react";

export default function ({ workspace }) {
   let { name, avatarUrl, members } = workspace;
   return (
      <Link
         to={`/Workspace/${workspace.id}`}
         className="w-full lg:w-[calc(100%/2-20px*1/2)] xl:w-[calc(100%/3-20px*2/3)] 2xl:w-[calc(25%-20px*3/4)] group"
      >
         <Card className="group-hover:border-black border-[2px] transition-colors h-60">
            <CardHeader className="flex">
               <Avatar className="rounded w-16 h-16 group-hover:border border-gray-300 transition-all">
                  <AvatarImage src={avatarUrl} />
                  <AvatarFallback className="rounded font-medium">
                     {toCharacters(name).toUpperCase()}{" "}
                  </AvatarFallback>
               </Avatar>
               <CardTitle className="font-medium text-xl text-ellipsis truncate">
                  {name}
               </CardTitle>
               <CardDescription>{members.length} members</CardDescription>
            </CardHeader>
            <CardContent>
               <div className="flex items-center gap-5">
                  <div className="grid grid-cols-3 w-20">
                     {members.slice(0,3).map((member) => (
                        <Avatar key={member.id} className="rounded">
                           <AvatarImage src={member.picture} />
                           <AvatarFallback className="rounded font-medium border border-gray-300">
                              <User2 className="stroke-gray-600" />
                           </AvatarFallback>
                        </Avatar>
                     ))}
                  </div>
                  {members.length > 3 ? (
                     <span className="text-gray-500">
                        +{members.length - 3}
                     </span>
                  ) : (
                     ""
                  )}
               </div>
            </CardContent>
         </Card>
      </Link>
   );
}
