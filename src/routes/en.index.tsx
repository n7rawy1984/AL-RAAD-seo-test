import { createFileRoute } from "@tanstack/react-router";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import SectorsSection from "@/components/SectorsSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";

const SITE_URL = "https://www.alraad-althaqeb.com";

export const Route = createFileRoute("/en/")({
  head: () => ({
    meta: [
      {
        title:
          "Diesel Supply in Dubai & UAE | 10 PPM Diesel & Fast 24/7 Delivery | ALRAAD ALTHAQEB",
      },
      {
        name: "description",
        content:
          "ALRAAD ALTHAQEB Diesel Trading provides 10 PPM diesel supply across Dubai and the UAE with fast 24/7 delivery to sites, generators, factories, and transport fleets at competitive prices.",
      },
      {
        name: "keywords",
        content:
          "diesel supply dubai, 10 PPM diesel, diesel UAE, fuel delivery dubai, diesel delivery uae, fuel supplier dubai, 10ppm diesel uae",
      },
      {
        property: "og:title",
        content: "Diesel Supply in Dubai & UAE | 10 PPM Diesel & 24/7 Delivery",
      },
      {
        property: "og:description",
        content:
          "High-quality 10 PPM diesel supply across the UAE with fast 24/7 service for projects, factories, generators, and transport fleets.",
      },
      { property: "og:url", content: `${SITE_URL}/en` },
      { property: "og:image", content: `${SITE_URL}/favicon-512.png` },
      { name: "twitter:title", content: "Diesel Supply in Dubai & UAE | 10 PPM Diesel" },
      {
        name: "twitter:description",
        content: "10 PPM diesel supply with fast 24/7 delivery across the UAE.",
      },
      { name: "twitter:image", content: `${SITE_URL}/favicon-512.png` },
    ],
    links: [
      { rel: "canonical", href: `${SITE_URL}/en` },
      { rel: "alternate", hrefLang: "ar", href: `${SITE_URL}/` },
      { rel: "alternate", hrefLang: "en", href: `${SITE_URL}/en` },
      { rel: "alternate", hrefLang: "x-default", href: `${SITE_URL}/` },
    ],
  }),
  component: EnIndexPage,
});

function EnIndexPage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <AboutSection />
      <ServicesSection />
      <SectorsSection />
      <WhyChooseSection />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}
