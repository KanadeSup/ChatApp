import baseUrl from "./baseUrl";
import apiKey from "./apiKey";

export default async (id, logo, name, description) => {
   const token = localStorage.getItem('token')
   await fetch(`https://api.firar.live/api/Workspace/${id}/?Name=${name}&Description=${description}`, {
      method: "PUT",
      headers: {
         'accept': 'application/json',
         'x-apikey': apiKey,
         'Authorization': token,
      },
   })
   if(logo.size === 0) return
   const formData = new FormData()
   formData.append("Avatar", logo, "image")
   await fetch(`https://api.firar.live/api/Workspace/avatar?id=${id}`, {
      method: "PUT",
      headers: {
         'accept': 'application/json',
         'x-apikey': apiKey,
         'Authorization': token,
      },
      body: formData
   })
};
