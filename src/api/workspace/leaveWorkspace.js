import myFetch from "../myFetch";

export default async (wid) => {
   const res = await myFetch({
      path: `Workspace/${wid}/leave`,
      method: "POST",
      headers: {
         "workspace-id": wid,
      },
   });
   if(res.ok) {
      return {
         data: null,
         status: res.status,
         ok: res.ok,
      }
   }
   const data = await res.json()
   return {
      data: data,
      status: res.status,
      ok: res.ok,
   };
};
