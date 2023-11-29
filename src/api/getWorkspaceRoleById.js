import myFetch from './myFetch'

export default async (wid, rid) => {
   const res = await myFetch({
      path: `Workspace/${wid}/roles/${rid}`,
   })
   const data = await res.json()
   return data
};
