"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { FiMail, FiLock, FiEye, FiEyeOff, FiLogIn, FiAlertCircle } from 'react-icons/fi';
import { RiHome2Line } from 'react-icons/ri';
import 'react-toastify/dist/ReactToastify.css';
import { api } from '../../../api';

interface LoginFormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

export default function Login() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
      setIsLoading(true);
      const response = await api.post('https://silver-umbrella-5gr55qpvqxjw249v6-8000.app.github.dev/api/v1/auth/login/', formData); // Updated URL
      if (response.status === 200) {
        // Store all user data in localStorage
        const userData = response.data;
        Object.entries(userData).forEach(([key, value]) => {
          localStorage.setItem(key, String(value));
        });
        // Store user role in localStorage
        localStorage.setItem('role', userData.role);
        // Store token in localStorage
        localStorage.setItem('accessToken', userData.token); // Updated key to 'accessToken'
        
        toast.success('Login successful! Redirecting to dashboard...');
        router.push('/dashboard');
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error('Login failed. Endpoint not found.');
      } else {
        console.error('Error during login:', error);
        toast.error('Login failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row bg-white overflow-hidden">
          {/* Left side - Image */}
          <div className="hidden lg:block lg:w-1/2 relative rounded-2xl overflow-hidden min-h-[500px]">
            <Image
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1470&auto=format&fit=crop"
              alt="Luxury Home"
              fill
              priority
              className="object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
              <div className="absolute bottom-8 left-8 text-white">
                <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
                <p className="text-lg">Access your real estate portfolio</p>
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="w-full lg:w-1/2 p-8 lg:p-12">
            <div className="flex items-center justify-center mb-9">
              <RiHome2Line className="w-7 h-7 text-blue-800 mr-2" />
              <h1 className="text-md font-semibold text-blue-800">Dream House</h1>
            </div>

            <div className="flex items-center justify-center mb-4">
              <h1 className="text-2xl font-semibold text-blue-800">Login to an Account</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-7 p-10">
              <div className="relative">
                <label className="block text-sm font-normal text-gray-700 mb-1">Email</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <FiMail />
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm transition-colors border-gray-300 focus:ring-blue-200 focus:border-blue-500"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs font-normal mt-1 flex items-center">
                    <FiAlertCircle className="mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="relative">
                <label className="block text-sm font-normal text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <FiLock />
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="mt-1 block w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm transition-colors border-gray-300 focus:ring-blue-200 focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs font-normal mt-1 flex items-center">
                    <FiAlertCircle className="mr-1" />
                    {errors.password}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 
                         transition duration-300 flex items-center justify-center disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="animate-spin mr-2">⌛</span>
                ) : (
                  <FiLogIn className="mr-2" />
                )}
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}