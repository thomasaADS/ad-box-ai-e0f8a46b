import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import {
  Search,
  Target,
  TrendingUp,
  BarChart3,
  Globe,
  Megaphone,
  Sparkles,
  Send,
  Bot,
  User,
  Lock,
  ArrowLeft,
  Brain,
  Zap,
  MessageSquare,
  FileText,
  Palette,
  PenTool,
  Eye,
  MousePointerClick,
  Crown,
  Star,
  CheckCircle,
  Loader2,
  X,
  Mail,
  Video,
  Share2,
  type LucideIcon,
} from 'lucide-react';

// ============================================================
// SVG Avatar Illustrations
// ============================================================

function AvatarMaya() {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="maya-bg" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
          <stop stopColor="#059669" /><stop offset="1" stopColor="#10b981" />
        </linearGradient>
      </defs>
      <rect width="120" height="120" rx="28" fill="url(#maya-bg)" />
      {/* Hair */}
      <ellipse cx="60" cy="38" rx="28" ry="26" fill="#1a1a2e" />
      <path d="M32 42c0 0-2 20 0 30" stroke="#1a1a2e" strokeWidth="8" strokeLinecap="round" />
      <path d="M88 42c0 0 2 20 0 30" stroke="#1a1a2e" strokeWidth="8" strokeLinecap="round" />
      {/* Face */}
      <ellipse cx="60" cy="52" rx="22" ry="24" fill="#fde4c8" />
      {/* Glasses */}
      <rect x="42" y="46" width="14" height="11" rx="3" stroke="#374151" strokeWidth="2.5" fill="none" />
      <rect x="64" y="46" width="14" height="11" rx="3" stroke="#374151" strokeWidth="2.5" fill="none" />
      <line x1="56" y1="51" x2="64" y2="51" stroke="#374151" strokeWidth="2" />
      {/* Eyes */}
      <circle cx="49" cy="52" r="2.5" fill="#1a1a2e" />
      <circle cx="71" cy="52" r="2.5" fill="#1a1a2e" />
      {/* Smile */}
      <path d="M52 62c0 0 4 5 16 0" stroke="#c97b5d" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Body/shoulders */}
      <path d="M30 95c0-16 13-20 30-20s30 4 30 20v25H30V95z" fill="#059669" />
      <path d="M50 75h20v8c0 3-4 6-10 6s-10-3-10-6v-8z" fill="#fde4c8" />
      {/* Magnifying glass accessory */}
      <circle cx="92" cy="28" r="8" stroke="white" strokeWidth="2.5" fill="none" opacity="0.8" />
      <line x1="98" y1="34" x2="104" y2="40" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
    </svg>
  );
}

function AvatarAdam() {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="adam-bg" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2563eb" /><stop offset="1" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      <rect width="120" height="120" rx="28" fill="url(#adam-bg)" />
      {/* Hair */}
      <path d="M36 40c0-14 11-25 24-25s24 11 24 25v4H36v-4z" fill="#2d1b08" />
      {/* Face */}
      <ellipse cx="60" cy="52" rx="22" ry="23" fill="#e8c9a0" />
      {/* Eyes */}
      <ellipse cx="50" cy="50" rx="3" ry="3.5" fill="#1a1a2e" />
      <ellipse cx="70" cy="50" rx="3" ry="3.5" fill="#1a1a2e" />
      <circle cx="51.5" cy="49" r="1" fill="white" />
      <circle cx="71.5" cy="49" r="1" fill="white" />
      {/* Eyebrows */}
      <path d="M44 44c2-2 6-3 9-1" stroke="#2d1b08" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M67 43c3-2 7-1 9 1" stroke="#2d1b08" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Smile */}
      <path d="M52 62c3 4 13 4 16 0" stroke="#c08060" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Headphones */}
      <path d="M34 48c-2-16 10-30 26-30s28 14 26 30" stroke="#e2e8f0" strokeWidth="3.5" fill="none" />
      <rect x="28" y="44" width="8" height="14" rx="4" fill="#e2e8f0" />
      <rect x="84" y="44" width="8" height="14" rx="4" fill="#e2e8f0" />
      {/* Body */}
      <path d="M30 95c0-16 13-20 30-20s30 4 30 20v25H30V95z" fill="#1e40af" />
      <path d="M50 75h20v8c0 3-4 6-10 6s-10-3-10-6v-8z" fill="#e8c9a0" />
      {/* Target icon */}
      <circle cx="95" cy="95" r="10" fill="white" opacity="0.15" />
      <circle cx="95" cy="95" r="6" fill="white" opacity="0.15" />
      <circle cx="95" cy="95" r="2.5" fill="white" opacity="0.3" />
    </svg>
  );
}

function AvatarNoa() {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="noa-bg" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ec4899" /><stop offset="1" stopColor="#f97316" />
        </linearGradient>
      </defs>
      <rect width="120" height="120" rx="28" fill="url(#noa-bg)" />
      {/* Long hair */}
      <ellipse cx="60" cy="40" rx="30" ry="28" fill="#8B4513" />
      <path d="M30 44c-2 18-1 34 4 42" stroke="#8B4513" strokeWidth="10" strokeLinecap="round" />
      <path d="M90 44c2 18 1 34-4 42" stroke="#8B4513" strokeWidth="10" strokeLinecap="round" />
      {/* Face */}
      <ellipse cx="60" cy="52" rx="21" ry="23" fill="#fde4c8" />
      {/* Eyes - with lashes */}
      <ellipse cx="50" cy="50" rx="3" ry="3.5" fill="#1a1a2e" />
      <ellipse cx="70" cy="50" rx="3" ry="3.5" fill="#1a1a2e" />
      <path d="M45 47c2-2 4-2 6 0" stroke="#1a1a2e" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M65 47c2-2 4-2 6 0" stroke="#1a1a2e" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* Blush */}
      <circle cx="43" cy="57" r="4" fill="#f9a8c9" opacity="0.4" />
      <circle cx="77" cy="57" r="4" fill="#f9a8c9" opacity="0.4" />
      {/* Smile */}
      <path d="M53 62c2 4 12 4 14 0" stroke="#c97b5d" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Body */}
      <path d="M30 95c0-16 13-20 30-20s30 4 30 20v25H30V95z" fill="#db2777" />
      <path d="M50 75h20v8c0 3-4 6-10 6s-10-3-10-6v-8z" fill="#fde4c8" />
      {/* Pen accessory */}
      <line x1="94" y1="18" x2="100" y2="38" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
      <path d="M100 38l-2 5 4-1-2-4z" fill="white" opacity="0.7" />
    </svg>
  );
}

