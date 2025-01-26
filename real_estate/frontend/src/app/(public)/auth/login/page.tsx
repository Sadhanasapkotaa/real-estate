"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Changed from 'next/router'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api } from '../../../api'; // Import the axios instance

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors: { email?: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const response = await api.post('/auth/login/', formData);
      if (response.status === 200) {
        // Store all user data in localStorage
        const userData = response.data;
        Object.entries(userData).forEach(([key, value]) => {
          localStorage.setItem(key, String(value));
        });
        // Store user role in localStorage
        localStorage.setItem('role', userData.role);
        
        toast.success('Login successful! Redirecting to dashboard...');
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('Login failed. Please try again.');
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      <form onSubmit={handleSubmit}>
        {(['email', 'password'] as (keyof typeof formData)[]).map((field) => (
          <div key={field} className="mb-4">
            <label className="block text-gray-700">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              type={field === 'password' && !showPassword ? 'password' : 'text'}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
            {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
          </div>
        ))}
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
            className="mr-2"
          />
          <label htmlFor="showPassword" className="text-sm text-gray-700">Show Password</label>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
          Login
        </button>
      </form>
    </div>
  );
}