import myFetch from "../myFetch";
export default async function (wid) {
   const res = await myFetch({
      path: "Meeting/getMeetings",
      headers: {
         "Content-Type": "application/json",
         "workspace-id": wid
      },
   });
   if (!res.ok) {
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
      ok: res.ok
   }
}
