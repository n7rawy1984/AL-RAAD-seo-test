import { MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const FloatingWhatsApp = () => {
  const { t } = useLanguage();

  return (
    <a
      href="https://wa.me/971555677114"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("تواصل عبر واتساب", "Contact via WhatsApp")}
      className="fixed bottom-6 right-4 md:right-6 z-50 flex items-center gap-2 group"
    >
      <div className="relative bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-xl transition transform hover:scale-105">
        <MessageCircle className="text-xl h-5 w-5" />
        <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-30"></span>
      </div>
      <div className="bg-white text-[#0f172a] px-3 md:px-4 py-2 rounded-full shadow-lg font-bold text-xs md:text-sm whitespace-nowrap">
        {t("احصل على عرض سعر الآن", "Get Instant Diesel Quote")}
      </div>
    </a>
  );
};

export default FloatingWhatsApp;
