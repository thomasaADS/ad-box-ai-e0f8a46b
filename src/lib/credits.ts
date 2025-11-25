import { supabase } from '@/integrations/supabase/client';
import { RateLimitError } from './errorHandling';

/**
 * Credit system for managing user quotas
 * Ensures fair usage and enables monetization
 */

export interface UserCredits {
  credits_remaining: number;
  subscription_tier: 'free' | 'starter' | 'pro' | 'enterprise';
}

export interface CreditCost {
  campaign_generation: number;
  image_generation: number;
  ad_publish: number;
}

// Credit costs for different actions
export const CREDIT_COSTS: CreditCost = {
  campaign_generation: 1,  // 1 credit per campaign generation
  image_generation: 2,     // 2 credits per image
  ad_publish: 3,           // 3 credits per ad publish
};

// Free tier limits
export const SUBSCRIPTION_LIMITS = {
  free: {
    maxCampaigns: 3,
    maxVariantsPerCampaign: 5,
    maxImagesPerMonth: 10,
    features: ['basic_generation', 'meta_platform']
  },
  starter: {
    maxCampaigns: 20,
    maxVariantsPerCampaign: 10,
    maxImagesPerMonth: 50,
    features: ['basic_generation', 'all_platforms', 'custom_branding']
  },
  pro: {
    maxCampaigns: 100,
    maxVariantsPerCampaign: 20,
    maxImagesPerMonth: 200,
    features: ['advanced_generation', 'all_platforms', 'custom_branding', 'analytics', 'api_access']
  },
  enterprise: {
    maxCampaigns: Infinity,
    maxVariantsPerCampaign: 50,
    maxImagesPerMonth: Infinity,
    features: ['everything', 'priority_support', 'custom_integration', 'white_label']
  }
};

/**
 * Check if user has enough credits for an action
 */
export const checkUserCredits = async (
  userId: string,
  creditsRequired: number
): Promise<UserCredits> => {
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('credits_remaining, subscription_tier')
    .eq('user_id', userId)
    .single();

  if (error) {
    throw error;
  }

  if (!profile) {
    throw new Error('Profile not found');
  }

  // Enterprise users have unlimited credits
  if (profile.subscription_tier === 'enterprise') {
    return {
      credits_remaining: Infinity,
      subscription_tier: 'enterprise'
    };
  }

  if (profile.credits_remaining < creditsRequired) {
    throw new RateLimitError(
      `Insufficient credits. Required: ${creditsRequired}, Available: ${profile.credits_remaining}`,
      `אין לך מספיק קרדיטים. נדרשים ${creditsRequired} קרדיטים, זמינים ${profile.credits_remaining}.`
    );
  }

  return {
    credits_remaining: profile.credits_remaining,
    subscription_tier: profile.subscription_tier as any
  };
};

/**
 * Deduct credits from user account
 */
export const deductCredits = async (
  userId: string,
  amount: number,
  actionType: keyof CreditCost,
  metadata?: Record<string, any>
): Promise<number> => {
  // First check if user has enough credits
  const userCredits = await checkUserCredits(userId, amount);

  // Enterprise users don't get deducted
  if (userCredits.subscription_tier === 'enterprise') {
    return Infinity;
  }

  // Deduct credits using a database function for atomicity
  const { data, error } = await supabase.rpc('deduct_user_credits', {
    p_user_id: userId,
    p_amount: amount
  });

  if (error) {
    throw error;
  }

  // Log the usage
  await logUsage(userId, actionType, amount, metadata);

  return data as number; // Returns new balance
};

/**
 * Add credits to user account (for purchases or refunds)
 */
export const addCredits = async (
  userId: string,
  amount: number,
  reason: string
): Promise<number> => {
  const { data, error } = await supabase.rpc('add_user_credits', {
    p_user_id: userId,
    p_amount: amount
  });

  if (error) {
    throw error;
  }

  // Log credit addition
  await logUsage(userId, 'credit_purchase' as any, amount, { reason });

  return data as number;
};

/**
 * Log usage for analytics and billing
 */
const logUsage = async (
  userId: string,
  actionType: string,
  creditsUsed: number,
  metadata?: Record<string, any>
): Promise<void> => {
  try {
    await supabase.from('usage_logs').insert({
      user_id: userId,
      action_type: actionType,
      credits_used: creditsUsed,
      metadata: metadata || {}
    });
  } catch (error) {
    // Don't fail the main operation if logging fails
    console.error('Failed to log usage:', error);
  }
};

/**
 * Get user's current credit balance
 */
export const getCreditBalance = async (userId: string): Promise<number> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('credits_remaining')
    .eq('user_id', userId)
    .single();

  if (error) throw error;

  return data?.credits_remaining ?? 0;
};

/**
 * Get user's usage statistics
 */
export const getUserUsageStats = async (userId: string) => {
  const { data, error } = await supabase
    .from('usage_logs')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(100);

  if (error) throw error;

  // Aggregate stats
  const stats = {
    totalCampaigns: 0,
    totalImages: 0,
    totalPublishes: 0,
    totalCreditsUsed: 0,
    recentActivity: data || []
  };

  data?.forEach(log => {
    stats.totalCreditsUsed += log.credits_used || 0;
    
    switch (log.action_type) {
      case 'campaign_generation':
        stats.totalCampaigns++;
        break;
      case 'image_generation':
        stats.totalImages++;
        break;
      case 'ad_publish':
        stats.totalPublishes++;
        break;
    }
  });

  return stats;
};

/**
 * Check if user can perform action based on subscription tier
 */
export const canPerformAction = async (
  userId: string,
  action: keyof CreditCost
): Promise<{ allowed: boolean; reason?: string }> => {
  try {
    const creditsRequired = CREDIT_COSTS[action];
    await checkUserCredits(userId, creditsRequired);
    return { allowed: true };
  } catch (error) {
    if (error instanceof RateLimitError) {
      return {
        allowed: false,
        reason: error.userMessage || 'Insufficient credits'
      };
    }
    throw error;
  }
};

/**
 * Get subscription features for user
 */
export const getSubscriptionFeatures = async (userId: string): Promise<string[]> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('subscription_tier')
    .eq('user_id', userId)
    .single();

  if (error) throw error;

  const tier = (data?.subscription_tier || 'free') as keyof typeof SUBSCRIPTION_LIMITS;
  return SUBSCRIPTION_LIMITS[tier]?.features || [];
};