function AvatarDan() {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="dan-bg" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0891b2" /><stop offset="1" stopColor="#2563eb" />
        </linearGradient>
      </defs>
      <rect width="120" height="120" rx="28" fill="url(#dan-bg)" />
      {/* Short hair */}
      <path d="M36 42c0-14 11-26 24-26s24 12 24 26v2H36v-2z" fill="#1a1a2e" />
      {/* Face */}
      <ellipse cx="60" cy="54" rx="22" ry="24" fill="#e8c9a0" />
      {/* Beard */}
      <path d="M42 62c0 10 8 16 18 16s18-6 18-16" fill="#2d2d3d" opacity="0.3" />
      {/* Glasses - round */}
      <circle cx="49" cy="50" r="8" stroke="#94a3b8" strokeWidth="2" fill="none" />
      <circle cx="71" cy="50" r="8" stroke="#94a3b8" strokeWidth="2" fill="none" />
      <line x1="57" y1="50" x2="63" y2="50" stroke="#94a3b8" strokeWidth="1.5" />
      {/* Eyes */}
      <circle cx="49" cy="50" r="2.5" fill="#1a1a2e" />
      <circle cx="71" cy="50" r="2.5" fill="#1a1a2e" />
      {/* Minimal smile */}
      <path d="M54 64c2 3 10 3 12 0" stroke="#b08060" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* Body */}
      <path d="M30 95c0-16 13-20 30-20s30 4 30 20v25H30V95z" fill="#0e7490" />
      <path d="M50 75h20v8c0 3-4 6-10 6s-10-3-10-6v-8z" fill="#e8c9a0" />
      {/* Chart bars icon */}
      <rect x="88" y="20" width="5" height="16" rx="2" fill="white" opacity="0.25" />
      <rect x="96" y="14" width="5" height="22" rx="2" fill="white" opacity="0.25" />
      <rect x="104" y="24" width="5" height="12" rx="2" fill="white" opacity="0.25" />
    </svg>
  );
}

function AvatarLior() {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="lior-bg" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7c3aed" /><stop offset="1" stopColor="#ec4899" />
        </linearGradient>
      </defs>
      <rect width="120" height="120" rx="28" fill="url(#lior-bg)" />
      {/* Beret */}
      <ellipse cx="60" cy="28" rx="26" ry="10" fill="#1a1a2e" />
      <path d="M34 30c0-10 12-18 26-18s26 8 26 18" fill="#1a1a2e" />
      <circle cx="60" cy="16" r="3" fill="#1a1a2e" />
      {/* Hair */}
      <path d="M38 36c-2 6-2 14 0 18" stroke="#4a3728" strokeWidth="6" strokeLinecap="round" />
      <path d="M82 36c2 6 2 14 0 18" stroke="#4a3728" strokeWidth="6" strokeLinecap="round" />
      {/* Face */}
      <ellipse cx="60" cy="54" rx="22" ry="24" fill="#fde4c8" />
      {/* Eyes - creative */}
      <ellipse cx="50" cy="51" rx="3" ry="3" fill="#6d28d9" />
      <ellipse cx="70" cy="51" rx="3" ry="3" fill="#6d28d9" />
      <circle cx="51" cy="50" r="1.2" fill="white" />
      <circle cx="71" cy="50" r="1.2" fill="white" />
      {/* Wide smile */}
      <path d="M50 63c3 5 17 5 20 0" stroke="#c97b5d" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Body */}
      <path d="M30 95c0-16 13-20 30-20s30 4 30 20v25H30V95z" fill="#5b21b6" />
      <path d="M50 75h20v8c0 3-4 6-10 6s-10-3-10-6v-8z" fill="#fde4c8" />
      {/* Palette icon */}
      <circle cx="18" cy="90" r="10" fill="white" opacity="0.15" />
      <circle cx="14" cy="86" r="2.5" fill="#ef4444" opacity="0.4" />
      <circle cx="22" cy="84" r="2.5" fill="#3b82f6" opacity="0.4" />
      <circle cx="20" cy="94" r="2.5" fill="#eab308" opacity="0.4" />
    </svg>
  );
}

function AvatarRoni() {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="roni-bg" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
          <stop stopColor="#d97706" /><stop offset="1" stopColor="#dc2626" />
        </linearGradient>
      </defs>
      <rect width="120" height="120" rx="28" fill="url(#roni-bg)" />
      {/* Slicked hair */}
      <path d="M36 38c2-16 12-24 24-24s22 8 24 24v6H36v-6z" fill="#1a1a2e" />
      {/* Face */}
      <ellipse cx="60" cy="54" rx="22" ry="24" fill="#deb887" />
      {/* Eyes - sharp */}
      <ellipse cx="50" cy="50" rx="3" ry="2.5" fill="#1a1a2e" />
      <ellipse cx="70" cy="50" rx="3" ry="2.5" fill="#1a1a2e" />
      {/* Sharp eyebrows */}
      <path d="M43 44l12-2" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M77 44l-12-2" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round" />
      {/* Confident smile */}
      <path d="M50 63c4 4 16 4 20 0" stroke="#a0704a" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Body - suit */}
      <path d="M30 95c0-16 13-20 30-20s30 4 30 20v25H30V95z" fill="#1f2937" />
      <path d="M55 75h10v18H55z" fill="white" opacity="0.1" />
      <path d="M50 75h20v8c0 3-4 6-10 6s-10-3-10-6v-8z" fill="#deb887" />
      {/* Tie */}
      <path d="M58 82l2 14 2-14" fill="#d97706" />
      {/* Chess piece icon */}
      <path d="M96 18v6M93 21h6" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

