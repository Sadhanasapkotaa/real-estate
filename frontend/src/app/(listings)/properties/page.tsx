"use client";
import React, { useContext } from 'react';
import Link from 'next/link';
import properties from './data';
import { FilterContext } from '@/components/common/FilterContext';

const PropertyList = () => {
  const { filters } = useContext(FilterContext);

  const getFilteredProperties = () => {
    return properties.filter(property => {
      if (filters.minPrice && property.price < Number(filters.minPrice)) return false;
      if (filters.maxPrice && property.price > Number(filters.maxPrice)) return false;
      if (filters.bedrooms && property.bedrooms !== Number(filters.bedrooms)) return false;
      if (filters.bathrooms && property.bathrooms !== Number(filters.bathrooms)) return false;
      if (filters.location && !property.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
      if (filters.propertyType && property.type !== filters.propertyType) return false;
      if (filters.saleOrRent && property.saleOrRent !== filters.saleOrRent) return false;
      return true;
    });
  };

  return (
    <div>
      <div className="property-list">
        {getFilteredProperties().map((property) => (
          <div key={property.id} className="property-card">
            <img src={property.image} alt={property.title} />
            <h2>{property.title}</h2>
            <p>{property.description}</p>
            <p>Price: ${property.price}</p>
            <p>Location: {property.location}</p>
            <Link href={`/properties/${property.id}`} className="text-blue-500">
              See More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyList;