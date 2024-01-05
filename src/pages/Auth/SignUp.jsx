import "@mdi/font/css/materialdesignicons.min.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MoveLeft } from "lucide-react";

import {
    ValidateEmail,
    ValidateUsername,
    ValidatePassword,
    ValidateName,
} from "/utils/validation";
import { signUp, verifyRegister } from "/api";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function SignUp() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorUsername, setErrorUsername] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorRePassword, setErrorRePassword] = useState("");
    const [errorFirstName, setErrorFirstName] = useState("");
    const [errorLastName, setErrorLastName] = useState("");
    const [notificationServer, setNotificationServer] = useState("");
    const [visibleSubmit, setVisibleSubmit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showFormConfirmOTP, setShowFormConfirmOTP] = useState(false);
    const [otp, setOtp] = useState("");
    const [isLoadingOTP, setIsLoadingOTP] = useState(false);
    const [notificationServerOTP, setNotificationServerOTP] = useState("");

    function checkVisibleSubmit() {
        if (
            errorEmail === "" &&
            errorUsername === "" &&
            errorPassword === "" &&
            errorRePassword === "" &&
            errorFirstName === "" &&
            errorLastName === "" &&
            email !== "" &&
            username !== "" &&
            password !== "" &&
            rePassword !== "" &&
            firstName !== "" &&
            lastName !== ""
        ) {
            setVisibleSubmit(true);
        } else {
            setVisibleSubmit(false);
        }
    }

    useEffect(() => {
        checkVisibleSubmit();
    }, [
        errorEmail,
        errorUsername,
        errorPassword,
        errorRePassword,
        errorFirstName,
        errorLastName,
        email,
        username,
        password,
        rePassword,
        firstName,
        lastName,
    ]);

    function handleChangeEmail(e) {
        setEmail(e.target.value);
        if (!ValidateEmail(e.target.value)) {
            setErrorEmail("Email is invalid");
        } else {
            setErrorEmail("");
        }
    }

    function handleChangeUsername(e) {
        setUsername(e.target.value);
        if (!ValidateUsername(e.target.value)) {
            setErrorUsername("Username must be more than 6 characters");
        } else {
            setErrorUsername("");
        }
    }

    function handleChangePassword(e) {
        setPassword(e.target.value);
        if (!ValidatePassword(e.target.value)) {
            setErrorPassword("Password must be more than 6 characters");
        } else {
            setErrorPassword("");
        }

        if (rePassword === "" || rePassword === e.target.value) {
            setErrorRePassword("");
        } else {
            setErrorRePassword("RePassword is not match");
        }
    }

    function handleChangeRePassword(e) {
        setRePassword(e.target.value);
        if (e.target.value !== password && e.target.value !== "") {
            setErrorRePassword("RePassword is not match");
        } else {
            setErrorRePassword("");
        }
    }
    function handleChangeFirstName(e) {
        setFirstName(e.target.value);
        if (!ValidateName(e.target.value)) {
            setErrorFirstName("First name is invalid");
        } else {
            setErrorFirstName("");
        }
    }
    function handleChangeLastName(e) {
        setLastName(e.target.value);
        if (!ValidateName(e.target.value)) {
            setErrorLastName("Last name is invalid");
        } else {
            setErrorLastName("");
        }
    }

    async function handleSubmit(e) {
        try {
            setIsLoading(true);
            const response = await signUp(email, username, password);
            console.log("response khi ddawng khi: ", response);
            setIsLoading(false);
            if (response.status === 400) {
                setNotificationServer(response.title);
                return;
            }
            localStorage.setItem("token", response.token);

            setNotificationServer("");
            setShowFormConfirmOTP(true);
        } catch (error) {
            setNotificationServer("An error occurred while signing up.");
        }
        console.log("email: ", email);
    }

    async function handleVerifyOTP() {
        try {
            var token = localStorage.getItem("token");
            setIsLoadingOTP(true);
            const response = await verifyRegister(token, otp);
            console.log("response khi xac thuc otp: ", response);
            setIsLoadingOTP(false);
            if (response && response.status === 400) {
                setNotificationServerOTP(response.title);
                return;
            }
            localStorage.setItem("token", response.token);
            console.log("ddax chay xac thuc token: ", response.token);
            navigate("/login");
        } catch (error) {
            setNotificationServer("An error occurred while verifying OTP.");
        }
    }

    return (
        <div className="flex items-center flex-col">
            <h1 className="mx-auto pt-16 w-[184px]">
                <img src="assets\img\logo-no-background.png" alt="" />
            </h1>

            <div
                className={`relative border border-gray-300 flex justify-start mt-4 items-center overflow-hidden rounded-md bg-white transition-all duration-500 w-[23rem] ${
                    showFormConfirmOTP ? "h-[324px]" : "h-[40rem]"
                }`}
            >
                {/* sign up */}
                <div
                    className={`mx-auto w-[23rem] shrink-0 transition-transform duration-500 ease-in-out ${
                        showFormConfirmOTP
                            ? "-translate-x-full"
                            : "translate-x-0"
                    }`}
                >
                    <div className="bg-white w-full rounded-md divide-gray-200">
                        <div className="text-center pt-6 pb-1">
                            <h1 className="font-bold text-3xl text-gray-900">
                                Sign Up
                            </h1>
                        </div>

                        <div className="px-5 pb-1">
                            {/* first name vs last name */}
                            <div className="flex flex-row gap-1">
                                <div className="flex flex-col">
                                    <label className="font-semibold text-sm text-black">
                                        First name
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="John"
                                        maxLength={12}
                                        className="w-full  pl-4 pr-3 py-2 rounded-md border-[1.5px] border-gray-300 outline-none focus:border-indigo-500"
                                        onChange={(e) =>
                                            handleChangeFirstName(e)
                                        }
                                    />
                                    <div className="text-red-500 h-4 text-xs italic">
                                        {errorFirstName}
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <label className="font-semibold text-sm text-black">
                                        Last name
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="Smith"
                                        maxLength={12}
                                        className="w-full  pl-4 pr-3 py-2 rounded-md border-[1.5px] border-gray-300 outline-none focus:border-indigo-500"
                                        onChange={(e) =>
                                            handleChangeLastName(e)
                                        }
                                    />
                                    <div className="text-red-500 h-4 text-xs italic">
                                        {errorLastName}
                                    </div>
                                </div>
                            </div>

                            {/* email */}
                            <div className="flex flex-col">
                                <div className="flex justify-between items-center">
                                    <label className="font-semibold text-sm text-black">
                                        E-mail
                                    </label>
                                </div>
                                <div className="flex">
                                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                        <i className="mdi mdi-email-outline text-gray-400 text-lg" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        maxLength={30}
                                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-md border-[1.5px] border-gray-300 outline-none focus:border-indigo-500"
                                        placeholder="johnsmith@example.com"
                                        onChange={(e) => handleChangeEmail(e)}
                                    />
                                </div>
                                <div className="text-red-500 text-xs h-4 italic">
                                    {errorEmail}
                                </div>
                            </div>

                            {/* username */}
                            <div className="flex flex-col">
                                <div className="flex justify-between items-center">
                                    <label className="font-semibold text-sm text-black">
                                        Username
                                    </label>
                                </div>
                                <div className="flex">
                                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                        <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                                    </div>
                                    <input
                                        type="text"
                                        name="username"
                                        maxLength={12}
                                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-md border-[1.5px] border-gray-300 outline-none focus:border-indigo-500"
                                        placeholder="John"
                                        onChange={(e) =>
                                            handleChangeUsername(e)
                                        }
                                    />
                                </div>
                                <div className="text-red-500 text-xs h-4 italic">
                                    {errorUsername}
                                </div>
                            </div>
                            {/* password */}
                            <div className="flex flex-col">
                                <div className="flex justify-between items-center">
                                    <label className="font-semibold text-sm text-black">
                                        Password
                                    </label>
                                </div>
                                <div className="flex">
                                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                        <i className="mdi mdi-lock-outline text-gray-400 text-lg" />
                                    </div>
                                    <input
                                        type="password"
                                        name="password"
                                        maxLength={20}
                                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-md border-[1.5px] border-gray-300 outline-none focus:border-indigo-500"
                                        placeholder="************"
                                        onChange={(e) =>
                                            handleChangePassword(e)
                                        }
                                    />
                                </div>
                                <div className="text-red-500 text-xs h-4 italic">
                                    {errorPassword}
                                </div>
                            </div>
                            {/* repassword */}
                            <div className="flex flex-col">
                                <div className="flex justify-between items-center">
                                    <label className="font-semibold text-sm text-black">
                                        Enter password again
                                    </label>
                                </div>
                                <div className="flex">
                                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                        <i className="mdi mdi-lock-outline text-gray-400 text-lg" />
                                    </div>
                                    <input
                                        type="password"
                                        name="repassword"
                                        maxLength={20}
                                        placeholder="************"
                                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-md border-[1.5px] border-gray-300 outline-none focus:border-indigo-500"
                                        onChange={(e) =>
                                            handleChangeRePassword(e)
                                        }
                                    />
                                </div>
                                <div className="text-red-500 text-xs h-4 italic">
                                    {errorRePassword}
                                </div>
                            </div>

                            {/* notification from server */}
                            <div className="text-red-500 text-[13px] h-10 font-medium">
                                {notificationServer}
                            </div>

                            {/* submit */}
                            {isLoading ? (
                                <Button disabled className="w-full">
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </Button>
                            ) : (
                                <Button
                                    className="w-full"
                                    onClick={() => handleSubmit()}
                                    disabled={!visibleSubmit}
                                >
                                    Sign up
                                </Button>
                            )}

                            <div className="flex justify-center my-5">
                                <span className="text-sm text-gray-400 font-semibold">
                                    Have account?
                                </span>
                                <Link
                                    to={"/login"}
                                    className="text-sm mx-1 font-semibold hover:underline"
                                >
                                    Sign in
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* confirm otp */}
                <div
                    className={`absolute left-[23rem] mx-auto w-[23rem] shrink-0 transition-transform duration-500 ease-in-out ${
                        showFormConfirmOTP
                            ? "-translate-x-full"
                            : "translate-x-0"
                    }`}
                >
                    <div className="bg-white w-full rounded-md divide-gray-200">
                        <div className="text-center mt-6 pb-1">
                            <h1 className="font-bold text-3xl text-gray-900">
                                Confirm Email
                            </h1>
                        </div>

                        <div className="px-5">
                            <div className="flex justify-between items-center">
                                <label className="font-semibold text-sm text-black my-1">
                                    Enter OTP
                                </label>
                            </div>
                            <div className="flex relative flex-col mb-2">
                                <div className="absolute w-10 text-center top-2 pointer-events-none flex items-center justify-center">
                                    <i className="mdi mdi-key text-gray-400 text-lg" />
                                </div>
                                <input
                                    type="text"
                                    name="otp"
                                    className="w-full py-2 pl-10 rounded-md border-[1.5px] border-gray-300 outline-none focus:border-indigo-500"
                                    required={true}
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                                <span className="text-gray-600 text-sm mt-3 mb-2">
                                    Please enter the OTP code that was sent to
                                    your email.
                                </span>
                                {/* notification from server */}
                                <div className="text-red-500 text-[13px] h-6 font-medium">
                                    {notificationServerOTP}
                                </div>
                                {isLoadingOTP ? (
                                    <Button disabled className="w-full">
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Please wait
                                    </Button>
                                ) : (
                                    <Button
                                        className="w-full"
                                        onClick={() => handleVerifyOTP()}
                                    >
                                        Confirm
                                    </Button>
                                )}
                            </div>
                        </div>
                        <div
                            className="flex flex-row mt-5 px-2 items-center bg-gray-200 cursor-pointer"
                            onClick={() => {
                                setShowFormConfirmOTP(false);
                                setNotificationServerOTP("");
                                setOtp("");
                            }}
                        >
                            <MoveLeft className="w-6 h-6 text-black cursor-pointer" />
                            <span className="ml-2 py-3 font-medium text-sm">
                                Trở lại
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
