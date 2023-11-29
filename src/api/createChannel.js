import myFetch from './myFetch'
export default async function (name, wId) {
   const res = await myFetch({
      path: "Channel",
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         "workspace-id": wId,
      },
      body: JSON.stringify({
         "name": name.trim(),
         "description": "",
         "workspaceId": wId,
      }),
   })
   const data = await res.json()
   return data
}
