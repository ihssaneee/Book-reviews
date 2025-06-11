import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ThreeDots } from "react-loader-spinner";

export default function Login() {
    const navigate = useNavigate();
    const { login, loginLoading } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const validateForm = () => {
        if (!email || !password) {
            setError("all fields are required !");
            return false;
        }
        setError(null);
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }
        try {
            const loggedUser = await login({ email, password });

            if (loggedUser.role === "admin") {
                navigate("/admin/dashboard");
            } else {
                navigate("/");
            }
        } catch (error) {
            console.error("Error logging in:", error);
            setError("invalid email or password .Please try again.");
        }
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 dark:bg-[#1A1C23] ">
           <div className="flex min-h-full  flex-1 flex-col justify-center px-6 py-4 pt-8 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt=""
                        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                        className="mx-auto h-10 w-auto"
                    />
                    <h2 className="mt-6 labelStyle text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                    Sign in to your account
                    </h2>
                </div>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6 " onSubmit={handleSubmit}>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm/6 font-medium text-gray-900 labelStyle"
                        >
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                required
                                autoComplete="email"
                                onChange={(e) => setEmail(e.target.value)}
                                className="block loginStyle dark:bg-[#22242B] dark:border-none dark:ring-0 w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-neutral-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="password"
                                className="block text-sm/6 font-medium text-gray-900 labelStyle"
                            >
                                Password
                            </label>
                            <div className="text-sm">
                                <a
                                    href="#"
                                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                                >
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="current-password"
                               className="block loginStyle dark:bg-[#22242B] dark:border-none dark:ring-0 w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-neutral-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in
                        </button>
                        <div className="text-red-500 p-2">
                            {error ? error : <></>}
                        </div>
                        {loginLoading ? (
                            <div className="flex items-center justify-center m-4">
                                <ThreeDots
                                    visible={true}
                                    height="80"
                                    width="80"
                                    color="#4f46e5"
                                    radius="9"
                                    ariaLabel="three-dots-loading"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                />
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </form>

                <p className="mt-10 text-center text-sm/6 text-gray-500">
                    Not a member?{" "}
                    <a
                        onClick={() => {
                            navigate("/Signup");
                        }}
                        className="font-semibold cursor-pointer text-indigo-600 hover:text-indigo-500"
                    >
                        Sign Up
                    </a>
                </p>
            </div>
        </div>
    );
}
