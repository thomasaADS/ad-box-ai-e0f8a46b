import { z } from 'zod';
import type { Platform } from './api';

/**
 * Validation schemas for form inputs using Zod
 * Provides type-safe validation with helpful error messages
 */

// URL validation helper
const optionalUrl = z
  .string()
  .optional()
  .or(z.literal(''))
  .refine(
    (val) => !val || val === '' || /^https?:\/\/.+/.test(val),
    'Must be a valid URL starting with http:// or https://'
  );

// Brief form validation schema
export const briefSchema = z.object({
  brandName: z
    .string()
    .min(2, 'שם המותג חייב להכיל לפחות 2 תווים')
    .max(100, 'שם המותג ארוך מדי'),
  
  website: optionalUrl,
  
  whatsapp: z
    .string()
    .optional()
    .or(z.literal(''))
    .refine(
      (val) => !val || val === '' || /^https?:\/\/(wa\.me|api\.whatsapp\.com)/.test(val),
      'Must be a valid WhatsApp link (wa.me or api.whatsapp.com)'
    ),
  
  industry: z
    .string()
    .min(2, 'תחום העיסוק חייב להכיל לפחות 2 תווים')
    .max(100, 'תחום העיסוק ארוך מדי'),
  
  city: z
    .string()
    .min(2, 'שם העיר חייב להכיל לפחות 2 תווים')
    .max(100, 'שם העיר ארוך מדי'),
  
  offer: z
    .string()
    .min(10, 'המבצע חייב להכיל לפחות 10 תווים')
    .max(500, 'המבצע ארוך מדי'),
  
  tone: z.enum(['professional', 'friendly', 'casual', 'luxury'], {
    errorMap: () => ({ message: 'יש לבחור טון תקין' })
  }),
  
  languages: z
    .array(z.string())
    .min(1, 'יש לבחור לפחות שפה אחת')
    .refine(
      (langs) => langs.every(lang => ['he', 'en', 'ar', 'ru'].includes(lang)),
      'שפה לא תקינה'
    ),
  
  platforms: z
    .array(z.enum(['meta', 'google', 'taboola', 'outbrain', 'tiktok', 'linkedin', 'twitter', 'sms', 'email']))
    .min(1, 'יש לבחור לפחות פלטפורמה אחת')
    .max(5, 'ניתן לבחור עד 5 פלטפורמות'),
  
  objective: z.enum(['TRAFFIC', 'LEADS', 'CONVERSIONS', 'REACH'], {
    errorMap: () => ({ message: 'יש לבחור מטרת קמפיין תקינה' })
  }),
  
  budget: z
    .string()
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) > 0,
      'התקציב חייב להיות מספר חיובי'
    )
    .refine(
      (val) => Number(val) >= 100,
      'התקציב המינימלי הוא 100 (₪1.00)'
    )
    .refine(
      (val) => Number(val) <= 1000000,
      'התקציב המקסימלי הוא 1,000,000 (₪10,000)'
    )
});

export type BriefFormData = z.infer<typeof briefSchema>;

// Settings form validation
export const settingsSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name is too long')
    .optional(),
  
  companyName: z
    .string()
    .min(2, 'Company name must be at least 2 characters')
    .max(100, 'Company name is too long')
    .optional(),
  
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[\d\s\-\+\(\)]+$/.test(val),
      'Invalid phone number format'
    ),
  
  avatarUrl: optionalUrl
});

export type SettingsFormData = z.infer<typeof settingsSchema>;

// Ad variant validation (for manual creation/editing)
export const adVariantSchema = z.object({
  platform: z.enum(['meta', 'google', 'taboola', 'outbrain', 'tiktok', 'linkedin', 'twitter', 'sms', 'email']),
  
  primary_text: z
    .string()
    .min(10, 'Primary text must be at least 10 characters')
    .max(500, 'Primary text is too long'),
  
  headline: z
    .string()
    .min(5, 'Headline must be at least 5 characters')
    .max(100, 'Headline is too long'),
  
  description: z
    .string()
    .max(200, 'Description is too long')
    .optional(),
  
  cta: z.string().min(1, 'CTA is required'),
  
  final_url: z
    .string()
    .url('Must be a valid URL')
});

export type AdVariantFormData = z.infer<typeof adVariantSchema>;

// Login/Signup validation
export const loginSchema = z.object({
  email: z
    .string()
    .email('כתובת אימייל לא תקינה')
    .min(5, 'אימייל קצר מדי')
    .max(255, 'אימייל ארוך מדי'),
  
  password: z
    .string()
    .min(6, 'הסיסמה חייבת להכיל לפחות 6 תווים')
    .max(100, 'הסיסמה ארוכה מדי')
});

export const signupSchema = loginSchema.extend({
  password: z
    .string()
    .min(8, 'הסיסמה חייבת להכיל לפחות 8 תווים')
    .max(100, 'הסיסמה ארוכה מדי')
    .refine(
      (val) => /[A-Z]/.test(val),
      'הסיסמה חייבת להכיל לפחות אות גדולה אחת'
    )
    .refine(
      (val) => /[a-z]/.test(val),
      'הסיסמה חייבת להכיל לפחות אות קטנה אחת'
    )
    .refine(
      (val) => /[0-9]/.test(val),
      'הסיסמה חייבת להכיל לפחות ספרה אחת'
    ),
  
  confirmPassword: z.string()
}).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: 'הסיסמאות אינן תואמות',
    path: ['confirmPassword']
  }
);

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;

