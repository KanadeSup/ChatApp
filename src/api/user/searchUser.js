import myFetch from '/api/myFetch'

export default async (value) => {
   const res = await myFetch({
      path: `User/search/${value}/15`,
   })
   if(!res.ok) {
      return {
         data: null,
         status: res.status,
         ok: res.ok,
      }
   }
   const data = await res.json()
   return {
      data: data,
      status: res.status,
      ok: res.ok,
   }
};
