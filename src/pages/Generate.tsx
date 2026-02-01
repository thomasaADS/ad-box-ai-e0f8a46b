import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TopNav } from "@/components/TopNav";
import { VariantCard } from "@/components/VariantCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, ArrowLeft, Sparkles, Wand2, CheckCircle, Save } from "lucide-react";
import { toast } from "sonner";
import { generateCampaign, publishToMeta, generateImageUrl, type AdVariant, type Platform } from "@/lib/api";
import { generateCampaignWithAI } from "@/lib/gemini";

export default function Generate() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [variants, setVariants] = useState<AdVariant[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | 'all'>('all');

  useEffect(() => {
    // Try sessionStorage first, then localStorage as fallback
    let briefData = sessionStorage.getItem("briefData");
    if (!briefData) {
      // Fallback: try localStorage campaignBrief and convert format
      const localBrief = localStorage.getItem("campaignBrief");
      if (localBrief) {
        try {
          const parsed = JSON.parse(localBrief);
          const converted = {
            brandName: parsed.businessName || 'העסק שלי',
            industry: parsed.businessType || 'שירותים',
            city: parsed.location || 'ישראל',
            offer: parsed.specialOffers || parsed.goals || 'שירות מקצועי',
            tone: parsed.tone || 'professional',
            platforms: parsed.platforms || ['meta', 'google'],
            objective: parsed.goals || 'TRAFFIC',
            language: 'he',
            targetAudience: parsed.targetAudience || '',
            ageRange: parsed.ageRange || '',
            budget: parsed.budget || '',
          };
          briefData = JSON.stringify(converted);
          sessionStorage.setItem("briefData", briefData);
        } catch {
          // Invalid data
        }
      }
    }

    if (!briefData) {
      navigate("/brief");
      return;
    }

    generateVariants(JSON.parse(briefData));
  }, [navigate]);

  const generateVariants = async (briefData: any) => {
    try {
      setLoading(true);

      // Try to use Gemini AI first, fallback to mock if it fails
      let result;
      try {
        const aiResult = await generateCampaignWithAI({
          brandName: briefData.brandName || "העסק שלך",
          industry: briefData.industry,
          city: briefData.city,
          offer: briefData.offer,
          tone: briefData.tone || 'professional',
          platforms: briefData.platforms || ['meta', 'google'],
          objective: briefData.objective || 'TRAFFIC',
          language: 'he',
        });

        // Add platform, final URL, and AI-generated images to each variant
        const enhancedVariants = aiResult.variants.map((v: any, idx: number) => ({
          ...v,
          final_url: briefData.website || briefData.whatsapp || '#',
          utm: {
            source: v.platform,
            medium: 'cpc',
            campaign: `${briefData.brandName}-${briefData.city}`.toLowerCase().replace(/\s+/g, '-'),
            content: `${v.platform}-ai-variant`,
          },
          image_urls: generateImageUrl(briefData.industry || '', v.platform, idx),
        }));

        setVariants(enhancedVariants);
        toast.success(`נוצרו ${enhancedVariants.length} וריאנטים עם AI`, {
          description: 'המודעות נוצרו על ידי Gemini AI',
        });
      } catch (aiError) {
        console.warn('AI generation failed, using fallback:', aiError);
        
        // Fallback to mock generation
        result = await generateCampaign({
          brand: {
            name: briefData.brandName || "העסק שלך",
            website: briefData.website,
            tone: briefData.tone,
            langs: briefData.languages || ['he'],
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
        toast.success(`נוצרו ${result.variants?.length || 0} וריאנטים!`, {
          description: 'חבר Gemini API כדי לקבל תוכן מותאם אישית',
        });
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

  const handleSaveCampaign = () => {
    if (variants.length === 0) return;

    const briefData = sessionStorage.getItem("briefData");
    const brief = briefData ? JSON.parse(briefData) : {};

    const campaign = {
      id: Date.now().toString(),
      name: `קמפיין ${brief.brandName || 'חדש'} - ${new Date().toLocaleDateString('he-IL')}`,
      brand: brief.brandName || 'העסק שלי',
      status: 'draft' as const,
      budget: brief.budget || '-',
      spent: '0₪',
      impressions: 0,
      clicks: 0,
      conversions: 0,
      platform: [...new Set(variants.map(v => v.platform))],
      createdAt: new Date().toISOString(),
      objective: brief.objective || brief.offer || '',
      variants: variants,
    };

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem('savedCampaigns') || '[]');
    existing.unshift(campaign);
    localStorage.setItem('savedCampaigns', JSON.stringify(existing));

    toast.success('הקמפיין נשמר בהצלחה!', {
      description: 'תוכל למצוא אותו בעמוד "הקמפיינים שלי"',
    });
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
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
        <TopNav />
        <main className="container mx-auto px-4 py-20">
          <div className="flex flex-col items-center justify-center min-h-[500px]">
            <div className="relative">
              <div className="absolute inset-0 animate-ping">
                <Sparkles className="w-16 h-16 text-primary opacity-20" />
              </div>
              <Wand2 className="w-16 h-16 text-primary animate-bounce relative z-10" />
            </div>
            <h2 className="text-3xl font-bold mt-8 mb-3 gradient-text">
              <Sparkles className="w-5 h-5 inline ml-1 animate-pulse" />
              הקסם קורה עכשיו...
            </h2>
            <p className="text-muted-foreground text-lg mb-4">
              Gemini AI יוצר עבורך קמפיינים מקצועיים וקריאטיביים
            </p>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground max-w-md text-center mt-4">
              <p className="flex items-center gap-2 justify-center">
                <Loader2 className="w-4 h-4 animate-spin" />
                מנתח את פרטי העסק שלך...
              </p>
              <p className="flex items-center gap-2 justify-center">
                <Loader2 className="w-4 h-4 animate-spin" />
                יוצר כותרות מושכות ותוכן מקצועי...
              </p>
              <p className="flex items-center gap-2 justify-center">
                <Loader2 className="w-4 h-4 animate-spin" />
                מתאים לפלטפורמות שונות...
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <TopNav />
      
      <main className="container mx-auto px-3 sm:px-4 py-6 sm:py-12">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/brief")}
            className="mb-3 sm:mb-4 hover-lift"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            חזרה לשאלות
          </Button>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-2xl gradient-boosti-cta shadow-glow">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold gradient-text">
                <CheckCircle className="w-6 h-6 inline ml-2" />
                הקמפיינים שלך מוכנים
              </h1>
              <p className="text-muted-foreground text-lg mt-2">
                {variants.length} וריאציות מודעות מקצועיות: {Object.entries(variantsByPlatform).map(([p, c]) => `${c} ${p}`).join(' · ')}
              </p>
            </div>
            <Button
              onClick={handleSaveCampaign}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white gap-2"
            >
              <Save className="w-5 h-5" />
              שמור קמפיין
            </Button>
          </div>
        </div>

        {/* Platform Filters */}
        <Tabs value={selectedPlatform} onValueChange={(v) => setSelectedPlatform(v as Platform | 'all')} className="mb-6">
          <TabsList>
            <TabsTrigger value="all">הכל ({variants.length})</TabsTrigger>
            {Object.entries(variantsByPlatform).map(([platform, count]) => (
              <TabsTrigger key={platform} value={platform}>
                {platform.charAt(0).toUpperCase() + platform.slice(1)} ({count})
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Variants Grid */}
        {filteredVariants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
