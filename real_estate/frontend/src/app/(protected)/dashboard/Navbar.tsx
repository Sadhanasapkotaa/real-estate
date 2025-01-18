"use client";
import React, { useState, useCallback } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';

const menuItems = [
  { title: 'Properties', href: '#' },
  { title: 'Suppliers', href: '#' },
  { title: 'Services', href: '#' },
  { title: 'Joint Development', href: '#' },
  { title: 'Map', href: '#' },
  { title: 'Blogs', href: '#' }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleMenu = useCallback(() => {
    setIsOpen(prevState => !prevState);
  }, []);

  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-2">
            <HomeIcon className="h-6 w-6 text-blue-600" />
            <h1 className="text-gray-900 text-xl font-bold">Real Estate</h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => (
             <a
              key={item.title}
              href={item.href}
              className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
             >
              {item.title}
             </a>
            ))}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200">
             <LoginIcon className="h-4 w-4" />
             <span>Login</span>
            </button>
            <div className="h-8 w-8 rounded-full overflow-hidden ring-2 ring-gray-100 hover:ring-blue-200 transition-all duration-200">
             <img
              src="https