function AvatarYael() {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="yael-bg" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0d9488" /><stop offset="1" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      <rect width="120" height="120" rx="28" fill="url(#yael-bg)" />
      {/* Bob haircut */}
      <ellipse cx="60" cy="40" rx="28" ry="26" fill="#5c3317" />
      <rect x="32" y="38" width="12" height="30" rx="6" fill="#5c3317" />
      <rect x="76" y="38" width="12" height="30" rx="6" fill="#5c3317" />
      {/* Face */}
      <ellipse cx="60" cy="52" rx="21" ry="23" fill="#fde4c8" />
      {/* Eyes */}
      <ellipse cx="50" cy="50" rx="3" ry="3.5" fill="#1a1a2e" />
      <ellipse cx="70" cy="50" rx="3" ry="3.5" fill="#1a1a2e" />
      <circle cx="51.5" cy="49" r="1.2" fill="white" />
      <circle cx="71.5" cy="49" r="1.2" fill="white" />
      {/* Wink eye */}
      {/* Smile */}
      <path d="M51 62c3 5 15 5 18 0" stroke="#c97b5d" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Body */}
      <path d="M30 95c0-16 13-20 30-20s30 4 30 20v25H30V95z" fill="#0f766e" />
      <path d="M50 75h20v8c0 3-4 6-10 6s-10-3-10-6v-8z" fill="#fde4c8" />
      {/* Phone in hand */}
      <rect x="88" y="70" width="12" height="20" rx="3" fill="white" opacity="0.2" />
      <rect x="90" y="73" width="8" height="12" rx="1" fill="white" opacity="0.15" />
    </svg>
  );
}

function AvatarOmer() {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="omer-bg" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
          <stop stopColor="#374151" /><stop offset="1" stopColor="#be185d" />
        </linearGradient>
      </defs>
      <rect width="120" height="120" rx="28" fill="url(#omer-bg)" />
      {/* Curly/messy hair */}
      <circle cx="48" cy="28" r="10" fill="#2d1b08" />
      <circle cx="60" cy="24" r="12" fill="#2d1b08" />
      <circle cx="72" cy="28" r="10" fill="#2d1b08" />
      <circle cx="54" cy="22" r="8" fill="#2d1b08" />
      <circle cx="66" cy="22" r="8" fill="#2d1b08" />
      {/* Face */}
      <ellipse cx="60" cy="54" rx="22" ry="24" fill="#e8c9a0" />
      {/* Stubble */}
      <ellipse cx="60" cy="66" rx="14" ry="8" fill="#c4a882" opacity="0.3" />
      {/* Eyes */}
      <ellipse cx="50" cy="50" rx="3" ry="3" fill="#1a1a2e" />
      <ellipse cx="70" cy="50" rx="3" ry="3" fill="#1a1a2e" />
      {/* Cool half smile */}
      <path d="M54 63c5 3 14 1 14-2" stroke="#b08060" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Body */}
      <path d="M30 95c0-16 13-20 30-20s30 4 30 20v25H30V95z" fill="#4b5563" />
      <path d="M50 75h20v8c0 3-4 6-10 6s-10-3-10-6v-8z" fill="#e8c9a0" />
      {/* Camera/video icon */}
      <rect x="84" y="16" width="18" height="13" rx="3" fill="white" opacity="0.2" />
      <circle cx="93" cy="22" r="4" stroke="white" strokeWidth="1.5" fill="none" opacity="0.3" />
      <path d="M102 18l6-3v16l-6-3z" fill="white" opacity="0.2" />
    </svg>
  );
}

function AvatarShira() {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="shira-bg" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4f46e5" /><stop offset="1" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      <rect width="120" height="120" rx="28" fill="url(#shira-bg)" />
      {/* Ponytail hair */}
      <ellipse cx="60" cy="36" rx="26" ry="24" fill="#d4a373" />
      <path d="M82 32c8 4 14 12 14 20" stroke="#d4a373" strokeWidth="8" strokeLinecap="round" />
      <circle cx="98" cy="56" r="5" fill="#d4a373" />
      {/* Face */}
      <ellipse cx="60" cy="52" rx="21" ry="23" fill="#fde4c8" />
      {/* Eyes */}
      <ellipse cx="50" cy="50" rx="2.5" ry="3" fill="#1a1a2e" />
      <ellipse cx="70" cy="50" rx="2.5" ry="3" fill="#1a1a2e" />
      <circle cx="51" cy="49" r="1" fill="white" />
      <circle cx="71" cy="49" r="1" fill="white" />
      {/* Earrings */}
      <circle cx="38" cy="56" r="2.5" fill="#eab308" opacity="0.7" />
      <circle cx="82" cy="56" r="2.5" fill="#eab308" opacity="0.7" />
      {/* Smile */}
      <path d="M52 62c3 4 13 4 16 0" stroke="#c97b5d" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Body */}
      <path d="M30 95c0-16 13-20 30-20s30 4 30 20v25H30V95z" fill="#4338ca" />
      <path d="M50 75h20v8c0 3-4 6-10 6s-10-3-10-6v-8z" fill="#fde4c8" />
      {/* Mail icon */}
      <rect x="12" y="90" width="16" height="11" rx="2" fill="white" opacity="0.2" />
      <path d="M12 92l8 5 8-5" stroke="white" strokeWidth="1.5" fill="none" opacity="0.3" />
    </svg>
  );
}

function AvatarEyal() {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="eyal-bg" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
          <stop stopColor="#059669" /><stop offset="1" stopColor="#0891b2" />
        </linearGradient>
      </defs>
      <rect width="120" height="120" rx="28" fill="url(#eyal-bg)" />
      {/* Short neat hair */}
      <path d="M38 40c1-15 10-24 22-24s21 9 22 24v3H38v-3z" fill="#1a1a2e" />
      {/* Face */}
      <ellipse cx="60" cy="54" rx="22" ry="24" fill="#deb887" />
      {/* Eyes - focused */}
      <ellipse cx="50" cy="50" rx="3.5" ry="3" fill="#1a1a2e" />
      <ellipse cx="70" cy="50" rx="3.5" ry="3" fill="#1a1a2e" />
      <circle cx="51.5" cy="49" r="1.2" fill="white" />
      <circle cx="71.5" cy="49" r="1.2" fill="white" />
      {/* Determined eyebrows */}
      <path d="M44 44c3-2 7-2 10 0" stroke="#1a1a2e" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M66 44c3-2 7-2 10 0" stroke="#1a1a2e" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Smile */}
      <path d="M52 63c3 3 13 3 16 0" stroke="#a0704a" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Body */}
      <path d="M30 95c0-16 13-20 30-20s30 4 30 20v25H30V95z" fill="#047857" />
      <path d="M50 75h20v8c0 3-4 6-10 6s-10-3-10-6v-8z" fill="#deb887" />
      {/* Arrow up icon */}
      <path d="M96 28v-12M90 22l6-6 6 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
    </svg>
  );
}

// Avatar map
const avatarComponents: Record<string, () => JSX.Element> = {
  maya: AvatarMaya,
  adam: AvatarAdam,
  noa: AvatarNoa,
  dan: AvatarDan,
  lior: AvatarLior,
  roni: AvatarRoni,
  yael: AvatarYael,
  omer: AvatarOmer,
  shira: AvatarShira,
  eyal: AvatarEyal,
};

