import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TopNav } from "@/components/TopNav";
import { AIBriefAgent } from "@/components/AIBriefAgent";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { ChatWidget } from "@/components/ChatWidget";

interface BriefData {
  brandName?: string;
  industry?: string;
  city?: string;
  offer?: string;
  tone?: string;
  platforms?: string[];
  objective?: string;
  budget?: string;
  website?: string;
  whatsapp?: string;
}

export default function Brief() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleBriefComplete = async (briefData: BriefData) => {
    if (!user) {
      toast.error("יש להתחבר כדי לשמור קמפיין");
      navigate('/auth');
      return;
    }

    try {
      // Save campaign to Supabase
      const { data, error } = await supabase
        .from('campaigns')
        .insert({
          user_id: user.id,
          brand_name: briefData.brandName || "העסק שלי",
          website: briefData.website || "",
          industry: briefData.industry || "",
          city: briefData.city || "",
          offer: briefData.offer || "",
          budget: parseFloat(briefData.budget || "1000"),
          tone: briefData.tone || "professional",
          objective: briefData.objective || "TRAFFIC",
          languages: ["he"],
          platforms: briefData.platforms || ["meta", "google"],
        })
        .select()
        .single();

      if (error) throw error;

      toast.success("הקמפיין נשמר בהצלחה!");

      // Store in sessionStorage to pass to generate page
      sessionStorage.setItem("briefData", JSON.stringify(briefData));
      navigate("/generate", { state: { campaignId: data.id } });
    } catch (error) {
      console.error('Error saving campaign:', error);
      toast.error("שגיאה בשמירת הקמפיין");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <TopNav />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl gradient-boosti-hero shadow-glow mb-6 animate-float">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold mb-4 gradient-text">
              בוא ניצור קמפיין מנצח יחד
            </h1>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
              הסוכן החכם שלנו ישאל כמה שאלות ויצור עבורך קמפיין פרסומי מקצועי וקריאטיבי בדקות ספורות
            </p>
          </div>

          {/* AI Agent */}
          <Card className="p-8 shadow-strong border-border/50 bg-card/80 backdrop-blur-sm">
            <AIBriefAgent onComplete={handleBriefComplete} />
          </Card>
        </div>
      </main>
      <ChatWidget />
    </div>
  );
}
