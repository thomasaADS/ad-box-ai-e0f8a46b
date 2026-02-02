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
  ShoppingCart,
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
  type LucideIcon,
} from 'lucide-react';

// ============================================================
// Agent Types
// ============================================================

interface AIAgent {
  id: string;
  name: string;
  nameEn: string;
  role: string;
  description: string;
  avatar: string;
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
// Agent definitions
// ============================================================

const agents: AIAgent[] = [
  {
    id: 'seo',
    name: 'סוכן SEO',
    nameEn: 'SEO Agent',
    role: 'מומחה קידום אורגני',
    description: 'מומחה SEO שעוזר לך לשפר את הדירוג האורגני בגוגל, לנתח מילות מפתח, לבנות אסטרטגיית תוכן ולמקסם תנועה אורגנית.',
    avatar: '🔍',
    gradient: 'from-green-500 to-emerald-600',
    icon: Search,
    specialties: ['מחקר מילות מפתח', 'אופטימיזציית On-Page', 'בניית קישורים', 'SEO טכני', 'תוכן SEO', 'SEO מקומי'],
    sampleQuestions: [
      'איך אני משפר את ה-SEO של האתר שלי?',
      'עזור לי למצוא מילות מפתח לעסק שלי',
      'מה זה SEO טכני ולמה זה חשוב?',
      'איך אני בונה אסטרטגיית קישורים?',
    ],
    personality: 'אני מומחה SEO עם ניסיון רב בקידום אתרים בשוק הישראלי. אני מתמחה באסטרטגיות קידום אורגני, מחקר מילות מפתח, אופטימיזציה טכנית ובניית תוכן איכותי שמושך תנועה אורגנית. אני תמיד מעודכן באלגוריתמים האחרונים של גוגל.',
  },
  {
    id: 'ppc',
    name: 'סוכן PPC',
    nameEn: 'PPC Agent',
    role: 'מומחה פרסום ממומן',
    description: 'מומחה בקמפיינים ממומנים בגוגל, פייסבוק, אינסטגרם וטיקטוק. עוזר לך למקסם ROI ולהוריד עלויות פרסום.',
    avatar: '🎯',
    gradient: 'from-blue-600 to-purple-600',
    icon: Target,
    specialties: ['Google Ads', 'Facebook Ads', 'TikTok Ads', 'אופטימיזציית CPC', 'טרגוט קהלים', 'A/B Testing'],
    sampleQuestions: [
      'איך אני מגדיר קמפיין גוגל?',
      'מה התקציב המומלץ לפרסום בפייסבוק?',
      'איך אני מוריד את עלות הקליק?',
      'עזור לי לבנות קמפיין לידים',
    ],
    personality: 'אני מומחה PPC (פרסום ממומן) עם התמחות בגוגל, פייסבוק ופלטפורמות פרסום נוספות. אני עוזר לעסקים למקסם את ה-ROI על ההשקעה בפרסום, לבנות קמפיינים ממוקדים ולהגיע לקהל היעד הנכון.',
  },
  {
    id: 'content',
    name: 'סוכן תוכן',
    nameEn: 'Content Agent',
    role: 'אסטרטג תוכן שיווקי',
    description: 'מומחה ביצירת אסטרטגיית תוכן, כתיבת קופי שיווקי, פוסטים לרשתות חברתיות ותוכן שמושך לקוחות.',
    avatar: '✍️',
    gradient: 'from-pink-500 to-orange-500',
    icon: PenTool,
    specialties: ['קופירייטינג', 'שיווק תוכן', 'סושיאל מדיה', 'בלוג עסקי', 'ניוזלטר', 'סטוריטלינג'],
    sampleQuestions: [
      'כתוב לי פוסט לפייסבוק על העסק שלי',
      'איך אני בונה אסטרטגיית תוכן?',
      'עזור לי לכתוב כותרות מושכות',
      'תן לי רעיונות לפוסטים לאינסטגרם',
    ],
    personality: 'אני סוכן תוכן שיווקי שמתמחה ביצירת תוכן ממיר ומעניין. אני עוזר לעסקים לבנות מותג חזק דרך קופירייטינג, שיווק תוכן, ופוסטים לרשתות חברתיות שמושכים תשומת לב ומייצרים מעורבות.',
  },
  {
    id: 'analytics',
    name: 'סוכן אנליטיקס',
    nameEn: 'Analytics Agent',
    role: 'מומחה ניתוח נתונים',
    description: 'מנתח נתוני קמפיינים, מדדי ביצוע, המרות ו-ROI. עוזר לך לקבל החלטות מבוססות נתונים.',
    avatar: '📊',
    gradient: 'from-cyan-500 to-blue-600',
    icon: BarChart3,
    specialties: ['Google Analytics', 'דוחות ביצוע', 'ניתוח המרות', 'A/B Testing', 'דשבורדים', 'תחזיות'],
    sampleQuestions: [
      'איך אני מנתח את ביצועי הקמפיין?',
      'מה הם המדדים החשובים ביותר לעקוב?',
      'עזור לי להבין דוח Google Analytics',
      'איך אני משפר את שיעור ההמרה?',
    ],
    personality: 'אני מומחה אנליטיקס שמתמחה בניתוח נתונים ומדידת ביצועים. אני עוזר לעסקים להבין את המספרים שמאחורי הקמפיינים, לזהות הזדמנויות לשיפור ולקבל החלטות מושכלות מבוססות נתונים.',
  },
  {
    id: 'branding',
    name: 'סוכן ברנדינג',
    nameEn: 'Brand Agent',
    role: 'מומחה מיתוג ועיצוב',
    description: 'מומחה במיתוג, זהות חזותית, עיצוב לוגו, פלטת צבעים ובניית מותג חזק וייחודי.',
    avatar: '🎨',
    gradient: 'from-purple-600 to-pink-500',
    icon: Palette,
    specialties: ['זהות מותג', 'עיצוב לוגו', 'פלטת צבעים', 'טון דיבור', 'חווית מותג', 'מיצוב'],
    sampleQuestions: [
      'איך אני בונה זהות מותגית?',
      'עזור לי לבחור צבעים למותג',
      'מה עושה לוגו טוב?',
      'איך אני מגדיר את הטון של המותג?',
    ],
    personality: 'אני מומחה ברנדינג שמתמחה בבניית מותגים חזקים. אני עוזר לעסקים לבנות זהות חזותית ייחודית, טון דיבור עקבי ואסטרטגיית מיתוג שמייצרת חיבור עם הקהל.',
  },
  {
    id: 'strategy',
    name: 'סוכן אסטרטגיה',
    nameEn: 'Strategy Agent',
    role: 'יועץ אסטרטגיה דיגיטלית',
    description: 'יועץ אסטרטגי שעוזר לבנות תוכנית שיווק מקיפה, לתכנן תקציבים ולהגדיר מטרות עסקיות.',
    avatar: '🧠',
    gradient: 'from-amber-500 to-red-600',
    icon: Brain,
    specialties: ['אסטרטגיה דיגיטלית', 'תכנון תקציב', 'הגדרת KPIs', 'ניתוח שוק', 'תוכנית שיווק', 'צמיחה'],
    sampleQuestions: [
      'עזור לי לבנות תוכנית שיווק',
      'מה התקציב הנכון לעסק שלי?',
      'איך אני מגדיר KPIs?',
      'תן לי אסטרטגיה לצמיחה',
    ],
    personality: 'אני יועץ אסטרטגיה דיגיטלית עם ראייה כוללת של השוק הישראלי. אני עוזר לעסקים לבנות תוכנית שיווק מקיפה, לתכנן תקציבים בצורה חכמה ולהגדיר מטרות ברורות ומדידות.',
  },
];

// ============================================================
// AI response generator (mock)
// ============================================================

function generateAgentResponse(agentId: string, question: string): string {
  const agent = agents.find((a) => a.id === agentId);
  if (!agent) return 'מצטער, לא הצלחתי לעבד את השאלה.';

  const lower = question.toLowerCase();

  // SEO Agent responses
  if (agentId === 'seo') {
    if (lower.includes('מילות מפתח') || lower.includes('keyword')) {
      return `🔍 **מחקר מילות מפתח - המדריך שלי:**\n\n1. **התחל מהמוצר/שירות שלך** - רשום את כל המונחים שלקוחות יחפשו\n2. **השתמש בכלים** - Google Keyword Planner, Ahrefs, או SEMrush\n3. **חפש מילות Long Tail** - ביטויים ארוכים יותר עם תחרות נמוכה\n4. **בדוק את המתחרים** - ראה אילו מילות מפתח עובדות להם\n5. **דרג לפי עדיפות** - נפח חיפוש × רלוונטיות × סיכוי דירוג\n\n💡 **טיפ:** בשוק הישראלי, חפש גם באנגלית וגם בעברית. הרבה ישראלים מחפשים בשתי השפות!`;
    }
    if (lower.includes('seo') || lower.includes('קידום') || lower.includes('דירוג')) {
      return `🔍 **כך תשפר את ה-SEO שלך:**\n\n**On-Page SEO:**\n• ודא שה-Title Tags ייחודיים לכל עמוד\n• כתוב Meta Descriptions מזמינים\n• השתמש ב-H1, H2, H3 בצורה הירארכית\n• אופטימיזציה של תמונות (alt text, compression)\n\n**Technical SEO:**\n• ודא שהאתר מהיר (Core Web Vitals)\n• האתר חייב להיות מותאם למובייל\n• צור sitemap.xml ו-robots.txt\n• הטמע Schema markup\n\n**Off-Page SEO:**\n• בנה קישורים איכותיים מאתרים רלוונטיים\n• היה פעיל בקהילות מקצועיות\n• פתח פרופיל Google My Business\n\n🎯 רוצה שאעמיק בתחום מסוים?`;
    }
    return `🔍 שאלה מצוינת! בתור מומחה SEO, אני ממליץ:\n\n1. **תחילה, עשה אודיט SEO** - בדוק את המצב הנוכחי של האתר\n2. **מקד את המאמצים** - התמקד בעמודים בעלי הפוטנציאל הגבוה ביותר\n3. **תוכן איכותי** - צור תוכן שעונה על שאלות אמיתיות של הגולשים\n4. **מדוד ושפר** - עקוב אחרי הנתונים ובצע אופטימיזציה מתמשכת\n\nרוצה שאפרט יותר על אחד מהנושאים? 💪`;
  }

  // PPC Agent responses
  if (agentId === 'ppc') {
    if (lower.includes('תקציב') || lower.includes('budget') || lower.includes('עלות')) {
      return `🎯 **תכנון תקציב פרסום:**\n\n**כלל אצבע לעסקים קטנים:**\n• **תקציב מינימלי**: ₪2,000-3,000 לחודש\n• **תקציב מומלץ**: ₪5,000-10,000 לחודש\n• **תקציב אופטימלי**: 5-15% מההכנסות\n\n**חלוקה מומלצת:**\n• 50% - Google Ads (מי שמחפש אותך)\n• 30% - Facebook/Instagram (חשיפה וטרגוט)\n• 20% - TikTok/ניסויים\n\n**טיפים חשובים:**\n1. התחל קטן ובדוק מה עובד\n2. אל תפזר על יותר מדי פלטפורמות\n3. הקצה 10% לבדיקות A/B\n4. עקוב אחרי ROAS (החזר על השקעה)\n\n📊 מה התקציב שלך כרגע?`;
    }
    if (lower.includes('קמפיין') || lower.includes('מודע')) {
      return `🎯 **מדריך להקמת קמפיין ממומן:**\n\n**שלב 1 - הגדרת מטרה:**\n• לידים / מכירות / חשיפה / תנועה\n\n**שלב 2 - הגדרת קהל יעד:**\n• דמוגרפיה: גיל, מגדר, מיקום\n• תחומי עניין ודפוסי התנהגות\n• קהלים דומים (Lookalike)\n\n**שלב 3 - יצירת מודעות:**\n• כותרת מושכת\n• תמונה/סרטון איכותי\n• CTA ברור\n• דף נחיתה ממוקד\n\n**שלב 4 - אופטימיזציה:**\n• בדוק A/B על גרסאות שונות\n• נטר ביצועים יומיומי\n• הוסף מילות מפתח שליליות\n\nרוצה שאעזור לך להקים קמפיין? 🚀`;
    }
    return `🎯 מצוין! בתור מומחה PPC, הנה מה שאני מציע:\n\n• **גוגל** - מתאים למי שמחפש אותך פעיל\n• **פייסבוק** - מתאים לטרגוט מדויק לפי עניין\n• **טיקטוק** - מתאים לקהל צעיר ומעורבות גבוהה\n\nהצעד הראשון הוא להבין מה המטרה שלך ומי קהל היעד. ספר לי על העסק שלך ואני אתאים אסטרטגיה! 💡`;
  }

  // Content Agent responses
  if (agentId === 'content') {
    if (lower.includes('פוסט') || lower.includes('סושיאל') || lower.includes('פייסבוק') || lower.includes('אינסטגרם')) {
      return `✍️ **טיפים לפוסטים ברשתות חברתיות:**\n\n**מבנה פוסט ממיר:**\n1. 🪝 **Hook** - משפט פתיחה שמושך תשומת לב\n2. 📖 **סיפור** - ספר סיפור או תן ערך\n3. 🎯 **CTA** - קריאה ברורה לפעולה\n\n**סוגי פוסטים שעובדים:**\n• טיפים ורשימות (\"5 דרכים ל...\")\n• לפני ואחרי\n• מאחורי הקלעים\n• שאלות ושיתוף קהל\n• סטוריז אישיים\n\n**דוגמה לפוסט:**\n> 💡 \"רוב העסקים מפספסים את זה...\n> [3 שורות ערך]\n> רוצים לשמוע עוד? שלחו הודעה / לינק בביו 👇\"\n\nספר לי על העסק שלך ואכתוב לך פוסט! 📝`;
    }
    return `✍️ אני כאן לעזור עם תוכן שיווקי!\n\n**מה אני יכול לעשות:**\n• לכתוב פוסטים לרשתות חברתיות\n• ליצור תוכן לבלוג\n• לכתוב קופי למודעות\n• לבנות אסטרטגיית תוכן\n• ליצור ניוזלטרים\n\nספר לי על העסק שלך, קהל היעד, ומה אתה צריך - ואני אתחיל ליצור! ✨`;
  }

  // Analytics Agent responses
  if (agentId === 'analytics') {
    return `📊 **ניתוח נתונים - המדריך שלי:**\n\n**המדדים החשובים ביותר:**\n• **CTR** (שיעור קליקים) - מעל 2% זה טוב\n• **CPC** (עלות לקליק) - תלוי תחום, ממוצע ₪2-10\n• **CVR** (שיעור המרה) - מעל 3% זה מצוין\n• **ROAS** (החזר על פרסום) - לפחות x3\n• **LTV** (ערך חיי לקוח) - קריטי להבנת רווחיות\n\n**כלים שאני ממליץ:**\n1. Google Analytics 4\n2. Facebook Pixel + CAPI\n3. Hotjar (מפות חום)\n4. Google Search Console\n\nספר לי מה אתה מנסה לנתח ואני אעזור! 📈`;
  }

  // Branding Agent responses
  if (agentId === 'branding') {
    return `🎨 **בניית מותג חזק:**\n\n**4 עמודי הבסיס:**\n1. **ערכים** - מה המותג מייצג?\n2. **ייחודיות** - מה מבדיל אותך מהמתחרים?\n3. **קול** - איך המותג מדבר? (רשמי/ידידותי/מקצועי)\n4. **חזותי** - לוגו, צבעים, טיפוגרפיה\n\n**פלטת צבעים:**\n• בחר 2-3 צבעים ראשיים\n• כחול = אמינות, ירוק = צמיחה, סגול = יצירתיות\n• שמור על עקביות בכל הנקודות\n\n**טיפ מקצועי:** לפני שמתחילים בעיצוב, הגדר את ה-\"למה\" - למה המותג קיים ומה הוא נותן ללקוחות.\n\nספר לי על העסק ואני אעזור לבנות את הזהות! ✨`;
  }

  // Strategy Agent responses
  if (agentId === 'strategy') {
    return `🧠 **אסטרטגיה דיגיטלית:**\n\n**5 שלבים לתוכנית שיווק:**\n\n1. **מחקר שוק** - הבן את השוק, המתחרים והלקוחות\n2. **הגדרת מטרות** - SMART goals מדידות\n3. **בחירת ערוצים** - איפה הקהל שלך נמצא?\n4. **יצירת תוכן** - תוכנית תוכן שבועית/חודשית\n5. **מדידה ואופטימיזציה** - מה עובד? מה לשפר?\n\n**חלוקת תקציב מומלצת:**\n• 40% - פרסום ממומן\n• 25% - תוכן ו-SEO\n• 20% - רשתות חברתיות\n• 15% - כלים וטכנולוגיה\n\nספר לי על העסק שלך ואני אבנה לך תוכנית מותאמת! 🚀`;
  }

  return `שאלה מצוינת! אני אשמח לעזור. ספר לי עוד פרטים ואני אתן לך תשובה מפורטת ומותאמת. 💡`;
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

  // Scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when agent selected
  useEffect(() => {
    if (selectedAgent) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [selectedAgent]);

  const handleSelectAgent = (agentId: string) => {
    setSelectedAgent(agentId);
    const agent = agents.find((a) => a.id === agentId);
    if (agent) {
      // Add welcome message
      const existingAgentMessages = messages.filter((m) => m.agentId === agentId);
      if (existingAgentMessages.length === 0) {
        setMessages((prev) => [
          ...prev,
          {
            id: `welcome-${agentId}`,
            role: 'assistant',
            content: `שלום! 👋 אני ${agent.name}, ${agent.role}.\n\n${agent.description}\n\nאיך אני יכול לעזור לך היום?`,
            timestamp: new Date(),
            agentId,
          },
        ]);
      }
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || !selectedAgent) return;

    // Check guest limit
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

    // Simulate AI thinking
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
            סוכני AI מתקדמים
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-3">
            הצוות <span className="hero-gradient-text">הדיגיטלי</span> שלך
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto mb-6">
            צוות של סוכני AI מומחים - SEO, PPC, תוכן, אנליטיקס ועוד. שאל כל שאלה וקבל תשובות מקצועיות בזמן אמת
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
                  const Icon = agent.icon;
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
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${agent.gradient} flex items-center justify-center text-lg shrink-0`}>
                          {agent.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-sm truncate">{agent.name}</div>
                          <div className="text-[10px] text-muted-foreground truncate">{agent.role}</div>
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

              {/* Quick info card for active agent */}
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
              /* No agent selected - show overview */
              <div className="space-y-6">
                <Card className="p-8 sm:p-12 text-center border-2 border-border/50 shadow-xl">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Bot className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-extrabold mb-2">בחר סוכן AI</h2>
                  <p className="text-muted-foreground mb-6">
                    בחר את הסוכן המתאים מהרשימה בצד ימין והתחל שיחה
                  </p>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-3xl mx-auto">
                    {agents.slice(0, 6).map((agent) => {
                      const Icon = agent.icon;
                      return (
                        <button
                          key={agent.id}
                          onClick={() => handleSelectAgent(agent.id)}
                          className="p-4 rounded-xl border border-border/50 hover:border-primary/30 hover:bg-primary/5 hover:-translate-y-1 transition-all text-center group"
                        >
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${agent.gradient} flex items-center justify-center mx-auto mb-2 text-xl group-hover:scale-110 transition-transform`}>
                            {agent.avatar}
                          </div>
                          <div className="font-bold text-sm">{agent.name}</div>
                          <div className="text-[10px] text-muted-foreground mt-0.5">{agent.role}</div>
                        </button>
                      );
                    })}
                  </div>
                </Card>
              </div>
            ) : (
              /* Chat interface */
              <Card className="border-2 border-border/50 shadow-xl overflow-hidden flex flex-col" style={{ height: 'calc(100vh - 280px)', minHeight: '500px' }}>
                {/* Chat header */}
                <div className="flex items-center justify-between p-4 border-b border-border/50 bg-muted/20">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${activeAgent?.gradient} flex items-center justify-center text-lg`}>
                      {activeAgent?.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-sm">{activeAgent?.name}</div>
                      <div className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                        {activeAgent?.role} • מקוון
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedAgent(null)}
                    className="p-2 rounded-lg hover:bg-muted transition-colors lg:hidden"
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
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm shrink-0 ${
                        msg.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : `bg-gradient-to-br ${activeAgent?.gradient} text-white`
                      }`}>
                        {msg.role === 'user' ? <User className="w-4 h-4" /> : activeAgent?.avatar}
                      </div>
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

                  {/* Typing indicator */}
                  {isTyping && (
                    <div className="flex gap-3">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${activeAgent?.gradient} flex items-center justify-center text-sm`}>
                        {activeAgent?.avatar}
                      </div>
                      <div className="bg-muted/50 border border-border/50 rounded-2xl rounded-bl-md px-4 py-3">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Sample questions (shown when few messages) */}
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
                            💬 {q}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div ref={chatEndRef} />
                </div>

                {/* Guest limit warning */}
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
                          : `שאל את ${activeAgent?.name || 'הסוכן'}...`
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
                      {GUEST_MESSAGE_LIMIT - guestMessageCount} הודעות חינם נותרו • <button onClick={() => navigate('/auth')} className="text-primary hover:underline">הירשם</button> לגישה בלתי מוגבלת
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
