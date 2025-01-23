"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ServicesPage = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get('https://silver-umbrella-5gr55qpvqxjw249v6-8000.app.github.dev/api/services/')
      .then(response => {
        setServices(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the services!', error);
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6 text-center">Services</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(service => (
          <li key={service.id} className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-2">{service.service_name}</h2>
            <p className="text-gray-700 mb-4">{service.service_description}</p>
            <p className="text-gray-600 mb-2">Provider: {service.service_provider} ({service.provider_type})</p>
            <p className="text-gray-600 mb-2">Charge: ${service.service_charge}</p>
            <p className="text-gray-600 mb-2">Type: {service.service_type}</p>
            <p className="text-gray-600">Time: {service.time_of_service}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ServicesPage;
