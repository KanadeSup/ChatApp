import myFetch from '/api/myFetch'

export default async function (id) {
   const res = await myFetch({
      path: `Channel/${id}/roles`,
      headers: {
         "channel-id": id,
      },
   })
   const status = res.status
   const data = await res.json()
   return data
}
