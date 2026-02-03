/**
 * useAgent Hook
 * React hook for interacting with AI agents with built-in state management
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { agentService } from '@/lib/agents/agent-service';
import { handleAgentError, normalizeError } from '@/lib/agents/agent-errors';
import type {
  AIAgent,
  AgentWithPrompt,
  ChatMessage,
  AgentChatMessage,
  AgentStreamChunk,
  AgentRunResponse,
} from '@/lib/agents/types';
import type { z } from 'zod';

// ============================================================
// TYPES
// ============================================================

export interface UseAgentState {
  agent: AgentWithPrompt | null;
  messages: AgentChatMessage[];
  isLoading: boolean;
  isStreaming: boolean;
  error: Error | null;
  sessionId: string;
}

export interface UseAgentActions {
  sendMessage: (content: string) => Promise<void>;
  sendMessageWithSchema: <T>(content: string, schema: z.ZodSchema<T>) => Promise<T | null>;
  clearMessages: () => void;
  clearError: () => void;
  resetSession: () => void;
}

export interface UseAgentOptions {
  onMessageComplete?: (message: AgentChatMessage) => void;
  onError?: (error: Error) => void;
  enableMemory?: boolean;
  maxHistoryMessages?: number;
}

export interface UseAgentReturn extends UseAgentState, UseAgentActions {
  canSend: boolean;
}

// ============================================================
// HOOK: useAgent
// ============================================================

export function useAgent(
  agentIdOrSlug: string,
  options: UseAgentOptions = {}
): UseAgentReturn {
  const {
    onMessageComplete,
    onError,
    enableMemory = false,
    maxHistoryMessages = 20,
  } = options;

  // State
  const [agent, setAgent] = useState<AgentWithPrompt | null>(null);
  const [messages, setMessages] = useState<AgentChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [sessionId] = useState(() => agentService.generateSessionId());

  // Refs for cleanup
  const abortControllerRef = useRef<AbortController | null>(null);

  // Load agent on mount
  useEffect(() => {
    let mounted = true;

    async function loadAgent() {
      try {
        setIsLoading(true);
        const loadedAgent = await agentService.getAgent(agentIdOrSlug);
        if (mounted) {
          setAgent(loadedAgent);

          // Load memory if enabled
          if (enableMemory) {
            const memory = await agentService.getMemory(loadedAgent.id, sessionId, maxHistoryMessages);
            const historyMessages: AgentChatMessage[] = memory.map((m) => ({
              id: m.id,
              role: m.role as 'user' | 'assistant',
              content: m.content,
              timestamp: new Date(m.created_at),
              agentId: loadedAgent.id,
            }));
            setMessages(historyMessages);
          }
        }
      } catch (err) {
        if (mounted) {
          const agentError = normalizeError(err);
          setError(agentError);
          onError?.(agentError);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    loadAgent();

    return () => {
      mounted = false;
      abortControllerRef.current?.abort();
    };
  }, [agentIdOrSlug, enableMemory, maxHistoryMessages, sessionId, onError]);

  // Send message action
  const sendMessage = useCallback(
    async (content: string) => {
      if (!agent || isStreaming || !content.trim()) return;

      // Abort any previous request
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();

      const userMessage: AgentChatMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: content.trim(),
        timestamp: new Date(),
        agentId: agent.id,
      };

      // Add user message immediately
      setMessages((prev) => [...prev, userMessage]);
      setError(null);
      setIsStreaming(true);

      // Create placeholder for assistant message
      const assistantMessageId = `assistant-${Date.now()}`;
      const assistantMessage: AgentChatMessage = {
        id: assistantMessageId,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
        agentId: agent.id,
        isStreaming: true,
      };
      setMessages((prev) => [...prev, assistantMessage]);

      try {
        // Build messages from history (limit to recent messages for context window)
        const historyMessages: ChatMessage[] = messages
          .slice(-maxHistoryMessages)
          .map((m) => ({
            role: m.role,
            content: m.content,
          }));

        // Add current user message
        historyMessages.push({ role: 'user', content: content.trim() });

        await agentService.runAgent(
          {
            agent_id: agent.id,
            messages: historyMessages,
          },
          {
            stream: true,
            signal: abortControllerRef.current.signal,
            sessionId: enableMemory ? sessionId : undefined,
            onChunk: (chunk: AgentStreamChunk) => {
              if (chunk.type === 'content' && chunk.full_content) {
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantMessageId
                      ? { ...m, content: chunk.full_content! }
                      : m
                  )
                );
              } else if (chunk.type === 'done') {
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantMessageId
                      ? { ...m, isStreaming: false }
                      : m
                  )
                );
              }
            },
          }
        );

        // Call completion callback
        const finalMessage = messages.find((m) => m.id === assistantMessageId);
        if (finalMessage) {
          onMessageComplete?.({ ...finalMessage, isStreaming: false });
        }
      } catch (err) {
        // Check if it was an abort
        if (err instanceof DOMException && err.name === 'AbortError') {
          // Remove the empty assistant message on abort
          setMessages((prev) => prev.filter((m) => m.id !== assistantMessageId));
          return;
        }

        const agentError = handleAgentError(err, { agentId: agent.id, sessionId });
        setError(agentError);
        onError?.(agentError);

        // Update assistant message with error
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMessageId
              ? {
                  ...m,
                  content: agentError.message,
                  isStreaming: false,
                }
              : m
          )
        );
      } finally {
        setIsStreaming(false);
      }
    },
    [agent, isStreaming, messages, maxHistoryMessages, enableMemory, sessionId, onMessageComplete, onError]
  );

  // Send message with schema validation
  const sendMessageWithSchema = useCallback(
    async <T,>(content: string, schema: z.ZodSchema<T>): Promise<T | null> => {
      if (!agent || isStreaming || !content.trim()) return null;

      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();

      const userMessage: AgentChatMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: content.trim(),
        timestamp: new Date(),
        agentId: agent.id,
      };

      setMessages((prev) => [...prev, userMessage]);
      setError(null);
      setIsLoading(true);

      try {
        const historyMessages: ChatMessage[] = messages
          .slice(-maxHistoryMessages)
          .map((m) => ({ role: m.role, content: m.content }));
        historyMessages.push({ role: 'user', content: content.trim() });

        const { response, parsed } = await agentService.runAgentWithSchema(
          { agent_id: agent.id, messages: historyMessages },
          schema,
          {
            signal: abortControllerRef.current.signal,
            sessionId: enableMemory ? sessionId : undefined,
          }
        );

        // Add assistant response
        const assistantMessage: AgentChatMessage = {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: response.output,
          timestamp: new Date(),
          agentId: agent.id,
        };
        setMessages((prev) => [...prev, assistantMessage]);
        onMessageComplete?.(assistantMessage);

        return parsed;
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return null;

        const agentError = handleAgentError(err, { agentId: agent.id, sessionId });
        setError(agentError);
        onError?.(agentError);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [agent, isStreaming, messages, maxHistoryMessages, enableMemory, sessionId, onMessageComplete, onError]
  );

  // Clear messages
  const clearMessages = useCallback(() => {
    setMessages([]);
    if (enableMemory && agent) {
      agentService.clearMemory(agent.id, sessionId);
    }
  }, [agent, enableMemory, sessionId]);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Reset session (new conversation)
  const resetSession = useCallback(() => {
    abortControllerRef.current?.abort();
    setMessages([]);
    setError(null);
    setIsStreaming(false);
    setIsLoading(false);
  }, []);

  return {
    // State
    agent,
    messages,
    isLoading,
    isStreaming,
    error,
    sessionId,

    // Computed
    canSend: !!agent && !isStreaming && !isLoading,

    // Actions
    sendMessage,
    sendMessageWithSchema,
    clearMessages,
    clearError,
    resetSession,
  };
}

// ============================================================
// HOOK: useAgents (list all agents)
// ============================================================

export interface UseAgentsReturn {
  agents: AIAgent[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useAgents(): UseAgentsReturn {
  const [agents, setAgents] = useState<AIAgent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchAgents = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await agentService.getAllAgents();
      setAgents(data);
    } catch (err) {
      const agentError = normalizeError(err);
      setError(agentError);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAgents();
  }, [fetchAgents]);

  return {
    agents,
    isLoading,
    error,
    refetch: fetchAgents,
  };
}

// ============================================================
// HOOK: useAgentRateLimiter
// ============================================================

export interface UseRateLimiterReturn {
  isRateLimited: boolean;
  remainingRequests: number;
  resetTime: Date | null;
  checkRateLimit: () => boolean;
  recordRequest: () => void;
}

export function useAgentRateLimiter(
  maxRequests = 10,
  windowMs = 60000
): UseRateLimiterReturn {
  const [requests, setRequests] = useState<number[]>([]);

  // Clean up old requests periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setRequests((prev) => prev.filter((t) => now - t < windowMs));
    }, 5000);

    return () => clearInterval(interval);
  }, [windowMs]);

  const checkRateLimit = useCallback(() => {
    const now = Date.now();
    const recentRequests = requests.filter((t) => now - t < windowMs);
    return recentRequests.length < maxRequests;
  }, [requests, maxRequests, windowMs]);

  const recordRequest = useCallback(() => {
    setRequests((prev) => [...prev, Date.now()]);
  }, []);

  const now = Date.now();
  const recentRequests = requests.filter((t) => now - t < windowMs);
  const isRateLimited = recentRequests.length >= maxRequests;
  const remainingRequests = Math.max(0, maxRequests - recentRequests.length);
  const resetTime = recentRequests.length > 0
    ? new Date(recentRequests[0] + windowMs)
    : null;

  return {
    isRateLimited,
    remainingRequests,
    resetTime,
    checkRateLimit,
    recordRequest,
  };
}
