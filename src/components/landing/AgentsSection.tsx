import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  Bot,
  Search,
  Target,
  PenTool,
  BarChart3,
  Palette,
  Brain,
  Share2,
  Video,
  Mail,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';

/* ── Scroll reveal ── */
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

/* ── SVG Avatars (compact) ── */
function AvatarMaya() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
      <defs><linearGradient id="lm" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse"><stop stopColor="#059669"/><stop offset="1" stopColor="#10b981"/></linearGradient></defs>
      <rect width="120" height="120" rx="28" fill="url(#lm)"/>
      <ellipse cx="60" cy="38" rx="28" ry="26" fill="#1a1a2e"/>
      <path d="M32 42c0 0-2 20 0 30" stroke="#1a1a2e" strokeWidth="8" strokeLinecap="round"/>
      <path d="M88 42c0 0 2 20 0 30" stroke="#1a1a2e" strokeWidth="8" strokeLinecap="round"/>
      <ellipse cx="60" cy="52" rx="22" ry="24" fill="#fde4c8"/>
      <rect x="42" y="46" width="14" height="11" rx="3" stroke="#374151" strokeWidth="2.5" fill="none"/>
      <rect x="64" y="46" width="14" height="11" rx="3" stroke="#374151" strokeWidth="2.5" fill="none"/>
      <line x1="56" y1="51" x2="64" y2="51" stroke="#374151" strokeWidth="2"/>
      <circle cx="49" cy="52" r="2.5" fill="#1a1a2e"/><circle cx="71" cy="52" r="2.5" fill="#1a1a2e"/>
      <path d="M52 62c0 0 4 5 16 0" stroke="#c97b5d" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M30 95c0-16 13-20 30-20s30 4 30 20v25H30V95z" fill="#059669"/>
      <path d="M50 75h20v8c0 3-4 6-10 6s-10-3-10-6v-8z" fill="#fde4c8"/>
    </svg>
  );
}

function AvatarAdam() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
      <defs><linearGradient id="la" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse"><stop stopColor="#2563eb"/><stop offset="1" stopColor="#7c3aed"/></linearGradient></defs>
      <rect width="120" height="120" rx="28" fill="url(#la)"/>
      <path d="M36 40c0-14 11-25 24-25s24 11 24 25v4H36v-4z" fill="#2d1b08"/>
      <ellipse cx="60" cy="52" rx="22" ry="23" fill="#e8c9a0"/>
      <ellipse cx="50" cy="50" rx="3" ry="3.5" fill="#1a1a2e"/><ellipse cx="70" cy="50" rx="3" ry="3.5" fill="#1a1a2e"/>
      <path d="M52 62c3 4 13 4 16 0" stroke="#c08060" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M34 48c-2-16 10-30 26-30s28 14 26 30" stroke="#e2e8f0" strokeWidth="3.5" fill="none"/>
      <rect x="28" y="44" width="8" height="14" rx="4" fill="#e2e8f0"/>
      <rect x="84" y="44" width="8" height="14" rx="4" fill="#e2e8f0"/>
      <path d="M30 95c0-16 13-20 30-20s30 4 30 20v25H30V95z" fill="#1e40af"/>
      <path d="M50 75h20v8c0 3-4 6-10 6s-10-3-10-6v-8z" fill="#e8c9a0"/>
    </svg>
  );
}

function AvatarNoa() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
      <defs><linearGradient id="ln" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse"><stop stopColor="#ec4899"/><stop offset="1" stopColor="#f97316"/></linearGradient></defs>
      <rect width="120" height="120" rx="28" fill="url(#ln)"/>
      <ellipse cx="60" cy="40" rx="30" ry="28" fill="#8B4513"/>
      <path d="M30 44c-2 18-1 34 4 42" stroke="#8B4513" strokeWidth="10" strokeLinecap="round"/>
      <path d="M90 44c2 18 1 34-4 42" stroke="#8B4513" strokeWidth="10" strokeLinecap="round"/>
      <ellipse cx="60" cy="52" rx="21" ry="23" fill="#fde4c8"/>
      <ellipse cx="50" cy="50" rx="3" ry="3.5" fill="#1a1a2e"/><ellipse cx="70" cy="50" rx="3" ry="3.5" fill="#1a1a2e"/>
      <circle cx="43" cy="57" r="4" fill="#f9a8c9" opacity="0.4"/><circle cx="77" cy="57" r="4" fill="#f9a8c9" opacity="0.4"/>
      <path d="M53 62c2 4 12 4 14 0" stroke="#c97b5d" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M30 95c0-16 13-20 30-20s30 4 30 20v25H30V95z" fill="#db2777"/>
      <path d="M50 75h20v8c0 3-4 6-10 6s-10-3-10-6v-8z" fill="#fde4c8"/>
    </svg>
  );
}

