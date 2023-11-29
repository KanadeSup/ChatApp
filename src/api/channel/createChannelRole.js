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
   const data = await res.json()
   return data
};
