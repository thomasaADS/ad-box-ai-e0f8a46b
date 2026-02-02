import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowLeft, CheckCircle } from 'lucide-react';

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

export function CTASection() {
  const navigate = useNavigate();
  const reveal = useScrollReveal();

  return (
    <section
      ref={reveal.ref}
      className={`py-24 sm:py-32 px-4 relative overflow-hidden section-reveal ${
        reveal.isVisible ? 'is-visible' : ''
      }`}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-violet-600 to-purple-700" />

      {/* Dot pattern overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Glow effects */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-white/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-violet-400/10 rounded-full blur-[100px]" />

      <div className="container mx-auto max-w-4xl relative z-10 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-extrabold mb-6 text-white leading-tight">
          מוכן להתחיל לפרסם
          <br />
          כמו מקצוען?
        </h2>
        <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
          הצטרפו ל-3,200+ עסקים ישראליים שכבר יוצרים קמפיינים מנצחים עם AI.
        </p>
        <Button
          size="lg"
          onClick={() => navigate('/brief')}
          className="text-base sm:text-lg px-8 sm:px-12 py-5 sm:py-7 rounded-2xl shadow-2xl hover:scale-105 transition-all font-bold group relative overflow-hidden bg-white text-purple-700 hover:bg-white/95"
        >
          <span className="relative z-10 flex items-center gap-2 sm:gap-3">
            <Sparkles className="w-5 h-5" />
            התחל בחינם עכשיו
            <ArrowLeft className="w-5 h-5 group-hover:translate-x-[-4px] transition-transform" />
          </span>
        </Button>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-8 text-xs sm:text-sm text-white/70">
          {['7 ימי ניסיון חינם', 'ללא כרטיס אשראי', 'תוצאות תוך דקות'].map(
            (t, i) => (
              <span key={i} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-white/80" />
                {t}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}
