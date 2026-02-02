import { useEffect, useRef, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Sparkles, TrendingUp, MousePointer, DollarSign, BarChart3 } from 'lucide-react';

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

export function ProductDemo() {
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-5 text-gray-900">
            הממשק שלנו{' '}
            <span className="bg-gradient-to-l from-purple-600 to-violet-500 bg-clip-text text-transparent">
              עובד בשבילך
            </span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            דשבורד אנליטיקס מתקדם שמציג את כל המטריקות החשובות
          </p>
        </div>

        {/* Product mockup */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main dashboard card */}
          <div className="rounded-3xl border border-purple-100 bg-white shadow-2xl p-6 sm:p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  סיכום ביצועים - 30 יום
                </h3>
                <p className="text-sm text-gray-400">עדכון אחרון: היום, 14:30</p>
              </div>
              <Badge className="bg-purple-50 text-purple-600 border-purple-200 text-xs">
                <Sparkles className="w-3 h-3 ml-1" />
                AI Insights
              </Badge>
            </div>

            {/* Chart area */}
            <div className="flex items-end gap-1.5 h-32 sm:h-40 mb-6 px-2">
              {[
                35, 42, 38, 55, 48, 62, 58, 72, 65, 78, 82, 75, 88, 92, 85, 90,
                95, 88, 92, 96,
              ].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t bg-gradient-to-t from-purple-600 to-violet-400 transition-all duration-300 hover:from-purple-500 hover:to-violet-300 cursor-pointer"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>

            {/* Metric grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                {
                  label: 'CTR ממוצע',
                  value: '4.32%',
                  change: '+23%',
                  positive: true,
                },
                {
                  label: 'CPC ממוצע',
                  value: '₪2.95',
                  change: '-12%',
                  positive: true,
                },
                {
                  label: 'ROAS',
                  value: '4.8x',
                  change: '+18%',
                  positive: true,
                },
                {
                  label: 'שיפור חודשי',
                  value: '+34%',
                  change: '+5%',
                  positive: true,
                },
              ].map((m, i) => (
                <div
                  key={i}
                  className="rounded-xl bg-gray-50 p-4 text-center hover:bg-purple-50/50 transition-colors"
                >
                  <div className="text-2xl font-extrabold text-gray-800 mb-0.5">
                    {m.value}
                  </div>
                  <div className="text-xs text-gray-500 mb-1">{m.label}</div>
                  <span
                    className={`text-[11px] font-bold ${
                      m.positive ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {m.change}
                  </span>
                </div>
              ))}
            </div>

            {/* AI recommendation */}
            <div className="mt-5 rounded-xl border border-purple-100 bg-purple-50/50 p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <div className="text-sm font-bold text-purple-700 mb-1">
                    המלצת AI
                  </div>
                  <div className="text-sm text-purple-600 leading-relaxed">
                    העלאת תקציב בקמפיין "מבצע קיץ" ב-20% תשפר את ה-ROAS ב-15% לפי
                    הנתונים. מומלץ גם להוסיף 3 וריאציות חדשות של מודעות.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating cards */}
          <div className="absolute -top-6 -right-4 sm:-right-8 rounded-xl border border-purple-100 bg-white shadow-xl p-3 animate-float z-10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <div className="text-[10px] text-gray-500">CTR</div>
                <div className="text-sm font-extrabold text-gray-800">
                  4.32% <span className="text-green-500 text-[10px]">↑23%</span>
                </div>
              </div>
            </div>
          </div>

          <div
            className="absolute -bottom-6 -left-4 sm:-left-8 rounded-xl border border-purple-100 bg-white shadow-xl p-3 animate-float z-10"
            style={{ animationDelay: '1.5s' }}
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                <MousePointer className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <div className="text-[10px] text-gray-500">CPC</div>
                <div className="text-sm font-extrabold text-gray-800">
                  ₪2.95 <span className="text-green-500 text-[10px]">↓12%</span>
                </div>
              </div>
            </div>
          </div>

          <div
            className="absolute top-1/3 -left-4 sm:-left-12 rounded-xl border border-purple-100 bg-white shadow-xl p-3 animate-float z-10 hidden md:block"
            style={{ animationDelay: '2.5s' }}
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-orange-600" />
              </div>
              <div>
                <div className="text-[10px] text-gray-500">ROAS</div>
                <div className="text-sm font-extrabold text-gray-800">4.8x</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
