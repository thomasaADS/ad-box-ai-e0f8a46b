import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Play, CheckCircle, ArrowLeft } from 'lucide-react';
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

/* ── Organic blob SVG background ── */
function HeroBlobs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large primary blob - top right */}
      <svg
        className="absolute -top-32 -right-32 w-[700px] h-[700px] morph-orb-1 opacity-[0.12]"
        viewBox="0 0 600 600"
      >
        <defs>
          <linearGradient id="hero-g1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
          <filter id="hero-blur1">
            <feGaussianBlur in="SourceGraphic" stdDeviation="40" />
          </filter>
        </defs>
        <ellipse
          cx="300"
          cy="300"
          rx="250"
          ry="220"
          fill="url(#hero-g1)"
          filter="url(#hero-blur1)"
        />
      </svg>

      {/* Secondary blob - left center */}
      <svg
        className="absolute top-1/3 -left-40 w-[500px] h-[500px] morph-orb-2 opacity-[0.08]"
        viewBox="0 0 400 400"
      >
        <defs>
          <linearGradient id="hero-g2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
          <filter id="hero-blur2">
            <feGaussianBlur in="SourceGraphic" stdDeviation="30" />
          </filter>
        </defs>
        <ellipse
          cx="200"
          cy="200"
          rx="170"
          ry="150"
          fill="url(#hero-g2)"
          filter="url(#hero-blur2)"
        />
      </svg>

      {/* Small accent blob - bottom */}
      <svg
        className="absolute -bottom-20 left-1/3 w-[350px] h-[350px] morph-orb-1 opacity-[0.06]"
        viewBox="0 0 300 300"
        style={{ animationDelay: '5s' }}
      >
        <defs>
          <linearGradient id="hero-g3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
          <filter id="hero-blur3">
            <feGaussianBlur in="SourceGraphic" stdDeviation="25" />
          </filter>
        </defs>
        <ellipse
          cx="150"
          cy="150"
          rx="120"
          ry="100"
          fill="url(#hero-g3)"
          filter="url(#hero-blur3)"
        />
      </svg>
    </div>
  );
}

/* ── Abstract AI visual illustration ── */
function HeroVisual() {
  return (
    <div className="relative w-full aspect-square max-w-lg mx-auto">
      {/* Central glowing orb */}
      <div className="absolute inset-[15%] rounded-full bg-gradient-to-br from-purple-500/20 via-violet-400/10 to-transparent backdrop-blur-sm border border-purple-200/30 animate-pulse-slow" />

      {/* Orbit rings */}
      <div className="absolute inset-[8%] rounded-full border border-purple-200/20 animate-[spin_30s_linear_infinite]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-purple-500 shadow-lg shadow-purple-500/40" />
      </div>
      <div className="absolute inset-[2%] rounded-full border border-purple-100/15 animate-[spin_45s_linear_infinite_reverse]">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 rounded-full bg-violet-400 shadow-lg shadow-violet-400/40" />
      </div>

      {/* Inner content - abstract AI brain */}
      <svg
        className="absolute inset-[20%] w-[60%] h-[60%]"
        viewBox="0 0 200 200"
        fill="none"
      >
        <defs>
          <linearGradient id="ai-core" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="50%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#c4b5fd" />
          </linearGradient>
          <filter id="ai-glow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
          </filter>
        </defs>

        {/* Neural network nodes */}
        {[
          { cx: 100, cy: 50 },
          { cx: 50, cy: 85 },
          { cx: 150, cy: 85 },
          { cx: 70, cy: 135 },
          { cx: 130, cy: 135 },
          { cx: 100, cy: 100 },
        ].map((p, i) => (
          <g key={i}>
            <circle
              cx={p.cx}
              cy={p.cy}
              r="6"
              fill="url(#ai-core)"
              filter="url(#ai-glow)"
            >
              <animate
                attributeName="r"
                values="5;7;5"
                dur={`${2 + i * 0.3}s`}
                repeatCount="indefinite"
              />
            </circle>
            <circle cx={p.cx} cy={p.cy} r="3" fill="white" opacity="0.9" />
          </g>
        ))}

        {/* Connections */}
        {[
          [100, 50, 50, 85],
          [100, 50, 150, 85],
          [100, 50, 100, 100],
          [50, 85, 70, 135],
          [50, 85, 100, 100],
          [150, 85, 130, 135],
          [150, 85, 100, 100],
          [70, 135, 130, 135],
          [70, 135, 100, 100],
          [130, 135, 100, 100],
        ].map(([x1, y1, x2, y2], i) => (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="url(#ai-core)"
            strokeWidth="1.5"
            opacity="0.3"
          >
            <animate
              attributeName="opacity"
              values="0.15;0.5;0.15"
              dur={`${3 + i * 0.2}s`}
              repeatCount="indefinite"
            />
          </line>
        ))}
      </svg>

      {/* Floating elements around the orb */}
      <div className="absolute top-[5%] right-[10%] sm:right-[15%] rounded-2xl bg-white/90 backdrop-blur-sm border border-purple-100 shadow-lg px-3 sm:px-4 py-2 sm:py-3 animate-float">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400" />
          <span className="text-[10px] sm:text-xs font-bold text-gray-800">ROAS 4.8x</span>
        </div>
      </div>

      <div
        className="absolute bottom-[8%] left-[5%] sm:left-[8%] rounded-2xl bg-white/90 backdrop-blur-sm border border-purple-100 shadow-lg px-3 sm:px-4 py-2 sm:py-3 animate-float"
        style={{ animationDelay: '2s' }}
      >
        <div className="flex items-center gap-2">
          <span className="text-[10px] sm:text-xs text-green-500 font-bold">↑23%</span>
          <span className="text-[10px] sm:text-xs font-bold text-gray-800">CTR 4.32%</span>
        </div>
      </div>

      <div
        className="absolute top-[40%] left-[2%] rounded-2xl bg-white/90 backdrop-blur-sm border border-purple-100 shadow-lg px-3 py-2 animate-float hidden sm:block"
        style={{ animationDelay: '4s' }}
      >
        <span className="text-[11px] font-bold text-purple-600">AI מנתח...</span>
      </div>

      <div
        className="absolute bottom-[25%] right-[2%] rounded-2xl bg-white/90 backdrop-blur-sm border border-purple-100 shadow-lg px-3 py-2 animate-float hidden sm:block"
        style={{ animationDelay: '3s' }}
      >
        <span className="text-[11px] font-bold text-gray-700">₪2.95 CPC</span>
      </div>
    </div>
  );
}

