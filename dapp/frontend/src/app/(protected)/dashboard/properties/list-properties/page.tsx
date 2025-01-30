"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { FaBed, FaBath, FaRulerCombined, FaBuilding, FaTag } from 'react-icons/fa';
import withAuth from '../../../../hoc/withAuth';

interface Property {
  id: number;
  title: string;
  description: string;
  price: number;
  city: string;
  bed: number;
  bath: number;
  area: number;
  total_floors?: number;
  sale_or_rent: string;
  photo_main: string;
  status: string; // Added status property
  photo_1?: string;
  photo_2?: string;
  photo_3?: string;
  photo_4?: string;
  photo_5?: string;
  documents?: string;
}

const PropertiesPage = () => {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    axios.get('https://silver-umbrella-5gr55qpvqxjw249v6-8000.app.github.dev/api/properties/')
      .then(response => {
        const updatedProperties = response.data
          .filter((property: Property) => property.status === 'available') // Filter properties by status
          .map((property: Property) => ({
            ...property,
            photo_main: property.photo_main.replace('http://localhost:8000', 'https://silver-umbrella-5gr55qpvqxjw249v6-8000.app.github.dev'),
            photo_1: property.photo_1?.replace('http://localhost:8000', 'https://silver-umbrella-5gr55qpvqxjw249v6-8000.app.github.dev'),
            photo_2: property.photo_2?.replace('http://localhost:8000', 'https://silver-umbrella-5gr55qpvqxjw249v6-8000.app.github.dev'),
            photo_3: property.photo_3?.replace('http://localhost:8000', 'https://silver-umbrella-5gr55qpvqxjw249v6-8000.app.github.dev'),
            photo_4: property.photo_4?.replace('http://localhost:8000', 'https://silver-umbrella-5gr55qpvqxjw249v6-8000.app.github.dev'),
            photo_5: property.photo_5?.replace('http://localhost:8000', 'https://silver-umbrella-5gr55qpvqxjw249v6-8000.app.github.dev'),
            documents: property.documents?.replace('http://localhost:8000', 'https://silver-umbrella-5gr55qpvqxjw249v6-8000.app.github.dev'),
          }));
        setProperties(updatedProperties);
      })
      .catch(error => {
        console.error('Error fetching properties:', error);
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Properties</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property, index) => (
          <div key={property.id || index} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={property.photo_main} alt={property.title} className="w-full h-56 object-cover" />
            <div className="p-6">
              <p className="text-gray-700 mb-2 flex items-center justify-between">
                <span className={`inline-block px-3 py-1 rounded-full text-white ${property.sale_or_rent === 'sale' ? 'bg-orange-500' : 'bg-blue-500'}`}>
                  {property.sale_or_rent === 'sale' ? 'For Sale' : 'For Rent'}
                </span>
                <span className="text-lg font-semibold"><FaTag className="inline-block mr-1" />${property.price}</span>
              </p>
              <h2 className="text-2xl font-bold mb-2">{property.title}</h2>
              <p className="text-gray-700 mb-4">
                <span><FaBed className="inline-block mr-1" />{property.bed}</span>
                <span className="ml-4"><FaBath className="inline-block mr-1" />{property.bath}</span>
                <span className="ml-4"><FaRulerCombined className="inline-block mr-1" />{property.area} sq ft</span>
                <span className="ml-4"><FaBuilding className="inline-block mr-1" />{property.total_floors}</span>
              </p>
              <p className="text-gray-700 mb-4">{property.description.substring(0, 50)}... <Link href={`/dashboard/properties/list-properties/${property.id}`} legacyBehavior>
                <a className="text-blue-500 hover:underline">See more</a>
              </Link></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default withAuth(PropertiesPage);
