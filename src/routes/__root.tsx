import { Outlet, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

import appCss from "../styles.css?url";

const SITE_URL = "https://www.alraad-althaqeb.com";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 pt-20">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-black text-primary">404</h1>
        <h2 className="mt-4 text-2xl font-bold text-foreground">
          الصفحة غير موجودة
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          الرابط الذي تبحث عنه غير صحيح أو تم نقله.
        </p>
        <div className="mt-6">
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            العودة للرئيسية
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: "ALRAAD ALTHAQEB Diesel Fuel Trading L.L.C" },
      { name: "robots", content: "index, follow" },
      { name: "theme-color", content: "#1e3a8a" },
      { httpEquiv: "Content-Language", content: "ar" },

      { title: "الرعد الثاقب لتجارة الوقود | توريد ديزل 10 PPM في دبي والإمارات" },
      {
        name: "description",
        content:
          "شركة الرعد الثاقب لتجارة الديزل - توريد وتوصيل ديزل 10 PPM في دبي وجميع الإمارات. خدمة 24/7 بأسعار تنافسية.",
      },

      // Open Graph defaults (overridden per route)
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "ALRAAD ALTHAQEB Diesel Trading" },
      { property: "og:locale", content: "ar_AE" },
      { property: "og:locale:alternate", content: "en_US" },

      // Twitter
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@alraad_diesel" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32.png" },
      { rel: "icon", type: "image/png", sizes: "192x192", href: "/favicon-192.png" },
      { rel: "icon", type: "image/png", sizes: "512x512", href: "/favicon-512.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=Tajawal:wght@400;500;700;800;900&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "ALRAAD ALTHAQEB Diesel Fuel Trading L.L.C",
          alternateName: "شركة الرعد الثاقب لتجارة الوقود",
          url: SITE_URL,
          logo: `${SITE_URL}/favicon-512.png`,
          description:
            "توريد الديزل 10 PPM في دبي وجميع الإمارات مع توصيل سريع 24/7",
          areaServed: "AE",
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+971555677114",
            contactType: "customer service",
            availableLanguage: ["Arabic", "English"],
          },
          sameAs: [
            "https://www.facebook.com/alraad.diesel/",
            "https://www.linkedin.com/in/ahmed-alraad-209157401/",
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "ALRAAD ALTHAQEB Diesel Fuel Trading",
          alternateName: "الرعد الثاقب لتجارة الديزل",
          url: SITE_URL,
          inLanguage: "ar",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <LanguageProvider>
      <ScrollToTop />
      <Navbar />
      <main className="pt-16">
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <Sonner />
    </LanguageProvider>
  );
}