// ============================================================
// Agent Types
// ============================================================

interface AIAgent {
  id: string;
  name: string;
  nameEn: string;
  nickname: string;
  role: string;
  description: string;
  gradient: string;
  icon: LucideIcon;
  specialties: string[];
  sampleQuestions: string[];
  personality: string;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  agentId: string;
}

// ============================================================
// Agent definitions - Ad Agency Team
// ============================================================

const agents: AIAgent[] = [
  {
    id: 'maya',
    name: 'מאיה',
    nameEn: 'Maya',
    nickname: 'מלכת החיפוש',
    role: 'מומחית SEO וצמיחה אורגנית',
    description: 'מומחית SEO מנוסה שעוזרת לך לכבוש את הדירוג בגוגל, לנתח מילות מפתח, לבנות אסטרטגיית תוכן אורגני ולמקסם תנועה.',
    gradient: 'from-emerald-500 to-green-600',
    icon: Search,
    specialties: ['מחקר מילות מפתח', 'אופטימיזציית On-Page', 'בניית קישורים', 'SEO טכני', 'תוכן SEO', 'SEO מקומי'],
    sampleQuestions: [
      'איך אני משפר את ה-SEO של האתר שלי?',
      'עזרי לי למצוא מילות מפתח לעסק שלי',
      'מה זה SEO טכני ולמה זה חשוב?',
      'איך בונים אסטרטגיית קישורים?',
    ],
    personality: 'אני מאיה, מומחית SEO עם ניסיון רב בשוק הישראלי. אני חיה ונושמת קידום אורגני - ממחקר מילות מפתח, דרך אופטימיזציה טכנית ועד בניית תוכן שמושך תנועה. תמיד מעודכנת באלגוריתמים האחרונים של גוגל.',
  },
  {
    id: 'adam',
    name: 'אדם',
    nameEn: 'Adam',
    nickname: 'קוסם הקמפיינים',
    role: 'מומחה PPC ומדיה ממומנת',
    description: 'מומחה בקמפיינים ממומנים בגוגל, פייסבוק, אינסטגרם וטיקטוק. עוזר לך למקסם ROI ולהוריד עלויות.',
    gradient: 'from-blue-600 to-purple-600',
    icon: Target,
    specialties: ['Google Ads', 'Facebook Ads', 'TikTok Ads', 'אופטימיזציית CPC', 'טרגוט קהלים', 'A/B Testing'],
    sampleQuestions: [
      'איך אני מגדיר קמפיין גוגל?',
      'מה התקציב המומלץ לפרסום בפייסבוק?',
      'איך אני מוריד את עלות הקליק?',
      'עזור לי לבנות קמפיין לידים',
    ],
    personality: 'אני אדם, מומחה PPC שחי ונושם פרסום ממומן. מתמחה בגוגל, פייסבוק וכל הפלטפורמות. אני עוזר לעסקים למקסם ROI, לבנות קמפיינים ממוקדים ולהגיע לקהל הנכון במחיר הנכון.',
  },
  {
    id: 'noa',
    name: 'נועה',
    nameEn: 'Noa',
    nickname: 'מלכת הקופי',
    role: 'קופירייטרית וסטרטגית תוכן',
    description: 'מומחית ביצירת קופי שמוכר, אסטרטגיית תוכן, פוסטים לרשתות חברתיות וטקסטים שמושכים לקוחות.',
    gradient: 'from-pink-500 to-orange-500',
    icon: PenTool,
    specialties: ['קופירייטינג', 'שיווק תוכן', 'כותרות ממירות', 'בלוג עסקי', 'ניוזלטר', 'סטוריטלינג'],
    sampleQuestions: [
      'כתבי לי פוסט לפייסבוק על העסק שלי',
      'איך בונים אסטרטגיית תוכן?',
      'עזרי לי לכתוב כותרות מושכות',
      'תני לי רעיונות לפוסטים לאינסטגרם',
    ],
    personality: 'אני נועה, קופירייטרית שמתמחית בתוכן שמוכר ומרגש. מכל משפט אני יוצרת חוויה - מקופי למודעות, דרך פוסטים לסושיאל ועד סטוריטלינג שמייצר מעורבות אמיתית.',
  },
  {
    id: 'dan',
    name: 'דן',
    nameEn: 'Dan',
    nickname: 'חכם הנתונים',
    role: 'מומחה אנליטיקס וBI',
    description: 'מנתח נתוני קמפיינים, מדדי ביצוע, המרות ו-ROI. עוזר לקבל החלטות מבוססות נתונים.',
    gradient: 'from-cyan-500 to-blue-600',
    icon: BarChart3,
    specialties: ['Google Analytics', 'דוחות ביצוע', 'ניתוח המרות', 'A/B Testing', 'דשבורדים', 'תחזיות'],
    sampleQuestions: [
      'איך מנתחים ביצועי קמפיין?',
      'מה המדדים החשובים לעקוב אחריהם?',
      'עזור לי להבין דוח Google Analytics',
      'איך משפרים שיעור המרה?',
    ],
    personality: 'אני דן, חכם הנתונים של הצוות. אני הופך מספרים לתובנות ותובנות להחלטות חכמות. Google Analytics, דשבורדים, A/B testing - הכל עובר דרכי. אני רואה את הסיפור שמסתתר מאחורי כל מספר.',
  },
  {
    id: 'lior',
    name: 'ליאור',
    nameEn: 'Lior',
    nickname: 'אמן הזהות',
    role: 'מומחה מיתוג וזהות חזותית',
    description: 'מומחה במיתוג, זהות חזותית, פלטת צבעים, טיפוגרפיה ובניית מותג חזק וייחודי.',
    gradient: 'from-purple-600 to-pink-500',
    icon: Palette,
    specialties: ['זהות מותג', 'עיצוב לוגו', 'פלטת צבעים', 'טון דיבור', 'חווית מותג', 'מיצוב'],
    sampleQuestions: [
      'איך בונים זהות מותגית?',
      'עזור לי לבחור צבעים למותג',
      'מה עושה לוגו טוב?',
      'איך מגדירים טון דיבור למותג?',
    ],
    personality: 'אני ליאור, אמן הזהות. אני מתמחה בבניית מותגים שנחרטים בזיכרון - מלוגו ופלטת צבעים ועד טון דיבור וחווית מותג שלמה. כל עסק הוא יצירת אומנות שמחכה שייתנו לה צורה.',
  },
  {
    id: 'roni',
    name: 'רוני',
    nameEn: 'Roni',
    nickname: 'אדריכל הצמיחה',
    role: 'יועץ אסטרטגיה דיגיטלית',
    description: 'יועץ אסטרטגי שבונה תוכנית שיווק מקיפה, מתכנן תקציבים ומגדיר מטרות עסקיות.',
    gradient: 'from-amber-500 to-red-600',
    icon: Brain,
    specialties: ['אסטרטגיה דיגיטלית', 'תכנון תקציב', 'הגדרת KPIs', 'ניתוח שוק', 'תוכנית שיווק', 'צמיחה'],
    sampleQuestions: [
      'עזור לי לבנות תוכנית שיווק',
      'מה התקציב הנכון לעסק שלי?',
      'איך מגדירים KPIs?',
      'תן לי אסטרטגיה לצמיחה',
    ],
    personality: 'אני רוני, אדריכל הצמיחה. אני רואה את התמונה הגדולה - מניתוח שוק ומתחרים, דרך תכנון תקציבים חכם ועד בניית אסטרטגיה שמביאה תוצאות. כל עסק צריך תוכנית, ואני בונה אותה.',
  },
  {
    id: 'yael',
    name: 'יעל',
    nameEn: 'Yael',
    nickname: 'כוכבת הסושיאל',
    role: 'מנהלת סושיאל מדיה',
    description: 'מומחית ברשתות חברתיות - אסטרטגיית תוכן, לוח פרסום, מעורבות קהל, טרנדים וויראליות.',
    gradient: 'from-teal-500 to-cyan-500',
    icon: Share2,
    specialties: ['אסטרטגיית סושיאל', 'לוח תוכן', 'Instagram Reels', 'TikTok', 'קהילות', 'ויראליות'],
    sampleQuestions: [
      'איך בונים נוכחות חזקה באינסטגרם?',
      'עזרי לי ליצור לוח תוכן שבועי',
      'מה הטרנדים החמים בטיקטוק?',
      'איך מגדילים מעורבות בפוסטים?',
    ],
    personality: 'אני יעל, כוכבת הסושיאל. אני יודעת בדיוק מה עובד ברשתות - מאינסטגרם וטיקטוק ועד לינקדאין ופייסבוק. אני בונה אסטרטגיות תוכן שמייצרות מעורבות אמיתית וצמיחה אורגנית.',
  },
  {
    id: 'omer',
    name: 'עומר',
    nameEn: 'Omer',
    nickname: 'יוצר הווידאו',
    role: 'מומחה וידאו וקריאייטיב',
    description: 'מומחה בייצור סרטוני פרסום, Reels, סטוריז ותוכן וידאו שמושך תשומת לב ומוכר.',
    gradient: 'from-gray-700 to-pink-600',
    icon: Video,
    specialties: ['סרטוני מודעות', 'YouTube Ads', 'Reels', 'סטוריז', 'UGC', 'סקריפטים'],
    sampleQuestions: [
      'איך יוצרים סרטון מודעה אפקטיבי?',
      'מה האורך האידיאלי לסרטון פרסומי?',
      'עזור לי לכתוב סקריפט לסרטון',
      'איך יוצרים Reels שמקבלים צפיות?',
    ],
    personality: 'אני עומר, יוצר הווידאו של הצוות. אני מתמחה בסרטוני פרסום שעוצרים את האגודל - ממודעות וידאו לפייסבוק ויוטיוב, דרך Reels וסטוריז ועד UGC. אני יודע בדיוק מה עובד בכל פלטפורמה.',
  },
  {
    id: 'shira',
    name: 'שירה',
    nameEn: 'Shira',
    nickname: 'מלכת המיילים',
    role: 'מומחית Email Marketing',
    description: 'מומחית באוטומציות שיווק, ניוזלטרים, סדרות טיפוח לידים וקמפיינים מבוססי מייל.',
    gradient: 'from-indigo-600 to-purple-600',
    icon: Mail,
    specialties: ['אוטומציות מייל', 'ניוזלטרים', 'טיפוח לידים', 'סגמנטציה', 'A/B Testing מיילים', 'כותרות מיילים'],
    sampleQuestions: [
      'איך בונים רשימת תפוצה?',
      'עזרי לי לכתוב ניוזלטר ממיר',
      'מה שיעור פתיחה טוב למיילים?',
      'איך בונים אוטומציית טיפוח לידים?',
    ],
    personality: 'אני שירה, מלכת המיילים. אימייל מרקטינג זה לא סתם לשלוח מיילים - זה אומנות. אני מתמחה באוטומציות שיווק, ניוזלטרים שפותחים, סדרות טיפוח ושיווק מבוסס דאטה שמייצר מכירות.',
  },
  {
    id: 'eyal',
    name: 'אייל',
    nameEn: 'Eyal',
    nickname: 'מאסטר ההמרות',
    role: 'מומחה CRO וחווית משתמש',
    description: 'מומחה באופטימיזציית שיעורי המרה, חווית משתמש, A/B Testing ושיפור דפי נחיתה.',
    gradient: 'from-emerald-600 to-cyan-600',
    icon: TrendingUp,
    specialties: ['CRO', 'A/B Testing', 'חווית משתמש', 'מפות חום', 'אופטימיזציית טפסים', 'פסיכולוגיית שיווק'],
    sampleQuestions: [
      'איך מעלים את שיעור ההמרה?',
      'עזור לי לשפר את דף הנחיתה',
      'מה A/B Testing ואיך עושים את זה?',
      'איך משתמשים במפות חום?',
    ],
    personality: 'אני אייל, מאסטר ההמרות. כל אחוז של שיפור בשיעור ההמרה שווה כסף רב. אני מתמחה ב-CRO, A/B testing, מפות חום ופסיכולוגיית שיווק - ועוזר לך להפוך יותר מבקרים ללקוחות.',
  },
];

// ============================================================
// Build system prompt for each agent
// ============================================================

function buildSystemPrompt(agent: AIAgent): string {
  return `אתה ${agent.name} (${agent.nameEn}), ${agent.role} בצוות הדיגיטלי של AdSync - פלטפורמת AI לפרסום דיגיטלי.

הכינוי שלך: "${agent.nickname}".

${agent.personality}

ההתמחויות שלך: ${agent.specialties.join(', ')}.

הנחיות חשובות:
- ענה תמיד בעברית
- היה מקצועי אבל ידידותי ונגיש
- תן תשובות ממוקדות בתחום ההתמחות שלך
- אם נשאלת שאלה מחוץ לתחום שלך, הפנה לסוכן המתאים בצוות (למשל: "זה יותר בתחום של דן, חכם הנתונים שלנו")
- השתמש בפורמט markdown לתשובות מסודרות (כותרות, רשימות, bold)
- תן דוגמאות מעשיות מהשוק הישראלי כשרלוונטי
- היה תמציתי ולעניין - אל תכתוב תשובות ארוכות מדי
- שמור על הקשר השיחה - זכור מה נאמר קודם ובנה על זה
- אל תחזור על מידע שכבר נתת - התקדם בשיחה`;
}

// ============================================================
// Supabase AI streaming for agents
// ============================================================

