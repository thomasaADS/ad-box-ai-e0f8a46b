import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Send, Bot, User, Sparkles, Loader2, CheckCircle, Lightbulb } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ParsedBrief {
  businessName?: string;
  businessType?: string;
  targetAudience?: string;
  location?: string;
  ageRange?: string;
  goals?: string;
  budget?: string;
  platforms?: string[];
  urgency?: string;
  specialOffers?: string;
  tone?: string;
}

export default function FreeChatBrief() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'שלום! אני הסוכן החכם של AdSync.\n\nפשוט ספר לי על העסק שלך ומה אתה רוצה להשיג - אני אדאג לכל השאר!\n\nלדוגמה:\n"אני בעל עסק לשרברבות בתל אביב, רוצה להגיע לאנשים בגילאי 30-50 שצריכים שרברב דחוף. התקציב שלי 2000₪ לחודש ואני רוצה לפרסם בפייסבוק וגוגל."\n\nאז... ספר לי, מה הסיפור שלך?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [parsedBrief, setParsedBrief] = useState<ParsedBrief | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  /**
   * Parse free-form text into structured brief using AI
   */
  const parseUserInput = async (text: string): Promise<ParsedBrief> => {
    // Using Gemini AI to parse the text
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      
      // Skip API if no key or demo key
      if (!apiKey || apiKey.includes('demo') || apiKey.includes('Demo')) {
        throw new Error('No API key - using fallback');
      }
      
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `נתח את הטקסט הבא וחלץ מידע לקמפיין פרסום. החזר JSON בלבד, ללא טקסט נוסף:

טקסט מהמשתמש:
"${text}"

החזר JSON בפורמט הבא (כל השדות אופציונליים):
{
  "businessName": "שם העסק",
  "businessType": "סוג העסק (שרברבות, מסעדה וכו')",
  "targetAudience": "קהל היעד",
  "location": "מיקום/אזור",
  "ageRange": "טווח גילאים",
  "goals": "מטרות הקמפיין",
  "budget": "תקציב",
  "platforms": ["פלטפורמות פרסום"],
  "urgency": "רמת דחיפות",
  "specialOffers": "מבצעים מיוחדים",
  "tone": "טון הפרסום"
}

אם לא מצאת מידע - השאר את השדה ריק או null.
החזר רק JSON תקני, ללא markdown או טקסט נוסף.`
              }]
            }],
          }),
        }
      );

      const data = await response.json();
      const aiText = data.candidates[0]?.content?.parts[0]?.text || '{}';
      
      // Clean JSON response (remove markdown if exists)
      const jsonText = aiText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const parsed = JSON.parse(jsonText);
      
      return parsed;
    } catch (error) {
      console.error('Error parsing input:', error);
      // Fallback: Enhanced keyword extraction
      const businessNameMatch = text.match(/(?:עסק ל?|חברת |חנות |מסעדת |מספרת |מכון |סטודיו |קליניקת )(.+?)(?:[,\.\s]|$)/);
      const locationMatch = text.match(/(?:ב|מ)(תל[- ]?אביב|ירושלים|חיפה|באר[- ]?שבע|ראשון לציון|פתח תקווה|נתניה|אשדוד|רמת[- ]?גן|הרצליה|כפר סבא|רחובות|בת ים|הוד השרון|גבעתיים|רעננה|[א-ת\s]{2,15})/);
      const budgetMatch = text.match(/(\d+[,\d]*)\s*(₪|שקל)/);
      const platformsMatch: string[] = [];
      if (/פייסבוק|facebook|מטא|meta/i.test(text)) platformsMatch.push('meta');
      if (/גוגל|google/i.test(text)) platformsMatch.push('google');
      if (/טיקטוק|tiktok/i.test(text)) platformsMatch.push('tiktok');
      if (/אינסטגרם|instagram/i.test(text)) platformsMatch.push('meta');
      if (/לינקדאין|linkedin/i.test(text)) platformsMatch.push('linkedin');

      // Try to extract business type
      const businessTypes = ['שרברבות', 'חשמלאות', 'מסעדה', 'קפה', 'מספרה', 'עורך דין', 'רואה חשבון', 'שיפוצים', 'נדלן', 'ביטוח', 'רפואה', 'יופי', 'אופנה', 'טכנולוגיה', 'הייטק', 'מכירות', 'שיווק', 'עיצוב', 'צילום', 'אימון', 'פיטנס', 'יוגה'];
      const foundType = businessTypes.find(t => text.includes(t));

      // Extract target audience
      const ageMatch = text.match(/(\d{2})\s*[-–]\s*(\d{2})/);

      return {
        businessName: businessNameMatch?.[1]?.trim(),
        businessType: foundType,
        targetAudience: text.match(/(?:לקוחות|אנשים|נשים|גברים|צעירים|מבוגרים|בני נוער|משפחות|עסקים|בעלי עסקים).{0,30}/)?.[0],
        location: locationMatch?.[0],
        ageRange: ageMatch ? `${ageMatch[1]}-${ageMatch[2]}` : undefined,
        goals: text.match(/(?:רוצה |מטרה |להגיע |להגדיל |לקבל |למכור ).{0,40}/)?.[0],
        budget: budgetMatch?.[0],
        platforms: platformsMatch.length > 0 ? [...new Set(platformsMatch)] : undefined,
      };
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isProcessing) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);

    try {
      // Parse the user's input
      const brief = await parseUserInput(userMessage.content);
      setParsedBrief(brief);

      // Create AI response
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateAIResponse(brief),
        timestamp: new Date(),
      };

      setTimeout(() => {
        setMessages((prev) => [...prev, aiResponse]);
        setIsProcessing(false);
      }, 1500);
    } catch (error) {
      console.error('Error processing message:', error);
      setIsProcessing(false);
      toast.error('אופס! משהו השתבש. נסה שוב.');
    }
  };

  const generateAIResponse = (brief: ParsedBrief): string => {
    const parts: string[] = ['מעולה! הבנתי את הפרטים הבאים:\n'];

    if (brief.businessName) parts.push(`**עסק**: ${brief.businessName}`);
    if (brief.businessType) parts.push(`**תחום**: ${brief.businessType}`);
    if (brief.targetAudience) parts.push(`**קהל יעד**: ${brief.targetAudience}`);
    if (brief.location) parts.push(`**מיקום**: ${brief.location}`);
    if (brief.ageRange) parts.push(`**גילאים**: ${brief.ageRange}`);
    if (brief.goals) parts.push(`**מטרות**: ${brief.goals}`);
    if (brief.budget) parts.push(`**תקציב**: ${brief.budget}`);
    if (brief.platforms && brief.platforms.length > 0) {
      parts.push(`**פלטפורמות**: ${brief.platforms.join(', ')}`);
    }
    if (brief.specialOffers) parts.push(`🎁 **מבצעים**: ${brief.specialOffers}`);

    if (parts.length === 1) {
      return 'אוקיי, מעניין! ספר לי עוד קצת - מה בדיוק אתה מוכר ולאיזה קהל אתה רוצה להגיע?';
    }

    parts.push('\n**אני מוכן ליצור את הקמפיין שלך!**\n\nאם יש עוד משהו שרצית להוסיף - כתוב עכשיו.\nאחרת, לחץ על "צור קמפיין עכשיו" למטה.');

    return parts.join('\n');
  };

  const handleCreateCampaign = () => {
    if (!parsedBrief) {
      toast.error('אנא שתף איתי קצת מידע על העסק שלך קודם');
      return;
    }

    // Map ParsedBrief fields to the format Generate page expects
    const briefData = {
      brandName: parsedBrief.businessName || 'העסק שלי',
      industry: parsedBrief.businessType || 'שירותים',
      city: parsedBrief.location || 'ישראל',
      offer: parsedBrief.specialOffers || parsedBrief.goals || 'שירות מקצועי',
      tone: parsedBrief.tone || 'professional',
      platforms: parsedBrief.platforms || ['meta', 'google'],
      objective: parsedBrief.goals || 'TRAFFIC',
      language: 'he',
      targetAudience: parsedBrief.targetAudience || '',
      ageRange: parsedBrief.ageRange || '',
      budget: parsedBrief.budget || '',
    };

    // Save to sessionStorage for the Generate page (Generate reads from sessionStorage)
    sessionStorage.setItem('briefData', JSON.stringify(briefData));

    // Also save to localStorage for persistence
    localStorage.setItem('campaignBrief', JSON.stringify(parsedBrief));
    localStorage.setItem('campaignBriefText', messages.filter(m => m.role === 'user').map(m => m.content).join('\n\n'));

    toast.success('מעולה! יוצר את הקמפיינים שלך...');

    // Navigate to generate page
    setTimeout(() => {
      navigate('/generate');
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] max-w-4xl mx-auto">
      <Card className="flex-1 flex flex-col overflow-hidden shadow-2xl border-2 border-purple-100 rounded-2xl">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 sm:p-6 flex items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-14 sm:h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center flex-shrink-0">
            <Bot className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg sm:text-2xl font-bold">סוכן AI חכם</h2>
            <p className="text-white/90 text-sm sm:text-base truncate">ספר לי מה אתה רוצה ואני אעשה את השאר</p>
          </div>
          <Badge className="hidden sm:flex bg-white/20 backdrop-blur-md border-white/30 text-sm px-3 py-1.5">
            <Sparkles className="w-4 h-4 mr-1.5 inline animate-pulse" />
            פעיל
          </Badge>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-4 sm:space-y-6 bg-gradient-to-br from-gray-50 to-blue-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-2 sm:gap-3 max-w-[90%] sm:max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                {/* Avatar */}
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === 'user'
                      ? 'bg-gradient-to-br from-purple-500 to-blue-500'
                      : 'bg-gradient-to-br from-blue-500 to-cyan-500'
                  }`}
                >
                  {message.role === 'user' ? (
                    <User className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  )}
                </div>

                {/* Message Bubble */}
                <div
                  className={`rounded-2xl p-3 sm:p-5 shadow-md ${
                    message.role === 'user'
                      ? 'bg-gradient-to-br from-purple-600 to-blue-600 text-white'
                      : 'bg-white border-2 border-purple-100'
                  }`}
                >
                  <p className={`text-sm sm:text-lg whitespace-pre-wrap leading-relaxed ${
                    message.role === 'user' ? 'text-white' : 'text-gray-800'
                  }`}>
                    {message.content.split('**').map((part, i) =>
                      i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isProcessing && (
            <div className="flex justify-start">
              <div className="flex gap-3 max-w-[80%]">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-blue-500 to-cyan-500">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div className="bg-white border-2 border-purple-100 rounded-2xl p-5 shadow-md">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 sm:p-6 bg-white border-t-2 border-purple-100">
          {parsedBrief && Object.keys(parsedBrief).length > 2 && (
            <div className="mb-3 sm:mb-4">
              <Button
                onClick={handleCreateCampaign}
                size="lg"
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-base sm:text-xl py-5 sm:py-7 rounded-xl shadow-xl hover:scale-[1.02] transition-all gap-2"
              >
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                צור קמפיין עכשיו
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>
          )}

          <div className="flex gap-2 sm:gap-3">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="ספר לי על העסק שלך... (לחץ Enter לשליחה)"
              className="flex-1 resize-none text-sm sm:text-lg border-2 border-purple-200 focus:border-purple-400 rounded-xl p-3 sm:p-4"
              rows={2}
              disabled={isProcessing}
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isProcessing}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 sm:px-8 rounded-xl"
            >
              {isProcessing ? (
                <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" />
              ) : (
                <Send className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </Button>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-2 sm:mt-3 text-center">
            <Lightbulb className="w-3 h-3 sm:w-4 sm:h-4 inline ml-1" />
            טיפ: ספר לי הכל בצורה חופשית - אני אבין ואסדר את זה לקמפיין מנצח!
          </p>
        </div>
      </Card>
    </div>
  );
}

