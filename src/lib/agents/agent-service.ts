/**
 * Agent Service
 * Centralized service for running AI agents with consistent behavior
 * NOTE: Uses mock data since agent tables don't exist in the database yet.
 */

export { AgentServiceError } from './agent-errors';
import type {
  AIAgent,
  AgentWithPrompt,
  ChatMessage,
  AgentRunRequest,
  AgentRunResponse,
  AgentStreamChunk,
  RunAgentOptions,
  AgentMemory,
} from './types';
import {
  AgentServiceError,
  parseApiError,
  normalizeError,
  withRetry,
  logAgentError,
} from './agent-errors';
import {
  AgentRunRequestSchema,
  parseAIJsonOutput,
  validateAgentOutput,
} from './schemas';
import type { z } from 'zod';

// ============================================================
// CONFIGURATION
// ============================================================

const CHAT_ENDPOINT = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;
const API_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// ============================================================
// MOCK AGENTS DATA
// ============================================================

const mockAgents: AgentWithPrompt[] = [
  {
    id: 'mock-maya',
    slug: 'maya',
    name: 'מאיה',
    name_en: 'Maya',
    nickname: 'מלכת החיפוש',
    description: 'מומחית SEO',
    role: 'seo',
    personality: 'מקצועית וממוקדת',
    avatar_id: null,
    gradient_from: '#059669',
    gradient_to: '#10b981',
    icon: 'Search',
    specialties: ['SEO', 'מחקר מילות מפתח'],
    sample_questions: ['איך לשפר SEO?'],
    status: 'active',
    is_public: true,
    requires_auth: false,
    max_tokens: 2048,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    created_by: null,
    prompt_id: null,
    prompt_version: null,
    system_prompt: 'אתה מומחה SEO.',
    model: 'gemini-pro',
    temperature: 0.7,
    output_schema: null,
  },
];

// ============================================================
// AGENT SERVICE CLASS
// ============================================================

class AgentService {
  private agentCache: Map<string, AgentWithPrompt> = new Map();
  private cacheExpiry: Map<string, number> = new Map();
  private readonly CACHE_TTL_MS = 5 * 60 * 1000;

  // ============================================================
  // AGENT FETCHING (MOCK)
  // ============================================================

  async getAgent(idOrSlug: string): Promise<AgentWithPrompt> {
    const cached = this.getCachedAgent(idOrSlug);
    if (cached) return cached;

    const agent = mockAgents.find(a => a.id === idOrSlug || a.slug === idOrSlug);
    if (!agent) {
      throw new AgentServiceError('AGENT_NOT_FOUND', `Agent not found: ${idOrSlug}`);
    }

    this.setCachedAgent(agent.id, agent);
    this.setCachedAgent(agent.slug, agent);
    return agent;
  }

  async getAllAgents(): Promise<AIAgent[]> {
    return mockAgents.filter(a => a.status === 'active' && a.is_public);
  }

  // ============================================================
  // RUNNING AGENTS
  // ============================================================

  async runAgent(
    request: AgentRunRequest,
    options: RunAgentOptions = {}
  ): Promise<AgentRunResponse> {
    const startTime = Date.now();

    const validatedRequest = validateAgentOutput(AgentRunRequestSchema, request, 'agent request');

    const agentIdOrSlug = validatedRequest.agent_id || validatedRequest.agent_slug!;
    const agent = await this.getAgent(agentIdOrSlug);

    if (!agent.system_prompt) {
      throw new AgentServiceError('PROMPT_NOT_FOUND', `No active prompt for agent: ${agent.slug}`);
    }

    const runId = crypto.randomUUID();
    const messages = validatedRequest.messages as ChatMessage[];

    try {
      let output: string;

      if (options.stream && options.onChunk) {
        output = await this.streamAgentChat(agent, messages, options.onChunk, options.signal);
      } else {
        output = await this.callAgentChat(agent, messages, options.signal);
      }

      const latencyMs = Date.now() - startTime;

      return {
        run_id: runId,
        agent_id: agent.id,
        output,
        tokens_used: null,
        latency_ms: latencyMs,
      };
    } catch (error) {
      throw normalizeError(error);
    }
  }

