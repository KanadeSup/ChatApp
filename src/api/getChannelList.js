import myFetch from './myFetch'
export default async function(wId, channelId) {
   const res = await myFetch({
      path: `Channel/workspace/${wId}`,
      headers: {
         'workspace-id': wId,
         'channel-id': channelId
      }
   })
   const workspace = await res.json()
   return workspace
}
