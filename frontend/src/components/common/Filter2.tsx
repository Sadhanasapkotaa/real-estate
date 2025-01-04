"use client";
import { useContext } from 'react';
import { FilterContext } from './FilterContext';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const Filters = () => {
  const { filters, setFilters } = useContext(FilterContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSliderChange = (value) => {
    setFilters(prev => ({ ...prev, minPrice: value[0], maxPrice: value[1] }));
  };

  const handleBedroomChange = (value) => {
    setFilters(prev => ({ ...prev, bedrooms: value }));
  };

  const handleReset = () => {
    setFilters({
      minPrice: '',
      maxPrice: '',
      price: '',
      bedrooms: '',
      bathrooms: '',
      location: '',
      propertyType: '',
      saleOrRent: '',
    });
  };

  return (
    <div className="filters p-6 bg-white shadow-lg rounded-lg space-y-6">
    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Filter Properties</h2>
  
    {/* Price Range Section */}
    <div className="space-y-4">
      <label className="block text-sm font-medium flex items-center text-blue-500">
        <i className="fas fa-dollar-sign mr-2 text-blue-500"></i>Price Range
      </label>
      <div className="mt-2">
        <Slider
          range
          min={0}
          max={1000000}
          step={10000}
          value={[filters.minPrice || 0, filters.maxPrice || 1000000]}
          onChange={handleSliderChange}
          className="p-2"
        />
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>${filters.minPrice || 0}</span>
          <span>${filters.maxPrice || 1000000}</span>
        </div>
      </div>
    </div>
  
    {/* Sale or Rent Section */}
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-600 flex items-center mb-2">
        <i className="fas fa-exchange-alt mr-2 text-blue-500"></i>Sale or Rent
      </label>
      <div className="flex items-center space-x-6">
        <label className="flex items-center cursor-pointer space-x-2">
          <input 
            type="radio" 
            name="saleOrRent"
            value="sale" 
            checked={filters.saleOrRent === 'sale'} 
            onChange={handleChange} 
            className="form-radio text-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
          <span className="text-gray-700 font-medium">Buy</span>
        </label>
        <label className="flex items-center cursor-pointer space-x-2">
          <input 
            type="radio" 
            name="saleOrRent"
            value="rent" 
            checked={filters.saleOrRent === 'rent'} 
            onChange={handleChange} 
            className="form-radio text-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
          <span className="text-gray-700 font-medium">Rent</span>
        </label>
      </div>
    </div>
  
    {/* Bedrooms Section */}
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-600">
        <i className="fas fa-bed mr-2 text-blue-500"></i>Bedrooms
      </label>
      <div className="flex items-center space-x-2 mt-1">
        <button
          onClick={() => handleBedroomChange(Math.max(0, (filters.bedrooms || 0) - 1))}
          className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white text-gray-700"
        >
          -
        </button>
        <span className="p-2 border rounded-lg w-full text-center focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white text-gray-700">
          {filters.bedrooms || 0}
        </span>
        <button
          onClick={() => handleBedroomChange((filters.bedrooms || 0) + 1)}
          className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white text-gray-700"
        >
          +
        </button>
      </div>
    </div>
  
    {/* Bathrooms Section */}
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-600">
        <i className="fas fa-bath mr-2"></i>Bathrooms
      </label>
      <div className="relative mt-1">
        <select name="bathrooms" value={filters.bathrooms} onChange={handleChange} className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
          <option value="">Bathrooms</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>
    </div>
  
    {/* Location Section */}
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-600">
        <i className="fas fa-map-marker-alt mr-2"></i>Location
      </label>
      <div className="relative mt-1">
        <input 
          type="text" 
          name="location"
          placeholder="Location" 
          value={filters.location}
          onChange={handleChange}
          className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  
    {/* Property Type Section */}
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-600">
        <i className="fas fa-home mr-2"></i>Property Type
      </label>
      <div className="relative mt-1">
        <select name="propertyType" value={filters.propertyType} onChange={handleChange} className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
          <option value="">Select Property Type</option>
          <option value="house">House</option>
          <option value="apartment">Apartment</option>
          <option value="condo">Condo</option>
        </select>
      </div>
    </div>
  
    {/* Reset Button */}
    <div className="flex justify-between">
      <button 
        onClick={handleReset} 
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Reset Filters
      </button>
    </div>
  </div>
  
  );
};

export default Filters;