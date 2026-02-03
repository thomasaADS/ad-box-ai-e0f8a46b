/**
 * Agent System Zod Schemas
 * Strict validation schemas for all AI agent inputs and outputs
 */

import { z } from 'zod';

// ============================================================
// ENUM SCHEMAS
// ============================================================

export const AgentStatusSchema = z.enum(['active', 'inactive', 'deprecated']);
export const AgentRunStatusSchema = z.enum(['pending', 'running', 'completed', 'failed', 'timeout']);
export const MemoryRoleSchema = z.enum(['user', 'assistant', 'system']);

// ============================================================
// MESSAGE SCHEMAS
// ============================================================

export const ChatMessageSchema = z.object({
  role: z.enum(['user', 'assistant', 'system']),
  content: z.string().min(1, 'Message content cannot be empty'),
});

export const ChatMessagesSchema = z.array(ChatMessageSchema).min(1, 'At least one message is required');

// ============================================================
// AGENT REQUEST SCHEMAS
// ============================================================

export const AgentRunRequestSchema = z.object({
  agent_id: z.string().uuid().optional(),
  agent_slug: z.string().min(1).max(50).optional(),
  messages: ChatMessagesSchema,
  context: z.record(z.unknown()).optional(),
  session_id: z.string().max(64).optional(),
  stream: z.boolean().optional().default(false),
}).refine(
  (data) => data.agent_id || data.agent_slug,
  { message: 'Either agent_id or agent_slug must be provided' }
);

// ============================================================
// AGENT RESPONSE SCHEMAS
// ============================================================

export const AgentRunResponseSchema = z.object({
  run_id: z.string().uuid(),
  agent_id: z.string().uuid(),
  output: z.string(),
  parsed: z.record(z.unknown()).optional(),
  tokens_used: z.number().nullable(),
  latency_ms: z.number(),
});

export const AgentStreamChunkSchema = z.object({
  type: z.enum(['content', 'done', 'error']),
  content: z.string().optional(),
  full_content: z.string().optional(),
  error: z.string().optional(),
  run_id: z.string().uuid().optional(),
  tokens_used: z.number().optional(),
});

// ============================================================
// AI OUTPUT SCHEMAS - For validating structured AI responses
// ============================================================

/**
 * Schema for campaign variant generation output
 */
export const CampaignVariantSchema = z.object({
  platform: z.enum(['meta', 'google', 'tiktok', 'taboola', 'outbrain', 'linkedin', 'twitter', 'sms', 'email']),
  primary_text: z.string().min(1).max(500),
  headline: z.string().min(1).max(100),
  description: z.string().max(300).optional(),
  cta: z.string().max(50).optional(),
  audience_suggestion: z.string().max(200).optional(),
});

export const CampaignVariantsOutputSchema = z.object({
  variants: z.array(CampaignVariantSchema).min(1).max(10),
});

/**
 * Schema for brief parsing output
 */
export const BriefParseOutputSchema = z.object({
  businessName: z.string().max(100).nullable().optional(),
  businessType: z.string().max(100).nullable().optional(),
  targetAudience: z.string().max(200).nullable().optional(),
  location: z.string().max(100).nullable().optional(),
  ageRange: z.string().max(20).nullable().optional(),
  goals: z.string().max(300).nullable().optional(),
  budget: z.string().max(50).nullable().optional(),
  platforms: z.array(z.string()).nullable().optional(),
  urgency: z.string().max(50).nullable().optional(),
  specialOffers: z.string().max(200).nullable().optional(),
  tone: z.string().max(50).nullable().optional(),
});

/**
 * Schema for general agent chat response
 */
export const AgentChatOutputSchema = z.object({
  message: z.string().min(1),
  suggestions: z.array(z.string()).optional(),
  actionItems: z.array(z.object({
    action: z.string(),
    priority: z.enum(['high', 'medium', 'low']).optional(),
  })).optional(),
  references: z.array(z.object({
    title: z.string(),
    url: z.string().url().optional(),
  })).optional(),
});

/**
 * Schema for landing page content generation
 */
export const LandingPageContentSchema = z.object({
  headline: z.string().min(1).max(100),
  subheadline: z.string().max(200).optional(),
  ctaText: z.string().max(50),
  features: z.array(z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string().optional(),
  })).max(6).optional(),
  testimonial: z.object({
    quote: z.string(),
    author: z.string(),
    role: z.string().optional(),
  }).optional(),
});

// ============================================================
// AGENT CONFIGURATION SCHEMAS
// ============================================================

