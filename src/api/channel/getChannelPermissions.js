import myFetch from '/api/myFetch'
export default async function () {
   const res = await myFetch({
      path: `Channel/permissions`,
   })
   const status = res.status
   const data = await res.json()
   return data
}
