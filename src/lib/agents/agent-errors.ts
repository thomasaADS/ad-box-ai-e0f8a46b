/**
 * Agent Error Handling
 * Centralized error handling with user-friendly messages and logging
 */

import { toast } from 'sonner';
import type { AgentErrorCode, AgentError } from './types';

// ============================================================
// ERROR DEFINITIONS
// ============================================================

const ERROR_MESSAGES: Record<AgentErrorCode, { he: string; en: string }> = {
  AGENT_NOT_FOUND: {
    he: 'הסוכן לא נמצא. נסה לרענן את העמוד.',
    en: 'Agent not found. Try refreshing the page.',
  },
  PROMPT_NOT_FOUND: {
    he: 'תצורת הסוכן לא נמצאה. נסה שוב מאוחר יותר.',
    en: 'Agent configuration not found. Try again later.',
  },
  RATE_LIMIT_EXCEEDED: {
    he: 'מכסת השימוש הגיעה למקסימום. נסה שוב בעוד מספר דקות.',
    en: 'Rate limit exceeded. Try again in a few minutes.',
  },
  PAYMENT_REQUIRED: {
    he: 'יש להוסיף קרדיט לחשבון כדי להמשיך.',
    en: 'Please add credit to continue.',
  },
  VALIDATION_ERROR: {
    he: 'התגובה מהסוכן לא הייתה בפורמט הנכון. נסה שוב.',
    en: 'Agent response was not in the expected format. Try again.',
  },
  AI_GATEWAY_ERROR: {
    he: 'שגיאה בשרת ה-AI. נסה שוב בעוד מספר שניות.',
    en: 'AI server error. Try again in a few seconds.',
  },
  TIMEOUT: {
    he: 'הפעולה לקחה יותר מדי זמן. נסה שוב.',
    en: 'Operation timed out. Please try again.',
  },
  NETWORK_ERROR: {
    he: 'בעיית חיבור. בדוק את החיבור לאינטרנט ונסה שוב.',
    en: 'Connection issue. Check your internet and try again.',
  },
  UNKNOWN_ERROR: {
    he: 'אירעה שגיאה לא צפויה. נסה שוב.',
    en: 'An unexpected error occurred. Please try again.',
  },
};

const RETRYABLE_ERRORS: AgentErrorCode[] = [
  'RATE_LIMIT_EXCEEDED',
  'AI_GATEWAY_ERROR',
  'TIMEOUT',
  'NETWORK_ERROR',
];

// ============================================================
// ERROR CLASS
// ============================================================

export class AgentServiceError extends Error implements AgentError {
  public readonly code: AgentErrorCode;
  public readonly details?: Record<string, unknown>;
  public readonly retryable: boolean;

  constructor(
    code: AgentErrorCode,
    message?: string,
    details?: Record<string, unknown>
  ) {
    const defaultMessage = ERROR_MESSAGES[code]?.he || 'שגיאה לא ידועה';
    super(message || defaultMessage);

    this.name = 'AgentServiceError';
    this.code = code;
    this.details = details;
    this.retryable = RETRYABLE_ERRORS.includes(code);
  }

  /**
   * Get user-friendly message in specified language
   */
  getUserMessage(lang: 'he' | 'en' = 'he'): string {
    return ERROR_MESSAGES[this.code]?.[lang] || this.message;
  }

  /**
   * Convert to plain object for serialization
   */
  toJSON(): AgentError {
    return {
      code: this.code,
      message: this.message,
      details: this.details,
      retryable: this.retryable,
    };
  }
}

// ============================================================
// ERROR FACTORY FUNCTIONS
// ============================================================

export function createAgentError(
  code: AgentErrorCode,
  details?: Record<string, unknown>
): AgentServiceError {
  return new AgentServiceError(code, undefined, details);
}

export function agentNotFoundError(agentId?: string): AgentServiceError {
  return new AgentServiceError('AGENT_NOT_FOUND', undefined, { agentId });
}

export function promptNotFoundError(agentId: string): AgentServiceError {
  return new AgentServiceError('PROMPT_NOT_FOUND', undefined, { agentId });
}

export function rateLimitError(retryAfterMs?: number): AgentServiceError {
  return new AgentServiceError('RATE_LIMIT_EXCEEDED', undefined, { retryAfterMs });
}

export function validationError(errors: string[]): AgentServiceError {
  return new AgentServiceError('VALIDATION_ERROR', `Validation failed: ${errors.join(', ')}`, { errors });
}

// ============================================================
// ERROR HANDLING UTILITIES
// ============================================================

/**
 * Convert HTTP status code to AgentErrorCode
 */
