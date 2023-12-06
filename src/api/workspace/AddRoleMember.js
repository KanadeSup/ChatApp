import myFetch from '/api/myFetch'
export default async (wid, uid, rid) => {
   const res = await myFetch({
      path: `Workspace/${wid}/users/${uid}/roles`,
      method: "PUT",
      headers: {
         "workspace-id": wid,
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({id: rid})
   })
   return "done"
};
