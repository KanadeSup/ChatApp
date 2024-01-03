import myFetch from "../myFetch";

export default async (cid, uid) => {
   const res = await myFetch({
      path: `Channel/${cid}/ownership/${uid}`,
      method: "PUT",
      headers: {
         "channel-id": cid,
      },
   });
   return {
      data: null,
      status: res.status,
      ok: res.ok,
   };
};
