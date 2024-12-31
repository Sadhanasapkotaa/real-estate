// components/CuratedTourPackages.tsx

import React from 'react';

const Hero = () => {
  return (
    <div className="flex flex-col items-center py-16 bg-gray-50">
      {/* Heading Section */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold mb-4">What We Offer</h2>
        <p className="text-gray-600 text-lg max-w-2xl">
          Our services are designed to meet the needs of every traveler, from solo adventurers to families with children.
        </p>
      </div>

      {/* Content Section */}
      <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12">
        {/* Text Block */}
        <div className="max-w-lg">
          <h3 className="text-2xl font-semibold mb-4">Curated Tour Packages</h3>
          <p className="text-gray-600 mb-6">
            We offer a curated selection of tour packages, catering to various travel styles, themes, and durations. These packages are designed to help you discover the world in an unforgettable way, whether you’re looking for a relaxing beach vacation, an adrenaline-pumping adventure, or a cultural immersion experience.
          </p>
          <button className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-all">
            Get Started
          </button>
        </div>

        {/* Image Stack */}
        <div className="relative w-64 h-64">
          <div className="absolute top-0 left-0 w-32 h-32">
            <img
              src="/images/tour1.jpg" 
              alt="Tour 1"
              className="rounded-lg shadow-lg w-full h-full object-cover"
            />
          </div>
          <div className="absolute top-12 right-0 w-40 h-40">
            <img
              src="/images/tour2.jpg"
              alt="Tour 2"
              className="rounded-lg shadow-lg w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 left-8 w-36 h-36">
            <img
              src="/images/tour3.jpg"
              alt="Tour 3"
              className="rounded-lg shadow-lg w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
