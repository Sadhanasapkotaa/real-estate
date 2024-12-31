import React from 'react';

const property1 = {
  id: 1,
  type: 'house',
  location: 'Downtown',
  price: 520000,
  rental: 2200,
  parking: true,
  pool: true,
  electricity: true,
  roadAccess: true,
  roadWidth: 18,
  workplaceProximity: 3,
  publicTransportAvailability: 4,
  crimeRates: 7,
  securityMeasures: 1,
  groceryStoresProximity: 1.2,
  hospitalsProximity: 2.5,
  schoolsProximity: 1.8,
  gymsProximity: 1.3,
  parksProximity: 0.6,
  shoppingCentersProximity: 1.0,
  nearbyHighways: 0.3,
  noisyBusinesses: 0.5,
  waterReliability: 1,
  highSpeedInternet: 200,
  garbageCollection: 1,
  heatingCooling: 1,
  managementResponsiveness: 8,
  propertyCondition: 9,
  renovationRestrictions: 1,
  petsAllowed: 1,
  sublettingPolicy: 1,
  leaseLength: 12,
  neighborhoodVibe: 2,
  suitableForFamilyOrStudents: 7,
  exposureToNaturalDisasters: 1,
  airQuality: 50,
  areaCostOfLiving: 9,
  propertyValueGrowth: 5,
  neighborhoodDevelopment: 0,
};

const property2 = {
  id: 2,
  type: 'house',
  location: 'Suburb',
  price: 460000,
  rental: 1900,
  parking: true,
  pool: false,
  electricity: true,
  roadAccess: true,
  roadWidth: 17,
  workplaceProximity: 12,
  publicTransportAvailability: 2,
  crimeRates: 4,
  securityMeasures: 1,
  groceryStoresProximity: 1.8,
  hospitalsProximity: 7,
  schoolsProximity: 4,
  gymsProximity: 2.5,
  parksProximity: 0.7,
  shoppingCentersProximity: 4,
  nearbyHighways: 2.5,
  noisyBusinesses: 0,
  waterReliability: 1,
  highSpeedInternet: 120,
  garbageCollection: 1,
  heatingCooling: 1,
  managementResponsiveness: 8,
  propertyCondition: 8,
  renovationRestrictions: 0,
  petsAllowed: 1,
  sublettingPolicy: 0,
  leaseLength: 12,
  neighborhoodVibe: 1,
  suitableForFamilyOrStudents: 8,
  exposureToNaturalDisasters: 0,
  airQuality: 45,
  areaCostOfLiving: 6,
  propertyValueGrowth: 4,
  neighborhoodDevelopment: 1,
};

