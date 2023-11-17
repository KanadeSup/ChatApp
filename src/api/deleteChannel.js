import myFetch from './myFetch'

export default async function (id) {
   const res = await myFetch({
      path: `Channel/${id}`,
      method:"DELETE",
   })
   const data = await res.json()
   return data 
}
