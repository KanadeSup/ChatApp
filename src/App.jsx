import { createRoot } from 'react-dom/client'
import CreateForm from './pages/WorkspaceManager/CreateForm'
import WSection from './pages/WorkspaceManager/WorkspaceSection'
import ChatBox from '/components/ChatBox'
import ColleagueChat from '/pages/ColleagueChat'
import Login from '/pages/Auth/Login'
import SignUp from '/pages/Auth/SignUp'
import ForgetPassword from '/pages/Auth/ForgetPassword'
import VerifyForgetPassword from '/pages/Auth/VerifyForgetPassword'
import UserSetting from '/pages/UserSetting'
import Notification from './pages/Notification'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import WManager from './pages/WorkspaceManager/'
import SettingSection from './pages/UserSetting/SettingSection'
import WSetting from './pages/WorkspaceSetting'
import Overview from './pages/WorkspaceSetting/Overview'
import MemberManage from './pages/WorkspaceSetting/MemberManage'
import InviteMember from './pages/WorkspaceSetting/InviteMember'

const router = createBrowserRouter([
   {
      path: "/",
      element: <WManager />,
      children: [
         { index: true, element: <WSection /> },
         {
            path: "CreateWorkspace",
            element: <CreateForm />
         }
      ]
   },
   {
      path: "/usersetting",
      element: <UserSetting />,
      children: [
         { index: true, element: <SettingSection />},
      ]
   },
   {
      path: "/WorkspaceSetting",
      element: <WSetting />,
      children: [
         { index: true, element: <Overview />},
         {
            path: "MemberManage",
            element: <MemberManage />
         },
         {
            path: "InviteMember",
            element: <InviteMember />
         }
      ]
   },
   {
      path: "/colleague",
      element: <ColleagueChat />
   },
   {
      path: "login",
      element: <Login />
   },
   {
      path: "signup",
      element: <SignUp />
   },
   {
      path: "forget-password",
      element: <ForgetPassword />
   },
   {
      path: "verify-forget-password",
      element: <VerifyForgetPassword />
   },
   {
      path: "notification",
      element: <Notification />
   }
])
const App = function(){
   return (
      <RouterProvider router={router} />
   )
} 
const node = document.querySelector("#root")
const root = createRoot(node)
root.render(<App />)
