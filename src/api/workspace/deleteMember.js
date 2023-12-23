import myFetch from "../myFetch"

export default async (wid, uid) => {
   const res = await myFetch({
      path:`Workspace/${wid}/members`,
      method: "DELETE",
      headers: {
         "workspace-id": wid,
         'Content-Type': 'application/json'

      },
      body: JSON.stringify([uid])
   })
   const data = await res.json()
   return {
      data: data,
      status: res.status,
      ok: res.ok,
   }
};
