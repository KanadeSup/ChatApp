import myFetch from './myFetch'

export default async function (wid, cid) {
   const res = await myFetch({
      path: `Channel/${cid}`,
      method:"DELETE",
      headers: {
         "channel-id": cid,
         "workspace-id": wid,
      },
   })
   const data = await res.json()
   return data 
}
