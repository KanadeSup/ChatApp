import myFetch from '../myFetch'

export default async (cid, rid) => {
   const res = await myFetch({
      path: `Channel/${cid}/roles/${rid}`,
      method: "DELETE",
      headers: {
         "channel-id": cid,
      },
   })
   return "done"
};
