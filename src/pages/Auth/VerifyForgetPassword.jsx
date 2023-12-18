import { Link } from "react-router-dom";

export default function VerifyForgetPassword() {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-300 flex flex-col justify-start">
          <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
            <h1 className="w-1/2 mx-auto mb-4">
              <img src="assets\img\logo-no-background.png" alt="" />
            </h1>
  
            <div className="bg-white shadow w-full rounded-lg divide-gray-200">
              <div className="text-center pt-6 pb-5">
                <h1 className="font-bold text-2xl text-gray-900">
                  Verify Email
                </h1>
              </div>
  
              <div className="px-5 pb-1">
                <div className="flex mb-2">
                  <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                    <i className="mdi mdi-key text-gray-400 text-lg" />
                  </div>
                  <input
                    type="email"
                    className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="Write OTP is sent to your email here"
                  />
                </div>
                
                <button
                  type="button"
                  className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-3 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                >
                  <span className="inline-block mr-2">Confirm</span>
                </button>
  
                <div className="flex justify-center my-5">
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
                  <Link to={"/forget-password"} className="text-xs mx-1 font-semibold">
                    Back to forget password page
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  