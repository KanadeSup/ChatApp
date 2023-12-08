import myFetch from '/api/myFetch'
export default async (cid, rid) => {
   const res = await myFetch({
      path: `Channel/${cid}/roles/${rid}/members`,
      headers: {
         "channel-id": cid,
      },
   })
   const data = await res.json()
   return data
};
