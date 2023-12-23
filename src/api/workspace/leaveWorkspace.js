import myFetch from "../myFetch";

export default async (wid) => {
   const res = await myFetch({
      path: `Workspace/${wid}/leave`,
      method: "POST",
      headers: {
         "workspace-id": wid,
      },
   });
   return {
      data: null,
      status: res.status,
      ok: res.ok,
   };
};
