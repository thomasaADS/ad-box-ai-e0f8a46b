import { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

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

const testimonials = [
  {
    name: 'דני כ.',
    role: 'בעל חנות אונליין',
    text: 'A.R.I.A הביא לי את שתי ההזמנות הראשונות תוך 48 שעות. מטורף!',
    rating: 5,
    avatar: 'ד',
    gradient: 'from-purple-500 to-violet-600',
  },
  {
    name: 'מיכל ש.',
    role: 'יועצת שיווק',
    text: 'זה הנשק הסודי שלי. מחקר קהלים ברמה מקצועית תוך דקות.',
    rating: 5,
    avatar: 'מ',
    gradient: 'from-violet-500 to-fuchsia-500',
  },
  {
    name: 'יוסי ר.',
    role: 'סוכנות פרסום',
    text: 'חוסך לנו 20 שעות עבודה בשבוע. ROI מטורף.',
    rating: 5,
    avatar: 'י',
    gradient: 'from-fuchsia-500 to-pink-500',
  },
  {
    name: 'שירה ל.',
    role: 'בעלת עסק קטן',
    text: 'סוף סוף הבנתי את הפרסום בפייסבוק. המערכת עושה הכל לבד.',
    rating: 5,
    avatar: 'ש',
    gradient: 'from-pink-500 to-purple-600',
  },
];

export function TestimonialsSection() {
  const reveal = useScrollReveal();

  return (
    <section
      ref={reveal.ref}
      className={`py-20 sm:py-28 px-4 section-reveal ${
        reveal.isVisible ? 'is-visible' : ''
      }`}
    >
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-5 text-gray-900">
            מה הלקוחות שלנו{' '}
            <span className="bg-gradient-to-l from-purple-600 to-violet-500 bg-clip-text text-transparent">
              אומרים
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto">
            אלפי עסקים ישראליים כבר סומכים על A.R.I.A
          </p>
        </div>

        <div
          className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-5 stagger-reveal ${
            reveal.isVisible ? 'is-visible' : ''
          }`}
        >
          {testimonials.map((t, i) => (
            <Card
              key={i}
              className="p-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group border border-gray-100 hover:border-purple-200 bg-white"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star
                    key={j}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-600 text-sm leading-relaxed mb-6 min-h-[60px]">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white text-sm font-bold shadow-md`}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="font-bold text-sm text-gray-800">{t.name}</div>
                  <div className="text-xs text-gray-500">{t.role}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
