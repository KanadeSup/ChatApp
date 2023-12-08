import ChannelSetting from "/pages/ChannelSetting"
import Overview from "/pages/ChannelSetting/Overview"
import Members from "/pages/ChannelSetting/Members"
import Roles from "/pages/ChannelSetting/Roles"
import RoleCreator from '/pages/ChannelSetting/RoleCreator'
import RoleEditor from '/pages/ChannelSetting/RoleEditor'
import { deleteChannel } from "/api"
import { defer, redirect } from "react-router-dom"
import { getChannelRoleList, deleteChannelRole } from "/api/channel"

const deleteChannelAction = async function({ request, params }) {
   const { workspaceId, channelId } = params
   const formData = await request.formData();
   await deleteChannel(workspaceId, channelId)
   return redirect(`/Workspace/${workspaceId}`)
}
async function channelRolesLoader({params}) {
   const { channelId } = params
   return defer({roleList: getChannelRoleList(channelId)})
}
async function deleteRoleAction({request,params}) {
   const formData = await request.formData();
   const roleId = formData.get("roleid")
   const { channelId } = params
   await deleteChannelRole(channelId, roleId)
   return roleId
}
async function channelMemberLoader({params}) {
   const { channelId } = params
   return defer({roleList: getChannelRoleList(channelId)})
}
export default [
   {
      path: "/Workspace/:workspaceId/:channelId/ChannelSetting",
      element: <ChannelSetting />,
      action: deleteChannelAction,
      children: [
         { 
            index: true, 
            element: <Overview />
         },
         {
            path: "Members",
            element: <Members />
         }, 
         {
            path: "Role",
            element: <Roles />,
            loader: channelRolesLoader,
            action: deleteRoleAction,
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
