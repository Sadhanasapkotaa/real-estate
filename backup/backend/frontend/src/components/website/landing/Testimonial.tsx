'use client'
import { useState, useEffect } from 'react';

const testimonialsData = [
    {
        "id": 1,
        "name": "Sarah Johnson",
        "company": "Johnson",
        "text": "Our entire team loved the offices",
        "date": "7 days ago",
        "rating": 5,
        "image": "/images/sarah.jpg"  // Ensure correct image path
    },
    {
        "id": 2,
        "name": "Peter Brown",
        "company": "Bryan",
        "text": "Great prices and excellent service",
        "date": "7 days ago",
        "rating": 5,
        "image": "/images/peter.jpg"  // Ensure correct image path
    },
    {
        "id": 3,
        "name": "John Smith",
        "company": "Smith Industries",
        "text": "Excellent selection of office spaces available",
        "date": "7 days ago",
        "rating": 5,
        "image": "/images/john.jpg"  // Ensure correct image path
    }
];

const Testimonial: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="testimonial-section bg-blue-700 py-16 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-semibold text-gray-800">What Clients Say</h2>
                <div className="mt-4">
                    <h3 className="text-xl font-medium text-gray-600">We're trusted by the most important teams</h3>
                    <p className="mt-2 text-sm text-gray-500">10k+ Customers • 99% Satisfaction</p>
                </div>
            </div>
            <div className="testimonial-container mx-auto max-w-3xl bg-white rounded-lg shadow-lg p-6">
                <div className="testimonial flex flex-col items-center text-center space-y-6">
                    <img
                        src={testimonialsData[currentIndex].image}
                        alt={testimonialsData[currentIndex].name}
                        className="testimonial-image w-24 h-24 rounded-full object-cover border-4 border-indigo-500"
                    />
                    <p className="testimonial-text text-lg font-medium text-gray-700">“{testimonialsData[currentIndex].text}”</p>
                    <p className="testimonial-name text-xl font-semibold text-gray-800">
                        {testimonialsData[currentIndex].name}, {testimonialsData[currentIndex].company}
                    </p>
                    <p className="testimonial-date text-sm text-gray-500">{testimonialsData[currentIndex].date}</p>
                    <div className="testimonial-rating text-yellow-500">
                        {'★'.repeat(testimonialsData[currentIndex].rating)}{'☆'.repeat(5 - testimonialsData[currentIndex].rating)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Testimonial;