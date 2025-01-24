"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Pie, Bar, Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement } from 'chart.js';
import withAuth from '../../../../../hoc/withAuth';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement);

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
  status: string; // added status field
  payment: number; // added payment field
  listed_since: string; // added listed_since field
}

const PropertiesPage = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<{ id: number, message: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [bedRange, setBedRange] = useState<[number, number]>([0, 10]);
  const [bathRange, setBathRange] = useState<[number, number]>([0, 10]);
  const [cityFilter, setCityFilter] = useState<string>('');
  const [propertyType, setPropertyType] = useState<string>('');

  useEffect(() => {
    axios.get('https://silver-umbrella-5gr55qpvqxjw249v6-8000.app.github.dev/api/properties/')
      .then(response => {
        const updatedProperties = response.data.map((property: Property) => ({
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

  const handleDelete = (id: number) => {
    axios.delete(`https://silver-umbrella-5gr55qpvqxjw249v6-8000.app.github.dev/api/properties/${id}/`)
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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handlePriceRange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newRange = [...priceRange];
    newRange[index] = parseInt(event.target.value);
    setPriceRange(newRange as [number, number]);
  };

  const handleBedRange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newRange = [...bedRange];
    newRange[index] = parseInt(event.target.value);
    setBedRange(newRange as [number, number]);
  };

  const handleBathRange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newRange = [...bathRange];
    newRange[index] = parseInt(event.target.value);
    setBathRange(newRange as [number, number]);
  };

  const handleCityFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCityFilter(event.target.value);
  };

  const handlePropertyType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPropertyType(event.target.value);
  };

  const filterProperties = (properties: Property[]) => {
    return properties.filter(property =>
      property.title.toLowerCase().includes(searchQuery) &&
      property.price >= priceRange[0] && property.price <= priceRange[1] &&
      property.bed >= bedRange[0] && property.bed <= bedRange[1] &&
      property.bath >= bathRange[0] && property.bath <= bathRange[1] &&
      (cityFilter ? property.city.toLowerCase() === cityFilter.toLowerCase() : true) &&
      (propertyType ? property.sale_or_rent.toLowerCase() === propertyType.toLowerCase() : true)
    );
  };

  const renderProperties = (properties: Property[]) => (
    <table className="min-w-full border border-gray-200">
      <thead className="bg-gray-50 border-b-2 border-gray-200">
        <tr>
          <th className="px-4 py-2 text-left">Image</th>
          <th className="px-4 py-2 text-left">Property Name</th>
          <th className="px-4 py-2 text-left">Price</th>
          <th className="px-4 py-2 text-left">Location</th>
          <th className="px-4 py-2 text-left">Payment</th>
          <th className="px-4 py-2 text-left">Listed Since</th>
          <th className="px-4 py-2 text-left">Edit</th>
          <th className="px-4 py-2 text-left">Delete</th>
          <th className="px-4 py-2 text-left">View Negotiations</th>
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
            <td className="px-4 py-2">${property.payment}</td>
            <td className="px-4 py-2">{property.listed_since}</td>
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
            <td className="px-4 py-2">
              <Link href={`/dashboard/properties/admin-view/${property.id}/negotiations`} className="text-blue-500 hover:underline">
                View Negotiations
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const activeListings = properties.filter(property => property.status === 'available');
  const activeBookings = properties.filter(property => property.status === 'booked');
  const pastBookings = properties.filter(property => property.status === 'sold' || property.status === 'rented');
  const unapproved = properties.filter(property => property.status === 'unapproved');
  const offMarket = properties.filter(property => property.status === 'off_market');

  const statusCounts = {
    available: activeListings.length,
    booked: activeBookings.length,
    sold: properties.filter(property => property.status === 'sold').length,
    rented: properties.filter(property => property.status === 'rented').length,
    unapproved: unapproved.length,
    off_market: offMarket.length,
  };

  const paymentData = properties.map(property => property.payment);
  const listedSinceData = properties.map(property => new Date(property.listed_since).getTime());
  const priceData = properties.map(property => ({ x: property.price, y: property.area }));

  const pieData = {
    labels: ['Available', 'Booked', 'Sold', 'Rented', 'Unapproved', 'Off Market'],
    datasets: [
      {
        label: '# of Properties',
        data: [
          statusCounts.available,
          statusCounts.booked,
          statusCounts.sold,
          statusCounts.rented,
          statusCounts.unapproved,
          statusCounts.off_market,
        ],
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels: ['Available', 'Booked', 'Sold', 'Rented', 'Unapproved', 'Off Market'],
    datasets: [
      {
        label: '# of Properties',
        data: [
          statusCounts.available,
          statusCounts.booked,
          statusCounts.sold,
          statusCounts.rented,
          statusCounts.unapproved,
          statusCounts.off_market,
        ],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const paymentBarData = {
    labels: properties.map(property => property.title),
    datasets: [
      {
        label: 'Payment',
        data: paymentData,
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const listedSinceBarData = {
    labels: properties.map(property => property.title),
    datasets: [
      {
        label: 'Listed Since',
        data: listedSinceData,
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
    ],
  };

  const scatterData = {
    datasets: [
      {
        label: 'Price vs Area',
        data: priceData,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Properties</h1>
      {message && <div className="mb-4 text-green-500">{message}</div>}
      {error && !error.id && <div className="mb-4 text-red-500">{error.message}</div>}

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Property Status Distribution</h2>
        <div className="flex justify-around">
          <div className="w-1/2">
            <Pie data={pieData} />
          </div>
          <div className="w-1/2">
            <Bar data={barData} />
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Price vs Area Distribution</h2>
        <Scatter data={scatterData} />
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Listed Since Distribution</h2>
        <Bar data={listedSinceBarData} />
      </div>
      
      <h2 className="text-xl font-bold mb-2">Listed</h2>
      <p className="mb-4">These are the properties that are currently available for sale or rent.</p>
      {renderProperties(activeListings)}

      <h2 className="text-xl font-bold mb-2">Booked</h2>
      <p className="mb-4">These properties have been booked but not yet sold or rented.</p>
      {renderProperties(activeBookings)}

      <h2 className="text-xl font-bold mb-2">Active</h2>
      <p className="mb-4">These properties have been sold or rented.</p>
      {renderProperties(pastBookings)}

      <h2 className="text-xl font-bold mb-2">Unapproved</h2>
      <p className="mb-4">These properties are pending approval.</p>
      {renderProperties(unapproved)}

      <h2 className="text-xl font-bold mb-2">Off Market</h2>
      <p className="mb-4">These properties are no longer on the market.</p>
      {renderProperties(offMarket)}
    </div>
  );
};  

export default withAuth(PropertiesPage);