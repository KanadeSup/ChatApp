import myFetch from "../myFetch";
export default async function (mid) {
   const res = await myFetch({
      path: `Meeting/getMeeting/${mid}`,
      headers: {
         "Content-Type": "application/json",
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