function PropertyComparison() {
  const getComparisonColor = (value1: number, value2: number, isHigherBetter: boolean) => {
    if (isHigherBetter) {
      if (value1 > value2) return 'text-blue-500';
      if (value1 < value2) return 'text-red-500';
    } else {
      if (value1 < value2) return 'text-blue-500';
      if (value1 > value2) return 'text-red-500';
    }
    return 'text-blue-500'; // If both are "bad", make them both blue
  };

  return (
    <div className="max-w-6xl mx-auto p-4 flex flex-col lg:flex-row gap-8">
      {/* Property 1 Data */}
      <div className="flex-1 bg-white shadow-md rounded-lg p-6">
        <h3 className="text-2xl font-bold mb-4">
          <i className="fas fa-home mr-2"></i>Property 1: {property1.location}
        </h3>
        <ul className="text-gray-700">
          <li><i className={`fas fa-dollar-sign mr-2 ${getComparisonColor(property1.price, property2.price, false)}`}></i>Price: ${property1.price}</li>
          <li><i className={`fas fa-money-bill-wave mr-2 ${getComparisonColor(property1.rental, property2.rental, false)}`}></i>Rental: ${property1.rental}</li>
          <li><i className={`fas fa-ruler-horizontal mr-2 ${getComparisonColor(property1.roadWidth, property2.roadWidth, true)}`}></i>Road Width: {property1.roadWidth} ft</li>
          <li><i className={`fas fa-briefcase mr-2 ${getComparisonColor(property1.workplaceProximity, property2.workplaceProximity, false)}`}></i>Workplace Proximity: {property1.workplaceProximity} km</li>
          <li><i className={`fas fa-bus mr-2 ${getComparisonColor(property1.publicTransportAvailability, property2.publicTransportAvailability, true)}`}></i>Public Transport Availability: {property1.publicTransportAvailability}</li>
          <li><i className={`fas fa-shield-alt mr-2 ${getComparisonColor(property1.crimeRates, property2.crimeRates, false)}`}></i>Crime Rates: {property1.crimeRates}</li>
          <li><i className={`fas fa-lock mr-2 ${getComparisonColor(property1.securityMeasures, property2.securityMeasures, true)}`}></i>Security Measures: {property1.securityMeasures}</li>
          <li><i className={`fas fa-shopping-cart mr-2 ${getComparisonColor(property1.groceryStoresProximity, property2.groceryStoresProximity, false)}`}></i>Grocery Stores Proximity: {property1.groceryStoresProximity} km</li>
          <li><i className={`fas fa-hospital mr-2 ${getComparisonColor(property1.hospitalsProximity, property2.hospitalsProximity, false)}`}></i>Hospitals Proximity: {property1.hospitalsProximity} km</li>
          <li><i className={`fas fa-school mr-2 ${getComparisonColor(property1.schoolsProximity, property2.schoolsProximity, false)}`}></i>Schools Proximity: {property1.schoolsProximity} km</li>
          <li><i className={`fas fa-dumbbell mr-2 ${getComparisonColor(property1.gymsProximity, property2.gymsProximity, false)}`}></i>Gyms Proximity: {property1.gymsProximity} km</li>
          <li><i className={`fas fa-tree mr-2 ${getComparisonColor(property1.parksProximity, property2.parksProximity, false)}`}></i>Parks Proximity: {property1.parksProximity} km</li>
          <li><i className={`fas fa-shopping-bag mr-2 ${getComparisonColor(property1.shoppingCentersProximity, property2.shoppingCentersProximity, false)}`}></i>Shopping Centers Proximity: {property1.shoppingCentersProximity} km</li>
          <li><i className={`fas fa-road mr-2 ${getComparisonColor(property1.nearbyHighways, property2.nearbyHighways, false)}`}></i>Nearby Highways: {property1.nearbyHighways} km</li>
          <li><i className={`fas fa-volume-up mr-2 ${getComparisonColor(property1.noisyBusinesses, property2.noisyBusinesses, false)}`}></i>Noisy Businesses: {property1.noisyBusinesses} km</li>
          <li><i className={`fas fa-wifi mr-2 ${getComparisonColor(property1.highSpeedInternet, property2.highSpeedInternet, true)}`}></i>High-Speed Internet: {property1.highSpeedInternet} Mbps</li>
          <li><i className={`fas fa-headset mr-2 ${getComparisonColor(property1.managementResponsiveness, property2.managementResponsiveness, true)}`}></i>Management Responsiveness: {property1.managementResponsiveness}</li>
          <li><i className={`fas fa-home mr-2 ${getComparisonColor(property1.propertyCondition, property2.propertyCondition, true)}`}></i>Property Condition: {property1.propertyCondition}</li>
          <li><i className={`fas fa-dollar-sign mr-2 ${getComparisonColor(property1.areaCostOfLiving, property2.areaCostOfLiving, false)}`}></i>Area Cost of Living: {property1.areaCostOfLiving}</li>
          <li><i className={`fas fa-chart-line mr-2 ${getComparisonColor(property1.propertyValueGrowth, property2.propertyValueGrowth, true)}`}></i>Property Value Growth: {property1.propertyValueGrowth}</li>
        </ul>
      </div>

      {/* Property 2 Data */}
      <div className="flex-1 bg-white shadow-md rounded-lg p-6">
        <h3 className="text-2xl font-bold mb-4">
          <i className="fas fa-home mr-2"></i>Property 2: {property2.location}
        </h3>
        <ul className="text-gray-700">
          <li><i className={`fas fa-dollar-sign mr-2 ${getComparisonColor(property2.price, property1.price, false)}`}></i>Price: ${property2.price}</li>
          <li><i className={`fas fa-money-bill-wave mr-2 ${getComparisonColor(property2.rental, property1.rental, false)}`}></i>Rental: ${property2.rental}</li>
          <li><i className={`fas fa-ruler-horizontal mr-2 ${getComparisonColor(property2.roadWidth, property1.roadWidth, true)}`}></i>Road Width: {property2.roadWidth} ft</li>
          <li><i className={`fas fa-briefcase mr-2 ${getComparisonColor(property2.workplaceProximity, property1.workplaceProximity, false)}`}></i>Workplace Proximity: {property2.workplaceProximity} km</li>
          <li><i className={`fas fa-bus mr-2 ${getComparisonColor(property2.publicTransportAvailability, property1.publicTransportAvailability, true)}`}></i>Public Transport Availability: {property2.publicTransportAvailability}</li>
          <li><i className={`fas fa-shield-alt mr-2 ${getComparisonColor(property2.crimeRates, property1.crimeRates, false)}`}></i>Crime Rates: {property2.crimeRates}</li>
          <li><i className={`fas fa-lock mr-2 ${getComparisonColor(property2.securityMeasures, property1.securityMeasures, true)}`}></i>Security Measures: {property2.securityMeasures}</li>
          <li><i className={`fas fa-shopping-cart mr-2 ${getComparisonColor(property2.groceryStoresProximity, property1.groceryStoresProximity, false)}`}></i>Grocery Stores Proximity: {property2.groceryStoresProximity} km</li>
          <li><i className={`fas fa-hospital mr-2 ${getComparisonColor(property2.hospitalsProximity, property1.hospitalsProximity, false)}`}></i>Hospitals Proximity: {property2.hospitalsProximity} km</li>
          <li><i className={`fas fa-school mr-2 ${getComparisonColor(property2.schoolsProximity, property1.schoolsProximity, false)}`}></i>Schools Proximity: {property2.schoolsProximity} km</li>
          <li><i className={`fas fa-dumbbell mr-2 ${getComparisonColor(property2.gymsProximity, property1.gymsProximity, false)}`}></i>Gyms Proximity: {property2.gymsProximity} km</li>
          <li><i className={`fas fa-tree mr-2 ${getComparisonColor(property2.parksProximity, property1.parksProximity, false)}`}></i>Parks Proximity: {property2.parksProximity} km</li>
          <li><i className={`fas fa-shopping-bag mr-2 ${getComparisonColor(property2.shoppingCentersProximity, property1.shoppingCentersProximity, false)}`}></i>Shopping Centers Proximity: {property2.shoppingCentersProximity} km</li>
          <li><i className={`fas fa-road mr-2 ${getComparisonColor(property2.nearbyHighways, property1.nearbyHighways, false)}`}></i>Nearby Highways: {property2.nearbyHighways} km</li>
          <li><i className={`fas fa-volume-up mr-2 ${getComparisonColor(property2.noisyBusinesses, property1.noisyBusinesses, false)}`}></i>Noisy Businesses: {property2.noisyBusinesses} km</li>
          <li><i className={`fas fa-wifi mr-2 ${getComparisonColor(property2.highSpeedInternet, property1.highSpeedInternet, true)}`}></i>High-Speed Internet: {property2.highSpeedInternet} Mbps</li>
          <li><i className={`fas fa-headset mr-2 ${getComparisonColor(property2.managementResponsiveness, property1.managementResponsiveness, true)}`}></i>Management Responsiveness: {property2.managementResponsiveness}</li>
          <li><i className={`fas fa-home mr-2 ${getComparisonColor(property2.propertyCondition, property1.propertyCondition, true)}`}></i>Property Condition: {property2.propertyCondition}</li>
          <li><i className={`fas fa-dollar-sign mr-2 ${getComparisonColor(property2.areaCostOfLiving, property1.areaCostOfLiving, false)}`}></i>Area Cost of Living: {property2.areaCostOfLiving}</li>
          <li><i className={`fas fa-chart-line mr-2 ${getComparisonColor(property2.propertyValueGrowth, property1.propertyValueGrowth, true)}`}></i>Property Value Growth: {property2.propertyValueGrowth}</li>
        </ul>
      </div>
    </div>
  );
}

export default PropertyComparison;