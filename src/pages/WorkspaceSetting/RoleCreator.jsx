import { ArrowLeft, Check, Loader2, Search, Users } from "lucide-react";
import { Form, Link, useNavigate, useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem, } from "@/components/ui/radio-group"
import { useEffect, useState } from "react";
import { getWorkspacePermissions, createWorkspaceRole } from "/api"
import { useToast } from "@/components/ui/use-toast"

const roleColors = [
   "#1ABC9C", "#2ECC71", "#3498DB", "#9B59B6", "#E91E63", "#F1C40F", "#E67E22", "#E74C3C", "#95A5A6", "#607D8B", "#11806A", "#1F8B4C", "#206694", "#71368A", "#AD1457", "#C27C0E", "#A84300", "#992D22", "#979C9F", "#546E7A"
]
export default function() {
   const [name, setName] = useState("New role")
   const [description, setDescription] = useState("")
   const [permissionList, setPermissionList] = useState(null)
   const [enablePermissionList,setEnablePermissionList] = useState({})
   const [color, setColor] = useState(roleColors[0])
   const { workspaceId } = useParams()
   const navigate = useNavigate()
   const { toast } = useToast()

   useEffect(()=>{
      async function fetchData() {
         const data = await getWorkspacePermissions()
         setPermissionList(data)
         data.map(p=>enablePermissionList[p.id]=p.isEnabled)
         setEnablePermissionList(enablePermissionList)
      }
      fetchData()
   }, [])

   return (
      <Form method="post"
         onSubmit={async (e)=>{
            e.preventDefault()
            const enableList = []
            Object.keys(enablePermissionList).forEach(key =>{
               if(enablePermissionList[key])
                  enableList.push({id: key})
            })
            const roleData = {
               name: name,
               description: description,
               color: color,
               permissions: enableList
            }
            document.querySelector(".loader").classList.toggle("hidden")
            document.querySelector(".submit").disabled = true
            const res = await createWorkspaceRole(workspaceId, roleData)
            toast({
               title: <p className="text-green-500">Successfully Create new role</p>,
               duration: 1500,
            })
            navigate("..", {relative:"path"})
         }}
      >
         <div className="flex gap-5 items-center">
            <Link to=".." relative="path">
               <ArrowLeft className="w-6 h-6 cursor-pointer"/>
            </Link>
            <h1 className="font-medium text-lg"> Edit Role - NEW ROLE </h1>
         </div>
         <Tabs defaultValue="display" className="w-[600px] mt-5" activationMode="manual">
            <TabsList className="w-full grid grid-cols-3 mb-7">
               <TabsTrigger value="display" className=""> Display </TabsTrigger>
               <TabsTrigger value="permissions" className=""> Permissons </TabsTrigger>
               <TabsTrigger value="members" className=""> Members </TabsTrigger>
            </TabsList>
            <TabsContent value="display" className="space-y-5">
               <div className="space-y-1">
                  <Label htmlFor="role-name"> Role Name </Label>
                  <Input id="role-name" name="name" value={name} maxLength={20} 
                     onChange={(e)=>setName(e.target.value)}
                     autoComplete="off"
                  />
               </div>
               <div className="space-y-1">
                  <Label htmlFor="role-desc"> Role Description </Label>
                  <Textarea id="role-desc" value={description} placeholder="Role description ...." maxLength={255} 
                     onChange={(e)=>setDescription(e.target.value)}
                  />
               </div>
               <div className="space-y-2">
                  <Label> Role color </Label>
                  <RadioGroup value={color} className="grid grid-cols-10 w-[400px] gap-3"
                     onValueChange={v=>setColor(v)}
                  >
                     {
                        roleColors.map(color => {
                           return (
                              <div key={color} className="relative">
                                 <RadioGroupItem value={color} className="peer sr-only" id={color} />
                                 <Label htmlFor={color} className="w-6 h-6 rounded flex items-center justify-center cursor-pointer"
                                    style={{backgroundColor: color}}
                                 >
                                 </Label>
                                 <Check className="w-4 h-4 stroke-white absolute top-1 left-1 invisible peer-data-[state=checked]:visible" />
                              </div>
                           )
                        })
                     }
                  </RadioGroup>
               </div>
               <div className="flex justify-end pt-10 gap-5">
                  <Button type="submit" name="type" value="create" className="submit"
                     disabled={name.trim().length === 0}
                  > 
                     <Loader2 className="loader w-4 h-4 animate-spin mr-3 hidden"/>
                     Create Role
                  </Button>
               </div>
            </TabsContent>
            <TabsContent value="permissions" className="space-y-5">
               {
                  permissionList ?
                     permissionList.map((permission) => {
                        return (
                           <div className="" key={permission.id}>
                              <div className="flex justify-between items-center">
                                 <h1 className="text-lg font-medium"> {permission.name} </h1>
                                 <Switch name="permissiond" 
                                    checked={enablePermissionList[permission.id]}
                                    onCheckedChange={(checked) => {
                                       enablePermissionList[permission.id] = checked 
                                       setEnablePermissionList({...enablePermissionList})
                                    }}
                                 />
                              </div>
                              <p className="text-muted-foreground text-sm"> { permission.description } </p>
                              <Separator className="mt-5"/>
                           </div>
                        )
                     }) : ""
               }
            </TabsContent>
            <TabsContent value="members">
               <div className="flex gap-5">
                  <div className="relative w-full">
                     <Input placeholder="Search Members" className="pr-10"/>
                     <Search className="absolute right-3 top-[10px] text-gray-600 w-5 h-5"/>
                  </div>
                  <Button id="add-member-but" className="shrink-0"> Add Member </Button>
               </div>
               <div className="flex gap-2 items-center mt-10">
                  <Users className="w-5 h-5 stroke-gray-500"/>
                  <p className="font-medium text-gray-500"> 
                     No members were found. 
                     <Label htmlFor="add-member-but" className="font-bold text-blue-600 ml-2 cursor-pointer text-md">
                        Add members to this role
                     </Label>
                  </p>
               </div>
            </TabsContent>
         </Tabs>
      </Form>
   )
}