export function httpStatusToErrorCode(status: number): AgentErrorCode {
  switch (status) {
    case 404:
      return 'AGENT_NOT_FOUND';
    case 429:
      return 'RATE_LIMIT_EXCEEDED';
    case 402:
      return 'PAYMENT_REQUIRED';
    case 408:
    case 504:
      return 'TIMEOUT';
    case 500:
    case 502:
    case 503:
      return 'AI_GATEWAY_ERROR';
    default:
      return 'UNKNOWN_ERROR';
  }
}

/**
 * Parse error from fetch response
 */
export async function parseApiError(response: Response): Promise<AgentServiceError> {
  const code = httpStatusToErrorCode(response.status);

  try {
    const data = await response.json();
    return new AgentServiceError(
      code,
      data.error || data.message,
      { status: response.status, ...data }
    );
  } catch {
    return new AgentServiceError(code, undefined, { status: response.status });
  }
}

/**
 * Convert any error to AgentServiceError
 */
export function normalizeError(error: unknown): AgentServiceError {
  if (error instanceof AgentServiceError) {
    return error;
  }

  if (error instanceof TypeError && error.message.includes('fetch')) {
    return new AgentServiceError('NETWORK_ERROR', error.message);
  }

  if (error instanceof DOMException && error.name === 'AbortError') {
    return new AgentServiceError('TIMEOUT', 'Request was aborted');
  }

  if (error instanceof Error) {
    // Check for specific error patterns
    if (error.message.includes('rate limit') || error.message.includes('429')) {
      return new AgentServiceError('RATE_LIMIT_EXCEEDED', error.message);
    }
    if (error.message.includes('timeout') || error.message.includes('timed out')) {
      return new AgentServiceError('TIMEOUT', error.message);
    }
    if (error.message.includes('network') || error.message.includes('fetch')) {
      return new AgentServiceError('NETWORK_ERROR', error.message);
    }

    return new AgentServiceError('UNKNOWN_ERROR', error.message);
  }

  return new AgentServiceError('UNKNOWN_ERROR', String(error));
}

// ============================================================
// UI ERROR HANDLING
// ============================================================

/**
 * Show toast notification for agent error
 */
export function showAgentErrorToast(
  error: AgentServiceError | unknown,
  lang: 'he' | 'en' = 'he'
): void {
  const agentError = normalizeError(error);

  const message = agentError.getUserMessage(lang);
  const isRetryable = agentError.retryable;

  toast.error(message, {
    description: isRetryable
      ? lang === 'he' ? 'ניתן לנסות שוב' : 'You can try again'
      : undefined,
    duration: isRetryable ? 5000 : 7000,
  });
}

/**
 * Log error to console and optionally to analytics
 */
export function logAgentError(
  error: AgentServiceError | unknown,
  context?: Record<string, unknown>
): void {
  const agentError = normalizeError(error);

  console.error('[AgentService Error]', {
    code: agentError.code,
    message: agentError.message,
    details: agentError.details,
    retryable: agentError.retryable,
    context,
    timestamp: new Date().toISOString(),
  });

  // TODO: Send to analytics/monitoring service (e.g., Sentry, PostHog)
  // analytics.captureException(agentError, { extra: context });
}

/**
 * Handle agent error with toast and logging
 */
export function handleAgentError(
  error: unknown,
  context?: Record<string, unknown>,
  lang: 'he' | 'en' = 'he'
): AgentServiceError {
  const agentError = normalizeError(error);

  logAgentError(agentError, context);
  showAgentErrorToast(agentError, lang);

  return agentError;
}

// ============================================================
// RETRY UTILITIES
// ============================================================

export interface RetryConfig {
  maxRetries: number;
  initialDelayMs: number;
  maxDelayMs: number;
  backoffMultiplier: number;
}

const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxRetries: 3,
  initialDelayMs: 1000,
  maxDelayMs: 10000,
  backoffMultiplier: 2,
};

/**
 * Execute function with exponential backoff retry
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  config: Partial<RetryConfig> = {}
): Promise<T> {
  const { maxRetries, initialDelayMs, maxDelayMs, backoffMultiplier } = {
    ...DEFAULT_RETRY_CONFIG,
    ...config,
  };

  let lastError: AgentServiceError | null = null;
  let delay = initialDelayMs;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = normalizeError(error);

      // Don't retry non-retryable errors
      if (!lastError.retryable) {
        throw lastError;
      }

      // Don't retry after max retries
      if (attempt === maxRetries) {
        break;
      }

      // Wait before retry
      await new Promise((resolve) => setTimeout(resolve, delay));
      delay = Math.min(delay * backoffMultiplier, maxDelayMs);
    }
  }

  throw lastError || new AgentServiceError('UNKNOWN_ERROR', 'All retries failed');
}
