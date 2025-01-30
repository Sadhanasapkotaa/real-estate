"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Changed from 'next/router'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api } from '../../../api'; // Import the axios instance
import axios, { AxiosResponse } from 'axios';
import Image from 'next/image';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirm: '',
    roles: JSON.stringify(['buyer', 'seller']),
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (formData.password !== formData.password_confirm) {
      newErrors.password_confirm = 'Passwords do not match';
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
      const response = await api.post('https://silver-umbrella-5gr55qpvqxjw249v6-8000.app.github.dev/api/v1/auth/register/', {
        email: formData.email,
        first_name: formData.first_name,
        last_name: formData.last_name,
        password: formData.password,
        password2: formData.password_confirm,
        roles: formData.roles,
      });
      if (response.status === 201) {
        toast.success('Signup successful! Redirecting to verify email...');
        router.push('/auth/verify-email'); // Ensure the correct path is used
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error('Error response data:', error.response.data);
          if ((error.response as AxiosResponse).status === 404) {
            toast.error('API endpoint not found. Please check the URL.');
          }
        } else {
          console.error('Error response is undefined');
        }
      } else {
        console.error('Error during registration:', error);
        toast.error('Signup failed. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row rounded-xl shadow-lg overflow-hidden">
          {/* Image Section */}
          <div className="hidden lg:block lg:w-1/2 relative h-[600px]">
            <Image
              src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Luxury Home"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
              <div className="absolute bottom-8 left-8 text-white">
                <h2 className="text-3xl font-bold mb-2">Find Your Dream Home</h2>
                <p className="text-lg">Join us to discover perfect properties</p>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="w-full lg:w-1/2 bg-white p-6 lg:p-8">
            <h1 className="text-2xl font-bold text-center mb-6">Create an Account</h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {(['first_name', 'last_name', 'email', 'password', 'password_confirm'] as Array<keyof typeof formData>).map((field) => (
                <div key={field}>
                  <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                    {field.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                  </label>
                  <input
                    type={field.includes('password') && !showPassword ? 'password' : 'text'}
                    id={field}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
                </div>
              ))}
              <input type="hidden" name="roles" value={formData.roles} />
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="showPassword"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                  className="mr-2"
                />
                <label htmlFor="showPassword" className="text-sm text-gray-700">Show Password</label>
              </div>
              <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">
                Sign Up
              </button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {['Google', 'GitHub', 'Facebook'].map((provider) => (
                  <button
                    key={provider}
                    className="flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    {provider}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}