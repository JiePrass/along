import Header from "@/components/layouts/header";
import HeroSection from "@/components/landing/hero-section";
import AboutSection from "@/components/landing/about-section";
import Footer from "@/components/layouts/footer";

export default function Home() {
  return (
    <main className="relative">
      <Header />
      <HeroSection />
      <AboutSection />
      <Footer />
    </main>
  );
}
