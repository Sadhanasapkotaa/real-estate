import React from "react";

const About = () => {
  return (
    <div className="bg-gradient-to-r from-white to-gray-50 py-16 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* Left Section - Text and Stats */}
        <div>
          <h3 className="text-blue-600 uppercase tracking-widest text-sm mb-2">About Us</h3>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">Our Architectural Journey</h2>
          <p className="text-gray-700 mb-8 leading-relaxed">
            Founded on the belief in the transformative power of architecture, VerdeVista Design Group began as a small team with big dreams.
          </p>
          
          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
            {statsData.map((stat, index) => (
              <div key={index} className="text-left p-4 border-t border-blue-700 hover:shadow-lg transition-shadow duration-300 bg-white">
                <h4 className="text-3xl font-bold text-blue-600 mb-1">{stat.value}</h4>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section - Image */}
        <div className="flex justify-center">
          <img
            src="/path-to-image/architect-team.jpg" // Replace with your image path
            alt="Architectural team working"
            className="rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105 object-cover h-full max-w-full"
          />
        </div>
      </div>
    </div>
  );
};

// Stats Data
const statsData = [
  { value: "50+ years", label: "of shaping architectural landscapes" },
  { value: "100+ Projects", label: "successfully delivered with excellence" },
  { value: "20+ Awards", label: "won, underscoring our dedication to innovation" },
  { value: "99% Success", label: "reflects our client-centric approach" },
];

export default About;