async function streamAgentChat(
  agent: AIAgent,
  conversationMessages: { role: string; content: string }[],
  onChunk: (fullContent: string) => void
): Promise<string> {
  const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

  const systemMessage = {
    role: 'system',
    content: buildSystemPrompt(agent),
  };

  const apiMessages = [systemMessage, ...conversationMessages];

  const resp = await fetch(CHAT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({ messages: apiMessages }),
  });

  if (!resp.ok) {
    if (resp.status === 429) throw new Error('מכסת השימוש הגיעה למקסימום');
    if (resp.status === 402) throw new Error('יש להוסיף קרדיט');
    throw new Error('שגיאה בשרת');
  }

  if (!resp.body) throw new Error('אין תגובה מהשרת');

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let textBuffer = '';
  let streamDone = false;
  let assistantContent = '';

  while (!streamDone) {
    const { done, value } = await reader.read();
    if (done) break;
    textBuffer += decoder.decode(value, { stream: true });

    let newlineIndex: number;
    while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
      let line = textBuffer.slice(0, newlineIndex);
      textBuffer = textBuffer.slice(newlineIndex + 1);

      if (line.endsWith('\r')) line = line.slice(0, -1);
      if (line.startsWith(':') || line.trim() === '') continue;
      if (!line.startsWith('data: ')) continue;

      const jsonStr = line.slice(6).trim();
      if (jsonStr === '[DONE]') {
        streamDone = true;
        break;
      }

      try {
        const parsed = JSON.parse(jsonStr);
        const content = parsed.choices?.[0]?.delta?.content as string | undefined;
        if (content) {
          assistantContent += content;
          onChunk(assistantContent);
        }
      } catch {
        textBuffer = line + '\n' + textBuffer;
        break;
      }
    }
  }

  // Final flush
  if (textBuffer.trim()) {
    for (let raw of textBuffer.split('\n')) {
      if (!raw) continue;
      if (raw.endsWith('\r')) raw = raw.slice(0, -1);
      if (raw.startsWith(':') || raw.trim() === '') continue;
      if (!raw.startsWith('data: ')) continue;
      const jsonStr = raw.slice(6).trim();
      if (jsonStr === '[DONE]') continue;
      try {
        const parsed = JSON.parse(jsonStr);
        const content = parsed.choices?.[0]?.delta?.content as string | undefined;
        if (content) {
          assistantContent += content;
          onChunk(assistantContent);
        }
      } catch {
        /* ignore */
      }
    }
  }

  return assistantContent;
}

// ============================================================
// Main Component
// ============================================================

