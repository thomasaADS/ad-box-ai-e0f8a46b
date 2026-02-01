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
  BarChart3,
  CheckCircle,
  Zap,
  TrendingUp,
  Search,
  FileText,
  DollarSign,
  Globe,
  MousePointerClick,
} from 'lucide-react';

export default function GoogleAds() {
  const navigate = useNavigate();

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'יצירת קמפיינים לגוגל עם AI - AdSync',
    description: 'צור קמפייני Google Ads מקצועיים עם AI. מודעות חיפוש, מילות מפתח, כותרות וטקסטים - הכל אוטומטי.',
    provider: { '@type': 'Organization', name: 'AdSync' },
  };

  const benefits = [
    {
      icon: Search,
      title: 'מילות מפתח מדויקות',
      description: 'AI שמוצא את מילות המפתח הכי רווחיות לעסק שלך - כולל long-tail ו-negative keywords.',
    },
    {
      icon: FileText,
      title: 'Responsive Search Ads',
      description: '15 כותרות ו-4 תיאורים מותאמים - Google יבחר את השילוב המנצח.',
    },
    {
      icon: Target,
      title: 'מיקוד גיאוגרפי',
      description: 'פרסום ממוקד לערים, אזורים ורדיוסים ספציפיים - מגיע ללקוחות הקרובים אליך.',
    },
    {
      icon: DollarSign,
      title: 'ניהול הצעות מחיר',
      description: 'המלצות bid strategy חכמות - Maximize Clicks, Target CPA או Target ROAS.',
    },
    {
      icon: BarChart3,
      title: 'Quality Score גבוה',
      description: 'מודעות שמקבלות Quality Score גבוה = עלות נמוכה יותר לקליק ומיקום טוב יותר.',
    },
    {
      icon: TrendingUp,
      title: 'הרחבות מודעה',
      description: 'Sitelinks, Callouts, Structured Snippets ו-Call Extensions - הכל מוכן.',
    },
  ];

  const adTypes = [
    { type: 'Search Ads', desc: 'מודעות חיפוש טקסט' },
    { type: 'Display Ads', desc: 'מודעות רשת המדיה' },
    { type: 'Shopping Ads', desc: 'מודעות קניות' },
    { type: 'Performance Max', desc: 'מודעות חכמות אוטומטיות' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="יצירת קמפיינים לגוגל עם AI"
        description="צור קמפייני Google Ads מקצועיים עם AI תוך דקות. מודעות חיפוש, מילות מפתח, כותרות RSA והרחבות מודעה - הכל אוטומטי. התחל חינם!"
        keywords="קמפיינים גוגל, Google Ads, פרסום בגוגל, מודעות גוגל, מילות מפתח, PPC, גוגל אדוורדס, קמפיין חיפוש"
        canonicalUrl="/services/google-ads"
        structuredData={structuredData}
      />

      <Navbar />

      {/* Hero */}
      <section className="relative pt-20 sm:pt-28 pb-16 sm:pb-20 px-4 overflow-hidden bg-gradient-to-br from-green-600 via-blue-600 to-yellow-500">
        <div className="absolute top-20 right-10 w-64 sm:w-80 h-64 sm:h-80 bg-yellow-400 rounded-full filter blur-3xl opacity-20 animate-float" />
        <div className="absolute bottom-10 left-10 w-64 sm:w-80 h-64 sm:h-80 bg-blue-400 rounded-full filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '3s' }} />

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center space-y-6">
            <Badge className="text-sm px-5 py-2.5 bg-white/15 backdrop-blur-md border-white/30 text-white">
              Google Ads | Search & Display
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight">
              קמפיינים לגוגל
              <br />
              <span className="text-yellow-200">שמביאים לקוחות</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              AI שיוצר מודעות חיפוש מקצועיות, בוחר מילות מפתח רווחיות ומייצר RSA עם 15 כותרות מותאמות - הכל בדקות.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                onClick={() => navigate('/brief')}
                className="text-lg px-10 py-7 rounded-xl bg-white text-blue-700 hover:bg-blue-50 font-bold shadow-2xl hover:scale-105 transition-all"
              >
                <Sparkles className="w-5 h-5 ml-2" />
                צור קמפיין לגוגל
              </Button>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-white/70 text-sm">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-green-400" />
                חינם לניסיון
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-green-400" />
                מילות מפתח חכמות
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Quality Score גבוה
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Types */}
      <section className="py-16 sm:py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">סוגי קמפיינים שנתמכים</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {adTypes.map((item, idx) => (
              <Card key={idx} className="p-5 sm:p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-blue-50 flex items-center justify-center">
                  <MousePointerClick className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-bold mb-1">{item.type}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 sm:py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">מה תקבל?</h2>
            <p className="text-lg text-muted-foreground">הכל כדי להצליח בפרסום בגוגל</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <Card key={idx} className="p-6 sm:p-8 hover:shadow-xl transition-all hover:-translate-y-2">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center mb-5 shadow-lg">
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
          <Card className="p-8 sm:p-12 text-center bg-gradient-to-br from-blue-50 to-green-50 border-blue-200">
            <Globe className="w-12 sm:w-16 h-12 sm:h-16 mx-auto mb-6 text-blue-600" />
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              מוכנים להופיע בראש התוצאות?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              צרו קמפיין Google Ads מקצועי עכשיו - חינם, בלי כרטיס אשראי.
            </p>
            <Button
              size="lg"
              onClick={() => navigate('/brief')}
              className="text-lg px-10 py-7 rounded-xl shadow-lg hover:scale-105 transition-all"
            >
              <Sparkles className="w-5 h-5 ml-2" />
              צור קמפיין לגוגל
              <ArrowRight className="w-5 h-5 mr-2" />
            </Button>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
