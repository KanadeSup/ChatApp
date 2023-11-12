import Login from '/pages/Auth/Login'
import SignUp from '/pages/Auth/SignUp'
import GetOTPForgotPassword from '/pages/Auth/GetOTPForgotPassword'
import ForgotPassword from '/pages/Auth/ForgotPassword'
import VerifyForgetPassword from '/pages/Auth/VerifyForgetPassword'
import { redirect } from 'react-router-dom'
import { getWorkspaceList } from '/api'

const loginLoader = async function() {
   const token = localStorage.getItem("token");
   const tokenTimeOut = localStorage.getItem("tokenTimeOut");

   if (token) {
      const currentTime = new Date();
      let expiryTime;

      try {
         expiryTime = new Date(tokenTimeOut);
         if (tokenTimeOut && isNaN(expiryTime.getTime())) { // tokenTimeOut is not a valid date
            throw new Error('Invalid date');
         }
      } catch (error) {
         console.error('Invalid tokenTimeOut:', tokenTimeOut);
         return null;
      }

      if (currentTime < expiryTime) {
         const [status, wlist] = await getWorkspaceList()
         if (status === 401) {
            return null
         }
         return redirect("/");
      }
   }

   return null;
}


export default [
   {
      path: "login",
      element: <Login />,
      loader: loginLoader,
   },
   {
      path: "signup",
      element: <SignUp />
   },
   {
      path: "get-otp-forget-password",
      element: <GetOTPForgotPassword />
   },
   {
      path: "forgot-password",
      element: <ForgotPassword />
   },
   {
      path: "verify-forget-password",
      element: <VerifyForgetPassword />
   },
]
