"use client";
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Create a custom icon
const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41]
});

const DISTRICT_CHOICES = [
  { value: 'bhojpur', label: 'Bhojpur' },
  { value: 'dhankuta', label: 'Dhankuta' },
  // ...other districts...
  { value: 'doti', label: 'Doti' },
];

const AMENITIES_CHOICES = [
  { value: 'garage', label: 'Garage' },
  { value: 'pool', label: 'Pool' },
  { value: 'fireplace', label: 'Fireplace' },
];

const TAG_CHOICES = [
  { value: 'featured', label: 'Featured' },
  { value: 'hot_deal', label: 'Hot Deal' },
];

const PROVINCE_CHOICES = [
  { value: 'province_1', label: 'Province 1' },
  { value: 'madhesh_pradesh', label: 'Madhesh Pradesh' },
  { value: 'bagmati_province', label: 'Bagmati Province' },
  { value: 'gandaki', label: 'Gandaki' },
  { value: 'lumbini', label: 'Lumbini' },
  { value: 'karnali', label: 'Karnali' },
  { value: 'sudurpaschim', label: 'Sudurpaschim' },
];

const AddPropertyPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    map_link: '',
    status: '',
    province: '',
    district: '',
    city: '',
    price: '',
    bed: '',
    bath: '',
    area: '',
    plot_number: '',
    photo_main: null,
    photo_1: null,
    photo_2: null,
    photo_3: null,
    photo_4: null,
    photo_5: null,
    sale_or_rent: '',
    property_type: '',
    year_built: '',
    total_floors: '',
    floor_number: '',
    amenities: [],
    tags: '',
    documents: null,
    photos: []
  });

  const [markerPosition, setMarkerPosition] = useState({ lat: 28.3949, lng: 84.1240 }); // Default location set to Nepal

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setMarkerPosition({ lat: latitude, lng: longitude });
        setFormData({ ...formData, map_link: `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}` });
      });
    }
  }, []);

  const handleMapClick = (e) => {
    setMarkerPosition({ lat: e.latlng.lat, lng: e.latlng.lng });
    setFormData({ ...formData, map_link: `https://www.openstreetmap.org/?mlat=${e.latlng.lat}&mlon=${e.latlng.lng}` });
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      if (name === 'photos') {
        setFormData({ ...formData, photos: Array.from(files) });
      } else {
        setFormData({ ...formData, [name]: files[0] });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    // Ensure to handle the photos array in the backend to place them in each position manually
  };

  const MapClickHandler = () => {
    useMapEvents({
      click: handleMapClick,
    });
    return null;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Property</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
        <MapContainer center={markerPosition} zoom={10} style={{ height: "400px", width: "100%" }} className="mb-4">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={markerPosition} icon={customIcon} />
          <MapClickHandler />
        </MapContainer>
        <input type="text" name="map_link" placeholder="Map Link" value={formData.map_link} onChange={handleChange} readOnly className="w-full p-2 border border-gray-300 rounded" />
        <select name="status" value={formData.status} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded">
          <option value="">Select Status</option>
          <option value="available">Available</option>
          <option value="booked">Booked</option>
          <option value="sold">Sold</option>
          <option value="rented">Rented</option>
          <option value="off_market">Off Market</option>
          <option value="unapproved">Unapproved</option>
        </select>
        <select name="province" value={formData.province} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded">
          <option value="">Select Province</option>
          {PROVINCE_CHOICES.map((province) => (
            <option key={province.value} value={province.value}>{province.label}</option>
          ))}
        </select>
        <select name="district" value={formData.district} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded">
          <option value="">Select District</option>
          {DISTRICT_CHOICES.map((district) => (
            <option key={district.value} value={district.value}>{district.label}</option>
          ))}
        </select>
        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
        <input type="number" name="bed" placeholder="Number of Bedrooms" value={formData.bed} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
        <input type="number" name="bath" placeholder="Number of Bathrooms" value={formData.bath} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
        <input type="number" name="area" placeholder="Area (sq ft)" value={formData.area} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
        <input type="number" name="plot_number" placeholder="Plot Number" value={formData.plot_number} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
        <input type="file" name="photo_main" onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
        <input type="file" name="photo_1" onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
        <input type="file" name="photo_2" onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
        <input type="file" name="photo_3" onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
        <input type="file" name="photo_4" onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
        <input type="file" name="photo_5" onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
        <input type="file" name="photos" onChange={handleChange} multiple className="w-full p-2 border border-gray-300 rounded" />
        <select name="sale_or_rent" value={formData.sale_or_rent} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded">
          <option value="">Sale or Rent</option>
          <option value="sale">For Sale</option>
          <option value="rent">For Rent</option>
        </select>
        <select name="property_type" value={formData.property_type} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded">
          <option value="">Property Type</option>
          <option value="house">House</option>
          <option value="apartment">Apartment</option>
          <option value="condo">Condo</option>
          <option value="land">Land</option>
        </select>
        <input type="number" name="year_built" placeholder="Year Built" value={formData.year_built} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
        <input type="number" name="total_floors" placeholder="Total Floors" value={formData.total_floors} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
        <input type="number" name="floor_number" placeholder="Floor Number" value={formData.floor_number} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
        <select name="amenities" value={formData.amenities} onChange={handleChange} multiple className="w-full p-2 border border-gray-300 rounded">
          {AMENITIES_CHOICES.map((amenity) => (
            <option key={amenity.value} value={amenity.value}>{amenity.label}</option>
          ))}
        </select>
        <select name="tags" value={formData.tags} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded">
          <option value="">Select Tags</option>
          {TAG_CHOICES.map((tag) => (
            <option key={tag.value} value={tag.value}>{tag.label}</option>
          ))}
        </select>
        <input type="file" name="documents" onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Add Property</button>
      </form>
    </div>
  );
};

export default AddPropertyPage;
