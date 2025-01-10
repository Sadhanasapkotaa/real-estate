"use client";
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchPropertyById, bookProperty } from '@/api';

export default function Page() {
  const params = useParams();
  const router = useRouter();
  interface Property {
    id: string;
    title: string;
    description: string;
    price: number;
    location: string;
    bedrooms: number;
    bathrooms: number;
    type: string;
    sale_or_rent: string;
    images: { image: string }[];
  }

  const [property, setProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const propertyId = Array.isArray(params.propertyId) ? params.propertyId[0] : params.propertyId;
        if (!propertyId) {
          throw new Error('Property ID is missing');
        }
        const data = await fetchPropertyById(propertyId);
        if (!data) {
          throw new Error('Property not found');
        }
        setProperty(data);
      } catch (error) {
        console.error('Error fetching property:', error);
        router.push('/404');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperty();
  }, [params.propertyId, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!property) {
    return null;
  }

  const handleBookNow = async () => {
    try {
      if (!startDate || !endDate) {
        toast.error('Please select start and end dates.');
        return;
      }
      const token = localStorage.getItem('authToken'); // Retrieve the authentication token from local storage
      if (!token) {
        toast.error('You must be logged in to book a property.');
        return;
      }
      const propertyId = Array.isArray(params.propertyId) ? params.propertyId[0] : params.propertyId;
      if (propertyId) {
        await bookProperty(propertyId, { startDate, endDate });
      } else {
        toast.error('Property ID is missing.');
      }
      toast.success('Property booked successfully.');
      setShowModal(true);
    } catch {
      toast.error('Error booking property.');
    }
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      {property.images[0]?.image && (
        <Image src={property.images[0].image} alt={property.title} width={800} height={256} className="w-full h-64 object-cover rounded-lg mb-4" />
      )}
      <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
      <p className="text-gray-600 mb-4">{property.description}</p>
      <p className="text-lg font-bold mb-2">Price: ${property.price}</p>
      <p className="text-gray-600 mb-2">📍 Location: {property.location}</p>
      <p className="text-gray-600 mb-2">🛏️ Bedrooms: {property.bedrooms}</p>
      <p className="text-gray-600 mb-2">🛁 Bathrooms: {property.bathrooms}</p>
      <p className="text-gray-600 mb-2">🏠 Type: {property.type}</p>
      <p className="text-gray-600 mb-4">🔖 For: {property.sale_or_rent}</p>
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
    </>
  );
}