function AvatarDan() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
      <defs><linearGradient id="ld" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse"><stop stopColor="#0891b2"/><stop offset="1" stopColor="#2563eb"/></linearGradient></defs>
      <rect width="120" height="120" rx="28" fill="url(#ld)"/>
      <path d="M36 42c0-14 11-26 24-26s24 12 24 26v2H36v-2z" fill="#1a1a2e"/>
      <ellipse cx="60" cy="54" rx="22" ry="24" fill="#e8c9a0"/>
      <circle cx="49" cy="50" r="8" stroke="#94a3b8" strokeWidth="2" fill="none"/>
      <circle cx="71" cy="50" r="8" stroke="#94a3b8" strokeWidth="2" fill="none"/>
      <line x1="57" y1="50" x2="63" y2="50" stroke="#94a3b8" strokeWidth="1.5"/>
      <circle cx="49" cy="50" r="2.5" fill="#1a1a2e"/><circle cx="71" cy="50" r="2.5" fill="#1a1a2e"/>
      <path d="M54 64c2 3 10 3 12 0" stroke="#b08060" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M30 95c0-16 13-20 30-20s30 4 30 20v25H30V95z" fill="#0e7490"/>
      <path d="M50 75h20v8c0 3-4 6-10 6s-10-3-10-6v-8z" fill="#e8c9a0"/>
    </svg>
  );
}

function AvatarLior() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
      <defs><linearGradient id="ll" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse"><stop stopColor="#7c3aed"/><stop offset="1" stopColor="#ec4899"/></linearGradient></defs>
      <rect width="120" height="120" rx="28" fill="url(#ll)"/>
      <ellipse cx="60" cy="28" rx="26" ry="10" fill="#1a1a2e"/>
      <path d="M34 30c0-10 12-18 26-18s26 8 26 18" fill="#1a1a2e"/>
      <ellipse cx="60" cy="54" rx="22" ry="24" fill="#fde4c8"/>
      <ellipse cx="50" cy="51" rx="3" ry="3" fill="#6d28d9"/><ellipse cx="70" cy="51" rx="3" ry="3" fill="#6d28d9"/>
      <path d="M50 63c3 5 17 5 20 0" stroke="#c97b5d" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M30 95c0-16 13-20 30-20s30 4 30 20v25H30V95z" fill="#5b21b6"/>
      <path d="M50 75h20v8c0 3-4 6-10 6s-10-3-10-6v-8z" fill="#fde4c8"/>
    </svg>
  );
}

function AvatarRoni() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
      <defs><linearGradient id="lr" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse"><stop stopColor="#d97706"/><stop offset="1" stopColor="#dc2626"/></linearGradient></defs>
      <rect width="120" height="120" rx="28" fill="url(#lr)"/>
      <path d="M36 38c2-16 12-24 24-24s22 8 24 24v6H36v-6z" fill="#1a1a2e"/>
      <ellipse cx="60" cy="54" rx="22" ry="24" fill="#deb887"/>
      <ellipse cx="50" cy="50" rx="3" ry="2.5" fill="#1a1a2e"/><ellipse cx="70" cy="50" rx="3" ry="2.5" fill="#1a1a2e"/>
      <path d="M43 44l12-2" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M77 44l-12-2" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M50 63c4 4 16 4 20 0" stroke="#a0704a" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M30 95c0-16 13-20 30-20s30 4 30 20v25H30V95z" fill="#1f2937"/>
      <path d="M50 75h20v8c0 3-4 6-10 6s-10-3-10-6v-8z" fill="#deb887"/>
    </svg>
  );
}

function AvatarYael() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
      <defs><linearGradient id="ly" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse"><stop stopColor="#0d9488"/><stop offset="1" stopColor="#06b6d4"/></linearGradient></defs>
      <rect width="120" height="120" rx="28" fill="url(#ly)"/>
      <ellipse cx="60" cy="40" rx="28" ry="26" fill="#5c3317"/>
      <rect x="32" y="38" width="12" height="30" rx="6" fill="#5c3317"/>
      <rect x="76" y="38" width="12" height="30" rx="6" fill="#5c3317"/>
      <ellipse cx="60" cy="52" rx="21" ry="23" fill="#fde4c8"/>
      <ellipse cx="50" cy="50" rx="3" ry="3.5" fill="#1a1a2e"/><ellipse cx="70" cy="50" rx="3" ry="3.5" fill="#1a1a2e"/>
      <path d="M51 62c3 5 15 5 18 0" stroke="#c97b5d" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M30 95c0-16 13-20 30-20s30 4 30 20v25H30V95z" fill="#0f766e"/>
      <path d="M50 75h20v8c0 3-4 6-10 6s-10-3-10-6v-8z" fill="#fde4c8"/>
    </svg>
  );
}

