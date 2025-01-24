"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Changed from 'next/router'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api } from '../../../api'; // Import the axios instance
import axios, { AxiosResponse } from 'axios';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirm: '',
    role: ['buyer', 'seller'], // Default roles
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
        role: formData.role,
      });
      if (response.status === 201) {
        toast.success('Signup successful! Redirecting to verify email...');
        router.push('/auth/verify-email'); // Ensure the correct path is used
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error('Error response data:', error.response.data);
          toast.error(`Signup failed: ${error.response.data.detail || 'Please try again.'}`);
        } else {
          console.error('Error response is undefined');
          toast.error('Signup failed. Please try again.');
        }
      } else {
        console.error('Error during registration:', error);
        toast.error('Signup failed. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="mt-6">
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
            <input type="hidden" name="role" value={JSON.stringify(formData.role)} />
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
            <div className="flex items-center justify-center space-x-4">
              {['Google', 'GitHub', 'Facebook'].map((provider) => (
                <button
                  key={provider}
                  className={`w-full bg-${provider.toLowerCase()}-500 text-white py-2 rounded-lg hover:bg-${provider.toLowerCase()}-600`}
                >
                  Sign Up with {provider}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}