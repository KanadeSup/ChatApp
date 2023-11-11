import baseUrl from "./baseUrl";
import apiKey from "./apiKey";
import useTokenStore from "/storages/useTokenStore"

export default async (name, avatar) => {
   const token = localStorage.getItem('token')
   const formData = new FormData()
   if(avatar.size != 0) formData.append("Avatar",avatar,"image")
   const res = await fetch(`https://api.firar.live/api/Workspace?Name=${name}`, {
      method: "POST",
      headers: {
         'accept': 'application/json',
         'x-apikey': apiKey,
         'Authorization': "Bearer " + token,
      },
      body: formData,
   })
   const data = await res.json()
   return [data.status, data]
};
