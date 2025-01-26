"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Sidebar from './Sidebar'; // Corrected import path
import withAuth from '../../hoc/withAuth'; // Corrected import path

const ProfilePage = () => {
  const router = useRouter();
  const [user, setUser] = useState({ full_name: '', email: '', role: [] });

  useEffect(() => {
    const fetchUserData = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        // If user data is not found in localStorage, fetch it from the tokens
        const full_name = localStorage.getItem('full_name');
        const email = localStorage.getItem('email');
        const role = localStorage.getItem('role');
        if (full_name && email && role) {
          setUser({
            full_name,
            email,
            role: role.split(','),
          });
        }
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('/api/logout', {}, { withCredentials: true }); // Ensure cookies are sent
      localStorage.removeItem('accessToken'); // Clear access token
      localStorage.removeItem('refreshToken'); // Clear refresh token
      localStorage.removeItem('user'); // Clear user data
      localStorage.removeItem('full_name'); // Clear full name
      localStorage.removeItem('email'); // Clear email
      localStorage.removeItem('role'); // Clear role
      router.push('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar /> {/* Include Sidebar */}
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-4">Profile Page</h1>
          <p className="text-gray-700 mb-6">Welcome to your profile page. Here you can manage your personal information and settings.</p>
          <div className="mb-6">
            <p className="text-lg"><strong>Username:</strong> {user.full_name}</p>
            <p className="text-lg"><strong>Email:</strong> {user.email}</p>
            <p className="text-lg"><strong>Roles:</strong> {user.role.join(', ')}</p>
          </div>
          <button onClick={handleLogout} className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default withAuth(ProfilePage);