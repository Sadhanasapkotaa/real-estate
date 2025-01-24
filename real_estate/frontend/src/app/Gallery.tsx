'use client';

import { useEffect, useState } from 'react';

const images = [
  'https://media.istockphoto.com/id/1269776313/photo/suburban-house.webp?a=1&b=1&s=612x612&w=0&k=20&c=2aCYwO-u41uuBubb5KQ48GbCpJkDowSL7SlvLgzjknQ=',
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJlYWwlMjBlc3RhdGUlMjBpbWFnZXMlMjBsYW5kc2NhcGV8ZW58MHx8MHx8fDA%3D',
  'https://media.istockphoto.com/id/1269776313/photo/suburban-house.webp?a=1&b=1&s=612x612&w=0&k=20&c=2aCYwO-u41uuBubb5KQ48GbCpJkDowSL7SlvLgzjknQ=',
  'https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHJlYWwlMjBlc3RhdGUlMjBpbWFnZXMlMjBsYW5kc2NhcGV8ZW58MHx8MHx8fDA%3D',
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJlYWwlMjBlc3RhdGUlMjBpbWFnZXMlMjBsYW5kc2NhcGV8ZW58MHx8MHx8fDA%3D',
  'https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?w=500&auto=format&fit   =crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHJlYWwlMjBlc3RhdGUlMjBpbWFnZXMlMjBsYW5kc2NhcGV8ZW58MHx8MHx8fDA%3D',
  'https://media.istockphoto.com/id/1269776313/photo/suburban-house.webp?a=1&b=1&s=612x612&w=0&k=20&c=2aCYwO-u41uuBubb5KQ48GbCpJkDowSL7SlvLgzjknQ=',
  'https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHJlYWwlMjBlc3RhdGUlMjBpbWFnZXMlMjBsYW5kc2NhcGV8ZW58MHx8MHx8fDA%3D',
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJlYWwlMjBlc3RhdGUlMjBpbWFnZXMlMjBsYW5kc2NhcGV8ZW58MHx8MHx8fDA%3D',
  // Add more image URLs as needed
];

const Gallery: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const startSlideshow = (index: number) => {
    setCurrentIndex(index);
  };

  const nextImage = () => {
    if (currentIndex !== null) {
      setCurrentIndex((prevIndex) => ((prevIndex ?? 0) + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (currentIndex !== null) {
      setCurrentIndex((prevIndex) => (prevIndex ?? 0) === 0 ? images.length - 1 : (prevIndex ?? 0) - 1);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4 m-20 p-5">
      {images.map((image, index) => (
        <div key={index} className="cursor-pointer" onClick={() => startSlideshow(index)}>
          <img src={image} alt={`Gallery image ${index + 1}`} className="w-full h-auto" />
        </div>
      ))}
      {currentIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
          <button onClick={prevImage} className="absolute left-4 text-red text-2xl">
            <p>{`<`}</p>
          </button>
          <img src={images[currentIndex]} alt={`Slideshow image ${currentIndex + 1}`} className="w-3/4 h-auto" />
          <button onClick={nextImage} className="absolute right-4 text-red text-2xl">
            <p>{`>`}</p>
          </button>
          <button onClick={() => setCurrentIndex(null)} className="absolute top-4 right-4 text-white">
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Gallery;