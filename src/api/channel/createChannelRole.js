import myFetch from '/api/myFetch'

export default async (cid, roledata) => {
   const res = await myFetch({
      path: `Channel/${cid}/roles`,
      method: "POST",
      headers: {
         "channel-id": cid,
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(roledata),
   })
   return {
      data: null,
      status: res.status,
      ok: res.ok,
   }
};
