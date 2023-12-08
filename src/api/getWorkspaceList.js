import myFetch from './myFetch'
export default async function () {
   const res = await myFetch({
      path: "Workspace"
   })
   const status = res.status
   const data = await res.json()
   return data
}
