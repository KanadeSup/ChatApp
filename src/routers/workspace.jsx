import Workspace from '/pages/Workspace'
import WManager from '/pages/WorkspaceManager/'
import WSetting from '/pages/WorkspaceSetting'
import Overview from '/pages/WorkspaceSetting/Overview'
import MemberManage from '/pages/WorkspaceSetting/MemberManage'
import InviteMember from '/pages/WorkspaceSetting/InviteMember'
import Roles from '/pages/WorkspaceSetting/Roles'
import RoleCreator from '/pages/WorkspaceSetting/RoleCreator'
import RoleEditor from '/pages/WorkspaceSetting/RoleEditor'
import Homepage from '/pages/Homepage'
import { getWorkspaceList, createWorkspace, getWorkspace, deleteWorkspace, updateWorkspace, createChannel,getChannelList, deleteChannel, deleteWorkspaceRole, getWorkspaceRoleById} from '/api'
import { getWorkspaceRoleList} from "/api"
import { defer, redirect, useNavigate, useParams } from 'react-router-dom'
import ChannelChatSection from "/pages/Workspace/ChannelChatSection";

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
   await deleteWorkspace(formData.get("workspaceid"))
   return redirect("/Workspace")
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

   if(formType === "create") {
      const { id } = await createChannel(formData.get("name"), workspaceId)
      return "create " + id
   }
   if(formType === "delete") {
      const { id } = await deleteChannel(workspaceId, formData.get("cid"))
      return "delete " + id
   }
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

export default [
   {
      path: "/",
      element: <Homepage />,
      loader: () => redirect("/Login")
   },
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
            element:<p>there is no chat here</p> 
         },
         {
            path:":channelId",
            element: <ChannelChatSection />
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
            element: <MemberManage />
         },
         {
            path: "Invites",
            element: <InviteMember />
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
