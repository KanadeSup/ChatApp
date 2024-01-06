import myFetch from './myFetch'

export default async (wid, roledata) => {
   console.log(roledata)
   const res = await myFetch({
      path: `Workspace/${wid}/roles`,
      method: "POST",
      headers: {
         "workspace-id": wid,
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(roledata),
   })
   return {
      data: null,
      status: res.status,
      ok: res.ok
   }
};
