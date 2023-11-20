import ChannelSetting from "/pages/ChannelSetting"
import Overview from "/pages/ChannelSetting/Overview"
import Privacy from "/pages/ChannelSetting/Privacy"
import { deleteChannel } from "/api"
import { redirect } from "react-router-dom"

const deleteChannelAction = async function({ request, params }) {
   const { workspaceId, channelId } = params
   const formData = await request.formData();
   console.log(workspaceId, formData.get("cid"))
   await deleteChannel(workspaceId, channelId)
   return redirect(`/Workspace/${workspaceId}`)
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
         }
      ]
   },
]
