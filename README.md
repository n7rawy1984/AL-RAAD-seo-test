# Al-Raad Al-Thaqeb — موقع توريد الديزل (نسخة محسّنة للـ SEO)

موقع الرعد الثاقب — TanStack Start مع SSR كامل، جاهز للنشر على Vercel.

## النشر على Vercel

1. ارفع المجلد ده على GitHub (يحل محل المستودع القديم).
2. Vercel هيلتقط التغيير تلقائياً ويبني المشروع.
3. الإطار يُكتشف ذاتياً (`framework: "tanstack-start"` في `vercel.json`).
4. متغير البيئة `NITRO_PRESET=vercel` مضبوط مسبقاً.

> لو حابب تنشئ المشروع لأول مرة:
> - في Vercel → New Project → استورد المستودع.
> - اختر إطار: TanStack Start.
> - Build Command: `npm run build` — Output: تلقائي (`.vercel/output`).

## التشغيل محلياً

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # بناء إنتاج
```

## إعادة الفهرسة في Google

بعد النشر:
1. ادخل Google Search Console → Sitemaps.
2. أرسل: `https://www.alraad-althaqeb.com/sitemap.xml` (موجود في `public/sitemap.xml`).
3. اطلب فحص الصفحات الأساسية يدوياً (URL Inspection → Request Indexing).

## التحويلات (301 Redirects)

كل التحويلات القديمة من `vercel.json` السابق محفوظة، فمافيش روابط هتكسر:
- `/blog/best-diesel-delivery-dubai` → `/blog/diesel-supply-dubai-24-7`
- `/blog/diesel-supply-construction-dubai` → `/blog/diesel-supply-for-construction-sites-dubai`
- `/blog/emergency-diesel-supply-dubai-24-7` → `/blog/emergency-diesel-delivery-dubai-24-7`
- `/blog/diesel-price-dubai-uae` → `/blog/diesel-price-uae-today`
- `/blog/diesel-price-per-gallon-uae-today` → `/blog/diesel-price-uae-today`

## مقارنة الـ sitemap

تم التحقق من جميع روابط `https://www.alraad-althaqeb.com/sitemap.xml` (16 رابط) — كلها موجودة في `public/sitemap.xml` الجديد، بالإضافة لـ ~50 مقالة جديدة و قسم `/en/blog` للإنجليزية.
