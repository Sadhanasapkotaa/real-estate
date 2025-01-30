"use client";
import React, { useState } from 'react';
import Navbar from '../../Navbar';  // Add this import
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

const SALE_RENT_CHOICES = [
    { value: 'sale', label: 'For Sale' },
    { value: 'rent', label: 'For Rent' },
];

const PROPERTY_TYPE_CHOICES = [
    { value: 'house', label: 'House' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'condo', label: 'Condo' },
    { value: 'land', label: 'Land' },
];

const STATUS_CHOICES = [
    { value: 'available', label: 'Available' },
    { value: 'booked', label: 'Booked' },
    { value: 'sold', label: 'Sold' },
    { value: 'rented', label: 'Rented' },
    { value: 'off_market', label: 'Off Market' },
    { value: 'unapproved', label: 'Unapproved' },
];

const AMENITIES_CHOICES = [
    { value: 'garage', label: 'Garage' },
    { value: 'pool', label: 'Pool' },
    { value: 'fireplace', label: 'Fireplace' },
    { value: 'garden', label: 'Garden' },
    { value: 'security', label: 'Security System' },
    { value: 'air_conditioning', label: 'Air Conditioning' },
    { value: 'heating', label: 'Central Heating' },
    { value: 'laundry', label: 'Laundry Room' },
    { value: 'gym', label: 'Gym' },
    { value: 'wifi', label: 'WiFi' },
    { value: 'parking', label: 'Parking' },
    { value: 'balcony', label: 'Balcony' },
    { value: 'elevator', label: 'Elevator' },
];

const TAG_CHOICES = [
    { value: 'featured', label: 'Featured' },
    { value: 'hot_deal', label: 'Hot Deal' },
];

const DISTRICT_CHOICES = [
    { value: 'bhojpur', label: 'Bhojpur' },
    { value: 'dhankuta', label: 'Dhankuta' },
    { value: 'ilam', label: 'Ilam' },
    { value: 'jhapa', label: 'Jhapa' },
    { value: 'khotang', label: 'Khotang' },
    { value: 'morang', label: 'Morang' },
    { value: 'okhaldhunga', label: 'Okhaldhunga' },
    { value: 'panchthar', label: 'Panchthar' },
    { value: 'sankhuwasabha', label: 'Sankhuwasabha' },
    { value: 'solukhumbu', label: 'Solukhumbu' },
    { value: 'sunsari', label: 'Sunsari' },
    { value: 'taplejung', label: 'Taplejung' },
    { value: 'terhathum', label: 'Terhathum' },
    { value: 'udayapur', label: 'Udayapur' },
    { value: 'bara', label: 'Bara' },
    { value: 'dhanusha', label: 'Dhanusha' },
    { value: 'mahottari', label: 'Mahottari' },
    { value: 'parsa', label: 'Parsa' },
    { value: 'rautahat', label: 'Rautahat' },
    { value: 'saptari', label: 'Saptari' },
    { value: 'sarlahi', label: 'Sarlahi' },
    { value: 'siraha', label: 'Siraha' },
    { value: 'bhaktapur', label: 'Bhaktapur' },
    { value: 'chitwan', label: 'Chitwan' },
    { value: 'dhading', label: 'Dhading' },
    { value: 'dolakha', label: 'Dolakha' },
    { value: 'kathmandu', label: 'Kathmandu' },
    { value: 'kavrepalanchok', label: 'Kavrepalanchok' },
    { value: 'lalitpur', label: 'Lalitpur' },
    { value: 'makwanpur', label: 'Makwanpur' },
    { value: 'nuwakot', label: 'Nuwakot' },
    { value: 'ramechhap', label: 'Ramechhap' },
    { value: 'rasuwa', label: 'Rasuwa' },
    { value: 'sindhuli', label: 'Sindhuli' },
    { value: 'sindhupalchok', label: 'Sindhupalchok' },
    { value: 'baglung', label: 'Baglung' },
    { value: 'gorkha', label: 'Gorkha' },
    { value: 'kaski', label: 'Kaski' },
    { value: 'lamjung', label: 'Lamjung' },
    { value: 'manang', label: 'Manang' },
    { value: 'mustang', label: 'Mustang' },
    { value: 'myagdi', label: 'Myagdi' },
    { value: 'nawalpur', label: 'Nawalpur' },
    { value: 'parbat', label: 'Parbat' },
    { value: 'syangja', label: 'Syangja' },
    { value: 'tanahun', label: 'Tanahun' },
    { value: 'arghakhanchi', label: 'Arghakhanchi' },
    { value: 'banke', label: 'Banke' },
    { value: 'bardiya', label: 'Bardiya' },
    { value: 'dang', label: 'Dang' },
    { value: 'gulmi', label: 'Gulmi' },
    { value: 'kapilvastu', label: 'Kapilvastu' },
    { value: 'palpa', label: 'Palpa' },
    { value: 'parasi', label: 'Parasi' },
    { value: 'pyuthan', label: 'Pyuthan' },
    { value: 'rolpa', label: 'Rolpa' },
    { value: 'rupandehi', label: 'Rupandehi' },
    { value: 'dailekh', label: 'Dailekh' },
    { value: 'dolpa', label: 'Dolpa' },
    { value: 'humla', label: 'Humla' },
    { value: 'jumla', label: 'Jumla' },
    { value: 'kalikot', label: 'Kalikot' },
    { value: 'mugu', label: 'Mugu' },
    { value: 'rukum_west', label: 'Rukum West' },
    { value: 'salyan', label: 'Salyan' },
    { value: 'surkhet', label: 'Surkhet' },
    { value: 'achham', label: 'Achham' },
    { value: 'baitadi', label: 'Baitadi' },
    { value: 'bajhang', label: 'Bajhang' },
    { value: 'bajura', label: 'Bajura' },
    { value: 'dadeldhura', label: 'Dadeldhura' },
    { value: 'darchula', label: 'Darchula' },
    { value: 'kanchanpur', label: 'Kanchanpur' },
    { value: 'kailali', label: 'Kailali' },
    { value: 'doti', label: 'Doti' },
];

