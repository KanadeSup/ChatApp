import myFetch from '/api/myFetch'

export default async (email) => {
   const res = await myFetch({
      path: `User/search/email/${email}/10`,
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
