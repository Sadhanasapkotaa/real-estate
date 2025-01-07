"use client";
import { useRouter, useParams } from 'next/navigation';
import properties from '../data';

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const property = properties.find(p => p.id === Number(params.propertyId));

  if (!property) {
    router.push('/404');
    return null;
  }

  return (
    <div key={property.id} className="max-w-4xl mx-auto p-4">
      <img src={property.image} alt={property.title} className="w-full h-64 object-cover rounded-lg mb-4" />
      <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
      <p className="text-gray-600 mb-4">{property.description}</p>
      <p className="text-lg font-bold mb-2">Price: ${property.price}</p>
      <p className="text-gray-600 mb-2">📍 Location: {property.location}</p>
      <p className="text-gray-600 mb-2">🛏️ Bedrooms: {property.bedrooms}</p>
      <p className="text-gray-600 mb-2">🛁 Bathrooms: {property.bathrooms}</p>
      <p className="text-gray-600 mb-2">🏠 Type: {property.type}</p>
      <p className="text-gray-600 mb-4">🔖 For: {property.saleOrRent}</p>
    </div>
  );
}