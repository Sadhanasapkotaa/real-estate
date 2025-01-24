import React, { useEffect, useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import BuildIcon from '@mui/icons-material/Build';
import CreditCardIcon from '@mui/icons-material/CreditCard';

const services = [
    {
        title: 'Property Listings',
        description:
            'Explore a wide range of properties available for sale or rent. Find your dream home or the perfect investment property.',
        icon: () => <HomeIcon style={{ fontSize: 40, color: '#3b82f6' }} />,
    },
    {
        title: 'Real Estate Consulting',
        description:
            'Receive expert advice from our real estate professionals to help you make the right decisions for your investments.',
        icon: () => <BusinessCenterIcon style={{ fontSize: 40, color: '#3b82f6' }} />,
    },
    {
        title: 'Property Management',
        description:
            'Our property management services ensure that your properties are taken care of efficiently, maximizing your returns.',
        icon: () => <BuildIcon style={{ fontSize: 40, color: '#3b82f6' }} />,
    },
    {
        title: 'Mortgage Assistance',
        description:
            'Get help finding the best mortgage rates and financial advice to secure the home of your dreams.',
        icon: () => <CreditCardIcon style={{ fontSize: 40, color: '#3b82f6' }} />,
    },
];

const Services = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    return (
        <section className="bg-white py-8 md:py-16 px-4 md:px-8">
            {/* Page Header */}
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 transition-transform duration-500 hover:scale-105">
                    Our Premium Services
                </h2>
                <p className="text-base md:text-lg text-gray-500">
                    Trusted by thousands of clients to offer top-tier real estate services
                </p>
            </div>

            {/* Services Section */}
            <div className="max-w-6xl mx-auto mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-6 md:gap-10 px-4 md:px-0">
                {services.map((service, index) => (
                    <div
                        key={index}
                        className="sm:m-5 md:m-0 border border-blue-300 bg-white shadow-lg rounded-lg p-6 md:p-7 hover:shadow-2xl transition duration-300 transform hover:scale-105 h-auto"
                    >
                        <div className="text-4xl md:text-6xl mb-4 text-blue-500">{service.icon()}</div>
                        <h3 className="text-xl md:text-2xl font-semibold text-black mb-3">
                            {service.title}
                        </h3>
                        <p className="text-sm md:text-base text-gray-600">{service.description}</p>
                    </div>
                ))}
            </div>

            {/* CTA Section */}
            <div className="mt-16 md:mt-20 max-w-6xl mx-auto bg-gradient-to-r from-blue-500 to-blue-700 text-white text-center py-8 md:py-12 rounded-lg shadow-lg px-4 md:px-0">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    Ready to Get Started with Us?
                </h3>
                <p className="text-lg md:text-xl mb-6">
                    Let us help you find the best real estate solutions tailored to your needs.
                </p>
                <button className="px-6 md:px-8 py-3 md:py-4 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition duration-300">
                    Contact Us Today
                </button>
            </div>
        </section>
    );
};

export default Services;
