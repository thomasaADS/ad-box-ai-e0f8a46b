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
  ctr: number;
  cpc: number;
  cpl: number;
  roas: number;
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

// Note: Analytics tables not yet created in database
// These functions return mock/empty data for now

export async function fetchAdAccounts(): Promise<AdAccount[]> {
  // Return empty array - tables not yet created
  return [];
}

export async function fetchCampaignsWithMetrics(
  _filters: AnalyticsFilters = {}
): Promise<CampaignMetrics[]> {
  // Return empty array - tables not yet created
  return [];
}

export async function fetchDailyStatsForCampaigns(
  _campaignIds: string[],
  _dateRange: DateRange
): Promise<CampaignStatsDaily[]> {
  return [];
}

export async function fetchCampaignDailyStats(
  _campaignId: string,
  _dateRange?: DateRange
): Promise<CampaignStatsDaily[]> {
  return [];
}

export async function fetchCampaignById(_campaignId: string): Promise<CampaignAnalytics | null> {
  return null;
}

export async function calculateAggregatedKPIs(
  _filters: AnalyticsFilters = {}
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
  return {
    totalSpend: 0,
    totalImpressions: 0,
    totalClicks: 0,
    totalLeads: 0,
    totalRevenue: 0,
    avgCPC: 0,
    avgCPL: 0,
    avgCTR: 0,
    avgROAS: 0,
  };
}

export async function seedDemoData(): Promise<void> {
  console.log('Demo data seeding not available - analytics tables not yet created');
}
