import Workspace from '/pages/Workspace'
import WManager from '/pages/WorkspaceManager/'
import WSetting from '/pages/WorkspaceSetting'
import Overview from '/pages/WorkspaceSetting/Overview'
import MemberManage from '/pages/WorkspaceSetting/MemberManage'
import InviteMember from '/pages/WorkspaceSetting/InviteMember'
import Roles from '/pages/WorkspaceSetting/Roles'
import RoleCreator from '/pages/WorkspaceSetting/RoleCreator'
import RoleEditor from '/pages/WorkspaceSetting/RoleEditor'
import { getWorkspaceList, createWorkspace, getWorkspace, deleteWorkspace, updateWorkspace, createChannel,getChannelList, deleteChannel, deleteWorkspaceRole, getWorkspaceRoleById} from '/api'
import { getWorkspaceRoleList} from "/api"
import { defer, redirect, useNavigate, useParams, useRouteError } from 'react-router-dom'
import ChannelChatSection from "/pages/Workspace/ChannelChatSection";
import { getMemberList } from "/api/workspace"
import { Button } from "/components/ui/button"
import { HomeChat } from '../assets/img/MySvg'
function ChannelChatSectionWrapper() {
   const { channelId } = useParams();
   return <ChannelChatSection key={"a"+channelId} />;
}

const workspaceListLoader = async function() {
   return defer({wList: getWorkspaceList()})
}
const workspaceLoader = async function({params}) {
   const { workspaceId } = params
   return defer({workspace: getWorkspace(workspaceId)})
}

async function createWorkspaceAction({ request, params }) {
   const formData = await request.formData();
   await createWorkspace(formData.get("name"), formData.get("Avatar"))
   return redirect("./")
}
async function deleteWorkspaceAction({ request, params }) {
   const formData = await request.formData();
   const res = await deleteWorkspace(formData.get("workspaceid"))
   if(res.ok) return redirect("/Workspace")
   return res
}
async function updateWorkspaceAction({ request, params }) {
   const formData = await request.formData();
   await updateWorkspace(formData.get("workspaceid"),formData.get("logo"),formData.get("name"),formData.get("description"))
   return redirect("./")
}
async function channelAction({ request, params }) {
   const { workspaceId } = params 
   const formData = await request.formData();
   const formType = formData.get("type")
   let res;
   if(formType === "create") {
      res = await createChannel(formData.get("name"), workspaceId)
   }
   if(formType === "delete") {
      res = await deleteChannel(workspaceId, formData.get("cid"))
   }
   return res
}
async function deleteRoleAction({request,params}) {
   const formData = await request.formData();
   const roleId = formData.get("roleid")
   const { workspaceId } = params
   await deleteWorkspaceRole(workspaceId, roleId)
   return roleId
}
async function workspaceRolesLoader({params}) {
   const { workspaceId } = params
   return defer({roleList: getWorkspaceRoleList(workspaceId)})
}

async function workspaceMemberLoader({params}) {
   const { workspaceId } = params
   return defer({memberList: getMemberList(workspaceId)})
}



export default [

   {
      path: "/Workspace",
      element: <WManager />,
      loader: workspaceListLoader,
      action: createWorkspaceAction,
   },
   {
      path: "/Workspace/:workspaceId",
      element: <Workspace />,
      action: channelAction,
      loader: workspaceLoader,
      children: [
         {
            index: true,
            element: <div className='w-full h-full flex justify-center items-center'><HomeChat /></div>
         },
         {
            path:":channelId",
            element: <ChannelChatSectionWrapper />
         }
      ]
   },   
   {
      path: "/Workspace/:workspaceId/WorkspaceSetting",
      element: <WSetting />,
      action: deleteWorkspaceAction,
      children: [
         { 
            index: true, 
            element: <Overview />,
         },
         {
            path: "Members",
            element: <MemberManage />,
            loader: workspaceMemberLoader,
         },
         {
            path: "Invites",
            element: <InviteMember />,
         },
         {
            path: "Role",
            element: <Roles />,
            action: deleteRoleAction,
            loader: workspaceRolesLoader,
         },
         {
            path: "Role/CreateRole",
            element: <RoleCreator />,
         },
         {
            path: "Role/:roleId",
            element: <RoleEditor />,
         }
      ]
   },
]


