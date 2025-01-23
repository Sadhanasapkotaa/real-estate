"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Sidebar from './Sidebar'; // Corrected import path
import withAuth from '../../hoc/withAuth'; // Corrected import path

const ProfilePage = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.post('/api/logout', {}, { withCredentials: true }); // Ensure cookies are sent
      localStorage.removeItem('accessToken'); // Clear access token
      localStorage.removeItem('refreshToken'); // Clear refresh token
      router.push('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar /> {/* Include Sidebar */}
      <div className="flex-1 p-8">
        <h1>Profile Page</h1>
        <button onClick={handleLogout} className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600">
          Logout
        </button>
      </div>
    </div>
  );
};

export default withAuth(ProfilePage);