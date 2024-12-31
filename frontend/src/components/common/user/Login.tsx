'use client'
import { useState } from 'react';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle sign up logic
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Left Side: Form */}
            <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-32 bg-white">
                <h2 className="text-3xl font-bold mb-6">Sign Up to Real Estate</h2>

                <form onSubmit={handleSignUp} className="space-y-6">
                    {/* Email Input */}
                    <div className="relative">
                        <i
                            className="fa fa-envelope absolute left-3 top-3 text-gray-400"
                        />
                        <input
                            type="email"
                            placeholder="example@mail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-10 py-3 rounded-md bg-gray-100 text-gray-900 border border-gray-300 focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div className="relative">
                        <i
                            className="fa fa-lock absolute left-3 top-3 text-gray-400"
                        />
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-10 py-3 rounded-md bg-gray-100 text-gray-900 border border-gray-300 focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>

                    {/* Sign Up Button */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    >
                        Sign Up
                    </button>

                    {/* Social Sign Up */}
                    <div className="flex justify-between mt-4 space-x-4">
                        <button className="flex items-center justify-center w-1/4 border-2 border-gray text-blue-700 py-3 rounded-md hover:border-blue-700 transition">
                            <i className="fa fa-facebook" />
                        </button>
                        <button className="flex items-center justify-center w-1/4 border-2 border-gray text-red-600 py-3 rounded-md hover:border-blue-600 transition">
                            <i className="fa fa-google" />
                        </button>
                        <button className="flex items-center justify-center w-1/4 border-2 border-gray text-black py-3 rounded-md hover:border-blue-600 transition">
                            <i className="fa fa-apple" />
                        </button>
                    </div>

                    <p className="text-sm text-center text-gray-500 mt-4">
                        Have an account? <a href="/login" className="text-blue-600 hover:underline">Sign in</a>
                    </p>
                </form>
            </div>

            {/* Right Side: Background Image */}
            <div className="hidden md:block md:w-1/2 bg-cover bg-center" style={{ backgroundImage: 'url("/path-to-your-image.jpg")' }}></div>
        </div>
    );
}
