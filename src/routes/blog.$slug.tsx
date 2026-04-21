import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { posts } from "@/data/blogData";
import { MessageCircle, ArrowRight, Clock, Fuel, ChevronLeft } from "lucide-react";

const SITE_URL = "https://www.alraad-althaqeb.com";

function stripHtml(html: string = "") {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function calculateReadingTime(content: string = "") {
  const words = stripHtml(content).split(" ").filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} ${minutes === 1 ? "دقيقة قراءة" : "دقائق قراءة"}`;
}

function buildMetaDescription(post: { metaDescription?: string; excerpt?: string; content?: string }) {
  if (post.metaDescription && post.metaDescription.trim() !== "") return post.metaDescription;
  const plainText = stripHtml(post.content || "");
  const baseText = post.excerpt && post.excerpt.length > 50 ? post.excerpt : plainText.substring(0, 150);
  return `${baseText.substring(0, 155)}... | الرعد الثاقب`;
}

function getCategoryLabel(post: { type?: string; category: string }) {
  if (post.type === "tip") return "نصيحة ذهبية";
  const labels: Record<string, string> = {
    supply: "توريد الديزل",
    prices: "أسعار الديزل",
    construction: "المقاولات والمعدات",
    guides: "دليل ومعلومات",
    emergency: "خدمات الطوارئ",
  };
  return labels[post.category] || "مقال فني";
}

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = posts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData?.post) return { meta: [] };
    const post = loaderData.post;
    const seoDescription = buildMetaDescription(post);
    const url = `${SITE_URL}/blog/${post.slug}`;
    const image = post.ogImage || `${SITE_URL}/images/${post.slug}.webp`;

    return {
      meta: [
        { title: post.seoTitle || `${post.title} | الرعد الثاقب` },
        { name: "description", content: seoDescription },
        { name: "keywords", content: post.keywords || "" },
        { property: "og:type", content: "article" },
        { property: "og:title", content: post.seoTitle || post.title },
        { property: "og:description", content: seoDescription },
        { property: "og:url", content: url },
        { property: "og:image", content: image },
        { property: "article:published_time", content: post.datePublished },
        { property: "article:modified_time", content: post.dateModified || post.datePublished },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: post.seoTitle || post.title },
        { name: "twitter:description", content: seoDescription },
        { name: "twitter:image", content: image },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.seoTitle || post.title,
            description: seoDescription,
            image: [image],
            inLanguage: "ar",
            author: { "@type": "Organization", name: "ALRAAD ALTHAQEB" },
            publisher: {
              "@type": "Organization",
              name: "ALRAAD ALTHAQEB",
              logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon-512.png` },
            },
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
            datePublished: post.datePublished,
            dateModified: post.dateModified || post.datePublished,
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 pt-16" dir="rtl">
      <div className="text-center bg-card border border-border rounded-3xl p-10 shadow-xl max-w-xl w-full">
        <h2 className="text-3xl font-black text-primary mb-4">المقال غير موجود</h2>
        <p className="text-muted-foreground mb-6">يبدو أن الرابط غير صحيح أو أن المقال تم نقله.</p>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 bg-[hsl(var(--gold))] text-primary-dark px-6 py-3 rounded-full font-black hover:scale-105 transition"
        >
          <ArrowRight className="h-4 w-4" />
          العودة للمدونة
        </Link>
      </div>
    </div>
  ),
  component: BlogPostPage,
});

