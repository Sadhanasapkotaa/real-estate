import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { bookProperty } from '@/api';

const BookingPage = () => {
  const router = useRouter();
  const { propertyId } = router.query;
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleBookNow = async () => {
    try {
      if (!startDate || !endDate) {
        toast.error('Please select start and end dates.');
        return;
      }
      const token = localStorage.getItem('authToken'); // Retrieve the authentication token from local storage
      if (!token) {
        toast.error('You must be logged in to book a property.');
        router.push('/login'); // Redirect to login page
        return;
      }
      if (typeof propertyId === 'string') {
        await bookProperty(propertyId, { startDate, endDate });
      } else {
        toast.error('Invalid property ID.');
      }
      toast.success('Property booked successfully.');
      setShowModal(true);
    } catch {
      toast.error('Error booking property.');
    }
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <div>
      <h1>Book Property</h1>
      <div className="mb-4">
        <label className="block text-gray-700">Start Date:</label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full p-2 border rounded" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">End Date:</label>
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full p-2 border rounded" />
      </div>
      <button onClick={handleBookNow} className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-700">Book Now</button>
      <ToastContainer />
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Booking Successful</h2>
            <p className="mb-4">Your booking was successful. Would you like to pay now or pay later?</p>
            <div className="flex justify-end">
              <button onClick={handleCloseModal} className="p-2 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2">Pay Later</button>
              <button onClick={() => { /* Add payment logic here */ }} className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700">Pay Now</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
