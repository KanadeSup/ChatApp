import ChannelSetting from "/pages/ChannelSetting"
import Overview from "/pages/ChannelSetting/Overview"
import Privacy from "/pages/ChannelSetting/Privacy"
import Roles from "/pages/ChannelSetting/Roles"
import RoleCreator from '/pages/ChannelSetting/RoleCreator'
import RoleEditor from '/pages/ChannelSetting/RoleEditor'
import { deleteChannel } from "/api"
import { defer, redirect } from "react-router-dom"
import { getChannelRoleList } from "/api/channel"

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
            path: "Privacy",
            element: <Privacy />
         }, 
         {
            path: "Role",
            element: <Roles />,
            loader: channelRolesLoader,
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
