/**
 * Agent Service
 * Centralized service for running AI agents with consistent behavior
 */

import { supabase } from '@/integrations/supabase/client';
import type {
  AIAgent,
  AgentWithPrompt,
  ChatMessage,
  AgentRunRequest,
  AgentRunResponse,
  AgentStreamChunk,
  RunAgentOptions,
  AgentMemory,
  AgentRun,
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
const DEFAULT_TIMEOUT_MS = 60000;

// ============================================================
// AGENT SERVICE CLASS
// ============================================================

class AgentService {
  private agentCache: Map<string, AgentWithPrompt> = new Map();
  private cacheExpiry: Map<string, number> = new Map();
  private readonly CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

  // ============================================================
  // AGENT FETCHING
  // ============================================================

  /**
   * Get agent by ID or slug with caching
   */
  async getAgent(idOrSlug: string): Promise<AgentWithPrompt> {
    // Check cache first
    const cached = this.getCachedAgent(idOrSlug);
    if (cached) return cached;

    // Fetch from database
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(idOrSlug);

    const { data, error } = await supabase
      .from('agent_with_prompt')
      .select('*')
      .eq(isUuid ? 'id' : 'slug', idOrSlug)
      .single();

    if (error || !data) {
      throw new AgentServiceError('AGENT_NOT_FOUND', `Agent not found: ${idOrSlug}`);
    }

    // Cache the result
    this.setCachedAgent(data.id, data as AgentWithPrompt);
    if (data.slug) {
      this.setCachedAgent(data.slug, data as AgentWithPrompt);
    }

    return data as AgentWithPrompt;
  }

  /**
   * Get all active agents
   */
  async getAllAgents(): Promise<AIAgent[]> {
    const { data, error } = await supabase
      .from('ai_agents')
      .select('*')
      .eq('status', 'active')
      .eq('is_public', true)
      .order('name');

    if (error) {
      throw new AgentServiceError('UNKNOWN_ERROR', `Failed to fetch agents: ${error.message}`);
    }

    return (data || []) as AIAgent[];
  }

  // ============================================================
  // RUNNING AGENTS
  // ============================================================

  /**
   * Run an agent with given messages
   * Single entry point for all agent executions
   */
  async runAgent(
    request: AgentRunRequest,
    options: RunAgentOptions = {}
  ): Promise<AgentRunResponse> {
    const startTime = Date.now();

    // Validate request
    const validatedRequest = validateAgentOutput(AgentRunRequestSchema, request, 'agent request');

    // Get agent with prompt
    const agentIdOrSlug = validatedRequest.agent_id || validatedRequest.agent_slug!;
    const agent = await this.getAgent(agentIdOrSlug);

    if (!agent.system_prompt) {
      throw new AgentServiceError('PROMPT_NOT_FOUND', `No active prompt for agent: ${agent.slug}`);
    }

    // Create run record
    const runId = await this.createRunRecord(agent, validatedRequest, options.sessionId);

    try {
      let output: string;

      if (options.stream && options.onChunk) {
        // Streaming mode
        output = await this.streamAgentChat(agent, validatedRequest.messages, options.onChunk, options.signal);
      } else {
        // Non-streaming mode
        output = await this.callAgentChat(agent, validatedRequest.messages, options.signal);
      }

      const latencyMs = Date.now() - startTime;

      // Update run record with success
      await this.updateRunRecord(runId, {
        status: 'completed',
        output_raw: output,
        latency_ms: latencyMs,
        completed_at: new Date().toISOString(),
      });

      // Save to memory if session provided
      if (options.sessionId) {
        await this.saveToMemory(agent.id, options.sessionId, validatedRequest.messages, output);
      }

      return {
        run_id: runId,
        agent_id: agent.id,
        output,
        tokens_used: null, // Would need to parse from response
        latency_ms: latencyMs,
      };
    } catch (error) {
      const agentError = normalizeError(error);

      // Update run record with failure
      await this.updateRunRecord(runId, {
        status: 'failed',
        error_message: agentError.message,
        error_code: agentError.code,
        latency_ms: Date.now() - startTime,
        completed_at: new Date().toISOString(),
      });

      throw agentError;
    }
  }

  /**
   * Run agent and parse output with schema validation
   */
  async runAgentWithSchema<T>(
    request: AgentRunRequest,
    schema: z.ZodSchema<T>,
    options: RunAgentOptions = {}
  ): Promise<{ response: AgentRunResponse; parsed: T }> {
    const response = await this.runAgent(request, options);

    const parsed = parseAIJsonOutput(response.output, schema);

    // Update run record with parsed output
    await this.updateRunRecord(response.run_id, {
      output_parsed: parsed as Record<string, unknown>,
    });

    return { response, parsed };
  }

  // ============================================================
  // CHAT EXECUTION
  // ============================================================

  /**
   * Call agent chat endpoint (non-streaming)
   */
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

  /**
   * Stream agent chat response
   */
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

        // Process complete lines
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
            // Incomplete JSON, will be processed next iteration
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
  // RUN LOGGING
  // ============================================================

  /**
   * Create a new run record
   */
  private async createRunRecord(
    agent: AgentWithPrompt,
    request: AgentRunRequest,
    sessionId?: string
  ): Promise<string> {
    const { data: userData } = await supabase.auth.getUser();

    const runData = {
      agent_id: agent.id,
      prompt_version_id: agent.prompt_id,
      user_id: userData?.user?.id || null,
      session_id: sessionId || null,
      input_messages: request.messages,
      input_context: request.context || null,
      status: 'running' as const,
      model_used: agent.model,
      temperature_used: agent.temperature,
    };

    const { data, error } = await supabase
      .from('agent_runs')
      .insert(runData)
      .select('id')
      .single();

    if (error) {
      // Log but don't fail - run logging is not critical
      logAgentError(error, { context: 'createRunRecord', agentId: agent.id });
      return crypto.randomUUID(); // Return fake ID for non-logged runs
    }

    return data.id;
  }

  /**
   * Update run record
   */
  private async updateRunRecord(
    runId: string,
    updates: Partial<AgentRun>
  ): Promise<void> {
    const { error } = await supabase
      .from('agent_runs')
      .update(updates)
      .eq('id', runId);

    if (error) {
      // Log but don't fail
      logAgentError(error, { context: 'updateRunRecord', runId });
    }
  }

  // ============================================================
  // MEMORY MANAGEMENT
  // ============================================================

  /**
   * Save messages to memory
   */
  private async saveToMemory(
    agentId: string,
    sessionId: string,
    messages: ChatMessage[],
    response: string
  ): Promise<void> {
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData?.user?.id || null;

    const memoryEntries = [
      ...messages.map((m) => ({
        agent_id: agentId,
        user_id: userId,
        session_id: sessionId,
        role: m.role as 'user' | 'assistant' | 'system',
        content: m.content,
        metadata: {},
      })),
      {
        agent_id: agentId,
        user_id: userId,
        session_id: sessionId,
        role: 'assistant' as const,
        content: response,
        metadata: {},
      },
    ];

    const { error } = await supabase.from('agent_memories').insert(memoryEntries);

    if (error) {
      logAgentError(error, { context: 'saveToMemory', agentId, sessionId });
    }
  }

  /**
   * Get conversation history from memory
   */
  async getMemory(agentId: string, sessionId: string, limit = 20): Promise<AgentMemory[]> {
    const { data, error } = await supabase
      .from('agent_memories')
      .select('*')
      .eq('agent_id', agentId)
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true })
      .limit(limit);

    if (error) {
      logAgentError(error, { context: 'getMemory', agentId, sessionId });
      return [];
    }

    return (data || []) as AgentMemory[];
  }

  /**
   * Clear conversation memory for a session
   */
  async clearMemory(agentId: string, sessionId: string): Promise<void> {
    const { error } = await supabase
      .from('agent_memories')
      .delete()
      .eq('agent_id', agentId)
      .eq('session_id', sessionId);

    if (error) {
      logAgentError(error, { context: 'clearMemory', agentId, sessionId });
    }
  }

  // ============================================================
  // CACHING
  // ============================================================

  private getCachedAgent(key: string): AgentWithPrompt | null {
    const expiry = this.cacheExpiry.get(key);
    if (expiry && expiry > Date.now()) {
      return this.agentCache.get(key) || null;
    }
    // Cache expired
    this.agentCache.delete(key);
    this.cacheExpiry.delete(key);
    return null;
  }

  private setCachedAgent(key: string, agent: AgentWithPrompt): void {
    this.agentCache.set(key, agent);
    this.cacheExpiry.set(key, Date.now() + this.CACHE_TTL_MS);
  }

  /**
   * Clear agent cache
   */
  clearCache(): void {
    this.agentCache.clear();
    this.cacheExpiry.clear();
  }

  // ============================================================
  // UTILITY METHODS
  // ============================================================

  /**
   * Generate a new session ID
   */
  generateSessionId(): string {
    return crypto.randomUUID();
  }

  /**
   * Build messages array from memory + new message
   */
  buildMessagesWithHistory(
    memory: AgentMemory[],
    newMessage: string
  ): ChatMessage[] {
    const historyMessages: ChatMessage[] = memory
      .filter((m) => m.role !== 'system')
      .map((m) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      }));

    return [
      ...historyMessages,
      { role: 'user', content: newMessage },
    ];
  }
}

// ============================================================
// SINGLETON EXPORT
// ============================================================

export const agentService = new AgentService();

// Re-export for convenience
export { AgentServiceError } from './agent-errors';
export type {
  AIAgent,
  AgentWithPrompt,
  ChatMessage,
  AgentRunRequest,
  AgentRunResponse,
  AgentStreamChunk,
  RunAgentOptions,
} from './types';
