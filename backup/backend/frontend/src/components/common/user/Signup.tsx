'use client';

import React, { useState } from 'react';

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-200">
      <div className="flex bg-white rounded-3xl shadow-lg lg:max-w-4xl lg:mx-10 w-full my-10 overflow-hidden">
        <div className="w-1/2 hidden md:flex items-center justify-center p-10 bg-blue-100">
          <img
            src="https://i.pinimg.com/originals/6b/db/d8/6bdbd8c62b1ce655ba69b874b72a2b96.jpg"
            alt="Real Estate"
            className="rounded-xl shadow-md"
            width={250}
            height={250}
          />
        </div>
        <div className="w-full md:w-1/2 p-8">
          <div className="flex justify-center mb-4">
            <img src="https://thumbs.dreamstime.com/b/logo-real-estate-home-building-company-minimalist-simple-editable-color-easy-to-use-your-business-let-s-grow-up-269213973.jpg" alt="Real Estate Logo" className="w-20 h-20 object-contain rounded-full" />
          </div>
          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Create Account</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex space-x-3">
              <div className="relative flex-1">
                <i className="fa fa-line-user absolute top-3 left-3 text-blue-400 text-xl" />
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
              <div className="relative flex-1">
                <i className="fa fa-line-user absolute top-3 left-3 text-blue-400 text-xl" />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
            </div>
            <div className="relative">
              <i className="fa fa-envelope absolute top-3 left-3 text-blue-400 text-xl" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
            <div className="relative">
              <i className="las la-phone absolute top-3 left-3 text-blue-400 text-xl" />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
            <div className="relative">
              <i className="las la-lock absolute top-3 left-3 text-blue-400 text-xl" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
            <button type="submit" className="w-full bg-blue-400 text-white py-3 rounded-md hover:bg-blue-500 transition duration-300 font-medium text-sm shadow-md">
              Sign Up
            </button>
          </form>
          <p className="mt-6 text-center text-gray-600 text-sm">
            Already have an account? <a href="#" className="text-blue-500 hover:underline">Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
}
