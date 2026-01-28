import { supabase } from '@/integrations/supabase/client';

// Types for analytics data
export type AdPlatform = 'facebook' | 'google' | 'tiktok' | 'taboola' | 'outbrain' | 'linkedin' | 'other';
export type CampaignStatus = 'active' | 'paused' | 'deleted' | 'completed';

export interface AdAccount {
  id: string;
  user_id: string;
  name: string;
  platform: AdPlatform;
  currency: string;
  external_account_id?: string;
  created_at: string;
  updated_at: string;
}

export interface CampaignAnalytics {
  id: string;
  ad_account_id: string;
  user_id: string;
  name: string;
  objective?: string;
  status: CampaignStatus;
  country?: string;
  created_at: string;
  start_date?: string;
  end_date?: string;
  updated_at: string;
  external_campaign_id?: string;
  // Joined data
  platform?: AdPlatform;
  account_name?: string;
}

export interface CampaignStatsDaily {
  id: string;
  campaign_id: string;
  date: string;
  impressions: number;
  clicks: number;
  spend: number;
  leads: number;
  purchases?: number;
  revenue?: number;
  created_at: string;
  updated_at: string;
}

export interface CampaignMetrics extends CampaignAnalytics {
  total_impressions: number;
  total_clicks: number;
  total_spend: number;
  total_leads: number;
  total_purchases: number;
  total_revenue: number;
  ctr: number; // Click-through rate (%)
  cpc: number; // Cost per click
  cpl: number; // Cost per lead
  roas: number; // Return on ad spend
}

export interface DateRange {
  start: Date;
  end: Date;
}

export interface AnalyticsFilters {
  dateRange?: DateRange;
  platform?: AdPlatform | 'all';
  status?: CampaignStatus | 'all';
  country?: string | 'all';
  search?: string;
}

// The analytics tables (ad_accounts, campaign_metrics, campaign_stats_daily, campaigns_analytics)
// are not yet in the auto-generated Supabase type definitions.
// Using an untyped wrapper for these queries until types are regenerated.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const analyticsDb = supabase as unknown as { from: (table: string) => any; rpc: (fn: string) => any };

