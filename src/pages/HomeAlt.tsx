import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ChatWidget } from '@/components/ChatWidget';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { SEOHead } from '@/components/SEOHead';
import { useEffect, useRef, useState } from 'react';
import {
  Sparkles,
  Zap,
  Target,
  TrendingUp,
  Globe,
  BarChart3,
  CheckCircle,
  Star,
  MessageSquare,
  Layout,
  Shield,
  Play,
  ChevronDown,
  Award,
  Check,
  ArrowLeft,
  Eye,
  Bot,
  Search,
  Link2,
  Layers,
} from 'lucide-react';

/* ─── hooks ─── */

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, isVisible };
}

function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting && !started) setStarted(true); },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let cur = 0;
    const inc = target / (duration / 16);
    const id = setInterval(() => {
      cur += inc;
      if (cur >= target) { setCount(target); clearInterval(id); }
      else setCount(Math.floor(cur));
    }, 16);
    return () => clearInterval(id);
  }, [started, target, duration]);

  return { count, ref };
}

function useTextRotator(words: string[], interval = 3000) {
  const [idx, setIdx] = useState(0);
  const [animating, setAnimating] = useState(false);
  useEffect(() => {
    const timer = setInterval(() => {
      setAnimating(true);
      setTimeout(() => { setIdx(p => (p + 1) % words.length); setAnimating(false); }, 500);
    }, interval);
    return () => clearInterval(timer);
  }, [words.length, interval]);
  return { currentWord: words[idx], isAnimating: animating };
}

/* ─── data ─── */

const heroWords = [
  'מודעות AI מנצחות',
  'דפי נחיתה ממירים',
  'וידאו פרסומי מקצועי',
  'קמפיינים אוטומטיים',
  'ציון ביצועים חכם',
];

const platforms = [
  { name: 'Meta', icon: '📘' },
  { name: 'Google', icon: '🔍' },
  { name: 'TikTok', icon: '🎵' },
  { name: 'LinkedIn', icon: '💼' },
  { name: 'Taboola', icon: '📰' },
  { name: 'Outbrain', icon: '🌐' },
  { name: 'Email', icon: '📧' },
  { name: 'SMS', icon: '💬' },
];

const kpis = [
  { label: 'מהיר יותר', value: '30X', sub: 'יצירת קמפיין מול עבודה ידנית', icon: Zap, color: 'from-purple-600 to-blue-600' },
  { label: 'זול יותר', value: '6X', sub: 'בהשוואה לסוכנות פרסום', icon: TrendingUp, color: 'from-blue-600 to-cyan-500' },
  { label: 'ROAS ממוצע', value: '10.8X', sub: 'החזר על השקעה בפרסום', icon: Target, color: 'from-cyan-500 to-teal-500' },
  { label: 'קמפיינים נוצרו', value: '50K+', sub: 'על ידי 3,200+ עסקים', icon: BarChart3, color: 'from-teal-500 to-green-500' },
];

const productFlow = [
  {
    step: '01',
    tag: 'ייבוא מהיר',
    title: 'הכנס כתובת אתר — וה-AI עושה את השאר',
    desc: 'פשוט הדבק את ה-URL של העסק שלך. המערכת סורקת את האתר, מבינה את המותג, מזהה צבעים, לוגו ותוכן — ומכינה הכל בשנייה.',
    icon: Link2,
    mockUI: 'url-scan',
    gradient: 'from-purple-600 to-blue-600',
  },
  {
    step: '02',
    tag: 'יצירת קריאייטיב',
    title: 'עשרות מודעות מקצועיות — בלחיצת כפתור',
    desc: 'ה-AI יוצר באנרים, וידאו, טקסטים ופוסטים מותאמים לכל פלטפורמה. כל הווריאציות ממוטבות לשוק הישראלי ולקהל היעד שלך.',
    icon: Sparkles,
    mockUI: 'creatives',
    gradient: 'from-blue-600 to-cyan-500',
  },
  {
    step: '03',
    tag: 'ציון ביצועים',
    title: 'ציון AI חכם — לדעת מה יעבוד לפני שמוציאים שקל',
    desc: 'כל קריאייטיב מקבל ציון ביצועים מבוסס מיליארדי דאטה פוינטים. תדע בדיוק איזו מודעה תביא את התוצאות הטובות ביותר.',
    icon: Eye,
    mockUI: 'score',
    gradient: 'from-cyan-500 to-teal-500',
  },
  {
    step: '04',
    tag: 'דפי נחיתה',
    title: 'דף נחיתה ממיר — נבנה אוטומטית לכל קמפיין',
    desc: 'סוכן AI שבונה דפי נחיתה מקצועיים עם תוכן, תמונות ו-CTA מותאמים. מותאם למובייל ולדסקטופ, מוכן לפרסום.',
    icon: Layout,
    mockUI: 'landing',
    gradient: 'from-teal-500 to-green-500',
  },
];

