import { useEffect, useRef, useState } from 'react';
import { Globe, Users, Building2, DollarSign } from 'lucide-react';

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

const globeStats = [
  {
    icon: Users,
    value: '3,200+',
    label: 'משתמשים פעילים',
  },
  {
    icon: Building2,
    value: '8+',
    label: 'תעשיות שונות',
  },
  {
    icon: DollarSign,
    value: '₪5M+',
    label: 'הוצאות פרסום מנוהלות',
  },
];

export function GlobeSection() {
  const reveal = useScrollReveal();

  return (
    <section
      ref={reveal.ref}
      className={`py-20 sm:py-28 px-4 bg-gradient-to-b from-gray-900 to-purple-950 relative overflow-hidden section-reveal ${
        reveal.isVisible ? 'is-visible' : ''
      }`}
    >
      {/* Background effects */}
      <div className="absolute inset-0 opacity-20">
        <div
          style={{
            backgroundImage:
              'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
          className="absolute inset-0"
        />
      </div>
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-violet-600/15 rounded-full blur-[100px]" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-5 text-white">
            פרסום{' '}
            <span className="bg-gradient-to-l from-purple-400 to-violet-300 bg-clip-text text-transparent">
              ללא גבולות
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            AdSync מנהל קמפיינים עבור עסקים בכל הגדלים ובכל התעשיות
          </p>
        </div>

        {/* Globe visualization */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Globe SVG */}
          <div className="flex-1 flex items-center justify-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80">
              {/* Globe circle */}
              <div className="absolute inset-0 rounded-full border-2 border-purple-500/30 animate-pulse-slow" />
              <div className="absolute inset-4 rounded-full border border-purple-400/20" />
              <div className="absolute inset-8 rounded-full border border-purple-300/15" />

              {/* Globe grid lines */}
              <svg
                viewBox="0 0 200 200"
                className="absolute inset-0 w-full h-full"
                style={{ animationDuration: '30s' }}
              >
                {/* Horizontal arcs */}
                <ellipse
                  cx="100"
                  cy="100"
                  rx="90"
                  ry="90"
                  fill="none"
                  stroke="rgba(139,92,246,0.2)"
                  strokeWidth="0.5"
                />
                <ellipse
                  cx="100"
                  cy="100"
                  rx="90"
                  ry="40"
                  fill="none"
                  stroke="rgba(139,92,246,0.15)"
                  strokeWidth="0.5"
                />
                <ellipse
                  cx="100"
                  cy="100"
                  rx="90"
                  ry="70"
                  fill="none"
                  stroke="rgba(139,92,246,0.15)"
                  strokeWidth="0.5"
                />
                {/* Vertical arcs */}
                <ellipse
                  cx="100"
                  cy="100"
                  rx="40"
                  ry="90"
                  fill="none"
                  stroke="rgba(139,92,246,0.15)"
                  strokeWidth="0.5"
                />
                <ellipse
                  cx="100"
                  cy="100"
                  rx="70"
                  ry="90"
                  fill="none"
                  stroke="rgba(139,92,246,0.15)"
                  strokeWidth="0.5"
                />
                {/* Center highlight */}
                <circle
                  cx="100"
                  cy="100"
                  r="6"
                  fill="rgba(139,92,246,0.5)"
                  className="animate-pulse"
                />
                {/* Connection dots */}
                <circle cx="60" cy="70" r="3" fill="rgba(168,85,247,0.6)" className="animate-pulse" />
                <circle cx="140" cy="60" r="3" fill="rgba(168,85,247,0.6)" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
                <circle cx="130" cy="130" r="3" fill="rgba(168,85,247,0.6)" className="animate-pulse" style={{ animationDelay: '1s' }} />
                <circle cx="50" cy="120" r="3" fill="rgba(168,85,247,0.6)" className="animate-pulse" style={{ animationDelay: '1.5s' }} />
                <circle cx="100" cy="45" r="3" fill="rgba(168,85,247,0.6)" className="animate-pulse" style={{ animationDelay: '2s' }} />
                {/* Connection lines */}
                <line x1="60" y1="70" x2="100" y2="100" stroke="rgba(139,92,246,0.2)" strokeWidth="0.5" />
                <line x1="140" y1="60" x2="100" y2="100" stroke="rgba(139,92,246,0.2)" strokeWidth="0.5" />
                <line x1="130" y1="130" x2="100" y2="100" stroke="rgba(139,92,246,0.2)" strokeWidth="0.5" />
                <line x1="50" y1="120" x2="100" y2="100" stroke="rgba(139,92,246,0.2)" strokeWidth="0.5" />
                <line x1="100" y1="45" x2="100" y2="100" stroke="rgba(139,92,246,0.2)" strokeWidth="0.5" />
              </svg>

              {/* Center icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                  <Globe className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex-1 space-y-6">
            {globeStats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  className="flex items-center gap-5 p-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-purple-400/30 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="text-3xl sm:text-4xl font-extrabold text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
