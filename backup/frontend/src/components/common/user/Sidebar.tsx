'use client';

import React, { useState } from 'react';

const Sidebar: React.FC = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [activeSection, setActiveSection] = useState('Dashboard'); // Manage the active section

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const menuItems = [
        { name: 'Dashboard' },
        { name: 'Products' },
        { name: 'Mail' },
        { name: 'Calendar' },
    ];

    return (
        <div className={`flex`}>
            {/* Sidebar */}
            <div
                className={`bg-white h-screen p-5 shadow-md transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'
                    }`}
            >
                {/* Toggle Button */}
                <button
                    className="mb-4 text-blue-500"
                    onClick={toggleSidebar}
                >
                    {isCollapsed ? '>' : '<'}
                </button>

                {/* Sidebar Content */}
                <div className={`flex flex-col justify-between ${isCollapsed ? 'items-center' : ''}`}>
                    <div>
                        {/* Logo */}
                        <div className={`flex items-center mb-6 ${isCollapsed ? 'justify-center' : ''}`}>
                            <div className="bg-blue-100 p-2 rounded-full"></div>
                            {!isCollapsed && <span className="ml-3 text-xl font-bold text-blue-700">Marketerz</span>}
                        </div>

                        {/* Menu Items */}
                        <ul className={`space-y-4`}>
                            {menuItems.map(item => (
                                <li
                                    key={item.name}
                                    onClick={() => setActiveSection(item.name)}
                                    className={`flex items-center space-x-2 cursor-pointer p-2 rounded-lg transition-colors duration-200 ${activeSection === item.name
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    <div className={`p-2 rounded-full ${activeSection === item.name ? 'bg-blue-300' : 'bg-gray-300'}`}></div>
                                    {!isCollapsed && <span>{item.name}</span>}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Account */}
                    <div className="mt-auto">
                        <div className="flex items-center">
                            <div className="bg-blue-400 w-10 h-10 rounded-full"></div>
                            {!isCollapsed && (
                                <div className="ml-3">
                                    <p className="font-semibold text-blue-700">Nina Ergemia</p>
                                    <p className="text-blue-500 text-sm">nina.erg@email.com</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-grow p-8 bg-gray-50">
                <h1 className="text-2xl font-bold text-gray-700">Main Content</h1>
                {/* Add your main content here */}
            </div>
        </div>
    );
};

export default Sidebar;