const testimonials = [
  { name: 'דנה לוי', role: 'VP Marketing', company: 'FreshMarket', text: 'עברנו מסוכנות פרסום שעלתה ₪15,000 בחודש ל-AdSync. התוצאות השתפרו פי 3 והחיסכון הוא מטורף.', rating: 5, metric: '+340% ROI', avatar: 'ד' },
  { name: 'רון כהן', role: 'מייסד ומנכ"ל', company: 'TechFlow', text: 'ב-4 דקות קיבלתי 20 וריאציות של מודעות שהיו לוקחות למעצב שבוע. המערכת פשוט מבינה מה עובד.', rating: 5, metric: '85% חיסכון בזמן', avatar: 'ר' },
  { name: 'מיכל אברהם', role: 'מנהלת שיווק', company: 'StyleHome', text: 'כל הקמפיינים שלנו עוברים דרך AdSync. הציון החכם של AI חסך לנו אלפי שקלים בתקציב מבוזבז.', rating: 5, metric: '-60% עלות לליד', avatar: 'מ' },
  { name: 'יואב שלום', role: 'בעל עסק', company: 'YS Consulting', text: 'בתור עסק קטן, לא היה לי תקציב לסוכנות. AdSync נתן לי כלים ברמה של סוכנות גדולה במחיר של קפה ביום.', rating: 5, metric: 'x12 יותר לידים', avatar: 'י' },
];

const pricingPlans = [
  {
    name: 'סטרטר',
    price: '₪99',
    originalPrice: '₪149',
    period: 'לחודש',
    save: 'חסכון 33%',
    description: 'מושלם לעסקים קטנים שרוצים להתחיל עם AI',
    features: ['10 קמפיינים בחודש', '3 פלטפורמות פרסום', 'ציון ביצועים בסיסי', 'תמיכה במייל', 'אנליטיקס בסיסי'],
    popular: false,
    cta: 'התחל ניסיון חינם',
  },
  {
    name: 'פרו',
    price: '₪349',
    originalPrice: '₪499',
    period: 'לחודש',
    save: 'חסכון 30%',
    description: 'לעסקים שרוצים למקסם תוצאות',
    features: ['קמפיינים ללא הגבלה', 'כל הפלטפורמות', 'ציון ביצועים מתקדם', 'דפי נחיתה AI', 'וידאו AI', 'סוכני AI מתקדמים', 'תמיכה 24/7', 'A/B Testing מתקדם'],
    popular: true,
    cta: 'התחל ניסיון חינם',
  },
  {
    name: 'אנטרפרייז',
    price: 'מותאם',
    period: 'מחיר אישי',
    description: 'לארגונים עם צרכים מורכבים',
    features: ['הכל מ-Pro', 'מנהל חשבון ייעודי', 'API מלא', 'הכשרות צוות', 'SLA מובטח', 'אופטימיזציה ידנית + AI', 'דוחות מותאמים'],
    popular: false,
    cta: 'דבר איתנו',
  },
];

