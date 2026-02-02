import { useState, useRef, useCallback } from 'react';
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
  Layout,
  Sparkles,
  ArrowLeft,
  CheckCircle,
  Zap,
  Download,
  Copy,
  Eye,
  Loader2,
  Image as ImageIcon,
  FileText,
  Palette,
  Monitor,
  Smartphone,
  Type,
  Wand2,
  Grid3X3,
  Plus,
  Trash2,
  MoveUp,
  MoveDown,
  GripVertical,
  ChevronLeft,
  ChevronRight,
  Settings2,
  Undo2,
  Redo2,
  Layers,
  Globe,
  Phone,
  Mail,
  MapPin,
  Star,
  Heart,
  Users,
  ShoppingBag,
  MessageSquare,
  Target,
  ArrowRight,
} from 'lucide-react';

// ============================================================
// Types
// ============================================================

interface SectionBlock {
  id: string;
  type: 'hero' | 'features' | 'stats' | 'testimonials' | 'cta' | 'text' | 'gallery' | 'contact' | 'pricing' | 'faq';
  data: Record<string, any>;
}

interface PageConfig {
  title: string;
  businessName: string;
  colorScheme: string;
  style: string;
  direction: 'rtl' | 'ltr';
}

// ============================================================
// Section templates
// ============================================================

const sectionTemplates: { type: SectionBlock['type']; label: string; icon: any; description: string; defaultData: Record<string, any> }[] = [
  {
    type: 'hero',
    label: 'Hero',
    icon: Layout,
    description: 'כותרת ראשית עם CTA',
    defaultData: { headline: 'ברוכים הבאים', subline: 'הפתרון המושלם לעסק שלך', ctaText: 'התחל עכשיו', bgColor: '#7c3aed' },
  },
  {
    type: 'features',
    label: 'פיצ\'רים',
    icon: Grid3X3,
    description: '3-4 יתרונות / תכונות',
    defaultData: {
      title: 'למה לבחור בנו?',
      items: [
        { title: 'מהיר ויעיל', desc: 'תוצאות מיידיות', icon: 'zap' },
        { title: 'מקצועי', desc: 'איכות ברמה הגבוהה', icon: 'star' },
        { title: 'אמין', desc: 'שירות 24/7', icon: 'shield' },
      ],
    },
  },
  {
    type: 'stats',
    label: 'מספרים',
    icon: Target,
    description: 'סטטיסטיקות ומספרים',
    defaultData: {
      items: [
        { number: '3,200+', label: 'לקוחות מרוצים' },
        { number: '98%', label: 'שביעות רצון' },
        { number: '24/7', label: 'זמינות' },
        { number: '5⭐', label: 'דירוג ממוצע' },
      ],
    },
  },
  {
    type: 'testimonials',
    label: 'המלצות',
    icon: MessageSquare,
    description: 'חוות דעת של לקוחות',
    defaultData: {
      title: 'מה הלקוחות אומרים',
      items: [
        { name: 'ישראל כהן', role: 'מנכ"ל TechFlow', text: 'שירות מעולה! הצוות מקצועי ואמין.', rating: 5 },
        { name: 'שירה לוי', role: 'מנהלת שיווק', text: 'תוצאות מדהימות תוך ימים ספורים.', rating: 5 },
      ],
    },
  },
  {
    type: 'cta',
    label: 'קריאה לפעולה',
    icon: Zap,
    description: 'באנר קריאה לפעולה',
    defaultData: { headline: 'מוכנים להתחיל?', subline: 'הצטרפו אלינו עוד היום', ctaText: 'התחל עכשיו', bgColor: '#2563eb' },
  },
  {
    type: 'text',
    label: 'טקסט חופשי',
    icon: Type,
    description: 'פסקה עם כותרת',
    defaultData: { title: 'אודות', content: 'כאן תוכל לכתוב על העסק שלך, השירותים, המוצרים או כל מידע שתרצה לשתף עם הגולשים.' },
  },
  {
    type: 'gallery',
    label: 'גלריה',
    icon: ImageIcon,
    description: 'גלריית תמונות',
    defaultData: {
      title: 'הפרויקטים שלנו',
      items: [
        { url: '', caption: 'פרויקט 1' },
        { url: '', caption: 'פרויקט 2' },
        { url: '', caption: 'פרויקט 3' },
      ],
    },
  },
  {
    type: 'contact',
    label: 'צור קשר',
    icon: Mail,
    description: 'טופס יצירת קשר',
    defaultData: { title: 'צור קשר', phone: '072-123-4567', email: 'info@example.co.il', address: 'תל אביב, ישראל' },
  },
  {
    type: 'pricing',
    label: 'תמחור',
    icon: ShoppingBag,
    description: 'טבלת מחירים',
    defaultData: {
      title: 'המחירים שלנו',
      items: [
        { name: 'בסיסי', price: '99', features: ['תכונה 1', 'תכונה 2', 'תכונה 3'] },
        { name: 'פרימיום', price: '199', features: ['תכונה 1', 'תכונה 2', 'תכונה 3', 'תכונה 4'], popular: true },
        { name: 'עסקי', price: '399', features: ['תכונה 1', 'תכונה 2', 'תכונה 3', 'תכונה 4', 'תכונה 5'] },
      ],
    },
  },
  {
    type: 'faq',
    label: 'שאלות נפוצות',
    icon: FileText,
    description: 'שאלות ותשובות',
    defaultData: {
      title: 'שאלות נפוצות',
      items: [
        { q: 'כמה זמן לוקח?', a: 'התהליך לוקח מספר ימים בלבד.' },
        { q: 'האם יש תקופת ניסיון?', a: 'כן, 14 יום ניסיון חינם.' },
        { q: 'איך אפשר ליצור קשר?', a: 'ניתן ליצור קשר בטלפון, אימייל או דרך הטופס באתר.' },
      ],
    },
  },
];

