import HeroSection from "@/components/HeroSection";
import InfiniteBanner from "@/components/InfiniteBanner";
import ServicesSection from "@/components/ServicesSection";
import GallerySection from "@/components/GallerySection";
import BeforeAfterSection from "@/components/BeforeAfterSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-background min-h-screen text-foreground selection:bg-primary/30 selection:text-white">
      <HeroSection />
      <InfiniteBanner />
      <ServicesSection />
      <GallerySection />
      <BeforeAfterSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
