"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import Filter from "@/components/common/Filter";
import Navbar from "@/components/dashboard/Sidebarr";
import { FilterProvider } from '@/components/common/FilterContext';
// Import global styles
import '../globals.css';

export default function FilterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isPropertyDetailPage = pathname.includes('/properties/[propertyId]');

  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" />
      </head>
      <body className="bg-gray-100 text-gray-900">
        <FilterProvider>
          <div className="h-screen flex">
            {/* LEFT */}
            {!isPropertyDetailPage && (
              <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%]">
                <Filter />
              </div>
            )}
            {/* RIGHT */}
            <div className={`w-full ${!isPropertyDetailPage ? 'md:w-[92%] lg:w-[84%] xl:w-[86%]' : ''} bg-white overflow-scroll flex flex-col`}>
              <Navbar />
              {children}
            </div>
          </div>
        </FilterProvider>
      </body>
    </html>
  );
}