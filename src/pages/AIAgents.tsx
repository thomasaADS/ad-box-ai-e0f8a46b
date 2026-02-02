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
// AI response generator (mock)
// ============================================================

function generateAgentResponse(agentId: string, question: string): string {
  const agent = agents.find((a) => a.id === agentId);
  if (!agent) return 'מצטער, לא הצלחתי לעבד את השאלה.';

  const lower = question.toLowerCase();

  if (agentId === 'maya') {
    if (lower.includes('מילות מפתח') || lower.includes('keyword')) {
      return `**מחקר מילות מפתח - המדריך שלי:**\n\n1. **התחל מהמוצר/שירות שלך** - רשום את כל המונחים שלקוחות יחפשו\n2. **השתמש בכלים** - Google Keyword Planner, Ahrefs, או SEMrush\n3. **חפש מילות Long Tail** - ביטויים ארוכים יותר עם תחרות נמוכה\n4. **בדוק את המתחרים** - ראה אילו מילות מפתח עובדות להם\n5. **דרג לפי עדיפות** - נפח חיפוש x רלוונטיות x סיכוי דירוג\n\n**טיפ:** בשוק הישראלי, חפש גם באנגלית וגם בעברית. הרבה ישראלים מחפשים בשתי השפות!`;
    }
    if (lower.includes('seo') || lower.includes('קידום') || lower.includes('דירוג')) {
      return `**כך תשפר את ה-SEO שלך:**\n\n**On-Page SEO:**\n- Title Tags ייחודיים לכל עמוד\n- Meta Descriptions מזמינים\n- H1, H2, H3 בצורה הירארכית\n- אופטימיזציית תמונות (alt text, compression)\n\n**Technical SEO:**\n- מהירות אתר (Core Web Vitals)\n- התאמה למובייל\n- sitemap.xml ו-robots.txt\n- Schema markup\n\n**Off-Page SEO:**\n- קישורים איכותיים מאתרים רלוונטיים\n- פעילות בקהילות מקצועיות\n- Google My Business\n\nרוצה שאעמיק בתחום מסוים?`;
    }
    return `שאלה מצוינת! בתור מומחית SEO, אני ממליצה:\n\n1. **עשה אודיט SEO** - בדוק את המצב הנוכחי\n2. **מקד את המאמצים** - התמקד בעמודים בעלי פוטנציאל\n3. **תוכן איכותי** - צור תוכן שעונה על שאלות אמיתיות\n4. **מדוד ושפר** - עקוב אחרי הנתונים ובצע אופטימיזציה\n\nרוצה שאפרט?`;
  }

  if (agentId === 'adam') {
    if (lower.includes('תקציב') || lower.includes('budget') || lower.includes('עלות')) {
      return `**תכנון תקציב פרסום:**\n\n**כלל אצבע לעסקים קטנים:**\n- **מינימלי**: 2,000-3,000 לחודש\n- **מומלץ**: 5,000-10,000 לחודש\n- **אופטימלי**: 5-15% מההכנסות\n\n**חלוקה מומלצת:**\n- 50% - Google Ads\n- 30% - Facebook/Instagram\n- 20% - TikTok/ניסויים\n\n**טיפים:**\n1. התחל קטן ובדוק מה עובד\n2. אל תפזר על יותר מדי פלטפורמות\n3. הקצה 10% לבדיקות A/B\n4. עקוב אחרי ROAS\n\nמה התקציב שלך כרגע?`;
    }
    if (lower.includes('קמפיין') || lower.includes('מודע')) {
      return `**מדריך להקמת קמפיין ממומן:**\n\n**שלב 1 - הגדרת מטרה:**\nלידים / מכירות / חשיפה / תנועה\n\n**שלב 2 - הגדרת קהל יעד:**\n- דמוגרפיה: גיל, מגדר, מיקום\n- תחומי עניין ודפוסי התנהגות\n- קהלים דומים (Lookalike)\n\n**שלב 3 - יצירת מודעות:**\n- כותרת מושכת\n- תמונה/סרטון איכותי\n- CTA ברור\n- דף נחיתה ממוקד\n\n**שלב 4 - אופטימיזציה:**\n- A/B על גרסאות שונות\n- ניטור יומיומי\n- מילות מפתח שליליות\n\nרוצה שאעזור לך?`;
    }
    return `מצוין! בתור מומחה PPC, הנה מה שאני מציע:\n\n- **גוגל** - מתאים למי שמחפש אותך\n- **פייסבוק** - מתאים לטרגוט מדויק\n- **טיקטוק** - קהל צעיר ומעורבות גבוהה\n\nהצעד הראשון - להבין את המטרה וקהל היעד. ספר לי על העסק!`;
  }

  if (agentId === 'noa') {
    if (lower.includes('פוסט') || lower.includes('סושיאל') || lower.includes('פייסבוק') || lower.includes('אינסטגרם')) {
      return `**טיפים לפוסטים ברשתות חברתיות:**\n\n**מבנה פוסט ממיר:**\n1. **Hook** - משפט פתיחה שמושך תשומת לב\n2. **סיפור** - ספר סיפור או תן ערך\n3. **CTA** - קריאה ברורה לפעולה\n\n**סוגי פוסטים שעובדים:**\n- טיפים ורשימות ("5 דרכים ל...")\n- לפני ואחרי\n- מאחורי הקלעים\n- שאלות ושיתוף קהל\n- סטוריז אישיים\n\n**דוגמה לפוסט:**\n> "רוב העסקים מפספסים את זה...\n> [3 שורות ערך]\n> רוצים לשמוע עוד? שלחו הודעה"\n\nספרי לי על העסק שלך ואכתוב לך פוסט!`;
    }
    return `אני כאן לעזור עם תוכן שיווקי!\n\n**מה אני יכולה לעשות:**\n- לכתוב פוסטים לרשתות חברתיות\n- ליצור תוכן לבלוג\n- לכתוב קופי למודעות\n- לבנות אסטרטגיית תוכן\n- ליצור ניוזלטרים\n\nספרי לי על העסק, קהל היעד, ומה את צריכה - ואני אתחיל ליצור!`;
  }

  if (agentId === 'dan') {
    return `**ניתוח נתונים - המדריך שלי:**\n\n**המדדים החשובים:**\n- **CTR** (שיעור קליקים) - מעל 2% זה טוב\n- **CPC** (עלות לקליק) - תלוי תחום, ממוצע 2-10 שקלים\n- **CVR** (שיעור המרה) - מעל 3% זה מצוין\n- **ROAS** (החזר על פרסום) - לפחות x3\n- **LTV** (ערך חיי לקוח) - קריטי להבנת רווחיות\n\n**כלים שאני ממליץ:**\n1. Google Analytics 4\n2. Facebook Pixel + CAPI\n3. Hotjar (מפות חום)\n4. Google Search Console\n\nספר לי מה אתה מנסה לנתח ואני אעזור!`;
  }

  if (agentId === 'lior') {
    return `**בניית מותג חזק:**\n\n**4 עמודי הבסיס:**\n1. **ערכים** - מה המותג מייצג?\n2. **ייחודיות** - מה מבדיל אותך?\n3. **קול** - איך המותג מדבר? (רשמי/ידידותי/מקצועי)\n4. **חזותי** - לוגו, צבעים, טיפוגרפיה\n\n**פלטת צבעים:**\n- בחר 2-3 צבעים ראשיים\n- כחול = אמינות, ירוק = צמיחה, סגול = יצירתיות\n- שמור על עקביות\n\n**טיפ מקצועי:** לפני עיצוב, הגדר את ה-"למה" - למה המותג קיים ומה הוא נותן ללקוחות.\n\nספר לי על העסק ואני אעזור לבנות את הזהות!`;
  }

  if (agentId === 'roni') {
    return `**אסטרטגיה דיגיטלית:**\n\n**5 שלבים לתוכנית שיווק:**\n1. **מחקר שוק** - הבן את השוק, המתחרים והלקוחות\n2. **הגדרת מטרות** - SMART goals מדידות\n3. **בחירת ערוצים** - איפה הקהל שלך?\n4. **יצירת תוכן** - תוכנית שבועית/חודשית\n5. **מדידה ואופטימיזציה** - מה עובד? מה לשפר?\n\n**חלוקת תקציב מומלצת:**\n- 40% - פרסום ממומן\n- 25% - תוכן ו-SEO\n- 20% - רשתות חברתיות\n- 15% - כלים וטכנולוגיה\n\nספר לי על העסק ואני אבנה תוכנית מותאמת!`;
  }

  if (agentId === 'yael') {
    return `**אסטרטגיית סושיאל מדיה:**\n\n**הנוכחות שלך ברשתות:**\n- **אינסטגרם** - ויזואלי, Reels, Stories\n- **טיקטוק** - תוכן קצר, טרנדים, אותנטיות\n- **פייסבוק** - קהילות, שיתופים, קהל 30+\n- **לינקדאין** - B2B, מקצועי, מאמרי דעה\n\n**לוח תוכן שבועי:**\n- ראשון: פוסט השראה / טיפ\n- שלישי: תוכן חינוכי / How-to\n- חמישי: מאחורי הקלעים / אישי\n- שבת: סיכום שבוע / שאלה לקהל\n\n**טיפים לצמיחה:**\n1. פרסם בעקביות\n2. השתמש בהאשטגים רלוונטיים\n3. תגיב לכל תגובה\n4. שתף פעולה עם יוצרים\n\nבאיזו פלטפורמה את רוצה להתמקד?`;
  }

  if (agentId === 'omer') {
    return `**ייצור סרטוני פרסום:**\n\n**מבנה סרטון מודעה מנצח:**\n1. **Hook (0-3 שניות)** - משוך תשומת לב מיידית\n2. **בעיה (3-8 שניות)** - הצג את הכאב\n3. **פתרון (8-20 שניות)** - הראה איך אתה פותר\n4. **הוכחה (20-25 שניות)** - ביקורות, מספרים\n5. **CTA (25-30 שניות)** - מה לעשות עכשיו\n\n**אורכים מומלצים:**\n- TikTok: 15-30 שניות\n- Instagram Reels: 15-60 שניות\n- Facebook Feed: 15-30 שניות\n- YouTube: 6-15 שניות (bumper) / 30-60 שניות\n\n**טיפ מקצועי:** 3 השניות הראשונות קובעות הכל. תתחיל בתנועה, צבע בולט או שאלה פרובוקטיבית.\n\nמה אתה רוצה ליצור?`;
  }

  if (agentId === 'shira') {
    return `**Email Marketing מנצח:**\n\n**סוגי מיילים חיוניים:**\n1. **Welcome Series** - 3-5 מיילים ללקוח חדש\n2. **ניוזלטר שבועי** - ערך + חדשות + הצעות\n3. **עגלה נטושה** - תזכורת + הנחה\n4. **טיפוח לידים** - סדרה אוטומטית\n5. **Win-back** - להחזיר לקוחות לא פעילים\n\n**מדדים חשובים:**\n- שיעור פתיחה: מעל 20% זה טוב\n- שיעור קליקים: מעל 3% זה מצוין\n- Unsubscribe: מתחת ל-0.5%\n\n**טיפים לכותרות:**\n- קצר (40-50 תווים)\n- מעורר סקרנות\n- ערך ברור\n- שם פרטי בהתאמה אישית\n\nרוצה שאעזור לבנות אוטומציה?`;
  }

  if (agentId === 'eyal') {
    return `**אופטימיזציית שיעורי המרה (CRO):**\n\n**הצ'קליסט שלי:**\n1. **כפתור CTA בולט** - צבע מנוגד, טקסט ברור\n2. **מהירות טעינה** - מתחת ל-3 שניות\n3. **טופס קצר** - רק שדות חיוניים\n4. **הוכחה חברתית** - ביקורות, לוגואי לקוחות\n5. **דחיפות** - מבצע מוגבל, ספירה לאחור\n\n**כלים חיוניים:**\n- Hotjar - מפות חום וניתוח התנהגות\n- Google Optimize - A/B Testing\n- Crazy Egg - הקלטות משתמשים\n\n**שיפורים מהירים:**\n- כותרת ברורה עם הבטחת ערך\n- תמונות אמיתיות (לא סטוק)\n- טופס מעל ל-fold\n- כפתור CTA אחד ברור\n\nרוצה שאנתח את הדף שלך?`;
  }

  return `שאלה מצוינת! אני אשמח לעזור. ספר לי עוד פרטים ואני אתן לך תשובה מפורטת ומותאמת.`;
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
    if (!inputText.trim() || !selectedAgent) return;

    if (!user && guestMessageCount >= GUEST_MESSAGE_LIMIT) {
      toast.error('נגמרו ההודעות החינמיות! הירשם כדי להמשיך');
      return;
    }

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

    await new Promise((r) => setTimeout(r, 1000 + Math.random() * 1500));

    const response = generateAgentResponse(selectedAgent, userMessage.content);

    const agentMessage: ChatMessage = {
      id: `agent-${Date.now()}`,
      role: 'assistant',
      content: response,
      timestamp: new Date(),
      agentId: selectedAgent,
    };

    setMessages((prev) => [...prev, agentMessage]);
    setIsTyping(false);
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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-24 sm:pt-28 pb-8 sm:pb-10 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f0a2e] via-[#1a1145] to-[#2d1b69]" />
        <div className="absolute top-0 right-[20%] w-[300px] h-[300px] bg-purple-600 rounded-full mix-blend-screen filter blur-[100px] opacity-15" />
        <div className="absolute bottom-0 left-[10%] w-[250px] h-[250px] bg-blue-600 rounded-full mix-blend-screen filter blur-[80px] opacity-10" />

        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30 rounded-full text-sm">
            <Bot className="w-3.5 h-3.5 ml-1.5" />
            צוות AI מומחים
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-3">
            הכירו את <span className="hero-gradient-text">הצוות</span> שלכם
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto mb-6">
            10 סוכני AI מומחים - כל אחד עם שם, אישיות והתמחות ייחודית. משרד פרסום שלם בשירותך
          </p>

          {!user && (
            <div className="flex items-center justify-center gap-3">
              <Badge variant="outline" className="text-amber-300 border-amber-500/30 bg-amber-500/10 rounded-full">
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
            </div>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Main content */}
      <div className="container mx-auto max-w-7xl px-4 pb-16">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Agent selection sidebar */}
          <div className="lg:w-80 shrink-0">
            <div className="lg:sticky lg:top-24">
              <h3 className="text-sm font-bold text-muted-foreground mb-3 px-1">בחר סוכן</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2">
                {agents.map((agent) => {
                  const isActive = selectedAgent === agent.id;
                  const agentMessages = messages.filter((m) => m.agentId === agent.id && m.role === 'user');

                  return (
                    <button
                      key={agent.id}
                      onClick={() => handleSelectAgent(agent.id)}
                      className={`p-3 lg:p-4 rounded-xl border-2 transition-all text-right ${
                        isActive
                          ? 'border-primary bg-primary/5 shadow-md'
                          : 'border-border/50 hover:border-primary/30 hover:bg-muted/30'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {renderAvatar(agent.id, 'sm')}
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-sm truncate">{agent.name}</div>
                          <div className="text-[10px] text-muted-foreground truncate">{agent.nickname}</div>
                        </div>
                        {agentMessages.length > 0 && (
                          <Badge variant="secondary" className="text-[9px] rounded-full shrink-0">
                            {agentMessages.length}
                          </Badge>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {activeAgent && (
                <Card className="mt-4 p-4 border border-border/50 hidden lg:block">
                  <h4 className="font-bold text-sm mb-2">התמחויות:</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeAgent.specialties.map((spec) => (
                      <Badge key={spec} variant="secondary" className="text-[10px] rounded-full">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          </div>

          {/* Chat area */}
          <div className="flex-1">
            {!selectedAgent ? (
              <div className="space-y-6">
                <Card className="p-8 sm:p-12 text-center border-2 border-border/50 shadow-xl">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Bot className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-extrabold mb-2">הכירו את הצוות</h2>
                  <p className="text-muted-foreground mb-8">
                    בחר את הסוכן המתאים מהרשימה בצד ימין, או לחץ על אחד מהסוכנים
                  </p>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-5xl mx-auto">
                    {agents.map((agent) => {
                      return (
                        <button
                          key={agent.id}
                          onClick={() => handleSelectAgent(agent.id)}
                          className="p-4 rounded-xl border border-border/50 hover:border-primary/30 hover:bg-primary/5 hover:-translate-y-1 transition-all text-center group"
                        >
                          <div className="mx-auto mb-3 group-hover:scale-105 transition-transform">
                            {renderAvatar(agent.id, 'lg')}
                          </div>
                          <div className="font-bold text-sm">{agent.name}</div>
                          <div className="text-[11px] text-primary/70 font-medium">{agent.nickname}</div>
                          <div className="text-[10px] text-muted-foreground mt-1">{agent.role}</div>
                        </button>
                      );
                    })}
                  </div>
                </Card>
              </div>
            ) : (
              <Card className="border-2 border-border/50 shadow-xl overflow-hidden flex flex-col" style={{ height: 'calc(100vh - 280px)', minHeight: '500px' }}>
                {/* Chat header */}
                <div className="flex items-center justify-between p-4 border-b border-border/50 bg-muted/20">
                  <div className="flex items-center gap-3">
                    {renderAvatar(activeAgent!.id, 'md')}
                    <div>
                      <div className="font-bold text-sm flex items-center gap-2">
                        {activeAgent?.name}
                        <span className="text-[10px] font-normal text-primary/70">({activeAgent?.nickname})</span>
                      </div>
                      <div className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                        {activeAgent?.role}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedAgent(null)}
                    className="p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Chat messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {currentChatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                      {msg.role === 'user' ? (
                        <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                          <User className="w-4 h-4" />
                        </div>
                      ) : (
                        renderAvatar(activeAgent!.id, 'sm')
                      )}
                      <div
                        className={`max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed ${
                          msg.role === 'user'
                            ? 'bg-primary text-primary-foreground rounded-br-md'
                            : 'bg-muted/50 border border-border/50 rounded-bl-md'
                        }`}
                      >
                        <div className="whitespace-pre-wrap">{msg.content}</div>
                        <div className={`text-[10px] mt-2 ${msg.role === 'user' ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>
                          {msg.timestamp.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex gap-3">
                      {renderAvatar(activeAgent!.id, 'sm')}
                      <div className="bg-muted/50 border border-border/50 rounded-2xl rounded-bl-md px-4 py-3">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </div>
                  )}

                  {currentChatMessages.length <= 1 && activeAgent && !isTyping && (
                    <div className="pt-4">
                      <p className="text-xs text-muted-foreground mb-3">שאלות לדוגמה:</p>
                      <div className="grid gap-2">
                        {activeAgent.sampleQuestions.map((q, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              setInputText(q);
                              setTimeout(() => inputRef.current?.focus(), 50);
                            }}
                            className="text-right text-sm p-3 rounded-xl border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all text-muted-foreground hover:text-foreground"
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
                  <div className="p-4 bg-amber-500/10 border-t border-amber-500/20">
                    <div className="flex items-center gap-3">
                      <Lock className="w-5 h-5 text-amber-500 shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-amber-700">נגמרו ההודעות החינמיות</p>
                        <p className="text-xs text-amber-600">הירשם כדי לשוחח ללא הגבלה עם כל הסוכנים</p>
                      </div>
                      <Button
                        onClick={() => navigate('/auth')}
                        size="sm"
                        className="rounded-lg font-semibold text-xs shrink-0"
                        style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)', color: 'white' }}
                      >
                        הירשם עכשיו
                      </Button>
                    </div>
                  </div>
                )}

                {/* Chat input */}
                <div className="p-4 border-t border-border/50 bg-background">
                  <div className="flex gap-2">
                    <Input
                      ref={inputRef}
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                      placeholder={
                        !user && guestMessageCount >= GUEST_MESSAGE_LIMIT
                          ? 'הירשם כדי להמשיך לשוחח...'
                          : `שאל/י את ${activeAgent?.name || 'הסוכן/ת'}...`
                      }
                      disabled={!user && guestMessageCount >= GUEST_MESSAGE_LIMIT}
                      className="h-12 text-sm rounded-xl"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputText.trim() || isTyping || (!user && guestMessageCount >= GUEST_MESSAGE_LIMIT)}
                      className="h-12 w-12 rounded-xl shrink-0"
                      style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)', color: 'white' }}
                    >
                      <Send className="w-5 h-5" />
                    </Button>
                  </div>
                  {!user && guestMessageCount < GUEST_MESSAGE_LIMIT && (
                    <p className="text-[10px] text-muted-foreground text-center mt-2">
                      {GUEST_MESSAGE_LIMIT - guestMessageCount} הודעות חינם נותרו - <button onClick={() => navigate('/auth')} className="text-primary hover:underline">הירשם</button> לגישה בלתי מוגבלת
                    </p>
                  )}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
