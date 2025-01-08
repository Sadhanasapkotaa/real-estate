"use client";
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/properties/${params.propertyId}/`);
        if (response.ok) {
          const data = await response.json();
          setProperty(data);
        } else {
          router.push('/404');
        }
      } catch (error) {
        console.error('Error fetching property:', error);
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

  const handleBookNow = () => {
    // Add logic for booking the property
    toast.success('Booking functionality not implemented yet.');
  };

  return (
    <div key={property.id} className="max-w-4xl mx-auto p-4">
      <img src={property.images[0]?.image} alt={property.title} className="w-full h-64 object-cover rounded-lg mb-4" />
      <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
      <p className="text-gray-600 mb-4">{property.description}</p>
      <p className="text-lg font-bold mb-2">Price: ${property.price}</p>
      <p className="text-gray-600 mb-2">📍 Location: {property.location}</p>
      <p className="text-gray-600 mb-2">🛏️ Bedrooms: {property.bedrooms}</p>
      <p className="text-gray-600 mb-2">🛁 Bathrooms: {property.bathrooms}</p>
      <p className="text-gray-600 mb-2">🏠 Type: {property.type}</p>
      <p className="text-gray-600 mb-4">🔖 For: {property.sale_or_rent}</p>
      <button onClick={handleBookNow} className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-700">Book Now</button>
      <ToastContainer />
    </div>
  );
}