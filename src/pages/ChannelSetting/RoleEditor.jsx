import {
   ArrowLeft,
   Check,
   Loader,
   Loader2,
   Search,
   Users,
   User,
   X,
} from "lucide-react";
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
import { getChannelPermissions, updateChannelRole, getChannelRole } from "/api/channel"
import { useToast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUnroleMember, getMemberByRole, addRoleMembers } from "/api/channel";
import MemberDialog from "./MemberDialog";


const roleColors = [
   "#1ABC9C", "#2ECC71", "#3498DB", "#9B59B6", "#E91E63", "#F1C40F", "#E67E22", "#E74C3C", "#95A5A6", "#607D8B", "#11806A", "#1F8B4C", "#206694", "#71368A", "#AD1457", "#C27C0E", "#A84300", "#992D22", "#979C9F", "#546E7A"
]
function compareArray(arr1,arr2) {
   if(arr1.length !== arr2.length) return false
   for(const ele of arr1) {
      if(!arr2.includes(ele)) return false
   }
   return true
}
export default function() {
   const [name, setName] = useState("")
   const [description, setDescription] = useState("")
   const [role, setRole] = useState(null)
   const [permissionList, setPermissionList] = useState([])
   const [arePermissionEnable, setArePermissionEnable] = useState({})
   const [defaultValue, setDefaultValue] = useState({})
   const [color, setColor] = useState(roleColors[0])
   const { channelId, roleId, workspaceId } = useParams()
   const navigate = useNavigate()
   const { toast } = useToast()
   const [unaddedMembers, setUnaddedMembers] = useState([]);
   const [addedMembers, setAddedMembers] = useState([]);
   const [search, setSearch] = useState("");

   const addMembers = (members) => {
      if (members.length === 0) return;
      setAddedMembers([...members, ...addedMembers]);
      members.map((member) => {
         unaddedMembers.splice(unaddedMembers.indexOf(member), 1);
      });
      setUnaddedMembers([...unaddedMembers]);
   };

   useEffect(()=>{
      async function fetchData() {
         const data = await getChannelRole(channelId,roleId)
         setUnaddedMembers(await getUnroleMember(channelId));
         const roleMembers = await getMemberByRole(channelId, roleId);
         setAddedMembers(roleMembers);

         const areEnable = {}
         data.permissions.map(p => areEnable[p.id] = p.isEnabled)
         setRole(data)
         setName(data.name)
         setColor(data.color)
         setDescription(data.description)
         setPermissionList(data.permissions)
         setArePermissionEnable(areEnable)
         setDefaultValue({
            name: data.name,
            description: data.description,
            color: data.color,
            permissions: {...areEnable},
            roleMembers: [...roleMembers],
         })
      }
      fetchData()
   }, [])

   if(!role) {
      return (
         <Loader2 className="animate-spin"/>
      )
   }
   return (
      <Form method="post"
         onSubmit={async (e)=>{
            e.preventDefault()
            document.querySelector(".loader").classList.toggle("hidden")
            document.querySelector(".submit").disabled = true
            const enableList = []
            Object.keys(arePermissionEnable).forEach(key =>{
               if(arePermissionEnable[key])
                  enableList.push({id: key})
            })
            const roleData = {
               name: name,
               description: description,
               color: color,
               permissions: enableList
            }
            const res = await updateChannelRole(channelId, roleId, roleData)

            const removeUids = [];
            const addUids = [];
             addedMembers.map((member) => {
               if (defaultValue.roleMembers.includes(member)) return;
               addUids.push(member.id);
            });
            defaultValue.roleMembers.map((member) => {
               if (addedMembers.includes(member)) return;
               removeUids.push(member.id);
            });
            if(addUids.length !== 0) await addRoleMembers(channelId, addUids, roleId);
            if(removeUids.length !== 0)  await addRoleMembers(channelId, removeUids, null);
            navigate("..", {relative:"path"})
            if(res.ok) {
               toast({
                  title: (
                     <p className="text-green-500">Update Successfully </p>
                  ),
                  duration: 1500,
               });
               return
            }
            if(res.status === 403) {
               toast({
                  title: (
                     <p className="text-red-600">You don't have permission to do this</p>
                  ),
                  duration: 1500,
               });
               return
            }
            toast({
               title: (
                  <p className="text-red-600">Something went wrong, please try again</p>
               ),
               duration: 1500,
            });
         }}
      >
         <div className="flex gap-5 items-center">
            <Link to=".." relative="path">
               <ArrowLeft className="w-6 h-6 cursor-pointer"/>
            </Link>
            <h1 className="font-medium text-lg"> Edit Role - {role.name} </h1>
         </div>
         <Tabs defaultValue="display" className="w-[600px] mt-5" activationMode="manual">
            <TabsList className="w-full grid grid-cols-3 mb-7">
               <TabsTrigger value="display" className=""> Display </TabsTrigger>
               <TabsTrigger value="permissions" className=""> Permissions </TabsTrigger>
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
               <div className="flex justify-end pt-10 gap-3">
                  <Button type="button" variant="ghost"
                     onClick={()=> {
                        setName(defaultValue["name"])
                        setDescription(defaultValue["description"])
                        setColor(defaultValue["color"])
                        setArePermissionEnable({...defaultValue["permissions"]})
                     }}
                  >
                     Reset
                  </Button>
                  <Button type="submit" name="type" value="create" className="submit"
                     disabled={
                        name.trim().length === 0
                           || (
                              name.trim() === defaultValue["name"]
                              && description === defaultValue["description"]
                              && color === defaultValue["color"]
                              && JSON.stringify(arePermissionEnable) === JSON.stringify(defaultValue["permissions"])
                              && compareArray(defaultValue["roleMembers"], addedMembers)
                           )
                     }
                  > 
                     <Loader2 className="loader w-4 h-4 animate-spin mr-3 hidden"/>
                     Save Change
                  </Button>
               </div>
            </TabsContent>
            <TabsContent value="permissions" className="space-y-5">
               {
                  permissionList ?
                     permissionList
                     .sort((a, b) => a.name.localeCompare(b.name))
                     .map((permission) => {
                        return (
                           <div className="" key={permission.id}>
                              <div className="flex justify-between items-center">
                                 <h1 className="text-lg font-medium"> {permission.name} </h1>
                                 <Switch name="permissiond" 
                                    checked={arePermissionEnable[permission.id]}
                                    onCheckedChange={(checked) => {
                                       arePermissionEnable[permission.id] = checked
                                       setArePermissionEnable({...arePermissionEnable})
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
                     <Input placeholder="Search Members" className="pr-10" 
                        onChange={e=> {
                           setSearch(e.target.value.trim())
                        }}
                     />
                     <Search className="absolute right-3 top-[10px] text-gray-600 w-5 h-5" />
                  </div>
                  <MemberDialog
                     members={unaddedMembers}
                     addMembers={addMembers}
                  >
                     <Button id="add-member-but" className="shrink-0">
                        Add Member
                     </Button>
                  </MemberDialog>
               </div>
               <div className="mt-5 flex flex-col gap-2 h-[calc(100vh-350px)] overflow-y-auto">
                  {addedMembers.length !== 0 ? (
                     addedMembers
                     .filter(member=> search === "" ? true: member.username.toLowerCase().includes(search.toLowerCase()))
                     .map((member) => {
                        return (
                           <div
                              key={member.id}
                              className="flex gap-3 items-center px-3 py-2 hover:bg-gray-100 rounded-lg"
                           >
                              <Avatar>
                                 <AvatarImage src={member.picture} />
                                 <AvatarFallback>
                                    <User />
                                 </AvatarFallback>
                              </Avatar>
                              <span className="font-medium">
                                 {member.username}
                              </span>
                              <X
                                 className="w-6 h-6 stroke-3 stroke-red-500 ml-auto cursor-pointer"
                                 onClick={(e) => {
                                    addedMembers.splice(
                                       addedMembers.indexOf(member),
                                       1,
                                    );
                                    unaddedMembers.push(member);
                                    setAddedMembers([...addedMembers]);
                                    setUnaddedMembers([...unaddedMembers]);
                                 }}
                              />
                           </div>
                        );
                     })
                  ) : (
                        <div className="flex gap-2 items-center mt-10">
                           <Users className="w-5 h-5 stroke-gray-500" />
                           <p className="font-medium text-gray-500">
                              No members were found.
                              <Label
                                 htmlFor="add-member-but"
                                 className="font-bold text-blue-600 ml-2 cursor-pointer text-md"
                              >
                                 Add members to this role
                              </Label>
                           </p>
                        </div>
                     )}
               </div>
            </TabsContent>
         </Tabs>
      </Form>
   )
}
