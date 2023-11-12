import Login from '/pages/Auth/Login'
import SignUp from '/pages/Auth/SignUp'
import GetOTPForgotPassword from '/pages/Auth/GetOTPForgotPassword'
import ForgotPassword from '/pages/Auth/ForgotPassword'
import VerifyForgetPassword from '/pages/Auth/VerifyForgetPassword'

export default [
   {
      path: "login",
      element: <Login />
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
