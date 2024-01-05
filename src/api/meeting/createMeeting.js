import myFetch from '../myFetch'
export default async function (wid, cid, id, name, password, description, start, end, members) {
   const res = await myFetch({
      path: "Meeting/createMeeting",
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         "workspace-id": wid ? wid : undefined,
         "channel-id": cid ? cid : undefined,
      },
      body: JSON.stringify({
         "sessionId": id,
         "name": name.trim(),
         "password": password,
         "description": description,
         "timeStart": start,
         "timeEnd": end,
         "memberIds": members,
         "workspaceId": wid ? wid : undefined,
         "channelId": cid ? cid : undefined,
      }),
   })
   return {
      data: null,
      status: res.status,
      ok: res.ok
   }
}
