import { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Zap, Target, Clock, TrendingUp } from 'lucide-react';

/* ── Scroll-triggered visibility hook ── */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, isVisible };
}

/* ── Animated counter hook – counts from 0 to target when triggered ── */
function useCountUp(
  end: number,
  trigger: boolean,
  duration = 2000,
  decimals = 0
) {
  const [value, setValue] = useState(0);
  const frame = useRef(0);

  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    let startTime: number | null = null;

    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (end - start) * eased;
      setValue(Number(current.toFixed(decimals)));

      if (progress < 1) {
        frame.current = requestAnimationFrame(step);
      } else {
        setValue(end);
      }
    };

    frame.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame.current);
  }, [trigger, end, duration, decimals]);

  return value;
}

/* ── Stat items data ── */
interface StatItem {
  numericValue: number;
  decimals: number;
  prefix: string;
  suffix: string;
  label: string;
  description: string;
  icon: typeof Zap;
  gradient: string;
}

const stats: StatItem[] = [
  {
    numericValue: 30,
    decimals: 0,
    prefix: '',
    suffix: 'X',
    label: 'יותר יעילות',
    description: 'בהשוואה ליצירת קמפיינים ידנית',
    icon: Zap,
    gradient: 'from-purple-500 to-violet-600',
  },
  {
    numericValue: 4.32,
    decimals: 2,
    prefix: '',
    suffix: '%',
    label: 'CTR ממוצע',
    description: 'אחוזי הקלקה מעל הממוצע בתעשייה',
    icon: Target,
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    numericValue: 2.95,
    decimals: 2,
    prefix: '₪',
    suffix: '',
    label: 'עלות לקליק ממוצעת',
    description: 'CPC נמוך בהשוואה לממוצע בשוק',
    icon: TrendingUp,
    gradient: 'from-fuchsia-500 to-purple-600',
  },
  {
    numericValue: 10,
    decimals: 0,
    prefix: '',
    suffix: ' דקות',
    label: 'זמן להקמת קמפיין',
    description: 'מהרעיון לקמפיין חי ופעיל',
    icon: Clock,
    gradient: 'from-purple-600 to-indigo-600',
  },
];

export function StatsSection() {
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
            מספרים שמדברים{' '}
            <span className="bg-gradient-to-l from-purple-600 to-violet-500 bg-clip-text text-transparent">
              בעד עצמם
            </span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            הנתונים האמיתיים של הלקוחות שלנו מוכיחים שזה עובד
          </p>
        </div>

        <div
          className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-5 stagger-reveal ${
            reveal.isVisible ? 'is-visible' : ''
          }`}
        >
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} animate={reveal.isVisible} delay={i * 200} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Single stat card with animated counter ── */
function StatCard({
  stat,
  animate,
  delay,
}: {
  stat: StatItem;
  animate: boolean;
  delay: number;
}) {
  const Icon = stat.icon;

  // Delay the animation start per card
  const [shouldAnimate, setShouldAnimate] = useState(false);
  useEffect(() => {
    if (!animate) return;
    const t = setTimeout(() => setShouldAnimate(true), delay);
    return () => clearTimeout(t);
  }, [animate, delay]);

  const count = useCountUp(stat.numericValue, shouldAnimate, 2000, stat.decimals);

  return (
    <Card className="p-6 sm:p-7 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group border border-gray-100 hover:border-purple-200 bg-white">
      <div
        className={`w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
      >
        <Icon className="w-7 h-7 text-white" />
      </div>
      <div className="text-4xl sm:text-5xl font-extrabold mb-1 bg-gradient-to-l from-purple-600 to-violet-500 bg-clip-text text-transparent tabular-nums">
        {stat.prefix}
        {stat.decimals > 0 ? count.toFixed(stat.decimals) : count}
        {stat.suffix}
      </div>
      <div className="text-base font-bold text-gray-800 mb-1">{stat.label}</div>
      <div className="text-xs text-gray-500">{stat.description}</div>
    </Card>
  );
}
