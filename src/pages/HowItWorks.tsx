import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';
import { useNavigate } from 'react-router-dom';
import { AnimatedParticles } from '@/components/AnimatedParticles';
import { ChatWidget } from '@/components/ChatWidget';
import {
  CheckCircle,
  ArrowRight,
  Sparkles,
  Zap,
  Target,
  BarChart3,
  Users,
  Globe,
  MessageSquare,
  FileText,
} from 'lucide-react';

export default function HowItWorks() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const steps = [
    {
      number: 1,
      icon: FileText,
      title: 'מלא ברייף קצר',
      description: 'ספר לנו על העסק, הקהל והמטרות שלך בכמה שאלות פשוטות',
      duration: '2 דקות',
      features: ['פרטי מותג', 'קהל יעד', 'מטרות קמפיין', 'תקציב ופלטפורמות'],
    },
    {
      number: 2,
      icon: Sparkles,
      title: 'בינה מלאכותית יוצרת',
      description: 'המערכת שלנו מנתחת את הברייף ויוצרת אסטרטגיה מלאה עם תוכן מותאם',
      duration: '4 דקות',
      features: ['אנליזת קהל יעד', 'כתיבת קופי', 'יצירת תמונות', 'אופטימיזציה לפלטפורמות'],
    },
    {
      number: 3,
      icon: Zap,
      title: 'קבל תוצאות מיידיות',
      description: 'קבל קמפיינים מוכנים לשימוש עם כל הנכסים שאתה צריך',
      duration: 'מיידי',
      features: ['קופי מדויק', 'תמונות מעוצבות', 'הגדרות קהל', 'המלצות תקציב'],
    },
    {
      number: 4,
      icon: Target,
      title: 'השק והתחל למכור',
      description: 'העלה את הקמפיינים לפלטפורמות ועקוב אחרי הביצועים בזמן אמת',
      duration: 'קליק אחד',
      features: ['קופי להעתקה', 'תמונות להורדה', 'מדריכי פלטפורמות', 'דשבורד ניתוח'],
    },
  ];

  const benefits = [
    {
      icon: Zap,
      title: 'חסכון בזמן',
      description: 'מה שלוקח שבועות - מוכן ב-4 דקות',
      metric: '95%',
    },
    {
      icon: Target,
      title: 'דיוק גבוה',
      description: 'אלגוריתמים מבוססי AI שמכירים את הקהל שלך',
      metric: '3x ROI',
    },
    {
      icon: Globe,
      title: 'כיסוי מלא',
      description: 'כל הפלטפורמות במקום אחד',
      metric: '9 פלטפורמות',
    },
    {
      icon: BarChart3,
      title: 'שיפור מתמיד',
      description: 'למידה מהביצועים ושיפור אוטומטי',
      metric: '+250% ROI',
    },
  ];

  const faqs = [
    {
      q: 'האם צריך ידע טכני?',
      a: 'בכלל לא! המערכת מאוד אינטואיטיבית ומדריכה אותך בכל שלב.',
    },
    {
      q: 'כמה זמן לוקח באמת?',
      a: 'מילוי הברייף לוקח 2 דקות, והמערכת מייצרת הכל תוך 4 דקות נוספות.',
    },
    {
      q: 'אני יכול לערוך את התוצאות?',
      a: 'כמובן! כל תוכן שנוצר ניתן לעריכה ולהתאמה אישית.',
    },
    {
      q: 'מה אם אני רוצה לשנות משהו?',
      a: 'אפשר לחזור לברייף, לשנות ולייצר מחדש כמה פעמים שרוצים.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <AnimatedParticles />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
              איך זה עובד?
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              מברייף לקמפיין מוכן ב-4 דקות בלבד
            </p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {steps.map((step, index) => (
              <Card
                key={step.number}
                className={`glass-card p-8 hover:shadow-glow-lg transition-all duration-300 animate-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className={`space-y-4 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-2xl font-bold text-primary">{step.number}</span>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <step.icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>

                    <h3 className="text-3xl font-bold">{step.title}</h3>
                    <p className="text-lg text-muted-foreground">{step.description}</p>

                    <div className="flex items-center gap-2 text-primary">
                      <Zap className="w-5 h-5" />
                      <span className="font-semibold">{step.duration}</span>
                    </div>

                    <div className="space-y-2 pt-4">
                      {step.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-success" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                      <step.icon className="w-32 h-32 text-primary/40" />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">למה בוסטי?</h2>
            <p className="text-xl text-muted-foreground">
              היתרונות שלנו במספרים
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card
                key={benefit.title}
                className="glass-card p-6 text-center hover-scale animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <benefit.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-4xl font-bold gradient-text mb-2">{benefit.metric}</h3>
                <h4 className="text-xl font-semibold mb-2">{benefit.title}</h4>
                <p className="text-muted-foreground">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">שאלות נפוצות</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card
                key={faq.q}
                className="glass-card p-6 animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <h4 className="text-lg font-semibold mb-2 flex items-start gap-2">
                  <MessageSquare className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  {faq.q}
                </h4>
                <p className="text-muted-foreground pr-7">{faq.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 gradient-text">
            מוכן להתחיל?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            הצטרף למאות עסקים שכבר חוסכים זמן ומשיגים תוצאות טובות יותר
          </p>
          <Button size="lg" onClick={() => navigate('/brief')} className="text-lg px-8">
            צור את הקמפיין הראשון שלך
            <ArrowRight className="w-5 h-5 mr-2" />
          </Button>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
}
