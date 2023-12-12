import myFetch from "./myFetch";

export default async function getMessages(conversationId, time, count) {
   const res = await myFetch({
      path: `Messages`,
      params: `TimeCursor=${time}&Count=${count}&ToUserId=${conversationId}`,
      headers: {
         "accept": "text/plain",
      },
   })
   const status = res.status
   const data = await res.json()
   return data
}