'use client'
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-md sticky top-0 w-full z-10">
      <div className="mx-auto px-10 sm:px-6 lg:px-10 lg:mx-10">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-700">
            RealEstate
          </Link>
          {/* Links for larger screens */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/listings" className="text-blue-600 hover:text-blue-800">
              Properties
            </Link>
            <Link href="/login" className="text-blue-600 hover:text-blue-800">
              Buy/Lease
            </Link>
            <Link href="/owner/login" className="text-blue-600 hover:text-blue-800">
            Sell/Rent
            </Link>
            <Link href="/services/login" className="text-blue-600 hover:text-blue-800">
              Services
            </Link>
            <Link href="/supplier/login" className="text-blue-600 hover:text-blue-800">
              Supplies
            </Link>
            <Link href="/contact" className="text-blue-600 hover:text-blue-800">
              Contact
            </Link>
          </div>
          {/* Sign In Button */}
          <div className="hidden md:flex items-center">
            <Link href="/signin">
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Sign In
              </button>
            </Link>
          </div>
          {/* Hamburger icon for smaller screens */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-blue-700 hover:text-blue-500 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
        {/* Toggleable menu for smaller screens */}
        <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
          <Link href="/properties" className="block px-3 py-2 text-blue-600 hover:text-blue-800">
            Properties
          </Link>
          <Link href="/about" className="block px-3 py-2 text-blue-600 hover:text-blue-800">
            About Us
          </Link>
          <Link href="/contact" className="block px-3 py-2 text-blue-600 hover:text-blue-800">
            Contact
          </Link>
          <Link href="/signin" className="block px-3 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded">
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
}