export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      ad_accounts: {
        Row: {
          id: string
          user_id: string
          name: string
          platform: Database["public"]["Enums"]["ad_platform"]
          currency: string
          external_account_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          platform: Database["public"]["Enums"]["ad_platform"]
          currency?: string
          external_account_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          platform?: Database["public"]["Enums"]["ad_platform"]
          currency?: string
          external_account_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      campaigns: {
        Row: {
          brand_name: string
          budget: number | null
          city: string | null
          created_at: string
          id: string
          industry: string | null
          languages: string[] | null
          objective: string | null
          offer: string | null
          platforms: string[] | null
          tone: string | null
          updated_at: string
          user_id: string
          website: string | null
        }
        Insert: {
          brand_name: string
          budget?: number | null
          city?: string | null
          created_at?: string
          id?: string
          industry?: string | null
          languages?: string[] | null
          objective?: string | null
          offer?: string | null
          platforms?: string[] | null
          tone?: string | null
          updated_at?: string
          user_id: string
          website?: string | null
        }
        Update: {
          brand_name?: string
          budget?: number | null
          city?: string | null
          created_at?: string
          id?: string
          industry?: string | null
          languages?: string[] | null
          objective?: string | null
          offer?: string | null
          platforms?: string[] | null
          tone?: string | null
          updated_at?: string
          user_id?: string
          website?: string | null
        }
        Relationships: []
      }
      campaigns_analytics: {
        Row: {
          id: string
          ad_account_id: string
          user_id: string
          name: string
          objective: string | null
          status: Database["public"]["Enums"]["campaign_status"] | null
          country: string | null
          created_at: string
          start_date: string | null
          end_date: string | null
          updated_at: string
          external_campaign_id: string | null
        }
        Insert: {
          id?: string
          ad_account_id: string
          user_id: string
          name: string
          objective?: string | null
          status?: Database["public"]["Enums"]["campaign_status"] | null
          country?: string | null
          created_at?: string
          start_date?: string | null
          end_date?: string | null
          updated_at?: string
          external_campaign_id?: string | null
        }
        Update: {
          id?: string
          ad_account_id?: string
          user_id?: string
          name?: string
          objective?: string | null
          status?: Database["public"]["Enums"]["campaign_status"] | null
          country?: string | null
          created_at?: string
          start_date?: string | null
          end_date?: string | null
          updated_at?: string
          external_campaign_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaigns_analytics_ad_account_id_fkey"
            columns: ["ad_account_id"]
            isOneToOne: false
            referencedRelation: "ad_accounts"
            referencedColumns: ["id"]
          }
        ]
      }
      campaign_stats_daily: {
        Row: {
          id: string
          campaign_id: string
          date: string
          impressions: number
          clicks: number
          spend: number
          leads: number
          purchases: number | null
          revenue: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          campaign_id: string
          date: string
          impressions?: number
          clicks?: number
          spend?: number
          leads?: number
          purchases?: number | null
          revenue?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          campaign_id?: string
          date?: string
          impressions?: number
          clicks?: number
          spend?: number
          leads?: number
          purchases?: number | null
          revenue?: number | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "campaign_stats_daily_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns_analytics"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          company_name: string | null
          created_at: string
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          company_name?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          company_name?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      campaign_metrics: {
        Row: {
          id: string
          name: string
          ad_account_id: string
          user_id: string
          objective: string | null
          status: Database["public"]["Enums"]["campaign_status"] | null
          country: string | null
          start_date: string | null
          end_date: string | null
          platform: Database["public"]["Enums"]["ad_platform"] | null
          account_name: string | null
          total_impressions: number
          total_clicks: number
          total_spend: number
          total_leads: number
          total_purchases: number
          total_revenue: number
          ctr: number
          cpc: number
          cpl: number
          roas: number
        }
        Relationships: []
      }
    }
    Functions: {
      seed_analytics_demo_data: {
        Args: Record<string, never>
        Returns: undefined
      }
    }
    Enums: {
      ad_platform: "facebook" | "google" | "tiktok" | "taboola" | "outbrain" | "linkedin" | "other"
      campaign_status: "active" | "paused" | "deleted" | "completed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      ad_platform: ["facebook", "google", "tiktok", "taboola", "outbrain", "linkedin", "other"],
      campaign_status: ["active", "paused", "deleted", "completed"],
    },
  },
} as const
