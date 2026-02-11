import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SEOHead } from '@/components/SEOHead';
import {
  ArrowRight,
  Sparkles,
  Target,
  CheckCircle,
  Zap,
  Layout,
  Wand2,
  Palette,
  Image,
  Smartphone,
  Monitor,
  MousePointerClick,
} from 'lucide-react';

export default function LandingPages() {
  const navigate = useNavigate();

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'בניית דפי נחיתה עם AI - ARIA',
    description: 'בנה דפי נחיתה מקצועיים עם AI תוך דקות. תמונות מקוריות, טקסטים שיווקיים, רספונסיבי מלא.',
    provider: { '@type': 'Organization', name: 'ARIA' },
  };

  const benefits = [
    {
      icon: Wand2,
      title: 'סוכן AI חכם',
      description: 'AI שואל שאלות פשוטות ובונה את הדף המושלם עבורך - בלי ידע בעיצוב או קוד.',
    },
    {
      icon: Image,
      title: 'תמונות AI מקוריות',
      description: 'יצירת תמונות ייחודיות עם Stable Diffusion - תאר מה שאתה רוצה וקבל תמונה מושלמת.',
    },
    {
      icon: Palette,
      title: 'עיצוב מותאם אישית',
      description: 'בחירת צבעים, סגנון וסכמת עיצוב שמתאימים למותג שלך.',
    },
    {
      icon: Smartphone,
      title: 'רספונסיבי מלא',
      description: 'כל דף נבנה mobile-first - נראה מעולה בנייד, טאבלט ודסקטופ.',
    },
    {
      icon: Target,
      title: 'ממוטב להמרות',
      description: 'CTA חכם, מבנה שיווקי מוכח ואופטימיזציה ל-conversion rate.',
    },
    {
      icon: Zap,
      title: 'מהיר ופשוט',
      description: 'דף נחיתה מוכן תוך 5 דקות - ללא צורך בידע טכני כלשהו.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="בניית דפי נחיתה מקצועיים עם AI"
        description="בנה דפי נחיתה מקצועיים עם AI תוך 5 דקות. סוכן AI חכם שיוצר תמונות, טקסטים ו-CTA ממוטבים. רספונסיבי מלא, ללא צורך בקוד."
        keywords="דף נחיתה, בניית דף נחיתה, Landing Page, דף נחיתה עם AI, בונה דפי נחיתה, עיצוב דף נחיתה"
        canonicalUrl="/services/landing-pages"
        structuredData={structuredData}
      />

      <Navbar />

      {/* Hero */}
      <section className="relative pt-20 sm:pt-28 pb-16 sm:pb-20 px-4 overflow-hidden bg-gradient-to-br from-purple-600 via-violet-600 to-pink-500">
        <div className="absolute top-20 right-10 w-64 sm:w-80 h-64 sm:h-80 bg-violet-400 rounded-full filter blur-3xl opacity-20 animate-float" />
        <div className="absolute bottom-10 left-10 w-64 sm:w-80 h-64 sm:h-80 bg-pink-400 rounded-full filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '3s' }} />

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center space-y-6">
            <Badge className="text-sm px-5 py-2.5 bg-white/15 backdrop-blur-md border-white/30 text-white">
              Landing Page Builder | AI Powered
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight">
              בנה דף נחיתה מקצועי
              <br />
              <span className="text-violet-200">תוך 5 דקות עם AI</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              סוכן AI חכם שבונה דפי נחיתה ממוטבים להמרות - כולל תמונות מקוריות, טקסטים שיווקיים ו-CTA מותאם. ללא צורך בקוד.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                onClick={() => navigate('/landing-page-builder')}
                className="text-lg px-10 py-7 rounded-xl bg-white text-purple-700 hover:bg-purple-50 font-bold shadow-2xl hover:scale-105 transition-all"
              >
                <Wand2 className="w-5 h-5 ml-2" />
                בנה דף נחיתה עכשיו
              </Button>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-white/70 text-sm">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-green-400" />
                ללא צורך בקוד
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-green-400" />
                תמונות AI מקוריות
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-green-400" />
                רספונסיבי מלא
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Before/After */}
      <section className="py-16 sm:py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">בלי דף נחיתה vs עם ARIA</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6 sm:p-8 border-red-200 bg-red-50/50">
              <h3 className="text-xl font-bold mb-4 text-red-600">בלי דף נחיתה</h3>
              <ul className="space-y-3">
                {['שולחים תנועה לדף ראשי גנרי', 'אחוז המרה נמוך של 1-2%', 'משלמים למעצב $500-2000', 'ממתינים שבועות לדף מוכן', 'תלויים במפתח לכל שינוי'].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                    <span className="text-red-500 mt-1">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
            <Card className="p-6 sm:p-8 border-green-200 bg-green-50/50">
              <h3 className="text-xl font-bold mb-4 text-green-600">עם ARIA</h3>
              <ul className="space-y-3">
                {['דף נחיתה ממוקד למטרה שלך', 'אחוז המרה של 5-15%', 'חינם - כלול בפלטפורמה', 'מוכן תוך 5 דקות', 'עורך ויזואלי קל לשינויים'].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 sm:py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">מה תקבל?</h2>
            <p className="text-lg text-muted-foreground">דף נחיתה מקצועי שמביא תוצאות</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <Card key={idx} className="p-6 sm:p-8 hover:shadow-xl transition-all hover:-translate-y-2">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-5 shadow-lg">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="p-8 sm:p-12 text-center bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Monitor className="w-10 h-10 text-purple-600" />
              <Smartphone className="w-8 h-8 text-purple-400" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              מוכנים לבנות דף נחיתה מנצח?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              5 דקות, בלי קוד, בלי מעצב - רק AI חכם שבונה את הדף המושלם עבורך.
            </p>
            <Button
              size="lg"
              onClick={() => navigate('/landing-page-builder')}
              className="text-lg px-10 py-7 rounded-xl shadow-lg hover:scale-105 transition-all"
            >
              <Wand2 className="w-5 h-5 ml-2" />
              בנה דף נחיתה עכשיו
              <ArrowRight className="w-5 h-5 mr-2" />
            </Button>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
