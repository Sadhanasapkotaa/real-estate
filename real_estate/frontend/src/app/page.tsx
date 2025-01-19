import Services from './Services';
import Gallery from './Gallery';
import FAQ from './FAQ';
import Footer from './Footer';
import ClientCarousel from './ClientCarousel';
import ClientHeaderWebsite from './ClientHeaderWebsite';

export default function Home() {
  return (
    <div>
      <ClientHeaderWebsite />
      <ClientCarousel />
      <Services />
      <Gallery />
      <FAQ />
      <Footer />
    </div>
  );
}
