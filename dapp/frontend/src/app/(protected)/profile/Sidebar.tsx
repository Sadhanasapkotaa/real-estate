"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { FaBars, FaTimes, FaList, FaHome, FaBook, FaBell, FaSignOutAlt, FaUser } from 'react-icons/fa';

const MenuItem = ({ href, icon: Icon, text }: { href: string; icon: React.ElementType; text: string }) => {
  return (
    <li className="mb-4 relative">
      <a
        href={href}
        className="text-gray-700 hover:text-blue-600 flex items-center p-2 rounded-lg transition-all duration-200 hover:bg-blue-50 group"
      >
        <Icon className="w-5 h-5 mr-3" />
        <span className="transition-opacity duration-200">{text}</span>
      </a>
    </li>
  );
};

const Sidebar: React.FC = () => { // Renamed component to Sidebar
  const router = useRouter();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const handleLogout = async () => {
    try {
      await axios.post('/api/logout');
      router.push('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };


  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div 
        className={`
          transition-all duration-300 ease-in-out
          ${isSidebarExpanded ? 'w-64' : 'w-20'}
          bg-white shadow-xl p-4 flex flex-col
          border-r border-gray-100
        `}
      >
        <button 
          onClick={toggleSidebar} 
          className="mb-8 text-xl focus:outline-none w-10 h-10 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
        >
          {isSidebarExpanded ? <FaTimes /> : <FaBars />}
        </button>

        <div className="space-y-6">
          <h2 className="font-bold text-xl flex items-center text-gray-800">
            <FaHome className="w-6 h-6 mr-3" />
            {isSidebarExpanded && 'Dashboard'}
          </h2>

          <ul className="space-y-2">
            <MenuItem href="/my-listings" icon={FaList} text={isSidebarExpanded ? 'My Listings' : ''} />
            <MenuItem href="/my-rentals" icon={FaHome} text={isSidebarExpanded ? 'My Rentals' : ''} />
            <MenuItem href="/my-bookings" icon={FaBook} text={isSidebarExpanded ? 'My Bookings' : ''} />
            <MenuItem href="/notifications" icon={FaBell} text={isSidebarExpanded ? 'Notifications' : ''} />
          </ul>
        </div>

        <div className="mt-auto">
          <button 
            onClick={handleLogout} 
            className="w-full mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 flex items-center justify-center focus:outline-none transition-colors"
          >
            <FaSignOutAlt className="mr-2" />
            {isSidebarExpanded && 'Logout'}
          </button>
        </div>
      </div>

      <div className="flex-1 p-8">
        <div className="bg-white shadow-lg rounded-xl p-6 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 flex items-center text-gray-800">
            <FaUser className="w-8 h-8 mr-3 text-blue-500" />
            Profile Page
          </h1>
          {/* Add your profile content here */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar; // Export renamed component