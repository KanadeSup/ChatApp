import AddRoleMember from './AddRoleMember';
import myFetch from '/api/myFetch'

export default async (wid, uids, rid) => {
   console.log(uid)
   await Promise.all(uids.map(async uid => {
      await AddRoleMember(wid,uid,rid)
   }))
   return "done"
};
