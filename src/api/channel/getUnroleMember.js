import myFetch from '/api/myFetch'
export default async (cid) => {
   const res = await myFetch({
      path: `Channel/${cid}/members/withoutrole`,
      headers: {
         "channel-id": cid,
         'Content-Type': 'application/json'
      },
   })
   const data = await res.json()
   return data
};
