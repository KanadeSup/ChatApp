import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { login } from "/api";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  let navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
    setIsLoading(false);
  }, [navigate]);


  async function handleLogin() {
    if (username === "" || password === "") {
      setError("Username or password is empty.");
      return;
    }
    try {
      setIsLoadingButton(true);
      const response = await login(username, password);

      if (response.status === 400) {
        setError(response.title);
        setIsLoadingButton(false);
        return;
      }

      localStorage.setItem("token", response.token);
      localStorage.setItem("refreshToken", response.refreshToken);

      navigate("/");
    } catch (error) {
      console.error(error);
      setError("An error occurred while logging in.");
    }
  }

  return (
    <div className="min-h-screen flex items-start bg-gradient-to-r from-gray-200 to-gray-400">
      <div className="p-10 xs:p-0 mx-auto w-full max-w-md">
        <h1 className="w-1/2 mx-auto mb-4">
          <img src="assets\img\logo-no-background.png" alt="" />
        </h1>

        <div className="bg-white shadow-2xl w-full rounded-md divide-gray-200">
          <div className="text-center pt-6 pb-1">
            <h1 className="font-bold text-3xl text-gray-900">Sign in</h1>
          </div>

          <div className="px-5 py-1">
            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              Username
            </label>
            <div className="flex mb-2">
              <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                <i className="mdi mdi-email-outline text-gray-400 text-lg" />
              </div>
              <input
                type="text"
                className="w-full -ml-10 pl-10 pr-3 py-2 rounded-md border-[1.5px] border-gray-300 outline-none focus:border-indigo-500"
                placeholder=""
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              Password
            </label>
            <div className="flex mb-2">
              <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                <i className="mdi mdi-lock-outline text-gray-400 text-lg" />
              </div>
              <input
                type="password"
                name="password"
                className="w-full -ml-10 pl-10 pr-3 py-2 rounded-md border-[1.5px] border-gray-300 outline-none focus:border-indigo-500"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="text-right">
              <Link
                to={"/get-otp-forget-password"}
                className="text-sm font-semibold mt-2 block"
              >
                <span className="inline-block text-black hover:underline">
                  Forgot Password?
                </span>
              </Link>
            </div>

            <div className="text-red-500 font-medium text-sm h-6">{error}</div>

            {isLoadingButton ? (
              <Button disabled className="w-full">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button className="w-full" onClick={() => handleLogin()}>
                Login
              </Button>
            )}

            <button className="flex flex-wrap justify-center mt-4 w-full border border-gray-300 hover:border-gray-500 py-1.5 rounded-md">
              <img
                className="w-5 mr-2"
                src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
              />
              Sign in with Google
            </button>

            <div className="flex justify-center my-5">
              <span className="text-sm text-gray-400 font-semibold">
                Don't have account?
              </span>
              <Link
                to={"/signup"}
                className="text-sm mx-1 font-semibold border-black hover:underline"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
