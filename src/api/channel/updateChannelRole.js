import myFetch from "/api/myFetch"

export default async (cid, rid, roledata) => {
   const res = await myFetch({
      path: `Channel/${cid}/roles/${rid}`,
      method: "PUT",
      headers: {
         'Content-Type': 'application/json',
         "channel-id": cid,
      },
      body: JSON.stringify(roledata)
   })
   return {
      data: null,
      status: res.status,
      ok: res.ok,
   }
};
