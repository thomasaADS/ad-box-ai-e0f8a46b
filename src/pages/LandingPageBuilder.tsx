import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import {
  Wand2,
  Layout,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Globe,
  Target,
  Zap,
  Clock,

  Copy,
  Eye,
  Loader2,
  Image as ImageIcon,
  FileText,
  Palette,
  Monitor,
  Smartphone,
  Link2,
  Search,
  Facebook,
  Chrome,
  Video,
  Users,
  BarChart3,
  Megaphone,
  ShoppingCart,
  Mail,
  MousePointerClick,
  Check,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  ExternalLink,
  Building2,
  Layers,
  X,
  Instagram,
  Star,
  TrendingUp,
  Heart,
  type LucideIcon,
} from 'lucide-react';

// ============================================================
// Types
// ============================================================

interface ScrapedData {
  url: string;
  title: string;
  description: string;
  images: string[];
  colors: string[];
  texts: string[];
  logo?: string;
  sourceType: 'website' | 'facebook' | 'instagram';
}

interface CampaignConfig {
  platform: 'facebook' | 'google' | 'tiktok' | 'all';
  campaignType: string;
  targetAudience: string;
  businessName: string;
  industry: string;
  mainGoal: string;
  colorScheme: string;
  style: string;
  heroImage: string;
  ctaText: string;
  additionalInfo: string;
}

type WizardStep = 'url' | 'analyze' | 'platform' | 'details' | 'generate' | 'preview';

// ============================================================
// URL type detection
// ============================================================

function detectUrlType(url: string): 'website' | 'facebook' | 'instagram' {
  const lower = url.toLowerCase();
  if (lower.includes('facebook.com') || lower.includes('fb.com') || lower.includes('fb.me')) return 'facebook';
  if (lower.includes('instagram.com') || lower.includes('instagr.am')) return 'instagram';
  return 'website';
}

function getUrlTypeLabel(type: 'website' | 'facebook' | 'instagram'): string {
  switch (type) {
    case 'facebook': return 'דף פייסבוק';
    case 'instagram': return 'פרופיל אינסטגרם';
    default: return 'אתר';
  }
}

function getUrlTypeIcon(type: 'website' | 'facebook' | 'instagram') {
  switch (type) {
    case 'facebook': return Facebook;
    case 'instagram': return Instagram;
    default: return Globe;
  }
}

// ============================================================
// Campaign showcase examples
// ============================================================

const campaignExamples = [
  {
    id: 1,
    title: 'FreshMarket - קמפיין לידים',
    platform: 'Meta',
    type: 'לידים',
    industry: 'מזון אורגני',
    result: '+340% ROI',
    gradient: 'from-green-500 to-emerald-600',
    headline: 'טעם הטבע מגיע אליך הביתה',
    subline: 'משלוחים של ירקות ופירות אורגניים ישירות מהחקלאי',
    cta: 'הזמן עכשיו',
    mockupType: 'feed',
  },
  {
    id: 2,
    title: 'TechFlow - מודעות מותג',
    platform: 'Google',
    type: 'מודעות מותג',
    industry: 'SaaS',
    result: '+180% חשיפה',
    gradient: 'from-blue-600 to-purple-600',
    headline: 'ניהול פרויקטים חכם עם AI',
    subline: 'הפלטפורמה שמייעלת את העבודה הצוותית שלך',
    cta: 'נסה חינם',
    mockupType: 'banner',
  },
  {
    id: 3,
    title: 'StyleHome - קמפיין מכירות',
    platform: 'TikTok',
    type: 'מכירות',
    industry: 'עיצוב פנים',
    result: 'x12 ROAS',
    gradient: 'from-pink-500 to-orange-500',
    headline: 'הסלון החדש שלך מחכה',
    subline: 'עד 50% הנחה על קולקציית הקיץ',
    cta: 'קנה עכשיו',
    mockupType: 'story',
  },
  {
    id: 4,
    title: 'YS Consulting - לידים',
    platform: 'Meta',
    type: 'לידים',
    industry: 'ייעוץ עסקי',
    result: '-60% CPL',
    gradient: 'from-gray-800 to-amber-500',
    headline: 'הצמיחה העסקית שלך מתחילה כאן',
    subline: 'ייעוץ אסטרטגי לעסקים קטנים ובינוניים',
    cta: 'פגישת ייעוץ חינם',
    mockupType: 'feed',
  },
  {
    id: 5,
    title: 'FitZone - אפליקציה',
    platform: 'TikTok',
    type: 'התקנת אפליקציה',
    industry: 'כושר',
    result: '+500% הורדות',
    gradient: 'from-cyan-500 to-blue-600',
    headline: 'אימון אישי בכף היד',
    subline: 'תוכניות אימון מותאמות אישית עם AI',
    cta: 'הורד עכשיו',
    mockupType: 'story',
  },
  {
    id: 6,
    title: 'LegalPro - תנועה לאתר',
    platform: 'Google',
    type: 'תנועה',
    industry: 'משפט',
    result: '+250% קליקים',
    gradient: 'from-indigo-600 to-blue-700',
    headline: 'ייעוץ משפטי מקצועי',
    subline: 'צוות עורכי דין מנוסה לשירותך',
    cta: 'יצירת קשר',
    mockupType: 'banner',
  },
];

// ============================================================
// URL Scraper - extracts data from client website / social page
// ============================================================

