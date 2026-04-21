declare module "@/data/blogDataEn" {
  export interface BlogPostEn {
    id: number;
    slug: string;
    imageSlug?: string;
    title: string;
    seoTitle: string;
    date: string;
    datePublished: string;
    dateModified: string;
    metaDescription: string;
    keywords: string;
    excerpt: string;
    imageAlt: string;
    image: string;
    ogImage: string;
    category: "supply" | "prices" | "construction" | "guides" | "emergency";
    type: "article" | "tip";
    content: string;
  }
  export const postsEn: BlogPostEn[];
}
