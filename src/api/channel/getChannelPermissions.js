import myFetch from '/api/myFetch'
export default async function (cid) {
   const res = await myFetch({
      path: `Channel/permissions`,
      headers: {
         "channel-id": cid
      }
   })
   const status = res.status
   const data = await res.json()
   return data
}
