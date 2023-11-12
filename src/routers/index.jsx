import { createBrowserRouter } from "react-router-dom";
import auth from './auth.jsx'
import workspace from './workspace.jsx'
import colleagueChat from './colleagueChat.jsx'
import userSetting from './userSetting.jsx'
import notification from './notification.jsx'

export default createBrowserRouter([
   ...auth,
   ...workspace,
   ...colleagueChat,
   ...userSetting,
   ...notification,
])
