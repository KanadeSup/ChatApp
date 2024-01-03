import myFetch from '/api/myFetch'

export default async function (cid) {
   const res = await myFetch({
      path: `Channel/${cid}/users`,
      headers: {
         "channel-id": cid,
      },
   })
   const data = await res.json()
   console.log(data)
   return data
}
