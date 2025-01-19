'use client';
import { useState, useEffect } from "react";

const Carousel = () => {
  // Dummy images for the carousel
  const images = [
    'https://u.realgeeks.media/livingonthewestside/Banner-Main-01.jpg',
    'https://www.vacation-key.com/photos/1/1/116812-1.jpg',
    'https://www.brunner.com/produkte/ofentechnik/kamin/panorama/image-thumb__7574__stage-slider/slider_brunner_kamine_panoramakamin_51-66-50-66_schwebende-optik_verwaltungsgebauede.jpg',
    'https://images.squarespace-cdn.com/content/v1/551b0ebce4b0d35570ce6f0b/1680036323951-8GGI9QE0PLNB6WWO0TA1/Screen+Shot+2023-03-28+at+1.20.53+PM.png',
    'https://mybayutcdn.bayut.com/mybayut/wp-content/uploads/Hot-New-Property-Launches-in-Dubai-Cover-05-04-1.jpg',
    'https://images.destination2.co.uk/banner/2021/dubai/Banner.jpg'
  ];

  // State to manage the current active image
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Move to the previous image
  const goLeft = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Move to the next image
  const goRight = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Move to a specific image by clicking a thumbnail
  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  // Automatically change images every 5 seconds
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isHovered, images.length]);

  return (
    <div className="relative flex flex-col items-center mx-20">
      {/* Carousel Container */}
      <div
        className="w-full h-96 relative overflow-hidden shadow-lg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Images */}
        <img
          src={images[currentIndex]}
          alt={`Image ${currentIndex}`}
          className="w-full h-full object-cover transition-all duration-500"
        />

        {/* Left Arrow */}
        <div
          onClick={goLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 cursor-pointer"
        >
          &#9664;
        </div>

        {/* Right Arrow */}
        <div
          onClick={goRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 cursor-pointer"
        >
          &#9654;
        </div>
      </div>

      {/* Image Thumbnails */}
      <div className="flex mt-4 space-x-2">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index}`}
            onClick={() => goToImage(index)}
            className={`w-20 h-12 object-cover cursor-pointer border-2 ${currentIndex === index ? 'border-blue-600' : 'border-transparent'
              }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;