async function scrapeWebsite(url: string): Promise<ScrapedData> {
  const fullUrl = url.startsWith('http') ? url : `https://${url}`;
  const sourceType = detectUrlType(fullUrl);

  try {
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(fullUrl)}`;
    const response = await fetch(proxyUrl, { signal: AbortSignal.timeout(15000) });

    if (!response.ok) throw new Error('Failed to fetch');

    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Extract title
    const title =
      doc.querySelector('meta[property="og:title"]')?.getAttribute('content') ||
      doc.querySelector('title')?.textContent ||
      '';

    // Extract description
    const description =
      doc.querySelector('meta[property="og:description"]')?.getAttribute('content') ||
      doc.querySelector('meta[name="description"]')?.getAttribute('content') ||
      '';

    // Extract images
    const images: string[] = [];
    const ogImage = doc.querySelector('meta[property="og:image"]')?.getAttribute('content');
    if (ogImage) images.push(ogImage.startsWith('http') ? ogImage : new URL(ogImage, fullUrl).href);

    doc.querySelectorAll('img[src]').forEach((img) => {
      const src = img.getAttribute('src');
      if (src && !src.includes('data:') && !src.includes('.svg') && !src.includes('pixel') && !src.includes('tracking') && !src.includes('1x1')) {
        try {
          const imgUrl = src.startsWith('http') ? src : new URL(src, fullUrl).href;
          if (!images.includes(imgUrl)) images.push(imgUrl);
        } catch { }
      }
    });

    // Logo
    const logo =
      doc.querySelector('link[rel*="icon"][sizes="192x192"]')?.getAttribute('href') ||
      doc.querySelector('link[rel*="icon"]')?.getAttribute('href') ||
      doc.querySelector('link[rel="apple-touch-icon"]')?.getAttribute('href');
    const logoUrl = logo ? (logo.startsWith('http') ? logo : new URL(logo, fullUrl).href) : undefined;

    // Colors
    const themeColor = doc.querySelector('meta[name="theme-color"]')?.getAttribute('content');
    const colors: string[] = [];
    if (themeColor) colors.push(themeColor);

    // Texts
    const texts: string[] = [];
    doc.querySelectorAll('h1, h2, h3, p').forEach((el) => {
      const text = el.textContent?.trim();
      if (text && text.length > 10 && text.length < 300) {
        texts.push(text);
      }
    });

    return {
      url: fullUrl,
      title: title.trim(),
      description: description.trim(),
      images: images.slice(0, 12),
      colors,
      texts: texts.slice(0, 10),
      logo: logoUrl,
      sourceType,
    };
  } catch (error) {
    console.error('Scraping error:', error);
    return {
      url: fullUrl,
      title: '',
      description: '',
      images: [],
      colors: [],
      texts: [],
      sourceType,
    };
  }
}

// ============================================================
// Platform configs
// ============================================================

const platformOptions = [
  {
    id: 'facebook' as const,
    name: 'Meta (Facebook & Instagram)',
    icon: Facebook,
    color: 'from-blue-500 to-blue-700',
    description: 'מודעות לפיד, סטוריז, Reels ועוד',
    sizes: ['1200x628', '1080x1080', '1080x1920'],
  },
  {
    id: 'google' as const,
    name: 'Google Ads',
    icon: Chrome,
    color: 'from-red-500 to-yellow-500',
    description: 'באנרים ל-Display, YouTube ו-Search',
    sizes: ['300x250', '728x90', '160x600'],
  },
  {
    id: 'tiktok' as const,
    name: 'TikTok Ads',
    icon: Video,
    color: 'from-gray-900 to-pink-600',
    description: 'סרטוני פרסום ומודעות In-Feed',
    sizes: ['1080x1920', '1080x1080'],
  },
  {
    id: 'all' as const,
    name: 'כל הפלטפורמות',
    icon: Globe,
    color: 'from-purple-600 to-blue-600',
    description: 'קבל קמפיינים מותאמים לכל הפלטפורמות',
    sizes: [],
  },
];

const campaignTypes = [
  { id: 'leads', label: 'יצירת לידים', icon: Users, desc: 'טפסים, הרשמות, פניות' },
  { id: 'sales', label: 'מכירות', icon: ShoppingCart, desc: 'חנות אונליין, מוצרים' },
  { id: 'awareness', label: 'מודעות למותג', icon: Megaphone, desc: 'חשיפה, ברנדינג' },
  { id: 'traffic', label: 'תנועה לאתר', icon: MousePointerClick, desc: 'קליקים, ביקורים' },
  { id: 'engagement', label: 'אינטראקציה', icon: BarChart3, desc: 'לייקים, תגובות, שיתופים' },
  { id: 'app', label: 'התקנת אפליקציה', icon: Smartphone, desc: 'הורדות, רישומים' },
];

const colorSchemes = [
  { id: 'purple-blue', name: 'סגול כחול', colors: ['#7c3aed', '#2563eb'], gradient: 'from-purple-600 to-blue-600' },
  { id: 'green-teal', name: 'ירוק טורקיז', colors: ['#059669', '#0d9488'], gradient: 'from-emerald-600 to-teal-500' },
  { id: 'orange-pink', name: 'כתום ורוד', colors: ['#ea580c', '#ec4899'], gradient: 'from-orange-600 to-pink-500' },
  { id: 'dark-gold', name: 'שחור וזהב', colors: ['#1f2937', '#d97706'], gradient: 'from-gray-800 to-amber-500' },
  { id: 'blue-cyan', name: 'כחול תכלת', colors: ['#2563eb', '#06b6d4'], gradient: 'from-blue-600 to-cyan-500' },
  { id: 'red-orange', name: 'אדום כתום', colors: ['#dc2626', '#f97316'], gradient: 'from-red-600 to-orange-500' },
];

const styleOptions = [
  { id: 'modern', label: 'מודרני ומינימליסטי' },
  { id: 'bold', label: 'נועז וצבעוני' },
  { id: 'corporate', label: 'עסקי ומקצועי' },
  { id: 'creative', label: 'יצירתי ומקורי' },
  { id: 'elegant', label: 'אלגנטי ומעודן' },
];

// ============================================================
// Main Component
// ============================================================

export default function LandingPageBuilder() {
  const navigate = useNavigate();
  const [step, setStep] = useState<WizardStep>('url');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [scrapedData, setScrapedData] = useState<ScrapedData | null>(null);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPage, setGeneratedPage] = useState<any>(null);

  const [config, setConfig] = useState<CampaignConfig>({
    platform: 'facebook',
    campaignType: 'leads',
    targetAudience: '',
    businessName: '',
    industry: '',
    mainGoal: 'יצירת לידים',
    colorScheme: 'purple-blue',
    style: 'modern',
    heroImage: '',
    ctaText: 'התחל עכשיו',
    additionalInfo: '',
  });

  // Progress steps for wizard
  const steps: { id: WizardStep; label: string; icon: LucideIcon }[] = [
    { id: 'url', label: 'כתובת אתר', icon: Link2 },
    { id: 'analyze', label: 'ניתוח', icon: Search },
    { id: 'platform', label: 'פלטפורמה', icon: Globe },
    { id: 'details', label: 'פרטים', icon: FileText },
    { id: 'generate', label: 'יצירה', icon: Sparkles },
    { id: 'preview', label: 'תצוגה', icon: Eye },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === step);

  // ============================================================
  // Handle URL analysis
  // ============================================================

  const handleAnalyzeUrl = async () => {
    if (!websiteUrl.trim()) {
      toast.error('הכנס כתובת אתר');
      return;
    }

    setIsAnalyzing(true);
    setStep('analyze');

    try {
      const data = await scrapeWebsite(websiteUrl.trim());
      setScrapedData(data);

      // Auto-fill config from scraped data
      if (data.title) {
        setConfig((prev) => ({ ...prev, businessName: data.title }));
      }
      if (data.description) {
        setConfig((prev) => ({ ...prev, additionalInfo: data.description }));
      }
      if (data.images.length > 0) {
        setConfig((prev) => ({ ...prev, heroImage: data.images[0] }));
        setSelectedImages([data.images[0]]);
      }

      toast.success('האתר נותח בהצלחה!');
    } catch {
      toast.error('לא הצלחנו לנתח את המקור, ניתן להמשיך ידנית');
      setScrapedData({ url: websiteUrl, title: '', description: '', images: [], colors: [], texts: [], sourceType: detectUrlType(websiteUrl) });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSkipUrl = () => {
    setScrapedData({ url: '', title: '', description: '', images: [], colors: [], texts: [], sourceType: 'website' });
    setStep('platform');
  };

  // ============================================================
  // Handle page generation
  // ============================================================

  const handleGenerate = async () => {
    setStep('generate');
    setIsGenerating(true);

    // Generate AI image if no hero image from scraping
    let heroImage = config.heroImage;
    if (!heroImage) {
      try {
        const styles = [
          'cinematic lighting, 8k uhd, professional photography',
          'vibrant colors, dynamic composition, award winning',
          'soft natural lighting, ultra detailed, masterpiece',
        ];
        const randomStyle = styles[Math.floor(Math.random() * styles.length)];
        const seed = Math.floor(Math.random() * 1000000);
        const prompt = `professional ${config.industry || 'business'} landing page hero, ${config.style}, ${randomStyle}`;
        heroImage = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1200&height=800&seed=${seed}&nologo=true&enhance=true&model=flux&t=${Date.now()}`;

        // Preload
        await new Promise<void>((resolve, reject) => {
          const img = document.createElement('img');
          img.onload = () => resolve();
          img.onerror = () => reject();
          img.src = heroImage;
        });
      } catch {
        heroImage = '';
      }
    }

    // Simulate generation with progress
    await new Promise((r) => setTimeout(r, 2500));

    const scheme = colorSchemes.find((c) => c.id === config.colorScheme);
    const gradientCSS = scheme
      ? `linear-gradient(135deg, ${scheme.colors[0]} 0%, ${scheme.colors[1]} 100%)`
      : 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)';

    setGeneratedPage({
      ...config,
      heroImage,
      gradient: gradientCSS,
      scrapedImages: selectedImages,
      platformName: platformOptions.find((p) => p.id === config.platform)?.name || 'Meta',
    });

    setIsGenerating(false);
    setStep('preview');

    toast.success('הקמפיין נוצר בהצלחה!');
  };

  // ============================================================
  // Render wizard steps
  // ============================================================

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-24 sm:pt-28 pb-6 sm:pb-8 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f0a2e] via-[#1a1145] to-[#2d1b69]" />
        <div className="absolute top-0 right-[20%] w-[300px] h-[300px] bg-purple-600 rounded-full mix-blend-screen filter blur-[100px] opacity-15" />
        <div className="absolute bottom-0 left-[10%] w-[250px] h-[250px] bg-blue-600 rounded-full mix-blend-screen filter blur-[80px] opacity-10" />

        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30 rounded-full text-sm">
            <Sparkles className="w-3.5 h-3.5 ml-1.5" />
            מחולל קמפיינים AI
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-3">
            צור קמפיינים <span className="hero-gradient-text">מכל מקור</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
            הכנס כתובת אתר, דף פייסבוק או פרופיל אינסטגרם - ו-AI ינתח ויתאים קמפיינים מושלמים
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Progress Steps */}
      <div className="container mx-auto max-w-4xl px-4 py-6">
        <div className="flex items-center justify-between relative">
          {/* Progress line */}
          <div className="absolute top-5 right-5 left-5 h-0.5 bg-border" />
          <div
            className="absolute top-5 right-5 h-0.5 bg-primary transition-all duration-500"
            style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%`, maxWidth: 'calc(100% - 40px)' }}
          />

          {steps.map((s, i) => {
            const Icon = s.icon;
            const isActive = i === currentStepIndex;
            const isCompleted = i < currentStepIndex;
            return (
              <div key={s.id} className="relative z-10 flex flex-col items-center gap-1.5">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-lg ring-4 ring-primary/20 scale-110'
                      : isCompleted
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                </div>
                <span className={`text-[10px] sm:text-xs font-medium ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Wizard Content */}
      <div className="container mx-auto max-w-4xl px-4 pb-20">

        {/* ============ STEP: URL INPUT ============ */}
        {step === 'url' && (
          <div className="space-y-6 animate-fade-in">
            <Card className="p-6 sm:p-10 border-2 border-border/50 shadow-xl">
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">הכנס מקור לניתוח</h2>
                <p className="text-muted-foreground text-base sm:text-lg">
                  ה-AI ינתח את המקור, ימשוך תמונות, צבעים ותוכן - ויתאים קמפיינים בדיוק למותג שלך
                </p>
              </div>

              {/* Source type quick select */}
              <div className="flex justify-center gap-3 mb-6 max-w-xl mx-auto">
                {([
                  { type: 'website' as const, icon: Globe, label: 'אתר', placeholder: 'www.example.co.il', color: 'from-blue-500 to-cyan-500' },
                  { type: 'facebook' as const, icon: Facebook, label: 'פייסבוק', placeholder: 'facebook.com/yourpage', color: 'from-blue-600 to-blue-800' },
                  { type: 'instagram' as const, icon: Instagram, label: 'אינסטגרם', placeholder: 'instagram.com/yourprofile', color: 'from-pink-500 to-purple-600' },
                ]).map((source) => {
                  const Icon = source.icon;
                  const currentType = websiteUrl ? detectUrlType(websiteUrl) : 'website';
                  const isActive = currentType === source.type;
                  return (
                    <button
                      key={source.type}
                      onClick={() => {
                        if (source.type === 'facebook') setWebsiteUrl('https://facebook.com/');
                        else if (source.type === 'instagram') setWebsiteUrl('https://instagram.com/');
                        else setWebsiteUrl('');
                      }}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 transition-all text-sm font-medium ${
                        isActive
                          ? 'border-primary bg-primary/5 text-primary shadow-sm'
                          : 'border-border/50 text-muted-foreground hover:border-primary/30 hover:bg-muted/30'
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${source.color} flex items-center justify-center`}>
                        <Icon className="w-3.5 h-3.5 text-white" />
                      </div>
                      {source.label}
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
                <div className="flex-1 relative">
                  {(() => {
                    const detectedType = websiteUrl ? detectUrlType(websiteUrl) : 'website';
                    const TypeIcon = getUrlTypeIcon(detectedType);
                    return <TypeIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />;
                  })()}
                  <Input
                    type="url"
                    placeholder={
                      websiteUrl && detectUrlType(websiteUrl) === 'facebook'
                        ? 'https://facebook.com/yourpage'
                        : websiteUrl && detectUrlType(websiteUrl) === 'instagram'
                        ? 'https://instagram.com/yourprofile'
                        : 'www.example.co.il'
                    }
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAnalyzeUrl()}
                    className="h-14 text-base sm:text-lg pr-11 rounded-xl border-2 focus:border-primary/50"
                    dir="ltr"
                  />
                </div>
                <Button
                  onClick={handleAnalyzeUrl}
                  className="h-14 px-8 text-base font-bold rounded-xl shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)', color: 'white' }}
                >
                  <Search className="w-5 h-5 ml-2" />
                  {websiteUrl && detectUrlType(websiteUrl) === 'facebook'
                    ? 'נתח דף פייסבוק'
                    : websiteUrl && detectUrlType(websiteUrl) === 'instagram'
                    ? 'נתח פרופיל'
                    : 'נתח אתר'}
                </Button>
              </div>

              {/* Detected source type badge */}
              {websiteUrl && websiteUrl.length > 5 && (
                <div className="flex justify-center mt-3">
                  <Badge variant="secondary" className="text-xs flex items-center gap-1.5 rounded-full px-3 py-1">
                    {(() => {
                      const t = detectUrlType(websiteUrl);
                      const Icon = getUrlTypeIcon(t);
                      return (
                        <>
                          <Icon className="w-3 h-3" />
                          זוהה: {getUrlTypeLabel(t)}
                        </>
                      );
                    })()}
                  </Badge>
                </div>
              )}

              <div className="text-center mt-6">
                <button
                  onClick={handleSkipUrl}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors underline underline-offset-4"
                >
                  אין לי אתר, אני רוצה ליצור מאפס
                </button>
              </div>
            </Card>

            {/* Feature highlights */}
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: Search, title: 'ניתוח אוטומטי', desc: 'AI סורק אתרים, דפי פייסבוק ופרופילי אינסטגרם', gradient: 'from-purple-600 to-blue-600' },
                { icon: Target, title: 'התאמה לפלטפורמה', desc: 'מודעות מותאמות לפייסבוק, גוגל וטיקטוק', gradient: 'from-blue-600 to-cyan-500' },
                { icon: Zap, title: 'תוצאות מיידיות', desc: 'קמפיינים מוכנים להעלאה תוך דקות', gradient: 'from-cyan-500 to-teal-500' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <Card key={i} className="p-5 border border-border/50 hover:shadow-lg transition-all hover:-translate-y-1">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-3 shadow`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* ============ STEP: ANALYZING ============ */}
        {step === 'analyze' && (
          <div className="space-y-6 animate-fade-in">
            {isAnalyzing ? (
              <Card className="p-10 sm:p-16 text-center border-2 border-border/50 shadow-xl">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Loader2 className="w-10 h-10 text-white animate-spin" />
                </div>
                <h2 className="text-2xl font-extrabold mb-3">
                  {detectUrlType(websiteUrl) === 'facebook' ? 'מנתח דף פייסבוק...' : detectUrlType(websiteUrl) === 'instagram' ? 'מנתח פרופיל אינסטגרם...' : 'מנתח את האתר...'}
                </h2>
                <p className="text-muted-foreground mb-6">סורק תמונות, צבעים ותוכן מ-{websiteUrl}</p>
                <div className="flex flex-col gap-2 max-w-xs mx-auto text-right">
                  {[
                    detectUrlType(websiteUrl) === 'facebook' ? 'מתחבר לדף הפייסבוק...' : detectUrlType(websiteUrl) === 'instagram' ? 'מתחבר לפרופיל...' : 'סורק מבנה אתר...',
                    'מושך תמונות...',
                    'מנתח צבעי מותג...',
                    'קורא תוכן...',
                  ].map((text, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground animate-slide-up" style={{ animationDelay: `${i * 0.5}s` }}>
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-primary" />
                      {text}
                    </div>
                  ))}
                </div>
              </Card>
            ) : scrapedData ? (
              <div className="space-y-6">
                <Card className="p-6 sm:p-8 border-2 border-border/50 shadow-xl">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">
                        {scrapedData.sourceType === 'facebook' ? 'דף הפייסבוק נותח בהצלחה' : scrapedData.sourceType === 'instagram' ? 'פרופיל האינסטגרם נותח בהצלחה' : 'האתר נותח בהצלחה'}
                      </h2>
                      <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                        {(() => {
                          const Icon = getUrlTypeIcon(scrapedData.sourceType);
                          return <Icon className="w-3.5 h-3.5" />;
                        })()}
                        {scrapedData.url}
                      </p>
                    </div>
                  </div>

                  {/* Title & Description */}
                  {scrapedData.title && (
                    <div className="mb-5 p-4 bg-muted/50 rounded-xl">
                      <div className="text-sm font-semibold text-muted-foreground mb-1">שם העסק/אתר</div>
                      <div className="font-bold text-lg">{scrapedData.title}</div>
                      {scrapedData.description && (
                        <div className="text-sm text-muted-foreground mt-1">{scrapedData.description}</div>
                      )}
                    </div>
                  )}

                  {/* Scraped Images */}
                  {scrapedData.images.length > 0 && (
                    <div className="mb-5">
                      <div className="text-sm font-semibold text-muted-foreground mb-3">
                        תמונות שנמצאו ({scrapedData.images.length}) - בחר תמונות לקמפיין:
                      </div>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                        {scrapedData.images.slice(0, 8).map((img, i) => (
                          <div
                            key={i}
                            className={`relative aspect-square rounded-xl overflow-hidden cursor-pointer border-2 transition-all hover:scale-105 ${
                              selectedImages.includes(img) ? 'border-primary ring-2 ring-primary/20' : 'border-transparent'
                            }`}
                            onClick={() => {
                              setSelectedImages((prev) =>
                                prev.includes(img) ? prev.filter((x) => x !== img) : [...prev, img]
                              );
                              if (!config.heroImage) setConfig((prev) => ({ ...prev, heroImage: img }));
                            }}
                          >
                            <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
                            {selectedImages.includes(img) && (
                              <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                                <CheckCircle className="w-6 h-6 text-white drop-shadow-lg" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Scraped Texts */}
                  {scrapedData.texts.length > 0 && (
                    <div>
                      <div className="text-sm font-semibold text-muted-foreground mb-2">
                        טקסטים מהאתר:
                      </div>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {scrapedData.texts.slice(0, 5).map((text, i) => (
                          <div key={i} className="text-sm text-muted-foreground p-2.5 bg-muted/30 rounded-lg">
                            {text}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>

                <div className="flex gap-3 justify-between">
                  <Button variant="outline" onClick={() => setStep('url')} className="rounded-xl">
                    <ChevronRight className="w-4 h-4 ml-1" />
                    חזרה
                  </Button>
                  <Button
                    onClick={() => setStep('platform')}
                    className="rounded-xl font-bold px-8"
                    style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)', color: 'white' }}
                  >
                    המשך לבחירת פלטפורמה
                    <ChevronLeft className="w-4 h-4 mr-1" />
                  </Button>
                </div>
              </div>
            ) : null}
          </div>
        )}

        {/* ============ STEP: PLATFORM SELECTION ============ */}
        {step === 'platform' && (
          <div className="space-y-6 animate-fade-in">
            <Card className="p-6 sm:p-8 border-2 border-border/50 shadow-xl">
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">בחר פלטפורמת פרסום</h2>
                <p className="text-muted-foreground">לאיזו פלטפורמה רוצים להתאים את הקמפיין?</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {platformOptions.map((platform) => {
                  const Icon = platform.icon;
                  const isSelected = config.platform === platform.id;
                  return (
                    <div
                      key={platform.id}
                      onClick={() => setConfig((prev) => ({ ...prev, platform: platform.id }))}
                      className={`p-5 rounded-xl border-2 cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1 ${
                        isSelected ? 'border-primary bg-primary/5 shadow-md' : 'border-border/50 hover:border-primary/30'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${platform.color} flex items-center justify-center`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-sm">{platform.name}</div>
                          <div className="text-xs text-muted-foreground">{platform.description}</div>
                        </div>
                        {isSelected && <CheckCircle className="w-5 h-5 text-primary shrink-0" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Campaign Type */}
              <div className="mt-8">
                <h3 className="text-lg font-bold mb-4 text-center">מהי מטרת הקמפיין?</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
                  {campaignTypes.map((type) => {
                    const Icon = type.icon;
                    const isSelected = config.campaignType === type.id;
                    return (
                      <div
                        key={type.id}
                        onClick={() =>
                          setConfig((prev) => ({ ...prev, campaignType: type.id, mainGoal: type.label }))
                        }
                        className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all text-center hover:shadow ${
                          isSelected ? 'border-primary bg-primary/5' : 'border-border/50 hover:border-primary/30'
                        }`}
                      >
                        <Icon className={`w-6 h-6 mx-auto mb-1.5 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                        <div className="font-semibold text-sm">{type.label}</div>
                        <div className="text-[11px] text-muted-foreground">{type.desc}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>

            <div className="flex gap-3 justify-between">
              <Button
                variant="outline"
                onClick={() => setStep(scrapedData && scrapedData.url ? 'analyze' : 'url')}
                className="rounded-xl"
              >
                <ChevronRight className="w-4 h-4 ml-1" />
                חזרה
              </Button>
              <Button
                onClick={() => setStep('details')}
                className="rounded-xl font-bold px-8"
                style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)', color: 'white' }}
              >
                המשך לפרטי העסק
                <ChevronLeft className="w-4 h-4 mr-1" />
              </Button>
            </div>
          </div>
        )}

        {/* ============ STEP: DETAILS ============ */}
        {step === 'details' && (
          <div className="space-y-6 animate-fade-in">
            <Card className="p-6 sm:p-8 border-2 border-border/50 shadow-xl">
              <div className="text-center mb-6">
                <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">פרטי העסק והעיצוב</h2>
                <p className="text-muted-foreground">ספר לנו על העסק ובחר עיצוב</p>
              </div>

              <div className="space-y-5 max-w-xl mx-auto">
                <div>
                  <label className="text-sm font-semibold mb-1.5 block">שם העסק</label>
                  <Input
                    value={config.businessName}
                    onChange={(e) => setConfig((prev) => ({ ...prev, businessName: e.target.value }))}
                    placeholder="לדוגמה: TechFlow"
                    className="h-12 text-base rounded-xl"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold mb-1.5 block">תחום עיסוק</label>
                  <Input
                    value={config.industry}
                    onChange={(e) => setConfig((prev) => ({ ...prev, industry: e.target.value }))}
                    placeholder="לדוגמה: טכנולוגיה, אופנה, מזון..."
                    className="h-12 text-base rounded-xl"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold mb-1.5 block">קהל יעד</label>
                  <Input
                    value={config.targetAudience}
                    onChange={(e) => setConfig((prev) => ({ ...prev, targetAudience: e.target.value }))}
                    placeholder="לדוגמה: בעלי עסקים קטנים, גיל 25-45"
                    className="h-12 text-base rounded-xl"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold mb-1.5 block">טקסט כפתור CTA</label>
                  <Input
                    value={config.ctaText}
                    onChange={(e) => setConfig((prev) => ({ ...prev, ctaText: e.target.value }))}
                    placeholder="לדוגמה: התחל עכשיו, קבל הצעת מחיר"
                    className="h-12 text-base rounded-xl"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold mb-1.5 block">מידע נוסף (אופציונלי)</label>
                  <Textarea
                    value={config.additionalInfo}
                    onChange={(e) => setConfig((prev) => ({ ...prev, additionalInfo: e.target.value }))}
                    placeholder="תאר את העסק, המוצרים או השירותים..."
                    rows={3}
                    className="text-base rounded-xl resize-none"
                  />
                </div>

                {/* Color Scheme */}
                <div>
                  <label className="text-sm font-semibold mb-3 block">פלטת צבעים</label>
                  <div className="grid grid-cols-3 gap-3">
                    {colorSchemes.map((scheme) => (
                      <div
                        key={scheme.id}
                        onClick={() => setConfig((prev) => ({ ...prev, colorScheme: scheme.id }))}
                        className={`p-3 rounded-xl border-2 cursor-pointer transition-all text-center hover:shadow ${
                          config.colorScheme === scheme.id ? 'border-primary bg-primary/5' : 'border-border/50 hover:border-primary/30'
                        }`}
                      >
                        <div className={`h-8 rounded-lg bg-gradient-to-r ${scheme.gradient} mb-2`} />
                        <div className="text-xs font-medium">{scheme.name}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Style */}
                <div>
                  <label className="text-sm font-semibold mb-3 block">סגנון עיצוב</label>
                  <div className="flex flex-wrap gap-2">
                    {styleOptions.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setConfig((prev) => ({ ...prev, style: opt.id }))}
                        className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all ${
                          config.style === opt.id
                            ? 'border-primary bg-primary/5 text-primary'
                            : 'border-border/50 text-muted-foreground hover:border-primary/30'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex gap-3 justify-between">
              <Button variant="outline" onClick={() => setStep('platform')} className="rounded-xl">
                <ChevronRight className="w-4 h-4 ml-1" />
                חזרה
              </Button>
              <Button
                onClick={handleGenerate}
                disabled={!config.businessName.trim()}
                className="rounded-xl font-bold px-8 shadow-lg"
                style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)', color: 'white' }}
              >
                <Sparkles className="w-5 h-5 ml-2" />
                צור קמפיין
              </Button>
            </div>
          </div>
        )}

        {/* ============ STEP: GENERATING ============ */}
        {step === 'generate' && isGenerating && (
          <div className="animate-fade-in">
            <Card className="p-10 sm:p-16 text-center border-2 border-border/50 shadow-xl">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Sparkles className="w-10 h-10 text-white animate-pulse" />
              </div>
              <h2 className="text-2xl font-extrabold mb-3">יוצר את הקמפיין שלך...</h2>
              <p className="text-muted-foreground mb-8">ה-AI בונה מודעות ותוכן מותאם לקמפיין שלך</p>

              <div className="flex flex-col gap-3 max-w-sm mx-auto text-right">
                {[
                  'מנתח מותג ותוכן...',
                  `מתאים לפלטפורמת ${platformOptions.find((p) => p.id === config.platform)?.name || ''}...`,
                  'מייצר תמונות AI...',
                  'כותב טקסטים שיווקיים...',
                  'מסיים ומכין תצוגה מקדימה...',
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground animate-slide-up" style={{ animationDelay: `${i * 0.4}s` }}>
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-primary shrink-0" />
                    {text}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* ============ STEP: PREVIEW ============ */}
        {step === 'preview' && generatedPage && (
          <div className="space-y-6 animate-fade-in">
            {/* Preview Card */}
            <Card className="overflow-hidden border-2 border-border/50 shadow-xl">
              {/* Mini Hero Preview */}
              <div
                className="relative h-64 sm:h-80 flex items-center justify-center overflow-hidden"
                style={{ background: generatedPage.gradient }}
              >
                {generatedPage.heroImage && (
                  <>
                    <img src={generatedPage.heroImage} alt="" className="absolute inset-0 w-full h-full object-cover opacity-35" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </>
                )}
                <div className="relative z-10 text-center text-white px-6">
                  <Badge className="mb-3 bg-white/15 text-white border-white/20 backdrop-blur-sm text-xs">
                    {generatedPage.industry || 'פתרון מקצועי'}
                  </Badge>
                  <h2 className="text-3xl sm:text-4xl font-extrabold mb-3 drop-shadow-lg">
                    {generatedPage.businessName}
                  </h2>
                  <p className="text-base sm:text-lg opacity-90 mb-4 drop-shadow">
                    {generatedPage.additionalInfo || `הפתרון המושלם ל${generatedPage.targetAudience}`}
                  </p>
                  <div className="inline-block px-6 py-3 bg-white text-gray-900 rounded-xl font-bold shadow-lg text-sm">
                    {generatedPage.ctaText || 'התחל עכשיו'}
                  </div>
                </div>
              </div>

              {/* Page Info */}
              <div className="p-6">
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-muted/30 rounded-xl">
                    <div className="text-xs text-muted-foreground mb-1">פלטפורמה</div>
                    <div className="font-bold text-sm">{generatedPage.platformName}</div>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-xl">
                    <div className="text-xs text-muted-foreground mb-1">מטרת קמפיין</div>
                    <div className="font-bold text-sm">{generatedPage.mainGoal}</div>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-xl">
                    <div className="text-xs text-muted-foreground mb-1">קהל יעד</div>
                    <div className="font-bold text-sm">{generatedPage.targetAudience || 'כלל הקהל'}</div>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-xl">
                    <div className="text-xs text-muted-foreground mb-1">סגנון</div>
                    <div className="font-bold text-sm">{styleOptions.find((s) => s.id === generatedPage.style)?.label || generatedPage.style}</div>
                  </div>
                </div>

                {/* Selected images from scraping */}
                {generatedPage.scrapedImages && generatedPage.scrapedImages.length > 0 && (
                  <div className="mb-6">
                    <div className="text-sm font-semibold mb-3">תמונות לקמפיין ({generatedPage.scrapedImages.length})</div>
                    <div className="flex gap-3 overflow-x-auto pb-2">
                      {generatedPage.scrapedImages.map((img: string, i: number) => (
                        <img key={i} src={img} alt="" className="w-24 h-24 rounded-xl object-cover border border-border/50 shrink-0" />
                      ))}
                    </div>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      const text = `${generatedPage.businessName}\nפלטפורמה: ${generatedPage.platformName}\nמטרה: ${generatedPage.mainGoal}\nקהל: ${generatedPage.targetAudience}\nCTA: ${generatedPage.ctaText}`;
                      navigator.clipboard.writeText(text);
                      toast.success('הפרטים הועתקו!');
                    }}
                    className="h-12 rounded-xl"
                  >
                    <Copy className="w-4 h-4 ml-2" />
                    העתק פרטים
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setGeneratedPage(null);
                      setStep('url');
                      setWebsiteUrl('');
                      setScrapedData(null);
                      setSelectedImages([]);
                      setConfig({
                        platform: 'facebook',
                        campaignType: 'leads',
                        targetAudience: '',
                        businessName: '',
                        industry: '',
                        mainGoal: 'יצירת לידים',
                        colorScheme: 'purple-blue',
                        style: 'modern',
                        heroImage: '',
                        ctaText: 'התחל עכשיו',
                        additionalInfo: '',
                      });
                    }}
                    className="h-12 rounded-xl"
                  >
                    <RefreshCw className="w-4 h-4 ml-2" />
                    צור חדש
                  </Button>
                </div>
              </div>
            </Card>

            {/* Next steps */}
            <Card className="p-6 border border-border/50">
              <h3 className="font-bold mb-4">מה הלאה?</h3>
              <div className="grid sm:grid-cols-3 gap-3">
                <button
                  onClick={() => navigate('/brief')}
                  className="p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors text-right"
                >
                  <Megaphone className="w-6 h-6 text-purple-500 mb-2" />
                  <div className="font-semibold text-sm">צור קמפיין מלא</div>
                  <div className="text-xs text-muted-foreground">מודעות + טקסטים + אסטרטגיה</div>
                </button>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors text-right"
                >
                  <BarChart3 className="w-6 h-6 text-blue-500 mb-2" />
                  <div className="font-semibold text-sm">עבור לדשבורד</div>
                  <div className="text-xs text-muted-foreground">נהל את כל הקמפיינים שלך</div>
                </button>
                <button
                  onClick={() => navigate('/analytics')}
                  className="p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors text-right"
                >
                  <Layers className="w-6 h-6 text-cyan-500 mb-2" />
                  <div className="font-semibold text-sm">אנליטיקס</div>
                  <div className="text-xs text-muted-foreground">עקוב אחרי ביצועים</div>
                </button>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/* Campaign Showcase Gallery */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-20 px-4 border-t border-border/50 bg-muted/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <Badge className="mb-4 bg-purple-500/10 text-purple-600 border-purple-500/20 rounded-full">
              <Star className="w-3.5 h-3.5 ml-1.5" />
              דוגמאות קמפיינים
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3">
              קמפיינים שנוצרו עם <span className="hero-gradient-text">AdSync AI</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              הנה כמה דוגמאות לקמפיינים שנוצרו על ידי הבינה המלאכותית שלנו עבור עסקים ישראליים
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaignExamples.map((example) => (
              <Card
                key={example.id}
                className="overflow-hidden border border-border/50 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
              >
                {/* Ad Mockup */}
                <div className={`relative bg-gradient-to-br ${example.gradient} ${example.mockupType === 'story' ? 'aspect-[9/16] max-h-[320px]' : example.mockupType === 'banner' ? 'aspect-[2/1]' : 'aspect-square max-h-[280px]'} flex flex-col items-center justify-center text-white p-6 overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

                  <div className="relative z-10 text-center">
                    <div className="text-xs bg-white/15 backdrop-blur-sm rounded-full px-3 py-1 inline-block mb-3 border border-white/10">
                      {example.industry}
                    </div>
                    <h3 className="text-lg sm:text-xl font-extrabold mb-2 leading-tight drop-shadow-lg">
                      {example.headline}
                    </h3>
                    <p className="text-sm opacity-85 mb-4 drop-shadow">
                      {example.subline}
                    </p>
                    <div className="inline-block bg-white text-gray-900 font-bold text-sm px-5 py-2.5 rounded-xl shadow-lg">
                      {example.cta}
                    </div>
                  </div>
                </div>

                {/* Info Bar */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm">{example.title}</span>
                    <Badge variant="secondary" className="text-[10px] rounded-full">
                      {example.platform}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{example.type}</span>
                    <span className="flex items-center gap-1 text-green-600 font-semibold">
                      <TrendingUp className="w-3 h-3" />
                      {example.result}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* CTA under showcase */}
          <div className="text-center mt-10">
            <Button
              onClick={() => {
                setStep('url');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              size="lg"
              className="rounded-xl font-bold shadow-lg px-10"
              style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)', color: 'white' }}
            >
              <Sparkles className="w-5 h-5 ml-2" />
              צור קמפיין כזה עכשיו
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
