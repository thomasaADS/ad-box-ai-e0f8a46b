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
  Video,
  Music,
  Hash,
  Play,
  Users,
} from 'lucide-react';

export default function TikTokAds() {
  const navigate = useNavigate();

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'יצירת קמפיינים לטיקטוק עם AI - A.R.I.A',
    description: 'צור קמפיינים מקצועיים לטיקטוק עם AI. סקריפטים לווידאו, האשטגים, קופי והמלצות תקציב.',
    provider: { '@type': 'Organization', name: 'A.R.I.A' },
  };

  const benefits = [
    {
      icon: Video,
      title: 'סקריפטים לווידאו',
      description: 'AI שכותב סקריפטים מותאמים לווידאו ורטיקלי 9:16 - עם hook חזק ו-CTA ברור.',
    },
    {
      icon: Hash,
      title: 'האשטגים חכמים',
      description: 'מבחר האשטגים טרנדיים ומותאמים לנישה שלך - להגדלת חשיפה אורגנית.',
    },
    {
      icon: Music,
      title: 'המלצות מוזיקה',
      description: 'המלצות לטראקים ואפקטים פופולריים שמתאימים לתוכן שלך.',
    },
    {
      icon: Target,
      title: 'מיקוד דור Z',
      description: 'מיקוד קהלים מדויק לדור Z ומילניאלים - המגע הנכון לכל גיל.',
    },
    {
      icon: TrendingUp,
      title: 'טרנדים חמים',
      description: 'קמפיינים שמתעדכנים לפי הטרנדים האחרונים בטיקטוק.',
    },
    {
      icon: BarChart3,
      title: 'מעקב ביצועים',
      description: 'מעקב אחרי Views, Engagement Rate, CTR ו-Conversions.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="יצירת קמפיינים לטיקטוק עם AI"
        description="צור קמפיינים מקצועיים לטיקטוק עם AI תוך דקות. סקריפטים לווידאו, האשטגים, קופי ממוטב והמלצות תקציב. התחל חינם!"
        keywords="קמפיינים טיקטוק, פרסום טיקטוק, TikTok Ads, מודעות טיקטוק, שיווק טיקטוק, ווידאו פרסומי"
        canonicalUrl="/services/tiktok-ads"
        structuredData={structuredData}
      />

      <Navbar />

      {/* Hero */}
      <section className="relative pt-20 sm:pt-28 pb-16 sm:pb-20 px-4 overflow-hidden bg-gradient-to-br from-gray-900 via-pink-600 to-cyan-500">
        <div className="absolute top-20 right-10 w-64 sm:w-80 h-64 sm:h-80 bg-pink-500 rounded-full filter blur-3xl opacity-20 animate-float" />
        <div className="absolute bottom-10 left-10 w-64 sm:w-80 h-64 sm:h-80 bg-cyan-400 rounded-full filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '3s' }} />

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center space-y-6">
            <Badge className="text-sm px-5 py-2.5 bg-white/15 backdrop-blur-md border-white/30 text-white">
              TikTok Ads | Video Marketing
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight">
              קמפיינים לטיקטוק
              <br />
              <span className="text-pink-200">שהופכים ויראליים</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              AI שיוצר סקריפטים לווידאו טיקטוק, בוחר האשטגים טרנדיים ומייצר קמפיינים שתופסים את העין תוך שניות.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                onClick={() => navigate('/brief')}
                className="text-lg px-10 py-7 rounded-xl bg-white text-gray-900 hover:bg-gray-100 font-bold shadow-2xl hover:scale-105 transition-all"
              >
                <Play className="w-5 h-5 ml-2" />
                צור קמפיין לטיקטוק
              </Button>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-white/70 text-sm">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-green-400" />
                סקריפטים לווידאו
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-green-400" />
                האשטגים טרנדיים
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-green-400" />
                פורמט 9:16
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 sm:py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">מה תקבל?</h2>
            <p className="text-lg text-muted-foreground">הכל כדי לייצר ויראליות בטיקטוק</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <Card key={idx} className="p-6 sm:p-8 hover:shadow-xl transition-all hover:-translate-y-2">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500 to-cyan-500 flex items-center justify-center mb-5 shadow-lg">
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
          <Card className="p-8 sm:p-12 text-center bg-gradient-to-br from-pink-50 to-cyan-50 border-pink-200">
            <Users className="w-12 sm:w-16 h-12 sm:h-16 mx-auto mb-6 text-pink-600" />
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              מוכנים להגיע לדור הבא?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              צרו קמפיין טיקטוק מקצועי עכשיו - חינם, עם סקריפטים מותאמים לווידאו.
            </p>
            <Button
              size="lg"
              onClick={() => navigate('/brief')}
              className="text-lg px-10 py-7 rounded-xl bg-gray-900 hover:bg-gray-800 shadow-lg hover:scale-105 transition-all"
            >
              <Sparkles className="w-5 h-5 ml-2" />
              צור קמפיין לטיקטוק
              <ArrowRight className="w-5 h-5 mr-2" />
            </Button>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
