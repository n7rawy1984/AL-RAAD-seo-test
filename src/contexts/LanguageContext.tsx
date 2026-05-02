import { createContext, useContext, useEffect, ReactNode } from "react";
import { useRouter, useRouterState } from "@tanstack/react-router";

type Language = "ar" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (ar: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/**
 * خريطة المسارات بين العربية والإنجليزية.
 * أضِف هنا أي مسار جديد له نسختان (عربية/إنجليزية).
 */
const ROUTE_MAP: Array<{ ar: string; en: string }> = [
  { ar: "/", en: "/en" },
  { ar: "/team", en: "/en/team" },
  { ar: "/blog", en: "/en/blog" },
];

/**
 * يحدد اللغة الحالية بناءً على المسار:
 * أي مسار يبدأ بـ /en أو /en/ يُعتبر إنجليزياً.
 */
const getLanguageFromPath = (pathname: string): Language => {
  if (pathname === "/en" || pathname.startsWith("/en/")) return "en";
  return "ar";
};

/**
 * يُرجع المسار المقابل في اللغة الأخرى.
 * - إذا كان المسار له خريطة صريحة في ROUTE_MAP يستخدمها.
 * - وإلا: يضيف/يحذف بادئة /en تلقائياً.
 * - مسارات المقالات الديناميكية (blog/$slug) تُعالَج تلقائياً عبر البادئة.
 */
const getEquivalentPath = (pathname: string, target: Language): string => {
  // ابحث عن تطابق مباشر
  for (const route of ROUTE_MAP) {
    if (target === "en" && pathname === route.ar) return route.en;
    if (target === "ar" && pathname === route.en) return route.ar;
  }

  // ابحث عن تطابق بـ prefix (للمسارات الفرعية مثل /blog/some-slug)
  for (const route of ROUTE_MAP) {
    if (target === "en" && pathname.startsWith(route.ar + "/")) {
      return route.en + pathname.slice(route.ar.length);
    }
    if (target === "ar" && pathname.startsWith(route.en + "/")) {
      return route.ar + pathname.slice(route.en.length);
    }
  }

  // fallback عام
  if (target === "en") {
    return pathname.startsWith("/en") ? pathname : `/en${pathname === "/" ? "" : pathname}`;
  } else {
    return pathname.startsWith("/en")
      ? pathname.replace(/^\/en/, "") || "/"
      : pathname;
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // اللغة مشتقّة من المسار — مصدر حقيقة واحد، لا state منفصل.
  const language: Language = getLanguageFromPath(pathname);

  // ضبط dir و lang على <html> لتحسين الـ SEO وإمكانية الوصول
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  /**
   * تغيير اللغة = الانتقال إلى المسار المقابل.
   * هذا يضمن أن المحتوى المرتبط بالمسار (فريق العمل، المقالات...) يتغيّر فعلاً.
   */
  const setLanguage = (lang: Language) => {
    if (lang === language) return;
    const target = getEquivalentPath(pathname, lang);
    router.navigate({ to: target });
  };

  const t = (ar: string, en: string) => (language === "ar" ? ar : en);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div dir={language === "ar" ? "rtl" : "ltr"} className="min-h-screen">
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};
