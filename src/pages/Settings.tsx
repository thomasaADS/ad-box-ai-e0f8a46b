import { useState } from "react";
import { TopNav } from "@/components/TopNav";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Save, Key, Palette, Upload, ExternalLink, CheckCircle2, ImagePlus } from "lucide-react";
import { toast } from "sonner";

export default function Settings() {
  const [brandAssets, setBrandAssets] = useState({
    name: "",
    tagline: "",
    description: "",
    logo: "",
    brandImages: [] as string[], // תמונות נוספות למותג
    primaryColor: "#4F46E5",
    secondaryColor: "#3B82F6",
    accentColor: "#8B5CF6",
  });

  const [apiCredentials, setApiCredentials] = useState({
    // Meta (Facebook/Instagram)
    metaAccessToken: "",
    metaAdAccountId: "",
    metaPageId: "",
    
    // Google Ads
    googleClientId: "",
    googleClientSecret: "",
    googleDeveloperToken: "",
    googleCustomerId: "",
    
    // TikTok
    tiktokAccessToken: "",
    tiktokAdvertiserId: "",
    
    // Twitter/X
    twitterApiKey: "",
    twitterApiSecret: "",
    twitterBearerToken: "",
    
    // YouTube
    youtubeApiKey: "",
    youtubeChannelId: "",
    
    // Taboola
    taboolaClientId: "",
    taboolaClientSecret: "",
    taboolaAccountId: "",
    
    // Outbrain
    outbrainApiKey: "",
    outbrainMarketerId: "",
    
    // AI Services
    openaiApiKey: "",
    leonardoApiKey: "",
  });

  const handleSaveBrand = () => {
    // TODO: Save to Supabase
    toast.success("נכסי המותג נשמרו בהצלחה!");
  };

  const handleSaveCredentials = () => {
    // TODO: Save to Supabase (encrypted)
    toast.success("אישורי API נשמרו בהצלחה!");
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">הגדרות</h1>
            <p className="text-muted-foreground">
              הגדר את המותג שלך ואינטגרציות עם פלטפורמות הפרסום
            </p>
          </div>

          <Tabs defaultValue="brand" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 h-12">
              <TabsTrigger value="brand" className="flex items-center gap-2">
                <Palette className="w-4 h-4" />
                <span className="font-semibold">נכסי מותג</span>
              </TabsTrigger>
              <TabsTrigger value="api" className="flex items-center gap-2">
                <Key className="w-4 h-4" />
                <span className="font-semibold">חיבורי API</span>
              </TabsTrigger>
            </TabsList>

            {/* Brand Assets */}
            <TabsContent value="brand">
              <Card className="p-8 shadow-lg border border-border/50">
                <div className="space-y-8">
                  {/* Basic Info */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2">מידע בסיסי</h3>
                    
                  <div className="space-y-2">
                      <Label htmlFor="brandName">שם המותג *</Label>
                    <Input
                      id="brandName"
                      value={brandAssets.name}
                        onChange={(e) => setBrandAssets({ ...brandAssets, name: e.target.value })}
                        placeholder="לדוגמה: קפה השכונה"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tagline">סלוגן</Label>
                      <Input
                        id="tagline"
                        value={brandAssets.tagline}
                        onChange={(e) => setBrandAssets({ ...brandAssets, tagline: e.target.value })}
                        placeholder="לדוגמה: הקפה הטוב ביותר בעיר"
                    />
                  </div>

                  <div className="space-y-2">
                      <Label htmlFor="description">תיאור המותג</Label>
                      <Textarea
                        id="description"
                        value={brandAssets.description}
                        onChange={(e) => setBrandAssets({ ...brandAssets, description: e.target.value })}
                        placeholder="תאר את המותג שלך, מה ייחודי בו, למי הוא מיועד..."
                        rows={4}
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Visual Identity */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2">זהות ויזואלית</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="logo">לוגו המותג</Label>
                      <div className="space-y-3">
                        {/* Upload Logo */}
                        <div className="flex items-center gap-2">
                          <Input
                            id="logoFile"
                            type="file"
                            accept="image/*"
                            className="flex-1"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                // TODO: Upload to storage and get URL
                                const reader = new FileReader();
                                reader.onload = (e) => {
                                  setBrandAssets({ ...brandAssets, logo: e.target?.result as string });
                                  toast.success("הלוגו הועלה בהצלחה!");
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                          <Button variant="outline" size="icon" onClick={() => document.getElementById('logoFile')?.click()}>
                            <Upload className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        {/* Or URL */}
                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                          </div>
                          <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-card px-2 text-muted-foreground">או</span>
                          </div>
                        </div>
                        
                    <Input
                      id="logo"
                      type="url"
                      value={brandAssets.logo}
                          onChange={(e) => setBrandAssets({ ...brandAssets, logo: e.target.value })}
                      placeholder="https://example.com/logo.png"
                    />
                  </div>

                      {brandAssets.logo && (
                        <div className="mt-3 p-4 border-2 border-dashed rounded-lg bg-muted/30 flex items-center justify-center">
                          <img src={brandAssets.logo} alt="Logo preview" className="h-20 object-contain" />
                        </div>
                      )}
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="primaryColor">צבע ראשי</Label>
                      <div className="flex gap-2">
                        <Input
                          id="primaryColor"
                          type="color"
                          value={brandAssets.primaryColor}
                            onChange={(e) => setBrandAssets({ ...brandAssets, primaryColor: e.target.value })}
                            className="w-16 h-10 cursor-pointer"
                        />
                        <Input
                          value={brandAssets.primaryColor}
                            onChange={(e) => setBrandAssets({ ...brandAssets, primaryColor: e.target.value })}
                            className="flex-1 font-mono"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="secondaryColor">צבע משני</Label>
                      <div className="flex gap-2">
                        <Input
                          id="secondaryColor"
                          type="color"
                          value={brandAssets.secondaryColor}
                            onChange={(e) => setBrandAssets({ ...brandAssets, secondaryColor: e.target.value })}
                            className="w-16 h-10 cursor-pointer"
                        />
                        <Input
                          value={brandAssets.secondaryColor}
                            onChange={(e) => setBrandAssets({ ...brandAssets, secondaryColor: e.target.value })}
                            className="flex-1 font-mono"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="accentColor">צבע הדגשה</Label>
                        <div className="flex gap-2">
                          <Input
                            id="accentColor"
                            type="color"
                            value={brandAssets.accentColor}
                            onChange={(e) => setBrandAssets({ ...brandAssets, accentColor: e.target.value })}
                            className="w-16 h-10 cursor-pointer"
                          />
                          <Input
                            value={brandAssets.accentColor}
                            onChange={(e) => setBrandAssets({ ...brandAssets, accentColor: e.target.value })}
                            className="flex-1 font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Brand Images Gallery */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">גלריית תמונות למותג</h3>
                        <p className="text-sm text-muted-foreground">העלה תמונות שישמשו במודעות (מוצרים, אווירה, לוגו)</p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => document.getElementById('brandImagesInput')?.click()}
                      >
                        <ImagePlus className="w-4 h-4 mr-2" />
                        הוסף תמונות
                      </Button>
                      <input
                        id="brandImagesInput"
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={(e) => {
                          const files = Array.from(e.target.files || []);
                          files.forEach(file => {
                            const reader = new FileReader();
                            reader.onload = (e) => {
                              setBrandAssets({
                                ...brandAssets,
                                brandImages: [...brandAssets.brandImages, e.target?.result as string]
                              });
                            };
                            reader.readAsDataURL(file);
                          });
                          toast.success(`${files.length} תמונות הועלו בהצלחה!`);
                        }}
                      />
                    </div>
                    
                    {brandAssets.brandImages.length > 0 ? (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {brandAssets.brandImages.map((img, idx) => (
                          <div key={idx} className="relative group">
                            <img 
                              src={img} 
                              alt={`Brand image ${idx + 1}`} 
                              className="w-full h-32 object-cover rounded-lg border-2 border-border"
                            />
                            <button
                              onClick={() => {
                                setBrandAssets({
                                  ...brandAssets,
                                  brandImages: brandAssets.brandImages.filter((_, i) => i !== idx)
                                });
                                toast.success("התמונה הוסרה");
                              }}
                              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="border-2 border-dashed rounded-lg p-12 text-center">
                        <ImagePlus className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                        <p className="text-muted-foreground">אין תמונות עדיין</p>
                        <p className="text-sm text-muted-foreground mt-1">לחץ על "הוסף תמונות" להעלאת תמונות למותג</p>
                      </div>
                    )}
                  </div>

                  <Button
                    onClick={handleSaveBrand}
                    className="w-full bg-indigo-600 hover:bg-indigo-700"
                    size="lg"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    שמור נכסי מותג
                  </Button>
                </div>
              </Card>
            </TabsContent>

            {/* API Credentials */}
            <TabsContent value="api">
                <div className="space-y-6">
                {/* Meta (Facebook/Instagram) */}
                <Card className="p-6 shadow-lg border border-border/50">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-950 flex items-center justify-center">
                        <span className="text-xl">📱</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Meta (Facebook & Instagram)</h3>
                        <p className="text-sm text-muted-foreground">חבר את חשבון הפרסום שלך במטא</p>
                      </div>
                    </div>
                    <a 
                      href="https://business.facebook.com/settings/system-users" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-indigo-600 hover:underline flex items-center gap-1"
                    >
                      קבל אסימון <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="space-y-4">
                  <div className="space-y-2">
                      <Label htmlFor="metaToken">Access Token</Label>
                    <Input
                      id="metaToken"
                      type="password"
                      value={apiCredentials.metaAccessToken}
                        onChange={(e) => setApiCredentials({ ...apiCredentials, metaAccessToken: e.target.value })}
                        placeholder="EAAxxxxxxxxx..."
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="metaAccountId">Ad Account ID</Label>
                        <Input
                          id="metaAccountId"
                          value={apiCredentials.metaAdAccountId}
                          onChange={(e) => setApiCredentials({ ...apiCredentials, metaAdAccountId: e.target.value })}
                          placeholder="act_XXXXXXXX"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="metaPageId">Page ID</Label>
                        <Input
                          id="metaPageId"
                          value={apiCredentials.metaPageId}
                          onChange={(e) => setApiCredentials({ ...apiCredentials, metaPageId: e.target.value })}
                          placeholder="XXXXXXXXXX"
                        />
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Google Ads */}
                <Card className="p-6 shadow-lg border border-border/50">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-950 flex items-center justify-center">
                        <span className="text-xl">🔍</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Google Ads</h3>
                        <p className="text-sm text-muted-foreground">חבר את חשבון Google Ads</p>
                      </div>
                    </div>
                    <a 
                      href="https://developers.google.com/google-ads/api" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-indigo-600 hover:underline flex items-center gap-1"
                    >
                      מדריך <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="googleClientId">Client ID</Label>
                        <Input
                          id="googleClientId"
                          value={apiCredentials.googleClientId}
                          onChange={(e) => setApiCredentials({ ...apiCredentials, googleClientId: e.target.value })}
                          placeholder="xxxxx.apps.googleusercontent.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="googleClientSecret">Client Secret</Label>
                        <Input
                          id="googleClientSecret"
                          type="password"
                          value={apiCredentials.googleClientSecret}
                          onChange={(e) => setApiCredentials({ ...apiCredentials, googleClientSecret: e.target.value })}
                          placeholder="GOCSPX-xxxxx"
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="googleDeveloperToken">Developer Token</Label>
                        <Input
                          id="googleDeveloperToken"
                          type="password"
                          value={apiCredentials.googleDeveloperToken}
                          onChange={(e) => setApiCredentials({ ...apiCredentials, googleDeveloperToken: e.target.value })}
                          placeholder="xxxxxxxxxxxxx"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="googleCustomerId">Customer ID</Label>
                        <Input
                          id="googleCustomerId"
                          value={apiCredentials.googleCustomerId}
                          onChange={(e) => setApiCredentials({ ...apiCredentials, googleCustomerId: e.target.value })}
                          placeholder="123-456-7890"
                        />
                      </div>
                    </div>
                  </div>
                </Card>

                {/* TikTok */}
                <Card className="p-6 shadow-lg border border-border/50">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-pink-100 dark:bg-pink-950 flex items-center justify-center">
                        <span className="text-xl">🎵</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">TikTok</h3>
                        <p className="text-sm text-muted-foreground">חבר את TikTok Ads Manager</p>
                      </div>
                    </div>
                    <a 
                      href="https://ads.tiktok.com/marketing_api/" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-indigo-600 hover:underline flex items-center gap-1"
                    >
                      מדריך <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="tiktokToken">Access Token</Label>
                      <Input
                        id="tiktokToken"
                        type="password"
                        value={apiCredentials.tiktokAccessToken}
                        onChange={(e) => setApiCredentials({ ...apiCredentials, tiktokAccessToken: e.target.value })}
                        placeholder="xxxxxxxxxx"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tiktokAdvertiser">Advertiser ID</Label>
                      <Input
                        id="tiktokAdvertiser"
                        value={apiCredentials.tiktokAdvertiserId}
                        onChange={(e) => setApiCredentials({ ...apiCredentials, tiktokAdvertiserId: e.target.value })}
                        placeholder="XXXXXXXXXX"
                      />
                    </div>
                  </div>
                </Card>

                {/* Twitter/X */}
                <Card className="p-6 shadow-lg border border-border/50">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-sky-100 dark:bg-sky-950 flex items-center justify-center">
                        <span className="text-xl">🐦</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Twitter / X</h3>
                        <p className="text-sm text-muted-foreground">חבר את Twitter Ads</p>
                      </div>
                    </div>
                    <a 
                      href="https://developer.twitter.com/en/portal/dashboard" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-indigo-600 hover:underline flex items-center gap-1"
                    >
                      Portal <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="twitterApiKey">API Key</Label>
                        <Input
                          id="twitterApiKey"
                          type="password"
                          value={apiCredentials.twitterApiKey}
                          onChange={(e) => setApiCredentials({ ...apiCredentials, twitterApiKey: e.target.value })}
                          placeholder="xxxxxxxxxx"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="twitterApiSecret">API Secret</Label>
                        <Input
                          id="twitterApiSecret"
                          type="password"
                          value={apiCredentials.twitterApiSecret}
                          onChange={(e) => setApiCredentials({ ...apiCredentials, twitterApiSecret: e.target.value })}
                          placeholder="xxxxxxxxxx"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="twitterBearer">Bearer Token</Label>
                      <Input
                        id="twitterBearer"
                        type="password"
                        value={apiCredentials.twitterBearerToken}
                        onChange={(e) => setApiCredentials({ ...apiCredentials, twitterBearerToken: e.target.value })}
                        placeholder="AAAAxxxxxxxxxx"
                      />
                    </div>
                  </div>
                </Card>

                {/* YouTube */}
                <Card className="p-6 shadow-lg border border-border/50">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-950 flex items-center justify-center">
                        <span className="text-xl">▶️</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">YouTube</h3>
                        <p className="text-sm text-muted-foreground">חבר את YouTube Ads (דרך Google Ads)</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="youtubeApi">YouTube API Key</Label>
                        <Input
                          id="youtubeApi"
                          type="password"
                          value={apiCredentials.youtubeApiKey}
                          onChange={(e) => setApiCredentials({ ...apiCredentials, youtubeApiKey: e.target.value })}
                          placeholder="AIzaxxxxxxxx"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="youtubeChannel">Channel ID</Label>
                        <Input
                          id="youtubeChannel"
                          value={apiCredentials.youtubeChannelId}
                          onChange={(e) => setApiCredentials({ ...apiCredentials, youtubeChannelId: e.target.value })}
                          placeholder="UCxxxxxxxx"
                        />
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Taboola */}
                <Card className="p-6 shadow-lg border border-border/50">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-950 flex items-center justify-center">
                        <span className="text-xl">📰</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Taboola</h3>
                        <p className="text-sm text-muted-foreground">חבר את Taboola Ads</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="taboolaClient">Client ID</Label>
                        <Input
                          id="taboolaClient"
                          value={apiCredentials.taboolaClientId}
                          onChange={(e) => setApiCredentials({ ...apiCredentials, taboolaClientId: e.target.value })}
                          placeholder="xxxxxxxx"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="taboolaSecret">Client Secret</Label>
                        <Input
                          id="taboolaSecret"
                          type="password"
                          value={apiCredentials.taboolaClientSecret}
                          onChange={(e) => setApiCredentials({ ...apiCredentials, taboolaClientSecret: e.target.value })}
                          placeholder="xxxxxxxx"
                        />
                      </div>
                  <div className="space-y-2">
                        <Label htmlFor="taboolaAccount">Account ID</Label>
                    <Input
                          id="taboolaAccount"
                          value={apiCredentials.taboolaAccountId}
                          onChange={(e) => setApiCredentials({ ...apiCredentials, taboolaAccountId: e.target.value })}
                          placeholder="xxxxxxxx"
                        />
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Outbrain */}
                <Card className="p-6 shadow-lg border border-border/50">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-950 flex items-center justify-center">
                        <span className="text-xl">📊</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Outbrain</h3>
                        <p className="text-sm text-muted-foreground">חבר את Outbrain Amplify</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                        <Label htmlFor="outbrainApi">API Key</Label>
                    <Input
                          id="outbrainApi"
                      type="password"
                          value={apiCredentials.outbrainApiKey}
                          onChange={(e) => setApiCredentials({ ...apiCredentials, outbrainApiKey: e.target.value })}
                          placeholder="xxxxxxxx"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="outbrainMarketer">Marketer ID</Label>
                        <Input
                          id="outbrainMarketer"
                          value={apiCredentials.outbrainMarketerId}
                          onChange={(e) => setApiCredentials({ ...apiCredentials, outbrainMarketerId: e.target.value })}
                          placeholder="00xxxxxxxxxx"
                        />
                      </div>
                    </div>
                  </div>
                </Card>

                {/* AI Services */}
                <Card className="p-6 shadow-lg border border-border/50 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/20 dark:to-purple-950/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center">
                      <span className="text-xl">🤖</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">שירותי AI</h3>
                      <p className="text-sm text-muted-foreground">לייצור תוכן ותמונות</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="openai">OpenAI API Key</Label>
                    <Input
                      id="openai"
                      type="password"
                      value={apiCredentials.openaiApiKey}
                          onChange={(e) => setApiCredentials({ ...apiCredentials, openaiApiKey: e.target.value })}
                      placeholder="sk-..."
                    />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="leonardo">Leonardo API Key</Label>
                        <Input
                          id="leonardo"
                          type="password"
                          value={apiCredentials.leonardoApiKey}
                          onChange={(e) => setApiCredentials({ ...apiCredentials, leonardoApiKey: e.target.value })}
                          placeholder="xxxxxxxx"
                        />
                      </div>
                    </div>
                  </div>
                </Card>

                  <Button
                    onClick={handleSaveCredentials}
                  className="w-full bg-indigo-600 hover:bg-indigo-700"
                  size="lg"
                  >
                    <Save className="w-4 h-4 mr-2" />
                  שמור את כל החיבורים
                  </Button>
                </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
