import myFetch from "./myFetch";

export default async function getMessagesColleague(conversationId, time, count, parentId, isChannel) {
   let params = `TimeCursor=${time}&Count=${count}`;
   if (isChannel) {
      params += `&ToChannelId=${conversationId}`;
   }
   else {
      params += `&ToUserId=${conversationId}`;
   }
   if (parentId) {
      params += `&ParentId=${parentId}`;
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