function AvatarOmer() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
      <defs><linearGradient id="lo" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse"><stop stopColor="#374151"/><stop offset="1" stopColor="#be185d"/></linearGradient></defs>
      <rect width="120" height="120" rx="28" fill="url(#lo)"/>
      <circle cx="48" cy="28" r="10" fill="#2d1b08"/><circle cx="60" cy="24" r="12" fill="#2d1b08"/>
      <circle cx="72" cy="28" r="10" fill="#2d1b08"/><circle cx="54" cy="22" r="8" fill="#2d1b08"/><circle cx="66" cy="22" r="8" fill="#2d1b08"/>
      <ellipse cx="60" cy="54" rx="22" ry="24" fill="#e8c9a0"/>
      <ellipse cx="50" cy="50" rx="3" ry="3" fill="#1a1a2e"/><ellipse cx="70" cy="50" rx="3" ry="3" fill="#1a1a2e"/>
      <path d="M54 63c5 3 14 1 14-2" stroke="#b08060" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M30 95c0-16 13-20 30-20s30 4 30 20v25H30V95z" fill="#4b5563"/>
      <path d="M50 75h20v8c0 3-4 6-10 6s-10-3-10-6v-8z" fill="#e8c9a0"/>
    </svg>
  );
}

function AvatarShira() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
      <defs><linearGradient id="ls" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse"><stop stopColor="#4f46e5"/><stop offset="1" stopColor="#7c3aed"/></linearGradient></defs>
      <rect width="120" height="120" rx="28" fill="url(#ls)"/>
      <ellipse cx="60" cy="36" rx="26" ry="24" fill="#d4a373"/>
      <path d="M82 32c8 4 14 12 14 20" stroke="#d4a373" strokeWidth="8" strokeLinecap="round"/>
      <ellipse cx="60" cy="52" rx="21" ry="23" fill="#fde4c8"/>
      <ellipse cx="50" cy="50" rx="2.5" ry="3" fill="#1a1a2e"/><ellipse cx="70" cy="50" rx="2.5" ry="3" fill="#1a1a2e"/>
      <circle cx="38" cy="56" r="2.5" fill="#eab308" opacity="0.7"/><circle cx="82" cy="56" r="2.5" fill="#eab308" opacity="0.7"/>
      <path d="M52 62c3 4 13 4 16 0" stroke="#c97b5d" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M30 95c0-16 13-20 30-20s30 4 30 20v25H30V95z" fill="#4338ca"/>
      <path d="M50 75h20v8c0 3-4 6-10 6s-10-3-10-6v-8z" fill="#fde4c8"/>
    </svg>
  );
}

function AvatarEyal() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
      <defs><linearGradient id="le" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse"><stop stopColor="#059669"/><stop offset="1" stopColor="#0891b2"/></linearGradient></defs>
      <rect width="120" height="120" rx="28" fill="url(#le)"/>
      <path d="M38 40c1-15 10-24 22-24s21 9 22 24v3H38v-3z" fill="#1a1a2e"/>
      <ellipse cx="60" cy="54" rx="22" ry="24" fill="#deb887"/>
      <ellipse cx="50" cy="50" rx="3.5" ry="3" fill="#1a1a2e"/><ellipse cx="70" cy="50" rx="3.5" ry="3" fill="#1a1a2e"/>
      <path d="M52 63c3 3 13 3 16 0" stroke="#a0704a" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M30 95c0-16 13-20 30-20s30 4 30 20v25H30V95z" fill="#047857"/>
      <path d="M50 75h20v8c0 3-4 6-10 6s-10-3-10-6v-8z" fill="#deb887"/>
    </svg>
  );
}

/* ── Agent data ── */
interface AgentInfo {
  id: string;
  name: string;
  nickname: string;
  role: string;
  icon: LucideIcon;
  gradient: string;
  Avatar: () => JSX.Element;
}

