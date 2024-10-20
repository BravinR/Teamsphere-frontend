import React from "react";
import { useGoogleLogin as useGoogleLoginReact } from '@react-oauth/google';
import useGoogleLogin from "../hooks/useGoogleLogin";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import GoogleLogo from "./svg/GoogleLogo"; // Import the GoogleLogo component

export default function SignUp({ onChange, formData, onStateChange }) {
    const { loading: googleLoading, googleLogin } = useGoogleLogin();

    const handleGoogleSignUp = useGoogleLoginReact({
        onSuccess: async (credentialResponse) => {
            try {
                await googleLogin(credentialResponse.access_token);
                toast.success("Google sign up successful!");
            } catch (error) {
                console.error("Google sign up error:", error);
                toast.error('Google sign up failed');
            }
        },
        onError: (error) => {
            console.error("Google sign up error:", error);
            toast.error('Google sign up failed');
        },
        flow: 'implicit'
    });

    return (
        <section className="flex flex-col justify-center bg-gray-50 dark:bg-gray-900 h-screen">
            <div className="py-8 px-4 mx-auto w-3/4 lg:w-1/2 lg:py-16 gap-8 lg:gap-16">
                <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Create your account
                    </h2>
                    
                    {/* Google Sign Up Button */}
                    <div className="flex justify-center">
                        <button
                            onClick={() => handleGoogleSignUp()}
                            disabled={googleLoading}
                            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            <GoogleLogo className="w-5 h-5 mr-2" />
                            Sign up with Google
                        </button>
                    </div>

                    <div className="flex items-center my-4">
                        <hr className="flex-grow border-gray-300 dark:border-gray-600" />
                        <span className="px-3 text-gray-500 dark:text-gray-400">or</span>
                        <hr className="flex-grow border-gray-300 dark:border-gray-600" />
                    </div>

                    {/* Email/Password Sign Up Form */}
                    <form className="space-y-6" action="#">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Your email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="name@company.com"
                                value={formData.email}
                                onChange={(e) => onChange(e, 'input')}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Your password
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="••••••••"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={formData.password}
                                onChange={(e) => onChange(e, 'input')}
                                required
                            />
                        </div>
                        <button
                            type="button"
                            className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={onStateChange}
                        >
                            Next
                        </button>
                    </form>

                    <div className="text-sm font-medium text-gray-900 dark:text-white text-center mt-4">
                        Already have an account?
                        <Link
                            to="/login"
                            className="text-blue-600 hover:underline dark:text-blue-500 pl-2"
                        >
                            Log in
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}