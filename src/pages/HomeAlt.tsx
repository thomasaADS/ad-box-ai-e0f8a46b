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
  Shield,
  Play,
  ChevronDown,
  Award,
  Check,
  ArrowLeft,
  Bot,
  Layers,
  Mail,
  MessageCircle,
} from 'lucide-react';

/* ─── Platform SVG Logos ─── */

function MetaLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#1877F2">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

function GoogleLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

function TikTokLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46V13a8.28 8.28 0 005.58 2.15V11.7a4.83 4.83 0 01-3.77-1.24V6.69h3.77z" fill="#000000" />
    </svg>
  );
}

function LinkedInLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#0A66C2">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function TaboolaLogo() {
  return (
    <div className="w-6 h-6 flex items-center justify-center">
      <span className="text-[11px] font-extrabold tracking-tight" style={{ color: '#0050FF' }}>T</span>
      <span className="text-[11px] font-extrabold tracking-tight" style={{ color: '#FF5722' }}>b</span>
    </div>
  );
}

function OutbrainLogo() {
  return (
    <div className="w-6 h-6 flex items-center justify-center">
      <span className="text-xs font-extrabold" style={{ color: '#F57C00' }}>OB</span>
    </div>
  );
}

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
  'וידאו פרסומי מקצועי',
  'קמפיינים אוטומטיים',
  'ציון ביצועים חכם',
  'קריאייטיב ממיר',
];

const platforms = [
  { name: 'Meta', Logo: MetaLogo },
  { name: 'Google', Logo: GoogleLogo },
  { name: 'TikTok', Logo: TikTokLogo },
  { name: 'LinkedIn', Logo: LinkedInLogo },
  { name: 'Taboola', Logo: TaboolaLogo },
  { name: 'Outbrain', Logo: OutbrainLogo },
  { name: 'Email', Logo: () => <Mail className="w-5 h-5 text-purple-600" /> },
  { name: 'SMS', Logo: () => <MessageCircle className="w-5 h-5 text-green-600" /> },
];

const kpis = [
  { label: 'מהיר יותר', value: '30X', sub: 'יצירת קמפיין מול עבודה ידנית', icon: Zap, color: 'from-purple-600 to-blue-600' },
  { label: 'זול יותר', value: '6X', sub: 'בהשוואה לסוכנות פרסום', icon: TrendingUp, color: 'from-blue-600 to-cyan-500' },
  { label: 'ROAS ממוצע', value: '10.8X', sub: 'החזר על השקעה בפרסום', icon: Target, color: 'from-cyan-500 to-teal-500' },
  { label: 'קמפיינים נוצרו', value: '50K+', sub: 'על ידי 3,200+ עסקים', icon: BarChart3, color: 'from-teal-500 to-green-500' },
];

const testimonials = [
  { name: 'דנה לוי', role: 'VP Marketing', company: 'FreshMarket', text: 'עברנו מסוכנות פרסום שעלתה 15,000 בחודש ל-AdSync. התוצאות השתפרו פי 3 והחיסכון הוא מטורף.', rating: 5, metric: '+340% ROI', avatar: 'ד' },
  { name: 'רון כהן', role: 'מייסד ומנכ"ל', company: 'TechFlow', text: 'ב-4 דקות קיבלתי 20 וריאציות של מודעות שהיו לוקחות למעצב שבוע. המערכת פשוט מבינה מה עובד.', rating: 5, metric: '85% חיסכון בזמן', avatar: 'ר' },
  { name: 'מיכל אברהם', role: 'מנהלת שיווק', company: 'StyleHome', text: 'כל הקמפיינים שלנו עוברים דרך AdSync. הציון החכם של AI חסך לנו אלפי שקלים בתקציב מבוזבז.', rating: 5, metric: '-60% עלות לליד', avatar: 'מ' },
  { name: 'יואב שלום', role: 'בעל עסק', company: 'YS Consulting', text: 'בתור עסק קטן, לא היה לי תקציב לסוכנות. AdSync נתן לי כלים ברמה של סוכנות גדולה במחיר של קפה ביום.', rating: 5, metric: 'x12 יותר לידים', avatar: 'י' },
];

