"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { FaBed, FaBath, FaRulerCombined } from 'react-icons/fa';
import Navbar from '../Navbar';
import withAuth from '../../../hoc/withAuth';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { FaMapMarkerAlt } from 'react-icons/fa';  // Add this import

const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

interface Property {
  id: number;
  title: string;
  price: number;
  bed: number;
  bath: number;
  area: number;
  lat: number;
  lng: number;
  photo_main: string;
  sale_or_rent: string;
  property_type: string;
  map: string; // Add this field
}

const MapPage = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [mapCenter, setMapCenter] = useState<[number, number]>([28.3949, 84.1240]);

  // Replace the custom icons with a single red marker icon
  const markerIcon = new Icon({
    iconUrl: 'data:image/svg+xml;base64,' + btoa(`
      <svg viewBox="0 0 384 512" fill="#dc2626" xmlns="http://www.w3.org/2000/svg">
        <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"/>
      </svg>
    `),
    iconSize: [32, 42],
    iconAnchor: [16, 42],
    popupAnchor: [0, -42],
  });

  const extractCoordinates = (mapUrl: string): [number, number] | null => {
    try {
      // Example map URL format: "https://www.google.com/maps?q=37.7749,-122.4194"
      const url = new URL(mapUrl);
      const coordinates = url.searchParams.get('q')?.split(',');
      
      if (coordinates && coordinates.length === 2) {
        const lat = parseFloat(coordinates[0]);
        const lng = parseFloat(coordinates[1]);
        
        if (!isNaN(lat) && !isNaN(lng)) {
          return [lat, lng];
        }
      }
      return null;
    } catch (error) {
      console.error('Error parsing map URL:', error);
      return null;
    }
  };

  useEffect(() => {
    axios.get('https://silver-umbrella-5gr55qpvqxjw249v6-8000.app.github.dev/api/properties/')
      .then(response => {
        const propertiesWithCoordinates = response.data
          .map((property: Property) => {
            const coordinates = property.map ? extractCoordinates(property.map) : null;
            if (!coordinates) return null;
            
            return {
              ...property,
              photo_main: property.photo_main.replace('http://localhost:8000', 'https://silver-umbrella-5gr55qpvqxjw249v6-8000.app.github.dev'),
              lat: coordinates[0],
              lng: coordinates[1],
            };
          })
          .filter((property: Property | null) => property !== null);

        setProperties(propertiesWithCoordinates);
        
        // Set map center to first property's coordinates if available
        if (propertiesWithCoordinates.length > 0) {
          setMapCenter([propertiesWithCoordinates[0].lat, propertiesWithCoordinates[0].lng]);
        }
      })
      .catch(error => console.error('Error fetching properties:', error));
  }, []);

  return (
    <>
      <Navbar />
      <div className="h-[calc(100vh-64px)]">
        <MapContainer
          center={mapCenter}
          zoom={7} // Changed zoom level to better show Nepal
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {properties.map(property => (
            <Marker
              key={property.id}
              position={[property.lat, property.lng]}
              icon={markerIcon}
            >
              <Popup>
                <div className="max-w-xs bg-white rounded-lg overflow-hidden">
                  <img 
                    src={property.photo_main} 
                    alt={property.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">{property.title}</h3>
                    <p className="text-blue-600 font-bold mb-2">
                      ${property.price.toLocaleString()}
                    </p>
                    <div className="flex justify-between text-sm text-gray-600 mb-3">
                      <span className="flex items-center">
                        <FaBed className="mr-1" /> {property.bed}
                      </span>
                      <span className="flex items-center">
                        <FaBath className="mr-1" /> {property.bath}
                      </span>
                      <span className="flex items-center">
                        <FaRulerCombined className="mr-1" /> {property.area} sq ft
                      </span>
                    </div>
                    <Link 
                      href={`/dashboard/properties/list-properties/${property.id}`}
                      className="block text-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </>
  );
};

export default withAuth(MapPage);