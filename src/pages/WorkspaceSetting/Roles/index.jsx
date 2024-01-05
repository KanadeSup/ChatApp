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
import { useReactTable, getCoreRowModel } from "@tanstack/react-table"

export default function() {
   const { workspaceId } = useParams()
   const actionData = useActionData()
   const { roleList } = useLoaderData()
   return (
      <div className="space-y-5 w-[800px]">
         <div>
            <h1 className="text-lg font-medium"> Role & Permission </h1>
            <p className="text-muted-foreground text-sm"> Manage workspace roles and its permission</p>
         </div>
         <Separator />
         <Suspense 
            fallback={
               <div className="flex justify-center"> 
                  <Loader2 className="animate-spin"/> 
               </div>
            }
         >
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