const PROVINCE_CHOICES = [
    { value: 'province1', label: 'Province 1' },
    { value: 'madhesh_pradesh', label: 'Madhesh Pradesh' },
    { value: 'bagmati', label: 'Bagmati Province' },
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
        status: 'available',
        province: '',
        district: '',
        city: '',
        price: '',
        bed: '',
        bath: '',
        area: '',
        plot_number: '',
        sale_or_rent: 'sale',
        property_type: 'house',
        year_built: '',
        total_floors: '',
        floor_number: '',
        amenities: [],
        tags: [],
        documents: null,
        photo_main: null,
        photo_1: null,
        photo_2: null,
        photo_3: null,
        photo_4: null,
        photo_5: null,
        negotiation_count: 0,
        average_negotiation_price: '0.00',
        realtor: 1,
        owner: 1
    });

    const [position, setPosition] = useState([27.70898, 85.32513]);

    const handleMapClick = (e) => {
        setPosition([e.latlng.lat, e.latlng.lng]);
        setFormData({
            ...formData,
            map_link: `https://www.openstreetmap.org/search?query=${e.latlng.lat},${e.latlng.lng}#map=13/${e.latlng.lat}/${e.latlng.lng}`
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({
            ...formData,
            [name]: files[0]
        });
    };

    const handleAmenitiesChange = (e) => {
        const { value, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            amenities: checked 
                ? [...prev.amenities, value]
                : prev.amenities.filter(item => item !== value)
        }));
    };

    const validateFormData = () => {
        const { title, description, province, district, city, price, bed, bath, area, plot_number, year_built, photo_main, realtor, owner } = formData;
        if (!title || !description || !province || !district || !city || !price || !bed || !bath || !area || !plot_number || !year_built || !photo_main || !realtor || !owner) {
            alert('Please fill in all required fields.');
            return false;
        }
        if (isNaN(price) || isNaN(bed) || isNaN(bath) || isNaN(area) || isNaN(plot_number) || isNaN(year_built)) {
            alert('Please enter valid numbers for price, bed, bath, area, plot number, and year built.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateFormData()) {
            return;
        }

        // Create a new FormData object
        const formDataToSend = new FormData();

        // Append all text fields
        Object.keys(formData).forEach(key => {
            // Skip file fields
            if (!['documents', 'photo_main', 'photo_1', 'photo_2', 'photo_3', 'photo_4', 'photo_5'].includes(key)) {
                formDataToSend.append(key, formData[key]);
            }
        });

        // Append file fields if they exist
        if (formData.documents) formDataToSend.append('documents', formData.documents);
        if (formData.photo_main) formDataToSend.append('photo_main', formData.photo_main);
        if (formData.photo_1) formDataToSend.append('photo_1', formData.photo_1);
        if (formData.photo_2) formDataToSend.append('photo_2', formData.photo_2);
        if (formData.photo_3) formDataToSend.append('photo_3', formData.photo_3);
        if (formData.photo_4) formDataToSend.append('photo_4', formData.photo_4);
        if (formData.photo_5) formDataToSend.append('photo_5', formData.photo_5);

        // Convert amenities array to string before sending
        formDataToSend.append('amenities', formData.amenities.join(','));

        try {
            const token = localStorage.getItem('access');
            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await axios.post(
                'https://silver-umbrella-5gr55qpvqxjw249v6-8000.app.github.dev/api/properties/',
                formDataToSend,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data', // Important for file uploads
                    }
                }
            );
            console.log('Response:', response.data);
            alert('Property added successfully');
        } catch (error) {
            // ...existing error handling code...
        }
    };

    return (
        <>
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Add New Property</h1>
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Basic Information */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input 
                                type="text" 
                                name="title" 
                                placeholder="Title" 
                                onChange={handleChange} 
                                required 
                                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <textarea 
                                name="description" 
                                placeholder="Description" 
                                onChange={handleChange} 
                                required 
                                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent md:col-span-2"
                                rows={4}
                            />
                        </div>
                    </div>

                    {/* Location */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">Location</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <select name="province" onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded">
                                <option value="">Select Province</option>
                                {PROVINCE_CHOICES.map(choice => (
                                    <option key={choice.value} value={choice.value}>{choice.label}</option>
                                ))}
                            </select>
                            <select name="district" onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded">
                                <option value="">Select District</option>
                                {DISTRICT_CHOICES.map(choice => (
                                    <option key={choice.value} value={choice.value}>{choice.label}</option>
                                ))}
                            </select>
                            <input 
                                type="text" 
                                name="city" 
                                placeholder="City" 
                                onChange={handleChange} 
                                required 
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                    </div>

                    {/* Property Details */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">Property Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <input type="number" name="price" placeholder="Price" onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
                            <input type="number" name="bed" placeholder="Bedrooms" onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
                            <input type="number" name="bath" placeholder="Bathrooms" onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
                            <input type="number" name="area" placeholder="Area (sq ft)" onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
                            <input type="number" name="plot_number" placeholder="Plot Number" onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
                            <input type="number" name="year_built" placeholder="Year Built" onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
                            <select name="sale_or_rent" onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded">
                                {SALE_RENT_CHOICES.map(choice => (
                                    <option key={choice.value} value={choice.value}>{choice.label}</option>
                                ))}
                            </select>
                            <select name="property_type" onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded">
                                {PROPERTY_TYPE_CHOICES.map(choice => (
                                    <option key={choice.value} value={choice.value}>{choice.label}</option>
                                ))}
                            </select>
                            <select name="tags" onChange={handleSelectChange} className="w-full p-2 border border-gray-300 rounded">
                                <option value="">Select Tags</option>
                                {TAG_CHOICES.map(choice => (
                                    <option key={choice.value} value={choice.value}>{choice.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Amenities */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">Amenities</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {AMENITIES_CHOICES.map(amenity => (
                                <div key={amenity.value} className="flex items-center space-x-3">
                                    <input
                                        type="checkbox"
                                        id={`amenity-${amenity.value}`}
                                        name="amenities"
                                        value={amenity.value}
                                        checked={formData.amenities.includes(amenity.value)}
                                        onChange={handleAmenitiesChange}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label
                                        htmlFor={`amenity-${amenity.value}`}
                                        className="text-sm font-medium text-gray-700"
                                    >
                                        {amenity.label}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Images & Documents */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">Images & Documents</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Main Photo</label>
                                <input type="file" name="photo_main" onChange={handleFileChange} required className="w-full" />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Documents</label>
                                <input type="file" name="documents" onChange={handleFileChange} className="w-full" />
                            </div>
                            {[1, 2, 3, 4, 5].map(num => (
                                <div key={num} className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Additional Photo {num}</label>
                                    <input type="file" name={`photo_${num}`} onChange={handleFileChange} className="w-full" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Map */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">Location on Map</h2>
                        <div className="rounded-lg overflow-hidden border border-gray-300">
                            <MapContainer center={position} zoom={13} style={{ height: "400px", width: "100%" }}>
                                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                <Marker position={position} />
                                <MapClickHandler onClick={handleMapClick} />
                            </MapContainer>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Add Property
                    </button>
                </form>
            </div>
        </>
    );
};

const MapClickHandler = ({ onClick }) => {
    useMapEvents({
        click: onClick
    });
    return null;
};

export default AddPropertyPage;