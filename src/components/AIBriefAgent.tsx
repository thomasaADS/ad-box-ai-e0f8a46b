import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Loader2, Send, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  type: 'agent' | 'user';
  content: string;
  options?: string[];
  isTyping?: boolean;
}

interface BriefData {
  brandName?: string;
  industry?: string;
  city?: string;
  offer?: string;
  tone?: string;
  platforms?: string[];
  objective?: string;
  budget?: string;
  targetAudience?: string;
  website?: string;
  whatsapp?: string;
}

interface AIBriefAgentProps {
  onComplete: (data: BriefData) => void;
}

const QUESTIONS = [
  {
    id: 'welcome',
    question: 'היי! 👋 אני הסוכן החכם של Boosti. אני כאן לעזור לך ליצור קמפיין פרסומי מושלם!\n\nבואו נתחיל - מה שם העסק או המותג שלך?',
    field: 'brandName',
    skipOptions: false,
  },
  {
    id: 'industry',
    question: 'מעולה! עכשיו ספר לי - במה העסק שלך עוסק? 🎯',
    field: 'industry',
    options: ['קוסמטיקאית', 'שרברב', 'מסעדה', 'מעצב שיער', 'רואה חשבון', 'עורך דין', 'נדל"ן', 'אחר'],
    skipOptions: true,
  },
  {
    id: 'city',
    question: 'באיזה עיר או אזור אתה פועל? 📍',
    field: 'city',
    skipOptions: false,
  },
  {
    id: 'offer',
    question: 'נהדר! יש לך מבצע מיוחד או יתרון תחרותי שתרצה להדגיש? 🎁\n\nלדוגמה: "טיפול ראשון ב-20% הנחה" או "ייעוץ ראשוני חינם"',
    field: 'offer',
    skipOptions: false,
  },
  {
    id: 'objective',
    question: 'מה המטרה העיקרית של הקמפיין? 🎯',
    field: 'objective',
    options: [
      { label: 'הגברת תנועה לאתר 🌐', value: 'TRAFFIC' },
      { label: 'יצירת לידים 📝', value: 'LEADS' },
      { label: 'המרות ומכירות 💰', value: 'CONVERSIONS' },
      { label: 'חשיפה ומודעות למותג ✨', value: 'REACH' },
    ],
    skipOptions: false,
  },
  {
    id: 'platforms',
    question: 'באילו פלטפורמות תרצה לפרסם? (ניתן לבחור מספר)',
    field: 'platforms',
    multiSelect: true,
    options: [
      { label: 'Meta (פייסבוק/אינסטגרם) 📱', value: 'meta' },
      { label: 'Google Ads 🔍', value: 'google' },
      { label: 'TikTok 🎵', value: 'tiktok' },
      { label: 'LinkedIn 💼', value: 'linkedin' },
      { label: 'Taboola 📰', value: 'taboola' },
      { label: 'Outbrain 📊', value: 'outbrain' },
    ],
    skipOptions: false,
  },
  {
    id: 'tone',
    question: 'איזה טון תרצה שהמודעות שלך יעבירו? 🎨',
    field: 'tone',
    options: [
      { label: 'מקצועי ועניינ��', value: 'professional' },
      { label: 'ידידותי וחם', value: 'friendly' },
      { label: 'צעיר וסלנג', value: 'casual' },
      { label: 'יוקרתי ואקסלוסיבי', value: 'luxury' },
    ],
    skipOptions: false,
  },
  {
    id: 'budget',
    question: 'מה התקציב היומי שלך? (בשקלים) 💰',
    field: 'budget',
    options: ['100-300 ₪', '300-500 ₪', '500-1000 ₪', '1000+ ₪'],
    skipOptions: true,
  },
  {
    id: 'website',
    question: 'יש לך אתר או קישור לוואטסאפ? (אופציונלי) 🌐',
    field: 'website',
    skipOptions: true,
    optional: true,
  },
];

