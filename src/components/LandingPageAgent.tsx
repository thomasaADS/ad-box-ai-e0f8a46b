import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Loader2, Sparkles, Image, Wand2, Send, Bot, Building2, Target, Users, Eye, Palette } from 'lucide-react';
import { toast } from 'sonner';

interface Message {
  id: string;
  text: string;
  sender: 'ai' | 'user';
  timestamp: Date;
  options?: string[];
  imagePrompt?: string;
  generatedImage?: string;
}

interface PageData {
  businessName?: string;
  industry?: string;
  targetAudience?: string;
  mainGoal?: string;
  colorScheme?: string;
  style?: string;
  heroImage?: string;
  ctaText?: string;
}

const questions = [
  {
    id: 'businessName',
    question: 'מה שם העסק שלך?',
    type: 'text',
    icon: Building2,
  },
  {
    id: 'industry',
    question: 'באיזה תחום אתה עוסק?',
    type: 'options',
    options: ['טכנולוגיה', 'אופנה', 'מזון ומסעדות', 'בריאות', 'נדל"ן', 'שירותים עסקיים', 'אחר'],
    icon: Target,
  },
  {
    id: 'targetAudience',
    question: 'מי קהל היעד שלך?',
    type: 'text',
    icon: Users,
  },
  {
    id: 'mainGoal',
    question: 'מה המטרה העיקרית של דף הנחיתה?',
    type: 'options',
    options: ['יצירת לידים', 'מכירת מוצר', 'הרשמה לאירוע', 'הורדת אפליקציה', 'הצטרפות לרשימת תפוצה'],
    icon: Eye,
  },
  {
    id: 'style',
    question: 'איזה סטייל עיצובי אתה מעדיף?',
    type: 'options',
    options: ['מודרני ומינימליסטי', 'צעיר וצבעוני', 'מקצועי ועסקי', 'יצירתי ומקורי', 'אלגנטי ומעודן'],
    icon: Palette,
  },
  {
    id: 'colorScheme',
    question: 'איזו פלטת צבעים תרצה?',
    type: 'options',
    options: ['כחול וסגול', 'ירוק וכחול', 'כתום וורוד', 'שחור וזהב', 'כחול כהה ותכלת'],
    icon: Palette,
  },
  {
    id: 'heroImage',
    question: 'בואו ניצור תמונה מדהימה לדף הנחיתה!\n\nתאר לי מה תרצה לראות (או לחץ על אחת מהאפשרויות):',
    type: 'image',
    options: [
      'צוות עובד יחד במשרד מודרני',
      'מוצר טכנולוגי חדשני',
      'אנשים מאושרים משתמשים בשירות',
      'נוף עירוני עם טכנולוגיה',
      'תמונה אבסטרקטית צבעונית'
    ],
    icon: Image,
  }
];

