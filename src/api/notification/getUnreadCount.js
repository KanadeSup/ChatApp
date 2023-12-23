import myFetch from '../myFetch'

export default async function() {
   const res = await myFetch({
      path: `Notification/count`,
   })
   const data = await res.json()
   return {
      data: data,
      status: res.status,
      ok: res.ok,
   }
}