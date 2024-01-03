import myFetch from "../myFetch";

export default async (wid, uid) => {
   const res = await myFetch({
      path: `Workspace/${wid}/ownership/${uid}`,
      method: "PUT",
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
