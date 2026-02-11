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
  Users,
  BarChart3,
  CheckCircle,
  Zap,
  TrendingUp,
  Image,
  MessageSquare,
  DollarSign,
  Eye,
} from 'lucide-react';

export default function FacebookAds() {
  const navigate = useNavigate();

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'יצירת קמפיינים לפייסבוק עם AI - ARIA',
    description: 'צור קמפיינים מקצועיים לפייסבוק ואינסטגרם עם AI. קופי, תמונות, קהלי יעד והמלצות תקציב - הכל אוטומטי.',
    provider: {
      '@type': 'Organization',
      name: 'ARIA',
    },
  };

  const benefits = [
    {
      icon: MessageSquare,
      title: 'קופי שמוכר',
      description: 'AI שכותב טקסטים שיווקיים בעברית ובאנגלית - מותאמים לפייסבוק ואינסטגרם עם CTA ברור.',
    },
    {
      icon: Image,
      title: 'תמונות בפורמט מושלם',
      description: 'תמונות 1:1 לפיד ו-4:5 לסטוריז - מותאמות למפרט של Meta עם עיצוב מקצועי.',
    },
    {
      icon: Target,
      title: 'מיקוד קהלים חכם',
      description: 'המלצות קהל יעד מפורטות - גילאים, תחומי עניין, אזורים גיאוגרפיים ו-Lookalike.',
    },
    {
      icon: DollarSign,
      title: 'המלצות תקציב',
      description: 'תקציב מומלץ על בסיס התעשייה, המטרה וקהל היעד שלך - עם חלוקה יומית.',
    },
    {
      icon: BarChart3,
      title: 'A/B Testing מובנה',
      description: '+20 וריאציות של מודעות כדי שתוכל לבדוק מה עובד הכי טוב עם הקהל שלך.',
    },
    {
      icon: TrendingUp,
      title: 'אופטימיזציה מתמשכת',
      description: 'מעקב אחרי CTR, CPC ו-ROAS עם המלצות שיפור אוטומטיות בזמן אמת.',
    },
  ];

  const adFormats = [
    { format: 'Feed Ads', size: '1:1 (1080x1080)', desc: 'מודעות פיד קלאסיות' },
    { format: 'Story Ads', size: '4:5 (1080x1350)', desc: 'מודעות סטוריז ורילס' },
    { format: 'Carousel', size: 'Multi-image', desc: 'מודעות קרוסלה' },
    { format: 'Video Ads', size: '1:1 / 4:5', desc: 'סקריפטים לווידאו' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="יצירת קמפיינים לפייסבוק ואינסטגרם עם AI"
        description="צור קמפיינים מקצועיים לפייסבוק ואינסטגרם עם AI תוך דקות. קופי בעברית, תמונות בפורמט מושלם, מיקוד קהלים חכם והמלצות תקציב. התחל חינם!"
        keywords="קמפיינים פייסבוק, פרסום פייסבוק, פרסום אינסטגרם, Meta Ads, מודעות פייסבוק, שיווק בפייסבוק, קמפיין AI פייסבוק"
        canonicalUrl="/services/facebook-ads"
        structuredData={structuredData}
      />

      <Navbar />

      {/* Hero */}
      <section className="relative pt-20 sm:pt-28 pb-16 sm:pb-20 px-4 overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
        <div className="absolute top-20 right-10 w-64 sm:w-80 h-64 sm:h-80 bg-blue-400 rounded-full filter blur-3xl opacity-20 animate-float" />
        <div className="absolute bottom-10 left-10 w-64 sm:w-80 h-64 sm:h-80 bg-indigo-400 rounded-full filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '3s' }} />

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center space-y-6">
            <Badge className="text-sm px-5 py-2.5 bg-white/15 backdrop-blur-md border-white/30 text-white">
              Meta Ads | Facebook & Instagram
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight">
              צור קמפיינים מנצחים
              <br />
              <span className="text-blue-200">לפייסבוק ואינסטגרם</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              AI חכם שיוצר קופי מקצועי, תמונות בפורמט מושלם, מיקוד קהלים מדויק והמלצות תקציב - הכל מותאם ל-Meta Ads.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                onClick={() => navigate('/brief')}
                className="text-lg px-10 py-7 rounded-xl bg-white text-blue-700 hover:bg-blue-50 font-bold shadow-2xl hover:scale-105 transition-all"
              >
                <Sparkles className="w-5 h-5 ml-2" />
                צור קמפיין לפייסבוק
              </Button>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-white/70 text-sm">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-green-400" />
                חינם לניסיון
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-green-400" />
                +20 וריאציות מודעות
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-green-400" />
                מוכן תוך 4 דקות
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Formats */}
      <section className="py-16 sm:py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">פורמטים שנתמכים</h2>
            <p className="text-lg text-muted-foreground">כל סוגי המודעות של Meta - מותאמים אוטומטית</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {adFormats.map((item, idx) => (
              <Card key={idx} className="p-5 sm:p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Eye className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-bold mb-1">{item.format}</h3>
                <p className="text-xs text-muted-foreground mb-1">{item.size}</p>
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
            <p className="text-lg text-muted-foreground">כל מה שצריך כדי להצליח בפרסום ב-Meta</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <Card key={idx} className="p-6 sm:p-8 hover:shadow-xl transition-all hover:-translate-y-2">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-5 shadow-lg">
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
          <Card className="p-8 sm:p-12 text-center bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <Users className="w-12 sm:w-16 h-12 sm:h-16 mx-auto mb-6 text-blue-600" />
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              מוכנים להגיע ללקוחות החדשים שלכם?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              צרו קמפיין מקצועי לפייסבוק ואינסטגרם עכשיו - חינם, בלי כרטיס אשראי.
            </p>
            <Button
              size="lg"
              onClick={() => navigate('/brief')}
              className="text-lg px-10 py-7 rounded-xl bg-blue-600 hover:bg-blue-700 shadow-lg hover:scale-105 transition-all"
            >
              <Sparkles className="w-5 h-5 ml-2" />
              צור קמפיין לפייסבוק
              <ArrowRight className="w-5 h-5 mr-2" />
            </Button>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
