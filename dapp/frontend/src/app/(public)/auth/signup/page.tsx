"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Changed from 'next/router'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api } from '../../../api'; // Import the axios instance
import axios, { AxiosResponse } from 'axios';
import Image from 'next/image';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiUserPlus, FiAlertCircle } from 'react-icons/fi'; // Add icons import

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
  const [generalError, setGeneralError] = useState<string>('');
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
    setGeneralError('');
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
      if (axios.isAxiosError(error) && error.response) {
        const responseData = error.response.data;
        if (typeof responseData === 'object') {
          const backendErrors: { [key: string]: string } = {};
          
          // Extract error messages from ErrorDetail objects
          Object.entries(responseData).forEach(([key, value]) => {
            if (Array.isArray(value) && value.length > 0) {
              // Handle ErrorDetail format
              const errorDetail = value[0];
              if (typeof errorDetail === 'object' && 'string' in errorDetail) {
                backendErrors[key] = errorDetail.string;
              } else {
                backendErrors[key] = String(value[0]);
              }
            } else if (typeof value === 'string') {
              backendErrors[key] = value;
            }
          });

          setErrors(backendErrors);
          
          // Set general error message from the first error
          const firstError = Object.values(backendErrors)[0];
          if (firstError) {
            setGeneralError(firstError);
            toast.error(firstError);
          }
        } else {
          const errorMessage = 'An unexpected error occurred';
          setGeneralError(errorMessage);
          toast.error(errorMessage);
        }
      } else {
        const errorMessage = 'Signup failed. Please try again.';
        setGeneralError(errorMessage);
        toast.error(errorMessage);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row overflow-hidden">
          {/* Image Section */}
          <div className="hidden lg:block lg:w-1/2 relative max-h-[600px] rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Luxury Home"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              quality={85}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent">
              <div className="absolute bottom-8 left-8 text-white">
                <h2 className="text-2xl font-semibold mb-2">Find Your Dream Home</h2>
                <p className="text-sm font-light">Join us to discover perfect properties</p>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="w-full lg:w-1/2 bg-white p-6 lg:p-8">
            <div className="flex items-center justify-center mb-4">
              {/* <FiUserPlus className="text-3xl text-blue-600 mr-2" /> */}
              <h1 className="text-2xl font-semibold text-blue-800">Create an Account</h1>
            </div>
            <form className="space-y-5 p-10 py-5" onSubmit={handleSubmit}>
              {(['first_name', 'last_name', 'email', 'password', 'password_confirm'] as Array<keyof typeof formData>).map((field) => (
                <div key={field} className="relative">
                  <label htmlFor={field} className="block text-sm font-normal text-gray-700 mb-1">
                    {field.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      {field.includes('name') ? <FiUser /> :
                       field === 'email' ? <FiMail /> :
                       field.includes('password') ? <FiLock /> : null}
                    </span>
                    <input
                      type={field.includes('password') && !showPassword ? 'password' : 'text'}
                      id={field}
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      className={`mt-1 block w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm transition-colors
                        ${errors[field] 
                          ? 'border-red-300 bg-red-50 focus:ring-red-200 focus:border-red-500' 
                          : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
                        }`}
                    />
                    {field.includes('password') && (
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                      </button>
                    )}
                  </div>
                  {errors[field] && (
                    <p className="text-red-500 text-xs font-normal mt-1 flex items-center">
                      <FiAlertCircle className="mr-1" />
                      {errors[field]}
                    </p>
                  )}
                </div>
              ))}
              <input type="hidden" name="roles" value={formData.roles} />
              
              {/* Error message above button */}
              {generalError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                  <div className="flex items-start">
                    <FiAlertCircle className="text-red-500 mr-2 mt-0.5" />
                    <p className="text-red-700 text-sm">{generalError}</p>
                  </div>
                </div>
              )}
              
              <button type="submit" className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 transition duration-300 text-sm font-normal flex items-center justify-center">
                <FiUserPlus className="mr-2" />
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}