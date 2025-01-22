"use client";
import React, { useState, useCallback } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
// import Image from 'next/image';

const baseUrl = "https://opulent-memory-5pgwv57r9wwf7xg5-3000.app.github.dev/";

const menuItems = [
  {
    title: 'Properties',
    items: [
      { title: 'List Properties', href: `${baseUrl}dashboard/properties/list-properties` },
      { title: 'Add Property', href: `${baseUrl}dashboard/properties/add-property` },
      { title: 'Property Admin', href: `${baseUrl}dashboard/properties/admin-view` },
    ],
  },
  {
    title: 'Suppliers',
    items: [
      { title: 'List Suppliers', href: `${baseUrl}dashboard/suppliers/list-suppliers` },
      { title: 'Add Supplier', href: `${baseUrl}dashboard/suppliers/add-supplier` },
      { title: 'Supplier Admin', href: `${baseUrl}dashboard/suppliers/admin-view` },
    ],
  },
  {
    title: 'Services',
    items: [
      { title: 'List Services', href: `${baseUrl}dashboard/services/list-services` },
      { title: 'Add Service', href: `${baseUrl}dashboard/services/add-service` },
      { title: 'Service Admin', href: `${baseUrl}dashboard/services/admin-view` },
    ],
  },
  {
    title: 'Joint Development',
    items: [
      { title: 'List JDs', href: `${baseUrl}dashboard/joint-dev/list-jointdevs` },
      { title: 'Add JD', href: `${baseUrl}dashboard/joint-dev/add-jointdev` },
      { title: 'JD Admin', href: `${baseUrl}dashboard/joint-dev/admin-view` },
    ],
  },
  {
    title: 'Map',
    items: [
      { title: 'View Map', href: `${baseUrl}dashboard/maps` },
    ],
  },
  {
    title: 'Blogs',
    items: [
      { title: 'List Blogs', href: `${baseUrl}dashboard/blogs/list-blogs` },
      { title: 'Add Blog', href: `${baseUrl}dashboard/blogs/add-blog` },
      { title: 'Blog Admin', href: `${baseUrl}dashboard/blogs/admin-view` },
    ],
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleMenu = useCallback(() => {
    setIsOpen(prevState => !prevState);
  }, []);

  const toggleDropdown = useCallback((title: string) => {
    setOpenDropdown(prevState => (prevState === title ? null : title));
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
          <div className="hidden md:flex items-center space-x-4">
            {menuItems.map((item) => (
              <div key={item.title} className="relative">
                <button
                  onClick={() => toggleDropdown(item.title)}
                  className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                >
                  {item.title}
                </button>
                {openDropdown === item.title && (
                  <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                    {item.items.map((subItem) => (
                      <a
                        key={subItem.title}
                        href={subItem.href}
                        className="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg text-sm font-medium transition-all duration-200"
                      >
                        {subItem.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="h-8 w-8 rounded-full overflow-hidden ring-2 ring-gray-100 hover:ring-blue-200 transition-all duration-200">
              {/* <Image
                src="/profile.jpg"
                alt="User Avatar"
                layout="fill"
                objectFit="cover"
              /> */}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-600 hover:text-blue-600 focus:outline-none">
              {isOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems.map((item) => (
              <div key={item.title}>
                <button
                  onClick={() => toggleDropdown(item.title)}
                  className="block w-full text-left text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md text-base font-medium transition-all duration-200"
                >
                  {item.title}
                </button>
                {openDropdown === item.title && (
                  <div className="pl-4">
                    {item.items.map((subItem) => (
                      <a
                        key={subItem.title}
                        href={subItem.href}
                        className="block text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md text-base font-medium transition-all duration-200"
                      >
                        {subItem.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
