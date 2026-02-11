import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Sparkles, ArrowLeft, Crown } from 'lucide-react';

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, isVisible };
}

const plans = [
  {
    name: 'חודשי',
    price: '149',
    originalPrice: '399',
    period: 'לחודש',
    saveBadge: 'חסוך 60%',
    description: 'מושלם לעסקים שרוצים להתחיל עם AI',
    features: [
      'הקמת קמפיין ב-10 דקות',
      'מחקר קהלים AI',
      'יצירת קריאייטיב אוטומטי',
      'אופטימיזציה 24/7',
      'דוחות וניתוחים',
      'תמיכה בעברית',
    ],
    limitations: ['חשבון פייסבוק אחד', 'תקציב יומי עד ₪500'],
    popular: true,
    cta: 'התחל עכשיו',
  },
  {
    name: 'Enterprise',
    price: 'מותאם אישית',
    period: '',
    description: 'לארגונים עם צרכים מורכבים',
    features: [
      'כל התכונות של התוכנית החודשית',
      'ללא הגבלת חשבונות',
      'ללא הגבלת תקציב',
      'ייעוץ אישי מצוות מומחים',
      'מנהל חשבון ייעודי',
      'API מלא',
      'SLA מובטח',
    ],
    limitations: [],
    popular: false,
    cta: 'צור קשר',
  },
];

export function PricingSection() {
  const navigate = useNavigate();
  const reveal = useScrollReveal();

  return (
    <section
      ref={reveal.ref}
      id="pricing"
      className={`py-20 sm:py-28 px-4 bg-gradient-to-b from-gray-50/80 to-white section-reveal ${
        reveal.isVisible ? 'is-visible' : ''
      }`}
    >
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-5 text-gray-900">
            ARIA -{' '}
            <span className="bg-gradient-to-l from-purple-600 to-violet-500 bg-clip-text text-transparent">
              תמחור שקוף
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto">
            בחר את התוכנית המתאימה לעסק שלך
          </p>
        </div>

        <div
          className={`grid md:grid-cols-2 gap-8 max-w-4xl mx-auto stagger-reveal ${
            reveal.isVisible ? 'is-visible' : ''
          }`}
        >
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`p-7 sm:p-9 relative hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 bg-white ${
                plan.popular
                  ? 'border-2 border-purple-400 shadow-xl ring-4 ring-purple-100 scale-[1.02]'
                  : 'border border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="shadow-lg bg-gradient-to-r from-purple-600 to-violet-600 text-white border-0 text-sm px-4 py-1.5 rounded-full">
                    <Crown className="w-3.5 h-3.5 ml-1" />
                    הכי פופולרי
                  </Badge>
                </div>
              )}

              {plan.saveBadge && (
                <Badge className="absolute top-4 left-4 bg-green-50 text-green-600 border-green-200 text-[11px]">
                  {plan.saveBadge}
                </Badge>
              )}

              <h3 className="text-2xl font-bold mb-2 text-gray-800">
                {plan.name}
              </h3>
              <p className="text-sm text-gray-500 mb-5">{plan.description}</p>

              <div className="mb-6">
                {plan.originalPrice && (
                  <span className="text-lg text-gray-400 line-through ml-2">
                    ₪{plan.originalPrice}
                  </span>
                )}
                <span className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-l from-purple-600 to-violet-500 bg-clip-text text-transparent">
                  {plan.price.startsWith('מ') ? plan.price : `₪${plan.price}`}
                </span>
                {plan.period && (
                  <span className="text-gray-500 text-sm mr-2">
                    {' '}
                    {plan.period}
                  </span>
                )}
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-[15px] text-gray-700">{f}</span>
                  </li>
                ))}
              </ul>

              {plan.limitations.length > 0 && (
                <div className="mb-6 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-400 mb-2">הגבלות:</p>
                  {plan.limitations.map((l, i) => (
                    <p key={i} className="text-xs text-gray-400 mb-1">
                      • {l}
                    </p>
                  ))}
                </div>
              )}

              <Button
                className={`w-full py-6 text-base font-bold rounded-xl group relative overflow-hidden ${
                  plan.popular
                    ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg'
                    : 'border-purple-200 text-purple-700 hover:bg-purple-50'
                }`}
                variant={plan.popular ? 'default' : 'outline'}
                onClick={() =>
                  navigate(plan.popular ? '/brief' : '/about')
                }
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

        {/* Trust signals */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mt-12 text-xs sm:text-sm text-gray-400">
          {['7 ימי ניסיון חינם', 'ללא כרטיס אשראי', 'ביטול בכל עת'].map(
            (t, i) => (
              <span key={i} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-400" />
                {t}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}
