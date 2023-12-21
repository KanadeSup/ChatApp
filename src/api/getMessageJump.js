import myFetch from "./myFetch";

export default async function getMessageJump(messageId) {
    let params = `MessageId=${messageId}`
   const res = await myFetch({
      path: `Messages/jump`,
      params: params,
      headers: {
         "accept": "text/plain",
      },
   })
   const status = res.status
   const data = await res.json()
   return data
}