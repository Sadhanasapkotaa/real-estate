"use client";
import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FilterContext } from '@/components/common/FilterContext';
import { fetchData } from '@/api';

const PropertyList = () => {
  const { filters } = useContext(FilterContext);
  interface Property {
    id: number;
    title: string;
    description: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    type: string;
    sale_or_rent: string;
    location: string;
    images: { image: string }[];
  }

  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await fetchData(`properties/`);
        setProperties(data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const getFilteredProperties = () => {
    return properties.filter(property => {
      if (filters.minPrice && property.price < Number(filters.minPrice)) return false;
      if (filters.maxPrice && property.price > Number(filters.maxPrice)) return false;
      if (filters.bedrooms && property.bedrooms !== Number(filters.bedrooms)) return false;
      if (filters.bathrooms && property.bathrooms !== Number(filters.bathrooms)) return false;
      if (filters.location && !property.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
      if (filters.propertyType && property.type !== filters.propertyType) return false;
      if (filters.saleOrRent && property.sale_or_rent !== filters.saleOrRent) return false;
      return true;
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {getFilteredProperties().map((property) => (
          <div key={property.id} className="border rounded-lg overflow-hidden shadow-lg">
            {property.images[0]?.image && (
              <Image src={property.images[0].image} alt={property.title} width={500} height={300} className="w-full h-48 object-cover rounded-t-lg" />
            )}
            <div className="p-4">
              <h2 className="text-xl font-bold mt-2">{property.title}</h2>
              <p className="text-gray-700">{property.description}</p>
              <p className="text-gray-900 font-semibold">Price: ${property.price}</p>
              <p className="text-gray-700">🛏️ Bedrooms: {property.bedrooms}</p>
              <p className="text-gray-700">🛁 Bathrooms: {property.bathrooms}</p>
              <p className="text-gray-700">🏠 Type: {property.type}</p>
              <p className="text-gray-700">🔖 For: {property.sale_or_rent}</p>
              <p className="text-gray-700">📍 Location: {property.location}</p>
              <Link href={`/properties/${property.id}`}>
                <span className="text-blue-500">See More</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyList;