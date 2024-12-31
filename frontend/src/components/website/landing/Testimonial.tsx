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
        "image": "path/to/sarah.jpg"
    },
    {
        "id": 2,
        "name": "Peter Brown",
        "company": "Bryan",
        "text": "Great prices and excellent service",
        "date": "7 days ago",
        "rating": 5,
        "image": "path/to/peter.jpg"
    },
    {
        "id": 3,
        "name": "John Smith",
        "company": "Smith Industries",
        "text": "Excellent selection of office spaces available",
        "date": "7 days ago",
        "rating": 5,
        "image": "path/to/john.jpg"
    }
]

const Testimonial: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="testimonial-section">
            <h2>What Clients Say</h2>
            <div className="testimonial-header">
                <h3>We're trusted by the most important teams</h3>
                <p>10k+ Customers • 99% Satisfaction</p>
            </div>
            <div className="testimonial-container">
                {testimonialsData.map((testimonial, index) => (
                    <div
                        key={testimonial.id}
                        className={`testimonial ${index === currentIndex ? 'active' : ''}`}
                    >
                        <img src={testimonial.image} alt={testimonial.name} className="testimonial-image" />
                        <p className="testimonial-text">“{testimonial.text}”</p>
                        <p className="testimonial-name">{testimonial.name}, {testimonial.company}</p>
                        <p className="testimonial-date">{testimonial.date}</p>
                        <div className="testimonial-rating">
                            {'★'.repeat(testimonial.rating)}{'☆'.repeat(5 - testimonial.rating)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Testimonial;