  async runAgentWithSchema<T>(
    request: AgentRunRequest,
    schema: z.ZodSchema<T>,
    options: RunAgentOptions = {}
  ): Promise<{ response: AgentRunResponse; parsed: T }> {
    const response = await this.runAgent(request, options);
    const parsed = parseAIJsonOutput(response.output, schema);
    return { response, parsed };
  }

  // ============================================================
  // CHAT EXECUTION
  // ============================================================

  private async callAgentChat(
    agent: AgentWithPrompt,
    messages: ChatMessage[],
    signal?: AbortSignal
  ): Promise<string> {
    const systemMessage: ChatMessage = {
      role: 'system',
      content: agent.system_prompt!,
    };

    const response = await withRetry(async () => {
      const resp = await fetch(CHAT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          messages: [systemMessage, ...messages],
          stream: false,
        }),
        signal,
      });

      if (!resp.ok) {
        throw await parseApiError(resp);
      }

      return resp;
    });

    const data = await response.json();
    return data.choices?.[0]?.message?.content || '';
  }

  private async streamAgentChat(
    agent: AgentWithPrompt,
    messages: ChatMessage[],
    onChunk: (chunk: AgentStreamChunk) => void,
    signal?: AbortSignal
  ): Promise<string> {
    const systemMessage: ChatMessage = {
      role: 'system',
      content: agent.system_prompt!,
    };

    const response = await fetch(CHAT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        messages: [systemMessage, ...messages],
        stream: true,
      }),
      signal,
    });

    if (!response.ok) {
      throw await parseApiError(response);
    }

    if (!response.body) {
      throw new AgentServiceError('AI_GATEWAY_ERROR', 'No response body');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = '';
    let fullContent = '';

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') {
            onChunk({ type: 'done', full_content: fullContent });
            return fullContent;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              fullContent += content;
              onChunk({
                type: 'content',
                content,
                full_content: fullContent,
              });
            }
          } catch {
            textBuffer = line + '\n' + textBuffer;
            break;
          }
        }
      }
    } finally {
      reader.releaseLock();
    }

    onChunk({ type: 'done', full_content: fullContent });
    return fullContent;
  }

  // ============================================================
  // MEMORY MANAGEMENT (MOCK - in-memory only)
  // ============================================================

  private memoryStore: Map<string, AgentMemory[]> = new Map();

  async getMemory(agentId: string, sessionId: string, limit = 20): Promise<AgentMemory[]> {
    const key = `${agentId}:${sessionId}`;
    const memories = this.memoryStore.get(key) || [];
    return memories.slice(-limit);
  }

  async clearMemory(agentId: string, sessionId: string): Promise<void> {
    const key = `${agentId}:${sessionId}`;
    this.memoryStore.delete(key);
  }

  // ============================================================
  // CACHING
  // ============================================================

  private getCachedAgent(key: string): AgentWithPrompt | null {
    const expiry = this.cacheExpiry.get(key);
    if (expiry && expiry > Date.now()) {
      return this.agentCache.get(key) || null;
    }
    this.agentCache.delete(key);
    this.cacheExpiry.delete(key);
    return null;
  }

  private setCachedAgent(key: string, agent: AgentWithPrompt): void {
    this.agentCache.set(key, agent);
    this.cacheExpiry.set(key, Date.now() + this.CACHE_TTL_MS);
  }

  clearCache(): void {
    this.agentCache.clear();
    this.cacheExpiry.clear();
  }

  // ============================================================
  // UTILITY METHODS
  // ============================================================

  generateSessionId(): string {
    return crypto.randomUUID();
  }
}

// ============================================================
// SINGLETON EXPORT
// ============================================================

export const agentService = new AgentService();
export default agentService;
