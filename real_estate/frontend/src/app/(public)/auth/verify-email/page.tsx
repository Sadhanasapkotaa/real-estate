"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Changed from 'next/router'

export default function VerifyEmailPage() {
  const [otp, setOtp] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle OTP submission
    const response = await fetch('https://opulent-memory-5pgwv57r9wwf7xg5-8000.app.github.dev/api/v1/auth/verify/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ otp }),
    });

    if (response.ok) {
      router.push('/dashboard'); // Redirect to dashboard after successful verification
    } else {
      // Handle error
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Verify Your Email</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">OTP</label>
            <input
              type="text"
              name="otp"
              value={otp}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
}
