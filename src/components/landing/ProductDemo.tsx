import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Globe,
  Sparkles,
  Image,
  BarChart3,
  ArrowLeft,
  CheckCircle,
  Zap,
} from 'lucide-react';

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

/* ── Three-step flow visualization ── */
const steps = [
  {
    step: '01',
    title: 'הזן את הלינק',
    desc: 'רק כתובת האתר שלך – ו-AI מנתח הכל',
    icon: Globe,
    gradient: 'from-purple-500 to-violet-600',
    accentColor: '#7c3aed',
    visual: (
      <div className="w-full rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 p-5 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="rounded-xl bg-white border border-gray-200 px-4 py-3 flex items-center gap-3">
          <Globe className="w-4 h-4 text-gray-400 shrink-0" />
          <span className="text-sm text-gray-600 font-mono">
            www.your-business.co.il
          </span>
          <div className="mr-auto w-2 h-5 bg-purple-500 rounded-full animate-pulse" />
        </div>
        <div className="mt-4 space-y-2">
          {['תעשייה: אופנה', 'קהל יעד: נשים 25-45', 'מיקום: תל אביב'].map(
            (item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-xs text-gray-500"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <CheckCircle className="w-3 h-3 text-purple-500" />
                {item}
              </div>
            )
          )}
        </div>
      </div>
    ),
  },
  {
    step: '02',
    title: 'AI יוצר קריאייטיב',
    desc: 'תמונות, טקסטים ומודעות – מותאם לקהל שלך',
    icon: Image,
    gradient: 'from-violet-500 to-purple-600',
    accentColor: '#8b5cf6',
    visual: (
      <div className="w-full rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 p-5 shadow-sm">
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'מודעת Meta', score: 94 },
            { label: 'מודעת Google', score: 87 },
          ].map((ad, i) => (
            <div
              key={i}
              className="rounded-xl bg-white border border-gray-100 p-3"
            >
              <div className="w-full aspect-[4/3] rounded-lg bg-gradient-to-br from-purple-100 via-violet-50 to-fuchsia-50 mb-2 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-purple-400" />
              </div>
              <div className="text-[11px] font-bold text-gray-700">
                {ad.label}
              </div>
              <div className="mt-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 to-violet-500"
                  style={{ width: `${ad.score}%` }}
                />
              </div>
              <div className="text-[10px] text-purple-600 font-bold mt-0.5">
                {ad.score}/100
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-lg bg-purple-50 border border-purple-100 p-2.5 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-purple-500 shrink-0" />
          <span className="text-[11px] text-purple-700">
            3 וריאציות מוכנות לפרסום
          </span>
        </div>
      </div>
    ),
  },
  {
    step: '03',
    title: 'תוצאות בזמן אמת',
    desc: 'אופטימיזציה 24/7 ודוחות חכמים',
    icon: BarChart3,
    gradient: 'from-fuchsia-500 to-purple-600',
    accentColor: '#a855f7',
    visual: (
      <div className="w-full rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-gray-700">ביצועים</span>
          <span className="text-[10px] bg-green-50 text-green-600 rounded-full px-2 py-0.5 font-bold border border-green-200">
            חי
          </span>
        </div>
        <div className="flex items-end gap-1 h-20">
          {[30, 45, 35, 60, 50, 75, 65, 80, 70, 90, 85, 95].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t transition-all"
              style={{
                height: `${h}%`,
                background: `linear-gradient(to top, #7c3aed, #a78bfa)`,
                opacity: 0.6 + (i / 12) * 0.4,
              }}
            />
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2 mt-3">
          {[
            { label: 'ROAS', val: '4.8x', color: 'text-purple-600' },
            { label: 'CTR', val: '4.32%', color: 'text-green-600' },
            { label: 'CPC', val: '₪2.95', color: 'text-violet-600' },
          ].map((m, i) => (
            <div
              key={i}
              className="text-center rounded-lg bg-white border border-gray-100 py-2"
            >
              <div className={`text-sm font-extrabold ${m.color}`}>{m.val}</div>
              <div className="text-[9px] text-gray-500">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

export function ProductDemo() {
  const navigate = useNavigate();
  const reveal = useScrollReveal();

  return (
    <section
      ref={reveal.ref}
      className={`py-20 sm:py-28 px-4 relative overflow-hidden section-reveal ${
        reveal.isVisible ? 'is-visible' : ''
      }`}
    >
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-50/30 to-transparent pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-5 text-gray-900">
            מהלינק שלך ל
            <span className="bg-gradient-to-l from-purple-600 to-violet-500 bg-clip-text text-transparent">
              קמפיין חי
            </span>{' '}
            — ב-3 צעדים
          </h2>
          <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto">
            תהליך פשוט ומהיר שנותן לך שליטה מלאה בכל שלב
          </p>
        </div>

        {/* Steps */}
        <div
          className={`grid md:grid-cols-3 gap-8 stagger-reveal ${
            reveal.isVisible ? 'is-visible' : ''
          }`}
        >
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="group relative">
                {/* Connector line (desktop) */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-[60px] left-0 -translate-x-full w-8 h-[2px] bg-gradient-to-l from-purple-200 to-transparent" />
                )}

                {/* Step number & icon */}
                <div className="flex items-center gap-4 mb-5">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-purple-400 tracking-widest">
                      שלב {s.step}
                    </span>
                    <h3 className="text-xl font-extrabold text-gray-900">
                      {s.title}
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                  {s.desc}
                </p>

                {/* Step visual card */}
                <div className="group-hover:-translate-y-1 transition-transform duration-500">
                  {s.visual}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <Button
            size="lg"
            onClick={() => navigate('/brief')}
            className="text-base px-10 py-6 rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all group relative overflow-hidden bg-purple-600 hover:bg-purple-700 text-white"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative z-10 flex items-center gap-3">
              <Zap className="w-5 h-5" />
              נסה עכשיו — חינם
              <ArrowLeft className="w-5 h-5 group-hover:translate-x-[-4px] transition-transform" />
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
}
