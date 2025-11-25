/**
 * Centralized error handling utilities
 * Provides consistent error messages and logging
 */

export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500,
    public userMessage?: string
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class ValidationError extends AppError {
  constructor(message: string, userMessage?: string) {
    super(message, 'VALIDATION_ERROR', 400, userMessage);
    this.name = 'ValidationError';
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string, userMessage?: string) {
    super(message, 'AUTH_ERROR', 401, userMessage);
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string, userMessage?: string) {
    super(message, 'AUTHORIZATION_ERROR', 403, userMessage);
    this.name = 'AuthorizationError';
  }
}

export class NotFoundError extends AppError {
  constructor(message: string, userMessage?: string) {
    super(message, 'NOT_FOUND', 404, userMessage);
    this.name = 'NotFoundError';
  }
}

export class RateLimitError extends AppError {
  constructor(message: string, userMessage?: string) {
    super(message, 'RATE_LIMIT_EXCEEDED', 429, userMessage);
    this.name = 'RateLimitError';
  }
}

export class ExternalAPIError extends AppError {
  constructor(message: string, public service: string, userMessage?: string) {
    super(message, 'EXTERNAL_API_ERROR', 502, userMessage);
    this.name = 'ExternalAPIError';
  }
}

/**
 * Get user-friendly error message
 */
export const getUserMessage = (error: unknown): string => {
  if (error instanceof AppError && error.userMessage) {
    return error.userMessage;
  }

  if (error instanceof AppError) {
    switch (error.code) {
      case 'VALIDATION_ERROR':
        return 'הנתונים שהוזנו אינם תקינים. אנא בדוק ונסה שוב.';
      case 'AUTH_ERROR':
        return 'אימות נכשל. אנא התחבר מחדש.';
      case 'AUTHORIZATION_ERROR':
        return 'אין לך הרשאה לבצע פעולה זו.';
      case 'NOT_FOUND':
        return 'המשאב המבוקש לא נמצא.';
      case 'RATE_LIMIT_EXCEEDED':
        return 'ביצעת יותר מדי בקשות. אנא נסה שוב מאוחר יותר.';
      case 'EXTERNAL_API_ERROR':
        return 'שירות חיצוני אינו זמין כרגע. אנא נסה שוב מאוחר יותר.';
      default:
        return 'אירעה שגיאה. אנא נסה שוב.';
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'אירעה שגיאה בלתי צפויה.';
};

/**
 * Log error to console in development and to monitoring service in production
 */
export const logError = (error: unknown, context?: Record<string, any>) => {
  console.error('Error:', error);
  
  if (context) {
    console.error('Context:', context);
  }

  // TODO: Send to error monitoring service in production
  if (import.meta.env.PROD) {
    // Example: Sentry.captureException(error, { extra: context });
  }
};

/**
 * Handle Supabase errors
 */
export const handleSupabaseError = (error: any): AppError => {
  // Authentication errors
  if (error.message?.includes('Invalid login credentials')) {
    return new AuthenticationError(
      error.message,
      'אימייל או סיסמה שגויים.'
    );
  }

  if (error.message?.includes('Email not confirmed')) {
    return new AuthenticationError(
      error.message,
      'אנא אמת את כתובת האימייל שלך לפני ההתחברות.'
    );
  }

  // Authorization errors
  if (error.code === 'PGRST301' || error.message?.includes('permission denied')) {
    return new AuthorizationError(
      error.message,
      'אין לך הרשאה לבצע פעולה זו.'
    );
  }

  // Not found errors
  if (error.code === 'PGRST116' || error.message?.includes('not found')) {
    return new NotFoundError(
      error.message,
      'המשאב המבוקש לא נמצא.'
    );
  }

  // Default
  return new AppError(
    error.message || 'Database error',
    'DATABASE_ERROR',
    500,
    'אירעה שגיאת מסד נתונים. אנא נסה שוב.'
  );
};

/**
 * Retry function with exponential backoff
 */
export const retryWithBackoff = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delayMs: number = 1000
): Promise<T> => {
  let lastError: Error;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      
      if (i < maxRetries - 1) {
        // Exponential backoff: 1s, 2s, 4s
        const delay = delayMs * Math.pow(2, i);
        console.log(`Retry ${i + 1}/${maxRetries} after ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError!;
};

/**
 * Safe async wrapper that catches errors
 */
export const safeAsync = async <T>(
  fn: () => Promise<T>,
  fallback?: T
): Promise<[T | null, Error | null]> => {
  try {
    const result = await fn();
    return [result, null];
  } catch (error) {
    logError(error);
    return [fallback ?? null, error as Error];
  }
};

