import baseUrl from './baseUrl'
import apiKey from './apiKey'
import useTokenStore from '/storages/useTokenStore'

export default async function () {
   const token = localStorage.getItem('token')
   const res = await fetch(baseUrl("Workspace"), {
         method: "GET",
         headers: {
            'accept': 'application/json',
            'x-apikey': apiKey,
            'Authorization': token,
         }
      })
      const status = res.status
      const workspace = await res.json()
      return [status, workspace]
}