export default function LandingPageAgent({ onComplete }: { onComplete: (data: PageData) => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'שלום! אני הסוכן החכם לבניית דפי נחיתה.\n\nאני כאן כדי לעזור לך ליצור דף נחיתה מושלם שמתאים בדיוק לעסק שלך!\n\nבוא נתחיל?',
      sender: 'ai',
      timestamp: new Date(),
      options: ['בואו נתחיל', 'ספר לי עוד על התהליך']
    }
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const [pageData, setPageData] = useState<PageData>({});
  const [userInput, setUserInput] = useState('');
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new message arrives
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages]);

  const generateAIImage = async (prompt: string): Promise<string> => {
    setIsGeneratingImage(true);
    try {
      // Using Pollinations.ai - FREE AI image generation!
      // No API key needed, just works!
      
      // Translate Hebrew to English for better results
      const englishPrompt = await translateToEnglish(prompt);
      
      // Add variety with random artistic styles and unique details
      const styles = [
        'cinematic lighting, 8k uhd, professional photography',
        'vibrant colors, dynamic composition, award winning',
        'soft natural lighting, ultra detailed, masterpiece',
        'dramatic lighting, sharp focus, highly detailed',
        'studio lighting, commercial photography, pristine',
      ];
      const randomStyle = styles[Math.floor(Math.random() * styles.length)];
      
      // Add random seed for variety
      const seed = Math.floor(Math.random() * 1000000);
      
      // Enhance the prompt for better quality and UNIQUENESS
      const enhancedPrompt = `${englishPrompt}, ${randomStyle}, unique perspective, original composition`;
      
      // Encode the prompt for URL
      const encodedPrompt = encodeURIComponent(enhancedPrompt);
      
      // Pollinations.ai URL with SEED for variety + timestamp
      const timestamp = Date.now();
      const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1200&height=800&seed=${seed}&nologo=true&enhance=true&model=flux&t=${timestamp}`;
      
      console.log('Generating image with prompt:', enhancedPrompt);
      console.log('Using seed:', seed);
      
      // Preload the image to ensure it's generated
      await new Promise<void>((resolve, reject) => {
        const img = document.createElement('img');
        img.onload = () => {
          console.log('Image loaded successfully!');
          resolve();
        };
        img.onerror = () => {
          console.error('Image failed to load');
          reject(new Error('Failed to load image'));
        };
        img.src = imageUrl;
      });
      
      return imageUrl;
    } catch (error) {
      console.error('Error generating image:', error);
      // Fallback to Unsplash with relevant search + timestamp for variety
      const searchQuery = prompt.split(' ').slice(0, 3).join(',');
      const timestamp = Date.now();
      return `https://source.unsplash.com/1200x800/?${searchQuery},business,modern,professional&sig=${timestamp}`;
    } finally {
      setIsGeneratingImage(false);
    }
  };

  // Comprehensive Hebrew-to-English translation for AI image prompts
  const translateToEnglish = async (hebrewText: string): Promise<string> => {
    const hebrewToEnglish: Record<string, string> = {
      // People & Work
      'צוות': 'team', 'עובד': 'working', 'עובדים': 'workers employees', 'יחד': 'together',
      'אנשים': 'people', 'מאושרים': 'happy smiling', 'לקוחות': 'customers clients',
      'גבר': 'man', 'אישה': 'woman', 'ילדים': 'children', 'משפחה': 'family',
      'צעירים': 'young people', 'מקצועי': 'professional', 'מנהל': 'manager',

      // Places
      'משרד': 'office workspace', 'חנות': 'store shop', 'מסעדה': 'restaurant',
      'קפה': 'cafe coffee shop', 'בית': 'home house', 'דירה': 'apartment',
      'חדר': 'room', 'רחוב': 'street', 'עיר': 'city', 'טבע': 'nature',
      'ים': 'sea ocean beach', 'גן': 'garden park', 'מלון': 'hotel',

      // Style & Design
      'מודרני': 'modern contemporary', 'חדשני': 'innovative futuristic', 'קלאסי': 'classic elegant',
      'צבעוני': 'colorful vibrant', 'אבסטרקטי': 'abstract artistic', 'מינימליסטי': 'minimalist clean',
      'יוקרתי': 'luxury premium', 'פשוט': 'simple clean', 'אלגנטי': 'elegant sophisticated',
      'חם': 'warm cozy', 'קר': 'cool blue tones', 'בהיר': 'bright light',
      'כהה': 'dark moody',

      // Technology
      'מחשב': 'computer', 'מחשבים': 'computers technology', 'טכנולוגי': 'technology digital',
      'טלפון': 'smartphone phone', 'אפליקציה': 'mobile app', 'אינטרנט': 'internet digital',
      'דיגיטלי': 'digital', 'סטארטאפ': 'startup tech',

      // Business
      'עסק': 'business', 'חברה': 'company corporate', 'מותג': 'brand',
      'מוצר': 'product', 'שירות': 'service', 'פגישה': 'meeting conference',
      'מצגת': 'presentation', 'גרף': 'chart graph analytics', 'הצלחה': 'success growth',
      'כסף': 'money finance', 'השקעה': 'investment', 'צמיחה': 'growth',

      // Industry
      'שרברבות': 'plumbing tools pipes', 'חשמלאות': 'electrician wiring',
      'מספרה': 'hair salon beauty', 'רפואה': 'medical healthcare',
      'בריאות': 'health wellness', 'אוכל': 'food culinary', 'מזון': 'food gourmet',
      'אופנה': 'fashion style', 'יופי': 'beauty cosmetics', 'כושר': 'fitness gym',
      'ספורט': 'sports athletic', 'חינוך': 'education learning', 'נדלן': 'real estate property',
      'רכב': 'car automotive', 'ביטוח': 'insurance security', 'משפט': 'legal law',
      'עיצוב': 'design creative', 'צילום': 'photography camera', 'מוזיקה': 'music',
      'תיירות': 'travel tourism', 'ניקיון': 'cleaning', 'גינון': 'garden landscaping',
      'חיות': 'pets animals', 'שיפוצים': 'renovation construction', 'בנייה': 'construction building',

      // Nature & Objects
      'נוף': 'landscape scenery', 'עירוני': 'urban cityscape', 'שמיים': 'sky clouds',
      'פרחים': 'flowers floral', 'עצים': 'trees forest', 'הרים': 'mountains',
      'שולחן': 'table desk', 'כיסא': 'chair', 'ספה': 'sofa couch',
      'חלון': 'window', 'דלת': 'door', 'גדול': 'large spacious', 'קטן': 'small cozy',

      // Actions
      'עובדת': 'working', 'יושב': 'sitting', 'עומד': 'standing',
      'מדבר': 'talking speaking', 'חושב': 'thinking', 'לומד': 'learning studying',
      'מבשל': 'cooking', 'רץ': 'running', 'רוקד': 'dancing',
      'משחק': 'playing', 'קונה': 'shopping buying',

      // Descriptors
      'יפה': 'beautiful', 'חדש': 'new', 'ישן': 'old vintage', 'גדולים': 'large big',
      'מיוחד': 'special unique', 'מושלם': 'perfect', 'נקי': 'clean pristine',
      'מסודר': 'organized tidy', 'תמונה': 'image photo',
    };

    let englishPrompt = hebrewText;

    // Replace Hebrew keywords with English - sort by length (longest first) to avoid partial matches
    const sortedEntries = Object.entries(hebrewToEnglish).sort(([a], [b]) => b.length - a.length);
    for (const [hebrew, english] of sortedEntries) {
      englishPrompt = englishPrompt.replace(new RegExp(hebrew, 'g'), english);
    }

    // If still has Hebrew characters, create a context-aware fallback based on pageData
    if (/[\u0590-\u05FF]/.test(englishPrompt)) {
      const industry = pageData.industry || '';
      const businessName = pageData.businessName || '';
      // Try to translate industry
      let industryEn = 'business';
      for (const [heb, eng] of sortedEntries) {
        if (industry.includes(heb)) { industryEn = eng; break; }
      }
      return `professional ${industryEn} scene, modern workspace, happy people, high quality commercial photography`;
    }

    return englishPrompt;
  };

  const addMessage = (text: string, sender: 'ai' | 'user', options?: string[], imagePrompt?: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
      options,
      imagePrompt,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleOptionClick = async (option: string) => {
    if (currentQuestionIndex === -1) {
      // First interaction
      addMessage(option, 'user');
      if (option.includes('ספר לי עוד')) {
        addMessage(
          'התהליך פשוט ומהיר!\n\nאני אשאל אותך כמה שאלות על העסק שלך, נבחר ביחד עיצוב וצבעים, ניצור תמונה מושלמת עם AI, ובסוף תקבל דף נחיתה מוכן לשימוש!\n\nכל התהליך לוקח בערך 2-3 דקות. מוכן להתחיל?',
          'ai',
          ['בואו נתחיל']
        );
      } else {
        proceedToNextQuestion();
      }
    } else {
      // Regular question response
      const currentQuestion = questions[currentQuestionIndex];
      addMessage(option, 'user');

      if (currentQuestion.id === 'heroImage') {
        // Generate AI image
        toast.info('יוצר תמונה...');
        const imageUrl = await generateAIImage(option);
        
        setPageData((prev) => ({ ...prev, [currentQuestion.id]: imageUrl }));
        
        const imageMessage: Message = {
          id: Date.now().toString(),
          text: 'הנה התמונה שיצרתי בשבילך!\n\nמה דעתך?',
          sender: 'ai',
          timestamp: new Date(),
          generatedImage: imageUrl,
          options: ['מושלם', 'צור תמונה אחרת']
        };
        setMessages((prev) => [...prev, imageMessage]);
      } else {
        setPageData((prev) => ({ ...prev, [currentQuestion.id]: option }));
        proceedToNextQuestion();
      }
    }
  };

  const handleTextSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!userInput.trim()) return;

    const currentQuestion = questions[currentQuestionIndex];
    addMessage(userInput, 'user');

    if (currentQuestion.id === 'heroImage') {
      // Generate AI image from custom prompt
      toast.info('יוצר תמונה מהתיאור שלך...');
      const imageUrl = await generateAIImage(userInput);
      
      setPageData((prev) => ({ ...prev, [currentQuestion.id]: imageUrl }));
      
      const imageMessage: Message = {
        id: Date.now().toString(),
        text: 'הנה התמונה שיצרתי לפי התיאור שלך!\n\nמה דעתך?',
        sender: 'ai',
        timestamp: new Date(),
        generatedImage: imageUrl,
        options: ['מושלם', 'צור תמונה אחרת']
      };
      setMessages((prev) => [...prev, imageMessage]);
    } else {
      setPageData((prev) => ({ ...prev, [currentQuestion.id]: userInput }));
      proceedToNextQuestion();
    }

    setUserInput('');
  };

  const proceedToNextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
      const nextQuestion = questions[nextIndex];

      setTimeout(() => {
        addMessage(
          nextQuestion.question,
          'ai',
          nextQuestion.options
        );
      }, 800);
    } else {
      setTimeout(() => {
        addMessage(
          'מעולה! אספתי את כל המידע.\n\nעכשיו אני בונה עבורך דף נחיתה מושלם...',
          'ai'
        );

        setTimeout(() => {
          toast.success('דף הנחיתה מוכן!');
          onComplete(pageData);
        }, 2000);
      }, 800);
    }
  };

  const handleImageRegenerate = async () => {
    const lastUserMessage = messages.filter(m => m.sender === 'user').pop();
    const prompt = lastUserMessage?.text || 'modern business landing page hero image';
    
    toast.info('יוצר תמונה חדשה...');
    const imageUrl = await generateAIImage(prompt);
    
    setPageData((prev) => ({ ...prev, heroImage: imageUrl }));
    
    const imageMessage: Message = {
      id: Date.now().toString(),
      text: 'הנה תמונה חדשה!',
      sender: 'ai',
      timestamp: new Date(),
      generatedImage: imageUrl,
      options: ['מושלם', 'צור תמונה אחרת']
    };
    setMessages((prev) => [...prev, imageMessage]);
  };

  const handleImageApprove = () => {
    addMessage('מושלם, אני אוהב את התמונה!', 'user');
    proceedToNextQuestion();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-6 sm:py-12 px-3 sm:px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <Badge className="mb-3 sm:mb-4 text-sm sm:text-base px-4 sm:px-6 py-1.5 sm:py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white inline-flex items-center gap-2">
            <Wand2 className="w-4 h-4" />
            בונה דפי נחיתה AI
          </Badge>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            בואו ניצור דף נחיתה מושלם ביחד
          </h1>
          <p className="text-gray-600 text-sm sm:text-lg">
            ענה על מספר שאלות פשוטות ותקבל דף נחיתה מקצועי
          </p>
        </div>

        {/* Chat Messages */}
        <Card className="p-3 sm:p-6 mb-4 max-h-[500px] sm:max-h-[600px] overflow-y-auto rounded-2xl">
          <div className="space-y-4 sm:space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[90%] sm:max-w-[80%] ${message.sender === 'user' ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' : 'bg-white border-2 border-purple-200'} rounded-2xl p-3 sm:p-5 shadow-lg`}>
                  {message.sender === 'ai' && (
                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                      <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                      <span className="font-semibold text-purple-600 text-sm sm:text-base">סוכן AI חכם</span>
                    </div>
                  )}

                  <p className={`text-sm sm:text-lg whitespace-pre-line ${message.sender === 'user' ? 'text-white' : 'text-gray-800'}`}>
                    {message.text}
                  </p>

                  {message.generatedImage && (
                    <div className="mt-4">
                      <img
                        src={message.generatedImage}
                        alt="Generated"
                        className="w-full rounded-xl shadow-lg"
                      />
                    </div>
                  )}

                  {/* Options */}
                  {message.options && message.sender === 'ai' && (
                    <div className="mt-3 sm:mt-5 flex flex-wrap gap-2 sm:gap-3">
                      {message.options.map((option, idx) => (
                        <Button
                          key={idx}
                          onClick={() => {
                            if (message.generatedImage) {
                              if (option.includes('מושלם')) {
                                handleImageApprove();
                              } else {
                                handleImageRegenerate();
                              }
                            } else {
                              handleOptionClick(option);
                            }
                          }}
                          disabled={isGeneratingImage}
                          size="sm"
                          className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium shadow-md hover:shadow-lg transition-all text-sm sm:text-base px-3 sm:px-4 py-2 sm:py-2.5"
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isGeneratingImage && (
              <div className="flex justify-start">
                <div className="bg-white border-2 border-purple-200 rounded-2xl p-5 shadow-lg">
                  <div className="flex items-center gap-3">
                    <Loader2 className="w-6 h-6 animate-spin text-purple-600" />
                    <span className="text-lg font-medium text-purple-600">
                      יוצר תמונה מדהימה עם AI...
                    </span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Invisible element for auto-scroll */}
            <div ref={messagesEndRef} />
          </div>
        </Card>

        {/* Input Area - show for text AND image type questions */}
        {currentQuestionIndex >= 0 &&
         (questions[currentQuestionIndex]?.type === 'text' || questions[currentQuestionIndex]?.type === 'image') && (
          <Card className="p-4">
            <form onSubmit={handleTextSubmit} className="flex gap-3">
              {questions[currentQuestionIndex]?.type === 'image' ? (
                <Textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="תאר את התמונה שתרצה... (לדוגמה: 'צוות צעיר עובד על מחשבים במשרד מודרני עם חלונות גדולים')"
                  className="flex-1 text-lg resize-none"
                  rows={3}
                  disabled={isGeneratingImage}
                />
              ) : (
                <Input
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="הקלד את התשובה שלך..."
                  className="flex-1 text-lg"
                  disabled={isGeneratingImage}
                />
              )}
              <Button
                type="submit"
                size="lg"
                disabled={isGeneratingImage || !userInput.trim()}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                {questions[currentQuestionIndex]?.type === 'image' ? (
                  <Image className="w-5 h-5" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </Button>
            </form>
          </Card>
        )}
      </div>
    </div>
  );
}
