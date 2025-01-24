"use client";
import Services from './Services';
import Gallery from './Gallery';
import FAQ from './FAQ';
import Footer from './Footer';
import ClientCarousel from './ClientCarousel';
import HeaderWebsite from './HeaderWebsite';

export default function Home() {
  return (
    <div>
      {/* ClientHeaderWebsite is server-side rendered (SSR) */}
      <HeaderWebsite />
      <ClientCarousel />
      <Services />
      <Gallery />
      <FAQ />
      <Footer />
    </div>
  );
}
