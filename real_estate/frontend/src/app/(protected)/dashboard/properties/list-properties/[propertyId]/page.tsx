"use client";

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
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
  Pool,
  Wifi,
  LocalParking,
  Security,
} from '@mui/icons-material';

// Keep the existing Property interface

const PropertyPage = () => {
  const { propertyId } = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    if (propertyId) {
      axios.get(`https://opulent-memory-5pgwv57r9wwf7xg5-8000.app.github.dev/api/properties/${propertyId}`)
        .then((response) => {
          const updatedProperty = {
            ...response.data,
            photo_main: response.data.photo_main.replace('http://localhost:8000', 'https://opulent-memory-5pgwv57r9wwf7xg5-8000.app.github.dev'),
            photo_1: response.data.photo_1?.replace('http://localhost:8000', 'https://opulent-memory-5pgwv57r9wwf7xg5-8000.app.github.dev'),
            photo_2: response.data.photo_2?.replace('http://localhost:8000', 'https://opulent-memory-5pgwv57r9wwf7xg5-8000.app.github.dev'),
            photo_3: response.data.photo_3?.replace('http://localhost:8000', 'https://opulent-memory-5pgwv57r9wwf7xg5-8000.app.github.dev'),
            photo_4: response.data.photo_4?.replace('http://localhost:8000', 'https://opulent-memory-5pgwv57r9wwf7xg5-8000.app.github.dev'),
            photo_5: response.data.photo_5?.replace('http://localhost:8000', 'https://opulent-memory-5pgwv57r9wwf7xg5-8000.app.github.dev'),
            documents: response.data.documents?.replace('http://localhost:8000', 'https://opulent-memory-5pgwv57r9wwf7xg5-8000.app.github.dev'),
          };
          setProperty(updatedProperty);
          setActiveImage(updatedProperty.photo_main);
        })
        .catch(error => console.error('Error fetching property:', error));
    }
  }, [propertyId]);

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
        <div className="relative h-[500px] flex">
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
          <div className="w-1/3 p-6 bg-gray-100 flex flex-col justify-center">
            <InfoCard icon={<BedOutlined />} label="Bedrooms" value={property.bed} />
            <InfoCard icon={<BathtubOutlined />} label="Bathrooms" value={property.bath} />
            <InfoCard icon={<SquareFootOutlined />} label="Area" value={`${property.area} sq ft`} />
            <InfoCard icon={<BusinessOutlined />} label="Floors" value={property.total_floors} />
          </div>
        </div>

        {/* Thumbnail Gallery */}
        <div className="grid grid-cols-6 gap-2 p-4 bg-gray-100">
          {allPhotos.map((photo, index) => (
            <div
              key={index}
              className={`relative h-24 cursor-pointer rounded-lg overflow-hidden transition-all 
                ${activeImage === photo ? 'ring-2 ring-blue-500' : 'opacity-70 hover:opacity-100'}`}
              onClick={() => setActiveImage(photo)}
            >
              <Image src={photo} alt={`View ${index + 1}`} layout="fill" objectFit="cover" />
            </div>
          ))}
        </div>

        <div className="p-8">
          {/* Quick Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <InfoCard icon={<BedOutlined />} label="Bedrooms" value={property.bed} />
            <InfoCard icon={<BathtubOutlined />} label="Bathrooms" value={property.bath} />
            <InfoCard icon={<SquareFootOutlined />} label="Area" value={`${property.area} sq ft`} />
            <InfoCard icon={<BusinessOutlined />} label="Floors" value={property.total_floors} />
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Description</h2>
            <p className="text-gray-600 leading-relaxed">{property.description}</p>
          </div>

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
              </div>
            </div>

            {/* Realtor Info */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h2 className="text-2xl font-bold mb-4">Contact Agent</h2>
              {property.realtor && property.realtor.user && (
                <div className="flex items-center gap-4">
                  <div className="relative w-24 h-24">
                    <Image
                      src={property.realtor.photo}
                      alt={`${property.realtor.user.first_name} ${property.realtor.user.last_name}`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{`${property.realtor.user.first_name} ${property.realtor.user.last_name}`}</h3>
                    <p className="text-gray-600">@{property.owner.username}</p>
                    <button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors">
                      Contact Agent
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Amenities */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {property.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-600">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Pool className="text-blue-500" />
                  </div>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className="mt-8 bg-gray-50 p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Location</h2>
            <div className="relative w-full h-96 rounded-xl overflow-hidden">
              <iframe
                src={property.map_link}
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
                loading="lazy"
              ></iframe>
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