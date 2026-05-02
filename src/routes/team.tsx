import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink, Globe, BarChart2, Share2, TrendingUp } from "lucide-react";

const SITE_URL = "https://www.alraad-althaqeb.com";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "فريق العمل | الرعد الثاقب لتجارة الديزل" },
      {
        name: "description",
        content:
          "تعرف على فريق الرعد الثاقب المتخصص في تجارة وتوريد الديزل في الإمارات، بما في ذلك مسؤول التسويق الرقمي وتحسين محركات البحث وإعلانات جوجل.",
      },
      { property: "og:title", content: "فريق العمل | الرعد الثاقب لتجارة الديزل" },
      {
        property: "og:description",
        content: "تعرف على فريق الرعد الثاقب المتخصص في تجارة وتوريد الديزل في الإمارات.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/team` },
      { tagName: "link", rel: "canonical", href: `${SITE_URL}/team` },
      { tagName: "link", rel: "alternate", hrefLang: "ar", href: `${SITE_URL}/team` },
      { tagName: "link", rel: "alternate", hrefLang: "en", href: `${SITE_URL}/en/team` },
      { rel: "alternate", hrefLang: "ar", href: `${SITE_URL}/team` },
      { rel: "alternate", hrefLang: "en", href: `${SITE_URL}/en/team` },
      { rel: "alternate", hrefLang: "x-default", href: `${SITE_URL}/team` },
    ],
  }),
  component: TeamPage,
});

const teamMembers = [
  {
    name: "أحمد الرعد",
    role: "المدير العام",
    description:
      "يقود الرعد الثاقب بخبرة واسعة في تجارة الوقود والديزل في منطقة الخليج، ملتزم بتقديم أعلى معايير الجودة والموثوقية للعملاء على مدار 24/7.",
    icon: "👔",
    link: null,
    stats: null,
  },
  {
    name: "فريق العمليات",
    role: "إدارة التوريد والخدمات اللوجستية",
    description:
      "فريق متخصص يضمن وصول ديزل 10 PPM عالي الجودة في الوقت المحدد إلى جميع مواقع العملاء في دبي وأبوظبي وجميع الإمارات على مدار الساعة.",
    icon: "🚛",
    link: null,
    stats: null,
  },
  {
    name: "محمد النحراوي",
    role: "مسؤول التسويق الرقمي | SEO | إعلانات جوجل | إدارة الويب والسوشيال ميديا",
    description:
      "متخصص في تحسين محركات البحث التقني (Technical SEO) وإعلانات جوجل عالية العائد وإدارة الحضور الرقمي. مسؤول عن تعزيز ظهور الرعد الثاقب في نتائج البحث وتحقيق عملاء مؤهلين من دبي وأبوظبي.",
    icon: "💻",
    link: {
      href: "https://elnahrawy.online/",
      label: "موقع محمد النحراوي — خبير SEO وإعلانات جوجل في الإمارات",
      rel: "nofollow",
    },
    stats: ["+184% نمو عضوي", "98/100 Core Web Vitals", "Google Ads UAE"],
  },
];

const digitalServices = [
  {
    icon: Globe,
    title: "إدارة الموقع الإلكتروني",
    desc: "تصميم وتطوير وصيانة الموقع بأحدث التقنيات مع Core Web Vitals 95+",
  },
  {
    icon: BarChart2,
    title: "تحسين محركات البحث (SEO)",
    desc: "استراتيجية SEO تقني متكاملة لضمان ظهور الموقع في صدارة نتائج جوجل بالعربي والإنجليزي",
  },
  {
    icon: TrendingUp,
    title: "إعلانات جوجل — Google Ads",
    desc: "حملات إعلانية عالية العائد تستهدف عملاء الديزل في دبي وأبوظبي والإمارات",
  },
  {
    icon: Share2,
    title: "إدارة السوشيال ميديا",
    desc: "إدارة منصات التواصل الاجتماعي وبناء الحضور الرقمي للعلامة التجارية",
  },
];

function TeamPage() {
  return (
    <main className="min-h-screen bg-background pt-24 pb-16" dir="rtl">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">فريق العمل</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            خلف كل قطرة ديزل تصل في الوقت المحدد، فريق محترف ملتزم بالجودة والكفاءة.
          </p>
          <div className="mt-4">
            <Link
              to="/en/team"
              className="inline-block px-5 py-2 rounded-full bg-accent/10 text-accent font-semibold text-sm hover:bg-accent hover:text-white transition-all duration-300"
            >
              English Version →
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
            خدماتنا الرقمية الداخلية
          </h2>
          <p className="text-center text-muted-foreground text-sm mb-8">
            يُدير محمد النحراوي كامل الحضور الرقمي للرعد الثاقب — من الموقع إلى الإعلانات.
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
