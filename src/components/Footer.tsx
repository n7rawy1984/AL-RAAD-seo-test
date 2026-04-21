import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRouter, useRouterState } from "@tanstack/react-router";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";

const FooterComponent = () => {
  const router = useRouter();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const handleClick = (id: string, isPage: boolean) => {
    if (isPage) {
      router.navigate({ to: "/blog" });
      return;
    }
    if (pathname !== "/") {
      router.navigate({ to: "/" });
      setTimeout(() => {
        if (typeof document === "undefined") return;
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 200);
    } else {
      if (typeof document === "undefined") return;
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold text-accent mb-4">
              {t("الرعد الثاقب", "ALRAAD ALTHAQEB")}
            </h3>
            <p className="text-primary-foreground/80 mb-4 leading-relaxed">
              {t(
                "شريكك الموثوق في توريد الديزل عالي الجودة في دولة الإمارات",
                "Your trusted partner for high-quality diesel supply in the UAE",
              )}
            </p>
            <div className="flex gap-3">
              <a href="https://www.facebook.com/alraad.diesel/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-full bg-accent/20 hover:bg-accent flex items-center justify-center transition-all duration-300 hover:scale-110">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Twitter" className="w-10 h-10 rounded-full bg-accent/20 hover:bg-accent flex items-center justify-center transition-all duration-300 hover:scale-110">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/in/ahmed-alraad-209157401/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-accent/20 hover:bg-accent flex items-center justify-center transition-all duration-300 hover:scale-110">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-accent/20 hover:bg-accent flex items-center justify-center transition-all duration-300 hover:scale-110">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">
              {t("روابط سريعة", "Quick Links")}
            </h4>
            <ul className="space-y-2">
              {[
                { id: "home", label: t("الرئيسية", "Home"), isPage: false },
                { id: "about", label: t("من نحن", "About"), isPage: false },
                { id: "services", label: t("خدماتنا", "Services"), isPage: false },
                { id: "sectors", label: t("القطاعات", "Sectors"), isPage: false },
                { id: "blog", label: t("المدونة", "Blog"), isPage: true },
                { id: "contact", label: t("تواصل معنا", "Contact"), isPage: false },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleClick(link.id, link.isPage)}
                    className="text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">
              {t("خدماتنا", "Our Services")}
            </h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>{t("التوريد المباشر للمواقع", "Direct Site Delivery")}</li>
              <li>{t("تعبئة خزانات الشركات", "Company Tank Filling")}</li>
              <li>{t("إمداد أساطيل النقل", "Fleet Supply")}</li>
              <li>{t("عقود التوريد المرنة", "Flexible Contracts")}</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">
              {t("اتصل بنا", "Contact Us")}
            </h4>
            <div className="space-y-3">
              <a href="tel:+971555677114" className="flex items-start gap-2 text-primary-foreground/80 hover:text-accent transition-colors">
                <Phone className="h-5 w-5 mt-1 flex-shrink-0" />
                <span dir="ltr">+971 55 567 7114</span>
              </a>
              <a href="mailto:alraad247@gmail.com" className="flex items-start gap-2 text-primary-foreground/80 hover:text-accent transition-colors">
                <Mail className="h-5 w-5 mt-1 flex-shrink-0" />
                <span>alraad247@gmail.com</span>
              </a>
              <div className="flex items-start gap-2 text-primary-foreground/80">
                <MapPin className="h-5 w-5 mt-1 flex-shrink-0" />
                <span>
                  {t(
                    "أبوظبي، منطقة المفرق الصناعية، الإمارات",
                    "Abu Dhabi, Mafraq Industrial Area, UAE",
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-6 grid md:grid-cols-2 gap-4">
          <div className="text-sm text-primary-foreground/70">
            <p>{t("رخصة تجارية رقم", "Trade License No.")}: 1376123</p>
            <p>{t("عضوية غرفة دبي", "Dubai Chamber Membership")}: 373631</p>
          </div>
          <div className="text-center md:text-end text-sm text-primary-foreground/70">
            <p>
              © {currentYear}{" "}
              {t(
                "الرعد الثاقب لتجارة الديزل ش.ذ.م.م - جميع الحقوق محفوظة",
                "ALRAAD ALTHAQEB Diesel Fuel Trading L.L.C - All Rights Reserved",
              )}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(FooterComponent);
