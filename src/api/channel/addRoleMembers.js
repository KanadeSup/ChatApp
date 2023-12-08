import myFetch from '/api/myFetch'
export default async (cid, uid, rid) => {
   const res = await myFetch({
      path: `Channel/${cid}/users/${uid}/roles`,
      method: "PUT",
      headers: {
         "channel-id": cid,
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({id: rid})
   })
   return "done"
};
