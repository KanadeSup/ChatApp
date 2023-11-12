import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { getOTP } from "/api";
import { useNavigate } from "react-router-dom";

export default function GetOTPForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState("");

  let navigate = useNavigate();

  async function handleForgetPassword() {
    try {
      setIsLoading(true);
      const response = await getOTP(3, email);
      if (response && response.status === 400) {
        setNotification(response.title);
        setIsLoading(false);
        return;
      }

      localStorage.setItem("email", email);
      navigate("/forgot-password");
      
    } catch (error) {
      console.error(error);
      setNotification("An error occurred while sending email.");
    }
  }
  return (
    <>
      <div className="min-h-screen flex items-start bg-gradient-to-r from-gray-200 to-gray-400">
        <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
          <h1 className="w-1/2 mx-auto mb-4">
            <img src="assets\img\logo-no-background.png" alt="" />
          </h1>

          <div className="bg-white w-full rounded-md divide-gray-200 shadow-xl">
            <div className="text-center pt-6 pb-5">
              <h1 className="font-bold text-2xl text-gray-900">
                Forget Password
              </h1>
            </div>

            <div className="px-5 pb-1">
              <label className="font-semibold text-sm text-gray-600 pb-1 block">
                Enter your email
              </label>
              <div className="flex mb-2">
                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                  <i className="mdi mdi-email-outline text-gray-400 text-lg" />
                </div>
                <input
                  type="email"
                  className="w-full -ml-10 pl-10 pr-3 py-2 rounded-md border-[1.5px] border-gray-300 outline-none focus:border-indigo-500"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="text-red-500 font-medium text-sm h-6">
                {notification}
              </div>
              {isLoading ? (
                <Button disabled className="w-full">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button className="w-full" onClick={handleForgetPassword}>
                  Send
                </Button>
              )}

              

              <div class="flex justify-center mt-3 mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4 inline-block"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16l-4-4m0 0l4-4m-4 4h18"
                  />
                </svg>
                <Link to={"/login"} class="text-xs mx-1 font-semibold">
                  Back to login page
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
