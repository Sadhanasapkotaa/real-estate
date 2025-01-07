"use client";
import React, { useState, useEffect } from 'react';

const AddProperty = () => {
  const [property, setProperty] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    type: '',
    saleOrRent: '',
    images: []
  });

  useEffect(() => {
    const loadScript = (url) => {
      const script = document.createElement('script');
      script.src = url;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    };

    loadScript(`https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places&callback=initMap`);
    window.initMap = initMap;
  }, []);

  const initMap = () => {
    const input = document.getElementById('location');
    const autocomplete = new window.google.maps.places.Autocomplete(input);
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      setProperty({
        ...property,
        location: place.formatted_address
      });
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty({
      ...property,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setProperty({
      ...property,
      images: files
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(property);
    // Add logic to save the property
  };

  return (
    <div className="max-w-lg mx-auto p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
      <h1 className="text-2xl font-bold text-center mb-6">Add Property</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" placeholder="Title" value={property.title} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
        <textarea name="description" placeholder="Description" value={property.description} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" rows="4"></textarea>
        <input type="number" name="price" placeholder="Price" value={property.price} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
        <input type="text" id="location" name="location" placeholder="Location" value={property.location} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
        <input type="number" name="bedrooms" placeholder="Bedrooms" value={property.bedrooms} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
        <input type="number" name="bathrooms" placeholder="Bathrooms" value={property.bathrooms} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
        <input type="text" name="type" placeholder="Type" value={property.type} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input type="radio" name="saleOrRent" value="sale" checked={property.saleOrRent === 'sale'} onChange={handleChange} className="mr-2" />
            Sale
          </label>
          <label className="flex items-center">
            <input type="radio" name="saleOrRent" value="rent" checked={property.saleOrRent === 'rent'} onChange={handleChange} className="mr-2" />
            Rent
          </label>
        </div>
        <input type="file" name="images" multiple onChange={handleImageChange} className="w-full p-2 border border-gray-300 rounded" />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-700">Add Property</button>
      </form>
    </div>
  );
};

export default AddProperty;