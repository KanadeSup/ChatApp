import { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin() {
    const response = login(email, password);
    console.log(response);
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col justify-start border-solid">
        <div className="p-10 xs:p-0 mx-auto w-full max-w-md">
          <h1 className="w-1/2 mx-auto mb-4">
            <img src="assets\img\logo-no-background.png" alt="" />
          </h1>

          <div className="bg-white shadow w-full rounded-lg divide-gray-200">
            <div className="text-center pt-6 pb-1">
              <h1 className="font-bold text-2xl text-gray-900">Sign in</h1>
            </div>

            <div className="px-5 py-1">
              <label className="font-semibold text-sm text-gray-600 pb-1 block">
                E-mail
              </label>
              <div className="flex mb-2">
                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                  <i className="mdi mdi-email-outline text-gray-400 text-lg" />
                </div>
                <input
                  type="email"
                  className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                  placeholder="123@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
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
                  className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                  placeholder="************"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="text-red-500 text-xs italic">{error}</div>
              <div className="text-right my-1">
                <Link
                  to={"/forget-password"}
                  className="text-xs font-semibold mt-1 block"
                >
                  <span className="inline-block text-blue-600">
                    Forgot Password?
                  </span>
                </Link>
              </div>
              <button
                onClick={() => handleLogin()}
                className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
              >
                <span className="inline-block mr-2">Login</span>
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
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
              <button className="flex flex-wrap justify-center mt-3 w-full border border-gray-300 hover:border-gray-500 py-1.5 rounded-md">
                <img
                  className="w-5 mr-2"
                  src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
                />
                Sign in with Google
              </button>

              <div className="flex justify-center my-5">
                <span className="text-xs text-gray-400 font-semibold">
                  Don't have account?
                </span>
                <Link
                  to={"/signup"}
                  className="text-xs mx-1 font-semibold text-blue-600"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
