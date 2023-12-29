import myFetch from './myFetch'
export default async function(cId) {
   const res = await myFetch({
      path: `Channel/${cId}`,
      headers: {
         "channel-id": cId,
      }
   })
   const workspace = await res.json()
   return workspace
}
