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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "توريد الديزل في دبي والإمارات | ديزل 10 PPM وتوصيل سريع 24/7 | الرعد الثاقب",
      },
      {
        name: "description",
        content:
          "الرعد الثاقب لتجارة الديزل توفر توريد ديزل 10 PPM في دبي وجميع الإمارات مع توصيل سريع 24/7 للمواقع، المولدات، المصانع، وأساطيل النقل بأسعار تنافسية.",
      },
      {
        name: "keywords",
        content:
          "توريد ديزل دبي, ديزل 10 PPM, ديزل الإمارات, توصيل وقود دبي, diesel supply dubai, diesel delivery uae, fuel supplier dubai, 10ppm diesel uae",
      },
      { property: "og:title", content: "توريد الديزل في دبي والإمارات | ديزل 10 PPM وتوصيل 24/7" },
      {
        property: "og:description",
        content:
          "توريد ديزل 10 PPM عالي الجودة في جميع أنحاء الإمارات مع خدمة سريعة 24/7 للمشاريع والمصانع والمولدات وأساطيل النقل.",
      },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:image", content: `${SITE_URL}/favicon-512.png` },
      { name: "twitter:title", content: "توريد الديزل في دبي والإمارات | ديزل 10 PPM" },
      {
        name: "twitter:description",
        content: "توريد ديزل 10 PPM وتوصيل سريع 24/7 في جميع الإمارات.",
      },
      { name: "twitter:image", content: `${SITE_URL}/favicon-512.png` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": `${SITE_URL}/`,
          name: "ALRAAD ALTHAQEB Diesel Fuel Trading L.L.C",
          alternateName: "شركة الرعد الثاقب لتجارة الوقود",
          description:
            "توريد ديزل 10 PPM في دبي وجميع الإمارات مع توصيل سريع 24/7 للمواقع والمصانع والمولدات وأساطيل النقل",
          url: SITE_URL,
          telephone: "+971555677114",
          email: "alraad247@gmail.com",
          image: `${SITE_URL}/favicon-512.png`,
          priceRange: "$$",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Mafraq Industrial Area",
            addressLocality: "Abu Dhabi",
            addressCountry: "AE",
          },
          areaServed: { "@type": "Country", name: "United Arab Emirates" },
          serviceType: [
            "Diesel Supply",
            "Diesel Delivery",
            "10 PPM Diesel Supply UAE",
            "Fuel Delivery Dubai",
          ],
          openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            opens: "00:00",
            closes: "23:59",
          },
        }),
      },
    ],
  }),
  component: IndexPage,
});

function IndexPage() {
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
