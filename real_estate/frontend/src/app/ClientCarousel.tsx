
'use client';

import dynamic from 'next/dynamic';

const Carousel = dynamic(() => import('./Carousel'), { ssr: false });

export default function ClientCarousel() {
  return <Carousel />;
}