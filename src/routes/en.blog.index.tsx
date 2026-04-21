import { createFileRoute, Link } from "@tanstack/react-router";
import { postsEn } from "@/data/blogDataEn";

const SITE_URL = "https://www.alraad-althaqeb.com";

export const Route = createFileRoute("/en/blog/")({
  head: () => {
    const title = "Diesel Blog UAE | ALRAAD ALTHAQEB Diesel Trading";
    const description =
      "Expert articles on diesel supply, prices, generators, fleet management and fuel quality in Dubai and the UAE.";
    const url = `${SITE_URL}/en/blog`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
        { property: "og:image", content: `${SITE_URL}/favicon-512.png` },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
      links: [
        { rel: "canonical", href: url },
        { rel: "alternate", hrefLang: "ar", href: `${SITE_URL}/blog` },
        { rel: "alternate", hrefLang: "en", href: url },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: title,
            description,
            url,
            inLanguage: "en",
            publisher: {
              "@type": "Organization",
              name: "ALRAAD ALTHAQEB",
              logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon-512.png` },
            },
            blogPost: postsEn.map((post) => ({
              "@type": "BlogPosting",
              headline: post.seoTitle,
              url: `${SITE_URL}/en/blog/${post.slug}`,
              description: post.metaDescription,
              image: post.ogImage,
              datePublished: post.datePublished,
              dateModified: post.dateModified,
              inLanguage: "en",
              author: { "@type": "Organization", name: "ALRAAD ALTHAQEB" },
            })),
          }),
        },
      ],
    };
  },
  component: BlogEnPage,
});

function BlogEnPage() {
  return (
    <div className="min-h-screen bg-background" dir="ltr">
      <div className="relative pt-16 pb-24 bg-gradient-to-br from-[hsl(var(--primary-dark))] via-primary to-[hsl(var(--primary-light))] overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center pt-12">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
            Diesel <span className="text-gradient">Knowledge Hub</span>
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-3xl mx-auto">
            Expert insights on diesel supply, prices, fleet management and fuel quality across the UAE.
          </p>
          <div className="mt-6">
            <Link
              to="/blog"
              className="inline-block px-5 py-2.5 rounded-full bg-[hsl(var(--gold))] text-primary-dark font-black hover:scale-105 transition"
            >
              النسخة العربية ←
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 -mt-12 relative z-20">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {postsEn.map((post) => (
            <Link
              key={post.id}
              to="/en/blog/$slug"
              params={{ slug: post.slug }}
              className="group bg-card rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition flex flex-col border border-border"
            >
              <div className="flex justify-center pt-6">
                <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-accent/10 group-hover:ring-accent/30 transition">
                  <img
                    src={post.image}
                    alt={post.imageAlt}
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
                  {post.type === "tip" ? "Tip" : "Article"}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-grow text-center">
                <h2 className="text-lg font-black text-foreground mb-3 group-hover:text-primary transition line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                <span className="mt-auto text-primary font-bold group-hover:text-accent transition">
                  Read more →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
