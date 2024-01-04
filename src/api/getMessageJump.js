import myFetch from "./myFetch";

export default async function getMessageJump(messageId) {
   let params = `MessageId=${messageId}`
   console.log("params: ", params);
   const res = await myFetch({
      path: `Messages/jump`,
      params: params,
      headers: {
         "accept": "text/plain",
      },
   })
   const status = res.status
   const data = await res.json()
   console.log("data length: ", data.length);
   return data
}