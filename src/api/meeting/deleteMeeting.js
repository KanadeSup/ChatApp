import myFetch from "../myFetch"

export default async (id) => {
   const formData = new FormData()
   const res = await myFetch({
      path:`Meeting/delete/${id}`,
      method: "DELETE",
   })
   return {
      data: null,
      status: res.status,
      ok: res.ok
   }
};
