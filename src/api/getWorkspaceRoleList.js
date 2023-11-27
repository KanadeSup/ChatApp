import myFetch from './myFetch'
export default async function (id) {
   const res = await myFetch({
      path: `Workspace/${id}/roles`,
      headers: {
         "workspace-id": id,
      },
   })
   const status = res.status
   const data = await res.json()
   return data
}
