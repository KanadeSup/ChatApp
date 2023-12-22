import myFetch from "./myFetch"

export default async (id, logo, name, description) => {
   const workspaceRes = await myFetch({
      path: `Workspace/${id}`,
      method: "PUT",
      headers: {
         "Content-Type": "application/json",
         "workspace-id": id,
      },
      body: JSON.stringify({
         "name": name.trim(),
         "description": description.trim()
      })
   })
   if(!logo || logo.size === 0) return {
      data: null,
      status: workspaceRes.status,
      ok: workspaceRes.ok
   }
   const formData = new FormData()
   formData.append("Avatar", logo, "image")
   const avatarRes = await myFetch({
      path: `Workspace/${id}/avatar`,
      method: "PUT",
      body: formData
   })
   if(!workspaceRes.ok || !avatarRes.ok) {
      return {
         data: null,
         status: workspaceRes.status,
         ok: false
      }
   }
   return {
      data: null,
      status: workspaceRes.status,
      ok: true
   }
};
