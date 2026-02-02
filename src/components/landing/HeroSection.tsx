import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Play, CheckCircle, ArrowLeft, TrendingUp, MousePointer, DollarSign } from 'lucide-react';
import { useEffect, useState } from 'react';

const heroWords = [
  'קמפיינים מנצחים',
  'מודעות ממירות',
  'קריאייטיב חכם',
  'תוצאות אמיתיות',
];

function useTextRotator(words: string[], interval = 3000) {
  const [idx, setIdx] = useState(0);
  const [animating, setAnimating] = useState(false);
  useEffect(() => {
    const timer = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setIdx((p) => (p + 1) % words.length);
        setAnimating(false);
      }, 500);
    }, interval);
    return () => clearInterval(timer);
  }, [words.length, interval]);
  return { currentWord: words[idx], isAnimating: animating };
}

export function HeroSection() {
  const navigate = useNavigate();
  const rotator = useTextRotator(heroWords, 3000);

  return (
    <section className="relative pt-24 sm:pt-32 lg:pt-40 pb-20 sm:pb-28 lg:pb-36 px-4 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-50/80 via-white to-transparent" />
      <div className="absolute top-20 right-[10%] w-[400px] h-[400px] bg-purple-400/20 rounded-full blur-[120px]" />
      <div className="absolute top-40 left-[15%] w-[350px] h-[350px] bg-violet-300/15 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-[40%] w-[300px] h-[300px] bg-pink-200/10 rounded-full blur-[80px]" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Text content */}
          <div className="flex-1 text-center lg:text-right">
            <div className="inline-block mb-6 animate-fade-in">
              <Badge
                variant="secondary"
                className="text-sm font-medium px-5 py-2.5 rounded-full border border-purple-200 bg-white/90 backdrop-blur-sm shadow-sm text-gray-700"
              >
                <Sparkles className="w-4 h-4 ml-2 text-purple-500" />
                +3,200 עסקים ישראליים כבר משתמשים
              </Badge>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] mb-6 animate-fade-in text-gray-900">
              מנוע ה-AI שלך ליצירת
              <br />
              <span
                className="inline-block h-[1.15em] overflow-hidden relative"
                style={{ perspective: '500px' }}
              >
                <span
                  key={rotator.currentWord}
                  className={`inline-block bg-gradient-to-l from-purple-600 via-violet-500 to-purple-700 bg-clip-text text-transparent ${
                    rotator.isAnimating ? 'text-rotator-exit' : 'text-rotator-enter'
                  }`}
                >
                  {rotator.currentWord}
                </span>
              </span>
            </h1>

            <p
              className="text-lg sm:text-xl md:text-2xl text-gray-500 leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-10 animate-slide-up"
              style={{ animationDelay: '0.15s' }}
            >
              קבל עד{' '}
              <span className="font-bold text-gray-800">14x יותר המרות</span>. בלי
              מעצבים. בלי ניחושים.
              <br className="hidden sm:block" />
              קמפיין מוכן לפרסום תוך דקות.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8 animate-scale-in"
              style={{ animationDelay: '0.3s' }}
            >
              <Button
                size="lg"
                onClick={() => navigate('/brief')}
                className="text-lg px-10 py-7 rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all group relative overflow-hidden bg-purple-600 hover:bg-purple-700 text-white"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative z-10 flex items-center gap-3">
                  <Sparkles className="w-5 h-5" />
                  התחל בחינם עכשיו
                  <ArrowLeft className="w-5 h-5 group-hover:translate-x-[-4px] transition-transform" />
                </span>
              </Button>
              <Button
                size="lg"
                onClick={() => navigate('/how-it-works')}
                variant="outline"
                className="text-base px-8 py-7 rounded-2xl font-semibold hover:scale-105 transition-all group border-purple-200 text-purple-700 hover:bg-purple-50"
              >
                <Play className="w-5 h-5 ml-1 text-purple-500" />
                ראה איך זה עובד
              </Button>
            </div>

            <div
              className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-gray-500 animate-slide-up"
              style={{ animationDelay: '0.45s' }}
            >
              {['7 ימי ניסיון חינם', 'ללא כרטיס אשראי', 'ביטול בכל עת'].map(
                (t, i) => (
                  <span key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    {t}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Hero mockup */}
          <div
            className="flex-1 w-full max-w-lg lg:max-w-xl animate-slide-up"
            style={{ animationDelay: '0.3s' }}
          >
            <div className="relative">
              {/* Main dashboard card */}
              <div className="rounded-3xl border border-purple-100 bg-white shadow-2xl p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-gray-800">
                    דשבורד קמפיינים
                  </span>
                  <Badge className="bg-green-50 text-green-600 border-green-200 text-[10px]">
                    3 פעילים
                  </Badge>
                </div>

                {/* Mini chart */}
                <div className="flex items-end gap-1 h-16 px-2">
                  {[35, 42, 38, 55, 48, 62, 58, 72, 65, 78, 82, 75, 88, 92].map(
                    (h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t bg-gradient-to-t from-purple-600 to-violet-400 transition-all hover:from-purple-500 hover:to-violet-300"
                        style={{ height: `${h}%` }}
                      />
                    )
                  )}
                </div>

                {/* Campaign rows */}
                {[
                  {
                    name: 'קמפיין קיץ - מבצעים',
                    status: 'פעיל',
                    statusColor: 'bg-green-500',
                    impressions: '83.5K',
                    ctr: '4.26%',
                  },
                  {
                    name: 'השקת מוצר חדש',
                    status: 'מצוין',
                    statusColor: 'bg-purple-500',
                    impressions: '124.2K',
                    ctr: '5.81%',
                  },
                ].map((c, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-gray-100 bg-gray-50/50 p-3"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-gray-700">
                        {c.name}
                      </span>
                      <span
                        className={`text-[9px] font-bold text-white px-2 py-0.5 rounded-full ${c.statusColor}`}
                      >
                        {c.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-[11px] text-gray-500">
                      <span>
                        Impressions{' '}
                        <strong className="text-gray-700">{c.impressions}</strong>
                      </span>
                      <span>
                        CTR <strong className="text-gray-700">{c.ctr}</strong>
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Floating metric cards */}
              <div className="absolute -top-4 -right-4 sm:-right-8 rounded-xl border border-purple-100 bg-white shadow-xl p-3 animate-float">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500">CTR</div>
                    <div className="text-sm font-extrabold text-gray-800">
                      4.32%{' '}
                      <span className="text-green-500 text-[10px]">↑23%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="absolute -bottom-4 -left-4 sm:-left-8 rounded-xl border border-purple-100 bg-white shadow-xl p-3 animate-float"
                style={{ animationDelay: '1s' }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                    <MousePointer className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500">CPC</div>
                    <div className="text-sm font-extrabold text-gray-800">
                      ₪2.95{' '}
                      <span className="text-green-500 text-[10px]">↓12%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="absolute top-1/2 -left-4 sm:-left-12 -translate-y-1/2 rounded-xl border border-purple-100 bg-white shadow-xl p-3 animate-float hidden sm:block"
                style={{ animationDelay: '2s' }}
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
        </div>
      </div>
    </section>
  );
}
