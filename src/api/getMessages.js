import myFetch from "./myFetch";

export default async function getMessages(channelId, time, count) {
   const res = await myFetch({
      path: `Messages`,
      params: `TimeCursor=${time}&Count=${count}&ToChannelId=${channelId}`,
      headers: {
         "accept": "text/plain",
      },
   })
   const status = res.status
   const data = await res.json()
   return data
}