const faqData = [
  { q: 'האם צריך ניסיון בפרסום כדי להשתמש ב-AdSync?', a: 'בכלל לא! AdSync נבנה כדי שכל אחד יוכל ליצור קמפיינים מקצועיים. ה-AI עושה את כל העבודה הקשה — מהקופי ועד העיצוב, אתה רק צריך לספר על העסק שלך.' },
  { q: 'איך AdSync שונה מסוכנות פרסום רגילה?', a: 'AdSync מספק תוצאות מהירות פי 30 בעלות נמוכה פי 6. עשרות וריאציות של מודעות תוך שניות, ציון ביצועים AI שמנבא הצלחה, ואופטימיזציה 24/7.' },
  { q: 'לאילו פלטפורמות AdSync תומך?', a: 'אנחנו תומכים בכל הפלטפורמות המובילות: Meta (פייסבוק ואינסטגרם), Google Ads, TikTok, LinkedIn, Taboola, Outbrain, וגם Email ו-SMS marketing.' },
  { q: 'מה כולל הניסיון החינמי?', a: 'הניסיון החינמי ל-7 ימים כולל גישה מלאה לכל היכולות של תוכנית ה-Pro — קמפיינים ללא הגבלה, כל הפלטפורמות, ציון ביצועים, דפי נחיתה AI ועוד. ללא כרטיס אשראי.' },
  { q: 'האם הקמפיינים מותאמים לשוק הישראלי?', a: 'בהחלט. AdSync אומן ספציפית על נתוני השוק הישראלי — טקסטים בעברית טבעית, עיצוב מותאם, והמערכת מבינה את ההעדפות והטרנדים של הצרכן הישראלי.' },
  { q: 'אפשר לבטל בכל עת?', a: 'כמובן. אין התחייבות כלל. ביטול בלחיצת כפתור, בלי שאלות ובלי עמלות.' },
];

/* ─── Mock UI Components for Product Flow ─── */

function MockURLScan() {
  return (
    <div className="rounded-2xl border border-border/60 bg-card shadow-xl p-5 sm:p-6 space-y-4">
      <div className="flex items-center gap-3 rounded-xl bg-muted/50 px-4 py-3 border border-border/40">
        <Search className="w-4 h-4 text-muted-foreground shrink-0" />
        <span className="text-sm text-muted-foreground">https://example.co.il</span>
        <Button size="sm" className="mr-auto rounded-lg text-xs px-3" style={{ background: 'linear-gradient(135deg,#7c3aed,#2563eb)', color: '#fff' }}>סרוק</Button>
      </div>
      <div className="grid grid-cols-3 gap-2.5">
        {['לוגו', 'צבעים', 'תוכן'].map((l, i) => (
          <div key={i} className="rounded-lg bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 p-3 text-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 mx-auto mb-1.5 flex items-center justify-center">
              <Check className="w-4 h-4 text-white" />
            </div>
            <span className="text-[11px] font-medium text-muted-foreground">{l}</span>
          </div>
        ))}
      </div>
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <div className="h-full w-[85%] rounded-full bg-gradient-to-r from-purple-600 to-blue-500 animate-pulse" />
      </div>
    </div>
  );
}

