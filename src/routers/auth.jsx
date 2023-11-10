import Login from '/pages/Auth/Login'
import SignUp from '/pages/Auth/SignUp'
import ForgetPassword from '/pages/Auth/ForgetPassword'
import VerifyForgetPassword from '/pages/Auth/VerifyForgetPassword'

export default [
   {
      path: "/Login",
      element: <Login />
   },
   {
      path: "/Signup",
      element: <SignUp />
   },
   {
      path: "/ForgetPassword",
      element: <ForgetPassword />
   },
   {
      path: "/VerifyForgetPassword",
      element: <VerifyForgetPassword />
   },
]
