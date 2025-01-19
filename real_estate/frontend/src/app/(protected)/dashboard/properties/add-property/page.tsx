"use client";
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41]
});

const DISTRICT_CHOICES = [
  { value: 'achham', label: 'Achham' },
  { value: 'arghakhanchi', label: 'Arghakhanchi' },
  { value: 'baglung', label: 'Baglung' },
  { value: 'baitadi', label: 'Baitadi' },
  { value: 'bajhang', label: 'Bajhang' },
  { value: 'bajura', label: 'Bajura' },
  { value: 'banke', label: 'Banke' },
  { value: 'bara', label: 'Bara' },
  { value: 'bardiya', label: 'Bardiya' },
  { value: 'bhaktapur', label: 'Bhaktapur' },
  { value: 'bhojpur', label: 'Bhojpur' },
  { value: 'chitwan', label: 'Chitwan' },
  { value: 'dadeldhura', label: 'Dadeldhura' },
  { value: 'dailekh', label: 'Dailekh' },
  { value: 'dang', label: 'Dang' },
  { value: 'darchula', label: 'Darchula' },
  { value: 'dhading', label: 'Dhading' },
  { value: 'dhankuta', label: 'Dhankuta' },
  { value: 'dhanusha', label: 'Dhanusha' },
  { value: 'dholkha', label: 'Dholkha' },
  { value: 'dolpa', label: 'Dolpa' },
  { value: 'doti', label: 'Doti' },
  { value: 'gorkha', label: 'Gorkha' },
  { value: 'gulmi', label: 'Gulmi' },
  { value: 'humla', label: 'Humla' },
  { value: 'ilam', label: 'Ilam' },
  { value: 'jajarkot', label: 'Jajarkot' },
  { value: 'jhapa', label: 'Jhapa' },
  { value: 'jumla', label: 'Jumla' },
  { value: 'kailali', label: 'Kailali' },
  { value: 'kalikot', label: 'Kalikot' },
  { value: 'kanchanpur', label: 'Kanchanpur' },
  { value: 'kapilvastu', label: 'Kapilvastu' },
  { value: 'kaski', label: 'Kaski' },
  { value: 'kathmandu', label: 'Kathmandu' },
  { value: 'kavrepalanchok', label: 'Kavrepalanchok' },
  { value: 'khotang', label: 'Khotang' },
  { value: 'lalitpur', label: 'Lalitpur' },
  { value: 'lamjung', label: 'Lamjung' },
  { value: 'mahottari', label: 'Mahottari' },
  { value: 'makwanpur', label: 'Makwanpur' },
  { value: 'manang', label: 'Manang' },
  { value: 'morang', label: 'Morang' },
  { value: 'mugu', label: 'Mugu' },
  { value: 'mustang', label: 'Mustang' },
  { value: 'myagdi', label: 'Myagdi' },
  { value: 'nawalpur', label: 'Nawalpur' },
  { value: 'nuwakot', label: 'Nuwakot' },
  { value: 'okhaldhunga', label: 'Okhaldhunga' },
  { value: 'palpa', label: 'Palpa' },
  { value: 'panchthar', label: 'Panchthar' },
  { value: 'parbat', label: 'Parbat' },
  { value: 'parsa', label: 'Parsa' },
  { value: 'pyuthan', label: 'Pyuthan' },
  { value: 'ramechhap', label: 'Ramechhap' },
  { value: 'rasuwa', label: 'Rasuwa' },
  { value: 'rautahat', label: 'Rautahat' },
  { value: 'rolpa', label: 'Rolpa' },
  { value: 'rukum_east', label: 'Rukum East' },
  { value: 'rukum_west', label: 'Rukum West' },
  { value: 'rupandehi', label: 'Rupandehi' },
  { value: 'salyan', label: 'Salyan' },
  { value: 'sankhuwasabha', label: 'Sankhuwasabha' },
  { value: 'saptari', label: 'Saptari' },
  { value: 'sarlahi', label: 'Sarlahi' },
  { value: 'sindhuli', label: 'Sindhuli' },
  { value: 'sindhupalchok', label: 'Sindhupalchok' },
  { value: 'siraha', label: 'Siraha' },
  { value: 'solukhumbu', label: 'Solukhumbu' },
  { value: 'sunsari', label: 'Sunsari' },
  { value: 'surkhet', label: 'Surkhet' },
  { value: 'syangja', label: 'Syangja' },
  { value: 'tanahun', label: 'Tanahun' },
  { value: 'taplejung', label: 'Taplejung' },
  { value: 'terhathum', label: 'Terhathum' },
  { value: 'udayapur', label: 'Udayapur' },
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
    photos: [],
    realtor: 1, // Default value
    owner: 1 // Default value
  });

  const [markerPosition, setMarkerPosition] = useState({ lat: 28.3949, lng: 84.1240 }); // Default location set to Nepal
  const [errorMessage, setErrorMessage] = useState('');

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
        setFormData({ ...formData, photos: Array.from(files).slice(0, 6) }); // Limit to 6 images
      } else {
        setFormData({ ...formData, [name]: files[0] });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'photos') {
          formData[key].forEach((file, index) => {
            formDataToSend.append(`photo_${index + 1}`, file);
          });
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      const response = await fetch('https://opulent-memory-5pgwv57r9wwf7xg5-8000.app.github.dev/api/properties/', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', response.status, errorText);
        setErrorMessage(`Error: ${errorText}`);
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Property added successfully:', result);
      // Optionally, redirect or show success message
    } catch (error) {
      console.error('Error adding property:', error);
      setErrorMessage('Error adding property. Please try again.');
    }
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
      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">

      <div className="mb-4 p-4 mx-10 border-gray-300 rounded">
          <h2 className="text-xl font-semibold mb-2 p-2">Description</h2>
          <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
        </div>

        <div className="mb-4 mx-10 p-4  border-gray-300 rounded">
          <h2 className="text-xl font-semibold mb-2">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
            <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
            <input type="number" name="bed" placeholder="Number of Bedrooms" value={formData.bed} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
            <input type="number" name="bath" placeholder="Number of Bathrooms" value={formData.bath} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
            <input type="number" name="area" placeholder="Area (sq ft)" value={formData.area} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
            <input type="number" name="plot_number" placeholder="Plot Number" value={formData.plot_number} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
            <input type="number" name="year_built" placeholder="Year Built" value={formData.year_built} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
            <input type="number" name="total_floors" placeholder="Total Floors" value={formData.total_floors} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
            <input type="number" name="floor_number" placeholder="Floor Number" value={formData.floor_number} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
          </div>
        </div>

       
        <div className="mb-4 p-4 mx-10">
          <h2 className="text-xl font-semibold mb-2">Location</h2>
          <MapContainer center={markerPosition} zoom={10} style={{ height: "400px", width: "100%" }} className="mb-4">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={markerPosition} icon={customIcon} />
            <MapClickHandler />
          </MapContainer>
          <input type="text" name="map_link" placeholder="Map Link" value={formData.map_link} onChange={handleChange} readOnly className="w-full p-2 border border-gray-300 rounded" />
        </div>

        <div className="mb-4 p-4 mx-10 border-gray-300 rounded">
          <h2 className="text-xl font-semibold mb-2">Property Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <select name="sale_or_rent" value={formData.sale_or_rent} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded">
              <option value="">Sale or Rent</option>
              <option value="sale">For Sale</option>
              <option value="rent">For Rent</option>
            </select>

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
            <select name="property_type" value={formData.property_type} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded">
              <option value="">Property Type</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="condo">Condo</option>
              <option value="land">Land</option>
            </select>
           
          </div>
        </div>

        <div className="mb-4 p-4 mx-10 border-gray-300 rounded">
          <h2 className="text-xl font-semibold mb-2">Images & Documents</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input type="file" name="photos" onChange={handleChange} multiple accept="image/*" className="w-full p-2 border border-gray-300 rounded" />
            <input type="file" name="documents" onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
          </div>
        </div>

        <input type="hidden" name="realtor" value={formData.realtor} />
        <input type="hidden" name="owner" value={formData.owner} />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Add Property</button>
      </form>
    </div>
  );
};

export default AddPropertyPage;
