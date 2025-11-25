import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopNav } from '@/components/TopNav';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { Send, Bot, User, Loader2, Sparkles, Zap, Target, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AIChat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '👋 היי! אני סוכן AI מומחה בקריאייטיב ושיווק דיגיטלי.\n\n🎯 אני עובד איתך בשיטה מקצועית:\n• מנתח את הקהל שלך\n• מציע אסטרטגיות שיווקיות\n• יוצר מסרים שמוכרים\n• ממליץ על ערוצים הכי רווחיים\n\nבואו נתחיל! **מה שם העסק שלך?**'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [collectedData, setCollectedData] = useState({
    brandName: '',
    industry: '',
    targetAudience: '',
    city: '',
    uniqueValue: '',
    offer: '',
    competitors: '',
    website: '',
    tone: 'professional',
    platforms: [] as string[],
    budget: '100',
  });
  const [step, setStep] = useState(0);
  const [quickSuggestions, setQuickSuggestions] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const questions = [
    { key: 'brandName', question: 'מה שם העסק שלך?' },
    { key: 'industry', question: '**באיזה תחום אתה עוסק?**\n(למשל: מסעדה, סלון יופי, שרברבות, אימון אישי...)' },
    { key: 'targetAudience', question: '**למי אתה פונה?**\n(גילאים, מין, עיר, תחומי עניין...)' },
    { key: 'city', question: '**באיזו עיר/אזור אתה משרת לקוחות?**' },
    { key: 'uniqueValue', question: '**מה עושה אותך שונה מהמתחרים?**\n(למה לקוחות צריכים לבחור דווקא בך?)' },
    { key: 'offer', question: '**מה המבצע או ההצעה הכי חזקה שלך כרגע?**' },
    { key: 'competitors', question: '**מי המתחרים העיקריים שלך?**\n(זה יעזור לי לבנות מסרים חדים יותר)' },
    { key: 'website', question: '**יש לך אתר או קישור לווטסאפ?** (אופציונלי)' },
    { key: 'platforms', question: '**באילו ערוצים אתה רוצה לפרסם?**\n(פייסבוק/אינסטגרם, גוגל, טיקטוק, יוטיוב...)' },
    { key: 'budget', question: '**מה התקציב היומי שלך?** (בשקלים)' },
  ];

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);

    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    // Simulate AI processing with creative insights
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Add creative marketing insights - professional responses
    let response = '';
    
    // Provide smart, creative responses based on step
    if (step === 0) {
      // After brand name
      response = `נעים להכיר, **${userMessage}**! 🎯\n\nשם טוב הוא התחלה מצוינת. עכשיו בואו נבין את התחום.\n\n${questions[step + 1].question}`;
    } else if (step === 1) {
      // After industry - give industry insights
      const industryTips: Record<string, string> = {
        'מסעדה': '🍽️ במסעדות, החוויה החזותית חשובה! תמונות מנות + ביקורות',
        'סלון': '💇 בתחום היופי, תוצאות לפני-אחרי עובדות מעולה',
        'שרברב': '🔧 בשרברבות, זמינות ומהירות הם המפתח. תדגיש זמן הגעה',
        'אימון': '💪 באימונים, תוצאות לקוחות והשראה מניעה',
        'עורך דין': '⚖️ בשירותים משפטיים, אמינות ומקצועיות',
        'רופא': '🏥 ברפואה, ניסיון ואמפתיה',
      };
      
      let industryTip = '';
      for (const [key, tip] of Object.entries(industryTips)) {
        if (userMessage.includes(key)) {
          industryTip = `\n\n💡 **טיפ שיווקי:** ${tip}`;
          break;
        }
      }
      
      response = `מעולה! **${userMessage}** - תחום מעניין!${industryTip}\n\n${questions[step + 1].question}`;
      
      // Add quick suggestions for target audience
      setQuickSuggestions([
        'נשים ו גברים 25-45',
        'משפחות צעירות באזור',
        'צעירים 18-30',
        'בעלי עסקים',
      ]);
    } else if (step === 2) {
      // After target audience
      response = `מצוין! הבנתי מי קהל היעד שלך.\n\n💡 **אסטרטגיה:** כשאני יוצר את המסרים, אני אתאים את השפה, הטון והערוצים בדיוק לקהל הזה.\n\n${questions[step + 1].question}`;
    } else if (step === 3) {
      // After city
      response = `**${userMessage}** - נהדר! 📍\n\nאני אכוון את הקמפיינים לאזור הזה ולקהל הרלוונטי שם.\n\n${questions[step + 1].question}`;
    } else if (step === 4) {
      // After unique value - this is gold!
      response = `יופי! זה בדיוק מה שאני צריך! 🎯\n\n"${userMessage}"\n\n💎 **זה הYUSP (Unique Selling Point) שלך** - אני אבנה את כל המסרים סביב זה.\n\n${questions[step + 1].question}`;
    } else if (step === 5) {
      // After offer - give creative angles
      response = `וואו! "${userMessage}" - זה מבצע חזק! 🔥\n\n🎨 **רעיונות קריאייטיביים למסר:**\n\n**זווית 1 - דחיפות:**\n"⏰ מבצע לזמן מוגבל! תפסו לפני שנגמר"\n\n**זווית 2 - ערך:**\n"💰 חסכו [X] שקלים! כמות מוגבלת"\n\n**זווית 3 - רגשית:**\n"✨ [תוצאה רצויה] מחכה לך - תתחיל עכשיו!"\n\nאני אשתמש בכולן!\n\n${questions[step + 1].question}`;
    } else if (step === 6) {
      // After competitors
      response = `מעולה! מכיר את ${userMessage}.\n\n🎯 **אסטרטגיית דיפרנציאציה:**\nאני אדגיש את מה שעושה אותך שונה ומתקדם יותר מהם.\n\n${questions[step + 1].question}`;
    } else if (step === 7) {
      // After website/whatsapp
      if (userMessage && userMessage.length > 3) {
        response = `מצוין! יש לי את פרטי הקשר שלך. 📱\n\n${questions[step + 1].question}`;
      } else {
        response = `בסדר, בלי אתר - נעבוד עם השיחות הישירות.\n\n${questions[step + 1].question}`;
      }
    } else if (step === 8) {
      // After platforms - give channel advice
      const selectedPlatforms = userMessage.toLowerCase();
      let channelAdvice = '\n\n📊 **המלצות לערוצים:**\n';
      
      if (selectedPlatforms.includes('פייסבוק') || selectedPlatforms.includes('אינסטגרם')) {
        channelAdvice += '• **Meta (FB/IG):** מעולה לקהל מקומי + תוכן ויזואלי\n';
      }
      if (selectedPlatforms.includes('גוגל')) {
        channelAdvice += '• **Google:** אידיאלי לחיפושים של אנשים עם כוונת קנייה\n';
      }
      if (selectedPlatforms.includes('טיקטוק')) {
        channelAdvice += '• **TikTok:** נהדר לקהל צעיר + תוכן ויראלי\n';
      }
      
      response = `מצוין! בחרת ערוצים חזקים! 🚀${channelAdvice}\n${questions[step + 1].question}`;
    }

    // Update collected data based on current step
    if (step < questions.length) {
      const currentQuestion = questions[step];
      const updatedData = { ...collectedData };

      if (currentQuestion.key === 'platforms') {
        // Parse platforms from user input
        const platformMap: Record<string, string> = {
          'פייסבוק': 'meta',
          'facebook': 'meta',
          'אינסטגרם': 'meta',
          'instagram': 'meta',
          'meta': 'meta',
          'גוגל': 'google',
          'google': 'google',
          'טיקטוק': 'tiktok',
          'tiktok': 'tiktok',
          'טוויטר': 'twitter',
          'twitter': 'twitter',
          'יוטיוב': 'youtube',
          'youtube': 'youtube',
        };
        
        const platforms: string[] = [];
        Object.entries(platformMap).forEach(([key, value]) => {
          if (userMessage.toLowerCase().includes(key)) {
            if (!platforms.includes(value)) {
              platforms.push(value);
            }
          }
        });
        updatedData.platforms = platforms.length > 0 ? platforms : ['meta', 'google'];
      } else if (currentQuestion.key === 'budget') {
        const budgetNum = parseInt(userMessage.replace(/[^\d]/g, ''));
        updatedData.budget = budgetNum ? budgetNum.toString() : '100';
      } else {
        (updatedData as any)[currentQuestion.key] = userMessage;
      }

      setCollectedData(updatedData);

      // Move to next question
      const nextStep = step + 1;
      setStep(nextStep);

      if (nextStep < questions.length && !response) {
        if (nextStep === questions.length - 1) {
          response = `כמעט סיימנו! שאלה אחרונה: ${questions[nextStep].question}`;
        } else {
          response = `סבבה! ${questions[nextStep].question}`;
        }
      } else if (nextStep >= questions.length) {
        // Final summary with budget advice
        const budgetNum = parseInt(updatedData.budget) || 100;
        let budgetAdvice = '';
        
        if (budgetNum < 50) {
          budgetAdvice = '\n\n💡 **המלצה:** תקציב של מתחת ל-50₪ ליום יגביל את החשיפה. שקול להעלות ל-100₪+ לתוצאות טובות יותר.';
        } else if (budgetNum >= 50 && budgetNum < 150) {
          budgetAdvice = '\n\n✅ **תקציב טוב!** 50-150₪ ליום יאפשר לך לקבל תוצאות ראשוניות ולמדוד ביצועים.';
        } else if (budgetNum >= 150) {
          budgetAdvice = '\n\n🔥 **תקציב מצוין!** 150₪+ ליום יאפשר לך לבצע אופטימיזציה מהירה ולהגיע להמרות.';
        }
        
        response = `🎉 **פרפקט! סיימנו את הייעוץ!**\n\nהנה מה שיש לי:\n✅ ${updatedData.brandName}\n✅ ${updatedData.industry}\n✅ קהל יעד: ${updatedData.targetAudience}\n✅ מיקום: ${updatedData.city}\n✅ USP: ${updatedData.uniqueValue}\n✅ מבצע: ${updatedData.offer}\n✅ תקציב: ${updatedData.budget}₪/יום${budgetAdvice}\n\n🎨 **עכשיו אני:**\n• מנתח את קהל היעד שלך\n• בונה אסטרטגיה קריאייטיבית\n• יוצר ${updatedData.platforms.length > 1 ? 'מספר וריאנטים' : 'וריאנטים'} מותאמים\n• ממטב את המסרים לכל ערוץ\n\n⚡ זה ייקח 5 שניות...`;
        
        // Save to sessionStorage and navigate
        setTimeout(() => {
          sessionStorage.setItem('briefData', JSON.stringify(updatedData));
          toast.success('🎉 הקמפיינים מוכנים! מעביר אותך לתוצאות...');
          navigate('/generate');
        }, 4000);
      }

      if (response) {
        setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      }
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopNav />
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl flex flex-col">
        {/* Header */}
          <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-950 dark:to-purple-950 rounded-full mb-4">
            <Bot className="w-5 h-5 text-indigo-600" />
            <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
              מומחה קריאייטיב ושיווק • Powered by Gemini AI
            </span>
          </div>
          <h1 className="text-3xl font-bold mb-2">ייעוץ אישי עם AI</h1>
          <p className="text-muted-foreground">
            ספר לי על העסק שלך, ואני אעזור לך לבנות קמפיין מנצח
          </p>
        </div>

        {/* Messages Container */}
        <Card className="flex-1 mb-4 overflow-hidden flex flex-col">
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
                    ? 'bg-gradient-to-br from-indigo-500 to-purple-500'
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
                  className={`flex-1 max-w-[80%] rounded-2xl p-4 ${
                    message.role === 'assistant'
                      ? 'bg-muted'
                      : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
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
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div className="bg-muted rounded-2xl p-4">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-muted-foreground">חושב...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </Card>

        {/* Input Area */}
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={step >= questions.length ? 'השיחה הסתיימה...' : 'כתוב את התשובה שלך...'}
            className="flex-1 text-lg h-14"
            disabled={isLoading || step >= questions.length}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading || step >= questions.length}
            size="lg"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 h-14 px-8"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Progress */}
        {step < questions.length && (
          <div className="mt-4 text-center text-sm text-muted-foreground">
            שאלה {step + 1} מתוך {questions.length}
          </div>
        )}
      </main>
    </div>
  );
}

