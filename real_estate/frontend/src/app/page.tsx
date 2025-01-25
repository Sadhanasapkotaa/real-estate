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
      <HeaderWebsite key="header" />
      <ClientCarousel key="carousel" />
      <Services key="services" />
      <Gallery key="gallery" />
      <FAQ key="faq" />
      <Footer key="footer" />
    </div>
  );
}
