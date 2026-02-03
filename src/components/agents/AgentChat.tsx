/**
 * AgentChat Component
 * Reusable chat interface for interacting with AI agents
 * Features: streaming responses, rate limiting, loading states
 */

import { useState, useRef, useEffect } from 'react';
import { useAgent, useAgentRateLimiter } from '@/hooks/useAgent';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Send,
  Loader2,
  Bot,
  User,
  X,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { AgentChatMessage, AgentWithPrompt } from '@/lib/agents/types';

// ============================================================
// TYPES
// ============================================================

export interface AgentChatProps {
  agentIdOrSlug: string;
  onClose?: () => void;
  className?: string;
  showHeader?: boolean;
  placeholder?: string;
  welcomeMessage?: string;
  maxMessagesDisplay?: number;
  enableMemory?: boolean;
}

// ============================================================
// SUB-COMPONENTS
// ============================================================

interface ChatHeaderProps {
  agent: AgentWithPrompt;
  onClose?: () => void;
}

function ChatHeader({ agent, onClose }: ChatHeaderProps) {
  return (
    <div
      className="flex items-center justify-between px-4 py-3 border-b border-white/10"
      style={{
        background: `linear-gradient(135deg, ${agent.gradient_from}, ${agent.gradient_to})`,
      }}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
          <Bot className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="font-bold text-white text-sm flex items-center gap-2">
            {agent.name}
            {agent.nickname && (
              <span className="text-xs font-normal text-white/70">
                ({agent.nickname})
              </span>
            )}
          </div>
          <div className="text-xs text-white/70 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            {agent.role}
          </div>
        </div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4 text-white" />
        </button>
      )}
    </div>
  );
}

interface MessageBubbleProps {
  message: AgentChatMessage;
  agent: AgentWithPrompt;
}