const colorSchemes = [
  { id: 'purple-blue', name: 'סגול כחול', colors: ['#7c3aed', '#2563eb'], gradient: 'from-purple-600 to-blue-600' },
  { id: 'green-teal', name: 'ירוק טורקיז', colors: ['#059669', '#0d9488'], gradient: 'from-emerald-600 to-teal-500' },
  { id: 'orange-pink', name: 'כתום ורוד', colors: ['#ea580c', '#ec4899'], gradient: 'from-orange-600 to-pink-500' },
  { id: 'dark-gold', name: 'שחור וזהב', colors: ['#1f2937', '#d97706'], gradient: 'from-gray-800 to-amber-500' },
  { id: 'blue-cyan', name: 'כחול תכלת', colors: ['#2563eb', '#06b6d4'], gradient: 'from-blue-600 to-cyan-500' },
  { id: 'red-orange', name: 'אדום כתום', colors: ['#dc2626', '#f97316'], gradient: 'from-red-600 to-orange-500' },
];

// ============================================================
// Main Component
// ============================================================

export default function PageBuilder() {
  const navigate = useNavigate();
  const [sections, setSections] = useState<SectionBlock[]>([
    {
      id: 'hero-1',
      type: 'hero',
      data: { headline: 'ברוכים הבאים לעסק שלי', subline: 'הפתרון המושלם עבורך - מקצועי, מהיר ואמין', ctaText: 'התחל עכשיו', bgColor: '#7c3aed' },
    },
    {
      id: 'features-1',
      type: 'features',
      data: {
        title: 'למה לבחור בנו?',
        items: [
          { title: 'מהיר ויעיל', desc: 'תוצאות מיידיות שחוסכות זמן', icon: 'zap' },
          { title: 'מקצועי ומדויק', desc: 'איכות ברמה הגבוהה ביותר', icon: 'star' },
          { title: 'אמין ובטוח', desc: 'שירות 24/7 לכל שאלה', icon: 'shield' },
        ],
      },
    },
    {
      id: 'cta-1',
      type: 'cta',
      data: { headline: 'מוכנים להתחיל?', subline: 'הצטרפו אלינו עוד היום וגלו את ההבדל', ctaText: 'בואו נתחיל', bgColor: '#2563eb' },
    },
  ]);

  const [pageConfig, setPageConfig] = useState<PageConfig>({
    title: 'דף הנחיתה שלי',
    businessName: '',
    colorScheme: 'purple-blue',
    style: 'modern',
    direction: 'rtl',
  });

  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit');
  const [devicePreview, setDevicePreview] = useState<'desktop' | 'mobile'>('desktop');
  const [showAddPanel, setShowAddPanel] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  const currentScheme = colorSchemes.find((s) => s.id === pageConfig.colorScheme) || colorSchemes[0];
  const gradientCSS = `linear-gradient(135deg, ${currentScheme.colors[0]} 0%, ${currentScheme.colors[1]} 100%)`;

  // ============================================================
  // Section management
  // ============================================================

  const addSection = (type: SectionBlock['type']) => {
    const template = sectionTemplates.find((t) => t.type === type);
    if (!template) return;

    const newSection: SectionBlock = {
      id: `${type}-${Date.now()}`,
      type,
      data: { ...template.defaultData },
    };

    setSections((prev) => [...prev, newSection]);
    setShowAddPanel(false);
    setSelectedSection(newSection.id);
    toast.success('סקשן נוסף בהצלחה');
  };

  const removeSection = (id: string) => {
    setSections((prev) => prev.filter((s) => s.id !== id));
    if (selectedSection === id) setSelectedSection(null);
    toast.success('סקשן הוסר');
  };

  const moveSection = (id: string, direction: 'up' | 'down') => {
    setSections((prev) => {
      const index = prev.findIndex((s) => s.id === id);
      if (index === -1) return prev;
      if (direction === 'up' && index === 0) return prev;
      if (direction === 'down' && index === prev.length - 1) return prev;

      const newSections = [...prev];
      const swapIndex = direction === 'up' ? index - 1 : index + 1;
      [newSections[index], newSections[swapIndex]] = [newSections[swapIndex], newSections[index]];
      return newSections;
    });
  };

  const updateSectionData = (id: string, key: string, value: any) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, data: { ...s.data, [key]: value } } : s))
    );
  };

  // ============================================================
  // AI Generate
  // ============================================================

  const handleAIGenerate = async () => {
    if (!pageConfig.businessName.trim()) {
      toast.error('הכנס שם עסק כדי שה-AI יוכל לייצר תוכן');
      return;
    }

    setIsGeneratingAI(true);

    // Simulate AI generation
    await new Promise((r) => setTimeout(r, 2000));

    const businessName = pageConfig.businessName;
    setSections([
      {
        id: 'hero-ai',
        type: 'hero',
        data: {
          headline: `${businessName} - הפתרון המוביל`,
          subline: `גלה למה אלפי לקוחות סומכים על ${businessName} לתוצאות יוצאות דופן`,
          ctaText: 'קבל הצעת מחיר',
          bgColor: currentScheme.colors[0],
        },
      },
      {
        id: 'stats-ai',
        type: 'stats',
        data: {
          items: [
            { number: '5,000+', label: 'לקוחות מרוצים' },
            { number: '99%', label: 'שביעות רצון' },
            { number: '10+', label: 'שנות ניסיון' },
            { number: '24/7', label: 'תמיכה' },
          ],
        },
      },
      {
        id: 'features-ai',
        type: 'features',
        data: {
          title: `למה ${businessName}?`,
          items: [
            { title: 'שירות מקצועי', desc: 'צוות מומחים עם ניסיון רב בתחום', icon: 'star' },
            { title: 'תוצאות מהירות', desc: 'אנחנו מחויבים ללוחות זמנים', icon: 'zap' },
            { title: 'מחירים הוגנים', desc: 'תמחור שקוף ללא הפתעות', icon: 'shield' },
          ],
        },
      },
      {
        id: 'testimonials-ai',
        type: 'testimonials',
        data: {
          title: 'מה הלקוחות אומרים',
          items: [
            { name: 'דני כהן', role: 'מנכ"ל', text: `${businessName} שינו את הדרך שבה אנחנו עובדים. ממליץ בחום!`, rating: 5 },
            { name: 'מיכל לוי', role: 'סמנכ"ל שיווק', text: 'שירות יוצא מן הכלל, תמיכה מעולה ותוצאות מרשימות.', rating: 5 },
          ],
        },
      },
      {
        id: 'contact-ai',
        type: 'contact',
        data: { title: 'דברו איתנו', phone: '072-123-4567', email: `info@${businessName.toLowerCase().replace(/\s/g, '')}.co.il`, address: 'תל אביב, ישראל' },
      },
      {
        id: 'cta-ai',
        type: 'cta',
        data: {
          headline: 'מוכנים להתחיל?',
          subline: 'צרו קשר עוד היום וקבלו ייעוץ חינם',
          ctaText: 'יצירת קשר',
          bgColor: currentScheme.colors[1],
        },
      },
    ]);

    setIsGeneratingAI(false);
    toast.success('הדף נוצר בהצלחה ע"י AI!');
  };

  // ============================================================
  // Generate HTML for export
  // ============================================================

  const generateHTML = (): string => {
    const primary = currentScheme.colors[0];
    const secondary = currentScheme.colors[1];

    let sectionsHTML = '';
    for (const section of sections) {
      switch (section.type) {
        case 'hero':
          sectionsHTML += `
<section style="min-height:80vh;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,${section.data.bgColor || primary} 0%,${secondary} 100%);color:#fff;text-align:center;padding:80px 24px;position:relative;overflow:hidden">
<div style="position:absolute;inset:0;background:rgba(0,0,0,0.15)"></div>
<div style="position:relative;z-index:2;max-width:700px">
<h1 style="font-size:clamp(2.5rem,6vw,4.5rem);font-weight:900;margin-bottom:24px;line-height:1.1">${section.data.headline}</h1>
<p style="font-size:clamp(1.1rem,2.5vw,1.4rem);margin-bottom:36px;opacity:0.9">${section.data.subline}</p>
<a href="#" style="display:inline-block;padding:18px 48px;background:#fff;color:${primary};border-radius:14px;font-weight:700;font-size:1.1rem;text-decoration:none;box-shadow:0 8px 32px rgba(0,0,0,0.2)">${section.data.ctaText}</a>
</div>
</section>`;
          break;
        case 'features':
          sectionsHTML += `
<section style="padding:80px 24px;background:#fff;text-align:center">
<h2 style="font-size:clamp(2rem,4vw,3rem);font-weight:800;margin-bottom:48px">${section.data.title}</h2>
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:28px;max-width:1000px;margin:0 auto">
${(section.data.items || []).map((item: any) => `
<div style="padding:32px 24px;border-radius:18px;background:#f8f9fc;border:1px solid #eee;text-align:center">
<div style="width:56px;height:56px;border-radius:14px;background:${gradientCSS};display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;color:#fff">${item.icon === 'zap' ? '⚡' : item.icon === 'star' ? '⭐' : '🛡️'}</div>
<h3 style="font-size:1.2rem;font-weight:700;margin-bottom:8px">${item.title}</h3>
<p style="color:#666;line-height:1.7">${item.desc}</p>
</div>`).join('')}
</div>
</section>`;
          break;
        case 'stats':
          sectionsHTML += `
<section style="padding:70px 24px;background:#f8f9fc">
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:24px;max-width:900px;margin:0 auto;text-align:center">
${(section.data.items || []).map((item: any) => `
<div>
<div style="font-size:2.5rem;font-weight:900;background:${gradientCSS};-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">${item.number}</div>
<div style="font-size:0.95rem;color:#666;margin-top:4px">${item.label}</div>
</div>`).join('')}
</div>
</section>`;
          break;
        case 'testimonials':
          sectionsHTML += `
<section style="padding:80px 24px;background:#fff;text-align:center">
<h2 style="font-size:clamp(2rem,4vw,3rem);font-weight:800;margin-bottom:48px">${section.data.title}</h2>
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:28px;max-width:900px;margin:0 auto">
${(section.data.items || []).map((item: any) => `
<div style="padding:28px;border-radius:18px;background:#f8f9fc;border:1px solid #eee;text-align:right">
<div style="color:#f59e0b;margin-bottom:12px">${'★'.repeat(item.rating || 5)}</div>
<p style="color:#333;line-height:1.7;margin-bottom:16px">"${item.text}"</p>
<div style="font-weight:700">${item.name}</div>
<div style="font-size:0.85rem;color:#666">${item.role}</div>
</div>`).join('')}
</div>
</section>`;
          break;
        case 'cta':
          sectionsHTML += `
<section style="padding:80px 24px;background:linear-gradient(135deg,${section.data.bgColor || primary} 0%,${secondary} 100%);text-align:center;color:#fff">
<h2 style="font-size:clamp(2rem,4vw,3rem);font-weight:800;margin-bottom:16px">${section.data.headline}</h2>
<p style="font-size:1.15rem;margin-bottom:32px;opacity:0.9">${section.data.subline}</p>
<a href="#" style="display:inline-block;padding:18px 48px;background:#fff;color:${primary};border-radius:14px;font-weight:700;font-size:1.1rem;text-decoration:none;box-shadow:0 8px 32px rgba(0,0,0,0.2)">${section.data.ctaText}</a>
</section>`;
          break;
        case 'text':
          sectionsHTML += `
<section style="padding:60px 24px;max-width:800px;margin:0 auto">
<h2 style="font-size:2rem;font-weight:800;margin-bottom:20px">${section.data.title}</h2>
<p style="color:#444;line-height:1.8;font-size:1.05rem">${section.data.content}</p>
</section>`;
          break;
        case 'contact':
          sectionsHTML += `
<section style="padding:60px 24px;background:#f8f9fc;text-align:center">
<h2 style="font-size:2rem;font-weight:800;margin-bottom:32px">${section.data.title}</h2>
<div style="display:flex;flex-wrap:wrap;justify-content:center;gap:32px;max-width:700px;margin:0 auto">
${section.data.phone ? `<div>📞 <a href="tel:${section.data.phone}" style="color:${primary};text-decoration:none;font-weight:600">${section.data.phone}</a></div>` : ''}
${section.data.email ? `<div>📧 <a href="mailto:${section.data.email}" style="color:${primary};text-decoration:none;font-weight:600">${section.data.email}</a></div>` : ''}
${section.data.address ? `<div>📍 ${section.data.address}</div>` : ''}
</div>
</section>`;
          break;
        case 'pricing':
          sectionsHTML += `
<section style="padding:80px 24px;text-align:center">
<h2 style="font-size:2rem;font-weight:800;margin-bottom:48px">${section.data.title}</h2>
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px;max-width:900px;margin:0 auto">
${(section.data.items || []).map((item: any) => `
<div style="padding:32px;border-radius:18px;background:${item.popular ? gradientCSS : '#fff'};color:${item.popular ? '#fff' : '#1a1a2e'};border:${item.popular ? 'none' : '1px solid #eee'};box-shadow:${item.popular ? '0 12px 40px rgba(0,0,0,0.15)' : '0 2px 12px rgba(0,0,0,0.05)'}">
<h3 style="font-size:1.3rem;font-weight:700;margin-bottom:8px">${item.name}</h3>
<div style="font-size:2.5rem;font-weight:900;margin-bottom:24px">₪${item.price}<span style="font-size:1rem;opacity:0.7">/חודש</span></div>
${(item.features || []).map((f: string) => `<div style="padding:8px 0;border-bottom:1px solid ${item.popular ? 'rgba(255,255,255,0.15)' : '#eee'}">✓ ${f}</div>`).join('')}
<a href="#" style="display:block;margin-top:24px;padding:14px;background:${item.popular ? '#fff' : gradientCSS};color:${item.popular ? primary : '#fff'};border-radius:12px;font-weight:700;text-decoration:none;text-align:center">בחר תוכנית</a>
</div>`).join('')}
</div>
</section>`;
          break;
        case 'faq':
          sectionsHTML += `
<section style="padding:80px 24px;background:#fff">
<h2 style="font-size:2rem;font-weight:800;margin-bottom:40px;text-align:center">${section.data.title}</h2>
<div style="max-width:700px;margin:0 auto">
${(section.data.items || []).map((item: any) => `
<div style="padding:20px 0;border-bottom:1px solid #eee">
<div style="font-weight:700;font-size:1.1rem;margin-bottom:8px">${item.q}</div>
<div style="color:#666;line-height:1.7">${item.a}</div>
</div>`).join('')}
</div>
</section>`;
          break;
        case 'gallery':
          sectionsHTML += `
<section style="padding:80px 24px;text-align:center">
<h2 style="font-size:2rem;font-weight:800;margin-bottom:40px">${section.data.title}</h2>
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:16px;max-width:1000px;margin:0 auto">
${(section.data.items || []).map((item: any) => `
<div style="aspect-ratio:4/3;border-radius:14px;overflow:hidden;background:#f0f0f0;display:flex;align-items:center;justify-content:center;font-size:0.9rem;color:#999">${item.url ? `<img src="${item.url}" style="width:100%;height:100%;object-fit:cover" alt="${item.caption}">` : item.caption}</div>`).join('')}
</div>
</section>`;
          break;
      }
    }

    return `<!DOCTYPE html>
<html lang="he" dir="${pageConfig.direction}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${pageConfig.title || pageConfig.businessName || 'דף נחיתה'}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Heebo','Segoe UI',sans-serif;direction:${pageConfig.direction};color:#1a1a2e}
a{transition:opacity 0.2s}a:hover{opacity:0.85}
img{max-width:100%}
</style>
<link href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;600;700;800;900&display=swap" rel="stylesheet">
</head>
<body>
${sectionsHTML}
<footer style="padding:32px 24px;text-align:center;color:#666;font-size:0.9rem;border-top:1px solid #eee">
&copy; ${new Date().getFullYear()} ${pageConfig.businessName || ''} | נבנה ע"י AdSync AI
</footer>
</body>
</html>`;
  };

  const handleDownload = () => {
    const html = generateHTML();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${pageConfig.businessName || 'landing-page'}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('דף הנחיתה הורד בהצלחה!');
  };

  // ============================================================
  // Section Preview Renderer
  // ============================================================

  const renderSectionPreview = (section: SectionBlock) => {
    const isSelected = selectedSection === section.id;

    switch (section.type) {
      case 'hero':
        return (
          <div
            className="relative min-h-[240px] flex items-center justify-center text-white text-center p-8 overflow-hidden rounded-xl"
            style={{ background: `linear-gradient(135deg, ${section.data.bgColor || currentScheme.colors[0]} 0%, ${currentScheme.colors[1]} 100%)` }}
          >
            <div className="absolute inset-0 bg-black/15" />
            <div className="relative z-10 max-w-lg">
              <h2 className="text-2xl sm:text-3xl font-extrabold mb-3 drop-shadow-lg">{section.data.headline}</h2>
              <p className="text-sm sm:text-base opacity-90 mb-5">{section.data.subline}</p>
              <div className="inline-block bg-white text-gray-900 font-bold text-sm px-6 py-3 rounded-xl shadow-lg">
                {section.data.ctaText}
              </div>
            </div>
          </div>
        );

      case 'features':
        return (
          <div className="p-6 text-center">
            <h3 className="text-lg font-bold mb-4">{section.data.title}</h3>
            <div className="grid grid-cols-3 gap-3">
              {(section.data.items || []).map((item: any, i: number) => (
                <div key={i} className="p-3 rounded-xl bg-muted/30">
                  <div className="text-xl mb-1">{item.icon === 'zap' ? '⚡' : item.icon === 'star' ? '⭐' : '🛡️'}</div>
                  <div className="font-semibold text-xs">{item.title}</div>
                  <div className="text-[10px] text-muted-foreground">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'stats':
        return (
          <div className="p-6 bg-muted/20 rounded-xl">
            <div className="grid grid-cols-4 gap-3 text-center">
              {(section.data.items || []).map((item: any, i: number) => (
                <div key={i}>
                  <div className="text-xl font-extrabold hero-gradient-text">{item.number}</div>
                  <div className="text-[10px] text-muted-foreground">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'testimonials':
        return (
          <div className="p-6 text-center">
            <h3 className="text-lg font-bold mb-4">{section.data.title}</h3>
            <div className="grid grid-cols-2 gap-3">
              {(section.data.items || []).map((item: any, i: number) => (
                <div key={i} className="p-3 rounded-xl bg-muted/30 text-right text-xs">
                  <div className="text-yellow-500 text-sm mb-1">{'★'.repeat(item.rating || 5)}</div>
                  <p className="text-muted-foreground mb-2">"{item.text}"</p>
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-muted-foreground text-[10px]">{item.role}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'cta':
        return (
          <div
            className="p-8 text-center text-white rounded-xl"
            style={{ background: `linear-gradient(135deg, ${section.data.bgColor || currentScheme.colors[0]} 0%, ${currentScheme.colors[1]} 100%)` }}
          >
            <h3 className="text-xl font-bold mb-2">{section.data.headline}</h3>
            <p className="text-sm opacity-90 mb-4">{section.data.subline}</p>
            <div className="inline-block bg-white text-gray-900 font-bold text-sm px-5 py-2.5 rounded-xl">
              {section.data.ctaText}
            </div>
          </div>
        );

      case 'text':
        return (
          <div className="p-6">
            <h3 className="text-lg font-bold mb-2">{section.data.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{section.data.content}</p>
          </div>
        );

      case 'contact':
        return (
          <div className="p-6 bg-muted/20 rounded-xl text-center">
            <h3 className="text-lg font-bold mb-3">{section.data.title}</h3>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              {section.data.phone && <span>📞 {section.data.phone}</span>}
              {section.data.email && <span>📧 {section.data.email}</span>}
              {section.data.address && <span>📍 {section.data.address}</span>}
            </div>
          </div>
        );

      case 'pricing':
        return (
          <div className="p-6 text-center">
            <h3 className="text-lg font-bold mb-4">{section.data.title}</h3>
            <div className="grid grid-cols-3 gap-3">
              {(section.data.items || []).map((item: any, i: number) => (
                <div
                  key={i}
                  className={`p-3 rounded-xl text-xs ${item.popular ? 'text-white shadow-lg' : 'bg-muted/30'}`}
                  style={item.popular ? { background: gradientCSS } : undefined}
                >
                  <div className="font-bold">{item.name}</div>
                  <div className="text-lg font-extrabold my-1">₪{item.price}</div>
                  <div className="text-[10px] opacity-75">/חודש</div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'faq':
        return (
          <div className="p-6">
            <h3 className="text-lg font-bold mb-3 text-center">{section.data.title}</h3>
            <div className="space-y-2">
              {(section.data.items || []).slice(0, 2).map((item: any, i: number) => (
                <div key={i} className="p-2.5 rounded-lg bg-muted/30">
                  <div className="font-semibold text-xs">{item.q}</div>
                  <div className="text-[10px] text-muted-foreground mt-1">{item.a}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'gallery':
        return (
          <div className="p-6 text-center">
            <h3 className="text-lg font-bold mb-3">{section.data.title}</h3>
            <div className="grid grid-cols-3 gap-2">
              {(section.data.items || []).map((item: any, i: number) => (
                <div key={i} className="aspect-[4/3] bg-muted/30 rounded-lg flex items-center justify-center text-xs text-muted-foreground">
                  {item.url ? <img src={item.url} alt={item.caption} className="w-full h-full object-cover rounded-lg" /> : <ImageIcon className="w-6 h-6 opacity-30" />}
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return <div className="p-6 text-center text-muted-foreground text-sm">סקשן לא מוכר</div>;
    }
  };

  // ============================================================
  // Section Editor (right panel)
  // ============================================================

  const renderSectionEditor = () => {
    const section = sections.find((s) => s.id === selectedSection);
    if (!section) {
      return (
        <div className="p-6 text-center text-muted-foreground">
          <Settings2 className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm">בחר סקשן לעריכה</p>
        </div>
      );
    }

    const updateField = (key: string, value: any) => updateSectionData(section.id, key, value);

    switch (section.type) {
      case 'hero':
      case 'cta':
        return (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold mb-1 block">כותרת</label>
              <Input value={section.data.headline} onChange={(e) => updateField('headline', e.target.value)} className="text-sm rounded-lg" />
            </div>
            <div>
              <label className="text-xs font-semibold mb-1 block">תיאור</label>
              <Textarea value={section.data.subline} onChange={(e) => updateField('subline', e.target.value)} rows={2} className="text-sm rounded-lg resize-none" />
            </div>
            <div>
              <label className="text-xs font-semibold mb-1 block">טקסט כפתור</label>
              <Input value={section.data.ctaText} onChange={(e) => updateField('ctaText', e.target.value)} className="text-sm rounded-lg" />
            </div>
          </div>
        );
      case 'features':
        return (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold mb-1 block">כותרת</label>
              <Input value={section.data.title} onChange={(e) => updateField('title', e.target.value)} className="text-sm rounded-lg" />
            </div>
            {(section.data.items || []).map((item: any, i: number) => (
              <div key={i} className="p-3 rounded-lg bg-muted/30 space-y-2">
                <div className="text-xs font-semibold text-muted-foreground">פיצ'ר {i + 1}</div>
                <Input
                  value={item.title}
                  onChange={(e) => {
                    const newItems = [...section.data.items];
                    newItems[i] = { ...newItems[i], title: e.target.value };
                    updateField('items', newItems);
                  }}
                  placeholder="כותרת"
                  className="text-sm rounded-lg"
                />
                <Input
                  value={item.desc}
                  onChange={(e) => {
                    const newItems = [...section.data.items];
                    newItems[i] = { ...newItems[i], desc: e.target.value };
                    updateField('items', newItems);
                  }}
                  placeholder="תיאור"
                  className="text-sm rounded-lg"
                />
              </div>
            ))}
          </div>
        );
      case 'text':
        return (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold mb-1 block">כותרת</label>
              <Input value={section.data.title} onChange={(e) => updateField('title', e.target.value)} className="text-sm rounded-lg" />
            </div>
            <div>
              <label className="text-xs font-semibold mb-1 block">תוכן</label>
              <Textarea value={section.data.content} onChange={(e) => updateField('content', e.target.value)} rows={5} className="text-sm rounded-lg resize-none" />
            </div>
          </div>
        );
      case 'contact':
        return (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold mb-1 block">כותרת</label>
              <Input value={section.data.title} onChange={(e) => updateField('title', e.target.value)} className="text-sm rounded-lg" />
            </div>
            <div>
              <label className="text-xs font-semibold mb-1 block">טלפון</label>
              <Input value={section.data.phone} onChange={(e) => updateField('phone', e.target.value)} dir="ltr" className="text-sm rounded-lg" />
            </div>
            <div>
              <label className="text-xs font-semibold mb-1 block">אימייל</label>
              <Input value={section.data.email} onChange={(e) => updateField('email', e.target.value)} dir="ltr" className="text-sm rounded-lg" />
            </div>
            <div>
              <label className="text-xs font-semibold mb-1 block">כתובת</label>
              <Input value={section.data.address} onChange={(e) => updateField('address', e.target.value)} className="text-sm rounded-lg" />
            </div>
          </div>
        );
      default:
        return (
          <div className="p-4 text-center text-muted-foreground text-sm">
            עריכה מתקדמת תהיה זמינה בקרוב
          </div>
        );
    }
  };

  // ============================================================
  // Render
  // ============================================================

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-24 sm:pt-28 pb-6 sm:pb-8 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f0a2e] via-[#1a1145] to-[#2d1b69]" />
        <div className="absolute top-0 right-[20%] w-[300px] h-[300px] bg-purple-600 rounded-full mix-blend-screen filter blur-[100px] opacity-15" />
        <div className="absolute bottom-0 left-[10%] w-[250px] h-[250px] bg-pink-600 rounded-full mix-blend-screen filter blur-[80px] opacity-10" />

        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <Badge className="mb-4 bg-pink-500/20 text-pink-300 border-pink-500/30 rounded-full text-sm">
            <Layout className="w-3.5 h-3.5 ml-1.5" />
            בונה דפי נחיתה AI
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-3">
            בנה דף נחיתה <span className="hero-gradient-text">מקצועי בדקות</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
            בחר סקשנים, ערוך תוכן, ותן ל-AI ליצור דף נחיתה מושלם - ללא צורך בידע טכני
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Builder Toolbar */}
      <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-sm">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-between h-14 gap-3">
            <div className="flex items-center gap-2">
              <Input
                value={pageConfig.businessName}
                onChange={(e) => setPageConfig((prev) => ({ ...prev, businessName: e.target.value }))}
                placeholder="שם העסק..."
                className="h-9 w-40 text-sm rounded-lg"
              />
              <Button
                onClick={handleAIGenerate}
                disabled={isGeneratingAI}
                size="sm"
                className="rounded-lg font-semibold text-xs"
                style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)', color: 'white' }}
              >
                {isGeneratingAI ? <Loader2 className="w-3.5 h-3.5 animate-spin ml-1" /> : <Wand2 className="w-3.5 h-3.5 ml-1" />}
                ייצר עם AI
              </Button>
            </div>

            <div className="flex items-center gap-2">
              {/* Color scheme mini picker */}
              <div className="hidden sm:flex items-center gap-1">
                {colorSchemes.map((scheme) => (
                  <button
                    key={scheme.id}
                    onClick={() => setPageConfig((prev) => ({ ...prev, colorScheme: scheme.id }))}
                    className={`w-6 h-6 rounded-full border-2 transition-all ${pageConfig.colorScheme === scheme.id ? 'border-foreground scale-110' : 'border-transparent'}`}
                    style={{ background: `linear-gradient(135deg, ${scheme.colors[0]}, ${scheme.colors[1]})` }}
                    title={scheme.name}
                  />
                ))}
              </div>

              <div className="h-5 w-px bg-border hidden sm:block" />

              {/* Device preview toggle */}
              <div className="flex items-center bg-muted rounded-lg p-0.5">
                <button
                  onClick={() => setDevicePreview('desktop')}
                  className={`p-1.5 rounded-md transition-all ${devicePreview === 'desktop' ? 'bg-background shadow text-primary' : 'text-muted-foreground'}`}
                >
                  <Monitor className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDevicePreview('mobile')}
                  className={`p-1.5 rounded-md transition-all ${devicePreview === 'mobile' ? 'bg-background shadow text-primary' : 'text-muted-foreground'}`}
                >
                  <Smartphone className="w-4 h-4" />
                </button>
              </div>

              <div className="h-5 w-px bg-border" />

              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewMode(viewMode === 'edit' ? 'preview' : 'edit')}
                className="rounded-lg text-xs"
              >
                {viewMode === 'edit' ? <Eye className="w-3.5 h-3.5 ml-1" /> : <Settings2 className="w-3.5 h-3.5 ml-1" />}
                {viewMode === 'edit' ? 'תצוגה מקדימה' : 'חזור לעריכה'}
              </Button>

              <Button
                onClick={handleDownload}
                size="sm"
                className="rounded-lg font-semibold text-xs"
                style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)', color: 'white' }}
              >
                <Download className="w-3.5 h-3.5 ml-1" />
                הורד HTML
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Builder Area */}
      <div className="container mx-auto max-w-7xl px-4 py-6">
        <div className="flex gap-6">
          {/* Canvas (center) */}
          <div className={`flex-1 ${viewMode === 'edit' ? '' : ''}`}>
            <div
              className={`mx-auto bg-white rounded-xl border border-border/50 shadow-xl overflow-hidden transition-all ${
                devicePreview === 'mobile' ? 'max-w-[375px]' : 'max-w-full'
              }`}
            >
              {sections.length === 0 ? (
                <div className="p-16 text-center text-muted-foreground">
                  <Layout className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p className="font-semibold mb-1">הדף ריק</p>
                  <p className="text-sm mb-4">הוסף סקשנים כדי להתחיל לבנות</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAddPanel(true)}
                    className="rounded-lg"
                  >
                    <Plus className="w-4 h-4 ml-1" />
                    הוסף סקשן
                  </Button>
                </div>
              ) : (
                sections.map((section, index) => (
                  <div
                    key={section.id}
                    className={`relative group transition-all ${
                      viewMode === 'edit' ? 'cursor-pointer' : ''
                    } ${selectedSection === section.id && viewMode === 'edit' ? 'ring-2 ring-primary ring-inset' : ''}`}
                    onClick={() => viewMode === 'edit' && setSelectedSection(section.id)}
                  >
                    {renderSectionPreview(section)}

                    {/* Section controls overlay */}
                    {viewMode === 'edit' && (
                      <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 bg-background/90 backdrop-blur-sm rounded-lg border border-border/50 shadow-lg p-1">
                        <button onClick={(e) => { e.stopPropagation(); moveSection(section.id, 'up'); }} className="p-1 rounded hover:bg-muted transition-colors" title="הזז למעלה">
                          <MoveUp className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); moveSection(section.id, 'down'); }} className="p-1 rounded hover:bg-muted transition-colors" title="הזז למטה">
                          <MoveDown className="w-3.5 h-3.5" />
                        </button>
                        <div className="w-px h-4 bg-border" />
                        <button onClick={(e) => { e.stopPropagation(); removeSection(section.id); }} className="p-1 rounded hover:bg-red-500/10 text-red-500 transition-colors" title="הסר">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}

              {/* Add section button at bottom */}
              {viewMode === 'edit' && sections.length > 0 && (
                <div className="p-4 border-t border-dashed border-border/50">
                  <Button
                    variant="ghost"
                    className="w-full rounded-xl border-2 border-dashed border-border/50 hover:border-primary/30 h-14 text-muted-foreground hover:text-primary"
                    onClick={() => setShowAddPanel(true)}
                  >
                    <Plus className="w-5 h-5 ml-2" />
                    הוסף סקשן חדש
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Right sidebar (editor) */}
          {viewMode === 'edit' && (
            <div className="hidden lg:block w-80 shrink-0">
              <div className="sticky top-[8rem]">
                <Card className="border border-border/50 shadow-lg overflow-hidden">
                  <div className="p-4 bg-muted/30 border-b border-border/50">
                    <h3 className="font-bold text-sm flex items-center gap-2">
                      <Settings2 className="w-4 h-4" />
                      {selectedSection ? `עריכת ${sectionTemplates.find((t) => t.type === sections.find((s) => s.id === selectedSection)?.type)?.label || 'סקשן'}` : 'הגדרות'}
                    </h3>
                  </div>
                  <div className="p-4 max-h-[60vh] overflow-y-auto">
                    {renderSectionEditor()}
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Section Panel (modal overlay) */}
      {showAddPanel && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowAddPanel(false)}>
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">הוסף סקשן חדש</h2>
              <button onClick={() => setShowAddPanel(false)} className="p-2 rounded-lg hover:bg-muted transition-colors">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {sectionTemplates.map((template) => {
                const Icon = template.icon;
                return (
                  <button
                    key={template.type}
                    onClick={() => addSection(template.type)}
                    className="p-4 rounded-xl border-2 border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all text-center group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="font-semibold text-sm">{template.label}</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">{template.description}</div>
                  </button>
                );
              })}
            </div>
          </Card>
        </div>
      )}

      <Footer />
    </div>
  );
}
