import addRoleMember from './addRoleMember';
import myFetch from '/api/myFetch'

export default async (wid, uids, rid) => {
   await Promise.all(uids.map(async uid => {
      await addRoleMember(wid,uid,rid)
   }))
   return "done"
};
