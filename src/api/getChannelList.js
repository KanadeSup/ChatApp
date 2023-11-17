import myFetch from './myFetch'
export default async function(wId) {
   const res = await myFetch({
      path: `Channel/workspace/${wId}`,
   })
   const workspace = await res.json()
   return workspace
}
