declare module "@/data/blogData" {
  export interface BlogPost {
    id: number;
    slug: string;
    title: string;
    seoTitle: string;
    date: string;
    datePublished: string;
    dateModified: string;
    metaDescription: string;
    keywords: string;
    ogImage: string;
    excerpt: string;
    imageAlt: string;
    image: string;
    category: "supply" | "prices" | "construction" | "guides" | "emergency";
    type: "article" | "tip";
    content: string;
  }

  export const posts: BlogPost[];
}
