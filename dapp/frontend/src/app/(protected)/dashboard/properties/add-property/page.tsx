"use client";
import React, { useState } from 'react';
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
        <div>
            <h1>Add New Property</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="Title" onChange={handleChange} required />
                <textarea name="description" placeholder="Description" onChange={handleChange} required></textarea>
                <select name="province" onChange={handleChange} required>
                    {PROVINCE_CHOICES.map(choice => (
                        <option key={choice.value} value={choice.value}>{choice.label}</option>
                    ))}
                </select>
                <select name="district" onChange={handleChange} required>
                    {DISTRICT_CHOICES.map(choice => (
                        <option key={choice.value} value={choice.value}>{choice.label}</option>
                    ))}
                </select>
                <input type="text" name="city" placeholder="City" onChange={handleChange} required />
                <input type="number" name="price" placeholder="Price" onChange={handleChange} required />
                <input type="number" name="bed" placeholder="Bedrooms" onChange={handleChange} required />
                <input type="number" name="bath" placeholder="Bathrooms" onChange={handleChange} required />
                <input type="number" name="area" placeholder="Area (sq ft)" onChange={handleChange} required />
                <input type="number" name="plot_number" placeholder="Plot Number" onChange={handleChange} required />
                <input type="number" name="year_built" placeholder="Year Built" onChange={handleChange} required />
                <input type="number" name="total_floors" placeholder="Total Floors" onChange={handleChange} />
                <input type="number" name="floor_number" placeholder="Floor Number" onChange={handleChange} />
                <select name="sale_or_rent" onChange={handleChange} required>
                    {SALE_RENT_CHOICES.map(choice => (
                        <option key={choice.value} value={choice.value}>{choice.label}</option>
                    ))}
                </select>
                <select name="property_type" onChange={handleChange} required>
                    {PROPERTY_TYPE_CHOICES.map(choice => (
                        <option key={choice.value} value={choice.value}>{choice.label}</option>
                    ))}
                </select>
                <select name="tags" onChange={handleSelectChange}>
                    {TAG_CHOICES.map(choice => (
                        <option key={choice.value} value={choice.value}>{choice.label}</option>
                    ))}
                </select>
                <input type="file" name="documents" onChange={handleFileChange} />
                <input type="file" name="photo_main" onChange={handleFileChange} required />
                <input type="file" name="photo_1" onChange={handleFileChange} />
                <input type="file" name="photo_2" onChange={handleFileChange} />
                <input type="file" name="photo_3" onChange={handleFileChange} />
                <input type="file" name="photo_4" onChange={handleFileChange} />
                <input type="file" name="photo_5" onChange={handleFileChange} />
                <input type="number" name="negotiation_count" placeholder="Negotiation Count" onChange={handleChange} />
                <input type="text" name="average_negotiation_price" placeholder="Average Negotiation Price" onChange={handleChange} />
                <input type="number" name="realtor" placeholder="Realtor ID" onChange={handleChange} required />
                <input type="number" name="owner" placeholder="Owner ID" onChange={handleChange} required />
                <MapContainer center={position} zoom={13} style={{ height: "400px", width: "100%" }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position} />
                    <MapClickHandler onClick={handleMapClick} />
                </MapContainer>
                <button type="submit">Add Property</button>
            </form>
        </div>
    );
};

const MapClickHandler = ({ onClick }) => {
    useMapEvents({
        click: onClick
    });
    return null;
};

export default AddPropertyPage;