import myFetch from '/api/myFetch'
export default async (wid, uids) => {
   const res = await myFetch({
      path: `Workspace/${wid}/members`,
      method: "POST",
      headers: {
         "workspace-id": wid,
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(uids),
   })
   const data = await res.json()
   return data
};
