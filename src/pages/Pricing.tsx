import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/hooks/useTranslation';
import { useNavigate } from 'react-router-dom';
import { AnimatedParticles } from '@/components/AnimatedParticles';
import { ChatWidget } from '@/components/ChatWidget';
import {
  Check,
  X,
  Sparkles,
  Zap,
  Crown,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';
import { useState } from 'react';

export default function Pricing() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'סטרטר',
      price: billingPeriod === 'monthly' ? '$99' : '$79',
      period: billingPeriod === 'monthly' ? 'לחודש' : 'לחודש (חיוב שנתי)',
      description: 'מושלם לעסקים קטנים שרוצים להתחיל',
      icon: Zap,
      color: 'from-blue-500/20 to-cyan-500/20',
      features: [
        { text: '5 קמפיינים בחודש', included: true },
        { text: '3 פלטפורמות', included: true },
        { text: 'תמיכה בסיסית', included: true },
        { text: 'אנליטיקס בסיסי', included: true },
        { text: 'תבניות מוכנות', included: true },
        { text: 'A/B Testing', included: false },
        { text: 'תמיכה VIP', included: false },
        { text: 'אינטגרציות מתקדמות', included: false },
      ],
      cta: 'התחל עכשיו',
      popular: false,
    },
    {
      name: 'פרו',
      price: billingPeriod === 'monthly' ? '$299' : '$249',
      period: billingPeriod === 'monthly' ? 'לחודש' : 'לחודש (חיוב שנתי)',
      description: 'הבחירה הכי פופולרית לעסקים בצמיחה',
      icon: Sparkles,
      color: 'from-purple-500/20 to-pink-500/20',
      features: [
        { text: 'קמפיינים ללא הגבלה', included: true },
        { text: 'כל הפלטפורמות (9)', included: true },
        { text: 'תמיכה עדיפות', included: true },
        { text: 'אנליטיקס מתקדם', included: true },
        { text: 'תבניות מותאמות אישית', included: true },
        { text: 'A/B Testing', included: true },
        { text: 'אינטגרציות מתקדמות', included: true },
        { text: 'תמיכה VIP', included: false },
      ],
      cta: 'נסה 14 יום חינם',
      popular: true,
    },
    {
      name: 'אנטרפרייז',
      price: 'מותאם',
      period: 'לפי צרכים',
      description: 'פתרון מותאם לארגונים גדולים',
      icon: Crown,
      color: 'from-amber-500/20 to-orange-500/20',
      features: [
        { text: 'הכל מתוכנית פרו', included: true },
        { text: 'תמיכה VIP 24/7', included: true },
        { text: 'מנהל חשבון ייעודי', included: true },
        { text: 'אינטגרציות מותאמות', included: true },
        { text: 'אימונים והדרכות', included: true },
        { text: 'SLA מובטח', included: true },
        { text: 'API גישה', included: true },
        { text: 'דוחות מותאמים אישית', included: true },
      ],
      cta: 'צור קשר',
      popular: false,
    },
  ];

  const comparisonFeatures = [
    {
      category: 'יצירת תוכן',
      features: [
        { name: 'קמפיינים בחודש', starter: '5', pro: 'ללא הגבלה', enterprise: 'ללא הגבלה' },
        { name: 'פלטפורמות', starter: '3', pro: '9', enterprise: '9' },
        { name: 'תמונות AI', starter: '20', pro: '200', enterprise: 'ללא הגבלה' },
        { name: 'וריאנטים לקמפיין', starter: '3', pro: '10', enterprise: 'מותאם' },
      ],
    },
    {
      category: 'ניתוח ודיווח',
      features: [
        { name: 'אנליטיקס', starter: 'בסיסי', pro: 'מתקדם', enterprise: 'מותאם אישית' },
        { name: 'דוחות', starter: 'שבועי', pro: 'יומי', enterprise: 'בזמן אמת' },
        { name: 'A/B Testing', starter: '✗', pro: '✓', enterprise: '✓' },
      ],
    },
    {
      category: 'תמיכה ושירות',
      features: [
        { name: 'תמיכה', starter: 'אימייל', pro: 'אימייל + צ\'אט', enterprise: '24/7 VIP' },
        { name: 'זמן תגובה', starter: '48 שעות', pro: '24 שעות', enterprise: '1 שעה' },
        { name: 'מנהל חשבון', starter: '✗', pro: '✗', enterprise: '✓' },
      ],
    },
  ];

  const faqs = [
    {
      q: 'איך עובד התשלום?',
      a: 'אפשר לשלם חודשי או שנתי. תשלום שנתי כולל הנחה של 20%. מקבלים חשבונית לכל תשלום.',
    },
    {
      q: 'אפשר לבטל בכל רגע?',
      a: 'כן! אין מחויבות. אפשר לבטל בכל עת ולא נחייב יותר מהחודש הנוכחי.',
    },
    {
      q: 'מה קורה אם עברתי את המכסה?',
      a: 'בתוכנית סטרטר, צריך לשדרג או לחכות לחודש הבא. בפרו - אין מגבלה.',
    },
    {
      q: 'יש תקופת ניסיון?',
      a: 'תוכנית פרו כוללת 14 יום ניסיון חינם. ניתן לבטל בכל עת.',
    },
    {
      q: 'מה כולל אנטרפרייז?',
      a: 'פתרון מותאם אישית לארגון - אינטגרציות, הדרכות, תמיכה VIP ועוד. צרו קשר לפרטים.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <AnimatedParticles />

      {/* Hero */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-fade-in">
            <Badge className="mb-4">תמחור שקוף וגמיש</Badge>
            <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
              בחר את התוכנית שמתאימה לך
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              התחל חינם, שדרג כשאתה מוכן. ללא הפתעות.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-2 p-1 bg-muted rounded-lg">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`px-6 py-2 rounded-md transition-all ${
                  billingPeriod === 'monthly' ? 'bg-background shadow-sm' : ''
                }`}
              >
                חודשי
              </button>
              <button
                onClick={() => setBillingPeriod('yearly')}
                className={`px-6 py-2 rounded-md transition-all ${
                  billingPeriod === 'yearly' ? 'bg-background shadow-sm' : ''
                }`}
              >
                שנתי
                <Badge variant="secondary" className="mr-2">
                  -20%
                </Badge>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card
                key={plan.name}
                className={`glass-card p-8 relative hover-scale animate-fade-in ${
                  plan.popular ? 'border-2 border-primary shadow-glow-lg' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 right-1/2 translate-x-1/2">
                    הכי פופולרי
                  </Badge>
                )}

                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4`}>
                  <plan.icon className="w-8 h-8 text-primary" />
                </div>

                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground mb-4">{plan.description}</p>

                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== 'מותאם' && (
                    <span className="text-muted-foreground"> / {plan.period}</span>
                  )}
                </div>

                <Button
                  className="w-full mb-6"
                  variant={plan.popular ? 'default' : 'outline'}
                  onClick={() => navigate('/brief')}
                >
                  {plan.cta}
                </Button>

                <div className="space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature.text} className="flex items-start gap-2">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      )}
                      <span className={feature.included ? '' : 'text-muted-foreground'}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">השוואת תוכניות</h2>
            <p className="text-xl text-muted-foreground">
              כל הפרטים במקום אחד
            </p>
          </div>

          <Card className="glass-card overflow-hidden max-w-4xl mx-auto">
            {comparisonFeatures.map((section, sectionIndex) => (
              <div key={section.category} className={sectionIndex > 0 ? 'border-t border-border' : ''}>
                <div className="bg-muted/50 p-4">
                  <h3 className="font-semibold text-lg">{section.category}</h3>
                </div>
                {section.features.map((feature, featureIndex) => (
                  <div
                    key={feature.name}
                    className={`grid grid-cols-4 gap-4 p-4 ${
                      featureIndex % 2 === 0 ? 'bg-muted/20' : ''
                    }`}
                  >
                    <div className="font-medium">{feature.name}</div>
                    <div className="text-center">{feature.starter}</div>
                    <div className="text-center font-semibold text-primary">{feature.pro}</div>
                    <div className="text-center">{feature.enterprise}</div>
                  </div>
                ))}
              </div>
            ))}
          </Card>
        </div>
      </section>

      {/* FAQ */}
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
                  <HelpCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  {faq.q}
                </h4>
                <p className="text-muted-foreground pr-7">{faq.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 gradient-text">
            עדיין לא בטוח?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            נסה את תוכנית הפרו חינם ל-14 יום. ללא כרטיס אשראי.
          </p>
          <Button size="lg" onClick={() => navigate('/brief')} className="text-lg px-8">
            התחל ניסיון חינם
            <ArrowRight className="w-5 h-5 mr-2" />
          </Button>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
}
