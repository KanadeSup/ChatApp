import {
   flexRender,
   getCoreRowModel,
   useReactTable,
   getFilteredRowModel,
} from "@tanstack/react-table"
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table"
import { Link, useNavigate } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Loader2, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function({ columns, data}) {
   const [columnFilters, setColumnFilters] = useState([])
   const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      onColumnFiltersChange: setColumnFilters,
      getFilteredRowModel: getFilteredRowModel(),
      state: {
         columnFilters,
      }
   })
   const navigate = useNavigate()
   return(
      <div className="w-[800px] space-y-5">
         <div className="flex gap-5">
            <div className="w-full relative">
               <Input placeholder="Filter by role name ..." 
                  value={(table.getColumn("name")?.getFilterValue()) ?? ""}
                  onChange={(event) =>
                     table.getColumn("name")?.setFilterValue(event.target.value)
                  }
               />
               <Search className="absolute w-5 h-5 right-3 top-[10px]"/>
            </div>
            <Link to="CreateRole" className="shrink-0">
               <Button className="">
                  Create Role
               </Button>
            </Link>
         </div>
         <Table>
            <TableHeader>
               { table.getHeaderGroups().map(headerGroup => (
                  <TableRow key={headerGroup.id}>
                     {headerGroup.headers.map(header=>{
                        return (
                           <TableHead key={header.id}>
                              {header.isPlaceholder
                                 ? null
                                 : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                 )}
                           </TableHead>
                        )})}
                  </TableRow>
               ))}
            </TableHeader>
            <TableBody>
               {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map(row => (
                     <TableRow key={row.id} className="group"
                        onClick={e=>{
                           const butDelete = e.currentTarget.querySelector(".delete-but-trigger")
                           if(!butDelete.contains(e.target)
                              && butDelete !== e.target
                              && e.currentTarget.contains(e.target)
                           ) navigate(`./${row.original.id}`)
                        }}
                     >
                        {row.getVisibleCells().map(cell=>(
                           <TableCell key={cell.id}>
                              {flexRender(cell.column.columnDef.cell,cell.getContext())}
                           </TableCell>
                        ))}
                     </TableRow>
                  ))
               ): (
                     <TableRow>
                        <TableCell colSpan={columns.length} className="h-24 text-center">
                           No results
                        </TableCell>
                     </TableRow>
                  )}
            </TableBody>
         </Table>
      </div>
   )
}
