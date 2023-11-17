import Workspace from '/pages/Workspace'
import WManager from '/pages/WorkspaceManager/'
import WSetting from '/pages/WorkspaceSetting'
import Overview from '/pages/WorkspaceSetting/Overview'
import MemberManage from '/pages/WorkspaceSetting/MemberManage'
import InviteMember from '/pages/WorkspaceSetting/InviteMember'
import Homepage from '/pages/Homepage'
import { getWorkspaceList, createWorkspace, getWorkspace, deleteWorkspace, updateWorkspace, createChannel,getChannelList, deleteChannel} from '/api'
import { defer, redirect, useNavigate, useParams } from 'react-router-dom'

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
   return redirect("./")
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
      const { id } = await deleteChannel(formData.get("cid"))
      return "delete " + id
   }
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
         }
      ]
   },
]
