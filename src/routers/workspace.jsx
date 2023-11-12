import Workspace from '/pages/Workspace'
import WManager from '/pages/WorkspaceManager/'
import WSetting from '/pages/WorkspaceSetting'
import Overview from '/pages/WorkspaceSetting/Overview'
import MemberManage from '/pages/WorkspaceSetting/MemberManage'
import InviteMember from '/pages/WorkspaceSetting/InviteMember'
import { getWorkspaceList, createWorkspace, getWorkspace, deleteWorkspace, updateWorkspace } from '/api'
import { redirect } from 'react-router-dom'

const workspaceListLoader = async function() {
   const token = localStorage.getItem("token");
   if (!token) {
      return redirect("/login")
   }
   const [status, wlist] = await getWorkspaceList()
   return wlist
}
const workspaceLoader = async function({ params }) {
   return getWorkspace(params.workspaceId)
}

async function createWorkspaceAction({ request, params }) {
   const formData = await request.formData();
   await createWorkspace(formData.get("name"), formData.get("Avatar"))
   return redirect("/")
}
async function deleteWorkspaceAction({ request, params }) {
   const formData = await request.formData();
   await deleteWorkspace(formData.get("workspaceid"))
   return redirect("/")
}
async function updateWorkspaceAction({ request, params }) {
   const formData = await request.formData();
   await updateWorkspace(formData.get("workspaceid"),formData.get("logo"),formData.get("name"),formData.get("description"))
   return redirect("./")
}

export default [
   {
      path: "/",
      element: <WManager />,
      loader: workspaceListLoader,
      action: createWorkspaceAction,
   },
   {
      path: "/Workspace/:workspaceId",
      element: <Workspace />
   },
   {
      path: "/Workspace/:workspaceId/WorkspaceSetting",
      element: <WSetting />,
      loader: workspaceLoader,
      action: deleteWorkspaceAction,
      children: [
         { 
            index: true, 
            element: <Overview />,
            action: updateWorkspaceAction
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
