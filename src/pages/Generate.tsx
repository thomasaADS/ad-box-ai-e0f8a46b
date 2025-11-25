import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TopNav } from "@/components/TopNav";
import { VariantCard } from "@/components/VariantCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Loader2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { generateCampaign, publishToMeta, type AdVariant, type Platform } from "@/lib/api";

export default function Generate() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [variants, setVariants] = useState<AdVariant[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | 'all'>('all');

  useEffect(() => {
    const briefData = sessionStorage.getItem("briefData");
    if (!briefData) {
      toast.error("אנא מלא תחילה את פרטי הקמפיין");
      navigate("/brief");
      return;
    }

    generateVariants(JSON.parse(briefData));
  }, [navigate]);

  const generateVariants = async (briefData: any) => {
    try {
      setLoading(true);

      const result = await generateCampaign({
        brand: {
          name: briefData.brandName || "העסק שלך",
          website: briefData.website,
          tone: briefData.tone,
          langs: briefData.languages,
          whatsapp: briefData.whatsapp,
        },
        brief: {
          industry: briefData.industry,
          city: briefData.city,
          offer: briefData.offer,
          objective: briefData.objective,
          platforms: briefData.platforms,
        },
      });

      setVariants(result.variants || []);
      
      if (result.variants?.length > 0) {
        toast.success(`נוצרו ${result.variants.length} וריאנטים של מודעות!`);
      }
    } catch (error) {
      console.error("Generation error:", error);
      toast.error("יצירת הוריאנטים נכשלה. אנא נסה שוב.");
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async (variant: AdVariant) => {
    const platformName = variant.platform.charAt(0).toUpperCase() + variant.platform.slice(1);
    const loadingToast = toast.loading(`מפרסם ל-${platformName}...`);
    
    try {
      const result = await publishToMeta(variant);
      toast.success(`המודעה נוצרה כטיוטה ב-${platformName}!`, { id: loadingToast });
      console.log("Publish result:", result);
    } catch (error) {
      console.error("Publish error:", error);
      toast.error("הפרסום נכשל. בדוק את הקונסול לפרטים נוספים.", { id: loadingToast });
    }
  };

  const filteredVariants = selectedPlatform === 'all' 
    ? variants 
    : variants.filter(v => v.platform === selectedPlatform);

  const variantsByPlatform = variants.reduce((acc, v) => {
    acc[v.platform] = (acc[v.platform] || 0) + 1;
    return acc;
  }, {} as Record<Platform, number>);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <TopNav />
        <main className="container mx-auto px-4 py-20">
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
            <h2 className="text-2xl font-semibold mb-2">יוצר את הקמפיין שלך...</h2>
            <p className="text-muted-foreground">ה-AI יוצר עבורך וריאנטים מושלמים</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      
      <main className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/brief")}
            className="mb-4 hover:bg-purple-500/10 hover:text-purple-500 transition-all"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            חזרה לברייף
          </Button>
          
          <h1 className="text-4xl font-bold mb-2">הוריאנטים שנוצרו</h1>
          <p className="text-muted-foreground text-lg">
            {variants.length} וריאציות מודעות: {Object.entries(variantsByPlatform).map(([p, c]) => `${c} ${p}`).join(' · ')}
          </p>
        </div>

        {/* Platform Filters */}
        <Tabs value={selectedPlatform} onValueChange={(v) => setSelectedPlatform(v as Platform | 'all')} className="mb-6">
          <TabsList>
            <TabsTrigger value="all">🎯 הכל ({variants.length})</TabsTrigger>
            {Object.entries(variantsByPlatform).map(([platform, count]) => {
              const icons: Record<Platform, string> = {
                meta: '📱',
                google: '🔍',
                tiktok: '🎵',
                twitter: '🐦',
                youtube: '▶️',
                taboola: '📰',
                outbrain: '📊',
                linkedin: '💼',
                sms: '💬',
                email: '📧'
              };
              return (
                <TabsTrigger key={platform} value={platform}>
                  {icons[platform as Platform]} {platform.charAt(0).toUpperCase() + platform.slice(1)} ({count})
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>

        {/* Variants Grid */}
        {filteredVariants.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVariants.map((variant, idx) => (
              <VariantCard
                key={idx}
                variant={variant}
                onRegenerateHeadline={() => {
                  toast.info("תכונת יצירה מחדש בקרוב!");
                }}
                onPublish={() => handlePublish(variant)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              לא נוצרו וריאנטים. אנא נסה שוב.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
