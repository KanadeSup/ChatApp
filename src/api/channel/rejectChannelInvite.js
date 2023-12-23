import myFetch from "/api/myFetch";
export default async (cid) => {
   const res = await myFetch({
      path: `Channel/${cid}/decline-invitation`,
      method: "POST",
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