function BlogPostPage() {
  const { post } = Route.useLoaderData();
  const [imgError, setImgError] = useState(false);

  const readingTime = useMemo(() => calculateReadingTime(post.content || ""), [post]);

  const relatedNavigationPosts = posts.filter(
    (p) => p.category === post.category && (p.type || "article") === (post.type || "article"),
  );
  const currentIndex = relatedNavigationPosts.findIndex((p) => p.slug === post.slug);
  const prevPost = currentIndex > 0 ? relatedNavigationPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < relatedNavigationPosts.length - 1
      ? relatedNavigationPosts[currentIndex + 1]
      : null;

  const relatedPosts = useMemo(() => {
    const sameCategory = posts.filter(
      (p) => p.slug !== post.slug && p.category === post.category && p.type === post.type,
    );
    const sameType = posts.filter(
      (p) => p.slug !== post.slug && p.type === post.type && p.category !== post.category,
    );
    const fallback = posts.filter((p) => p.slug !== post.slug);
    const merged = [...sameCategory, ...sameType, ...fallback];
    const unique = merged.filter(
      (item, index, self) => index === self.findIndex((p) => p.slug === item.slug),
    );
    return unique.slice(0, 3);
  }, [post]);

  const imageSrc = imgError ? post.ogImage : post.image;

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Hero */}
      <div className="pt-16 pb-48 bg-gradient-to-br from-[hsl(var(--primary-dark))] via-[#1e293b] to-[hsl(var(--primary-dark))] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[hsl(var(--accent-dark))] rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[hsl(var(--gold))] rounded-full blur-[150px] translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center pt-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[hsl(var(--gold))]/10 border border-[hsl(var(--gold))]/20 text-[hsl(var(--gold))] text-sm font-black mb-6">
            <Fuel className="h-4 w-4" />
            <span>{getCategoryLabel(post)}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6">
            {post.title}
          </h1>

          <div className="flex items-center justify-center gap-4 md:gap-6 text-white/70 flex-wrap">
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-[hsl(var(--gold))]" />
              {post.date}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--gold))]"></span>
            <span className="text-[hsl(var(--gold))] font-bold">{readingTime}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--gold))]"></span>
            <span className="text-white/80 font-bold">
              {post.type === "tip" ? "محتوى سريع ومفيد" : "مقال احترافي"}
            </span>
          </div>
        </div>
      </div>

      {/* Main Card */}
      <div className="max-w-4xl mx-auto px-4 -mt-32 pb-20 relative z-20">
        <div className="bg-card rounded-3xl shadow-2xl overflow-hidden border border-border">
          <div className="flex justify-center my-8">
            <div className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden shadow-xl border-4 border-card">
              <img
                src={imageSrc}
                alt={post.imageAlt || post.title}
                className="w-full h-full object-cover object-center"
                loading="eager"
                decoding="async"
                onError={() => {
                  if (!imgError) setImgError(true);
                }}
              />
            </div>
          </div>

          <div className="p-8 md:p-16">
            {post.excerpt && (
              <div className="mb-10 rounded-2xl border border-[hsl(var(--gold))]/20 bg-[hsl(var(--gold))]/5 p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-black text-primary mb-3">ملخص سريع</h2>
                <p className="text-muted-foreground leading-8 text-base md:text-lg">{post.excerpt}</p>
              </div>
            )}

            <div className="prose-blog max-w-none" dangerouslySetInnerHTML={{ __html: post.content || "" }} />

            {/* CTA */}
            <div className="mt-16 bg-[hsl(var(--primary-dark))] rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent"></div>
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-right">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2 text-[hsl(var(--gold))]">
                    جاهز لتزويد منشأتك بالديزل؟
                  </h3>
                  <p className="text-white/80">
                    أفضل جودة ديزل في الإمارات تصلك أينما كنت وبأسرع استجابة.
                  </p>
                </div>
                <a
                  href="https://wa.me/971544099266?text=مرحبًا، أريد عرض سعر لتوريد الديزل"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[hsl(var(--gold))] hover:bg-white text-primary-dark px-8 py-4 rounded-full font-black text-base md:text-lg transition-all transform hover:scale-105 shadow-xl flex items-center gap-3"
                >
                  <MessageCircle className="h-5 w-5" />
                  احصل على أفضل سعر الآن
                </a>
              </div>
            </div>

            {/* Related posts */}
            {relatedPosts.length > 0 && (
              <div className="mt-16">
                <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black text-primary mb-2">
                      مقالات مرتبطة
                    </h3>
                    <p className="text-muted-foreground">
                      اقرأ أيضًا موضوعات قريبة من هذا المقال لزيادة الفائدة.
                    </p>
                  </div>
                  <Link to="/blog" className="inline-flex items-center gap-2 text-primary font-black hover:text-accent transition">
                    عرض كل المقالات
                    <ChevronLeft className="h-4 w-4" />
                  </Link>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                  {relatedPosts.map((related) => (
                    <Link
                      key={`${related.slug}-${related.id}`}
                      to="/blog/$slug"
                      params={{ slug: related.slug }}
                      className="group bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col"
                    >
                      <div className="p-6 flex flex-col h-full">
                        <div className="mb-4">
                          <span
                            className={`inline-flex px-3 py-1 rounded-full text-[11px] font-black ${
                              related.type === "tip"
                                ? "bg-[hsl(var(--gold))] text-primary-dark"
                                : "bg-accent text-primary-dark"
                            }`}
                          >
                            {related.type === "tip" ? "نصيحة" : getCategoryLabel(related)}
                          </span>
                        </div>
                        <h4 className="text-lg font-black text-foreground mb-3 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                          {related.title}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-7 line-clamp-3 mb-5">
                          {related.excerpt}
                        </p>
                        <div className="mt-auto flex items-center justify-between pt-4 border-t border-border">
                          <span className="text-primary font-black text-sm">اقرأ المقال</span>
                          <div className="w-9 h-9 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                            <ChevronLeft className="h-4 w-4" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Prev/Next */}
            {(prevPost || nextPost) && (
              <div className="mt-16 pt-8 border-t border-border grid md:grid-cols-2 gap-6">
                {prevPost && (
                  <Link
                    to="/blog/$slug"
                    params={{ slug: prevPost.slug }}
                    className="group bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition"
                  >
                    <span className="text-sm text-muted-foreground block mb-2">→ المقال السابق</span>
                    <h4 className="font-bold text-lg group-hover:text-primary transition">
                      {prevPost.title}
                    </h4>
                  </Link>
                )}
                {nextPost && (
                  <Link
                    to="/blog/$slug"
                    params={{ slug: nextPost.slug }}
                    className="group bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition"
                  >
                    <span className="text-sm text-muted-foreground block mb-2">المقال التالي ←</span>
                    <h4 className="font-bold text-lg group-hover:text-primary transition">
                      {nextPost.title}
                    </h4>
                  </Link>
                )}
              </div>
            )}

            {/* Bottom navigation */}
            <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link to="/blog" className="inline-flex items-center gap-2 text-primary font-black hover:text-accent transition">
                <ArrowRight className="h-4 w-4" />
                العودة إلى كل المقالات
              </Link>
              <a
                href="https://wa.me/971544099266?text=مرحبًا، أريد الاستفسار عن توريد الديزل"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-black transition-all"
              >
                <MessageCircle className="h-5 w-5" />
                تواصل واتساب الآن
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
