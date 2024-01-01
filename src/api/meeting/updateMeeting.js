import myFetch from '../myFetch'
export default async function (wid, cid, mid, name, password, description, start, end, members) {
   const res = await myFetch({
      path: `Meeting/update/${mid}`,
      method: "PUT",
      headers: {
         "Content-Type": "application/json",
         "workspace-id": wid ? wid : undefined,
         "channel-id": cid ? cid : undefined,
      },
      body: JSON.stringify({
         "name": name.trim(),
         "password": password,
         "description": description,
         "timeStart": start,
         "timeEnd": end,
         "memberIds": members,
      }),
   })
   return {
      data: null,
      status: res.status,
      ok: res.ok
   }
}