export function HeroSection() {
  const navigate = useNavigate();
  const rotator = useTextRotator(heroWords, 3000);

  return (
    <section className="relative pt-24 sm:pt-32 lg:pt-40 pb-20 sm:pb-28 lg:pb-36 px-4 overflow-x-clip">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white from-[12%] to-[#ebebff]" />

      {/* Organic blobs */}
      <HeroBlobs />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Text content */}
          <div className="flex-1 text-center lg:text-right">
            <div className="inline-block mb-6 animate-fade-in">
              <Badge
                variant="secondary"
                className="text-xs sm:text-sm font-medium px-3 sm:px-5 py-2 sm:py-2.5 rounded-full border border-purple-200 bg-white/90 backdrop-blur-sm shadow-sm text-gray-700"
              >
                <Sparkles className="w-4 h-4 ml-2 text-purple-500" />
                +3,200 עסקים ישראליים כבר משתמשים
              </Badge>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold leading-[1.15] mb-6 animate-fade-in text-gray-900">
              מנוע ה-AI שלך ליצירת
              <br />
              <span
                className="inline-block h-[1.2em] relative"
                style={{ perspective: '500px' }}
              >
                <span
                  key={rotator.currentWord}
                  className={`inline-block bg-gradient-to-l from-purple-600 via-violet-500 to-purple-700 bg-clip-text text-transparent ${
                    rotator.isAnimating
                      ? 'text-rotator-exit'
                      : 'text-rotator-enter'
                  }`}
                >
                  {rotator.currentWord}
                </span>
              </span>
            </h1>

            <p
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-500 leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-10 animate-slide-up"
              style={{ animationDelay: '0.15s' }}
            >
              קבל עד{' '}
              <span className="font-bold text-gray-800">14x יותר המרות</span>.
              בלי מעצבים. בלי ניחושים.
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
                className="text-base sm:text-lg px-7 sm:px-10 py-5 sm:py-7 rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all group relative overflow-hidden bg-purple-600 hover:bg-purple-700 text-white"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative z-10 flex items-center gap-2 sm:gap-3">
                  <Sparkles className="w-5 h-5" />
                  התחל בחינם עכשיו
                  <ArrowLeft className="w-5 h-5 group-hover:translate-x-[-4px] transition-transform" />
                </span>
              </Button>
              <Button
                size="lg"
                onClick={() => navigate('/how-it-works')}
                variant="outline"
                className="text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-7 rounded-2xl font-semibold hover:scale-105 transition-all group border-purple-200 text-purple-700 hover:bg-purple-50"
              >
                <Play className="w-5 h-5 ml-1 text-purple-500" />
                ראה איך זה עובד
              </Button>
            </div>

            <div
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-6 text-xs sm:text-sm text-gray-500 animate-slide-up"
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

          {/* Creative AI visual */}
          <div
            className="flex-1 w-full max-w-lg lg:max-w-xl animate-slide-up"
            style={{ animationDelay: '0.3s' }}
          >
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
