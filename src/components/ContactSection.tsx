import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  MessageCircle,
  Facebook,
  Linkedin,
  Instagram,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";

const ContactSection = () => {
  const { t } = useLanguage();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    quantity: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    if (!formData.name || !formData.phone) {
      toast({
        title: t("بيانات ناقصة", "Missing Fields"),
        description: t("الرجاء إدخال الاسم ورقم الهاتف", "Please enter name and phone number"),
      });
      return;
    }

    setLoading(true);

    const templateParams = {
      name: formData.name,
      company: formData.company || "Not provided",
      phone: formData.phone,
      email: formData.email || "Not provided",
      quantity: formData.quantity || "Not provided",
      message: formData.message || "Not provided",
    };

    try {
      await emailjs.send(
        "service_d8bj314",
        "template_iugigmp",
        templateParams,
        "9oDf7K1CgEjHTTxZS",
      );

      const whatsappMessage = `${t("طلب عرض سعر جديد", "New Quote Request")}

${t("الاسم", "Name")}: ${formData.name}
${t("الشركة", "Company")}: ${formData.company || t("غير متوفر", "Not provided")}
${t("الهاتف", "Phone")}: ${formData.phone}
${t("البريد الإلكتروني", "Email")}: ${formData.email || t("غير متوفر", "Not provided")}
${t("الكمية المطلوبة", "Required Quantity")}: ${formData.quantity || t("غير متوفر", "Not provided")}

${t("الرسالة", "Message")}:
${formData.message || t("لا توجد رسالة", "No message")}`;

      window.open(
        `https://wa.me/971555677114?text=${encodeURIComponent(whatsappMessage)}`,
        "_blank",
      );

      toast({
        title: t("تم الإرسال بنجاح", "Sent Successfully"),
        description: t("سيتم التواصل معكم قريباً", "We will contact you soon"),
      });

      setFormData({
        name: "",
        company: "",
        phone: "",
        email: "",
        quantity: "",
        message: "",
      });
    } catch (error) {
      toast({
        title: t("حدث خطأ", "Error"),
        description: t("فشل إرسال الرسالة", "Failed to send message"),
      });
    }

    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="section-container bg-muted">
      <div className="text-center mb-16 animate-fade-in-up">
        <h2 className="section-title text-center">
          {t(
            "اطلب توريد ديزل في الإمارات الآن بأسعار تنافسية",
            "Order Diesel Supply in UAE Now at Competitive Prices",
          )}
        </h2>
        <p className="section-subtitle mx-auto">
          {t(
            "تواصل معنا الآن للحصول على عرض سعر سريع وتوصيل فوري لموقعك",
            "Contact us now for a fast quote and immediate delivery to your location",
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* LEFT */}
        <div className="space-y-8 animate-slide-in-left">
          {/* WhatsApp */}
          <a
            href="https://wa.me/971555677114"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-gradient-to-b from-[#ffb347] to-[#ffcc33] text-[#1e293b] py-4 rounded-2xl font-bold text-lg shadow-md hover:scale-[1.02]"
          >
            <MessageCircle className="h-6 w-6" />
            {t("تواصل واتساب الآن", "Chat on WhatsApp Now")}
          </a>

          <div className="space-y-4">
            <a href="tel:+971555677114" className="flex items-start gap-4 p-4 bg-card rounded-lg">
              <Phone className="h-6 w-6 text-[#ffcc33]" />
              <div>
                <h4>{t("الهاتف", "Phone")}</h4>
                <p dir="ltr">+971 55 567 7114</p>
              </div>
            </a>

            <a
              href="mailto:alraad247@gmail.com"
              className="flex items-start gap-4 p-4 bg-card rounded-lg"
            >
              <Mail className="h-6 w-6 text-[#ffcc33]" />
              <div>
                <h4>{t("البريد الإلكتروني", "Email")}</h4>
                <p>alraad247@gmail.com</p>
              </div>
            </a>

            <div className="flex items-start gap-4 p-4 bg-card rounded-lg">
              <MapPin className="h-6 w-6 text-[#ffcc33]" />
              <div>
                <h4>{t("العنوان", "Address")}</h4>
                <p>أبو ظبي، منطقة المفرق الصناعية</p>
              </div>
            </div>

            <a
              href="https://www.facebook.com/alraad.diesel/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-card rounded-lg"
            >
              <Facebook className="h-6 w-6 text-[#ffcc33]" />
              <div>
                <h4>Facebook</h4>
                <p>alraad.diesel</p>
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/ahmed-alraad-209157401/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-card rounded-lg"
            >
              <Linkedin className="h-6 w-6 text-[#ffcc33]" />
              <div>
                <h4>LinkedIn</h4>
                <p>Ahmed Alraad</p>
              </div>
            </a>

            <a
              href="https://www.instagram.com/alraadalthaqeb/?hl=ar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-card rounded-lg"
            >
              <Instagram className="h-6 w-6 text-[#ffcc33]" />
              <div>
                <h4>Instagram</h4>
                <p>alraadalthaqeb</p>
              </div>
            </a>
          </div>
        </div>

        {/* RIGHT */}
        <div className="animate-slide-in-right space-y-6">
          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="bg-card rounded-2xl p-8 shadow-lg border border-white/5 space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t("اسمك", "Your Name")}
                required
              />
              <Input
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder={t("اسم الشركة", "Company Name")}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+971 5X XXX XXXX"
                required
              />
              <Input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
              />
            </div>

            <Input
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder={t("مثال: 5000 لتر شهرياً", "e.g., 5000 liters monthly")}
            />

            <Textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              placeholder={t("اكتب تفاصيل طلبك...", "Write your request details...")}
            />

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-b from-[#ffb347] to-[#ffcc33] text-[#1e293b] font-bold py-6 rounded-2xl"
            >
              <Send className="h-5 w-5" />
              {loading
                ? t("جاري الإرسال...", "Sending...")
                : t("اطلب عرض السعر الآن", "Get a Quote Now")}
            </Button>
          </form>

          {/* MAP رجعت 🔥 */}
          <div className="bg-card rounded-2xl p-4 shadow-lg border border-white/5">
            <iframe
              title="map"
              src="https://maps.google.com/maps?q=24.2884045,54.57407&z=16&output=embed"
              width="100%"
              height="320"
              style={{ border: 0 }}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
