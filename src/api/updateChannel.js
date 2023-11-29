import myFetch from "./myFetch"
export default async (wid,cid, name, description) => {
   const res = await myFetch({
      path: `Channel/${cid}`,
      method: "PUT",
      headers: {
         "Content-Type": "application/json",
         "channel-id": cid,
         "workspace-id": wid,
      },
      body: JSON.stringify({
         "name": name.trim(),
         "description": description.trim()
      })
   })
};
