import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { SEOHead } from '@/components/SEOHead';
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
} from 'lucide-react';

const HomeAlt = () => {
  const navigate = useNavigate();

  const stats = [
    { value: '10,000+', label: 'קמפיינים נוצרו', icon: Zap },
    { value: '$5M+', label: 'תקציב מנוהל', icon: TrendingUp },
    { value: '250%', label: 'ROI ממוצע', icon: Target },
    { value: '4 דק\'', label: 'זמן יצירה ממוצע', icon: Clock },
  ];

  const features = [
    {
      icon: Sparkles,
      title: 'יצירה חכמה עם AI',
      description: 'AI מתקדם שיוצר קופי, תמונות ואסטרטגיית פרסום ממוטבת - מותאם לכל פלטפורמה ולכל קהל יעד.',
      gradient: 'from-purple-500 to-blue-500',
    },
    {
      icon: Target,
      title: 'מיקוד קהלים מדויק',
      description: 'הגדרות קהל יעד חכמות מבוססות AI שמזהות ומביאות את הלקוחות הנכונים אליך.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Globe,
      title: '7+ פלטפורמות פרסום',
      description: 'כיסוי מלא: Meta, Google, TikTok, LinkedIn, Taboola, Outbrain, SMS, Email ועוד.',
      gradient: 'from-cyan-500 to-teal-500',
    },
    {
      icon: BarChart3,
      title: 'דשבורד אנליטי בזמן אמת',
      description: 'עקוב אחרי כל המספרים במקום אחד - CTR, CPC, ROAS, לידים ומכירות בזמן אמת.',
      gradient: 'from-teal-500 to-green-500',
    },
    {
      icon: Layout,
      title: 'בונה דפי נחיתה AI',
      description: 'צור דפי נחיתה מקצועיים עם AI - כולל תמונות, טקסטים ו-CTA ממוטבים.',
      gradient: 'from-orange-500 to-pink-500',
    },
    {
      icon: Shield,
      title: 'אופטימיזציה אוטומטית',
      description: 'המערכת לומדת ומשפרת את הקמפיינים שלך אוטומטית על בסיס ביצועים בזמן אמת.',
      gradient: 'from-pink-500 to-purple-500',
    },
  ];

  const testimonials = [
    {
      name: 'דנה לוי',
      role: 'מנכ"לית',
      company: 'StartHub',
      text: 'חסכנו 80% מהזמן ביצירת קמפיינים והתוצאות השתפרו פי 3. AdSync שינתה לנו את כללי המשחק.',
      rating: 5,
      metric: '+320% ROI',
    },
    {
      name: 'רון כהן',
      role: 'מנהל שיווק',
      company: 'TechFlow',
      text: 'הפלטפורמה הכי אינטואיטיבית שעבדתי איתה. תוצאות מיידיות, בלי ליאזר עם מעצבים ואנשי תוכן.',
      rating: 5,
      metric: '-75% עלויות',
    },
    {
      name: 'מיכל אברהם',
      role: 'מייסדת',
      company: 'EcoStyle',
      text: 'השקנו 12 קמפיינים ב-5 דקות. מה שלקח לנו שבוע עכשיו לוקח דקות בודדות.',
      rating: 5,
      metric: '12x מהיר יותר',
    },
  ];

  const platforms = [
    { name: 'Meta', color: 'bg-blue-600' },
    { name: 'Google', color: 'bg-red-500' },
    { name: 'TikTok', color: 'bg-gray-900' },
    { name: 'LinkedIn', color: 'bg-blue-700' },
    { name: 'Taboola', color: 'bg-orange-500' },
    { name: 'Email', color: 'bg-green-600' },
    { name: 'SMS', color: 'bg-purple-600' },
  ];

  const howItWorks = [
    {
      step: '01',
      title: 'ספר לנו על העסק',
      description: 'שיחה קצרה עם AI חכם שמבין בדיוק מה אתה צריך',
      icon: MessageSquare,
    },
    {
      step: '02',
      title: 'AI יוצר את הקמפיין',
      description: 'קופי, תמונות, אסטרטגיה וממוטב - הכל אוטומטי',
      icon: Sparkles,
    },
    {
      step: '03',
      title: 'קבל קמפיינים מוכנים',
      description: '+20 וריאציות מוכנות לפרסום בכל הפלטפורמות',
      icon: Zap,
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
        title="AdSync - פלטפורמת AI ליצירת קמפיינים פרסומיים מקצועיים"
        description="צור קמפיינים פרסומיים מקצועיים עם AI תוך דקות. Meta, Google, TikTok, LinkedIn ועוד. חיסכון של 80% בזמן, ROI של 250%. התחל חינם!"
        keywords="קמפיינים פרסומיים, AI שיווק, פרסום דיגיטלי, פרסום פייסבוק, פרסום גוגל, דף נחיתה, שיווק דיגיטלי"
        canonicalUrl="/"
        structuredData={structuredData}
      />

      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24 px-4 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#667eea] via-[#764ba2] to-[#f093fb]" />

        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-10 w-64 sm:w-96 h-64 sm:h-96 bg-purple-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-30 animate-float" />
        <div className="absolute top-40 right-10 w-64 sm:w-96 h-64 sm:h-96 bg-blue-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 left-1/2 w-64 sm:w-96 h-64 sm:h-96 bg-pink-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '4s' }} />

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center space-y-6 sm:space-y-8">
            {/* Top Badge */}
            <div className="inline-block animate-bounce-in">
              <Badge
                className="text-sm sm:text-base font-medium px-5 sm:px-7 py-2.5 sm:py-3 border-2 hover:scale-105 transition-transform cursor-default"
                style={{
                  color: '#00C4B4',
                  borderColor: '#00C4B4',
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(20px)'
                }}
              >
                הפלטפורמה #1 בישראל ליצירת קמפיינים עם AI
              </Badge>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] animate-fade-in text-white drop-shadow-2xl">
              צור קמפיינים מנצחים
              <br />
              <span className="bg-gradient-to-r from-cyan-300 to-white bg-clip-text text-transparent">
                עם AI תוך דקות
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl md:text-2xl leading-relaxed mx-auto max-w-3xl animate-slide-up text-white/95 drop-shadow-lg" style={{ animationDelay: '0.2s' }}>
              קופי מקצועי, תמונות מדהימות ואסטרטגיית פרסום מותאמת לכל פלטפורמה - הכל אוטומטי.
            </p>

            {/* Platform Tags */}
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center pt-2 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              {platforms.map((platform) => (
                <span
                  key={platform.name}
                  className={`${platform.color} text-white text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-medium shadow-lg`}
                >
                  {platform.name}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center pt-6 sm:pt-8 animate-scale-in" style={{ animationDelay: '0.5s' }}>
              <Button
                size="lg"
                onClick={() => navigate('/brief')}
                className="text-lg sm:text-xl px-10 sm:px-14 py-7 sm:py-8 rounded-2xl font-bold border-0 hover:opacity-95 transition-all hover:scale-105 shadow-2xl group relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #00C4B4 0%, #7A3EFA 100%)',
                  color: 'white'
                }}
              >
                <span className="relative z-10 flex items-center gap-3">
                  <Sparkles className="w-5 h-5" />
                  צור קמפיין חינם
                  <ArrowRight className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                </span>
              </Button>
              <Button
                size="lg"
                onClick={() => navigate('/how-it-works')}
                className="text-base sm:text-lg px-8 sm:px-12 py-7 sm:py-8 rounded-2xl font-semibold border-2 hover:scale-105 transition-all"
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(10px)',
                  borderColor: 'rgba(255,255,255,0.3)',
                  color: 'white'
                }}
              >
                <Play className="w-5 h-5" />
                איך זה עובד?
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-4 text-white/80 text-sm">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-green-400" />
                ללא כרטיס אשראי
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-green-400" />
                תוצאות תוך 4 דקות
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-green-400" />
                1,000+ עסקים מרוצים
              </span>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 pt-8 sm:pt-12">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="text-center p-4 sm:p-6 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all hover:scale-105"
                  >
                    <Icon className="w-6 sm:w-8 h-6 sm:h-8 mx-auto mb-2 sm:mb-3 text-cyan-300" />
                    <div className="text-2xl sm:text-3xl font-bold mb-1 text-white">{stat.value}</div>
                    <div className="text-xs sm:text-sm text-white/70">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 sm:py-20 md:py-24 px-4 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 sm:mb-16">
            <Badge variant="secondary" className="mb-4 text-sm">
              <Zap className="w-3 h-3 ml-1" />
              תהליך פשוט ומהיר
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 gradient-text">
              מקמפיין לתוצאות ב-3 צעדים
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              ככה פשוט זה לעבוד עם AdSync
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {howItWorks.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="relative">
                  <Card className="p-6 sm:p-8 text-center hover:shadow-xl transition-all hover:-translate-y-2 h-full border-2 border-transparent hover:border-primary/20">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center relative">
                      <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center shadow-lg">
                        {item.step}
                      </span>
                      <Icon className="w-8 sm:w-10 h-8 sm:h-10 text-primary" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-3">{item.title}</h3>
                    <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">{item.description}</p>
                  </Card>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 -left-4 transform -translate-y-1/2">
                      <ChevronLeft className="w-8 h-8 text-primary/30" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center mt-10 sm:mt-12">
            <Button
              size="lg"
              onClick={() => navigate('/how-it-works')}
              variant="outline"
              className="text-base sm:text-lg px-8 py-6 rounded-xl hover:scale-105 transition-all"
            >
              גלה איך זה עובד בפירוט
              <ArrowRight className="w-5 h-5 mr-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 sm:mb-16">
            <Badge variant="secondary" className="mb-4 text-sm">
              <Layers className="w-3 h-3 ml-1" />
              יכולות הפלטפורמה
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">למה AdSync?</h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              כל מה שצריך כדי להצליח בשיווק דיגיטלי - במקום אחד
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="p-6 sm:p-8 hover:shadow-xl transition-all hover:-translate-y-2 border-2 border-transparent hover:border-primary/20 group"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Landing Page Builder CTA */}
      <section className="py-16 sm:py-20 px-4 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5">
        <div className="container mx-auto max-w-5xl">
          <Card className="p-8 sm:p-12 border-2 border-primary/20 hover:border-primary/30 transition-all overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary" />
            <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-10">
              <div className="flex-1 text-center lg:text-right">
                <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                  <Wand2 className="w-3 h-3 ml-1" />
                  חדש!
                </Badge>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  בנה דף נחיתה מקצועי עם AI
                </h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  סוכן AI חכם שבונה דפי נחיתה מותאמים אישית - כולל תמונות מקוריות, טקסטים שיווקיים ו-CTA ממוטבים. תוך 5 דקות בלבד.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button
                    size="lg"
                    onClick={() => navigate('/landing-page-builder')}
                    className="text-lg px-8 py-6 rounded-xl shadow-lg hover:scale-105 transition-transform group"
                  >
                    <Wand2 className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
                    בנה דף נחיתה עכשיו
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => navigate('/services/landing-pages')}
                    className="text-lg px-8 py-6 rounded-xl"
                  >
                    למד עוד
                  </Button>
                </div>
              </div>
              <div className="w-48 sm:w-64 h-48 sm:h-64 rounded-2xl bg-gradient-to-br from-primary via-accent to-primary/50 flex items-center justify-center shadow-2xl shrink-0">
                <div className="text-center text-white">
                  <Layout className="w-16 sm:w-20 h-16 sm:h-20 mx-auto mb-2 opacity-80" />
                  <div className="flex items-center gap-1 justify-center">
                    <Monitor className="w-4 h-4" />
                    <Smartphone className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 sm:mb-16">
            <Badge variant="secondary" className="mb-4 text-sm">
              <Users className="w-3 h-3 ml-1" />
              מה הלקוחות אומרים
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">סיפורי הצלחה אמיתיים</h2>
            <p className="text-lg text-muted-foreground">
              מעל 1,000 עסקים כבר משתמשים ב-AdSync
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 sm:p-8 hover:shadow-xl transition-all hover:-translate-y-2 relative">
                {/* Metric Badge */}
                <div className="absolute -top-3 left-6">
                  <Badge className="bg-green-500 text-white border-0 shadow-lg text-sm font-bold">
                    {testimonial.metric}
                  </Badge>
                </div>

                <div className="flex gap-1 mb-4 pt-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 text-base sm:text-lg leading-relaxed">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="border-t pt-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role} | {testimonial.company}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-16 sm:py-20 md:py-24 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">תמחור פשוט ושקוף</h2>
            <p className="text-lg sm:text-xl text-muted-foreground">
              בחר את התוכנית המתאימה לך - התחל חינם
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                name: 'סטרטר',
                price: '$99',
                period: 'לחודש',
                features: ['5 קמפיינים בחודש', '3 פלטפורמות', 'תמיכה בסיסית', 'אנליטיקס בסיסי'],
                popular: false,
              },
              {
                name: 'פרו',
                price: '$299',
                period: 'לחודש',
                features: ['קמפיינים ללא הגבלה', 'כל הפלטפורמות', 'תמיכה 24/7', 'אנליטיקס מתקדם', 'A/B Testing'],
                popular: true,
              },
              {
                name: 'אנטרפרייז',
                price: 'מותאם',
                period: 'מחיר אישי',
                features: ['הכל מ-Pro', 'מנהל חשבון ייעודי', 'API מלא', 'הכשרות צוות', 'SLA מובטח'],
                popular: false,
              },
            ].map((plan, index) => (
              <Card
                key={index}
                className={`p-6 sm:p-8 relative hover:shadow-xl transition-all hover:-translate-y-2 ${
                  plan.popular
                    ? 'border-primary border-2 shadow-lg ring-4 ring-primary/10'
                    : ''
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 shadow-lg">
                    <Sparkles className="w-3 h-3 ml-1" />
                    הכי פופולרי
                  </Badge>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold gradient-text">{plan.price}</span>
                  <span className="text-muted-foreground text-sm mr-2"> {plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full py-6 text-base"
                  variant={plan.popular ? 'default' : 'outline'}
                  onClick={() => navigate('/brief')}
                >
                  התחל עכשיו
                  <ArrowRight className="w-4 h-4 mr-2" />
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
              <ArrowRight className="w-4 h-4 mr-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-20 md:py-24 px-4 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto max-w-4xl">
          <Card className="p-8 sm:p-12 text-center border-primary/20 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary" />
            <MousePointerClick className="w-12 sm:w-16 h-12 sm:h-16 mx-auto mb-6 text-primary" />
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              מוכנים להתחיל?
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              צור את הקמפיין הראשון שלך בפחות מ-4 דקות. ללא כרטיס אשראי, ללא התחייבות.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => navigate('/brief')}
                className="text-lg px-10 py-7 rounded-xl shadow-lg hover:scale-105 transition-all"
              >
                <Sparkles className="w-5 h-5 ml-2" />
                יצירת קמפיין חינם
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/landing-page-builder')}
                className="text-lg px-10 py-7 rounded-xl"
              >
                <Layout className="w-5 h-5 ml-2" />
                בנה דף נחיתה
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomeAlt;
