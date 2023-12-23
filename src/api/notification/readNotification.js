import myFetch from "../myFetch";

export default async function (nid) {
   const res = await myFetch({
      path: `Notification/${nid}`,
      method: "PUT",
   });

   return {
      data: null,
      status: res.status,
      ok: res.ok,
   };
}
