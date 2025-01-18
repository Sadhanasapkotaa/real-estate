import Login from '@/components/buyer/Login';
import React from 'react';
import Image from 'next/image';

const LoginPage = () => {
  return (
    <div className="flex w-full h-screen">
      {/* Left half with image */}
      <div className="flex w-1/2 h-full relative">
      <Image
        src="/assets/image.png"
        alt="login"
        layout="fill"
        objectFit="cover"
        className="object-cover"
      />
      </div>

      {/* Right half with login form */}
      <div className="flex w-1/2 px-10 items-center justify-center bg-yellow-50 h-full">
      <div className="w-full max-w-lg bg-white p-10 mx-10 rounded-lg shadow-md">
        <Login />
      </div>
      </div>
    </div>
  );
};

export default LoginPage;

export const metadata = {
  title: 'Login - Real Estate',
  description: 'Login to access your real estate account',
};