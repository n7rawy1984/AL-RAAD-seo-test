import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { posts } from "@/data/blogData";
// route regen trigger

const SITE_URL = "https://www.alraad-althaqeb.com";

type BlogCategory = "all" | "supply" | "prices" | "construction" | "guides" | "emergency";

const categoryLabels: Record<BlogCategory, string> = {
  all: "الكل",
  supply: "توريد الديزل",
  prices: "الأسعار",
  construction: "المقاولات",
  guides: "الأدلة والنصائح",
  emergency: "الطوارئ",
};

const blogSearchSchema = z.object({
  category: z.enum(["all", "supply", "prices", "construction", "guides", "emergency"]).optional(),
  type: z.enum(["all", "article", "tip"]).optional(),
});

function getSEOData(activeCategory: BlogCategory, guideFilter: string) {
  if (activeCategory === "all") {
    return {
      title: "مدونة الرعد الثاقب | خبراء توريد الديزل في الإمارات",
      description: "اكتشف أحدث المقالات والنصائح الاحترافية حول توريد واستهلاك الديزل في الإمارات.",
      url: `${SITE_URL}/blog`,
    };
  }
  if (activeCategory === "supply") {
    return {
      title: "توريد الديزل في الإمارات | نصائح وخدمات التوريد",
      description: "تعرف على أفضل طرق توريد الديزل للمشاريع والشركات في الإمارات مع خدمات سريعة واحترافية.",
      url: `${SITE_URL}/blog?category=supply`,
    };
  }
  if (activeCategory === "prices") {
    return {
      title: "أسعار الديزل في الإمارات | تحديثات وتحليلات",
      description: "تابع أحدث أسعار الديزل في الإمارات وتحليلات السوق لاتخاذ قرارات أفضل.",
      url: `${SITE_URL}/blog?category=prices`,
    };
  }
  if (activeCategory === "construction") {
    return {
      title: "ديزل المقاولات والمعدات الثقيلة في الإمارات",
      description: "كل ما تحتاجه شركات المقاولات من حلول توريد الديزل للمعدات الثقيلة والمشاريع.",
      url: `${SITE_URL}/blog?category=construction`,
    };
  }
  if (activeCategory === "guides") {
    if (guideFilter === "tip") {
      return {
        title: "نصائح الديزل | تحسين الاستهلاك وخفض التكاليف",
        description: "نصائح احترافية لتقليل استهلاك الديزل وتحسين كفاءة التشغيل.",
        url: `${SITE_URL}/blog?category=guides&type=tip`,
      };
    }
    return {
      title: "دليل الديزل | مقالات احترافية",
      description: "مقالات متعمقة حول الديزل واستخداماته في المشاريع والصناعة.",
      url: `${SITE_URL}/blog?category=guides`,
    };
  }
  if (activeCategory === "emergency") {
    return {
      title: "توريد ديزل طوارئ 24/7 في الإمارات",
      description: "خدمة توريد ديزل عاجلة للمولدات والمشاريع في أي وقت.",
      url: `${SITE_URL}/blog?category=emergency`,
    };
  }
  return {
    title: "مدونة الديزل | الرعد الثاقب",
    description: "مقالات حول الديزل في الإمارات",
    url: `${SITE_URL}/blog`,
  };
}

