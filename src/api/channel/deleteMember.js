import myFetch from '../myFetch'

export default async (cid, uid) => {
   const res = await myFetch({
      path: `Channel/${cid}/members`,
      method: "DELETE",
      headers: {
         "channel-id": cid,
         'Content-Type': 'application/json'
      },
      body: JSON.stringify([uid])
   })
   const data = await res.json()
   return {
        data: data,
        status: res.status,
        ok: res.ok,
   }
};