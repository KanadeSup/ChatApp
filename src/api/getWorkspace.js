import baseUrl from './baseUrl'
import apiKey from './apiKey'
import useTokenStore from '/storages/useTokenStore'
import myFetch from './myFetch'

export default async function (id) {
   const token = localStorage.getItem('token')
   const res = await myFetch({
      path: `Workspace/${id}`,
      method:"GET",
      headers: {
         'workspace-id': id
      }
   })
   if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
   }
   const workspace = await res.json()
   return workspace
}
