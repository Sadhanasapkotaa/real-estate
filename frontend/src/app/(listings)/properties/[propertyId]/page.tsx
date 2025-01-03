"use client";
import { useRouter, useParams } from 'next/navigation';
import properties from '../data';

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const property = properties.find(p => p.id === Number(params.propertyId));

  if (!property) {
    router.push('/404');
    return null;
  }

  return (
    <div key={property.id}>
      <h1>{property.title}</h1>
      <p>{property.description}</p>
      <p>Price: ${property.price}</p>
      <p>Location: {property.location}</p>
      <p>Bedrooms: {property.bedrooms}</p>
      <p>Bathrooms: {property.bathrooms}</p>
      <p>Type: {property.type}</p>
      <p>For: {property.saleOrRent}</p>
      <img src={property.image} alt={property.title} />
    </div>
  );
}