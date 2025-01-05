"use client";
import React, { useState } from 'react';
import { FaHome, FaUser, FaCog, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link'; // Import the Link component for routing

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`fixed top-0 left-0 h-full bg-white text-blue-800 shadow-lg ${isCollapsed ? 'w-20' : 'w-64'} transition-all duration-300 ease-in-out`}>
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <img src="/path/to/logo.png" alt="Logo" className="w-10 h-10" />
          {!isCollapsed && <span className="ml-4 font-bold">Logo</span>}
        </div>
        <button onClick={toggleSidebar} className="focus:outline-none">
          {isCollapsed ? <FaArrowRight /> : <FaArrowLeft />}
        </button>
      </div>
      <div className="flex flex-col mt-4">
        <Link href="/home">
          <button className="flex items-center p-4 hover:bg-blue-100 focus:outline-none">
            <FaHome />
            {!isCollapsed && <span className="ml-4">Home</span>}
          </button>
        </Link>
        <Link href="/profile">
          <button className="flex items-center p-4 hover:bg-blue-100 focus:outline-none">
            <FaUser />
            {!isCollapsed && <span className="ml-4">Profile</span>}
          </button>
        </Link>
        <Link href="/settings">
          <button className="flex items-center p-4 hover:bg-blue-100 focus:outline-none">
            <FaCog />
            {!isCollapsed && <span className="ml-4">Settings</span>}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;