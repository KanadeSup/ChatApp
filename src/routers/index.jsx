import { Outlet, createBrowserRouter, redirect, useNavigate, useRouteError } from "react-router-dom";
import auth from './auth.jsx'
import workspace from './workspace.jsx'
import colleagueChat from './colleagueChat.jsx'
import userSetting from './userSetting.jsx'
import notification from './notification.jsx'
import channel from './channel.jsx'
import { Button } from "/components/ui/button"
import Homepage from '/pages/Homepage'
import meeting from "./meeting.jsx";


function ErrorPage() {
   const navigate = useNavigate()
   let error = useRouteError();
   return (
      <div className="min-h-screen w-full flex items-center justify-center">
         <div className="flex flex-col items-center gap-2">
            <h1 className="font-bold text-4xl"> Oops ! </h1>
            <p className="text-lg"> Something went wrong.</p>
            <p className="text-md text-gray-500 italic mb-4"> {error.statusText || error.message} </p>
            <Button className="w-32 font-bold text-md"
               onClick={e=>navigate(0)}
            > 
               Try again 
            </Button>
         </div>
      </div>
   )
}
function Root() {
   return (
      <Outlet />
   )
}
export default createBrowserRouter([
   {
      path: "/",
      element: <Root />,
      loader: ({request}) => {
         if (new URL(request.url).pathname === "/") {
            return redirect("/Login");
          }
          return null;
      },
      errorElement: <ErrorPage />,
      children: [
         ...auth,
         ...workspace,
         ...colleagueChat,
         ...userSetting,
         ...notification,
         ...channel,
         ...meeting,
      ]
   },
])
