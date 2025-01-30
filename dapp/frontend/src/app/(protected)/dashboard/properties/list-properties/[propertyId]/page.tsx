"use client";
import { useParams } from 'next/navigation';
import Navbar from '../../../Navbar';  // Add this import

declare global {
  interface Window {
    ethereum: any;
  }
}
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import React360Viewer from 'react-360-view';
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaTags, FaBuilding, FaCalendarAlt, FaLayerGroup, FaCity, FaDollarSign, FaShieldAlt, FaChevronLeft, FaChevronRight, FaHome, FaWarehouse, FaStore, FaIndustry, FaLandmark, FaParking, FaSwimmingPool, FaWifi, FaDumbbell, FaSnowflake, FaTree, FaCamera, FaLock, FaHandsWash, FaCar, FaUtensils, FaTv, FaCouch } from 'react-icons/fa';
import { MdBalcony, MdSecurity, MdPets, MdLocalLaundryService } from 'react-icons/md';
import { GiGardeningShears, GiFireplace } from 'react-icons/gi';
import { BsThermometerHigh } from 'react-icons/bs';
import withAuth from '../../../../../hoc/withAuth';
import { ethers } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';

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
  amenities: string; // Changed from string[] to string
  negotiation_count: number;
  average_negotiation_price: number;
  owner: string;
}

const MortgageCalculator = ({ propertyPrice }: { propertyPrice: number }) => {
  const [interestRate, setInterestRate] = useState(5);
  const [loanTerm, setLoanTerm] = useState(30);
  
  const calculateMonthlyPayment = () => {
    const principal = propertyPrice;
    const monthlyRate = (interestRate / 100) / 12;
    const numberOfPayments = loanTerm * 12;
    
    // Handle edge cases
    if (principal <= 0 || numberOfPayments <= 0) return 0;
    
    // Special case when interest rate is 0
    if (interestRate === 0) {
      return principal / numberOfPayments;
    }
    
    // Standard mortgage payment formula
    const monthlyPayment = 
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      
    return isFinite(monthlyPayment) ? monthlyPayment : 0;
  };

  const monthlyPayment = calculateMonthlyPayment();

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
      <h3 className="text-lg font-semibold mb-4">Mortgage Calculator</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Property Price
          </label>
          <input
            type="text"
            value={`$${propertyPrice.toLocaleString()}`}
            disabled
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Interest Rate (%)
          </label>
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            min="0"
            max="100"
            step="0.1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Loan Term (years)
          </label>
          <input
            type="number"
            value={loanTerm}
            onChange={(e) => setLoanTerm(Number(e.target.value))}
            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            min="1"
            max="50"
          />
        </div>
        <div className="mt-4 p-4 bg-blue-50 rounded-xl">
          <p className="text-sm text-gray-600 mb-1">Estimated Monthly Payment</p>
          <p className="text-2xl font-bold text-blue-600">
            ${monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </p>
        </div>
      </div>
    </div>
  );
};

