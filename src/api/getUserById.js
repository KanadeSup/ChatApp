import myFetch from './myFetch'

export default async (userId) => {
   const res = await myFetch({
      path: `User/${userId}`,
   })
   const data = await res.json()
   return data
};
