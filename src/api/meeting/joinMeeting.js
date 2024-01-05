import myFetch from "../myFetch";

export default async function (sessionId, password) {
   const res = await myFetch({
      path: "Meeting/join",
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify({
         "sessionId": sessionId,
         "password": password
      })
   });
   if (res.status === 404) {
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
