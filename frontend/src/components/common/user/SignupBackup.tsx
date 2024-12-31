'use client';
import { useState } from "react";

const SignupBackup = () => {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        country: "United States",
        state: "Delaware",
        phoneNumber: "",
        password: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    return (
        <div className="bg-white shadow-lg rounded-lg flex flex-col md:flex-row m-10">
            {/* Left side */}
            <div className="w-full md:w-2/5 bg-blue-600 text-white p-8 rounded-t-lg md:rounded-l-lg md:rounded-tr-none">
                <div className="m-10">
                    <h1 className="text-5xl font-bold mb-4">Let's setup your Operating Agreement</h1>
                    <br />
                    <br />

                    <p className="mb-8">
                        All-in-one solution for your business in the state. Form a new company from scratch or
                        onboard your existing US company.
                    </p>
                </div>
            </div>

            {/* Right side */}
            <div className="w-full md:w-3/5 p-8 rounded-b-lg md:rounded-r-lg md:m-10 md:rounded-bl-none">
                <h2 className="text-xl font-semibold mb-6">Let's get started</h2>

                <form>
                    <div className="flex flex-col md:flex-row md:space-x-4">
                        {/* First Name */}
                        <div className="mb-4 md:mb-0 md:w-1/2">
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                                First name
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={form.firstName}
                                onChange={handleInputChange}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-lg mb-4"  // Added mb-4
                            />
                        </div>

                        {/* Last Name */}
                        <div className="mb-4 md:mb-0 md:w-1/2">
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                                Last name
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={form.lastName}
                                onChange={handleInputChange}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-lg mb-4" // Added mb-4
                            />
                        </div>
                    </div>

                    {/* Email and Mobile */}
                    <div className="flex flex-col md:flex-row md:space-x-4">
                        {/* Email */}
                        <div className="mb-4 md:mb-0 md:w-1/2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={form.email}
                                onChange={handleInputChange}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-lg mb-4"  // Added mb-4
                            />
                        </div>

                        {/* Mobile */}
                        <div className="mb-4 md:mb-0 md:w-1/2">
                            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                                Mobile
                            </label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={form.phoneNumber}
                                onChange={handleInputChange}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-lg mb-4" // Added mb-4
                            />
                        </div>
                    </div>

                    {/* Country of Residence and State */}
                    <div className="flex flex-col md:flex-row md:space-x-4">
                        {/* Country */}
                        <div className="mb-4 md:mb-0 md:w-1/2">
                            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                Country of residence
                            </label>
                            <select
                                id="country"
                                name="country"
                                value={form.country}
                                onChange={handleInputChange}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-lg mb-4"  // Added mb-4
                            >
                                <option>United States</option>
                                <option>Nepal</option>
                            </select>
                        </div>

                        {/* State */}
                        <div className="mb-4 md:mb-0 md:w-1/2">
                            <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                                State
                            </label>
                            <select
                                id="state"
                                name="state"
                                value={form.state}
                                onChange={handleInputChange}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-lg mb-4"  // Added mb-4
                            >
                                <option>Delaware</option>
                            </select>
                        </div>
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={form.password}
                            onChange={handleInputChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-lg mb-4"  // Added mb-4
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold mt-4 hover:bg-blue-700 transition-colors"
                    >
                        Get Started
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignupBackup;
