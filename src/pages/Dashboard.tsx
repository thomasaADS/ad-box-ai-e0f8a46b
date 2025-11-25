import { TopNav } from "@/components/TopNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  TrendingDown,
  Eye, 
  MousePointerClick, 
  DollarSign, 
  Plus, 
  FileText, 
  BarChart3,
  Calendar,
  Target,
  Users,
  Activity,
  Download,
  Filter
} from "lucide-react";
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
  industry?: string;
  city?: string;
}

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

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

  // Mock performance data - בעתיד יגיע מה-API האמיתי
  const performanceData = {
    impressions: 24567,
    clicks: 1234,
    conversions: 89,
    spent: campaigns.reduce((sum, c) => sum + (c.budget || 0), 0) * 30, // Monthly estimate
    ctr: 5.02,
    cpc: 2.45,
    roi: 3.2,
  };

  const stats = [
    {
      label: "קמפיינים פעילים",
      value: campaigns.length.toString(),
      change: "+12%",
      trending: "up",
      icon: Activity,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100 dark:bg-indigo-950",
    },
    {
      label: "חשיפות החודש",
      value: performanceData.impressions.toLocaleString(),
      change: "+24%",
      trending: "up",
      icon: Eye,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-950",
    },
    {
      label: "קליקים",
      value: performanceData.clicks.toLocaleString(),
      change: "+18%",
      trending: "up",
      icon: MousePointerClick,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-950",
    },
    {
      label: "המרות",
      value: performanceData.conversions.toString(),
      change: "+32%",
      trending: "up",
      icon: Target,
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-950",
    },
    {
      label: "ROI",
      value: `${performanceData.roi.toFixed(1)}x`,
      change: "+15%",
      trending: "up",
      icon: TrendingUp,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100 dark:bg-emerald-950",
    },
    {
      label: "CTR ממוצע",
      value: `${performanceData.ctr}%`,
      change: "+8%",
      trending: "up",
      icon: BarChart3,
      color: "text-orange-600",
      bgColor: "bg-orange-100 dark:bg-orange-950",
    },
    {
      label: "תקציב שהוצא",
      value: `₪${performanceData.spent.toLocaleString()}`,
      change: "+20%",
      trending: "up",
      icon: DollarSign,
      color: "text-pink-600",
      bgColor: "bg-pink-100 dark:bg-pink-950",
    },
    {
      label: "פלטפורמות",
      value: new Set(campaigns.flatMap(c => c.platforms || [])).size.toString(),
      change: "=",
      trending: "stable",
      icon: Users,
      color: "text-cyan-600",
      bgColor: "bg-cyan-100 dark:bg-cyan-950",
    },
  ];

  // Top performing campaigns
  const topCampaigns = campaigns.slice(0, 5).map((campaign, index) => ({
    ...campaign,
    impressions: Math.floor(Math.random() * 10000) + 5000,
    clicks: Math.floor(Math.random() * 500) + 100,
    conversions: Math.floor(Math.random() * 50) + 10,
    roi: (Math.random() * 5 + 1).toFixed(1),
  }));

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
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">לוח בקרה</h1>
            <p className="text-muted-foreground text-lg">
              סקירה מקיפה של כל הקמפיינים והביצועים שלך
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              ייצוא דוח
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              סינון
            </Button>
            <Button onClick={() => navigate('/brief')} size="lg" className="bg-indigo-600 hover:bg-indigo-700">
              <Plus className="w-5 h-5 mr-2" />
              קמפיין חדש
            </Button>
          </div>
        </div>

        {/* Date Range Selector */}
        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>תקופה:</span>
          <Button variant="outline" size="sm">30 יום אחרונים</Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">סקירה כללית</TabsTrigger>
            <TabsTrigger value="campaigns">קמפיינים</TabsTrigger>
            <TabsTrigger value="analytics">ניתוחים</TabsTrigger>
            <TabsTrigger value="reports">דוחות</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat) => {
                const Icon = stat.icon;
                const TrendIcon = stat.trending === "up" ? TrendingUp : stat.trending === "down" ? TrendingDown : Activity;
                return (
                  <Card key={stat.label} className="p-6 hover:shadow-lg transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                        <Icon className={`w-5 h-5 ${stat.color}`} />
                      </div>
                      <div className={`flex items-center gap-1 text-xs font-semibold ${
                        stat.trending === 'up' ? 'text-green-600' : stat.trending === 'down' ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        <TrendIcon className="w-3 h-3" />
                        {stat.change}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-3xl font-black">{stat.value}</p>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Performance Chart */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="md:col-span-2 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">ביצועים לאורך זמן</h3>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">חשיפות</Badge>
                    <Badge variant="outline">קליקים</Badge>
                    <Badge variant="outline">המרות</Badge>
                  </div>
                </div>
                <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg">
                  <div className="text-center">
                    <BarChart3 className="w-16 h-16 mx-auto mb-3 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">גרף ביצועים יוצג כאן</p>
                    <p className="text-xs text-muted-foreground mt-1">מחובר ל-API Analytics בקרוב</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-6">פילוח לפי פלטפורמה</h3>
                <div className="space-y-4">
                  {['Meta', 'Google Ads', 'TikTok', 'Twitter'].map((platform, index) => {
                    const percentage = [35, 28, 22, 15][index];
                    return (
                      <div key={platform}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">{platform}</span>
                          <span className="text-sm font-bold">{percentage}%</span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-indigo-600 to-purple-600" 
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>

            {/* Top Campaigns */}
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-6">קמפיינים מובילים</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-right py-3 px-4 text-sm font-semibold">שם הקמפיין</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold">פלטפורמות</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold">חשיפות</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold">קליקים</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold">המרות</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold">ROI</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {topCampaigns.length > 0 ? topCampaigns.map((campaign) => (
                      <tr key={campaign.id} className="border-b hover:bg-muted/30 transition-colors">
                        <td className="py-4 px-4">
                          <div>
                            <div className="font-semibold">{campaign.brand_name}</div>
                            <div className="text-xs text-muted-foreground">{campaign.industry || 'כללי'}</div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex gap-1">
                            {(campaign.platforms || []).slice(0, 3).map((p) => (
                              <Badge key={p} variant="outline" className="text-xs">{p}</Badge>
                            ))}
                          </div>
                        </td>
                        <td className="py-4 px-4 font-semibold">{campaign.impressions?.toLocaleString()}</td>
                        <td className="py-4 px-4 font-semibold">{campaign.clicks?.toLocaleString()}</td>
                        <td className="py-4 px-4 font-semibold">{campaign.conversions}</td>
                        <td className="py-4 px-4">
                          <Badge className="bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400">
                            {campaign.roi}x
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => navigate('/generate', { state: { campaign } })}
                          >
                            צפה
                          </Button>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={7} className="py-12 text-center">
                          <FileText className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                          <p className="text-muted-foreground">אין קמפיינים עדיין</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          {/* Campaigns Tab */}
          <TabsContent value="campaigns" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold">כל הקמפיינים ({campaigns.length})</h3>
            </div>

            {campaigns.length === 0 ? (
              <Card className="p-12">
                <div className="text-center">
                  <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">עוד לא יצרת קמפיינים</h3>
                  <p className="text-muted-foreground mb-6">
                    התחל עכשיו ליצור את הקמפיין הראשון שלך
                  </p>
                  <Button onClick={() => navigate('/brief')} size="lg">
                    <Plus className="w-5 h-5 mr-2" />
                    צור קמפיין חדש
                  </Button>
                </div>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {campaigns.map((campaign) => (
                  <Card
                    key={campaign.id}
                    className="p-6 hover:shadow-xl transition-all cursor-pointer border-2 hover:border-indigo-500"
                    onClick={() => navigate('/generate', { state: { campaign } })}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-1">{campaign.brand_name}</h3>
                        <p className="text-sm text-muted-foreground">{campaign.city || 'כל הארץ'}</p>
                      </div>
                      <Badge>{campaign.objective}</Badge>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {(campaign.platforms || []).map((platform) => (
                        <Badge key={platform} variant="outline">
                          {platform}
                        </Badge>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">תקציב</p>
                        <p className="font-bold">₪{campaign.budget}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">נוצר</p>
                        <p className="font-bold text-sm">
                          {new Date(campaign.created_at).toLocaleDateString('he-IL', { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">סטטוס</p>
                        <Badge variant="outline" className="bg-green-100 text-green-700 dark:bg-green-950">
                          פעיל
                        </Badge>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid gap-6">
              <Card className="p-6">
                <h3 className="text-2xl font-bold mb-6">ניתוח מעמיק</h3>
                <div className="h-96 flex items-center justify-center bg-muted/30 rounded-lg">
                  <div className="text-center">
                    <BarChart3 className="w-20 h-20 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-lg font-semibold mb-2">ניתוחים מתקדמים</p>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto">
                      כאן תוכל לראות ניתוחים מפורטים של הקמפיינים שלך, כולל מגמות, תחזיות, והשוואות
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports">
            <Card className="p-6">
              <h3 className="text-2xl font-bold mb-6">דוחות</h3>
              <div className="space-y-4">
                {[
                  { name: 'דוח ביצועים חודשי', date: 'נובמבר 2025', size: '2.4 MB' },
                  { name: 'סיכום קמפיינים', date: 'אוקטובר 2025', size: '1.8 MB' },
                  { name: 'ניתוח ROI', date: 'ספטמבר 2025', size: '3.1 MB' },
                ].map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center">
                        <FileText className="w-6 h-6 text-indigo-600" />
                      </div>
                      <div>
                        <p className="font-semibold">{report.name}</p>
                        <p className="text-sm text-muted-foreground">{report.date} • {report.size}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      הורד
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <ChatWidget />
    </div>
  );
}
