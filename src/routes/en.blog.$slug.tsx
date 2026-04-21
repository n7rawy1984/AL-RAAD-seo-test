import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { postsEn } from "@/data/blogDataEn";
import { MessageCircle, ArrowLeft, Clock, Fuel } from "lucide-react";

const SITE_URL = "https://www.alraad-althaqeb.com";

function stripHtml(html = "") {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function readingTime(content = "") {
  const words = stripHtml(content).split(" ").filter(Boolean).length;
  const m = Math.max(1, Math.ceil(words / 200));
  return `${m} min read`;
}

export const Route = createFileRoute("/en/blog/$slug")({
  loader: ({ params }) => {
    const post = postsEn.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData?.post) return { meta: [] };
    const post = loaderData.post;
    const url = `${SITE_URL}/en/blog/${post.slug}`;
    return {
      meta: [
        { title: post.seoTitle },
        { name: "description", content: post.metaDescription },
        { name: "keywords", content: post.keywords },
        { property: "og:type", content: "article" },
        { property: "og:title", content: post.seoTitle },
        { property: "og:description", content: post.metaDescription },
        { property: "og:url", content: url },
        { property: "og:image", content: post.ogImage },
        { property: "article:published_time", content: post.datePublished },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: post.seoTitle },
        { name: "twitter:description", content: post.metaDescription },
        { name: "twitter:image", content: post.ogImage },
      ],
      links: [
        { rel: "canonical", href: url },
        { rel: "alternate", hrefLang: "en", href: url },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.seoTitle,
            description: post.metaDescription,
            image: [post.ogImage],
            inLanguage: "en",
            author: { "@type": "Organization", name: "ALRAAD ALTHAQEB" },
            publisher: {
              "@type": "Organization",
              name: "ALRAAD ALTHAQEB",
              logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon-512.png` },
            },
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
            datePublished: post.datePublished,
            dateModified: post.dateModified,
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 pt-16">
      <div className="text-center bg-card border border-border rounded-3xl p-10 shadow-xl max-w-xl w-full">
        <h2 className="text-3xl font-black text-primary mb-4">Article Not Found</h2>
        <Link
          to="/en/blog"
          className="inline-flex items-center gap-2 bg-[hsl(var(--gold))] text-primary-dark px-6 py-3 rounded-full font-black hover:scale-105 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>
      </div>
    </div>
  ),
  component: PostEn,
});

function PostEn() {
  const { post } = Route.useLoaderData();
  const [imgError, setImgError] = useState(false);
  const time = useMemo(() => readingTime(post.content), [post]);
  const related = postsEn.filter((p) => p.slug !== post.slug).slice(0, 3);
  const imageSrc = imgError ? post.ogImage : post.image;

  return (
    <div className="min-h-screen bg-background" dir="ltr">
      <div className="pt-16 pb-48 bg-gradient-to-br from-[hsl(var(--primary-dark))] via-[#1e293b] to-[hsl(var(--primary-dark))] relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center pt-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[hsl(var(--gold))]/10 border border-[hsl(var(--gold))]/20 text-[hsl(var(--gold))] text-sm font-black mb-6">
            <Fuel className="h-4 w-4" />
            <span>{post.type === "tip" ? "Quick Tip" : "Article"}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6">
            {post.title}
          </h1>
          <div className="flex items-center justify-center gap-4 text-white/70 flex-wrap">
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-[hsl(var(--gold))]" /> {post.date}
            </span>
            <span className="text-[hsl(var(--gold))] font-bold">{time}</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-32 pb-20 relative z-20">
        <div className="bg-card rounded-3xl shadow-2xl overflow-hidden border border-border">
          <div className="flex justify-center my-8">
            <div className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden shadow-xl border-4 border-card">
              <img
                src={imageSrc}
                alt={post.imageAlt}
                className="w-full h-full object-cover"
                onError={() => !imgError && setImgError(true)}
              />
            </div>
          </div>
          <div className="p-8 md:p-16">
            <div className="mb-10 rounded-2xl border border-[hsl(var(--gold))]/20 bg-[hsl(var(--gold))]/5 p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-black text-primary mb-3">Quick Summary</h2>
              <p className="text-muted-foreground leading-8 text-base md:text-lg">{post.excerpt}</p>
            </div>
            <div
              className="prose-blog max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            <div className="mt-16 bg-[hsl(var(--primary-dark))] rounded-3xl p-8 md:p-12 text-white">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2 text-[hsl(var(--gold))]">
                    Need Diesel Supply in the UAE?
                  </h3>
                  <p className="text-white/80">Premium 10ppm diesel delivered 24/7 across the Emirates.</p>
                </div>
                <a
                  href="https://wa.me/971544099266?text=Hi, I would like a diesel supply quote"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[hsl(var(--gold))] hover:bg-white text-primary-dark px-8 py-4 rounded-full font-black transition-all hover:scale-105 shadow-xl flex items-center gap-3"
                >
                  <MessageCircle className="h-5 w-5" /> Get a Quote
                </a>
              </div>
            </div>

            {related.length > 0 && (
              <div className="mt-16">
                <h3 className="text-2xl md:text-3xl font-black text-primary mb-8">Related Articles</h3>
                <div className="grid gap-6 md:grid-cols-3">
                  {related.map((r) => (
                    <Link
                      key={r.id}
                      to="/en/blog/$slug"
                      params={{ slug: r.slug }}
                      className="bg-card border border-border rounded-2xl p-6 hover:shadow-xl transition"
                    >
                      <h4 className="text-lg font-black mb-2 line-clamp-2">{r.title}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-2">{r.excerpt}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-12 pt-8 border-t border-border flex justify-between items-center">
              <Link to="/en/blog" className="text-primary font-black hover:text-accent transition">
                <ArrowLeft className="inline h-4 w-4 mr-2" />
                All Articles
              </Link>
              <Link to="/blog" className="text-primary font-black hover:text-accent transition">
                النسخة العربية ←
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
