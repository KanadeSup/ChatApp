import myFetch from "./myFetch";

export default async function getMessages(channelId, count, time, isBefore) {
   let params = `Count=${count}&ToChannelId=${channelId}`
   if (isBefore === false) {
      params += `&IsBefore=${false}`
   }
   if (time) {
      params += `&TimeCursor=${time}`
   }
   console.log("dskddj param:", params)
   const res = await myFetch({
      path: `Messages`,
      params: params,
      headers: {
         "accept": "text/plain",
      },
   })
   const status = res.status
   const data = await res.json()
   return data
}