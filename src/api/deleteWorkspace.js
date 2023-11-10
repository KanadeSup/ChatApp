import baseUrl from "./baseUrl";
import apiKey from "./apiKey";
import useTokenStore from '/storages/useTokenStore'

export default async (id) => {
   const token = localStorage.getItem('token')
   const formData = new FormData()
   const res = await fetch(`https://api.firar.live/api/Workspace?id=${id}`, {
      method: "DELETE",
      headers: {
         'accept': 'application/json',
         'x-apikey': apiKey,
         'Authorization': token,
      },
   })
};
