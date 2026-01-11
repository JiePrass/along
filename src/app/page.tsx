import Header from "@/components/layouts/header";
import HeroSection from "@/components/landing/hero-section";
import AboutSection from "@/components/landing/about-section";
import DestinationSection from "@/components/landing/destination-section";
import KulinerSection from "@/components/landing/kuliner-section";
import CTASection from "@/components/landing/cta-section";
import Footer from "@/components/layouts/footer";

export default function Home() {
  return (
    <main className="relative">
      <Header />
      <HeroSection />
      <AboutSection />
      <DestinationSection />
      <KulinerSection />
      <CTASection />
      <Footer />
    </main>
  );
}
