import myFetch from './myFetch'

export default async (wid, rid) => {
   const res = await myFetch({
      path: `Workspace/${wid}/roles/${rid}`,
      method: "DELETE",
      headers: {
         "workspace-id": wid,
      }
   })
   return {
      data: null,
      status: res.status,
      ok: res.ok
   }
};
