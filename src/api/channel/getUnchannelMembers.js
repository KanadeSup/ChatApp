import myFetch from '/api/myFetch'

export default async function (wid, cid) {
   const res = await myFetch({
      path: `Channel/workspace/${wid}/channel/${cid}/user-not-in-channel`,
      method: "GET",
      headers: {
         "workspace-id": wid,
         "channel-id": cid,
      },
   })
   if(!res.ok) {
      return {
         data: null,
         status: res.status,
         ok: res.ok
      }
   }
   const data = await res.json()
   return {
      data: data,
      status: res.status,
      ok: res.ok,
   }
}
