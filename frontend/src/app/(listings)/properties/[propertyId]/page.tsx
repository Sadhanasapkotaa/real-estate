"use client";
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchPropertyById } from '@/api';

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

  const handleBookNow = () => {
    // Add logic for booking the property
    toast.success('Booking functionality not implemented yet.');
  };

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
      <button onClick={handleBookNow} className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-700">Book Now</button>
      <ToastContainer />
    </>
  );
}