const pricingPlans = [
  {
    name: 'סטרטר',
    price: '99',
    originalPrice: '149',
    period: 'לחודש',
    save: 'חסכון 33%',
    description: 'מושלם לעסקים קטנים שרוצים להתחיל עם AI',
    features: ['10 קמפיינים בחודש', '3 פלטפורמות פרסום', 'ציון ביצועים בסיסי', 'תמיכה במייל', 'אנליטיקס בסיסי'],
    popular: false,
    cta: 'התחל ניסיון חינם',
  },
  {
    name: 'פרו',
    price: '349',
    originalPrice: '499',
    period: 'לחודש',
    save: 'חסכון 30%',
    description: 'לעסקים שרוצים למקסם תוצאות',
    features: ['קמפיינים ללא הגבלה', 'כל הפלטפורמות', 'ציון ביצועים מתקדם', 'וידאו AI', 'סוכני AI מתקדמים', 'תמיכה 24/7', 'A/B Testing מתקדם'],
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
  { q: 'האם צריך ניסיון בפרסום כדי להשתמש ב-AdSync?', a: 'בכלל לא. AdSync נבנה כדי שכל אחד יוכל ליצור קמפיינים מקצועיים. ה-AI עושה את כל העבודה הקשה - מהקופי ועד העיצוב, אתה רק צריך לספר על העסק שלך.' },
  { q: 'איך AdSync שונה מסוכנות פרסום רגילה?', a: 'AdSync מספק תוצאות מהירות פי 30 בעלות נמוכה פי 6. עשרות וריאציות של מודעות תוך שניות, ציון ביצועים AI שמנבא הצלחה, ואופטימיזציה 24/7.' },
  { q: 'לאילו פלטפורמות AdSync תומך?', a: 'אנחנו תומכים בכל הפלטפורמות המובילות: Meta (פייסבוק ואינסטגרם), Google Ads, TikTok, LinkedIn, Taboola, Outbrain, וגם Email ו-SMS marketing.' },
  { q: 'מה כולל הניסיון החינמי?', a: 'הניסיון החינמי ל-7 ימים כולל גישה מלאה לכל היכולות של תוכנית ה-Pro - קמפיינים ללא הגבלה, כל הפלטפורמות, ציון ביצועים ועוד. ללא כרטיס אשראי.' },
  { q: 'האם הקמפיינים מותאמים לשוק הישראלי?', a: 'בהחלט. AdSync אומן ספציפית על נתוני השוק הישראלי - טקסטים בעברית טבעית, עיצוב מותאם, והמערכת מבינה את ההעדפות והטרנדים של הצרכן הישראלי.' },
  { q: 'אפשר לבטל בכל עת?', a: 'כמובן. אין התחייבות כלל. ביטול בלחיצת כפתור, בלי שאלות ובלי עמלות.' },
];

/* ─── Lexi-style Product Showcase Mockups ─── */

function CampaignDashboardMock() {
  const campaigns = [
    { name: 'קמפיין קיץ - מבצעים', status: 'ACTIVE', statusColor: 'bg-green-500', impressions: '83.5K', ctr: '4.26%', budget: '2,500/יום', platform: 'Meta' },
    { name: 'השקת מוצר חדש', status: 'EXCELLENT', statusColor: 'bg-purple-500', impressions: '124.2K', ctr: '5.81%', budget: '4,000/יום', platform: 'Google' },
    { name: 'רימרקטינג - עגלות נטושות', status: 'ACTIVE', statusColor: 'bg-green-500', impressions: '45.8K', ctr: '7.12%', budget: '1,200/יום', platform: 'Meta' },
  ];

  return (
    <div className="relative">
      {/* Main dashboard card */}
      <div className="rounded-2xl border border-border/60 bg-card shadow-2xl p-4 sm:p-5 space-y-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-bold">ניהול קמפיינים</span>
          <Badge className="bg-green-500/10 text-green-600 border-green-500/20 text-[10px]">3 פעילים</Badge>
        </div>
        {campaigns.map((c, i) => (
          <div key={i} className="rounded-xl border border-border/40 bg-muted/20 p-3 hover:bg-muted/40 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold">{c.name}</span>
              <span className={`text-[9px] font-bold text-white px-2 py-0.5 rounded-full ${c.statusColor}`}>{c.status}</span>
            </div>
            <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
              <span>Impressions <strong className="text-foreground">{c.impressions}</strong></span>
              <span>CTR <strong className="text-foreground">{c.ctr}</strong></span>
              <span className="mr-auto text-[10px]">{c.platform}</span>
            </div>
          </div>
        ))}
      </div>
      {/* Floating performance card */}
      <div className="absolute -bottom-4 -left-4 sm:-left-8 rounded-xl border border-border/60 bg-card shadow-xl p-3 w-40">
        <div className="text-[10px] text-muted-foreground mb-1">ביצועים כוללים</div>
        <div className="text-xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">+247%</div>
        <div className="text-[10px] text-green-600 font-medium">ROI השבוע</div>
      </div>
    </div>
  );
}

function CreativeShowcaseMock() {
  const ads = [
    { title: 'מבצע קיץ - 30% הנחה', desc: 'קולקציית הקיץ החדשה כבר כאן', score: 94, platform: 'Facebook', size: '1080x1080' },
    { title: 'השקת הקולקציה החדשה', desc: 'עיצובים בלעדיים במהדורה מוגבלת', score: 87, platform: 'Instagram Story', size: '1080x1920' },
    { title: 'משלוח חינם מעל 200', desc: 'הזמינו עכשיו וקבלו משלוח חינם', score: 91, platform: 'Google Display', size: '300x250' },
  ];

  return (
    <div className="space-y-3">
      {ads.map((ad, i) => (
        <div key={i} className="rounded-xl border border-border/60 bg-card shadow-lg p-4 hover:shadow-xl transition-all">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] font-medium text-muted-foreground bg-muted/50 px-2 py-0.5 rounded">{ad.platform}</span>
                <span className="text-[10px] text-muted-foreground">{ad.size}</span>
              </div>
              <div className="text-sm font-bold mb-0.5 truncate">{ad.title}</div>
              <div className="text-xs text-muted-foreground truncate">{ad.desc}</div>
            </div>
            <div className="shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
              <span className="text-white text-sm font-extrabold">{ad.score}</span>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-1.5">
            <div className="h-1 flex-1 rounded-full bg-muted overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-purple-600 to-cyan-500" style={{ width: `${ad.score}%` }} />
            </div>
            <span className="text-[10px] font-bold text-green-600">ציון {ad.score}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function AnalyticsMock() {
  return (
    <div className="rounded-2xl border border-border/60 bg-card shadow-2xl p-4 sm:p-5">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-bold">סיכום ביצועים - 30 יום</span>
        <Badge className="bg-purple-500/10 text-purple-600 border-purple-500/20 text-[10px]">AI Insights</Badge>
      </div>
      {/* Mini chart area - represented with bars */}
      <div className="flex items-end gap-1 h-20 mb-4">
        {[35, 42, 38, 55, 48, 62, 58, 72, 65, 78, 82, 75, 88, 92].map((h, i) => (
          <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-purple-600 to-blue-400 transition-all hover:from-purple-500 hover:to-blue-300" style={{ height: `${h}%` }} />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-lg bg-muted/30 p-2.5 text-center">
          <div className="text-lg font-extrabold text-foreground">4.32%</div>
          <div className="text-[10px] text-muted-foreground">CTR ממוצע</div>
        </div>
        <div className="rounded-lg bg-muted/30 p-2.5 text-center">
          <div className="text-lg font-extrabold text-foreground">2.95</div>
          <div className="text-[10px] text-muted-foreground">CPC ממוצע</div>
        </div>
        <div className="rounded-lg bg-muted/30 p-2.5 text-center">
          <div className="text-lg font-extrabold text-green-600">+34%</div>
          <div className="text-[10px] text-muted-foreground">שיפור חודשי</div>
        </div>
      </div>
      {/* AI suggestion */}
      <div className="mt-3 rounded-lg border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/20 p-3">
        <div className="flex items-start gap-2">
          <Sparkles className="w-3.5 h-3.5 text-purple-600 mt-0.5 shrink-0" />
          <div>
            <div className="text-[11px] font-bold text-purple-700 dark:text-purple-400 mb-0.5">המלצת AI</div>
            <div className="text-[10px] text-purple-600 dark:text-purple-300 leading-relaxed">
              העלאת תקציב בקמפיין "מבצע קיץ" ב-20% תשפר את ה-ROAS ב-15% לפי הנתונים.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Component ─── */

const HomeAlt = () => {
  const navigate = useNavigate();
  const heroRotator = useTextRotator(heroWords, 3000);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Section reveals
  const trustReveal = useScrollReveal();
  const kpiReveal = useScrollReveal();
  const showcase1Reveal = useScrollReveal();
  const showcase2Reveal = useScrollReveal();
  const showcase3Reveal = useScrollReveal();
  const testimonialsReveal = useScrollReveal();
  const pricingReveal = useScrollReveal();
  const faqReveal = useScrollReveal();
  const ctaReveal = useScrollReveal();

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
        title="AdSync - מנוע AI ליצירת פרסום מקצועי | קמפיינים ומודעות"
        description="צור מודעות וקמפיינים מקצועיים עם AI תוך דקות. עד 14x יותר המרות. Meta, Google, TikTok ועוד. התחל חינם."
        keywords="AI פרסום, קמפיינים פרסומיים, יצירת מודעות, שיווק דיגיטלי, פרסום פייסבוק, פרסום גוגל, AdSync"
        canonicalUrl="/"
        structuredData={structuredData}
      />

      <Navbar />

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="relative pt-24 sm:pt-32 lg:pt-40 pb-20 sm:pb-28 lg:pb-36 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-50/80 via-blue-50/40 to-transparent dark:from-purple-950/20 dark:via-blue-950/10 dark:to-transparent" />
        <div className="absolute top-20 right-[15%] w-[350px] h-[350px] bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-[100px]" />
        <div className="absolute top-40 left-[10%] w-[300px] h-[300px] bg-blue-400/15 dark:bg-blue-600/8 rounded-full blur-[80px]" />

        <div className="container mx-auto max-w-5xl relative z-10 text-center">
          <div className="inline-block mb-6 animate-fade-in">
            <Badge
              variant="secondary"
              className="text-sm font-medium px-5 py-2.5 rounded-full border border-purple-200 dark:border-purple-800 bg-white/80 dark:bg-white/5 backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4 ml-2 text-purple-500" />
              3,200+ עסקים ישראליים כבר משתמשים
            </Badge>
          </div>

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

          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '0.15s' }}>
            קבל עד <span className="font-bold text-foreground">14x יותר המרות</span>. בלי מעצבים. בלי ניחושים.
            <br className="hidden sm:block" />
            קמפיין מוכן לפרסום תוך דקות.
          </p>

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

      {/* ═══════════════════ PLATFORMS ═══════════════════ */}
      <section ref={trustReveal.ref} className={`py-14 px-4 border-y border-border/40 bg-muted/20 section-reveal ${trustReveal.isVisible ? 'is-visible' : ''}`}>
        <div className="container mx-auto max-w-5xl">
          <p className="text-center text-sm text-muted-foreground mb-8 font-medium tracking-wide">
            יוצרים קמפיינים לכל הפלטפורמות המובילות
          </p>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-4 sm:gap-6">
            {platforms.map((p) => {
              const LogoComponent = p.Logo;
              return (
                <div key={p.name} className="flex flex-col items-center gap-2 group cursor-default">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-card border border-border/50 flex items-center justify-center shadow-sm group-hover:shadow-lg group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300">
                    <LogoComponent />
                  </div>
                  <span className="text-[11px] font-medium text-muted-foreground group-hover:text-foreground transition-colors">{p.name}</span>
                </div>
              );
            })}
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

      {/* ═══════════════════ SHOWCASE 1: Campaign Monitoring ═══════════════════ */}
      <section ref={showcase1Reveal.ref} className={`py-16 sm:py-24 px-4 bg-muted/20 section-reveal ${showcase1Reveal.isVisible ? 'is-visible' : ''}`}>
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            <div className="flex-1 text-center lg:text-right">
              <Badge variant="secondary" className="mb-4 text-xs px-3 py-1 rounded-full">
                <Sparkles className="w-3 h-3 ml-1.5" />
                ניהול חכם
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-5 leading-tight">
                ניטור מתמיד של כל
                <br />
                <span className="hero-gradient-text">הקמפיינים שלך</span>
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-7 max-w-xl mx-auto lg:mx-0">
                מנוע AI שמנהל, מנטר ומשפר את כל הקמפיינים שלך 24/7. מקבל התראות בזמן אמת, המלצות אופטימיזציה ותובנות שמבוססות על מיליארדי נקודות מידע.
              </p>
              <Button
                onClick={() => navigate('/brief')}
                className="rounded-xl font-bold shadow-md hover:shadow-lg hover:scale-105 transition-all group"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: '#fff' }}
              >
                <span className="flex items-center gap-2">
                  התחל עכשיו
                  <ArrowLeft className="w-4 h-4 group-hover:translate-x-[-4px] transition-transform" />
                </span>
              </Button>
            </div>
            <div className="flex-1 w-full max-w-md lg:max-w-lg">
              <CampaignDashboardMock />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ SHOWCASE 2: AI Creative Generation ═══════════════════ */}
      <section ref={showcase2Reveal.ref} className={`py-16 sm:py-24 px-4 section-reveal ${showcase2Reveal.isVisible ? 'is-visible' : ''}`}>
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-10 lg:gap-16">
            <div className="flex-1 text-center lg:text-right">
              <Badge variant="secondary" className="mb-4 text-xs px-3 py-1 rounded-full">
                <Sparkles className="w-3 h-3 ml-1.5" />
                יצירת קריאייטיב
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-5 leading-tight">
                עשרות מודעות מקצועיות
                <br />
                <span className="hero-gradient-text">עם ציון ביצועים חכם</span>
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-7 max-w-xl mx-auto lg:mx-0">
                ה-AI יוצר באנרים, וידאו, טקסטים ופוסטים מותאמים לכל פלטפורמה. כל קריאייטיב מקבל ציון ביצועים שמנבא את ההצלחה שלו לפני שמוציאים שקל.
              </p>
              <Button
                onClick={() => navigate('/brief')}
                className="rounded-xl font-bold shadow-md hover:shadow-lg hover:scale-105 transition-all group"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: '#fff' }}
              >
                <span className="flex items-center gap-2">
                  נסה עכשיו
                  <ArrowLeft className="w-4 h-4 group-hover:translate-x-[-4px] transition-transform" />
                </span>
              </Button>
            </div>
            <div className="flex-1 w-full max-w-md lg:max-w-lg">
              <CreativeShowcaseMock />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ SHOWCASE 3: Analytics ═══════════════════ */}
      <section ref={showcase3Reveal.ref} className={`py-16 sm:py-24 px-4 bg-muted/20 section-reveal ${showcase3Reveal.isVisible ? 'is-visible' : ''}`}>
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            <div className="flex-1 text-center lg:text-right">
              <Badge variant="secondary" className="mb-4 text-xs px-3 py-1 rounded-full">
                <BarChart3 className="w-3 h-3 ml-1.5" />
                אנליטיקס
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-5 leading-tight">
                תובנות ביצועים
                <br />
                <span className="hero-gradient-text">והמלצות AI בזמן אמת</span>
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-7 max-w-xl mx-auto lg:mx-0">
                דשבורד מתקדם עם כל המטריקות החשובות. המערכת מזהה הזדמנויות לשיפור ומציעה פעולות קונקרטיות להגדלת ה-ROI שלך.
              </p>
              <Button
                onClick={() => navigate('/brief')}
                className="rounded-xl font-bold shadow-md hover:shadow-lg hover:scale-105 transition-all group"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: '#fff' }}
              >
                <span className="flex items-center gap-2">
                  ראה דוגמה
                  <ArrowLeft className="w-4 h-4 group-hover:translate-x-[-4px] transition-transform" />
                </span>
              </Button>
            </div>
            <div className="flex-1 w-full max-w-md lg:max-w-lg">
              <AnalyticsMock />
            </div>
          </div>
        </div>
      </section>

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

          <div className="marquee-container h-[500px] sm:h-[550px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 h-full">
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
                  className="w-full py-6 text-base font-bold rounded-xl group relative overflow-hidden"
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
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500" />
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }} />

        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-white leading-tight">
            מוכנים לשדרג את
            <br />
            הפרסום שלכם?
          </h2>
          <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            הצטרפו ל-3,200+ עסקים ישראליים שכבר יוצרים קמפיינים מנצחים עם AI.
            התחילו בחינם ותראו תוצאות מהיום הראשון.
          </p>
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

      <ChatWidget />
    </div>
  );
};

export default HomeAlt;
