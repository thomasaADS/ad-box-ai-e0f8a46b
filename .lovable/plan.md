
# החלפת שם המוצר ל-A.R.I.A (אריה)

## סיכום
החלפת כל האזכורים של "AdSync" ו-"Boosti" בפרויקט לשם החדש **A.R.I.A** (עם הכיתוב בעברית "אריה" במקומות הרלוונטיים). בנוסף, תיקון שגיאות הבנייה בקובץ `agent-service.ts`.

## שינויים נדרשים

### 1. תיקון שגיאות בנייה - agent-service.ts
הקובץ `src/lib/agents/agent-service.ts` מנסה לגשת לטבלאות (`ai_agents`, `agent_runs`, `agent_memories`, `agent_with_prompt`) שלא קיימות במסד הנתונים. הפתרון: להחליף את הקריאות ל-Supabase בנתוני mock כמו שנעשה ב-`analytics.ts`.

### 2. קבצי תרגום ושפה (4 קבצים)
- `src/contexts/LanguageContext.tsx` - החלפת "AdSync" ל-"A.R.I.A" ו-"Boosti"/"בוסטי" ל-"A.R.I.A"/"אריה" בכל 4 השפות
- `src/translations/en.json` - החלפת כל אזכורי AdSync/Boosti
- `src/translations/ar.json` - החלפת כל אזכורי AdSync/ادسينك
- `src/translations/he.json` - אם קיימים אזכורים נוספים
- `src/translations/ru.json` - אם קיימים אזכורים נוספים

### 3. קומפוננטות ודפים (~20 קבצים)
החלפת "AdSync" ב-"A.R.I.A" בכל הקבצים הבאים:
- `src/components/Footer.tsx` - שם הלוגו, קישורי רשתות חברתיות, זכויות יוצרים
- `src/components/ChatWidget.tsx` - שם הבוט
- `src/components/landing/TestimonialsSection.tsx` - אזכורים בהמלצות
- `src/components/landing/HeroSection.tsx`
- `src/components/landing/FAQSection.tsx`
- `src/components/landing/FeaturesSection.tsx`
- `src/components/landing/StatsSection.tsx`
- `src/components/landing/CTASection.tsx`
- `src/components/landing/PricingSection.tsx`
- `src/components/Navbar.tsx` / `src/components/TopNav.tsx`
- `src/components/BeforeAfter.tsx`
- `src/pages/HomeAlt.tsx` - SEO, structured data, כותרות
- `src/pages/Index.tsx`
- `src/pages/About.tsx`
- `src/pages/Auth.tsx`
- `src/pages/services/FacebookAds.tsx`
- `src/pages/services/GoogleAds.tsx`
- `src/pages/services/TikTokAds.tsx`
- `src/pages/services/LandingPages.tsx`
- `src/pages/AIAgents.tsx`

### 4. קבצי API ותשתית
- `src/lib/api.ts` - החלפת אזכורי AdSync בתבניות הקמפיינים
- `src/lib/gemini.ts` - אם יש אזכורים ב-prompts

### 5. קבצי SEO וציבוריים
- `public/robots.txt` - החלפת `adsync.co.il` (אם רלוונטי)
- `public/sitemap.xml` - החלפת דומיין אם מופיע
- `index.html` - title ו-meta tags

### 6. קבצי README ותיעוד
- `README.md`, `README_ADSYNC.md`, `FEATURES_SUMMARY.md`, `FULL_SUMMARY.md` וכו'

## פרטים טכניים

### כלל ההחלפות:
| מקור | יעד |
|------|------|
| AdSync | A.R.I.A |
| Boosti | A.R.I.A |
| ادسينك | A.R.I.A |
| בוסטי | אריה |
| adsync.co.il | aria.co.il (או לשמור את הדומיין הישן) |

### תיקון agent-service.ts:
הקובץ ישוכתב כך שכל הפונקציות יחזירו נתוני mock במקום לפנות לטבלאות שלא קיימות, בדומה לפתרון שהוחל על `analytics.ts`.
