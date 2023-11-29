import myFetch from "./myFetch"

export default async (id, logo, name, description) => {
   const res = await myFetch({
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
   if(!logo || logo.size === 0) return
   console.log("done")
   const formData = new FormData()
   formData.append("Avatar", logo, "image")
   await myFetch({
      path: `Workspace/${id}/avatar`,
      method: "PUT",
      body: formData
   })
};
