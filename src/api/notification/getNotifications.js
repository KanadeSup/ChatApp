import myFetch from '../myFetch'

export default async function(offset, limit) {
   const res = await myFetch({
      path: `Notification`,
      params: `Offset=${offset}&Limit=${limit}`
   })
   if(!res.ok) {
      return {
         data: null,
         status: res.status,
         ok: res.ok,
      }
   }
   const notifications = await res.json()
   notifications.map(noti => {
      noti["data"] = JSON.parse(noti["data"])
   })
   return {
      data: notifications,
      status: res.status,
      ok: res.ok,
   }
}