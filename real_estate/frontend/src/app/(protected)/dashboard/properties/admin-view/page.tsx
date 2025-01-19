"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

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
}

const PropertiesPage = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<{ id: number, message: string } | null>(null);

  useEffect(() => {
    axios.get('https://opulent-memory-5pgwv57r9wwf7xg5-8000.app.github.dev/api/properties/')
      .then(response => {
        const updatedProperties = response.data.map((property: Property) => ({
          ...property,
          photo_main: property.photo_main.replace('http://localhost:8000', 'https://opulent-memory-5pgwv57r9wwf7xg5-8000.app.github.dev'),
          photo_1: property.photo_1?.replace('http://localhost:8000', 'https://opulent-memory-5pgwv57r9wwf7xg5-8000.app.github.dev'),
          photo_2: property.photo_2?.replace('http://localhost:8000', 'https://opulent-memory-5pgwv57r9wwf7xg5-8000.app.github.dev'),
          photo_3: property.photo_3?.replace('http://localhost:8000', 'https://opulent-memory-5pgwv57r9wwf7xg5-8000.app.github.dev'),
          photo_4: property.photo_4?.replace('http://localhost:8000', 'https://opulent-memory-5pgwv57r9wwf7xg5-8000.app.github.dev'),
          photo_5: property.photo_5?.replace('http://localhost:8000', 'https://opulent-memory-5pgwv57r9wwf7xg5-8000.app.github.dev'),
          documents: property.documents?.replace('http://localhost:8000', 'https://opulent-memory-5pgwv57r9wwf7xg5-8000.app.github.dev'),
        }));
        setProperties(updatedProperties);
      })
      .catch(error => {
        console.error('Error fetching properties:', error);
      });
  }, []);

  const handleDelete = (id: number) => {
    axios.delete(`https://opulent-memory-5pgwv57r9wwf7xg5-8000.app.github.dev/api/properties/${id}/`)
      .then(() => {
        setProperties(properties.filter(property => property.id !== id));
        setMessage('Property deleted successfully.');
        setError(null);
      })
      .catch(error => {
        console.error('Error deleting property:', error);
        setError({ id, message: 'Failed to delete property.' });
        setMessage(null);
        setTimeout(() => setError(null), 7000);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Properties</h1>
      {message && <div className="mb-4 text-green-500">{message}</div>}
      {error && !error.id && <div className="mb-4 text-red-500">{error.message}</div>}
      <table className="min-w-full border border-gray-200">
        <thead className="bg-gray-50 border-b-2 border-gray-200">
          <tr>
            <th className="px-4 py-2 text-left">Image</th>
            <th className="px-4 py-2 text-left">Property Name</th>
            <th className="px-4 py-2 text-left">Price</th>
            <th className="px-4 py-2 text-left">Location</th>
            <th className="px-4 py-2 text-left">Edit</th>
            <th className="px-4 py-2 text-left">Delete</th>
          </tr>
        </thead>
        <tbody>
          {properties.map(property => (
            <tr key={property.id} className="border-b border-gray-200">
              <td className="px-4 py-2">
                <img src={property.photo_main} alt={property.title} className="h-16 w-24 object-cover rounded" />
              </td>
              <td className="px-4 py-2">{property.title}</td>
              <td className="px-4 py-2">${property.price}</td>
              <td className="px-4 py-2">{property.city}</td>
              <td className="px-4 py-2">
                <Link href={`/dashboard/properties/admin-view/${property.id}/edit`} className="text-blue-500 hover:underline">
                  Edit
                </Link>
              </td>
              <td className="px-4 py-2">
                <button className="text-red-500 hover:underline" onClick={() => handleDelete(property.id)}>
                  Delete
                </button>
                {error && error.id === property.id && <div className="text-red-500">{error.message}</div>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PropertiesPage;