const PropertyPage = () => {
  const { propertyId } = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [showNegotiationForm, setShowNegotiationForm] = useState(false);
  const [counterPrice, setCounterPrice] = useState<number | null>(null);
  const [negotiationDescription, setNegotiationDescription] = useState<string>('');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (propertyId) {
      axios.get(`https://silver-umbrella-5gr55qpvqxjw249v6-8000.app.github.dev/api/properties/${propertyId}`)
        .then((response) => {
          const data = response.data;
          const updatedProperty = {
            ...data,
            photo_main: data.photo_main ? data.photo_main.replace('http://localhost:8000', 'https://silver-umbrella-5gr55qpvqxjw249v6-8000.app.github.dev') : null,
            photo_1: data.photo_1 ? data.photo_1.replace('http://localhost:8000', 'https://silver-umbrella-5gr55qpvqxjw249v6-8000.app.github.dev') : null,
            photo_2: data.photo_2 ? data.photo_2.replace('http://localhost:8000', 'https://silver-umbrella-5gr55qpvqxjw249v6-8000.app.github.dev') : null,
            photo_3: data.photo_3 ? data.photo_3.replace('http://localhost:8000', 'https://silver-umbrella-5gr55qpvqxjw249v6-8000.app.github.dev') : null,
            photo_4: data.photo_4 ? data.photo_4.replace('http://localhost:8000', 'https://silver-umbrella-5gr55qpvqxjw249v6-8000.app.github.dev') : null,
            photo_5: data.photo_5 ? data.photo_5.replace('http://localhost:8000', 'https://silver-umbrella-5gr55qpvqxjw249v6-8000.app.github.dev') : null,
            documents: data.documents ? data.documents.replace('http://localhost:8000', 'https://silver-umbrella-5gr55qpvqxjw249v6-8000.app.github.dev') : null,
          };
          setProperty(updatedProperty);
          setActiveImage(updatedProperty.photo_main);
        })
        .catch(error => console.error('Error fetching property:', error));
    }
  }, [propertyId]);

  const handleBookHouse = async () => {
    if (propertyId && property) {
      try {
        // Request account access if needed
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        const provider = new Web3Provider(window.ethereum);

        // Get the signer
        const signer = provider.getSigner();

        // Contract address and ABI
        const contractAddress = 'YOUR_CONTRACT_ADDRESS';
        const contractABI = [
          "function bookProperty() external payable"
        ];

        // Create a new contract instance
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        // Convert the price from USD to ETH
        const ethPrice = property.price / 3178.29;

        // Fetch the price from the property object
        const priceInEther = ethers.parseEther(ethPrice.toString());

        // Send the transaction with the price as msg.value
        const transaction = await contract.bookProperty({
          value: priceInEther
        });

        // Wait for the transaction to be mined
        await transaction.wait();

        // Update the property status
        setProperty(prevProperty => prevProperty ? { ...prevProperty, status: 'booked' } : null);
        alert('House booked successfully!');
      } catch (error) {
        console.error('Error booking house:', error);
        alert('Error booking house. Please try again.');
      }
    }
  };

  const handleNegotiate = () => {
    setShowNegotiationForm(true);
  };

  const handleSubmitNegotiation = () => {
    if (propertyId && counterPrice && negotiationDescription) {
      // Get the auth token from localStorage
      const token = localStorage.getItem('access');
      
      if (!token) {
        alert('Please login to submit a negotiation');
        return;
      }

      axios.post(
        `https://silver-umbrella-5gr55qpvqxjw249v6-8000.app.github.dev/api/negotiations/`,
        {
          property: propertyId,
          owner: property?.owner,
          user: '16', // Replace with the actual user ID
          negotiated_price: counterPrice,
          negotiation_reason: negotiationDescription,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      )
        .then(response => {
          alert('Negotiation submitted successfully!');
          setShowNegotiationForm(false);
          setCounterPrice(null);
          setNegotiationDescription('');
        })
        .catch(error => {
          console.error('Error submitting negotiation:', error);
          if (error.response?.status === 401) {
            alert('Your session has expired. Please login again.');
            // Optionally redirect to login page or refresh token
          } else {
            alert('Failed to submit negotiation. Please try again.');
          }
        });
    }
  };

  if (!property) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-gray-500">Loading property details...</p>
        </div>
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

  const getPropertyTypeIcon = (type: string) => {
    const types = {
      house: <FaHome className="w-6 h-6" />,
      apartment: <FaBuilding className="w-6 h-6" />,
      commercial: <FaStore className="w-6 h-6" />,
      industrial: <FaIndustry className="w-6 h-6" />,
      land: <FaLandmark className="w-6 h-6" />,
      warehouse: <FaWarehouse className="w-6 h-6" />,
    };
    return types[type.toLowerCase()] || <FaHome className="w-6 h-6" />;
  };

  const getAmenityIcon = (amenity: string) => {
    const amenityMap = {
      parking: <FaParking />,
      pool: <FaSwimmingPool />,
      wifi: <FaWifi />,
      gym: <FaDumbbell />,
      air_conditioning: <FaSnowflake />,
      heating: <BsThermometerHigh />,
      garden: <GiGardeningShears />,
      security: <MdSecurity />,
      cctv: <FaCamera />,
      intercom: <FaLock />,
      laundry: <MdLocalLaundryService />,
      parking_space: <FaCar />,
      balcony: <MdBalcony />,
      fireplace: <GiFireplace />,
      pets_allowed: <MdPets />,
      furnished: <FaCouch />,
      kitchen: <FaUtensils />,
      tv: <FaTv />,
      garden_view: <FaTree />
    };
    return amenityMap[amenity.toLowerCase().replace(/ /g, '_')] || <FaShieldAlt />;
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header Section with Property Type */}
          <div className="mb-8 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold text-gray-900">{property.title}</h1>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                  {getPropertyTypeIcon(property.property_type)}
                  {property.property_type}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <FaMapMarkerAlt className="text-blue-500" />
                <span className="text-lg">{`${property.city}, ${property.province}`}</span>
              </div>
            </div>
            <div className="bg-white px-6 py-3 rounded-xl shadow-sm">
              <p className="text-gray-500 text-sm mb-1">Price</p>
              <p className="text-3xl font-bold text-blue-600">${property.price.toLocaleString()}</p>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2">
              {/* Image Gallery */}
              <div className="relative h-[600px] rounded-2xl overflow-hidden group">
                <Image
                  src={allPhotos[activeImageIndex]}
                  alt={property.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                
                {/* Navigation Arrows */}
                <button
                  onClick={() => setActiveImageIndex((prev) => (prev - 1 + allPhotos.length) % allPhotos.length)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-all"
                >
                  <FaChevronLeft className="text-gray-800 text-xl" />
                </button>
                <button
                  onClick={() => setActiveImageIndex((prev) => (prev + 1) % allPhotos.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-all"
                >
                  <FaChevronRight className="text-gray-800 text-xl" />
                </button>

                {/* Thumbnails */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {allPhotos.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === activeImageIndex ? 'bg-white w-4' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Description Section - Moved to top */}
              <div className="mt-8 bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-4">Description</h2>
                <p className="text-gray-600 leading-relaxed">{property.description}</p>
              </div>

              {/* Property Details - Moved second */}
              <div className="mt-8 bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-6">Property Details</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <DetailCard icon={<FaBed />} label="Bedrooms" value={property.bed} />
                  <DetailCard icon={<FaBath />} label="Bathrooms" value={property.bath} />
                  <DetailCard icon={<FaRulerCombined />} label="Area" value={`${property.area} sq ft`} />
                  <DetailCard icon={<FaBuilding />} label="Floors" value={property.total_floors} />
                </div>
              </div>

              {/* Property Information */}
              <div className="mt-8 bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-6">Property Information</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <DetailItem 
                    icon={<FaTags className="text-blue-500" />} 
                    label="Status" 
                    value={property.status}
                    className="bg-blue-50 p-4 rounded-xl"
                  />
                  <DetailItem 
                    icon={<FaCalendarAlt className="text-green-500" />} 
                    label="Year Built" 
                    value={property.year_built}
                    className="bg-green-50 p-4 rounded-xl"
                  />
                  <DetailItem 
                    icon={<FaLayerGroup className="text-purple-500" />} 
                    label="Floor" 
                    value={property.floor_number}
                    className="bg-purple-50 p-4 rounded-xl"
                  />
                  <DetailItem 
                    icon={<FaCity className="text-orange-500" />} 
                    label="District" 
                    value={property.district}
                    className="bg-orange-50 p-4 rounded-xl"
                  />
                </div>
              </div>

              {/* Amenities Section - Moved last */}
              <div className="mt-8 bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-6">Amenities & Features</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities.split(',').map((amenity, index) => {
                    const cleanedAmenity = amenity.trim();
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-4 rounded-xl transition-all duration-300 hover:bg-blue-50 border border-gray-100"
                      >
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                          {getAmenityIcon(cleanedAmenity)}
                        </div>
                        <span className="text-gray-700 capitalize">
                          {cleanedAmenity.replace(/_/g, ' ')}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                {/* Price Card */}
                <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
                  {/* <div className="flex items-center justify-between mb-6">
                    <span className="text-gray-600">Price</span>
                    <span className="text-3xl font-bold text-blue-600">
                      ${property.price.toLocaleString()}
                    </span>
                  </div> */}
                  <div className="space-y-4">
                    <button
                      onClick={handleBookHouse}
                      className="w-full bg-blue-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
                    >
                      Book Immediately
                    </button>
                    <button
                      onClick={() => setShowNegotiationForm(true)}
                      className="w-full bg-white text-blue-500 border-2 border-blue-500 py-3 px-6 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
                    >
                      Make an Offer
                    </button>
                  </div>
                </div>

                {/* Add Mortgage Calculator here, after the Price Card */}
                <MortgageCalculator propertyPrice={property.price} />

                {/* Negotiation Statistics Card */}
                <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
                  <h3 className="text-lg font-semibold mb-4">Negotiation Statistics</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Total Negotiations</span>
                      <span className="text-xl font-bold text-blue-600">
                        {property.negotiation_count}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Average Offer</span>
                      <span className="text-xl font-bold text-green-600">
                        ${property.average_negotiation_price?.toLocaleString() || 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Negotiation Form */}
                {showNegotiationForm && (
                  <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <h3 className="text-xl font-bold mb-4">Make an Offer</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Your Offer
                        </label>
                        <input
                          type="number"
                          value={counterPrice || ''}
                          onChange={(e) => setCounterPrice(Number(e.target.value))}
                          className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                          placeholder="Enter amount"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Message
                        </label>
                        <textarea
                          value={negotiationDescription}
                          onChange={(e) => setNegotiationDescription(e.target.value)}
                          className="w-full p-3 border border-gray-200 rounded-xl h-32 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                          placeholder="Why should the seller accept your offer?"
                        />
                      </div>
                      <button
                        onClick={handleSubmitNegotiation}
                        className="w-full bg-green-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-600 transition-colors"
                      >
                        Submit Offer
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

        
        </div>
      </div>
    </>
  );
};

const DetailCard = ({ icon, label, value }) => (
  <div className="bg-gray-50 p-4 rounded-xl">
    <div className="flex items-center gap-2 text-blue-500 mb-2">
      {icon}
      <span className="text-gray-600 text-sm">{label}</span>
    </div>
    <p className="text-xl font-semibold text-gray-900">{value}</p>
  </div>
);

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

const DetailItem = ({ icon, label, value, className = '' }) => (
  <div className={`transition-all duration-300 hover:scale-105 ${className}`}>
    <div className="flex items-center gap-3 mb-2">
      {icon}
      <p className="text-sm font-medium text-gray-600">{label}</p>
    </div>
    <p className="text-xl font-semibold text-gray-900">{value}</p>
  </div>
);

export default withAuth(PropertyPage);