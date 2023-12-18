import config from "../appconfig.js"

export default async function({ path, params="", method="GET", headers={}, auth=true, body="" }) { 
   const token = localStorage.getItem('token')
   headers["x-apikey"] = config.apiKey
   if(auth) headers['Authorization'] = `Bearer ${token}`
   if(!headers.hasOwnProperty('accept')) headers['accept'] = 'application/json'
   const request = {
      method: method,
      headers: headers,
   }
   if(body !== "") request["body"] = body
   const res = await fetch(`${config.apiURL}/${path}?${params}`, request)
   if(res.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      location.href = "/Login";
   }
   return res
}

