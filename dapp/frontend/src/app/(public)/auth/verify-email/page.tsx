"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { RiMailLine, RiCheckLine, RiErrorWarningLine, RiLoader4Line, RiHome2Line } from 'react-icons/ri';

export default function VerifyEmailPage() {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [countdown, setCountdown] = useState(180);
  const [canResend, setCanResend] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (countdown > 0 && !canResend) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setCanResend(true);
    }
  }, [countdown]);

  const handleResendOTP = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://silver-umbrella-5gr55qpvqxjw249v6-8000.app.github.dev/api/v1/auth/resend-otp/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (response.ok) {
        setMessage({ type: 'success', text: 'OTP resent successfully!' });
        setCanResend(false);
        setCountdown(60);
      } else {
        throw new Error('Failed to resend OTP');
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to resend OTP. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch('https://silver-umbrella-5gr55qpvqxjw249v6-8000.app.github.dev/api/v1/auth/verify/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp }),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Email verified successfully!' });
        setTimeout(() => router.push('/auth/login'), 1500);
      } else {
        throw new Error('Invalid OTP');
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Invalid OTP. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl overflow-hidden flex flex-col lg:flex-row">
          {/* Image Section */}
          <div className="hidden lg:block lg:w-1/2 relative h-full min-h-[500px] rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3"
              alt="Email Verification"
              fill
              priority
              className="object-cover transition-transform hover:scale-105 duration-700 rounded-2xl"
              sizes="(max-width: 1024px) 100vw, 50vw"
              quality={85}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-2xl">
              <div className="absolute bottom-12 left-12 text-white">
                <h2 className="text-3xl font-bold mb-3">Almost There!</h2>
                <p className="text-lg font-light opacity-90">Verify your email to unlock all features</p>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
            <div className="text-center mb-10">
            <div className="flex items-center justify-center mb-9">
            <RiHome2Line className="w-7 h-7 text-blue-800 mr-2" />
            <h1 className="text-md font-semibold text-blue-800">Dream House</h1>
          </div>

              <h1 className="text-2xl font-semibold text-blue-800 mb-3">Verify Your Email</h1>
              <p className="text-gray-400">We've emailed you an OTP!</p>
            </div>

            {message && (
              <div className={`mb-6 p-4 rounded-xl border ${
                message.type === 'success' 
                  ? 'bg-green-50 border-green-100 text-green-800' 
                  : 'bg-red-50 border-red-100 text-red-800'
              } animate-fadeIn`}>
                <div className="flex items-center">
                  {message.type === 'success' 
                    ? <RiCheckLine className="w-5 h-5 mr-2" /> 
                    : <RiErrorWarningLine className="w-5 h-5 mr-2" />}
                  <span className="font-medium">{message.text}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">
                  Verification Code
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    name="otp"
                    value={otp}
                    onChange={handleChange}
                    className="block w-full px-4 py-3.5 text-gray-700 placeholder-gray-300 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-center text-md tracking-wider font-medium"
                    placeholder="Enter 6-digit code"
                    maxLength={6}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 px-4 rounded-xl transition-all duration-200 font-semibold flex items-center justify-center disabled:opacity-70 disabled:hover:bg-blue-600 group"
              >
                {loading ? (
                  <RiLoader4Line className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  <RiCheckLine className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                )}
                {loading ? 'Verifying...' : 'Verify Email'}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={!canResend || loading}
                  className="text-blue-600 hover:text-blue-800 font-medium disabled:text-gray-400 disabled:hover:text-gray-400 transition-colors duration-200"
                >
                  {canResend ? 'Resend verification code' : `Resend code in ${countdown}s`}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}