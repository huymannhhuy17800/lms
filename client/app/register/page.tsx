import React from 'react'

const page = () => {
    return (
        <div className="w-full flex items-center justify-center min-h-screen">
            <div className="w-full max-w-lg px-4 bg-white rounded-lg p-6">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Sign up with email
                </h2>
                <form className="space-y-5">
                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
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
                            placeholder="Enter your password"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-[#5cd799] text-white py-2 rounded-md hover:bg-[#4eb984] transition-colors cursor-pointer"
                    >
                        Sign Up
                    </button>
                </form>
                <div className="mt-4 text-center flex items-center justify-between">
                    <a
                        href="#"
                        className="text-[#4eb984] hover:underline"
                    >
                        Already have an account? Log in
                    </a>
                    <a href="#" className="">
                        Forgot password?
                    </a>
                </div>
            </div>
        </div>
    )
}

export default page