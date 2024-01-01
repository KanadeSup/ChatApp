import myFetch from "../myFetch";

export default async (cid) => {
   const res = await myFetch({
      path: `Channel/${cid}/leave`,
      method: "POST",
      headers: {
         "channel-id": cid,
      },
   });
   if(res.ok) {
      return {
         data: null,
         status: res.status,
         ok: res.ok,
      };
   }
   const data = await res.json()
   return {
      data: data,
      status: res.status,
      ok: res.ok,
   };
};
