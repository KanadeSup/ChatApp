import myFetch from '/api/myFetch'
export default async (wid) => {
   const res = await myFetch({
      path: `Workspace/${wid}/members/withoutrole`,
      headers: {
         "workspace-id": wid,
         'Content-Type': 'application/json'
      },
   })
   const data = await res.json()
   return data
};
