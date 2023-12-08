import myFetch from '/api/myFetch'
export default async (wid) => {
   const res = await myFetch({
      path: `User/workspace/${wid}`,
      headers: {
         "workspace-id": wid,
      },
   })
   const data = await res.json()
   return data
};
