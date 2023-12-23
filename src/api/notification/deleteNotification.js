import myFetch from '../myFetch'

export default async function(ids) {
   const res = await myFetch({
      path: `Notification`,
      method: "DELETE",
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(ids)
   })
   return {
      data: null,
      status: res.status,
      ok: res.ok,
   }
}