function MockCreatives() {
  return (
    <div className="rounded-2xl border border-border/60 bg-card shadow-xl p-5 sm:p-6">
      <div className="grid grid-cols-2 gap-3 mb-3">
        {[
          { label: 'באנר פייסבוק', color: 'from-blue-500 to-purple-500' },
          { label: 'סטורי אינסטגרם', color: 'from-pink-500 to-orange-500' },
          { label: 'באנר Google', color: 'from-green-500 to-teal-500' },
          { label: 'וידאו TikTok', color: 'from-gray-800 to-pink-600' },
        ].map((c, i) => (
          <div key={i} className={`rounded-xl bg-gradient-to-br ${c.color} p-3 sm:p-4 text-white aspect-[4/3] flex flex-col justify-end`}>
            <span className="text-[10px] sm:text-xs font-bold opacity-90">{c.label}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="font-medium">24 וריאציות נוצרו</span>
        <Badge className="text-[10px] bg-green-500/10 text-green-600 border-green-500/20">מוכן</Badge>
      </div>
    </div>
  );
}

function MockScore() {
  return (
    <div className="rounded-2xl border border-border/60 bg-card shadow-xl p-5 sm:p-6 space-y-4">
      <div className="flex items-center justify-center">
        <div className="relative w-28 h-28 sm:w-32 sm:h-32">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted/20" />
            <circle cx="50" cy="50" r="42" fill="none" stroke="url(#scoreGrad)" strokeWidth="8" strokeLinecap="round" strokeDasharray="264" strokeDashoffset="40" />
            <defs><linearGradient id="scoreGrad"><stop offset="0%" stopColor="#7c3aed" /><stop offset="100%" stopColor="#06b6d4" /></linearGradient></defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent">92</span>
            <span className="text-[10px] text-muted-foreground">ציון ביצועים</span>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        {[{ l: 'רלוונטיות קהל', p: 95 }, { l: 'איכות קופי', p: 88 }, { l: 'עיצוב ויזואלי', p: 91 }].map((m, i) => (
          <div key={i}>
            <div className="flex justify-between text-xs mb-1"><span className="text-muted-foreground">{m.l}</span><span className="font-bold">{m.p}%</span></div>
            <div className="h-1.5 rounded-full bg-muted overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-purple-600 to-cyan-500" style={{ width: `${m.p}%` }} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MockLanding() {
  return (
    <div className="rounded-2xl border border-border/60 bg-card shadow-xl p-5 sm:p-6 space-y-3">
      <div className="rounded-xl bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-950/30 dark:to-blue-950/30 p-4 space-y-3">
        <div className="h-3 w-24 rounded bg-purple-300/50 dark:bg-purple-700/50" />
        <div className="h-2 w-full rounded bg-muted/50" />
        <div className="h-2 w-4/5 rounded bg-muted/50" />
        <div className="h-8 w-28 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600" />
      </div>
      <div className="grid grid-cols-2 gap-2.5 text-center">
        <div className="rounded-lg bg-muted/30 p-2.5">
          <div className="text-sm font-bold text-green-600">+47%</div>
          <div className="text-[10px] text-muted-foreground">שיעור המרה</div>
        </div>
        <div className="rounded-lg bg-muted/30 p-2.5">
          <div className="text-sm font-bold text-blue-600">3.2s</div>
          <div className="text-[10px] text-muted-foreground">זמן טעינה</div>
        </div>
      </div>
    </div>
  );
}

const mockComponents: Record<string, () => JSX.Element> = {
  'url-scan': MockURLScan,
  'creatives': MockCreatives,
  'score': MockScore,
  'landing': MockLanding,
};

/* ─── Main Component ─── */

const HomeAlt = () => {
  const navigate = useNavigate();
  const heroRotator = useTextRotator(heroWords, 3000);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Section reveals
  const trustReveal = useScrollReveal();
  const kpiReveal = useScrollReveal();
  const testimonialsReveal = useScrollReveal();
  const pricingReveal = useScrollReveal();
  const faqReveal = useScrollReveal();
  const ctaReveal = useScrollReveal();
  const flowReveals = productFlow.map(() => useScrollReveal());

  // KPI counters (simplified for the big numbers)
  const kpiCount1 = useCountUp(30);
  const kpiCount2 = useCountUp(6);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'AdSync - פלטפורמת AI ליצירת קמפיינים פרסומיים',
    description: 'צור קמפיינים מקצועיים עם AI תוך דקות',
    url: 'https://adsync.co.il',
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="AdSync - מנוע AI ליצירת פרסום מקצועי | קמפיינים, מודעות ודפי נחיתה"
        description="צור מודעות, קמפיינים ודפי נחיתה מקצועיים עם AI תוך דקות. עד 14x יותר המרות. Meta, Google, TikTok ועוד. התחל חינם!"
        keywords="AI פרסום, קמפיינים פרסומיים, יצירת מודעות, דפי נחיתה, שיווק דיגיטלי, פרסום פייסבוק, פרסום גוגל, AdSync"
        canonicalUrl="/"
        structuredData={structuredData}
      />

      <Navbar />

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="relative pt-24 sm:pt-32 lg:pt-40 pb-20 sm:pb-28 lg:pb-36 px-4 overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-50/80 via-blue-50/40 to-transparent dark:from-purple-950/20 dark:via-blue-950/10 dark:to-transparent" />
        {/* Decorative blurred orbs */}
        <div className="absolute top-20 right-[15%] w-[350px] h-[350px] bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-[100px]" />
        <div className="absolute top-40 left-[10%] w-[300px] h-[300px] bg-blue-400/15 dark:bg-blue-600/8 rounded-full blur-[80px]" />

        <div className="container mx-auto max-w-5xl relative z-10 text-center">
          {/* Trust Badge */}
          <div className="inline-block mb-6 animate-fade-in">
            <Badge
              variant="secondary"
              className="text-sm font-medium px-5 py-2.5 rounded-full border border-purple-200 dark:border-purple-800 bg-white/80 dark:bg-white/5 backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4 ml-2 text-purple-500" />
              3,200+ עסקים ישראליים כבר משתמשים
            </Badge>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] mb-6 animate-fade-in">
            מנוע ה-AI שלך ליצירת
            <br />
            <span className="inline-block h-[1.15em] overflow-hidden relative" style={{ perspective: '500px' }}>
              <span
                key={heroRotator.currentWord}
                className={`inline-block hero-gradient-text ${heroRotator.isAnimating ? 'text-rotator-exit' : 'text-rotator-enter'}`}
              >
                {heroRotator.currentWord}
              </span>
            </span>
          </h1>

          {/* Sub */}
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '0.15s' }}>
            קבל עד <span className="font-bold text-foreground">14x יותר המרות</span>. בלי מעצבים. בלי ניחושים.
            <br className="hidden sm:block" />
            הכנס את ה-URL שלך — וקבל קמפיין מוכן לפרסום תוך דקות.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <Button
              size="lg"
              onClick={() => navigate('/brief')}
              className="text-lg px-10 py-7 rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all group relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: '#fff' }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative z-10 flex items-center gap-3">
                <Sparkles className="w-5 h-5" />
                התחל בחינם עכשיו
                <ArrowLeft className="w-5 h-5 group-hover:translate-x-[-4px] transition-transform" />
              </span>
            </Button>
            <Button
              size="lg"
              onClick={() => navigate('/how-it-works')}
              variant="outline"
              className="text-base px-8 py-7 rounded-2xl font-semibold hover:scale-105 transition-all group"
            >
              <Play className="w-5 h-5 ml-1" />
              ראה איך זה עובד
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground animate-slide-up" style={{ animationDelay: '0.45s' }}>
            {['7 ימי ניסיון חינם', 'ללא כרטיס אשראי', 'ביטול בכל עת'].map((t, i) => (
              <span key={i} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ TRUSTED BY / PLATFORMS ═══════════════════ */}
      <section ref={trustReveal.ref} className={`py-14 px-4 border-y border-border/40 bg-muted/20 section-reveal ${trustReveal.isVisible ? 'is-visible' : ''}`}>
        <div className="container mx-auto max-w-5xl">
          <p className="text-center text-sm text-muted-foreground mb-8 font-medium tracking-wide">
            יוצרים קמפיינים לכל הפלטפורמות המובילות
          </p>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-4 sm:gap-6">
            {platforms.map((p) => (
              <div key={p.name} className="flex flex-col items-center gap-2 group cursor-default">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-card border border-border/50 flex items-center justify-center shadow-sm group-hover:shadow-lg group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300">
                  <span className="text-xl">{p.icon}</span>
                </div>
                <span className="text-[11px] font-medium text-muted-foreground group-hover:text-foreground transition-colors">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ KPI METRICS ═══════════════════ */}
      <section ref={kpiReveal.ref} className={`py-20 sm:py-28 px-4 section-reveal ${kpiReveal.isVisible ? 'is-visible' : ''}`}>
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <Badge variant="secondary" className="mb-5 text-sm px-4 py-1.5 rounded-full">
              <TrendingUp className="w-3.5 h-3.5 ml-1.5" />
              ביצועים
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-5">
              מספרים שמדברים <span className="hero-gradient-text">בעד עצמם</span>
            </h2>
          </div>

          <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-5 stagger-reveal ${kpiReveal.isVisible ? 'is-visible' : ''}`}>
            {kpis.map((kpi, i) => {
              const Icon = kpi.icon;
              return (
                <Card key={i} className="p-6 sm:p-7 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group border border-border/50 hover:border-primary/20">
                  <div className={`w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${kpi.color} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div ref={i === 0 ? kpiCount1.ref : i === 1 ? kpiCount2.ref : undefined} className="text-4xl sm:text-5xl font-extrabold mb-1 hero-gradient-text">{kpi.value}</div>
                  <div className="text-base font-bold mb-1">{kpi.label}</div>
                  <div className="text-xs text-muted-foreground">{kpi.sub}</div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════ PRODUCT FLOW - Step by Step ═══════════════════ */}
      {productFlow.map((item, index) => {
        const reveal = flowReveals[index];
        const Icon = item.icon;
        const MockComponent = mockComponents[item.mockUI];
        const isEven = index % 2 === 0;

        return (
          <section
            key={index}
            ref={reveal.ref}
            className={`py-16 sm:py-24 px-4 ${index % 2 === 1 ? 'bg-muted/20' : ''} section-reveal ${reveal.isVisible ? 'is-visible' : ''}`}
          >
            <div className="container mx-auto max-w-6xl">
              <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-10 lg:gap-16`}>
                {/* Text side */}
                <div className="flex-1 text-center lg:text-right">
                  <Badge variant="secondary" className="mb-4 text-xs px-3 py-1 rounded-full inline-flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 text-white text-[10px] font-bold flex items-center justify-center">{item.step}</span>
                    {item.tag}
                  </Badge>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-5 leading-tight">
                    {item.title}
                  </h2>
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-7 max-w-xl mx-auto lg:mx-0">
                    {item.desc}
                  </p>
                  <Button
                    onClick={() => navigate('/brief')}
                    className="rounded-xl font-bold shadow-md hover:shadow-lg hover:scale-105 transition-all group"
                    style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: '#fff' }}
                  >
                    <span className="flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      נסה עכשיו
                      <ArrowLeft className="w-4 h-4 group-hover:translate-x-[-4px] transition-transform" />
                    </span>
                  </Button>
                </div>

                {/* Mock UI side */}
                <div className="flex-1 w-full max-w-md lg:max-w-none">
                  <MockComponent />
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* ═══════════════════ TESTIMONIALS MARQUEE ═══════════════════ */}
      <section ref={testimonialsReveal.ref} className={`py-20 sm:py-28 px-4 bg-gradient-to-b from-muted/30 to-background section-reveal ${testimonialsReveal.isVisible ? 'is-visible' : ''}`}>
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <Badge variant="secondary" className="mb-5 text-sm px-4 py-1.5 rounded-full">
              <Star className="w-3.5 h-3.5 ml-1.5 fill-yellow-400 text-yellow-400" />
              מה אומרים עלינו
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-5">
              <span className="hero-gradient-text">אלפי עסקים</span> כבר סומכים עלינו
            </h2>
          </div>

          {/* Auto-scrolling marquee columns */}
          <div className="marquee-container h-[500px] sm:h-[550px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 h-full">
              {/* Column 1 */}
              <div className="marquee-column marquee-up" style={{ '--marquee-duration': '22s' } as React.CSSProperties}>
                {[...testimonials, ...testimonials].map((t, i) => (
                  <Card key={`c1-${i}`} className="p-5 hover:shadow-lg transition-all duration-300 border border-border/50 shrink-0">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className="bg-green-500/10 text-green-600 border-green-500/20 text-[11px] font-bold px-2 py-0.5">{t.metric}</Badge>
                      <div className="flex gap-0.5 mr-auto">{[...Array(t.rating)].map((_, j) => <Star key={j} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}</div>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-xs font-bold">{t.avatar}</div>
                      <div>
                        <div className="font-bold text-sm">{t.name}</div>
                        <div className="text-xs text-muted-foreground">{t.role} | {t.company}</div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              {/* Column 2 */}
              <div className="marquee-column marquee-down hidden sm:flex" style={{ '--marquee-duration': '28s' } as React.CSSProperties}>
                {[...testimonials.slice(2), ...testimonials.slice(0, 2), ...testimonials.slice(2), ...testimonials.slice(0, 2)].map((t, i) => (
                  <Card key={`c2-${i}`} className="p-5 hover:shadow-lg transition-all duration-300 border border-border/50 shrink-0">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className="bg-green-500/10 text-green-600 border-green-500/20 text-[11px] font-bold px-2 py-0.5">{t.metric}</Badge>
                      <div className="flex gap-0.5 mr-auto">{[...Array(t.rating)].map((_, j) => <Star key={j} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}</div>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-xs font-bold">{t.avatar}</div>
                      <div>
                        <div className="font-bold text-sm">{t.name}</div>
                        <div className="text-xs text-muted-foreground">{t.role} | {t.company}</div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              {/* Column 3 */}
              <div className="marquee-column marquee-up hidden lg:flex" style={{ '--marquee-duration': '25s' } as React.CSSProperties}>
                {[...testimonials.slice(1), ...testimonials.slice(0, 1), ...testimonials.slice(1), ...testimonials.slice(0, 1)].map((t, i) => (
                  <Card key={`c3-${i}`} className="p-5 hover:shadow-lg transition-all duration-300 border border-border/50 shrink-0">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className="bg-green-500/10 text-green-600 border-green-500/20 text-[11px] font-bold px-2 py-0.5">{t.metric}</Badge>
                      <div className="flex gap-0.5 mr-auto">{[...Array(t.rating)].map((_, j) => <Star key={j} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}</div>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-xs font-bold">{t.avatar}</div>
                      <div>
                        <div className="font-bold text-sm">{t.name}</div>
                        <div className="text-xs text-muted-foreground">{t.role} | {t.company}</div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mt-12 pt-8 border-t border-border/50">
            {[
              { icon: Award, label: 'דירוג 4.9/5', color: 'text-yellow-500' },
              { icon: Shield, label: 'אבטחת מידע מלאה', color: 'text-green-500' },
              { icon: Globe, label: 'מותאם לשוק הישראלי', color: 'text-blue-500' },
              { icon: Zap, label: '50,000+ קמפיינים', color: 'text-purple-500' },
            ].map((b, i) => {
              const BIcon = b.icon;
              return (
                <div key={i} className="flex items-center gap-2">
                  <BIcon className={`w-5 h-5 ${b.color}`} />
                  <span className="text-sm font-medium text-muted-foreground">{b.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════ PRICING ═══════════════════ */}
      <section ref={pricingReveal.ref} className={`py-20 sm:py-28 px-4 section-reveal ${pricingReveal.isVisible ? 'is-visible' : ''}`}>
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <Badge variant="secondary" className="mb-5 text-sm px-4 py-1.5 rounded-full">
              <Layers className="w-3.5 h-3.5 ml-1.5" />
              תמחור
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-5">
              תמחור <span className="hero-gradient-text">פשוט ושקוף</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              7 ימי ניסיון חינם לכל התוכניות. ללא התחייבות.
            </p>
          </div>

          <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 stagger-reveal ${pricingReveal.isVisible ? 'is-visible' : ''}`}>
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`p-7 sm:p-9 relative hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 ${
                  plan.popular
                    ? 'border-2 border-primary shadow-xl ring-4 ring-primary/10 scale-[1.02]'
                    : 'border border-border/50'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="shadow-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 text-sm px-4 py-1.5 rounded-full">
                      <Sparkles className="w-3 h-3 ml-1" />
                      הכי פופולרי
                    </Badge>
                  </div>
                )}
                {plan.save && (
                  <Badge className="absolute top-4 left-4 bg-green-500/10 text-green-600 border-green-500/20 text-[11px]">{plan.save}</Badge>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-5">{plan.description}</p>
                <div className="mb-6">
                  {plan.originalPrice && <span className="text-lg text-muted-foreground line-through ml-2">{plan.originalPrice}</span>}
                  <span className="text-4xl sm:text-5xl font-extrabold hero-gradient-text">{plan.price}</span>
                  <span className="text-muted-foreground text-sm mr-2"> {plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-[15px]">{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full py-6 text-base font-bold rounded-xl group relative overflow-hidden`}
                  variant={plan.popular ? 'default' : 'outline'}
                  onClick={() => navigate('/brief')}
                  style={plan.popular ? { background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: '#fff' } : {}}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative z-10 flex items-center gap-2">
                    {plan.cta}
                    <ArrowLeft className="w-4 h-4 group-hover:translate-x-[-4px] transition-transform" />
                  </span>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ FAQ ═══════════════════ */}
      <section ref={faqReveal.ref} className={`py-20 sm:py-28 px-4 bg-muted/20 section-reveal ${faqReveal.isVisible ? 'is-visible' : ''}`}>
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-14">
            <Badge variant="secondary" className="mb-5 text-sm px-4 py-1.5 rounded-full">
              <MessageSquare className="w-3.5 h-3.5 ml-1.5" />
              שאלות נפוצות
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-5">
              יש <span className="hero-gradient-text">שאלות?</span>
            </h2>
          </div>

          <div className="space-y-3">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className={`rounded-xl border transition-all duration-300 bg-card ${
                  openFaq === index ? 'border-primary/30 shadow-lg' : 'border-border/50 hover:border-border'
                }`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-right"
                >
                  <span className="font-bold text-[15px] sm:text-base pr-2">{faq.q}</span>
                  <div className={`w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-4 h-4 text-primary" />
                  </div>
                </button>
                <div className={`accordion-content ${openFaq === index ? 'is-open' : ''}`}>
                  <div>
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
                      <p className="text-muted-foreground text-sm sm:text-[15px] leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-muted-foreground text-sm mb-3">עדיין יש שאלות?</p>
            <Button variant="outline" onClick={() => navigate('/ai-agents')} className="rounded-xl group">
              <Bot className="w-4 h-4 ml-2" />
              שאל את סוכן ה-AI שלנו
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:translate-x-[-4px] transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* ═══════════════════ FINAL CTA ═══════════════════ */}
      <section ref={ctaReveal.ref} className={`py-24 sm:py-32 px-4 relative overflow-hidden section-reveal ${ctaReveal.isVisible ? 'is-visible' : ''}`}>
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500" />
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }} />

        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <div className="mb-8">
            <span className="text-6xl sm:text-7xl inline-block animate-bounce-in">🚀</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-white leading-tight">
            מוכנים לשדרג את
            <br />
            הפרסום שלכם?
          </h2>
          <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            הצטרפו ל-3,200+ עסקים ישראליים שכבר יוצרים קמפיינים מנצחים עם AI.
            התחילו בחינם ותראו תוצאות מהיום הראשון.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate('/brief')}
              className="text-lg px-12 py-7 rounded-2xl shadow-2xl hover:scale-105 transition-all font-bold group relative overflow-hidden bg-white text-purple-700 hover:bg-white/95"
            >
              <span className="relative z-10 flex items-center gap-3">
                <Sparkles className="w-5 h-5" />
                יצירת קמפיין חינם
                <ArrowLeft className="w-5 h-5 group-hover:translate-x-[-4px] transition-transform" />
              </span>
            </Button>
            <Button
              size="lg"
              onClick={() => navigate('/landing-page-builder')}
              className="text-lg px-10 py-7 rounded-2xl font-semibold border-2 border-white/30 bg-white/10 text-white hover:bg-white/20 hover:scale-105 transition-all group"
            >
              <Layout className="w-5 h-5 ml-1" />
              בנה דף נחיתה
            </Button>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-white/70">
            {['7 ימי ניסיון חינם', 'ללא כרטיס אשראי', 'תוצאות תוך 4 דקות'].map((t, i) => (
              <span key={i} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-white/80" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* Floating Chat Widget */}
      <ChatWidget />
    </div>
  );
};

export default HomeAlt;
