import myFetch from '/api/myFetch'

export default async (wid, emails) => {
   const res = await myFetch({
      path: `Workspace/${wid}/members`,
      method: "POST",
      headers: {
         "workspace-id": wid,
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(emails),
   })
   return {
      data: null,
      status: res.status,
      ok: res.ok,
   }
};
