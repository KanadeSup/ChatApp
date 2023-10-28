import "@mdi/font/css/materialdesignicons.min.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ValidateEmail(inputText) {
  return String(inputText)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

function ValidateUsername(inputText) {
  return (
    String(inputText)
      .toLowerCase()
      .match(/^[a-zA-Z0-9]+$/) && inputText.length >= 6
  );
}

function ValidatePassword(inputText) {
  return (
    String(inputText)
      .toLowerCase()
      .match(/^[a-zA-Z0-9]+$/) && inputText.length >= 6
  );
}

function ValidateSubmit(error) {
  return (
    Object.keys(error).length === 4 &&
    error.email === "" &&
    error.username === "" &&
    error.password === "" &&
    error.repassword === ""
  );
}

export default function SignUp() {
  const [formState, setFormState] = useState({});
  const [error, setError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  function handleChange(e) {
    switch (e.target.name) {
      case "email":
        if (!ValidateEmail(e.target.value)) {
          setError({
            ...error,
            email: "Email is invalid",
          });
        } else {
          setError({
            ...error,
            email: "",
          });
        }
        break;
      case "username":
        if (!ValidateUsername(e.target.value)) {
          setError({
            ...error,
            username: "Username is invalid",
          });
        } else {
          setError({
            ...error,
            username: "",
          });
        }
        break;
      case "password":
        if (!ValidatePassword(e.target.value)) {
          setError({
            ...error,
            password: "Password is more than 6 characters",
          });
        } else {
          setError({
            ...error,
            password: "",
          });
        }
        break;
      case "repassword":
        if (e.target.value !== formState.password && e.target.value !== "") {
          setError({
            ...error,
            repassword: "RePassword is not match",
          });
        } else {
          setError({
            ...error,
            repassword: "",
          });
        }
        break;
    }

    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  }
  useEffect(() => {
    setIsSubmit(ValidateSubmit(error));
    console.log(ValidateSubmit(error));
  }, [error]);
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col justify-start">
        <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
          <h1 className="w-1/2 mx-auto mb-4">
            <img src="assets\img\logo-no-background.png" alt="" />
          </h1>

          <div className="bg-white shadow w-full rounded-lg divide-gray-200">
            <div className="text-center pt-6 pb-1">
              <h1 className="font-bold text-2xl text-gray-900">Sign Up</h1>
            </div>

            <div className="px-5 pb-1">
              <div className="flex justify-between items-center">
                <label className="font-semibold text-sm text-gray-600 my-1">
                  E-mail
                </label>
                <div className="text-red-500 text-xs italic my-1">
                  {error.email}
                </div>
              </div>
              <div className="flex mb-2">
                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                  <i className="mdi mdi-email-outline text-gray-400 text-lg" />
                </div>
                <input
                  type="email"
                  name="email"
                  className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                  placeholder="johnsmith@example.com"
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className="flex justify-between items-center">
                <label className="font-semibold text-sm text-gray-600 my-1">
                  Username
                </label>
                <div className="text-red-500 text-xs italic my-1">
                  {error.username}
                </div>
              </div>
              <div className="flex mb-2">
                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                  <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                </div>
                <input
                  type="text"
                  name="username"
                  className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                  placeholder="John"
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className="flex justify-between items-center">
                <label className="font-semibold text-sm text-gray-600 my-1">
                  Password
                </label>
                <div className="text-red-500 text-xs italic my-1">
                  {error.password}
                </div>
              </div>
              <div className="flex mb-2">
                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                  <i className="mdi mdi-lock-outline text-gray-400 text-lg" />
                </div>
                <input
                  type="password"
                  name="password"
                  className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                  placeholder="************"
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className="flex justify-between items-center">
                <label className="font-semibold text-sm text-gray-600 my-1">
                  RePassword
                </label>
                <div className="text-red-500 text-xs italic my-1">
                  {error.repassword}
                </div>
              </div>
              <div className="flex mb-5">
                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                  <i className="mdi mdi-lock-outline text-gray-400 text-lg" />
                </div>
                <input
                  type="password"
                  name="repassword"
                  className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                  placeholder="************"
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <button
                type="button"
                disabled={!isSubmit}
                className={`transition duration-200 ${
                  isSubmit
                    ? "bg-blue-500 hover:bg-blue-600 focus:bg-blue-700"
                    : "bg-gray-500 cursor-not-allowed"
                } focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block`}
              >
                <span className="inline-block mr-2">Sign up</span>
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

              <div className="flex justify-center my-5">
                <span className="text-xs text-gray-400 font-semibold">
                  Have account?
                </span>
                <Link to={"/login"} className="text-xs mx-1 font-semibold">
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
