import myFetch from '/api/myFetch'
import getUserByEmail from '/api/user/getUserByEmail'
import addUsers from './addUsers'

export default async (wid, emails) => {
   const uids = []
   let res;
   await Promise.all(emails.map(async email => {
      const res = await getUserByEmail(email)
      if(!res.ok) return {
         data: null,
         status: res.status,
         ok: res.ok,
      }
      if(res.data.length !== 0) uids.push(res.data[0].id)
   }))
   if(uids.length !== 0 ) {
      res = await addUsers(wid, uids)
      if(!res.ok) return {
         data: null,
         status: res.status,
         ok: res.ok
      }
   }
   
   return {
      data: null,
      status: 200,
      ok: true,
   }
};
