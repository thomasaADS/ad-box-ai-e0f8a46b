/**
 * Agent System Type Definitions
 * Strict TypeScript types for the AI agent system
 */

// ============================================================
// ENUMS
// ============================================================

export type AgentStatus = 'active' | 'inactive' | 'deprecated';
export type AgentRunStatus = 'pending' | 'running' | 'completed' | 'failed' | 'timeout';
export type MemoryRole = 'user' | 'assistant' | 'system';

// ============================================================
// DATABASE TYPES
// ============================================================

export interface AIAgent {
  id: string;
  slug: string;
  name: string;
  name_en: string | null;
  nickname: string | null;
  description: string;
  role: string;
  personality: string | null;
  avatar_id: string | null;
  gradient_from: string;
  gradient_to: string;
  icon: string;
  specialties: string[];
  sample_questions: string[];
  status: AgentStatus;
  is_public: boolean;
  requires_auth: boolean;
  max_tokens: number;
  created_at: string;
  updated_at: string;
  created_by: string | null;
}

export interface PromptVersion {
  id: string;
  agent_id: string;
  version: number;
  version_tag: string | null;
  system_prompt: string;
  model: string;
  temperature: number;
  top_p: number;
  max_output_tokens: number;
  output_schema: Record<string, unknown> | null;
  is_active: boolean;
  notes: string | null;
  created_at: string;
  created_by: string | null;
}

export interface AgentRun {
  id: string;
  agent_id: string;
  prompt_version_id: string | null;
  user_id: string | null;
  session_id: string | null;
  input_messages: ChatMessage[];
  input_context: Record<string, unknown> | null;
  output_raw: string | null;
  output_parsed: Record<string, unknown> | null;
  status: AgentRunStatus;
  error_message: string | null;
  error_code: string | null;
  latency_ms: number | null;
  tokens_input: number | null;
  tokens_output: number | null;
  tokens_total: number | null;
  estimated_cost_usd: number | null;
  model_used: string | null;
  temperature_used: number | null;
  created_at: string;
  completed_at: string | null;
  client_ip: string | null;
  user_agent: string | null;
}

export interface AgentMemory {
  id: string;
  agent_id: string;
  user_id: string | null;
  session_id: string;
  role: MemoryRole;
  content: string;
  metadata: Record<string, unknown>;
  token_count: number | null;
  created_at: string;
}

// ============================================================
// VIEW TYPES
// ============================================================

export interface AgentWithPrompt extends AIAgent {
  prompt_id: string | null;
  prompt_version: number | null;
  system_prompt: string | null;
  model: string | null;
  temperature: number | null;
  output_schema: Record<string, unknown> | null;
}

export interface AgentRunStats {
  agent_id: string;
  run_date: string;
  total_runs: number;
  successful_runs: number;
  failed_runs: number;
  avg_latency_ms: number | null;
  total_tokens: number | null;
  total_cost_usd: number | null;
}

// ============================================================
// API TYPES
// ============================================================

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface AgentRunRequest {
  agent_id?: string;
  agent_slug?: string;
  messages: ChatMessage[];
  context?: Record<string, unknown>;
  session_id?: string;
  stream?: boolean;
}

export interface AgentRunResponse {
  run_id: string;
  agent_id: string;
  output: string;
  parsed?: Record<string, unknown>;
  tokens_used: number | null;
  latency_ms: number;
}

export interface AgentStreamChunk {
  type: 'content' | 'done' | 'error';
  content?: string;
  full_content?: string;
  error?: string;
  run_id?: string;
  tokens_used?: number;
}

// ============================================================
// UI TYPES
// ============================================================

export interface AgentChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  agentId: string;
  isStreaming?: boolean;
}

export interface AgentUIConfig {
  id: string;
  name: string;
  nameEn: string;
  nickname: string;
  role: string;
  description: string;
  personality: string;
  gradientFrom: string;
  gradientTo: string;
  icon: string;
  avatarId: string;
  specialties: string[];
  sampleQuestions: string[];
}

// ============================================================
// ERROR TYPES
// ============================================================

export type AgentErrorCode =
  | 'AGENT_NOT_FOUND'
  | 'PROMPT_NOT_FOUND'
  | 'RATE_LIMIT_EXCEEDED'
  | 'PAYMENT_REQUIRED'
  | 'VALIDATION_ERROR'
  | 'AI_GATEWAY_ERROR'
  | 'TIMEOUT'
  | 'NETWORK_ERROR'
  | 'UNKNOWN_ERROR';

export interface AgentError {
  code: AgentErrorCode;
  message: string;
  details?: Record<string, unknown>;
  retryable: boolean;
}

// ============================================================
// SERVICE CONFIG TYPES
// ============================================================

export interface AgentServiceConfig {
  baseUrl: string;
  apiKey: string;
  defaultModel: string;
  defaultTemperature: number;
  defaultMaxTokens: number;
  timeoutMs: number;
  retryCount: number;
  retryDelayMs: number;
}

export interface RunAgentOptions {
  stream?: boolean;
  onChunk?: (chunk: AgentStreamChunk) => void;
  signal?: AbortSignal;
  context?: Record<string, unknown>;
  sessionId?: string;
}

// ============================================================
// HELPER TYPES
// ============================================================

export type AgentInsert = Omit<AIAgent, 'id' | 'created_at' | 'updated_at'>;
export type AgentUpdate = Partial<Omit<AIAgent, 'id' | 'created_at'>>;

export type PromptVersionInsert = Omit<PromptVersion, 'id' | 'created_at'>;
export type PromptVersionUpdate = Partial<Omit<PromptVersion, 'id' | 'created_at'>>;

export type AgentRunInsert = Omit<AgentRun, 'id' | 'created_at'>;
export type AgentRunUpdate = Partial<Omit<AgentRun, 'id' | 'created_at'>>;

export type AgentMemoryInsert = Omit<AgentMemory, 'id' | 'created_at'>;
