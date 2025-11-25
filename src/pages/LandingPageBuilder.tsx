import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopNav } from '@/components/TopNav';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/hooks/useTranslation';
import { 
  Globe, 
  Sparkles, 
  Zap, 
  Code,
  CheckCircle2,
  Bot,
  User,
  Send,
  Loader2,
  Eye,
  Download,
  Rocket,
  Coins,
} from 'lucide-react';
import { toast } from 'sonner';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  code?: string;
}

export default function LandingPageBuilder() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '👋 **היי! אני בונה אתרים חכם.**\n\n💬 **תאר לי מה אתה רוצה** ואני אבנה לך את הדף בזמן אמת!\n\n**דוגמאות:**\n• "בנה לי דף נחיתה למסעדה איטלקית בתל אביב"\n• "אני צריך landing page לסטודיו יוגה עם אווירה רגועה"\n• "דף למכירת קורס דיגיטלי עם וידאו וטופס הרשמה"\n\n✨ אני אבנה את הקוד, תראה תצוגה חיה, ותוכל להוריד או לפרסם!'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [tokens, setTokens] = useState(1000); // User's available tokens
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateWebsiteCode = (userRequest: string): string => {
    // This would normally call an AI API (Claude/GPT-4)
    // For now, we'll create a dynamic template based on the request
    
    const hasRestaurant = userRequest.includes('מסעדה') || userRequest.includes('restaurant');
    const hasYoga = userRequest.includes('יוגה') || userRequest.includes('yoga');
    const hasCourse = userRequest.includes('קורס') || userRequest.includes('course');
    
    let template = '';
    
    if (hasRestaurant) {
      template = `<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>מסעדה איטלקית - ארוחה אמיתית</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50">
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-red-600 to-orange-600 text-white py-20">
        <div class="container mx-auto px-4 text-center">
            <h1 class="text-5xl font-bold mb-4">🍝 מסעדה איטלקית אותנטית</h1>
            <p class="text-2xl mb-8">הטעם של איטליה, בלב תל אביב</p>
            <button class="bg-white text-red-600 px-8 py-4 rounded-full text-xl font-bold hover:bg-gray-100 transition">
                הזמינו שולחן עכשיו 📞
            </button>
        </div>
    </section>
    
    <!-- Menu Preview -->
    <section class="py-16">
        <div class="container mx-auto px-4">
            <h2 class="text-4xl font-bold text-center mb-12">התפריט שלנו</h2>
            <div class="grid md:grid-cols-3 gap-8">
                <div class="bg-white p-6 rounded-lg shadow-lg">
                    <div class="text-6xl mb-4">🍕</div>
                    <h3 class="text-2xl font-bold mb-2">פיצה</h3>
                    <p class="text-gray-600">פיצה אמיתית מתנור עצים</p>
                    <p class="text-2xl font-bold mt-4 text-red-600">₪65</p>
                </div>
                <div class="bg-white p-6 rounded-lg shadow-lg">
                    <div class="text-6xl mb-4">🍝</div>
                    <h3 class="text-2xl font-bold mb-2">פסטה</h3>
                    <p class="text-gray-600">פסטה טרייה תוצרת בית</p>
                    <p class="text-2xl font-bold mt-4 text-red-600">₪75</p>
                </div>
                <div class="bg-white p-6 rounded-lg shadow-lg">
                    <div class="text-6xl mb-4">🥗</div>
                    <h3 class="text-2xl font-bold mb-2">סלטים</h3>
                    <p class="text-gray-600">סלטים איטלקיים אותנטיים</p>
                    <p class="text-2xl font-bold mt-4 text-red-600">₪45</p>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Contact CTA -->
    <section class="bg-gray-800 text-white py-16">
        <div class="container mx-auto px-4 text-center">
            <h2 class="text-4xl font-bold mb-4">מוכנים לחוויה קולינרית?</h2>
            <p class="text-xl mb-8">הזמינו עכשיו ותיהנו מ-20% הנחה על הארוחה הראשונה!</p>
            <button class="bg-red-600 text-white px-10 py-4 rounded-full text-xl font-bold hover:bg-red-700 transition">
                הזמן עכשיו 🍷
            </button>
        </div>
    </section>
</body>
</html>`;
    } else if (hasYoga) {
      template = `<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>סטודיו יוגה - שלווה ואיזון</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-br from-purple-50 to-pink-50">
    <!-- Hero -->
    <section class="min-h-screen flex items-center justify-center px-4">
        <div class="text-center max-w-3xl">
            <h1 class="text-6xl font-light mb-6 text-purple-900">🧘‍♀️ מקום של שלווה</h1>
            <p class="text-2xl text-purple-700 mb-12">גלי את האיזון הפנימי שלך</p>
            <button class="bg-purple-600 text-white px-10 py-4 rounded-full text-xl hover:bg-purple-700 transition">
                הרשמי לשיעור ניסיון חינם ✨
            </button>
        </div>
    </section>
    
    <!-- Classes -->
    <section class="py-20 bg-white">
        <div class="container mx-auto px-4">
            <h2 class="text-4xl font-light text-center mb-16 text-purple-900">השיעורים שלנו</h2>
            <div class="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                <div class="text-center p-8">
                    <div class="text-5xl mb-4">🌅</div>
                    <h3 class="text-2xl font-bold mb-3 text-purple-800">יוגה בוקר</h3>
                    <p class="text-gray-600 mb-4">התחילו את היום עם אנרגיה חיובית</p>
                    <p class="text-purple-600 font-bold">ראשון-חמישי 7:00-8:30</p>
                </div>
                <div class="text-center p-8">
                    <div class="text-5xl mb-4">🌙</div>
                    <h3 class="text-2xl font-bold mb-3 text-purple-800">יוגה ערב</h3>
                    <p class="text-gray-600 mb-4">הירגעו ושחררו מתחים</p>
                    <p class="text-purple-600 font-bold">ראשון-חמישי 19:00-20:30</p>
                </div>
            </div>
        </div>
    </section>
</body>
</html>`;
    } else {
      // Generic template
      template = `<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>דף נחיתה מקצועי</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50">
    <section class="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div class="container mx-auto px-4 text-center">
            <h1 class="text-6xl font-bold mb-6">הפתרון שחיפשת 🚀</h1>
            <p class="text-2xl mb-8 max-w-2xl mx-auto">תיאור מקצועי שמסביר בדיוק מה אתה מציע ולמה זה ישנה את החיים</p>
            <button class="bg-white text-blue-600 px-10 py-4 rounded-full text-xl font-bold hover:bg-gray-100 transition">
                התחל עכשיו ✨
            </button>
        </div>
    </section>
    
    <section class="py-20">
        <div class="container mx-auto px-4">
            <h2 class="text-4xl font-bold text-center mb-12">למה לבחור בנו?</h2>
            <div class="grid md:grid-cols-3 gap-8">
                <div class="bg-white p-8 rounded-xl shadow-lg text-center">
                    <div class="text-5xl mb-4">⚡</div>
                    <h3 class="text-2xl font-bold mb-3">מהיר</h3>
                    <p class="text-gray-600">תוצאות מיידיות ללא המתנה</p>
                </div>
                <div class="bg-white p-8 rounded-xl shadow-lg text-center">
                    <div class="text-5xl mb-4">💎</div>
                    <h3 class="text-2xl font-bold mb-3">איכותי</h3>
                    <p class="text-gray-600">רמה מקצועית ללא פשרות</p>
                </div>
                <div class="bg-white p-8 rounded-xl shadow-lg text-center">
                    <div class="text-5xl mb-4">🎯</div>
                    <h3 class="text-2xl font-bold mb-3">יעיל</h3>
                    <p class="text-gray-600">פתרונות שעובדים באמת</p>
                </div>
            </div>
        </div>
    </section>
</body>
</html>`;
    }
    
    return template;
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const tokensNeeded = 100; // Each generation costs 100 tokens
    if (tokens < tokensNeeded) {
      toast.error('אין מספיק טוקנים! נדרשים 100 טוקנים ליצירה.');
      return;
    }

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);

    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate code
    const code = generateWebsiteCode(userMessage);
    setGeneratedCode(code);

    // Deduct tokens
    setTokens(prev => prev - tokensNeeded);

    // Add AI response
    const aiResponse = `🎨 **בניתי לך דף נחיתה מקצועי!**\n\nהדף כולל:\n✅ עיצוב מודרני ורספונסיבי\n✅ צבעים ואווירה מותאמת\n✅ קריאה לפעולה ברורה\n✅ קוד מוכן לפרסום\n\n💡 **רוצה לשנות משהו?** פשוט תגיד לי מה ואני אעדכן!\n\nעלות: -${tokensNeeded} טוקנים | נשארו: ${tokens - tokensNeeded} טוקנים`;
    
    setMessages(prev => [...prev, { 
      role: 'assistant', 
      content: aiResponse,
      code: code 
    }]);

    setIsLoading(false);
    toast.success('הדף נבנה בהצלחה! 🎉');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleDownload = () => {
    if (!generatedCode) return;
    const blob = new Blob([generatedCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'landing-page.html';
    a.click();
    toast.success('הקובץ הורד בהצלחה! 📥');
  };

  const handlePublish = () => {
    if (!generatedCode) return;
    toast.success('🎉 הדף פורסם בהצלחה! הלינק הועתק ללוח');
    // Here we would integrate with hosting service
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopNav />

      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Chat Panel - Left Side */}
        <div className="lg:w-1/2 flex flex-col border-r border-border">
          {/* Header */}
          <div className="p-6 border-b border-border bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">AI Web Builder</h2>
                  <p className="text-sm text-muted-foreground">בונה אתרים חכם בזמן אמת</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm">
                <Coins className="w-5 h-5 text-yellow-500" />
                <span className="font-bold text-lg">{tokens}</span>
                <span className="text-sm text-muted-foreground">טוקנים</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="bg-white/50">
                <Zap className="w-3 h-3 ml-1" />
                בניה בזמן אמת
              </Badge>
              <Badge variant="outline" className="bg-white/50">
                <Code className="w-3 h-3 ml-1" />
                קוד מלא
              </Badge>
              <Badge variant="outline" className="bg-white/50">
                <CheckCircle2 className="w-3 h-3 ml-1" />
                מוכן לפרסום
              </Badge>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 ${
                  message.role === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                {/* Avatar */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.role === 'assistant'
                    ? 'bg-gradient-to-br from-purple-500 to-pink-500'
                    : 'bg-gradient-to-br from-blue-500 to-cyan-500'
                }`}>
                  {message.role === 'assistant' ? (
                    <Bot className="w-6 h-6 text-white" />
                  ) : (
                    <User className="w-6 h-6 text-white" />
                  )}
                </div>

                {/* Message Bubble */}
                <div
                  className={`flex-1 max-w-[85%] rounded-2xl p-4 ${
                    message.role === 'assistant'
                      ? 'bg-muted'
                      : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                  }`}
                >
                  <p className="whitespace-pre-wrap leading-relaxed">
                    {message.content}
                  </p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div className="bg-muted rounded-2xl p-4">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-muted-foreground">בונה את הדף שלך...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-border bg-card">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="תאר את הדף שאתה רוצה... (דוגמה: 'דף למסעדה איטלקית')"
                className="flex-1 text-lg h-14"
                disabled={isLoading}
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 h-14 px-8"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              💰 כל יצירה עולה 100 טוקנים | נשארו לך {tokens} טוקנים
            </p>
          </div>
        </div>

        {/* Preview Panel - Right Side */}
        <div className="lg:w-1/2 flex flex-col bg-gray-100 dark:bg-gray-900">
          {/* Preview Header */}
          <div className="p-4 border-b border-border bg-card flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              <span className="font-semibold">תצוגה חיה</span>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCode(!showCode)}
                disabled={!generatedCode}
              >
                <Code className="w-4 h-4 ml-2" />
                {showCode ? 'תצוגה' : 'קוד'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                disabled={!generatedCode}
              >
                <Download className="w-4 h-4 ml-2" />
                הורד
              </Button>
              <Button
                size="sm"
                onClick={handlePublish}
                disabled={!generatedCode}
                className="bg-gradient-to-r from-green-600 to-emerald-600"
              >
                <Rocket className="w-4 h-4 ml-2" />
                פרסם
              </Button>
            </div>
          </div>

          {/* Preview Content */}
          <div className="flex-1 overflow-auto p-4">
            {!generatedCode ? (
              <div className="h-full flex items-center justify-center text-center p-8">
                <div className="max-w-md">
                  <Globe className="w-20 h-20 mx-auto mb-4 text-muted-foreground/50" />
                  <h3 className="text-2xl font-bold mb-2">מוכן להתחיל?</h3>
                  <p className="text-muted-foreground mb-6">
                    תאר לי איזה דף אתה רוצה ואני אבנה לך אותו בזמן אמת!
                  </p>
                  <div className="mt-6 space-y-2 text-sm text-muted-foreground text-right">
                    <p className="font-semibold">💡 דוגמאות למה שאתה יכול לבקש:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>"דף למסעדה איטלקית עם תפריט"</li>
                      <li>"landing page לסטודיו יוגה"</li>
                      <li>"דף מכירה לקורס אונליין"</li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : showCode ? (
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-auto h-full">
                <pre>{generatedCode}</pre>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-2xl overflow-hidden h-full">
                <iframe
                  srcDoc={generatedCode}
                  className="w-full h-full border-0"
                  title="Website Preview"
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
