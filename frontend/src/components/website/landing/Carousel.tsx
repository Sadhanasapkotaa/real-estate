'use client';
import { useState } from "react";

const Carousel = () => {
  // Dummy images for the carousel
  const images = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxUjuZXu2F86sca2cUjX-1LMcw9ABHh3f22g&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJrT7MI9fsrc6mWRBJBwhrf4vwTL7S5B8CzQ&s',
    'https://png.pngtree.com/thumb_back/fh260/background/20230411/pngtree-nature-forest-sun-ecology-image_2256183.jpg',
    'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?cs=srgb&dl=pexels-souvenirpixels-417074.jpg&fm=jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzJdxg_c_CiGC28hCTIoMZW58xbd_8fCG9WyokAAsXUAYH5w6ImS5EgHUASxk82ES22ss&usqp=CAU'
  ];

  // State to manage the current active image
  const [currentIndex, setCurrentIndex] = useState(0);

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

  return (
    <div className="relative flex flex-col items-center m-20">
      {/* Carousel Container */}
      <div className="w-full h-96 relative overflow-hidden rounded-lg shadow-lg">
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

export default Carousel;;
