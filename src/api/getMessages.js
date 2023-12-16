import myFetch from "./myFetch";

export default async function getMessages(channelId, count, time) {
   let params = `Count=${count}&ToChannelId=${channelId}`
   if (time) {
      params += `&TimeCursor=${time}`
   }
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