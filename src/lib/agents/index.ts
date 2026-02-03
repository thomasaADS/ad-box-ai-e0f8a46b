/**
 * Agent System - Public API
 * Export all agent-related functionality from a single entry point
 */

// Service
export { agentService, AgentServiceError } from './agent-service';

// Types
export type {
  // Database types
  AIAgent,
  PromptVersion,
  AgentRun,
  AgentMemory,
  AgentWithPrompt,
  AgentRunStats,

  // API types
  ChatMessage,
  AgentRunRequest,
  AgentRunResponse,
  AgentStreamChunk,
  RunAgentOptions,

  // UI types
  AgentChatMessage,
  AgentUIConfig,

  // Error types
  AgentErrorCode,
  AgentError,

  // Enums
  AgentStatus,
  AgentRunStatus,
  MemoryRole,

  // Helper types
  AgentInsert,
  AgentUpdate,
  PromptVersionInsert,
  PromptVersionUpdate,
  AgentRunInsert,
  AgentRunUpdate,
  AgentMemoryInsert,
} from './types';

// Schemas
export {
  // Validation schemas
  ChatMessageSchema,
  ChatMessagesSchema,
  AgentRunRequestSchema,
  AgentRunResponseSchema,
  AgentStreamChunkSchema,

  // AI output schemas
  CampaignVariantSchema,
  CampaignVariantsOutputSchema,
  BriefParseOutputSchema,
  AgentChatOutputSchema,
  LandingPageContentSchema,

  // Config schemas
  AgentConfigSchema,
  PromptVersionConfigSchema,

  // Utilities
  validateAgentOutput,
  safeValidateAgentOutput,
  parseAIJsonOutput,
  AgentValidationError,
} from './schemas';

// Errors
export {
  createAgentError,
  agentNotFoundError,
  promptNotFoundError,
  rateLimitError,
  validationError,
  httpStatusToErrorCode,
  parseApiError,
  normalizeError,
  showAgentErrorToast,
  logAgentError,
  handleAgentError,
  withRetry,
} from './agent-errors';

export type { RetryConfig } from './agent-errors';
