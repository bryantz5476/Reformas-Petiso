import { lazy, Suspense } from "react";
import HeroSection from "@/components/HeroSection";

const InfiniteBanner = lazy(() => import("@/components/InfiniteBanner"));
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const GallerySection = lazy(() => import("@/components/GallerySection"));
const BeforeAfterSection = lazy(() => import("@/components/BeforeAfterSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));

export default function Home() {
  return (
    <main className="bg-background min-h-screen text-foreground selection:bg-primary/30 selection:text-white">
      <HeroSection />
      <Suspense fallback={null}>
        <InfiniteBanner />
        <ServicesSection />
        <GallerySection />
        <BeforeAfterSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
      </Suspense>
    </main>
  );
}
