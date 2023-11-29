import {
   flexRender,
   getCoreRowModel,
   useReactTable,
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

export default function({ columns, data}) {
   const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
   })
   const navigate = useNavigate()
   return(
      <div className="w-[800px]">
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
