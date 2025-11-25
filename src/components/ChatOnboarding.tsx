import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import type { Platform } from '@/lib/api';

interface ChatMessage {
  role: 'bot' | 'user';
  content: string;
}

interface ChatData {
  objective?: string;
  platforms?: Platform[];
  industry?: string;
  location?: string;
  offer?: string;
  website?: string;
  tone?: string;
}

export const ChatOnboarding = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'bot', content: t('hero.headline') }
  ]);
  const [chatData, setChatData] = useState<ChatData>({});

  const steps = [
    {
      question: t('brief.objective'),
      options: [
        { value: 'TRAFFIC', label: t('brief.objectiveTraffic'), icon: '🚀' },
        { value: 'LEADS', label: t('brief.objectiveLeads'), icon: '🎯' },
        { value: 'AWARENESS', label: t('brief.objectiveAwareness'), icon: '📢' }
      ]
    },
    {
      question: t('brief.platforms'),
      multiSelect: true,
      options: [
        { value: 'meta', label: 'Meta', icon: '📱' },
        { value: 'google', label: 'Google', icon: '🔍' },
        { value: 'tiktok', label: 'TikTok', icon: '🎵' },
        { value: 'linkedin', label: 'LinkedIn', icon: '💼' },
        { value: 'taboola', label: 'Taboola', icon: '📰' },
        { value: 'outbrain', label: 'Outbrain', icon: '📊' }
      ]
    }
  ];

  const handleChoice = (value: string | string[]) => {
    const currentStep = steps[step];
    
    if (step === 0) {
      setChatData({ ...chatData, objective: value as string });
      setMessages([...messages, 
        { role: 'user', content: (currentStep.options?.find(o => o.value === value)?.label || value) as string }
      ]);
    } else if (step === 1) {
      setChatData({ ...chatData, platforms: value as Platform[] });
      const selectedLabels = (value as string[]).map(v => 
        currentStep.options?.find(o => o.value === v)?.label
      ).join(', ');
      setMessages([...messages, 
        { role: 'user', content: selectedLabels }
      ]);
    }

    if (step < steps.length - 1) {
      setStep(step + 1);
      setTimeout(() => {
        setMessages(prev => [...prev, 
          { role: 'bot', content: steps[step + 1].question }
        ]);
      }, 300);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    sessionStorage.setItem('briefData', JSON.stringify({
      ...chatData,
      brandName: '',
      website: '',
      whatsapp: '',
      industry: '',
      city: '',
      offer: '',
      tone: 'professional',
      languages: ['he'],
      budget: '1000'
    }));
    navigate('/brief');
  };

  const currentStep = steps[step];

  return (
    <Card className="p-6 gradient-card shadow-strong border-primary/20 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center shadow-glow">
          <Sparkles className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h3 className="font-semibold">{t('brief.title')}</h3>
          <p className="text-sm text-muted-foreground">{t('brief.subtitle')}</p>
        </div>
      </div>

      <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`rounded-2xl px-4 py-3 max-w-[80%] ${
                msg.role === 'bot'
                  ? 'bg-muted text-foreground'
                  : 'gradient-primary text-primary-foreground shadow-glow'
              }`}
            >
              <p className="text-sm">{msg.content}</p>
            </div>
          </div>
        ))}
      </div>

      {currentStep && (
        <div className="space-y-3">
          <p className="font-medium text-sm">{currentStep.question}</p>
          
          {currentStep.multiSelect ? (
            <MultiSelectOptions
              options={currentStep.options || []}
              onComplete={handleChoice}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {currentStep.options?.map((option) => (
                <Button
                  key={option.value}
                  variant="outline"
                  onClick={() => handleChoice(option.value)}
                  className="justify-start gap-2 hover:gradient-primary hover:text-primary-foreground transition-all"
                >
                  <span className="text-lg">{option.icon}</span>
                  <span>{option.label}</span>
                </Button>
              ))}
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

const MultiSelectOptions = ({ 
  options, 
  onComplete 
}: { 
  options: Array<{ value: string; label: string; icon: string }>; 
  onComplete: (values: string[]) => void;
}) => {
  const [selected, setSelected] = useState<string[]>([]);
  const { t } = useTranslation();

  const toggleOption = (value: string) => {
    setSelected(prev => 
      prev.includes(value) 
        ? prev.filter(v => v !== value)
        : [...prev, value]
    );
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {options.map((option) => (
          <Button
            key={option.value}
            variant={selected.includes(option.value) ? 'default' : 'outline'}
            onClick={() => toggleOption(option.value)}
            className={`justify-start gap-2 transition-all ${
              selected.includes(option.value) 
                ? 'gradient-primary text-primary-foreground shadow-glow' 
                : ''
            }`}
          >
            <span className="text-lg">{option.icon}</span>
            <span>{option.label}</span>
          </Button>
        ))}
      </div>
      
      <Button
        onClick={() => onComplete(selected)}
        disabled={selected.length === 0}
        className="w-full gradient-primary hover:opacity-90 shadow-glow"
      >
        {t('nav.getStarted')}
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};
