import Services from './Services';
import Gallery from './Gallery';
import FAQ from './FAQ';
import Carousel from './Carousel';
import HeaderWebsite from './HeaderWebsite';

export default function Home() {
  return (
    <div>
      <HeaderWebsite />
      <Carousel />
      <Services />
      <Gallery />
      <FAQ />
    </div>
  );
}
