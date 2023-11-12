import Login from '/pages/Auth/Login'
import SignUp from '/pages/Auth/SignUp'
import GetOTPForgotPassword from '/pages/Auth/GetOTPForgotPassword'
import ForgotPassword from '/pages/Auth/ForgotPassword'
import VerifyForgetPassword from '/pages/Auth/VerifyForgetPassword'
import { redirect } from 'react-router-dom'

const loginLoader = async function() {
   const token = localStorage.getItem("token");
   if (token) {
      return redirect("/")
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
