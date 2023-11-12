import baseUrl from './baseUrl'
import apiKey from './apiKey'
import useTokenStore from '/storages/useTokenStore'

export default async function () {
   const token = localStorage.getItem('token')
   try {
      const res = await fetch(baseUrl("Workspace"), {
            method: "GET",
            headers: {
               'accept': 'application/json',
               'x-apikey': apiKey,
               'Authorization': "Bearer " + token,
            }
         })
         const status = res.status
         const workspace = await res.json()
         console.log(workspace);
         console.log("fdggf", status);
         return [status, workspace]
   } catch (error) {
      console.error('Error fetching data:', error);
      return [401, null]
   }
}
