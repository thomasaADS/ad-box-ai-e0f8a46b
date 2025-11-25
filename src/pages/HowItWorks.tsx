import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';
import { useNavigate } from 'react-router-dom';
import { AnimatedParticles } from '@/components/AnimatedParticles';
import { ChatWidget } from '@/components/ChatWidget';
import { useState, useRef, useEffect } from 'react';
import {
  CheckCircle,
  ArrowRight,
  Sparkles,
  Zap,
  Target,
  BarChart3,
  Rocket,
  Clock,
  TrendingUp,
  Play,
  Brain,
  Palette,
  Send,
} from 'lucide-react';

export default function HowItWorks() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  const steps = [
    {
      number: 1,
      title: 'ספר לנו על העסק שלך',
      subtitle: '2 דקות של שאלות פשוטות',
      description: 'מלא ברייף קצר עם פרטים בסיסיים על העסק, הקהל והמטרות שלך',
      detailedDesc: 'שם העסק, מה אתה מוכר, איזה עיר, מה המבצע שלך. המערכת לוקחת את המידע הזה ומנתחת אותו.',
      duration: '2 דקות',
      color: 'from-indigo-600 to-blue-600',
      features: [
        { text: 'פרטי העסק והמותג' },
        { text: 'קהל יעד וממוקדות גיאוגרפית' },
        { text: 'תקציב ומטרות שיווקיות' },
        { text: 'בחירת פלטפורמות מועדפות' },
      ],
      stats: { value: '4', label: 'שאלות בלבד' },
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&auto=format&fit=crop&q=80',
    },
    {
      number: 2,
      title: 'בינה מלאכותית עובדת',
      subtitle: 'טכנולוגיה מתקדמת במהירות אור',
      description: 'המערכת מנתחת את הברייף ומייצרת אסטרטגיה שיווקית מלאה',
      detailedDesc: 'GPT-4 כותב קופי ממיר, DALL-E יוצר תמונות מותאמות, והמערכת שלנו מייצרת עשרות וריאציות מותאמות לכל פלטפורמה.',
      duration: '3-5 דקות',
      color: 'from-purple-600 to-pink-600',
      features: [
        { text: 'כתיבת קופי ברמה מקצועית' },
        { text: 'יצירת תמונות בעיצוב מותאם' },
        { text: 'אופטימיזציה לכל פלטפורמה' },
        { text: 'בניית אסטרטגיה מבוססת נתונים' },
      ],
      stats: { value: '20+', label: 'וריאציות מוכנות' },
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&auto=format&fit=crop&q=80',
    },
    {
      number: 3,
      title: 'בחר את הווריאציות הטובות ביותר',
      subtitle: 'גלריה מלאה של מודעות מוכנות',
      description: 'עבור על כל הווריאציות, בחר את המועדפות, ערוך במידת הצורך',
      detailedDesc: 'כל מודעה כוללת קופי, תמונה, הגדרות קהל מדויקות, והמלצות לתקציב. הכל מוכן להעתקה ושימוש.',
      duration: 'דקה לסקירה',
      color: 'from-orange-600 to-red-600',
      features: [
        { text: 'קופי להעתקה בקליק אחד' },
        { text: 'תמונות להורדה בכל הגדלים' },
        { text: 'הגדרות קהל יעד מדויקות' },
        { text: 'טיפים מקצועיים לשיפור' },
      ],
      stats: { value: '1-Click', label: 'העתקה מהירה' },
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
    },
    {
      number: 4,
      title: 'פרסם ותראה תוצאות',
      subtitle: 'העתק למנהלי המודעות והשק',
      description: 'העתק את המודעות לפלטפורמות השיווק שלך ותתחיל לראות תוצאות',
      detailedDesc: 'ב-72% מהמקרים המודעות הראשונות כבר מביאות תוצאות מצוינות. המערכת נותנת לך מספיק וריאציות לבדיקה ואופטימיזציה.',
      duration: 'תוצאות תוך 24-48 שעות',
      color: 'from-green-600 to-emerald-600',
      features: [
        { text: 'מדריכי פרסום לכל פלטפורמה' },
        { text: 'מעקב וניתוח ביצועים' },
        { text: 'שיפור מתמיד עם A/B testing' },
        { text: 'תמיכה וליווי אישי' },
      ],
      stats: { value: '3x', label: 'תשואה ממוצעת' },
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80',
    },
  ];

  // Scroll-based animation
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      stepsRef.current.forEach((ref, index) => {
        if (ref) {
          const { offsetTop, offsetHeight } = ref;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveStep(index);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const realResults = [
    {
      business: 'קפה השכונה',
      industry: 'בית קפה',
      before: '₪2,400 / חודש בפרסום',
      after: '₪8,200 הכנסה נוספת',
      improvement: '+240%',
      quote: 'תוך שבוע כבר ראיתי תור ארוך יותר. המודעות פשוט עובדות!',
    },
    {
      business: 'נויה ביוטי',
      industry: 'סטודיו יופי',
      before: '5 לקוחות חדשים בחודש',
      after: '23 לקוחות חדשים בחודש',
      improvement: '+360%',
      quote: 'התורים מלאים לשבועיים קדימה. תודה AdSync!',
    },
    {
      business: 'שרברבות אקספרס',
      industry: 'שירות שרברבות',
      before: 'פרסום לא עבד',
      after: '47 פניות בשבוע',
      improvement: 'x10',
      quote: 'פעם ראשונה שפרסום באמת מביא לי לידים איכותיים',
    },
  ];

  const processFeatures = [
    {
      icon: Clock,
      title: 'חסכת 10 שעות',
      description: 'מה שמעצב גרפי + קופירייטר + מנהל קמפיין היו עושים שבוע - תוכנית זה עושה ב-5 דקות',
    },
    {
      icon: Brain,
      title: 'חכם יותר מבן אדם',
      description: 'המערכת למדה מ-100,000+ קמפיינים מצליחים. היא יודעת מה עובד ומה לא',
    },
    {
      icon: Target,
      title: 'מדויק לקהל שלך',
      description: 'לא "one size fits all". כל מודעה מותאמת בדיוק לגיל, מיקום, תחומי עניין של הקהל שלך',
    },
    {
      icon: TrendingUp,
      title: 'משתפר כל הזמן',
      description: 'ככל שיותר עסקים משתמשים, המערכת לומדת ומשתפרת. אתה מקבל תובנות עדכניות',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <AnimatedParticles />

      {/* Hero Section - עם countdown */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-950 rounded-full mb-6 animate-bounce">
              <Rocket className="w-5 h-5 text-indigo-600" />
              <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                מברייף לקמפיין ב-7 דקות בלבד
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-6">
              איך{' '}
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                AdSync
              </span>{' '}
              עובד?
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              מפסיק לזרוק כסף על מודעות שלא עובדות.<br/>
              <span className="font-semibold text-foreground">תן ל-AI לעשות את העבודה המלוכלכת בשבילך</span>
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-12">
              {[
                { value: '2', label: 'דקות להתחיל' },
                { value: '7', label: 'דקות סה"כ' },
                { value: '20+', label: 'מודעות מוכנות' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            <Button 
              size="lg" 
              onClick={() => navigate('/brief')}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all"
            >
              <Play className="w-5 h-5 mr-2" />
              בוא נתחיל, זה חינם
            </Button>
          </div>
        </div>
      </section>

      {/* Timeline Section - גלילה */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">

            {/* Steps - Scroll through */}
            <div className="space-y-32">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  ref={(el) => (stepsRef.current[index] = el)}
                  className="min-h-screen flex items-center"
                >
                  <Card className={`p-12 border-2 transition-all duration-500 ${
                    index === activeStep 
                      ? 'border-indigo-500 shadow-2xl shadow-indigo-500/20 scale-100' 
                      : 'border-border shadow-lg opacity-60 scale-95'
                  }`}>
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                      {/* Content */}
                      <div className={`space-y-6 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                        <div className="flex items-center gap-4">
                          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center text-white text-2xl font-black shadow-lg`}>
                            {step.number}
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground mb-1">שלב {step.number}</div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="w-4 h-4" />
                              <span>{step.duration}</span>
                            </div>
                          </div>
                        </div>
                        
                        <h2 className="text-4xl md:text-5xl font-black leading-tight">
                          {step.title}
                        </h2>
                        
                        <p className="text-xl text-muted-foreground font-medium">
                          {step.subtitle}
                        </p>
                        
                        <p className="text-lg text-muted-foreground leading-relaxed">
                          {step.detailedDesc}
                        </p>

                        {/* Features List */}
                        <div className="space-y-3 py-4">
                          {step.features.map((feature, i) => (
                            <div key={i} className="flex items-center gap-3 text-sm">
                              <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center flex-shrink-0`}>
                                <CheckCircle className="w-4 h-4 text-white" />
                              </div>
                              <span className="font-medium">{feature.text}</span>
                            </div>
                          ))}
                        </div>

                        {/* Stats Badge */}
                        <div className={`inline-flex items-center gap-4 px-6 py-4 rounded-2xl bg-gradient-to-r ${step.color} text-white shadow-lg`}>
                          <div className="text-4xl font-black">{step.stats.value}</div>
                          <div className="text-sm font-semibold border-r border-white/30 pr-4">{step.stats.label}</div>
                        </div>
                      </div>

                      {/* Image */}
                      <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                        <div className="relative group">
                          <div className={`absolute -inset-4 bg-gradient-to-r ${step.color} rounded-3xl blur-2xl opacity-25 group-hover:opacity-40 transition-opacity`} />
                          <img
                            src={step.image}
                            alt={step.title}
                            className="relative w-full aspect-[4/3] object-cover rounded-2xl shadow-2xl"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-2xl" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why It Works - תכונות המערכת */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              למה זה עובד <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">כל כך טוב?</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              זה לא קסם, זה מדע. וקצת קסם.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {processFeatures.map((feature, index) => (
              <Card
                key={index}
                className="p-8 hover:shadow-2xl transition-all duration-300 border-2 hover:border-indigo-500 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Real Results - Social Proof */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              תוצאות <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">אמיתיות</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              עסקים אמיתיים, תוצאות אמיתיות, בתוך ימים ספורים
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {realResults.map((result, index) => (
              <Card
                key={index}
                className="p-8 hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-bl-full transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform" />
                
                <div className="relative">
                  <div className="text-5xl mb-4">{result.avatar}</div>
                  <h3 className="text-xl font-bold mb-1">{result.business}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{result.industry}</p>
                  
                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">לפני:</span>
                      <span className="font-semibold">{result.before}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">אחרי:</span>
                      <span className="font-semibold text-green-600">{result.after}</span>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-950 rounded-full mb-4">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="font-bold text-green-600">{result.improvement}</span>
                  </div>

                  <blockquote className="text-sm italic text-muted-foreground border-r-4 border-indigo-500 pr-4">
                    "{result.quote}"
                  </blockquote>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iLjA1IiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+')] opacity-20" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto text-white">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full mb-8">
              <Sparkles className="w-5 h-5" />
              <span className="font-semibold">מוכן להצטרף ל-1,200+ עסקים מצליחים?</span>
            </div>

            <h2 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              תפסיק לבזבז כסף.<br/>
              תתחיל להרוויח.
            </h2>
            
            <p className="text-2xl mb-12 opacity-90">
              7 דקות מהיום שלך = קמפיינים שעובדים חודשים
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={() => navigate('/brief')}
                className="bg-white text-indigo-600 hover:bg-gray-100 text-xl px-12 py-8 shadow-2xl font-bold"
              >
                <Rocket className="w-6 h-6 mr-2" />
                בוא נתחיל עכשיו - חינם!
              </Button>
              
              <Button
                size="lg"
                onClick={() => navigate('/pricing')}
                className="bg-indigo-600 text-white hover:bg-indigo-700 text-xl px-12 py-8 shadow-2xl font-bold border-2 border-white"
              >
                רוצה לראות מחירים?
              </Button>
            </div>

            <p className="text-sm mt-8 opacity-75">
              💳 לא צריך כרטיס אשראי • ⚡ תוצאות מיידיות • 🎯 100% בעברית
            </p>
          </div>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
}
