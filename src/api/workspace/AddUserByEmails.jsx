import myFetch from '/api/myFetch'
import getUserByEmail from '/api/user/getUserByEmail'
import addUsers from './addUsers'

export default async (wid, emails) => {
   const uids = []
   await Promise.all(emails.map(async email => {
      const user = await getUserByEmail(email)
      if(user.length !== 0) uids.push(user[0].id)
   }))
   if(uids.length !== 0 )
      await addUsers(wid, uids)
   return "done"
};