function MessageBubble({ message, agent }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div className={cn('flex gap-3', isUser ? 'flex-row-reverse' : '')}>
      {/* Avatar */}
      <div
        className={cn(
          'w-8 h-8 rounded-lg flex items-center justify-center shrink-0',
          isUser
            ? 'bg-primary text-primary-foreground'
            : ''
        )}
        style={
          !isUser
            ? { background: `linear-gradient(135deg, ${agent.gradient_from}, ${agent.gradient_to})` }
            : undefined
        }
      >
        {isUser ? (
          <User className="w-4 h-4" />
        ) : (
          <Bot className="w-4 h-4 text-white" />
        )}
      </div>

      {/* Message */}
      <div
        className={cn(
          'max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
          isUser
            ? 'bg-primary text-primary-foreground rounded-br-md'
            : 'bg-card border border-border/50 rounded-bl-md shadow-sm'
        )}
      >
        <div className="whitespace-pre-wrap">{message.content}</div>
        {message.content && (
          <div
            className={cn(
              'text-[10px] mt-1.5',
              isUser ? 'text-primary-foreground/50' : 'text-muted-foreground/60'
            )}
          >
            {message.timestamp.toLocaleTimeString('he-IL', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        )}

        {/* Streaming indicator */}
        {message.isStreaming && (
          <div className="flex items-center gap-1 mt-2">
            <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        )}
      </div>
    </div>
  );
}

interface SampleQuestionsProps {
  questions: string[];
  onSelect: (question: string) => void;
}

function SampleQuestions({ questions, onSelect }: SampleQuestionsProps) {
  return (
    <div className="pt-4">
      <p className="text-xs text-muted-foreground mb-3">שאלות לדוגמה:</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {questions.slice(0, 4).map((q, i) => (
          <button
            key={i}
            onClick={() => onSelect(q)}
            className="text-right text-sm p-3 rounded-xl border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all text-muted-foreground hover:text-foreground"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export function AgentChat({
  agentIdOrSlug,
  onClose,
  className,
  showHeader = true,
  placeholder,
  welcomeMessage,
  maxMessagesDisplay = 50,
  enableMemory = false,
}: AgentChatProps) {
  const [inputText, setInputText] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Use the agent hook
  const {
    agent,
    messages,
    isLoading,
    isStreaming,
    error,
    canSend,
    sendMessage,
    clearError,
    resetSession,
  } = useAgent(agentIdOrSlug, {
    enableMemory,
    maxHistoryMessages: maxMessagesDisplay,
  });

  // Rate limiter
  const {
    isRateLimited,
    remainingRequests,
    checkRateLimit,
    recordRequest,
  } = useAgentRateLimiter(10, 60000); // 10 requests per minute

  // Scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when agent loads
  useEffect(() => {
    if (agent) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [agent]);

  // Handle send
  const handleSend = async () => {
    if (!inputText.trim() || !canSend || isRateLimited) return;

    if (!checkRateLimit()) {
      return;
    }

    recordRequest();
    const text = inputText.trim();
    setInputText('');
    await sendMessage(text);
  };

  // Loading state
  if (isLoading && !agent) {
    return (
      <Card className={cn('flex items-center justify-center h-96', className)}>
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </Card>
    );
  }

  // Error state (no agent loaded)
  if (!agent) {
    return (
      <Card className={cn('flex flex-col items-center justify-center h-96 p-6', className)}>
        <AlertCircle className="w-12 h-12 text-destructive mb-4" />
        <p className="text-lg font-medium mb-2">לא ניתן לטעון את הסוכן</p>
        <p className="text-sm text-muted-foreground mb-4">
          {error?.message || 'אנא נסה שוב מאוחר יותר'}
        </p>
        <Button onClick={resetSession} variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          נסה שוב
        </Button>
      </Card>
    );
  }

  // Build display messages (with welcome message if needed)
  const displayMessages: AgentChatMessage[] = [...messages];
  if (messages.length === 0 && welcomeMessage) {
    displayMessages.unshift({
      id: 'welcome',
      role: 'assistant',
      content: welcomeMessage || `שלום! אני ${agent.name}, ${agent.role}.\n\n${agent.description}\n\nאיך אוכל לעזור לך היום?`,
      timestamp: new Date(),
      agentId: agent.id,
    });
  }

  const defaultPlaceholder = placeholder || `שאל/י את ${agent.name}...`;

  return (
    <Card className={cn('flex flex-col overflow-hidden', className)}>
      {/* Header */}
      {showHeader && <ChatHeader agent={agent} onClose={onClose} />}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-muted/20 to-background">
        {displayMessages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} agent={agent} />
        ))}

        {/* Typing indicator (when streaming with empty content) */}
        {isStreaming && displayMessages[displayMessages.length - 1]?.content === '' && (
          <div className="flex gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${agent.gradient_from}, ${agent.gradient_to})` }}
            >
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-card border border-border/50 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        {/* Sample questions (show when no messages) */}
        {messages.length === 0 && agent.sample_questions.length > 0 && (
          <SampleQuestions
            questions={agent.sample_questions}
            onSelect={(q) => {
              setInputText(q);
              setTimeout(() => inputRef.current?.focus(), 50);
            }}
          />
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Rate limit warning */}
      {isRateLimited && (
        <div className="px-4 py-2 bg-amber-500/10 border-t border-amber-500/20">
          <p className="text-xs text-amber-700">
            מכסת ההודעות נגמרה. נסה שוב בעוד דקה.
          </p>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-border/50 bg-background">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder={isRateLimited ? 'המתן...' : defaultPlaceholder}
            disabled={isRateLimited || isStreaming}
            className="h-12 text-sm rounded-xl"
          />
          <Button
            onClick={handleSend}
            disabled={!inputText.trim() || !canSend || isRateLimited}
            className="h-12 w-12 rounded-xl shrink-0"
            style={{
              background: `linear-gradient(135deg, ${agent.gradient_from}, ${agent.gradient_to})`,
              color: 'white',
            }}
          >
            {isStreaming ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Remaining requests indicator */}
        {remainingRequests < 5 && !isRateLimited && (
          <p className="text-xs text-muted-foreground mt-2 text-center">
            נותרו {remainingRequests} הודעות בדקה הקרובה
          </p>
        )}
      </div>
    </Card>
  );
}

export default AgentChat;
