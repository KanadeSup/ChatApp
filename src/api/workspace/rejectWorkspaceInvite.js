import myFetch from "/api/myFetch";
export default async (wid) => {
   const res = await myFetch({
      path: `Workspace/${wid}/decline`,
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
