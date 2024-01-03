import myFetch from '/api/myFetch'

export default async (wid, value, num) => {
   const res = await myFetch({
      path: `User/workspace/${wid}/search-user-not-in-workspace/${value}/${num}`,
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
