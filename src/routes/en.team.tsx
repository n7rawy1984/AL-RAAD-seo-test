import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink, Globe, BarChart2, Share2, TrendingUp } from "lucide-react";

const SITE_URL = "https://www.alraad-althaqeb.com";

export const Route = createFileRoute("/en/team")({
  head: () => ({
    meta: [
      { title: "Our Team | ALRAAD ALTHAQEB Diesel Trading UAE" },
      {
        name: "description",
        content:
          "Meet the ALRAAD ALTHAQEB team — specialists in diesel trading and supply across the UAE, including our SEO, Google Ads, and digital marketing professional.",
      },
      { property: "og:title", content: "Our Team | ALRAAD ALTHAQEB Diesel Trading UAE" },
      {
        property: "og:description",
        content:
          "Meet the ALRAAD ALTHAQEB team specializing in diesel trading and supply across Dubai and the UAE.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/en/team` },
      { tagName: "link", rel: "canonical", href: `${SITE_URL}/en/team` },
      { tagName: "link", rel: "alternate", hrefLang: "ar", href: `${SITE_URL}/team` },
      { tagName: "link", rel: "alternate", hrefLang: "en", href: `${SITE_URL}/en/team` },
      { rel: "alternate", hrefLang: "ar", href: `${SITE_URL}/team` },
      { rel: "alternate", hrefLang: "en", href: `${SITE_URL}/en/team` },
      { rel: "alternate", hrefLang: "x-default", href: `${SITE_URL}/team` },
    ],
  }),
  component: EnTeamPage,
});

const teamMembers = [
  {
    name: "Ahmed Al-Raad",
    role: "General Manager",
    description:
      "Leads ALRAAD ALTHAQEB with extensive experience in fuel and diesel trading across the Gulf region, committed to delivering the highest standards of quality and reliability 24/7.",
    icon: "👔",
    link: null,
    stats: null,
  },
  {
    name: "Operations Team",
    role: "Supply & Logistics Management",
    description:
      "A dedicated team ensuring timely delivery of high-quality 10 PPM diesel to all client sites across Dubai, Abu Dhabi, and the UAE around the clock.",
    icon: "🚛",
    link: null,
    stats: null,
  },
  {
    name: "Mohamed Elnahrawy",
    role: "Digital Marketing | SEO Specialist | Google Ads | Web & Social Media Manager",
    description:
      "Specialist in Technical SEO and high-ROAS Google Ads campaigns. Responsible for ALRAAD ALTHAQEB's entire digital presence — from top Google rankings to qualified lead generation across Dubai and Abu Dhabi.",
    icon: "💻",
    link: {
      href: "https://elnahrawy.online/",
      label: "Mohamed Elnahrawy — UAE SEO & Google Ads Expert",
      rel: "nofollow",
    },
    stats: ["+184% Organic Growth", "98/100 Core Web Vitals", "Google Ads UAE"],
  },
];

const digitalServices = [
  {
    icon: Globe,
    title: "Website Management",
    desc: "Designing, developing, and maintaining the website with the latest technologies — Core Web Vitals 95+.",
  },
  {
    icon: BarChart2,
    title: "SEO Optimization",
    desc: "Comprehensive Technical SEO strategy to ensure top Google rankings in both Arabic and English.",
  },
  {
    icon: TrendingUp,
    title: "Google Ads — High-ROAS Campaigns",
    desc: "Performance-driven Google Ads campaigns targeting diesel clients across Dubai, Abu Dhabi, and the UAE.",
  },
  {
    icon: Share2,
    title: "Social Media Management",
    desc: "Managing social media platforms and building the brand's digital presence across the GCC.",
  },
];

function EnTeamPage() {
  return (
    <main className="min-h-screen bg-background pt-24 pb-16" dir="ltr">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Team</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Behind every drop of diesel delivered on time, there's a dedicated team committed to
            quality and efficiency.
          </p>
          <div className="mt-4">
            <Link
              to="/team"
              className="inline-block px-5 py-2 rounded-full bg-accent/10 text-accent font-semibold text-sm hover:bg-accent hover:text-white transition-all duration-300"
            >
              ← النسخة العربية
            </Link>
          </div>
        </div>

        {/* Team Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
            >
              <div className="text-4xl mb-4">{member.icon}</div>
              <h2 className="text-xl font-bold text-foreground mb-1">{member.name}</h2>
              <p className="text-sm font-semibold text-accent mb-3">{member.role}</p>
              <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                {member.description}
              </p>
              {member.stats && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {member.stats.map((stat) => (
                    <span
                      key={stat}
                      className="text-xs bg-primary/10 text-primary font-semibold px-2 py-1 rounded-full"
                    >
                      {stat}
                    </span>
                  ))}
                </div>
              )}
              {member.link && (
                <a
                  href={member.link.href}
                  target="_blank"
                  rel={`noopener noreferrer ${member.link.rel}`}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
                >
                  <ExternalLink className="h-4 w-4" />
                  {member.link.label}
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Digital Services */}
        <div className="mt-16 bg-primary/5 border border-primary/10 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-primary mb-2 text-center">
            Our In-House Digital Services
          </h2>
          <p className="text-center text-muted-foreground text-sm mb-8">
            Mohamed Elnahrawy manages ALRAAD ALTHAQEB's full digital presence — from the website to
            paid campaigns.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {digitalServices.map((service) => (
              <div key={service.title} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <service.icon className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
