import Link from 'next/link'
import React from 'react'


const alternativeLoginMethods = [
    { name: 'Google', icon: 'google.svg' },
    { name: 'Facebook', icon: 'fb.svg' },
    { name: 'Apple', icon: 'apple.svg' },
]

const Login = () => {
    return (
        <div className="w-full flex items-center justify-center min-h-screen">
            <div className="w-full max-w-lg px-4 bg-white rounded-lg p-6">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Login to continue your learning journey
                </h2>
                <form className="space-y-5">
                    {/* Username */}
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Email
                        </label>
                        <input
                            id="username"
                            type="text"
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5cd799] focus:outline-none"
                            placeholder="youremail@example.com"
                        />
                    </div>
                    {/* Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5cd799] focus:outline-none"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-[#5cd799] text-white py-2 rounded-md hover:bg-[#4eb984] transition-colors cursor-pointer"
                    >
                        Login
                    </button>
                </form>

                {/* Extra Links */}
                <div className="flex flex-col items-center justify-between gap-2 mt-4">
                    <div className="bg-[#5cd799] w-full h-0.5 mt-4"></div>
                    <div className="login-icon-container">
                        {alternativeLoginMethods.map((m) => (
                            <AlternativeLoginItem key={m.name} iconSrc={m.icon} />
                        ))}
                    </div>

                </div>
                <div className="mt-4 flex justify-between">
                    <a
                        href="#"
                        className="text-[#4eb984] hover:underline"
                    >
                        Didn't have an account? Sign up
                    </a>
                    <a href="#" className="">
                        Forgot password?
                    </a>
                </div>
            </div>
        </div>
    );
};

const AlternativeLoginItem = ({ key, iconSrc }: { key: string; iconSrc: string }) => {
    return (
        <div key={key} className="other-login-method-icon">
            <img src={iconSrc} alt="" className='h-6 w-6' />
        </div>
    )
}

export default Login