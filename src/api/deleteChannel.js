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
   return {
      data: null,
      status: res.status,
      ok: res.ok
   }
}
