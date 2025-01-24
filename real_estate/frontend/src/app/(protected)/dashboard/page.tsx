"use client";
import React from 'react';
import Navbar from "./Navbar";
import withAuth from '../../hoc/withAuth';

const ProfilePage = () => {
  return (
    <div>
      {/* Sidebar removed */}
      <Navbar />
      This is the dashboard page
    </div>
  );
};

export default withAuth(ProfilePage);
