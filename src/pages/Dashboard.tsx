import { TopNav } from "@/components/TopNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Eye, MousePointerClick, DollarSign, Plus, FileText } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { ChatWidget } from "@/components/ChatWidget";
import { LoadingSpinner } from "@/components/LoadingSpinner";

interface Campaign {
  id: string;
  brand_name: string;
  platforms: string[];
  objective: string;
  budget: number;
  created_at: string;
}

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadCampaigns();
    }
  }, [user]);

  const loadCampaigns = async () => {
    try {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCampaigns(data || []);
    } catch (error) {
      console.error('Error loading campaigns:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    {
      label: "קמפיינים שנוצרו",
      value: campaigns.length.toString(),
      change: "+100%",
      icon: FileText,
      color: "text-accent",
    },
    {
      label: "פלטפורמות בשימוש",
      value: new Set(campaigns.flatMap(c => c.platforms || [])).size.toString(),
      change: "+20%",
      icon: MousePointerClick,
      color: "text-success",
    },
    {
      label: "תקציב כולל",
      value: `$${campaigns.reduce((sum, c) => sum + (c.budget || 0), 0).toLocaleString()}`,
      change: "+15%",
      icon: DollarSign,
      color: "text-primary",
    },
    {
      label: "מטרות שונות",
      value: new Set(campaigns.map(c => c.objective)).size.toString(),
      change: "+10%",
      icon: TrendingUp,
      color: "text-muted-foreground",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <TopNav />
        <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[60vh]">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      
      <main className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">לוח בקרת קמפיינים</h1>
            <p className="text-muted-foreground text-lg">
              ניהול וניטור הקמפיינים שלך
            </p>
          </div>
          <Button onClick={() => navigate('/brief')} size="lg">
            <Plus className="w-5 h-5 ml-2" />
            קמפיין חדש
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="p-6 glass-card hover-scale animate-fade-in">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-muted/30 ${stat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <Badge variant={stat.change.startsWith("+") ? "default" : "secondary"}>
                    {stat.change}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Campaigns */}
        <Card className="glass-card">
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-6">הקמפיינים שלי</h2>
            
            {campaigns.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">עוד לא יצרת קמפיינים</h3>
                <p className="text-muted-foreground mb-6">
                  התחל עכשיו ליצור את הקמפיין הראשון שלך
                </p>
                <Button onClick={() => navigate('/brief')}>
                  <Plus className="w-5 h-5 ml-2" />
                  צור קמפיין חדש
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <Card
                    key={campaign.id}
                    className="p-6 bg-muted/20 hover:bg-muted/30 transition-colors cursor-pointer"
                    onClick={() => navigate('/generate', { state: { campaign } })}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">{campaign.brand_name}</h3>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {(campaign.platforms || []).map((platform) => (
                            <Badge key={platform} variant="outline">
                              {platform}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>תקציב: ${campaign.budget}</span>
                          <span>מטרה: {campaign.objective}</span>
                          <span>
                            נוצר: {new Date(campaign.created_at).toLocaleDateString('he-IL')}
                          </span>
                        </div>
                      </div>
                      <Button variant="outline">
                        צפה
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </Card>
      </main>
      
      <ChatWidget />
    </div>
  );
}
