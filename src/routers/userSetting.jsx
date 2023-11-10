import UserSetting from '/pages/UserSetting'
import Account from '/pages/UserSetting/Account'
import Profile from '/pages/UserSetting/Profile'
export default [
   {
      path: "/UserSetting",
      element: <UserSetting />,
      children: [
         { index: true, element: <Account />},
         {
            path: "Profile",
            element: <Profile />
         },
      ]
   },
]
