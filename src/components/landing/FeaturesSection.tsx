import { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Link2, Palette, RefreshCw, BarChart3 } from 'lucide-react';

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

const features = [
  {
    icon: Link2,
    title: 'התחל עם הלינק שלך',
    description:
      'רק תזין את כתובת האתר שלך ו-A.R.I.A ינתח את העסק, הקהל והמוצרים שלך תוך שניות',
    gradient: 'from-purple-500 to-violet-600',
    bgLight: 'bg-purple-50',
  },
  {
    icon: Palette,
    title: 'יצירת קריאייטיב חכם',
    description:
      'AI שמייצר תמונות, סרטונים וטקסטים פרסומיים מותאמים אישית לקהל שלך',
    gradient: 'from-violet-500 to-fuchsia-500',
    bgLight: 'bg-violet-50',
  },
  {
    icon: RefreshCw,
    title: 'אופטימיזציה 24/7',
    description:
      'המערכת עובדת סביב השעון - בודקת, משפרת ומקסמת את הביצועים',
    gradient: 'from-fuchsia-500 to-pink-500',
    bgLight: 'bg-fuchsia-50',
  },
  {
    icon: BarChart3,
    title: 'דוחות בזמן אמת',
    description:
      'ראה בדיוק כמה השקעת, כמה הרווחת, ומה הצעדים הבאים',
    gradient: 'from-pink-500 to-purple-600',
    bgLight: 'bg-pink-50',
  },
];

export function FeaturesSection() {
  const reveal = useScrollReveal();

  return (
    <section
      ref={reveal.ref}
      className={`py-20 sm:py-28 px-4 bg-gradient-to-b from-gray-50/80 to-white section-reveal ${
        reveal.isVisible ? 'is-visible' : ''
      }`}
    >
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-5 text-gray-900">
            הכל אוטומטי.{' '}
            <span className="bg-gradient-to-l from-purple-600 to-violet-500 bg-clip-text text-transparent">
              הכל חכם.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto">
            מהרגע שתזין את הקישור לאתר שלך - הכל קורה לבד
          </p>
        </div>

        <div
          className={`grid sm:grid-cols-2 gap-6 stagger-reveal ${
            reveal.isVisible ? 'is-visible' : ''
          }`}
        >
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <Card
                key={i}
                className="p-7 sm:p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group border border-gray-100 hover:border-purple-200 bg-white relative overflow-hidden"
              >
                {/* Subtle bg glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/0 to-violet-50/0 group-hover:from-purple-50/50 group-hover:to-violet-50/30 transition-all duration-500" />

                <div className="relative z-10">
                  {/* Step number */}
                  <div className="flex items-center gap-4 mb-5">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <span className="text-sm font-bold text-purple-400 bg-purple-50 px-3 py-1 rounded-full">
                      שלב {i + 1}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
