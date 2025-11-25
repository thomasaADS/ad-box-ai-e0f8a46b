-- Migration: Add credits system and ad_creatives table
-- Created: 2025-11-25
-- Purpose: Enable user credit tracking, usage logging, and ad creative storage

-- 1. Add credits columns to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS credits_remaining integer DEFAULT 10 NOT NULL,
ADD COLUMN IF NOT EXISTS subscription_tier text DEFAULT 'free' NOT NULL
  CHECK (subscription_tier IN ('free', 'starter', 'pro', 'enterprise'));

-- 2. Create usage_logs table for tracking credit usage
CREATE TABLE IF NOT EXISTS public.usage_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  action_type text NOT NULL,
  credits_used integer DEFAULT 1 NOT NULL,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_usage_logs_user_id ON usage_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_usage_logs_created_at ON usage_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_usage_logs_action_type ON usage_logs(action_type);

-- 3. Create ad_creatives table for storing generated ad variants
CREATE TABLE IF NOT EXISTS public.ad_creatives (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id uuid NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  platform text NOT NULL CHECK (platform IN ('meta','google','taboola','outbrain','tiktok','linkedin','twitter','sms','email')),
  primary_text text,
  headline text NOT NULL,
  description text,
  cta text,
  final_url text NOT NULL,
  utm_params jsonb,
  audience_config jsonb,
  image_urls jsonb,
  status text DEFAULT 'draft' NOT NULL CHECK (status IN ('draft','published','paused','rejected')),
  performance_metrics jsonb DEFAULT '{}',
  external_id text, -- ID from ad platform (Meta, Google, etc.)
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Add indexes for ad_creatives
CREATE INDEX IF NOT EXISTS idx_ad_creatives_campaign ON ad_creatives(campaign_id);
CREATE INDEX IF NOT EXISTS idx_ad_creatives_platform ON ad_creatives(platform);
CREATE INDEX IF NOT EXISTS idx_ad_creatives_status ON ad_creatives(status);
CREATE INDEX IF NOT EXISTS idx_ad_creatives_external_id ON ad_creatives(external_id) WHERE external_id IS NOT NULL;

-- Add trigger for updated_at on ad_creatives
CREATE TRIGGER update_ad_creatives_updated_at 
  BEFORE UPDATE ON ad_creatives 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- 4. Create function to deduct credits atomically
CREATE OR REPLACE FUNCTION public.deduct_user_credits(
  p_user_id uuid,
  p_amount integer
)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_new_balance integer;
BEGIN
  -- Update credits and return new balance
  UPDATE profiles
  SET credits_remaining = credits_remaining - p_amount
  WHERE user_id = p_user_id
    AND credits_remaining >= p_amount -- Ensure sufficient credits
  RETURNING credits_remaining INTO v_new_balance;
  
  -- If no rows were updated, insufficient credits
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Insufficient credits';
  END IF;
  
  RETURN v_new_balance;
END;
$$;

-- 5. Create function to add credits (for purchases/refunds)
CREATE OR REPLACE FUNCTION public.add_user_credits(
  p_user_id uuid,
  p_amount integer
)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_new_balance integer;
BEGIN
  UPDATE profiles
  SET credits_remaining = credits_remaining + p_amount
  WHERE user_id = p_user_id
  RETURNING credits_remaining INTO v_new_balance;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'User profile not found';
  END IF;
  
  RETURN v_new_balance;
END;
$$;

-- 6. Enable Row Level Security
ALTER TABLE usage_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE ad_creatives ENABLE ROW LEVEL SECURITY;

-- 7. RLS Policies for usage_logs
CREATE POLICY "Users can view own usage logs" 
  ON usage_logs FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "System can insert usage logs" 
  ON usage_logs FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- 8. RLS Policies for ad_creatives
CREATE POLICY "Users can view own ad creatives" 
  ON ad_creatives FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM campaigns 
      WHERE campaigns.id = ad_creatives.campaign_id 
      AND campaigns.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own ad creatives" 
  ON ad_creatives FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM campaigns 
      WHERE campaigns.id = ad_creatives.campaign_id 
      AND campaigns.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own ad creatives" 
  ON ad_creatives FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM campaigns 
      WHERE campaigns.id = ad_creatives.campaign_id 
      AND campaigns.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own ad creatives" 
  ON ad_creatives FOR DELETE 
  USING (
    EXISTS (
      SELECT 1 FROM campaigns 
      WHERE campaigns.id = ad_creatives.campaign_id 
      AND campaigns.user_id = auth.uid()
    )
  );

-- 9. Create view for campaign statistics
CREATE OR REPLACE VIEW campaign_stats AS
SELECT 
  c.id as campaign_id,
  c.user_id,
  c.brand_name,
  COUNT(DISTINCT ac.id) as total_variants,
  COUNT(DISTINCT ac.platform) as platforms_count,
  COUNT(CASE WHEN ac.status = 'published' THEN 1 END) as published_count,
  MAX(ac.created_at) as last_generated_at
FROM campaigns c
LEFT JOIN ad_creatives ac ON c.id = ac.campaign_id
GROUP BY c.id, c.user_id, c.brand_name;

-- Grant access to view
GRANT SELECT ON campaign_stats TO authenticated;

-- 10. Add comments for documentation
COMMENT ON TABLE usage_logs IS 'Tracks user actions and credit usage for billing and analytics';
COMMENT ON TABLE ad_creatives IS 'Stores generated ad variants with platform-specific configurations';
COMMENT ON COLUMN profiles.credits_remaining IS 'Number of credits available for the user';
COMMENT ON COLUMN profiles.subscription_tier IS 'User subscription level: free, starter, pro, enterprise';
COMMENT ON FUNCTION deduct_user_credits IS 'Atomically deducts credits from user account with validation';
COMMENT ON FUNCTION add_user_credits IS 'Adds credits to user account for purchases or refunds';

