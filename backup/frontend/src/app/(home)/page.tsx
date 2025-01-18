import About from "@/components/website/landing/About";
import Carousel from "@/components/website/landing/Carousel";
import FAQ from "@/components/website/landing/FAQ";
import Functionality from "@/components/website/landing/Functionality";
import Gallery from "@/components/website/landing/Gallery";
import Hero from "@/components/website/landing/Hero";
import Services from "@/components/website/landing/Services";
import Testimonial from "@/components/website/landing/Testimonial";
// import Image from "next/image";

export default function Home() {
  return (
    <>
    <Carousel />
    <Hero />
    <About />
    <Services />
    <Functionality />
    <Testimonial />
    <FAQ />
    <Gallery />
    </>

  );
}