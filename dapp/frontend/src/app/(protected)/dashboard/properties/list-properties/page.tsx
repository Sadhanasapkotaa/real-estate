"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { FaBed, FaBath, FaRulerCombined, FaBuilding, FaTag } from 'react-icons/fa';
import withAuth from '../../../../hoc/withAuth';
import Navbar from '../../Navbar';  // Add this import

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
  property_type: string;  // Add this line
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
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Properties</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property, index) => (
            <div key={property.id || index} className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
              <div className="relative">
                <img src={property.photo_main} alt={property.title} className="w-full h-64 object-cover" />
                <div className="absolute top-4 left-4">
                  <span className={`inline-block px-4 py-2 rounded-lg text-sm font-semibold text-white ${property.sale_or_rent === 'sale' ? 'bg-orange-500' : 'bg-blue-500'}`}>
                    {property.sale_or_rent === 'sale' ? 'For Sale' : 'For Rent'}
                  </span>
                </div>
                
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <p className="text-2xl font-bold text-orange-600">${property.price.toLocaleString()}</p>
                  <span className="text-sm text-gray-600">{property.property_type}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center text-gray-600">
                    <FaBed className="text-lg mr-2 text-gray-500" />
                    <span>{property.bed} Beds</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaBath className="text-lg mr-2 text-gray-500" />
                    <span>{property.bath} Baths</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaRulerCombined className="text-lg mr-2 text-gray-500" />
                    <span>{property.area} sq ft</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaBuilding className="text-lg mr-2 text-gray-500" />
                    <span>{property.total_floors} Floors</span>
                  </div>
                </div>
                <Link href={`/dashboard/properties/list-properties/${property.id}`} 
                      className="inline-block w-full text-center bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default withAuth(PropertiesPage);
