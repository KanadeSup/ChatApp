import myFetch from '/api/myFetch'
export default async (wid, rid) => {
   const res = await myFetch({
      path: `Workspace/${wid}/roles/${rid}/members`,
      headers: {
         "workspace-id": wid,
      },
   })
   const data = await res.json()
   return data
};
