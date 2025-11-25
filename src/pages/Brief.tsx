import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { TopNav } from "@/components/TopNav";
import { Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { ChatWidget } from "@/components/ChatWidget";
import type { Platform } from "@/lib/api";

export default function Brief() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    brandName: "",
    website: "",
    whatsapp: "",
    industry: "",
    city: "",
    offer: "",
    tone: "professional",
    languages: ["he"],
    platforms: ["meta", "google"] as Platform[],
    objective: "TRAFFIC",
    budget: "1000",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.industry || !formData.city || !formData.offer) {
      toast.error("אנא מלא את כל השדות הנדרשים");
      return;
    }

    if (!user) {
      toast.error("יש להתחבר כדי לשמור קמפיין");
      navigate('/auth');
      return;
    }

    setIsSubmitting(true);

    try {
      // Save campaign to Supabase
      const { data, error } = await supabase
        .from('campaigns')
        .insert({
          user_id: user.id,
          brand_name: formData.brandName,
          website: formData.website,
          industry: formData.industry,
          city: formData.city,
          offer: formData.offer,
          budget: parseFloat(formData.budget),
          tone: formData.tone,
          objective: formData.objective,
          languages: formData.languages,
          platforms: formData.platforms,
        })
        .select()
        .single();

      if (error) throw error;

      toast.success("הקמפיין נשמר בהצלחה!");

      // Store in sessionStorage to pass to generate page
      sessionStorage.setItem("briefData", JSON.stringify(formData));
      navigate("/generate", { state: { campaignId: data.id } });
    } catch (error) {
      console.error('Error saving campaign:', error);
      toast.error("שגיאה בשמירת הקמפיין");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-primary shadow-glow mb-6">
              <Sparkles className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold mb-4">צור את הברייף לקמפיין</h1>
            <p className="text-muted-foreground text-lg">
              ספר לנו על העסק שלך ונייצר עבורך וריאנטים של מודעות ממירות
            </p>
          </div>

          {/* Form */}
          <Card className="p-8 gradient-card shadow-card border-border/50">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Brand Details */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  פרטי המותג
                </h2>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="brandName">שם המותג</Label>
                    <Input
                      id="brandName"
                      value={formData.brandName}
                      onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                      placeholder="לדוגמה: נויה ביוטי"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tone">טון המותג</Label>
                    <Select value={formData.tone} onValueChange={(value) => setFormData({ ...formData, tone: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">מקצועי</SelectItem>
                        <SelectItem value="friendly">ידידותי</SelectItem>
                        <SelectItem value="casual">סלנג</SelectItem>
                        <SelectItem value="luxury">יוקרתי</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="website">כתובת אתר</Label>
                    <Input
                      id="website"
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      placeholder="https://example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="whatsapp">קישור לוואטסאפ</Label>
                    <Input
                      id="whatsapp"
                      type="url"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      placeholder="https://wa.me/972501112233"
                    />
                  </div>
                </div>
              </div>

              {/* Campaign Details */}
              <div className="space-y-4 pt-6 border-t border-border/50">
                <h2 className="text-xl font-semibold">פרטי הקמפיין</h2>

                <div className="space-y-2">
                  <Label htmlFor="industry">תחום עיסוק / סוג עסק *</Label>
                  <Input
                    id="industry"
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    placeholder="לדוגמה: קוסמטיקאית, שרברב, מסעדה"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">עיר / מיקום *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="לדוגמה: חיפה, תל אביב"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="objective">מטרת הקמפיין</Label>
                    <Select value={formData.objective} onValueChange={(value) => setFormData({ ...formData, objective: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="TRAFFIC">תנועה לאתר</SelectItem>
                        <SelectItem value="LEADS">לידים</SelectItem>
                        <SelectItem value="CONVERSIONS">המרות</SelectItem>
                        <SelectItem value="REACH">חשיפה</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="offer">מבצע מיוחד / יתרון תחרותי *</Label>
                  <Textarea
                    id="offer"
                    value={formData.offer}
                    onChange={(e) => setFormData({ ...formData, offer: e.target.value })}
                    placeholder="לדוגמה: טיפול ראשון ב-20% הנחה"
                    rows={3}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="languages">שפות</Label>
                    <Select 
                      value={formData.languages[0]} 
                      onValueChange={(value) => setFormData({ ...formData, languages: [value] })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="he">עברית</SelectItem>
                        <SelectItem value="en">אנגלית</SelectItem>
                        <SelectItem value="he,en">שניהם</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="budget">תקציב יומי (אגורות)</Label>
                    <Input
                      id="budget"
                      type="number"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      placeholder="1000 = ₪10.00"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>פלטפורמות פרסום *</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: 'meta', label: 'Meta (FB/IG)', icon: '📱' },
                      { value: 'google', label: 'Google Ads', icon: '🔍' },
                      { value: 'taboola', label: 'Taboola', icon: '📰' },
                      { value: 'outbrain', label: 'Outbrain', icon: '📊' },
                    ].map((platform) => (
                      <label key={platform.value} className="flex items-center gap-2 p-3 rounded-lg border border-border hover:bg-accent/50 cursor-pointer transition-colors">
                        <Checkbox
                          checked={formData.platforms.includes(platform.value as Platform)}
                          onCheckedChange={(checked) => {
                            const platforms = checked
                              ? [...formData.platforms, platform.value as Platform]
                              : formData.platforms.filter((p) => p !== platform.value);
                            setFormData({ ...formData, platforms });
                          }}
                        />
                        <span className="text-lg">{platform.icon}</span>
                        <span className="text-sm">{platform.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                size="lg"
                className="w-full gradient-primary hover:opacity-90 shadow-glow text-lg h-14"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    שומר...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    צור וריאנטים לקמפיין
                  </>
                )}
              </Button>
            </form>
          </Card>
        </div>
      </main>
      <ChatWidget />
    </div>
  );
}
