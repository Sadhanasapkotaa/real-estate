"use client";

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import React360Viewer from 'react-360-view';
import {
  BedOutlined,
  BathtubOutlined,
  SquareFootOutlined,
  LocationOnOutlined,
  LocalOfferOutlined,
  BusinessOutlined,
  CalendarTodayOutlined,
  LayersOutlined,
  LocationCityOutlined,
  AttachMoneyOutlined,
  Security,
} from '@mui/icons-material';

interface Property {
  title: string;
  city: string;
  province: string;
  price: number;
  description: string;
  bed: number;
  bath: number;
  area: number;
  total_floors: number;
  status: string;
  property_type: string;
  year_built: number;
  floor_number: number;
  district: string;
  sale_or_rent: string;
  photo_main: string;
  photo_1?: string;
  photo_2?: string;
  photo_3?: string;
  photo_4?: string;
  photo_5?: string;
  documents?: string;
  amenities: string[];
  negotiation_count: number;
  average_negotiation_price: number;
}

const PropertyPage = () => {
  const { propertyId } = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [showNegotiationForm, setShowNegotiationForm] = useState(false);
  const [counterPrice, setCounterPrice] = useState<number | null>(null);
  const [negotiationDescription, setNegotiationDescription] = useState<string>('');

  useEffect(() => {
    if (propertyId) {
      axios.get(`https://opulent-memory-5pgwv57r9wwf7xg5-8000.app.github.dev/api/properties/${propertyId}`)
        .then((response) => {
          const data = response.data;
          const updatedProperty = {
            ...data,
            photo_main: data.photo_main ? data.photo_main.replace('http://localhost:8000', 'https://opulent-memory-5pgwv57r9wwf7xg5-8000.app.github.dev') : null,
            photo_1: data.photo_1 ? data.photo_1.replace('http://localhost:8000', 'https://opulent-memory-5pgwv57r9wwf7xg5-8000.app.github.dev') : null,
            photo_2: data.photo_2 ? data.photo_2.replace('http://localhost:8000', 'https://opulent-memory-5pgwv57r9wwf7xg5-8000.app.github.dev') : null,
            photo_3: data.photo_3 ? data.photo_3.replace('http://localhost:8000', 'https://opulent-memory-5pgwv57r9wwf7xg5-8000.app.github.dev') : null,
            photo_4: data.photo_4 ? data.photo_4.replace('http://localhost:8000', 'https://opulent-memory-5pgwv57r9wwf7xg5-8000.app.github.dev') : null,
            photo_5: data.photo_5 ? data.photo_5.replace('http://localhost:8000', 'https://opulent-memory-5pgwv57r9wwf7xg5-8000.app.github.dev') : null,
            documents: data.documents ? data.documents.replace('http://localhost:8000', 'https://opulent-memory-5pgwv57r9wwf7xg5-8000.app.github.dev') : null,
          };
          setProperty(updatedProperty);
          setActiveImage(updatedProperty.photo_main);
        })
        .catch(error => console.error('Error fetching property:', error));
    }
  }, [propertyId]);

  const handleBookHouse = () => {
    if (propertyId) {
      axios.patch(`https://opulent-memory-5pgwv57r9wwf7xg5-8000.app.github.dev/api/properties/${propertyId}/`, { status: 'booked' })
        .then(response => {
          setProperty(prevProperty => prevProperty ? { ...prevProperty, status: 'booked' } : null);
          alert('House booked successfully!');
        })
        .catch(error => console.error('Error booking house:', error));
    }
  };

  const handleNegotiate = () => {
    setShowNegotiationForm(true);
  };

  const handleSubmitNegotiation = () => {
    if (propertyId && counterPrice && negotiationDescription) {
      axios.post(`https://opulent-memory-5pgwv57r9wwf7xg5-8000.app.github.dev/api/negotiations/`, {
        property: propertyId,
        owner: property?.owner,
        user: property?.owner, // Replace with the actual user ID
        negotiated_price: counterPrice,
        negotiation_reason: negotiationDescription,
      })
        .then(response => {
          alert('Negotiation submitted successfully!');
          setShowNegotiationForm(false);
        })
        .catch(error => console.error('Error submitting negotiation:', error));
    }
  };

  if (!property) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const allPhotos = [
    property.photo_main,
    property.photo_1,
    property.photo_2,
    property.photo_3,
    property.photo_4,
    property.photo_5,
  ].filter(Boolean);

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Main Image Gallery */}
        <div className="relative h-[600px] flex">
          <div className="w-2/3 relative">
            <Image
              src={activeImage || property.photo_main}
              alt={property.title}
              layout="fill"
              objectFit="cover"
              className="transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <h1 className="text-4xl font-bold mb-2">{property.title}</h1>
              <div className="flex items-center gap-2">
                <LocationOnOutlined />
                <span>{`${property.city}, ${property.province}`}</span>
              </div>
            </div>
            <div className="absolute top-6 right-6 bg-white/90 px-4 py-2 rounded-full">
              <span className="text-2xl font-bold text-gray-900">${property.price.toLocaleString()}</span>
            </div>
          </div>
          <div className="w-1/3 flex flex-col items-start justify-center p-4">
            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Description</h2>
              <p className="text-gray-600 leading-relaxed">{property.description}</p>
            </div>
            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <InfoCard icon={<BedOutlined />} label="Bedrooms" value={property.bed} />
              <InfoCard icon={<BathtubOutlined />} label="Bathrooms" value={property.bath} />
              <InfoCard icon={<SquareFootOutlined />} label="Area" value={`${property.area} sq ft`} />
              <InfoCard icon={<BusinessOutlined />} label="Floors" value={property.total_floors} />
            </div>
            <div className="flex gap-4">
              <button onClick={handleBookHouse} className="bg-blue-500 w-full text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-all">
                Book Immediately
              </button>
              <button onClick={handleNegotiate} className="bg-yellow-500 w-full text-white px-6 py-3 rounded-lg shadow-md hover:bg-yellow-600 transition-all">
                Negotiate
              </button>
            </div>
            {showNegotiationForm && (
              <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">Negotiate</h3>
                <div className="mb-2">
                  <label className="block text-gray-700">Counter Price</label>
                  <input
                    type="number"
                    value={counterPrice || ''}
                    onChange={(e) => setCounterPrice(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-gray-700">Description</label>
                  <textarea
                    value={negotiationDescription}
                    onChange={(e) => setNegotiationDescription(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <button onClick={handleSubmitNegotiation} className="bg-green-500 w-full text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition-all">
                  Submit Negotiation
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Thumbnail Gallery */}
        <div className="grid grid-cols-6 p-2 bg-gray-100 w-1/2">
          {allPhotos.map((photo, index) => (
            <div
              key={index}
              className={`relative h-20 w-20 cursor-pointer rounded-lg overflow-hidden transition-all 
                ${activeImage === photo ? 'ring-2 ring-blue-500' : 'opacity-70 hover:opacity-100'}`}
              onClick={() => setActiveImage(photo)}
            >
              <Image src={photo} alt={`View ${index + 1}`} layout="fill" objectFit="cover" />
            </div>
          ))}
        </div>

        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Property Details */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h2 className="text-2xl font-bold mb-4">Property Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <DetailItem icon={<LocalOfferOutlined />} label="Status" value={property.status} />
                <DetailItem icon={<BusinessOutlined />} label="Type" value={property.property_type} />
                <DetailItem icon={<CalendarTodayOutlined />} label="Year Built" value={property.year_built} />
                <DetailItem icon={<LayersOutlined />} label="Floor" value={property.floor_number} />
                <DetailItem icon={<LocationCityOutlined />} label="District" value={property.district} />
                <DetailItem icon={<AttachMoneyOutlined />} label="Purpose" value={property.sale_or_rent} />
                <DetailItem icon={<LocalOfferOutlined />} label="Negotiation Count" value={property.negotiation_count} />
                <DetailItem icon={<AttachMoneyOutlined />} label="Average Negotiation Price" value={`$${property.average_negotiation_price?.toLocaleString() || '0.00'}`} />
              </div>
            </div>

            {/* Virtual Tour */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Virtual Tour</h2>
              <div className="relative h-[600px]">
                <React360Viewer
                  amount={allPhotos.length}
                  imagePath="https://opulent-memory-5pgwv57r9wwf7xg5-8000.app.github.dev/images/"
                  fileName="photo_{index}.jpg"
                  autoplay
                  loop
                />
              </div>
            </div>

            {/* Amenities */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-2 text-gray-600">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Security className="text-blue-500" />
                    </div>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const InfoCard = ({ icon, label, value }) => (
  <div className="bg-gray-50 p-4 rounded-lg mb-4">
    <div className="flex items-center gap-2 text-gray-600 mb-2">
      {icon}
      <span>{label}</span>
    </div>
    <p className="text-xl font-bold">{value}</p>
  </div>
);

const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-2">
    <div className="text-gray-500">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  </div>
);

export default PropertyPage;