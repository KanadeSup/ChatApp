import { Outlet, Link, useLoaderData, useNavigation } from 'react-router-dom'
import WCard from './WorkspaceCard.jsx'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import CreateDialog from "./CreateWorkspaceDialog"
import useTokenStore from "/storages/useTokenStore"
import { Skeleton } from "@/components/ui/skeleton"
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card"

export default function() {
   const workspaceList = useLoaderData()
   const navigation = useNavigation();
   return (
      <div className="min-w-[800px] px-10 flex-grow shadow-xl flex justify-center overflow-y-scroll h-screen">
         <div className="w-full">
            {/* Top */}
            <div className="flex mt-10"> 
               <h1 className="text-2xl font-bold text-black">
                  Your Workspace ({workspaceList.length})
               </h1>
               <div className="ml-auto flex gap-5">
                  <Input placeholder="Search ..."  className="w-60"/>
                  <CreateDialog />
               </div>
            </div>

            {/* Workspace list */}
            <div className="flex mt-10 flex-wrap gap-5 w-full">
               {
                  workspaceList.map((workspace)=> <WCard key={workspace.id} workspace={workspace} />)
               }
               {
                  (navigation.state === "loading") &&
                     (
                        <div className="w-full lg:w-[calc(100%/2-20px*1/2)] xl:w-[calc(100%/3-20px*2/3)] 2xl:w-[calc(25%-20px*3/4)] h-60">
                           <Card className="transition-colors h-60">
                              <CardHeader className="flex">
                                 <Skeleton className="h-16 w-16 rounded" />
                                 <CardTitle className="font-medium text-xl"> 
                                    <Skeleton className="h-4 w-40 rounded" />
                                 </CardTitle>
                                 <CardDescription>
                                    <Skeleton className="h-4 w-20 rounded" />
                                 </CardDescription>
                              </CardHeader>
                              <CardContent>
                                 <Skeleton className="h-10 w-52 rounded" />
                              </CardContent>
                           </Card>
                        </div>
                     )
               }
            </div>
         </div>
      </div>
   )
}