export const Route = createFileRoute("/blog/")({
  validateSearch: blogSearchSchema,
  head: ({ match }) => {
    const search = match.search as { category?: BlogCategory; type?: string };
    const activeCategory = (search.category as BlogCategory) || "all";
    const guideFilter = search.type || "all";
    const seo = getSEOData(activeCategory, guideFilter);

    return {
      meta: [
        { title: seo.title },
        { name: "description", content: seo.description },
        { property: "og:title", content: seo.title },
        { property: "og:description", content: seo.description },
        { property: "og:url", content: seo.url },
        { property: "og:type", content: "website" },
        { property: "og:image", content: `${SITE_URL}/favicon-512.png` },
        { name: "twitter:title", content: seo.title },
        { name: "twitter:description", content: seo.description },
        { name: "twitter:image", content: `${SITE_URL}/favicon-512.png` },
      ],
      links: [{ rel: "canonical", href: seo.url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: seo.title,
            description: seo.description,
            url: seo.url,
            inLanguage: "ar",
            publisher: {
              "@type": "Organization",
              name: "ALRAAD ALTHAQEB",
              logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon-512.png` },
            },
            blogPost: posts.slice(0, 12).map((post) => ({
              "@type": "BlogPosting",
              headline: post.seoTitle || post.title,
              url: `${SITE_URL}/blog/${post.slug}`,
              description: post.metaDescription || post.excerpt,
              image: post.ogImage || `${SITE_URL}/images/${post.slug}.webp`,
              datePublished: post.datePublished,
              dateModified: post.dateModified || post.datePublished,
              author: { "@type": "Organization", name: "ALRAAD ALTHAQEB" },
            })),
          }),
        },
      ],
    };
  },
  component: BlogPage,
});

function BlogPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const activeCategory: BlogCategory = (search.category as BlogCategory) || "all";
  const guideFilter = (search.type as "all" | "article" | "tip") || "all";

  const filteredPosts = useMemo(() => {
    if (activeCategory === "all") return posts;
    return posts.filter((post) => {
      if (activeCategory !== "guides") return post.category === activeCategory;
      if (guideFilter === "all") return post.category === "guides";
      return post.category === "guides" && post.type === guideFilter;
    });
  }, [activeCategory, guideFilter]);

  const handleCategory = (category: BlogCategory) => {
    if (category === "all") {
      navigate({ search: {} as any });
    } else {
      navigate({ search: { category } as any });
    }
  };

  const handleGuideFilter = (type: "all" | "article" | "tip") => {
    if (type === "all") {
      navigate({ search: { category: "guides" } as any });
    } else {
      navigate({ search: { category: "guides", type } as any });
    }
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Hero */}
      <div className="relative pt-16 pb-24 bg-gradient-to-br from-[hsl(var(--primary-dark))] via-primary to-[hsl(var(--primary-light))] overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[hsl(var(--accent-dark))] rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[hsl(var(--gold))] rounded-full blur-[150px] translate-x-1/2 translate-y-1/2"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center pt-12">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
            مركز <span className="text-gradient">المعرفة</span> والوقود
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-3xl mx-auto">
            دليلك الشامل لأحدث تحليلات سوق الديزل والنصائح في الإمارات.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-16 -mt-12 relative z-20">
        {/* Tabs */}
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {(Object.keys(categoryLabels) as BlogCategory[]).map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => handleCategory(category)}
                className={`px-5 py-2.5 rounded-full font-bold transition shadow-sm ${
                  isActive
                    ? "bg-gold text-primary-dark scale-105"
                    : "bg-card border border-border hover:text-accent hover:border-accent"
                }`}
              >
                {categoryLabels[category]}
              </button>
            );
          })}
        </div>

        {/* Guides Filter */}
        {activeCategory === "guides" && (
          <div className="mb-8 flex justify-center gap-3">
            {[
              { key: "all", label: "الكل" },
              { key: "article", label: "مقالات" },
              { key: "tip", label: "نصائح" },
            ].map((item) => {
              const isActive = guideFilter === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => handleGuideFilter(item.key as "all" | "article" | "tip")}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition ${
                    isActive
                      ? "bg-primary text-white"
                      : "bg-secondary text-secondary-foreground hover:bg-primary hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <Link
              key={`${post.slug}-${post.id}`}
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className="group bg-card rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition flex flex-col border border-border"
            >
              <div className="flex justify-center pt-6">
                <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-accent/10 group-hover:ring-accent/30 transition">
                  <img
                    src={post.image}
                    alt={post.imageAlt || post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="text-center mt-3">
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full ${
                    post.type === "tip"
                      ? "bg-[hsl(var(--gold))] text-primary-dark"
                      : "bg-accent text-primary-dark"
                  }`}
                >
                  {post.type === "tip" ? "نصيحة" : "مقال"}
                </span>
              </div>

              <div className="p-6 flex flex-col flex-grow text-center">
                <h2 className="text-lg font-black text-foreground mb-3 group-hover:text-primary transition line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                <span className="mt-auto text-primary font-bold group-hover:text-accent transition">
                  اقرأ المزيد ←
                </span>
              </div>
            </Link>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-xl font-bold">لا يوجد محتوى هنا حالياً</h3>
          </div>
        )}
      </div>
    </div>
  );
}
