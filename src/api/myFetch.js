import config from "../appconfig.js"
import OneSignal from "react-onesignal";
import checkRefreshTokenTimeOut from "../utils/checkRefreshTokenTimeOut.js";
export default async function ({ path, params = "", method = "GET", headers = {}, auth = true, body = "" }) {
   const token = localStorage.getItem('token')
   headers["x-apikey"] = config.apiKey
   if (auth) headers['Authorization'] = `Bearer ${token}`
   if (!headers.hasOwnProperty('accept')) headers['accept'] = 'application/json'
   const request = {
      method: method,
      headers: headers,
   }
   if (body !== "") request["body"] = body
   let res = await fetch(`${config.apiURL}/${path}?${params}`, request)
   console.log(`${config.apiURL}/${path}?${params}`)
   if (res.status === 401) {
      // res = await fetch(`${config.apiURL}/auth/refresh-token`, {
      //    method: "POST",
      //    headers: {
      //       "x-apikey": config.apiKey,
      //       "Content-Type": "application/json",
      //    },
      //    body: JSON.stringify({ refreshToken: localStorage.getItem("refreshToken") }),
      // })
      // console.log(res)
      // if (res.status === 200) {
      //    console.log("da chay refresh token")
      //    const data = await res.json()
      //    localStorage.setItem("token", data.token)
      //    localStorage.setItem("tokenTimeOut", data.tokenTimeOut)
      //    localStorage.setItem("refreshToken", data.refreshToken)
      //    localStorage.setItem("refreshTokenTimeOut", data.refreshTokenTimeOut)
      //    return await fetch(`${config.apiURL}/${path}?${params}`, request)
      // }

      OneSignal.logout()
      location.href = "/Login";
   }
   return res
}

