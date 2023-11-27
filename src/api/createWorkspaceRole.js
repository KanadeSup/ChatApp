import myFetch from './myFetch'

export default async (wid, roledata) => {
   const res = await myFetch({
      path: `Workspace/${wid}/roles`,
      method: "POST",
      headers: {
         "workspace-id": wid,
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(roledata),
   })
   const data = await res.json()
   return data
};