const agentsData: AgentInfo[] = [
  { id: 'maya', name: 'מאיה', nickname: 'מלכת החיפוש', role: 'מומחית SEO', icon: Search, gradient: 'from-emerald-500 to-green-600', Avatar: AvatarMaya },
  { id: 'adam', name: 'אדם', nickname: 'קוסם הקמפיינים', role: 'מומחה PPC', icon: Target, gradient: 'from-blue-600 to-purple-600', Avatar: AvatarAdam },
  { id: 'noa', name: 'נועה', nickname: 'מלכת הקופי', role: 'קופירייטרית', icon: PenTool, gradient: 'from-pink-500 to-orange-500', Avatar: AvatarNoa },
  { id: 'dan', name: 'דן', nickname: 'חכם הנתונים', role: 'מומחה אנליטיקס', icon: BarChart3, gradient: 'from-cyan-500 to-blue-600', Avatar: AvatarDan },
  { id: 'lior', name: 'ליאור', nickname: 'אמן הזהות', role: 'מומחה מיתוג', icon: Palette, gradient: 'from-purple-600 to-pink-500', Avatar: AvatarLior },
  { id: 'roni', name: 'רוני', nickname: 'אדריכל הצמיחה', role: 'יועץ אסטרטגיה', icon: Brain, gradient: 'from-amber-500 to-red-600', Avatar: AvatarRoni },
  { id: 'yael', name: 'יעל', nickname: 'כוכבת הסושיאל', role: 'מנהלת סושיאל', icon: Share2, gradient: 'from-teal-500 to-cyan-500', Avatar: AvatarYael },
  { id: 'omer', name: 'עומר', nickname: 'יוצר הווידאו', role: 'מומחה וידאו', icon: Video, gradient: 'from-gray-600 to-pink-600', Avatar: AvatarOmer },
  { id: 'shira', name: 'שירה', nickname: 'מלכת המיילים', role: 'מומחית Email', icon: Mail, gradient: 'from-indigo-500 to-purple-600', Avatar: AvatarShira },
  { id: 'eyal', name: 'אייל', nickname: 'מאסטר ההמרות', role: 'מומחה CRO', icon: TrendingUp, gradient: 'from-emerald-600 to-cyan-600', Avatar: AvatarEyal },
];

/* ── Main component ── */
export function AgentsSection() {
  const navigate = useNavigate();
  const reveal = useScrollReveal();

  return (
    <section
      ref={reveal.ref}
      className={`py-20 sm:py-28 px-4 bg-gradient-to-b from-[#0f0a2e] via-[#1a1145] to-[#0f0a2e] relative overflow-hidden section-reveal ${
        reveal.isVisible ? 'is-visible' : ''
      }`}
    >
      {/* Background glows */}
      <div className="absolute top-[10%] right-[15%] w-[400px] h-[400px] bg-purple-600 rounded-full blur-[120px] opacity-15" />
      <div className="absolute bottom-[10%] left-[10%] w-[350px] h-[350px] bg-blue-500 rounded-full blur-[100px] opacity-10" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30 rounded-full text-sm">
            <Bot className="w-3.5 h-3.5 ml-1.5" />
            משרד פרסום AI מלא
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">
            הכירו את{' '}
            <span className="bg-gradient-to-l from-purple-400 via-violet-400 to-blue-400 bg-clip-text text-transparent">
              הצוות
            </span>{' '}
            שלכם
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
            10 סוכני AI מומחים שעובדים 24/7 - כל אחד עם התמחות ייחודית, שם ואישיות.
            כמו משרד פרסום שלם, בלחיצת כפתור.
          </p>
        </div>

        {/* Agent cards grid */}
        <div
          className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-10 stagger-reveal ${
            reveal.isVisible ? 'is-visible' : ''
          }`}
        >
          {agentsData.map((agent) => {
            const Icon = agent.icon;
            return (
              <button
                key={agent.id}
                onClick={() => navigate('/ai-agents')}
                className="group relative rounded-2xl overflow-hidden text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl active:scale-[0.97]"
              >
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${agent.gradient} opacity-90`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                <div className="relative p-3 sm:p-4">
                  {/* Avatar */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-2 rounded-xl overflow-hidden shadow-lg border-2 border-white/20 group-hover:scale-105 transition-transform">
                    <agent.Avatar />
                  </div>

                  {/* Name */}
                  <div className="font-extrabold text-white text-sm sm:text-base leading-tight">
                    {agent.name}
                  </div>
                  <div className="text-[10px] sm:text-xs text-white/70 font-medium mb-1">
                    {agent.nickname}
                  </div>

                  {/* Role pill */}
                  <span className="inline-block text-[9px] sm:text-[10px] bg-white/15 text-white/90 rounded-full px-2 py-0.5">
                    {agent.role}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            onClick={() => navigate('/ai-agents')}
            size="lg"
            className="text-base px-10 py-6 rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all group bg-white text-purple-700 hover:bg-white/95"
          >
            <span className="flex items-center gap-3">
              <Bot className="w-5 h-5" />
              התחל שיחה עם הצוות
              <ArrowLeft className="w-5 h-5 group-hover:translate-x-[-4px] transition-transform" />
            </span>
          </Button>
          <p className="text-sm text-gray-500 mt-3">
            3 הודעות חינם לכל סוכן • ללא הרשמה
          </p>
        </div>
      </div>
    </section>
  );
}
