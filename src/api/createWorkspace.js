import myFetch from './myFetch'

export default async (name, avatar) => {
   const formData = new FormData()
   formData.append("Name",name)
   if(avatar.size != 0) formData.append("Avatar",avatar,"image")
   const res = await myFetch({
      path: "Workspace",
      method: "POST",
      body: formData,
   })
   const data = await res.json()
   return [data.status, data]
};
