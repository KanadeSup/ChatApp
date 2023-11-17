const apiKey = "5J0jCR1dAkvDt3YVoahpux0eawahkQB9"
const baseUrl = "https://api.firar.live/api"
export default async function({ path, params="", method="GET", headers={}, auth=true, body="" }) { 
   const token = localStorage.getItem('token')
   headers["x-apikey"] = apiKey
   if(auth) headers['Authorization'] = `Bearer ${token}`
   if(!headers.hasOwnProperty('accept')) headers['accept'] = 'application/json'
   const request = {
      method: method,
      headers: headers,
   }
   if(body !== "") request["body"] = body
   const res = await fetch(`${baseUrl}/${path}?${params}`, request)
   if(res.status === 401) {
      location.href = "/Login";
   }
   return res
}
