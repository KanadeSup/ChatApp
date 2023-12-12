import myFetch from '/api/myFetch'
export default async (wid) => {
   const res = await myFetch({
      path: `workspace/${wid}/users`,
      headers: {
         "workspace-id": wid,
      },
   })
   const data = await res.json()
   return data
};
