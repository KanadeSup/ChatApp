import baseUrl from './baseUrl'
import apiKey from './apiKey'
import useTokenStore from '/storages/useTokenStore'

export default async function (id) {
   const token = localStorage.getItem('token')
   const res = await fetch(baseUrl(`Workspace/${id}`), {
      method: "GET",
      headers: {
         'accept': 'application/json',
         'x-apikey': apiKey,
         'Authorization': token,
      }
   })
   if (!res.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
   }
   const workspace = await res.json()
   return workspace
}
