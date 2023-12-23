import myFetch from '/api/myFetch'
export default async (wid, stype) => {
   const res = await myFetch({
      path: `workspace/${wid}/users/${stype ? stype : 1}`,
      headers: {
         "workspace-id": wid,
      },
   })
   const data = await res.json()
   return data
};
