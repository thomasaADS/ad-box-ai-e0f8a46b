import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { SEOHead } from '@/components/SEOHead';
import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Sparkles,
  Zap,
  Target,
  TrendingUp,
  Users,
  Globe,
  BarChart3,
  Clock,
  CheckCircle,
  Star,
  MessageSquare,
  Layout,
  Wand2,
  Shield,
  Play,
  ChevronLeft,
  Layers,
  Monitor,
  Smartphone,
  MousePointerClick,
  Image,
  Video,
  FileText,
  Palette,
  Brain,
  Rocket,
  Award,
  Check,
  X as XIcon,
  ArrowLeft,
  Eye,
  PenTool,
  Megaphone,
  LineChart,
  CircleDot,
  type LucideIcon,
} from 'lucide-react';

// Counter animation hook
function useCountUp(target: number, duration = 2000, startOnView = true) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startOnView) {
      setHasStarted(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted, startOnView]);

  useEffect(() => {
    if (!hasStarted) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [hasStarted, target, duration]);

  return { count, ref };
}

// Scroll animation hook
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

const HomeAlt = () => {
  const navigate = useNavigate();

  // Counter animations
  const campaignsCount = useCountUp(50000);
  const usersCount = useCountUp(3200);
  const roiCount = useCountUp(340);
  const timeCount = useCountUp(4);

  // Section scroll reveals
  const logosReveal = useScrollReveal();
  const howItWorksReveal = useScrollReveal();
  const featuresReveal = useScrollReveal();
  const comparisonReveal = useScrollReveal();
  const productsReveal = useScrollReveal();
  const testimonialsReveal = useScrollReveal();
  const pricingReveal = useScrollReveal();
  const ctaReveal = useScrollReveal();

  const features = [
    {
      icon: Sparkles,
      title: 'יצירת מודעות עם AI',
      description: 'המערכת יוצרת עשרות וריאציות של מודעות מקצועיות - קופי, תמונות ווידאו - תוך שניות בודדות.',
      gradient: 'from-purple-600 to-blue-600',
      tag: 'הכי פופולרי',
    },
    {
      icon: Brain,
      title: 'ציון ביצועים חכם',
      description: 'AI שמנתח מיליארדי דאטה פויינטים ומדרג כל קריאייטיב לפני שהוא עולה לאוויר - חיסכון עצום בתקציב.',
      gradient: 'from-blue-600 to-cyan-500',
      tag: 'חדש',
    },
    {
      icon: Target,
      title: 'מיקוד קהלים מדויק',
      description: 'בינה מלאכותית שמזהה את קהל היעד המדויק שלך ומתאימה את המסר לכל סגמנט.',
      gradient: 'from-cyan-500 to-teal-500',
    },
    {
      icon: Video,
      title: 'וידאו AI מקצועי',
      description: 'הפוך תמונת מוצר לסרטון פרסומי מקצועי עם אווטרים, קריינות ואנימציות.',
      gradient: 'from-teal-500 to-green-500',
      tag: 'חדש',
    },
    {
      icon: Layout,
      title: 'דפי נחיתה AI',
      description: 'סוכן AI שבונה דפי נחיתה ממירים עם תוכן, תמונות ו-CTA מותאמים אישית.',
      gradient: 'from-orange-500 to-pink-500',
    },
    {
      icon: BarChart3,
      title: 'אנליטיקס ודיווח',
      description: 'דשבורד מתקדם שמרכז את כל הנתונים מכל הפלטפורמות - CTR, ROAS, לידים ומכירות.',
      gradient: 'from-pink-500 to-purple-600',
    },
  ];

  const testimonials = [
    {
      name: 'דנה לוי',
      role: 'VP Marketing',
      company: 'FreshMarket',
      text: 'עברנו מסוכנות פרסום שעלתה ₪15,000 בחודש ל-AdSync. התוצאות השתפרו פי 3 והחיסכון הוא מטורף. בחיים לא חוזרים אחורה.',
      rating: 5,
      metric: '+340% ROI',
      avatar: 'ד',
    },
    {
      name: 'רון כהן',
      role: 'מייסד ומנכ"ל',
      company: 'TechFlow',
      text: 'ב-4 דקות קיבלתי 20 וריאציות של מודעות שהיו לוקחות למעצב שבוע. המערכת פשוט מבינה מה עובד בשוק הישראלי.',
      rating: 5,
      metric: '85% חיסכון בזמן',
      avatar: 'ר',
    },
    {
      name: 'מיכל אברהם',
      role: 'מנהלת שיווק',
      company: 'StyleHome',
      text: 'כל הקמפיינים שלנו עוברים דרך AdSync. הציון החכם של AI חסך לנו אלפי שקלים בתקציב פרסום מבוזבז.',
      rating: 5,
      metric: '-60% עלות לליד',
      avatar: 'מ',
    },
    {
      name: 'יואב שלום',
      role: 'בעל עסק',
      company: 'YS Consulting',
      text: 'בתור עסק קטן, לא היה לי תקציב לסוכנות. AdSync נתן לי כלים ברמה של סוכנות גדולה במחיר של קפה ביום.',
      rating: 5,
      metric: 'x12 יותר לידים',
      avatar: 'י',
    },
  ];

  const platforms = [
    { name: 'Meta', icon: '📘', color: 'from-blue-500 to-blue-700' },
    { name: 'Google', icon: '🔍', color: 'from-red-500 to-yellow-500' },
    { name: 'TikTok', icon: '🎵', color: 'from-gray-900 to-pink-600' },
    { name: 'LinkedIn', icon: '💼', color: 'from-blue-600 to-blue-800' },
    { name: 'Taboola', icon: '📰', color: 'from-orange-500 to-orange-700' },
    { name: 'Outbrain', icon: '🌐', color: 'from-purple-500 to-blue-500' },
    { name: 'Email', icon: '📧', color: 'from-green-500 to-green-700' },
    { name: 'SMS', icon: '💬', color: 'from-purple-500 to-purple-700' },
  ];

  const howItWorks = [
    {
      step: '01',
      title: 'ייבא את המותג שלך',
      description: 'העלה לוגו, בחר צבעים וספר בקצרה על העסק. ה-AI מבין את המותג שלך תוך שניות.',
      icon: PenTool,
      detail: 'הגדרה של 60 שניות',
    },
    {
      step: '02',
      title: 'AI יוצר את הקמפיין',
      description: 'המערכת מייצרת עשרות מודעות, טקסטים ואסטרטגיה מותאמת לכל פלטפורמה - אוטומטית.',
      icon: Sparkles,
      detail: 'תוצאות מיידיות',
    },
    {
      step: '03',
      title: 'פרסם וצמח',
      description: 'קבל קמפיינים מוכנים לפרסום עם ציוני ביצועים חכמים. פשוט בחר ופרסם.',
      icon: Rocket,
      detail: '+20 וריאציות',
    },
  ];

  const comparisonData = [
    { feature: 'זמן הקמה', adsync: '60 שניות', agency: '1-2 שבועות', diy: '3-5 שעות' },
    { feature: 'וריאציות מודעות', adsync: 'עשרות מיידית', agency: '3-5 בשבוע', diy: '1-2 ביום' },
    { feature: 'עלות חודשית', adsync: 'מ-₪350/חודש', agency: '₪5,000-15,000', diy: 'זמן יקר שלך' },
    { feature: 'ציון ביצועים AI', adsync: true, agency: false, diy: false },
    { feature: 'התאמה לשוק הישראלי', adsync: true, agency: 'תלוי', diy: false },
    { feature: 'דפי נחיתה AI', adsync: true, agency: 'בתוספת תשלום', diy: false },
    { feature: 'אופטימיזציה אוטומטית', adsync: true, agency: 'ידנית', diy: false },
    { feature: 'תמיכה 24/7', adsync: true, agency: 'שעות עבודה', diy: false },
  ];

  const products = [
    {
      title: 'מודעות באנר AI',
      description: 'יצירת באנרים מקצועיים לכל הפלטפורמות עם התאמה אוטומטית לכל גודל ופורמט.',
      icon: Image,
      gradient: 'from-purple-600 to-blue-600',
      size: 'large',
    },
    {
      title: 'וידאו AI',
      description: 'הפוך תמונת מוצר לסרטון פרסומי עם אווטרים וקריינות.',
      icon: Video,
      gradient: 'from-blue-600 to-cyan-500',
      size: 'small',
    },
    {
      title: 'ציון ביצועים',
      description: 'ניבוי הצלחה של כל מודעה לפני שמוציאים שקל.',
      icon: Eye,
      gradient: 'from-cyan-500 to-teal-500',
      size: 'small',
    },
    {
      title: 'טקסטים שיווקיים',
      description: 'קופי מקצועי בעברית שמדבר ללקוחות ומניע לפעולה.',
      icon: FileText,
      gradient: 'from-orange-500 to-pink-500',
      size: 'small',
    },
    {
      title: 'צילומי מוצר AI',
      description: 'צילומי מוצר מקצועיים עם רקעים מותאמים.',
      icon: Palette,
      gradient: 'from-green-500 to-teal-500',
      size: 'small',
    },
    {
      title: 'דפי נחיתה AI',
      description: 'דפי נחיתה מקצועיים שנבנים אוטומטית עם תוכן, תמונות ו-CTA ממוטבים לכל קמפיין.',
      icon: Layout,
      gradient: 'from-pink-500 to-purple-600',
      size: 'large',
    },
  ];

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

      {/* ===================== HERO SECTION ===================== */}
      <section className="relative pt-24 sm:pt-32 md:pt-36 pb-20 sm:pb-28 md:pb-32 px-4 overflow-hidden">
        {/* Dark gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f0a2e] via-[#1a1145] to-[#2d1b69]" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />

        {/* Animated gradient orbs */}
        <div className="absolute top-10 right-[10%] w-[500px] h-[500px] bg-purple-600 rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-float" />
        <div className="absolute top-40 left-[5%] w-[400px] h-[400px] bg-blue-600 rounded-full mix-blend-screen filter blur-[100px] opacity-15 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-10 right-[30%] w-[350px] h-[350px] bg-pink-500 rounded-full mix-blend-screen filter blur-[100px] opacity-10 animate-float" style={{ animationDelay: '4s' }} />
        <div className="absolute top-[60%] left-[40%] w-[300px] h-[300px] bg-cyan-500 rounded-full mix-blend-screen filter blur-[80px] opacity-10 animate-float" style={{ animationDelay: '3s' }} />

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center space-y-7 sm:space-y-8">
            {/* Top Badge */}
            <div className="inline-block animate-bounce-in">
              <Badge
                className="text-sm sm:text-base font-medium px-5 sm:px-7 py-2.5 sm:py-3 border hover:scale-105 transition-transform cursor-default rounded-full"
                style={{
                  color: '#a78bfa',
                  borderColor: 'rgba(167, 139, 250, 0.3)',
                  background: 'rgba(167, 139, 250, 0.1)',
                  backdropFilter: 'blur(20px)'
                }}
              >
                <Sparkles className="w-4 h-4 ml-2 text-purple-400" />
                3,200+ עסקים ישראליים כבר משתמשים
              </Badge>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.08] animate-fade-in text-white">
              מנוע ה-AI שלך
              <br />
              <span className="hero-gradient-text">
                לכל צרכי הפרסום
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl md:text-2xl leading-relaxed mx-auto max-w-3xl animate-slide-up text-gray-300" style={{ animationDelay: '0.2s' }}>
              קבל עד <span className="text-white font-bold">14x יותר המרות</span>. בלי מעצבים. בלי ניחושים.
              <br className="hidden sm:block" />
              מודעות, קמפיינים ודפי נחיתה מקצועיים - הכל אוטומטי עם AI.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center pt-4 sm:pt-6 animate-scale-in" style={{ animationDelay: '0.4s' }}>
              <Button
                size="lg"
                onClick={() => navigate('/brief')}
                className="text-lg sm:text-xl px-10 sm:px-14 py-7 sm:py-8 rounded-2xl font-bold border-0 hover:opacity-95 transition-all hover:scale-105 shadow-2xl group relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 50%, #06b6d4 100%)',
                  color: 'white'
                }}
              >
                <span className="relative z-10 flex items-center gap-3">
                  <Sparkles className="w-5 h-5" />
                  התחל בחינם עכשיו
                  <ArrowLeft className="w-5 h-5 group-hover:translate-x-[-4px] transition-transform" />
                </span>
              </Button>
              <Button
                size="lg"
                onClick={() => navigate('/how-it-works')}
                className="text-base sm:text-lg px-8 sm:px-12 py-7 sm:py-8 rounded-2xl font-semibold border hover:scale-105 transition-all"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(10px)',
                  borderColor: 'rgba(255,255,255,0.15)',
                  color: 'white'
                }}
              >
                <Play className="w-5 h-5 ml-2" />
                ראה איך זה עובד
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-8 pt-2 text-sm animate-slide-up" style={{ animationDelay: '0.6s' }}>
              <span className="flex items-center gap-2 text-gray-400">
                <CheckCircle className="w-4 h-4 text-green-400" />
                7 ימי ניסיון חינם
              </span>
              <span className="flex items-center gap-2 text-gray-400">
                <CheckCircle className="w-4 h-4 text-green-400" />
                ללא כרטיס אשראי
              </span>
              <span className="flex items-center gap-2 text-gray-400">
                <CheckCircle className="w-4 h-4 text-green-400" />
                ביטול בכל עת
              </span>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-10 sm:pt-14">
              <div ref={campaignsCount.ref} className="hero-stat-card">
                <Zap className="w-6 h-6 mx-auto mb-2 text-purple-400" />
                <div className="text-2xl sm:text-3xl font-bold text-white">{campaignsCount.count.toLocaleString()}+</div>
                <div className="text-xs sm:text-sm text-gray-400">קמפיינים נוצרו</div>
              </div>
              <div ref={usersCount.ref} className="hero-stat-card">
                <Users className="w-6 h-6 mx-auto mb-2 text-blue-400" />
                <div className="text-2xl sm:text-3xl font-bold text-white">{usersCount.count.toLocaleString()}+</div>
                <div className="text-xs sm:text-sm text-gray-400">משתמשים פעילים</div>
              </div>
              <div ref={roiCount.ref} className="hero-stat-card">
                <TrendingUp className="w-6 h-6 mx-auto mb-2 text-green-400" />
                <div className="text-2xl sm:text-3xl font-bold text-white">{roiCount.count}%</div>
                <div className="text-xs sm:text-sm text-gray-400">ROI ממוצע</div>
              </div>
              <div ref={timeCount.ref} className="hero-stat-card">
                <Clock className="w-6 h-6 mx-auto mb-2 text-cyan-400" />
                <div className="text-2xl sm:text-3xl font-bold text-white">{timeCount.count} דק'</div>
                <div className="text-xs sm:text-sm text-gray-400">זמן יצירה ממוצע</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* ===================== SUPPORTED PLATFORMS ===================== */}
      <section ref={logosReveal.ref} className={`py-14 sm:py-18 px-4 border-b border-border/50 transition-all duration-700 ${logosReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="container mx-auto max-w-5xl">
          <p className="text-center text-sm text-muted-foreground mb-8 font-medium tracking-wide">
            יוצרים קמפיינים לכל הפלטפורמות המובילות
          </p>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-4 sm:gap-6">
            {platforms.map((platform) => (
              <div
                key={platform.name}
                className="flex flex-col items-center gap-2 group cursor-default"
              >
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${platform.color} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300`}>
                  <span className="text-lg sm:text-xl filter drop-shadow-sm">{platform.icon}</span>
                </div>
                <span className="text-[11px] sm:text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">{platform.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== HOW IT WORKS ===================== */}
      <section ref={howItWorksReveal.ref} className={`py-20 sm:py-28 px-4 bg-gradient-to-b from-background to-muted/20 transition-all duration-700 ${howItWorksReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14 sm:mb-18">
            <Badge variant="secondary" className="mb-5 text-sm px-4 py-1.5 rounded-full">
              <Zap className="w-3.5 h-3.5 ml-1.5" />
              פשוט ומהיר
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-5">
              מ<span className="gradient-text">קמפיין לתוצאות</span> ב-3 צעדים
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              לא צריך ניסיון בפרסום. ה-AI עושה את הכל בשבילך.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {howItWorks.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="relative group">
                  <Card className="p-7 sm:p-9 text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 h-full border-2 border-transparent hover:border-primary/20 bg-card/80 backdrop-blur-sm">
                    {/* Step number */}
                    <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-5 sm:mb-7 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center relative group-hover:scale-110 transition-transform duration-500">
                      <span className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 text-white text-sm font-bold flex items-center justify-center shadow-lg">
                        {item.step}
                      </span>
                      <Icon className="w-10 sm:w-12 h-10 sm:h-12 text-primary" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-3">{item.title}</h3>
                    <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-4">{item.description}</p>
                    <Badge variant="outline" className="text-xs rounded-full">
                      {item.detail}
                    </Badge>
                  </Card>
                  {/* Arrow between steps */}
                  {index < 2 && (
                    <div className="hidden md:flex absolute top-1/2 -left-5 transform -translate-y-1/2 items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <ChevronLeft className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12 sm:mt-14">
            <Button
              size="lg"
              onClick={() => navigate('/brief')}
              className="text-base sm:text-lg px-10 py-7 rounded-xl shadow-lg hover:scale-105 transition-all font-bold"
              style={{
                background: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)',
                color: 'white'
              }}
            >
              <Sparkles className="w-5 h-5 ml-2" />
              נסה עכשיו בחינם
              <ArrowLeft className="w-5 h-5 mr-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* ===================== BENTO FEATURES GRID ===================== */}
      <section ref={featuresReveal.ref} className={`py-20 sm:py-28 px-4 transition-all duration-700 ${featuresReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14 sm:mb-18">
            <Badge variant="secondary" className="mb-5 text-sm px-4 py-1.5 rounded-full">
              <Layers className="w-3.5 h-3.5 ml-1.5" />
              יכולות הפלטפורמה
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-5">
              הכל ב<span className="gradient-text">מקום אחד</span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              כל הכלים שצריך כדי ליצור, לנהל ולמטב קמפיינים מנצחים
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="feature-card p-7 sm:p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-border/50 hover:border-primary/20 group relative overflow-hidden"
                >
                  {/* Hover gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />

                  {feature.tag && (
                    <Badge className="absolute top-4 left-4 text-[10px] bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 shadow-lg">
                      {feature.tag}
                    </Badge>
                  )}

                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-[15px]">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================== COMPARISON TABLE ===================== */}
      <section ref={comparisonReveal.ref} className={`py-20 sm:py-28 px-4 bg-gradient-to-b from-muted/30 to-background transition-all duration-700 ${comparisonReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-14">
            <Badge variant="secondary" className="mb-5 text-sm px-4 py-1.5 rounded-full">
              <LineChart className="w-3.5 h-3.5 ml-1.5" />
              השוואה
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-5">
              למה <span className="gradient-text">AdSync</span>?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              ראה את ההבדל בעצמך - AdSync לעומת סוכנות פרסום ו-DIY
            </p>
          </div>

          <Card className="overflow-hidden border-2 border-border/50 shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="text-right p-4 sm:p-5 text-sm font-semibold text-muted-foreground w-[35%]">
                      תכונה
                    </th>
                    <th className="p-4 sm:p-5 text-center w-[25%]">
                      <div className="inline-flex flex-col items-center gap-1">
                        <span className="text-sm font-bold gradient-text">AdSync AI</span>
                        <Badge className="text-[10px] bg-green-500/10 text-green-600 border-green-500/20">מומלץ</Badge>
                      </div>
                    </th>
                    <th className="p-4 sm:p-5 text-center text-sm font-semibold text-muted-foreground w-[20%]">
                      סוכנות
                    </th>
                    <th className="p-4 sm:p-5 text-center text-sm font-semibold text-muted-foreground w-[20%]">
                      עושים לבד
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr key={index} className={`border-b border-border/50 ${index % 2 === 0 ? 'bg-muted/20' : ''}`}>
                      <td className="p-4 sm:p-5 text-sm font-medium">{row.feature}</td>
                      <td className="p-4 sm:p-5 text-center">
                        {typeof row.adsync === 'boolean' ? (
                          row.adsync ? (
                            <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <XIcon className="w-5 h-5 text-red-400 mx-auto" />
                          )
                        ) : (
                          <span className="text-sm font-bold text-primary">{row.adsync}</span>
                        )}
                      </td>
                      <td className="p-4 sm:p-5 text-center">
                        {typeof row.agency === 'boolean' ? (
                          row.agency ? (
                            <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <XIcon className="w-5 h-5 text-red-400 mx-auto" />
                          )
                        ) : (
                          <span className="text-xs sm:text-sm text-muted-foreground">{row.agency}</span>
                        )}
                      </td>
                      <td className="p-4 sm:p-5 text-center">
                        {typeof row.diy === 'boolean' ? (
                          row.diy ? (
                            <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <XIcon className="w-5 h-5 text-red-400 mx-auto" />
                          )
                        ) : (
                          <span className="text-xs sm:text-sm text-muted-foreground">{row.diy}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <div className="text-center mt-10">
            <Button
              size="lg"
              onClick={() => navigate('/brief')}
              className="text-base sm:text-lg px-10 py-7 rounded-xl shadow-lg hover:scale-105 transition-all font-bold"
              style={{
                background: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)',
                color: 'white'
              }}
            >
              <Sparkles className="w-5 h-5 ml-2" />
              התחל בחינם - 7 ימי ניסיון
            </Button>
          </div>
        </div>
      </section>

      {/* ===================== PRODUCTS BENTO ===================== */}
      <section ref={productsReveal.ref} className={`py-20 sm:py-28 px-4 transition-all duration-700 ${productsReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <Badge variant="secondary" className="mb-5 text-sm px-4 py-1.5 rounded-full">
              <Wand2 className="w-3.5 h-3.5 ml-1.5" />
              מוצרי AI
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-5">
              סוויטת ה-AI <span className="gradient-text">המלאה</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              כל הכלים שצריך כדי ליצור קמפיינים מנצחים - ממודעות ועד דפי נחיתה
            </p>
          </div>

          <div className="bento-grid">
            {products.map((product, index) => {
              const Icon = product.icon;
              return (
                <Card
                  key={index}
                  className={`bento-item ${product.size === 'large' ? 'bento-large' : 'bento-small'} p-6 sm:p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-border/50 hover:border-primary/20 group relative overflow-hidden cursor-pointer`}
                  onClick={() => product.title === 'דפי נחיתה AI' ? navigate('/landing-page-builder') : navigate('/brief')}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500`} />
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${product.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-all duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2">{product.title}</h3>
                  <p className="text-muted-foreground text-sm sm:text-[15px] leading-relaxed">{product.description}</p>
                  <div className="mt-4 flex items-center gap-1 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    גלה עוד
                    <ArrowLeft className="w-4 h-4" />
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================== LANDING PAGE BUILDER CTA ===================== */}
      <section className="py-16 sm:py-20 px-4 bg-gradient-to-br from-[#0f0a2e] via-[#1a1145] to-[#2d1b69] relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute top-0 left-[20%] w-[300px] h-[300px] bg-purple-600 rounded-full mix-blend-screen filter blur-[100px] opacity-15" />
        <div className="absolute bottom-0 right-[20%] w-[250px] h-[250px] bg-blue-600 rounded-full mix-blend-screen filter blur-[80px] opacity-15" />

        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-10 sm:gap-14">
            <div className="flex-1 text-center lg:text-right">
              <Badge className="mb-5 bg-purple-500/20 text-purple-300 border-purple-500/30 rounded-full">
                <Wand2 className="w-3.5 h-3.5 ml-1.5" />
                חדש!
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-5 text-white">
                בנה דף נחיתה מקצועי
                <br />
                <span className="hero-gradient-text">עם AI תוך דקות</span>
              </h2>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-xl">
                סוכן AI חכם שבונה לך דף נחיתה ממיר עם תמונות, טקסטים שיווקיים ו-CTA מותאמים אישית.
                פשוט ספר על העסק שלך וקבל דף מקצועי מוכן לפרסום.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  onClick={() => navigate('/landing-page-builder')}
                  className="text-lg px-10 py-7 rounded-xl shadow-2xl hover:scale-105 transition-transform group font-bold"
                  style={{
                    background: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)',
                    color: 'white'
                  }}
                >
                  <Wand2 className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
                  בנה דף נחיתה עכשיו
                </Button>
                <Button
                  size="lg"
                  onClick={() => navigate('/services/landing-pages')}
                  className="text-lg px-8 py-7 rounded-xl font-semibold"
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    borderColor: 'rgba(255,255,255,0.2)',
                    color: 'white'
                  }}
                >
                  למד עוד
                </Button>
              </div>
            </div>
            <div className="w-56 sm:w-72 h-56 sm:h-72 rounded-3xl bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 flex items-center justify-center shadow-2xl shrink-0 relative group">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 opacity-50 blur-xl group-hover:blur-2xl transition-all" />
              <div className="text-center text-white relative z-10">
                <Layout className="w-16 sm:w-20 h-16 sm:h-20 mx-auto mb-3 opacity-90" />
                <div className="flex items-center gap-2 justify-center text-white/70">
                  <Monitor className="w-5 h-5" />
                  <Smartphone className="w-4 h-4" />
                </div>
                <p className="text-xs mt-2 text-white/50">דסקטופ + מובייל</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== TESTIMONIALS ===================== */}
      <section ref={testimonialsReveal.ref} className={`py-20 sm:py-28 px-4 transition-all duration-700 ${testimonialsReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <Badge variant="secondary" className="mb-5 text-sm px-4 py-1.5 rounded-full">
              <Star className="w-3.5 h-3.5 ml-1.5 fill-yellow-400 text-yellow-400" />
              המלצות לקוחות
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-5">
              <span className="gradient-text">אלפי עסקים</span> כבר משתמשים
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              מה הלקוחות שלנו אומרים על AdSync
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 sm:gap-7">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 sm:p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative border border-border/50 hover:border-primary/20">
                {/* Metric Badge */}
                <div className="absolute -top-3 left-6">
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 shadow-lg text-sm font-bold px-3 py-1">
                    {testimonial.metric}
                  </Badge>
                </div>

                <div className="flex gap-1 mb-4 pt-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 text-[15px] sm:text-base leading-relaxed">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="border-t border-border/50 pt-5 flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-[15px]">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role} | {testimonial.company}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mt-12 pt-8 border-t border-border/50">
            <div className="flex items-center gap-2">
              <Award className="w-6 h-6 text-yellow-500" />
              <span className="text-sm font-medium text-muted-foreground">דירוג 4.9/5</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-green-500" />
              <span className="text-sm font-medium text-muted-foreground">אבטחת מידע מלאה</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-6 h-6 text-blue-500" />
              <span className="text-sm font-medium text-muted-foreground">מותאם לשוק הישראלי</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-purple-500" />
              <span className="text-sm font-medium text-muted-foreground">50,000+ קמפיינים נוצרו</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== PRICING ===================== */}
      <section ref={pricingReveal.ref} className={`py-20 sm:py-28 px-4 bg-muted/20 transition-all duration-700 ${pricingReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <Badge variant="secondary" className="mb-5 text-sm px-4 py-1.5 rounded-full">
              <CircleDot className="w-3.5 h-3.5 ml-1.5" />
              תמחור
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-5">
              תמחור <span className="gradient-text">פשוט ושקוף</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              7 ימי ניסיון חינם לכל התוכניות. ללא התחייבות.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                name: 'סטרטר',
                price: '₪99',
                originalPrice: '₪149',
                period: 'לחודש',
                description: 'מושלם לעסקים קטנים שרוצים להתחיל עם AI',
                features: [
                  '10 קמפיינים בחודש',
                  '3 פלטפורמות פרסום',
                  'ציון ביצועים בסיסי',
                  'תמיכה במייל',
                  'אנליטיקס בסיסי',
                ],
                popular: false,
                cta: 'התחל ניסיון חינם',
              },
              {
                name: 'פרו',
                price: '₪349',
                originalPrice: '₪499',
                period: 'לחודש',
                description: 'לעסקים שרוצים למקסם תוצאות',
                features: [
                  'קמפיינים ללא הגבלה',
                  'כל הפלטפורמות',
                  'ציון ביצועים מתקדם',
                  'דפי נחיתה AI',
                  'וידאו AI',
                  'תמיכה 24/7',
                  'A/B Testing מתקדם',
                  'אנליטיקס מתקדם',
                ],
                popular: true,
                cta: 'התחל ניסיון חינם',
              },
              {
                name: 'אנטרפרייז',
                price: 'מותאם',
                period: 'מחיר אישי',
                description: 'לארגונים עם צרכים מורכבים',
                features: [
                  'הכל מ-Pro',
                  'מנהל חשבון ייעודי',
                  'API מלא',
                  'הכשרות צוות',
                  'SLA מובטח',
                  'אופטימיזציה ידנית + AI',
                  'דוחות מותאמים',
                ],
                popular: false,
                cta: 'דבר איתנו',
              },
            ].map((plan, index) => (
              <Card
                key={index}
                className={`pricing-card p-7 sm:p-9 relative hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 ${
                  plan.popular
                    ? 'border-2 border-primary shadow-xl ring-4 ring-primary/10 bg-card scale-[1.02]'
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
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-5">{plan.description}</p>
                <div className="mb-6">
                  {plan.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through ml-2">{plan.originalPrice}</span>
                  )}
                  <span className="text-4xl sm:text-5xl font-extrabold gradient-text">{plan.price}</span>
                  <span className="text-muted-foreground text-sm mr-2"> {plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-[15px]">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full py-6 text-base font-bold rounded-xl ${
                    plan.popular ? '' : ''
                  }`}
                  variant={plan.popular ? 'default' : 'outline'}
                  onClick={() => navigate('/brief')}
                  style={plan.popular ? {
                    background: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)',
                    color: 'white'
                  } : {}}
                >
                  {plan.cta}
                  <ArrowLeft className="w-4 h-4 mr-2" />
                </Button>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button
              variant="ghost"
              onClick={() => navigate('/pricing')}
              className="text-base"
            >
              ראה את כל החבילות בפירוט
              <ArrowLeft className="w-4 h-4 mr-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* ===================== FINAL CTA ===================== */}
      <section ref={ctaReveal.ref} className={`py-24 sm:py-32 px-4 relative overflow-hidden transition-all duration-700 ${ctaReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Dark gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f0a2e] via-[#1a1145] to-[#2d1b69]" />
        <div className="absolute top-0 right-[20%] w-[400px] h-[400px] bg-purple-600 rounded-full mix-blend-screen filter blur-[120px] opacity-15" />
        <div className="absolute bottom-0 left-[20%] w-[300px] h-[300px] bg-blue-600 rounded-full mix-blend-screen filter blur-[100px] opacity-15" />

        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <div className="mb-8">
            <span className="text-6xl sm:text-7xl">🚀</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-white leading-tight">
            מוכנים לשדרג את
            <br />
            <span className="hero-gradient-text">הפרסום שלכם?</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            הצטרפו ל-3,200+ עסקים ישראליים שכבר יוצרים קמפיינים מנצחים עם AI.
            התחילו בחינם ותראו תוצאות מהיום הראשון.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center">
            <Button
              size="lg"
              onClick={() => navigate('/brief')}
              className="text-lg sm:text-xl px-12 sm:px-16 py-7 sm:py-8 rounded-2xl shadow-2xl hover:scale-105 transition-all font-bold"
              style={{
                background: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 50%, #06b6d4 100%)',
                color: 'white'
              }}
            >
              <Sparkles className="w-5 h-5 ml-2" />
              יצירת קמפיין חינם
              <ArrowLeft className="w-5 h-5 mr-2" />
            </Button>
            <Button
              size="lg"
              onClick={() => navigate('/landing-page-builder')}
              className="text-lg px-10 py-7 sm:py-8 rounded-2xl font-semibold"
              style={{
                background: 'rgba(255,255,255,0.1)',
                borderColor: 'rgba(255,255,255,0.2)',
                color: 'white'
              }}
            >
              <Layout className="w-5 h-5 ml-2" />
              בנה דף נחיתה
            </Button>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-8 mt-8 text-sm text-gray-400">
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              7 ימי ניסיון חינם
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              ללא כרטיס אשראי
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              תוצאות תוך 4 דקות
            </span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomeAlt;
