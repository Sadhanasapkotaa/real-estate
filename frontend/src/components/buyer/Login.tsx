"use client";
import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await fetch('http://localhost:5000/auth/jwt/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    console.log(data);
  };

  return (
      <div className="bg-white">
        <h2 className="text-3xl font-bold mb-10 text-left text-gray-800">Login To Realestate</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-medium mb-2">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <a href="#" className="text-blue-500 hover:underline">Forgot password?</a>
        </div>
        <div className="mt-4 text-center">
          <span className="text-gray-600">Don't have an account? </span>
          <a href="#" className="text-blue-500 hover:underline">Sign up</a>
        </div>
      </div>
  );
};

export default Login;