// Fetch all ad accounts for the current user
export async function fetchAdAccounts(): Promise<AdAccount[]> {
  const { data, error } = await analyticsDb
    .from('ad_accounts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return (data as AdAccount[]) || [];
}

// Fetch campaigns with aggregated metrics for a date range
export async function fetchCampaignsWithMetrics(
  filters: AnalyticsFilters = {}
): Promise<CampaignMetrics[]> {
  let query = analyticsDb
    .from('campaign_metrics')
    .select('*');

  // Apply filters
  if (filters.platform && filters.platform !== 'all') {
    query = query.eq('platform', filters.platform);
  }

  if (filters.status && filters.status !== 'all') {
    query = query.eq('status', filters.status);
  }

  if (filters.country && filters.country !== 'all') {
    query = query.eq('country', filters.country);
  }

  if (filters.search) {
    query = query.ilike('name', `%${filters.search}%`);
  }

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  const records = (data || []) as Record<string, unknown>[];

  // If date range is specified, we need to recalculate metrics for that range
  if (filters.dateRange) {
    const campaignIds = records.map(c => c.id as string);
    const dailyStats = await fetchDailyStatsForCampaigns(campaignIds, filters.dateRange);

    // Recalculate metrics based on filtered daily stats
    return records.map(campaign => {
      const stats = dailyStats.filter(s => s.campaign_id === campaign.id);
      return recalculateMetrics(campaign, stats);
    });
  }

  return records.map(c => ({
    ...c,
    total_impressions: Number(c.total_impressions) || 0,
    total_clicks: Number(c.total_clicks) || 0,
    total_spend: Number(c.total_spend) || 0,
    total_leads: Number(c.total_leads) || 0,
    total_purchases: Number(c.total_purchases) || 0,
    total_revenue: Number(c.total_revenue) || 0,
    ctr: Number(c.ctr) || 0,
    cpc: Number(c.cpc) || 0,
    cpl: Number(c.cpl) || 0,
    roas: Number(c.roas) || 0,
  })) as CampaignMetrics[];
}

// Fetch daily stats for specific campaigns within a date range
export async function fetchDailyStatsForCampaigns(
  campaignIds: string[],
  dateRange: DateRange
): Promise<CampaignStatsDaily[]> {
  if (campaignIds.length === 0) return [];

  const { data, error } = await analyticsDb
    .from('campaign_stats_daily')
    .select('*')
    .in('campaign_id', campaignIds)
    .gte('date', dateRange.start.toISOString().split('T')[0])
    .lte('date', dateRange.end.toISOString().split('T')[0])
    .order('date', { ascending: true });

  if (error) {
    throw error;
  }

  return ((data || []) as Record<string, unknown>[]).map(s => ({
    ...s,
    impressions: Number(s.impressions) || 0,
    clicks: Number(s.clicks) || 0,
    spend: Number(s.spend) || 0,
    leads: Number(s.leads) || 0,
    purchases: s.purchases ? Number(s.purchases) : undefined,
    revenue: s.revenue ? Number(s.revenue) : undefined,
  })) as CampaignStatsDaily[];
}

// Fetch daily stats for a single campaign
export async function fetchCampaignDailyStats(
  campaignId: string,
  dateRange?: DateRange
): Promise<CampaignStatsDaily[]> {
  let query = analyticsDb
    .from('campaign_stats_daily')
    .select('*')
    .eq('campaign_id', campaignId)
    .order('date', { ascending: true });

  if (dateRange) {
    query = query
      .gte('date', dateRange.start.toISOString().split('T')[0])
      .lte('date', dateRange.end.toISOString().split('T')[0]);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return ((data || []) as Record<string, unknown>[]).map(s => ({
    ...s,
    impressions: Number(s.impressions) || 0,
    clicks: Number(s.clicks) || 0,
    spend: Number(s.spend) || 0,
    leads: Number(s.leads) || 0,
    purchases: s.purchases ? Number(s.purchases) : undefined,
    revenue: s.revenue ? Number(s.revenue) : undefined,
  })) as CampaignStatsDaily[];
}

// Fetch a single campaign with full details
export async function fetchCampaignById(campaignId: string): Promise<CampaignAnalytics | null> {
  const { data, error } = await analyticsDb
    .from('campaigns_analytics')
    .select(`
      *,
      ad_accounts (
        id,
        name,
        platform,
        currency
      )
    `)
    .eq('id', campaignId)
    .single();

  if (error) {
    throw error;
  }

  if (!data) return null;

  const record = data as Record<string, unknown>;
  const adAccounts = record.ad_accounts as Record<string, unknown> | null;

  return {
    ...record,
    platform: adAccounts?.platform,
    account_name: adAccounts?.name,
  } as CampaignAnalytics;
}

// Recalculate metrics from daily stats
function recalculateMetrics(
  campaign: Record<string, unknown>,
  dailyStats: CampaignStatsDaily[]
): CampaignMetrics {
  const totals = dailyStats.reduce(
    (acc, stat) => ({
      impressions: acc.impressions + stat.impressions,
      clicks: acc.clicks + stat.clicks,
      spend: acc.spend + stat.spend,
      leads: acc.leads + stat.leads,
      purchases: acc.purchases + (stat.purchases || 0),
      revenue: acc.revenue + (stat.revenue || 0),
    }),
    { impressions: 0, clicks: 0, spend: 0, leads: 0, purchases: 0, revenue: 0 }
  );

  const ctr = totals.impressions > 0
    ? (totals.clicks / totals.impressions) * 100
    : 0;

  const cpc = totals.clicks > 0
    ? totals.spend / totals.clicks
    : 0;

  const cpl = totals.leads > 0
    ? totals.spend / totals.leads
    : 0;

  const roas = totals.spend > 0 && totals.revenue > 0
    ? totals.revenue / totals.spend
    : 0;

  return {
    ...campaign,
    total_impressions: totals.impressions,
    total_clicks: totals.clicks,
    total_spend: totals.spend,
    total_leads: totals.leads,
    total_purchases: totals.purchases,
    total_revenue: totals.revenue,
    ctr: Math.round(ctr * 100) / 100,
    cpc: Math.round(cpc * 100) / 100,
    cpl: Math.round(cpl * 100) / 100,
    roas: Math.round(roas * 100) / 100,
  } as CampaignMetrics;
}

// Calculate aggregated KPIs for all campaigns
export async function calculateAggregatedKPIs(
  filters: AnalyticsFilters = {}
): Promise<{
  totalSpend: number;
  totalImpressions: number;
  totalClicks: number;
  totalLeads: number;
  totalRevenue: number;
  avgCPC: number;
  avgCPL: number;
  avgCTR: number;
  avgROAS: number;
}> {
  const campaigns = await fetchCampaignsWithMetrics(filters);

  const totals = campaigns.reduce(
    (acc, campaign) => ({
      spend: acc.spend + campaign.total_spend,
      impressions: acc.impressions + campaign.total_impressions,
      clicks: acc.clicks + campaign.total_clicks,
      leads: acc.leads + campaign.total_leads,
      revenue: acc.revenue + campaign.total_revenue,
    }),
    { spend: 0, impressions: 0, clicks: 0, leads: 0, revenue: 0 }
  );

  const avgCPC = totals.clicks > 0 ? totals.spend / totals.clicks : 0;
  const avgCPL = totals.leads > 0 ? totals.spend / totals.leads : 0;
  const avgCTR = totals.impressions > 0 ? (totals.clicks / totals.impressions) * 100 : 0;
  const avgROAS = totals.spend > 0 && totals.revenue > 0 ? totals.revenue / totals.spend : 0;

  return {
    totalSpend: Math.round(totals.spend * 100) / 100,
    totalImpressions: totals.impressions,
    totalClicks: totals.clicks,
    totalLeads: totals.leads,
    totalRevenue: Math.round(totals.revenue * 100) / 100,
    avgCPC: Math.round(avgCPC * 100) / 100,
    avgCPL: Math.round(avgCPL * 100) / 100,
    avgCTR: Math.round(avgCTR * 100) / 100,
    avgROAS: Math.round(avgROAS * 100) / 100,
  };
}

// Seed demo data (calls the Supabase function)
export async function seedDemoData(): Promise<void> {
  const { error } = await analyticsDb.rpc('seed_analytics_demo_data');

  if (error) {
    throw error;
  }
}