export default function AIAgents() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [guestMessageCount, setGuestMessageCount] = useState(0);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const GUEST_MESSAGE_LIMIT = 3;

  const activeAgent = agents.find((a) => a.id === selectedAgent);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (selectedAgent) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [selectedAgent]);

  const handleSelectAgent = (agentId: string) => {
    setSelectedAgent(agentId);
    const agent = agents.find((a) => a.id === agentId);
    if (agent) {
      const existingAgentMessages = messages.filter((m) => m.agentId === agentId);
      if (existingAgentMessages.length === 0) {
        setMessages((prev) => [
          ...prev,
          {
            id: `welcome-${agentId}`,
            role: 'assistant',
            content: `שלום! אני ${agent.name}, ${agent.role}.\n\n${agent.description}\n\nאיך אני יכול/ה לעזור לך היום?`,
            timestamp: new Date(),
            agentId,
          },
        ]);
      }
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || !selectedAgent || isTyping) return;

    if (!user && guestMessageCount >= GUEST_MESSAGE_LIMIT) {
      toast.error('נגמרו ההודעות החינמיות! הירשם כדי להמשיך');
      return;
    }

    const agent = agents.find((a) => a.id === selectedAgent);
    if (!agent) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: inputText.trim(),
      timestamp: new Date(),
      agentId: selectedAgent,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    if (!user) {
      setGuestMessageCount((prev) => prev + 1);
    }

    // Build conversation history for this agent (excluding welcome message system text)
    const agentChatHistory = [...messages.filter((m) => m.agentId === selectedAgent), userMessage]
      .map((m) => ({ role: m.role, content: m.content }));

    // Add empty assistant message for streaming
    const assistantMsgId = `agent-${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      {
        id: assistantMsgId,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
        agentId: selectedAgent,
      },
    ]);

    try {
      await streamAgentChat(agent, agentChatHistory, (fullContent) => {
        setMessages((prev) => {
          const newMessages = [...prev];
          const lastIdx = newMessages.findIndex((m) => m.id === assistantMsgId);
          if (lastIdx !== -1) {
            newMessages[lastIdx] = { ...newMessages[lastIdx], content: fullContent };
          }
          return newMessages;
        });
      });
    } catch (error) {
      console.error('Agent chat error:', error);
      // Update the empty message with error text instead of removing it
      setMessages((prev) => {
        const newMessages = [...prev];
        const lastIdx = newMessages.findIndex((m) => m.id === assistantMsgId);
        if (lastIdx !== -1) {
          newMessages[lastIdx] = {
            ...newMessages[lastIdx],
            content: error instanceof Error && error.message !== 'שגיאה בשרת'
              ? error.message
              : 'מצטער, נתקלתי בבעיה טכנית. נסה שוב בבקשה.',
          };
        }
        return newMessages;
      });
      toast.error(error instanceof Error ? error.message : 'שגיאה בחיבור לסוכן');
    } finally {
      setIsTyping(false);
    }
  };

  const currentChatMessages = messages.filter((m) => m.agentId === selectedAgent);

  // Render avatar for agent
  const renderAvatar = (agentId: string, size: 'sm' | 'md' | 'lg' = 'md') => {
    const AvatarComponent = avatarComponents[agentId];
    const sizeClass = size === 'sm' ? 'w-8 h-8' : size === 'md' ? 'w-12 h-12' : 'w-20 h-20';
    if (AvatarComponent) {
      return (
        <div className={`${sizeClass} rounded-xl overflow-hidden shrink-0 shadow-md`}>
          <AvatarComponent />
        </div>
      );
    }
    return <div className={`${sizeClass} rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center`}><Bot className="w-1/2 h-1/2 text-white" /></div>;
  };

  // Gradient map for colorful agent cards
  const gradientMap: Record<string, string> = {
    maya: 'from-emerald-500 to-green-600',
    adam: 'from-blue-600 to-purple-600',
    noa: 'from-pink-500 to-orange-500',
    dan: 'from-cyan-500 to-blue-600',
    lior: 'from-purple-600 to-pink-500',
    roni: 'from-amber-500 to-red-600',
    yael: 'from-teal-500 to-cyan-500',
    omer: 'from-gray-600 to-pink-600',
    shira: 'from-indigo-500 to-purple-600',
    eyal: 'from-emerald-600 to-cyan-600',
  };

  // Business value descriptions
  const businessValue: Record<string, string> = {
    maya: 'תעלי בגוגל ותקבלי תנועה אורגנית חינמית לאתר שלך',
    adam: 'בנה קמפיינים ממומנים שמביאים לידים במחיר הכי נמוך',
    noa: 'קבל טקסטים, פוסטים וקופי שמוכר - מוכן לפרסום',
    dan: 'הבן מה עובד ומה לא עם ניתוח נתונים חכם',
    lior: 'בנה זהות מותגית חזקה שלקוחות זוכרים',
    roni: 'קבל תוכנית שיווק מלאה עם תקציב ו-KPIs',
    yael: 'שלוט ברשתות החברתיות עם תוכן שמייצר מעורבות',
    omer: 'צור סרטוני פרסום שעוצרים את הגלילה',
    shira: 'בנה אוטומציות מייל שמביאות מכירות בשינה',
    eyal: 'הפוך יותר מבקרים ללקוחות משלמים',
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero - colorful gradient */}
      <section className="relative pt-20 sm:pt-24 pb-10 sm:pb-14 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f0a2e] via-[#1a1145] to-[#2d1b69]" />
        <div className="absolute top-[10%] right-[15%] w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-purple-600 rounded-full mix-blend-screen filter blur-[100px] opacity-20" />
        <div className="absolute bottom-[10%] left-[10%] w-[200px] sm:w-[350px] h-[200px] sm:h-[350px] bg-blue-500 rounded-full mix-blend-screen filter blur-[80px] opacity-15" />
        <div className="absolute top-[60%] right-[60%] w-[150px] h-[150px] bg-pink-500 rounded-full mix-blend-screen filter blur-[80px] opacity-10" />

        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <Badge className="mb-3 sm:mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30 rounded-full text-xs sm:text-sm">
            <Bot className="w-3 h-3 sm:w-3.5 sm:h-3.5 ml-1.5" />
            משרד פרסום AI מלא
          </Badge>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white mb-2 sm:mb-3">
            הכירו את <span className="hero-gradient-text">הצוות</span> שלכם
          </h1>
          <p className="text-sm sm:text-lg text-gray-300 max-w-2xl mx-auto mb-4 sm:mb-6 px-2">
            10 סוכני AI מומחים שמתחברים לעסק שלך - כל אחד עם התמחות ייחודית, שם ואישיות. כמו משרד פרסום שלם, 24/7.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {!user && (
              <>
                <Badge variant="outline" className="text-amber-300 border-amber-500/30 bg-amber-500/10 rounded-full text-xs">
                  <MessageSquare className="w-3 h-3 ml-1" />
                  {GUEST_MESSAGE_LIMIT - guestMessageCount} הודעות חינם
                </Badge>
                <Button
                  onClick={() => navigate('/auth')}
                  size="sm"
                  className="rounded-full font-semibold text-xs"
                  style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)', color: 'white' }}
                >
                  <Crown className="w-3.5 h-3.5 ml-1" />
                  הירשם לגישה מלאה
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Chat modal - full screen on mobile */}
      {selectedAgent && activeAgent && (
        <div className="fixed inset-0 z-50 bg-background flex flex-col">
          {/* Chat header with gradient */}
          <div
            className={`flex items-center justify-between px-3 sm:px-5 py-3 sm:py-4 border-b border-white/10`}
            style={{ background: `linear-gradient(135deg, var(--agent-from), var(--agent-to))`,
              // @ts-ignore
              '--agent-from': gradientMap[activeAgent.id]?.includes('emerald-500') ? '#059669' : gradientMap[activeAgent.id]?.includes('blue-600') ? '#2563eb' : gradientMap[activeAgent.id]?.includes('pink-500') ? '#ec4899' : gradientMap[activeAgent.id]?.includes('cyan-500') ? '#06b6d4' : gradientMap[activeAgent.id]?.includes('purple-600') ? '#7c3aed' : gradientMap[activeAgent.id]?.includes('amber-500') ? '#f59e0b' : gradientMap[activeAgent.id]?.includes('teal-500') ? '#14b8a6' : gradientMap[activeAgent.id]?.includes('gray-600') ? '#4b5563' : gradientMap[activeAgent.id]?.includes('indigo-500') ? '#6366f1' : '#059669',
              '--agent-to': '#2563eb',
            } as React.CSSProperties}
          >
            <div className="flex items-center gap-2.5 sm:gap-3">
              {renderAvatar(activeAgent.id, 'sm')}
              <div>
                <div className="font-bold text-white text-sm flex items-center gap-1.5">
                  {activeAgent.name}
                  <span className="text-[10px] font-normal text-white/70">({activeAgent.nickname})</span>
                </div>
                <div className="text-[10px] text-white/70 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                  {activeAgent.role}
                </div>
              </div>
            </div>
            <button
              onClick={() => setSelectedAgent(null)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gradient-to-b from-muted/20 to-background">
            {currentChatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 sm:gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                {msg.role === 'user' ? (
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                    <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                ) : (
                  renderAvatar(activeAgent.id, 'sm')
                )}
                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-3 py-2.5 sm:p-4 text-[13px] sm:text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-md'
                      : 'bg-card border border-border/50 rounded-bl-md shadow-sm'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                  {msg.content && (
                    <div className={`text-[9px] sm:text-[10px] mt-1.5 ${msg.role === 'user' ? 'text-primary-foreground/50' : 'text-muted-foreground/60'}`}>
                      {msg.timestamp.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && currentChatMessages[currentChatMessages.length - 1]?.content === '' && null}
            {isTyping && (currentChatMessages.length === 0 || currentChatMessages[currentChatMessages.length - 1]?.content !== '') && (
              <div className="flex gap-2 sm:gap-3">
                {renderAvatar(activeAgent.id, 'sm')}
                <div className="bg-card border border-border/50 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            {currentChatMessages.length <= 1 && !isTyping && (
              <div className="pt-2 sm:pt-4">
                <p className="text-[11px] sm:text-xs text-muted-foreground mb-2 sm:mb-3">שאלות לדוגמה:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                  {activeAgent.sampleQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setInputText(q);
                        setTimeout(() => inputRef.current?.focus(), 50);
                      }}
                      className="text-right text-[12px] sm:text-sm p-2.5 sm:p-3 rounded-xl border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all text-muted-foreground hover:text-foreground"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {!user && guestMessageCount >= GUEST_MESSAGE_LIMIT && (
            <div className="p-3 sm:p-4 bg-amber-500/10 border-t border-amber-500/20">
              <div className="flex items-center gap-2 sm:gap-3">
                <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-semibold text-amber-700 truncate">נגמרו ההודעות החינמיות</p>
                </div>
                <Button
                  onClick={() => navigate('/auth')}
                  size="sm"
                  className="rounded-lg font-semibold text-[11px] sm:text-xs shrink-0"
                  style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)', color: 'white' }}
                >
                  הירשם
                </Button>
              </div>
            </div>
          )}

          {/* Chat input - mobile optimized */}
          <div className="p-2.5 sm:p-4 border-t border-border/50 bg-background safe-area-bottom">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                placeholder={
                  !user && guestMessageCount >= GUEST_MESSAGE_LIMIT
                    ? 'הירשם כדי להמשיך...'
                    : `שאל/י את ${activeAgent.name}...`
                }
                disabled={(!user && guestMessageCount >= GUEST_MESSAGE_LIMIT) || isTyping}
                className="h-11 sm:h-12 text-[13px] sm:text-sm rounded-xl"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping || (!user && guestMessageCount >= GUEST_MESSAGE_LIMIT)}
                className="h-11 w-11 sm:h-12 sm:w-12 rounded-xl shrink-0"
                style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)', color: 'white' }}
              >
                {isTyping ? <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" /> : <Send className="w-4 h-4 sm:w-5 sm:h-5" />}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Agent cards grid - colorful, Marblism-inspired */}
      {!selectedAgent && (
        <div className="container mx-auto max-w-6xl px-4 pb-16 -mt-4 sm:-mt-6">
          {/* Why section */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-extrabold mb-2">למה צריך צוות AI בעסק?</h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto">
              כל סוכן מתחבר למערכות שלך ועובד 24/7. בחר סוכן, שאל שאלה, וקבל תשובה מקצועית מיידית.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {agents.map((agent) => {
              const Icon = agent.icon;
              return (
                <button
                  key={agent.id}
                  onClick={() => handleSelectAgent(agent.id)}
                  className="group relative rounded-2xl overflow-hidden text-right transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-[0.98]"
                >
                  {/* Gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradientMap[agent.id]} opacity-90`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                  <div className="relative p-4 sm:p-5">
                    {/* Avatar and name row */}
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shrink-0 shadow-lg border-2 border-white/20 group-hover:scale-105 transition-transform">
                        {avatarComponents[agent.id] ? (
                          (() => { const Av = avatarComponents[agent.id]; return <Av />; })()
                        ) : (
                          <div className="w-full h-full bg-white/20 flex items-center justify-center"><Bot className="w-6 h-6 text-white" /></div>
                        )}
                      </div>
                      <div className="flex-1 pt-1">
                        <div className="font-extrabold text-white text-base sm:text-lg leading-tight">{agent.name}</div>
                        <div className="text-[11px] sm:text-xs text-white/80 font-medium">{agent.nickname}</div>
                      </div>
                      <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center mt-1">
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                    </div>

                    {/* Role */}
                    <div className="text-xs sm:text-sm text-white/90 font-medium mb-2">{agent.role}</div>

                    {/* Business value */}
                    <p className="text-[11px] sm:text-xs text-white/70 leading-relaxed mb-3">
                      {businessValue[agent.id]}
                    </p>

                    {/* Specialties chips */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {agent.specialties.slice(0, 3).map((spec) => (
                        <span key={spec} className="text-[9px] sm:text-[10px] bg-white/15 text-white/90 rounded-full px-2 py-0.5">
                          {spec}
                        </span>
                      ))}
                      {agent.specialties.length > 3 && (
                        <span className="text-[9px] sm:text-[10px] bg-white/10 text-white/60 rounded-full px-2 py-0.5">
                          +{agent.specialties.length - 3}
                        </span>
                      )}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-1.5 text-white text-xs font-semibold group-hover:gap-2.5 transition-all">
                      <span>התחל שיחה</span>
                      <ArrowLeft className="w-3.5 h-3.5 group-hover:translate-x-[-4px] transition-transform" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Integration section */}
          <div className="mt-12 sm:mt-16 text-center">
            <Card className="p-6 sm:p-10 border-2 border-border/50 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold mb-2">כל הסוכנים מתחברים למערכת שלך</h3>
              <p className="text-sm text-muted-foreground max-w-lg mx-auto mb-6">
                הסוכנים מנתחים את העסק שלך, לומדים את הקהל, ומתאימים את ההמלצות בדיוק למה שאתה צריך. חיבור אחד - צוות שלם.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                {['Google Ads', 'Meta Ads', 'TikTok', 'Analytics', 'Email', 'CRM'].map((platform) => (
                  <span key={platform} className="text-xs sm:text-sm font-medium bg-muted/50 border border-border/50 rounded-full px-3 sm:px-4 py-1.5 sm:py-2">
                    {platform}
                  </span>
                ))}
              </div>
              <div className="mt-6">
                <Button
                  onClick={() => navigate('/auth')}
                  className="rounded-full font-bold text-sm px-6 sm:px-8"
                  style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)', color: 'white' }}
                >
                  <Sparkles className="w-4 h-4 ml-2" />
                  התחל להשתמש בצוות AI
                </Button>
              </div>
            </Card>
          </div>
        </div>
      )}

      {!selectedAgent && <Footer />}
    </div>
  );
}
