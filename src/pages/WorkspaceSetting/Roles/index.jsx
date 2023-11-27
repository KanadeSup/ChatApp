import columns from "./Columns"
import DataTable from "./DataTable"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2, Search } from "lucide-react"
import { Await, Link, useActionData, useLoaderData, useParams } from "react-router-dom"
import { Suspense, useEffect, useState } from "react"
import { getWorkspaceRoleList} from "/api"
import { Toaster } from "@/components/ui/toaster"

export default function() {
   const { workspaceId } = useParams()
   // const [roleList, setRoleList] = useState([])
   const actionData = useActionData()
   const { roleList } = useLoaderData()

   // useEffect(()=>{
   //    async function fetchData() {
   //       const data = await getWorkspaceRoleList(workspaceId)
   //       setRoleList(data)
   //    }
   //    fetchData()
   // },[actionData])

   return (
      <div className="space-y-5 w-[800px]">
         <div>
            <h1 className="text-lg font-medium"> Role & Permisson </h1>
            <p className="text-muted-foreground text-sm"> Manage workspace roles and its permission</p>
         </div>
         <Separator />
         <div className="flex gap-5">
            <div className="w-full relative">
               <Input placeholder="Search by role name ..." />
               <Search className="absolute w-5 h-5 right-3 top-[10px]"/>
            </div>
            <Link to="CreateRole" className="shrink-0">
               <Button className="">
                  Create Role
               </Button>
            </Link>
         </div>
         <Suspense>
            <Await resolve={roleList}>
               {
                  (roleList) => (
                     <DataTable columns={columns} data={roleList} />
                  )
               }
            </Await>
         </Suspense>
         <Toaster />
      </div>
   )
}
