import myFetch from '/api/myFetch'

export default async (email) => {
   const res = await myFetch({
      path: `User/search/email/${email}`,
   })
   const data = await res.json()
   return data
};