export function AIBriefAgent({ onComplete }: AIBriefAgentProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [briefData, setBriefData] = useState<BriefData>({});
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100;

  useEffect(() => {
    // Show first question with typing effect
    setTimeout(() => {
      askQuestion(0);
    }, 500);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const askQuestion = (index: number) => {
    if (index >= QUESTIONS.length) {
      // All questions answered
      setIsTyping(true);
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            id: Date.now().toString(),
            type: 'agent',
            content: '✨ מעולה! יש לי את כל המידע שאני צריך.\n\nעכשיו אני יוצר עבורך קמפיין מקצועי וקריאטיבי עם מספר וריאציות למודעות.\n\nזה ייקח כמה שניות... 🚀',
          },
        ]);
        setIsTyping(false);
        
        setTimeout(() => {
          onComplete(briefData);
        }, 2000);
      }, 1000);
      return;
    }

    const question = QUESTIONS[index];
    setIsTyping(true);

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          type: 'agent',
          content: question.question,
          options: question.options?.map(opt => 
            typeof opt === 'string' ? opt : opt.label
          ),
        },
      ]);
      setIsTyping(false);
    }, 800);
  };

  const handleAnswer = (answer: string, isOption: boolean = false) => {
    const question = QUESTIONS[currentQuestion];
    
    // Add user message
    setMessages(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        type: 'user',
        content: answer,
      },
    ]);

    // Update brief data
    const value = isOption && question.options
      ? question.options.find(opt => 
          typeof opt === 'string' ? opt === answer : opt.label === answer
        )
      : answer;

    const actualValue = typeof value === 'object' && value !== null ? value.value : value;

    if (question.multiSelect && question.field === 'platforms') {
      // Handle multi-select for platforms
      setBriefData(prev => ({
        ...prev,
        [question.field]: selectedPlatforms,
      }));
    } else {
      setBriefData(prev => ({
        ...prev,
        [question.field]: actualValue,
      }));
    }

    setInput('');
    
    // Move to next question
    setTimeout(() => {
      setCurrentQuestion(prev => prev + 1);
      askQuestion(currentQuestion + 1);
    }, 500);
  };

  const handleOptionClick = (option: string) => {
    const question = QUESTIONS[currentQuestion];
    
    if (question.multiSelect && question.field === 'platforms') {
      // For multi-select, toggle selection
      const optValue = question.options?.find(opt => 
        typeof opt === 'object' && opt.label === option
      )?.value || option;
      
      setSelectedPlatforms(prev => {
        if (prev.includes(optValue)) {
          return prev.filter(p => p !== optValue);
        }
        return [...prev, optValue];
      });
    } else {
      handleAnswer(option, true);
    }
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;
    handleAnswer(input);
  };

  const handleMultiSelectDone = () => {
    if (selectedPlatforms.length === 0) {
      return;
    }
    handleAnswer(selectedPlatforms.join(', '), false);
  };

  const currentQuestionData = QUESTIONS[currentQuestion];
  const isMultiSelectQuestion = currentQuestionData?.multiSelect;

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">התקדמות</span>
          <span className="text-sm text-muted-foreground">
            {currentQuestion + 1} / {QUESTIONS.length}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Messages Container */}
      <Card className="flex-1 p-6 overflow-y-auto mb-4 bg-gradient-to-b from-background to-muted/20">
        <div className="space-y-4">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.type === 'user'
                      ? 'bg-primary text-primary-foreground ml-auto'
                      : 'bg-card border border-border'
                  }`}
                >
                  {message.type === 'agent' && (
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-primary" />
                      <span className="text-xs font-semibold text-primary">
                        Boosti AI
                      </span>
                    </div>
                  )}
                  <p className="whitespace-pre-line text-sm">{message.content}</p>
                  
                  {/* Options */}
                  {message.options && index === messages.length - 1 && (
                    <div className="mt-4 space-y-2">
                      {message.options.map((option, i) => {
                        const isSelected = isMultiSelectQuestion && 
                          selectedPlatforms.includes(
                            currentQuestionData.options?.find(opt => 
                              typeof opt === 'object' && opt.label === option
                            )?.value || option
                          );

                        return (
                          <Button
                            key={i}
                            variant={isSelected ? 'default' : 'outline'}
                            className="w-full justify-start text-right hover:scale-105 transition-transform"
                            onClick={() => handleOptionClick(option)}
                          >
                            {isSelected && <CheckCircle2 className="w-4 h-4 ml-2" />}
                            {option}
                          </Button>
                        );
                      })}
                      
                      {isMultiSelectQuestion && selectedPlatforms.length > 0 && (
                        <Button
                          className="w-full mt-4"
                          onClick={handleMultiSelectDone}
                        >
                          המשך עם {selectedPlatforms.length} פלטפורמות
                          <ArrowRight className="w-4 h-4 mr-2" />
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-card border border-border rounded-2xl px-4 py-3">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  <span className="text-sm text-muted-foreground">
                    Boosti AI מקליד...
                  </span>
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </Card>

      {/* Input Area */}
      {currentQuestion < QUESTIONS.length && 
       !isMultiSelectQuestion && 
       !QUESTIONS[currentQuestion]?.options?.length && (
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="הקלד את התשובה שלך..."
            className="flex-1"
            disabled={isTyping}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!input.trim() || isTyping}
            size="icon"
            className="shrink-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}