export const AgentConfigSchema = z.object({
  slug: z.string().min(1).max(50).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  name: z.string().min(1).max(50),
  name_en: z.string().max(50).optional(),
  nickname: z.string().max(50).optional(),
  description: z.string().min(10).max(500),
  role: z.string().min(1).max(100),
  personality: z.string().max(1000).optional(),
  avatar_id: z.string().max(50).optional(),
  gradient_from: z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Must be a valid hex color'),
  gradient_to: z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Must be a valid hex color'),
  icon: z.string().max(50),
  specialties: z.array(z.string().max(50)).max(10),
  sample_questions: z.array(z.string().max(200)).max(10),
  status: AgentStatusSchema,
  is_public: z.boolean(),
  requires_auth: z.boolean(),
  max_tokens: z.number().min(100).max(8192),
});

export const PromptVersionConfigSchema = z.object({
  agent_id: z.string().uuid(),
  version_tag: z.string().max(50).optional(),
  system_prompt: z.string().min(10).max(10000),
  model: z.string().min(1).max(100),
  temperature: z.number().min(0).max(2),
  top_p: z.number().min(0).max(1),
  max_output_tokens: z.number().min(100).max(8192),
  output_schema: z.record(z.unknown()).optional(),
  is_active: z.boolean(),
  notes: z.string().max(500).optional(),
});

// ============================================================
// VALIDATION HELPERS
// ============================================================

/**
 * Validates and parses a value against a schema
 * Returns the parsed value or throws AgentValidationError
 */
export function validateAgentOutput<T>(
  schema: z.ZodSchema<T>,
  value: unknown,
  context?: string
): T {
  const result = schema.safeParse(value);

  if (!result.success) {
    const errors = result.error.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join('; ');
    throw new AgentValidationError(
      `Validation failed${context ? ` for ${context}` : ''}: ${errors}`,
      result.error.errors
    );
  }

  return result.data;
}

/**
 * Safely validates without throwing - returns result object
 */
export function safeValidateAgentOutput<T>(
  schema: z.ZodSchema<T>,
  value: unknown
): { success: true; data: T } | { success: false; error: z.ZodError } {
  const result = schema.safeParse(value);
  return result;
}

/**
 * Custom validation error with detailed field information
 */
export class AgentValidationError extends Error {
  public readonly fieldErrors: z.ZodIssue[];

  constructor(message: string, fieldErrors: z.ZodIssue[]) {
    super(message);
    this.name = 'AgentValidationError';
    this.fieldErrors = fieldErrors;
  }
}

// ============================================================
// JSON PARSING UTILITIES
// ============================================================

/**
 * Parse AI output that may contain markdown code blocks
 */
export function parseAIJsonOutput<T>(
  rawOutput: string,
  schema: z.ZodSchema<T>
): T {
  // Try to extract JSON from markdown code blocks
  let jsonText = rawOutput.trim();

  // Match ```json ... ``` or ``` ... ```
  const codeBlockMatch = jsonText.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (codeBlockMatch) {
    jsonText = codeBlockMatch[1].trim();
  }

  // Try to find JSON object/array if not in code block
  if (!jsonText.startsWith('{') && !jsonText.startsWith('[')) {
    const jsonMatch = jsonText.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
    if (jsonMatch) {
      jsonText = jsonMatch[1];
    }
  }

  try {
    const parsed = JSON.parse(jsonText);
    return validateAgentOutput(schema, parsed);
  } catch (e) {
    if (e instanceof SyntaxError) {
      throw new AgentValidationError(
        `Failed to parse AI output as JSON: ${e.message}`,
        []
      );
    }
    throw e;
  }
}

// ============================================================
// TYPE EXPORTS
// ============================================================

export type AgentStatus = z.infer<typeof AgentStatusSchema>;
export type AgentRunStatus = z.infer<typeof AgentRunStatusSchema>;
export type MemoryRole = z.infer<typeof MemoryRoleSchema>;
export type ChatMessage = z.infer<typeof ChatMessageSchema>;
export type AgentRunRequest = z.infer<typeof AgentRunRequestSchema>;
export type AgentRunResponse = z.infer<typeof AgentRunResponseSchema>;
export type AgentStreamChunk = z.infer<typeof AgentStreamChunkSchema>;
export type CampaignVariant = z.infer<typeof CampaignVariantSchema>;
export type CampaignVariantsOutput = z.infer<typeof CampaignVariantsOutputSchema>;
export type BriefParseOutput = z.infer<typeof BriefParseOutputSchema>;
export type AgentChatOutput = z.infer<typeof AgentChatOutputSchema>;
export type LandingPageContent = z.infer<typeof LandingPageContentSchema>;
export type AgentConfig = z.infer<typeof AgentConfigSchema>;
export type PromptVersionConfig = z.infer<typeof PromptVersionConfigSchema>;
