import HeroSection from "@/components/landing/hero-section";
import AboutSection from "@/components/landing/about-section";
import DestinationSection from "@/components/landing/destination-section";
import KulinerSection from "@/components/landing/kuliner-section";
import GallerySection from "@/components/landing/gallery-section";
import CTASection from "@/components/landing/cta-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <DestinationSection />
      <KulinerSection />
      <GallerySection />
      <CTASection />
    </>
  );
}
