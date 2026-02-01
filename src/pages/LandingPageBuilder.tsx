import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import LandingPageAgent from '@/components/LandingPageAgent';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChatWidget } from '@/components/ChatWidget';
import { Wand2, Layout, Palette, Sparkles, ArrowRight, CheckCircle2, Eye, Image as ImageIcon, Target, Zap, Clock, Download, Copy } from 'lucide-react';
import { toast } from 'sonner';

interface PageData {
  businessName?: string;
  industry?: string;
  targetAudience?: string;
  mainGoal?: string;
  colorScheme?: string;
  style?: string;
  heroImage?: string;
  ctaText?: string;
}

export default function LandingPageBuilder() {
  const navigate = useNavigate();
  const [showAgent, setShowAgent] = useState(false);
  const [generatedPage, setGeneratedPage] = useState<PageData | null>(null);

  const handleAgentComplete = (data: PageData) => {
    setGeneratedPage(data);
    setShowAgent(false);
    // Save to localStorage for persistence
    const savedPages = JSON.parse(localStorage.getItem('savedLandingPages') || '[]');
    savedPages.unshift({ ...data, id: Date.now().toString(), createdAt: new Date().toISOString() });
    localStorage.setItem('savedLandingPages', JSON.stringify(savedPages));
  };

  const handlePublishPage = () => {
    if (!generatedPage) return;

    // Generate a downloadable HTML page
    const colorGradient = generatedPage.colorScheme === 'כחול וסגול'
      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      : generatedPage.colorScheme === 'ירוק וכחול'
      ? 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)'
      : generatedPage.colorScheme === 'כתום וורוד'
      ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
      : generatedPage.colorScheme === 'שחור וזהב'
      ? 'linear-gradient(135deg, #000000 0%, #b8860b 100%)'
      : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';

    const html = `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${generatedPage.businessName || 'דף נחיתה'}</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Heebo', 'Segoe UI', sans-serif; direction: rtl; }
.hero { min-height: 600px; display: flex; align-items: center; justify-content: center; background: ${colorGradient}; position: relative; text-align: center; color: white; padding: 40px 20px; }
.hero img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.4; }
.hero-content { position: relative; z-index: 2; max-width: 800px; }
.hero h1 { font-size: 3.5rem; font-weight: 800; margin-bottom: 20px; text-shadow: 2px 2px 8px rgba(0,0,0,0.3); }
.hero p { font-size: 1.5rem; margin-bottom: 30px; }
.btn { display: inline-block; padding: 16px 48px; background: white; color: #6b46c1; border-radius: 50px; font-size: 1.3rem; font-weight: 700; text-decoration: none; box-shadow: 0 8px 32px rgba(0,0,0,0.2); }
.features { padding: 80px 20px; background: white; text-align: center; }
.features h2 { font-size: 2.5rem; font-weight: 800; margin-bottom: 50px; }
.features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px; max-width: 1000px; margin: 0 auto; }
.feature-card { padding: 30px; border-radius: 16px; box-shadow: 0 4px 16px rgba(0,0,0,0.08); }
.feature-card h3 { font-size: 1.3rem; font-weight: 700; margin-bottom: 10px; }
.cta { padding: 80px 20px; background: ${colorGradient}; text-align: center; color: white; }
.cta h2 { font-size: 2.5rem; font-weight: 800; margin-bottom: 20px; }
.cta p { font-size: 1.3rem; margin-bottom: 30px; }
</style>
<link href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;700;800&display=swap" rel="stylesheet">
</head>
<body>
<section class="hero">
${generatedPage.heroImage ? `<img src="${generatedPage.heroImage}" alt="Hero">` : ''}
<div class="hero-content">
<p style="font-size:1rem;background:rgba(255,255,255,0.2);display:inline-block;padding:8px 24px;border-radius:50px;margin-bottom:20px">${generatedPage.industry || ''}</p>
<h1>${generatedPage.businessName || ''}</h1>
<p>הפתרון המושלם ל${generatedPage.targetAudience || ''}</p>
<a href="#" class="btn">${generatedPage.mainGoal || 'התחל עכשיו'}</a>
</div>
</section>
<section class="features">
<h2>למה לבחור בנו?</h2>
<div class="features-grid">
<div class="feature-card"><h3>מהיר ויעיל</h3><p>תוצאות מיידיות שחוסכות לך זמן</p></div>
<div class="feature-card"><h3>מדויק ומקצועי</h3><p>פתרונות מותאמים אישית לצרכים שלך</p></div>
<div class="feature-card"><h3>אמין ובטוח</h3><p>השירות הכי מהימן בשוק</p></div>
</div>
</section>
<section class="cta">
<h2>מוכנים להתחיל?</h2>
<p>הצטרפו אלינו עוד היום וגלו את ההבדל!</p>
<a href="#" class="btn">${generatedPage.mainGoal || 'התחל'} עכשיו!</a>
</section>
</body>
</html>`;

    // Create downloadable file
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${generatedPage.businessName || 'landing-page'}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success('דף הנחיתה הורד בהצלחה!', {
      description: 'קובץ HTML מוכן להעלאה לשרת שלך',
    });
  };

  const handleCopyHTML = () => {
    if (!generatedPage) return;
    // Copy a simplified version to clipboard
    const text = `${generatedPage.businessName}\n\n${generatedPage.industry}\nקהל יעד: ${generatedPage.targetAudience}\nמטרה: ${generatedPage.mainGoal}\nסגנון: ${generatedPage.style}\nצבעים: ${generatedPage.colorScheme}`;
    navigator.clipboard.writeText(text);
    toast.success('הפרטים הועתקו!');
  };

  if (showAgent) {
    return <LandingPageAgent onComplete={handleAgentComplete} />;
  }

  if (generatedPage) {
    // Preview the generated landing page
    return (
      <div className="min-h-screen">
        <Navbar />
        
        {/* Generated Landing Page Preview */}
        <div className="pt-20">
          {/* Hero Section */}
          <section 
            className="relative min-h-[600px] flex items-center justify-center overflow-hidden"
            style={{
              background: generatedPage.colorScheme === 'כחול וסגול' 
                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                : generatedPage.colorScheme === 'ירוק וכחול'
                ? 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)'
                : generatedPage.colorScheme === 'כתום וורוד'
                ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
                : generatedPage.colorScheme === 'שחור וזהב'
                ? 'linear-gradient(135deg, #000000 0%, #b8860b 100%)'
                : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
            }}
          >
            {generatedPage.heroImage && (
              <div className="absolute inset-0">
                <img 
                  src={generatedPage.heroImage} 
                  alt="Hero" 
                  className="w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-transparent"></div>
              </div>
            )}
            
            <div className="relative z-10 text-center text-white px-4 sm:px-6 max-w-5xl">
              <Badge className="mb-4 sm:mb-6 text-sm sm:text-lg px-4 sm:px-6 py-1.5 sm:py-2 bg-white/20 backdrop-blur-md border-white/30">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 inline" />
                {generatedPage.industry}
              </Badge>

              <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-4 sm:mb-6 drop-shadow-2xl">
                {generatedPage.businessName}
              </h1>

              <p className="text-lg sm:text-2xl mb-6 sm:mb-8 drop-shadow-lg">
                הפתרון המושלם ל{generatedPage.targetAudience}
              </p>

              <Button
                size="lg"
                className="text-base sm:text-xl px-8 sm:px-12 py-5 sm:py-7 bg-white text-purple-600 hover:bg-gray-100 font-bold rounded-full shadow-2xl"
              >
                {generatedPage.mainGoal} <ArrowRight className="mr-2 w-5 h-5 sm:w-6 sm:h-6" />
              </Button>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20 px-6 bg-white">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-5xl font-bold text-center mb-16">למה לבחור בנו?</h2>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { Icon: Zap, title: 'מהיר ויעיל', desc: 'תוצאות מיידיות שחוסכות לך זמן' },
                  { Icon: Target, title: 'מדויק ומקצועי', desc: 'פתרונות מותאמים אישית לצרכים שלך' },
                  { Icon: CheckCircle2, title: 'אמין ובטוח', desc: 'השירות הכי מהימן בשוק' }
                ].map((feature, idx) => (
                  <Card key={idx} className="p-8 text-center hover:shadow-xl transition-shadow">
                    <div className="flex justify-center mb-4">
                      <feature.Icon className="w-16 h-16 text-purple-600" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-gray-600 text-lg">{feature.desc}</p>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 px-6 bg-gradient-to-br from-purple-600 to-blue-600 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-5xl font-bold mb-6">מוכנים להתחיל?</h2>
              <p className="text-2xl mb-10">הצטרפו אלינו עוד היום וגלו את ההבדל!</p>
              
              <Button 
                size="lg"
                className="text-xl px-12 py-7 bg-white text-purple-600 hover:bg-gray-100 font-bold rounded-full shadow-2xl"
              >
                {generatedPage.mainGoal} עכשיו! <Sparkles className="mr-2 w-6 h-6" />
              </Button>
            </div>
          </section>

          {/* Edit Controls */}
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-2xl shadow-2xl px-6 py-4 flex gap-3 z-50 border border-gray-200">
            <Button onClick={() => setShowAgent(true)} variant="outline" className="gap-2">
              <Eye className="w-4 h-4" />
              ערוך את הדף
            </Button>
            <Button onClick={() => setGeneratedPage(null)} variant="outline" className="gap-2">
              <Sparkles className="w-4 h-4" />
              צור דף חדש
            </Button>
            <Button onClick={handleCopyHTML} variant="outline" className="gap-2">
              <Copy className="w-4 h-4" />
              העתק פרטים
            </Button>
            <Button onClick={handlePublishPage} className="bg-gradient-to-r from-purple-600 to-blue-600 text-white gap-2">
              <Download className="w-5 h-5" />
              הורד דף נחיתה
            </Button>
          </div>
        </div>
        
        <Footer />
        <ChatWidget />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Navbar />
      
      <div className="pt-20 sm:pt-24 pb-12 sm:pb-16 px-3 sm:px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <Badge className="mb-4 text-sm sm:text-lg px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
              <Wand2 className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2 inline" />
              יצירת תמונות וטקסט עם AI
            </Badge>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              בונה דפי נחיתה AI
            </h1>
            <p className="text-lg sm:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed px-2">
              צור דף נחיתה מקצועי בדקות עם סוכן AI חכם
              <br />
              <span className="text-base sm:text-xl text-purple-600 font-semibold">+ יצירת תמונות מדהימות בבינה מלאכותית!</span>
            </p>
          </div>

          <Card className="p-5 sm:p-10 mb-6 sm:mb-8 shadow-2xl rounded-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 mb-8 sm:mb-10">
              <div className="text-center p-5 sm:p-8 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl hover:scale-105 transition-transform">
                <Wand2 className="w-10 h-10 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-purple-600" />
                <h3 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-3">סוכן AI חכם</h3>
                <p className="text-gray-600 text-sm sm:text-lg">AI שואל שאלות ויוצר את הדף המושלם</p>
              </div>
              <div className="text-center p-5 sm:p-8 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl hover:scale-105 transition-transform">
                <Sparkles className="w-10 h-10 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-blue-600" />
                <h3 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-3">יצירת תמונות AI</h3>
                <p className="text-gray-600 text-sm sm:text-lg">יצירת תמונות ייחודיות עם בינה מלאכותית</p>
              </div>
              <div className="text-center p-5 sm:p-8 bg-gradient-to-br from-cyan-50 to-teal-50 rounded-2xl hover:scale-105 transition-transform">
                <Palette className="w-10 h-10 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-cyan-600" />
                <h3 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-3">התאמה מלאה</h3>
                <p className="text-gray-600 text-sm sm:text-lg">כל פרט מותאם לעסק שלך</p>
              </div>
            </div>

            <div className="text-center">
              <Button
                size="lg"
                onClick={() => setShowAgent(true)}
                className="text-lg sm:text-2xl px-8 sm:px-16 py-6 sm:py-8 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-2xl shadow-2xl hover:scale-[1.03] transition-all"
              >
                <Sparkles className="w-5 h-5 sm:w-7 sm:h-7 mr-2 sm:mr-3 animate-pulse" />
                בואו ניצור דף נחיתה!
              </Button>
              <p className="text-gray-500 mt-3 sm:mt-4 text-sm sm:text-lg flex items-center justify-center gap-2">
                <Clock className="w-4 h-4" />
                לוקח בערך 2-3 דקות
              </p>
            </div>
          </Card>

          {/* Features List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {[
              { Icon: ImageIcon, title: 'יצירת תמונות AI', desc: 'תאר מה שאתה רוצה והAI יצור תמונה מושלמת', bgColor: 'bg-blue-50', color: 'text-blue-600' },
              { Icon: Target, title: 'ממוקד בתוצאות', desc: 'כל דף מותאם להשגת המטרה שלך', bgColor: 'bg-purple-50', color: 'text-purple-600' },
              { Icon: Layout, title: 'רספונסיבי לחלוטין', desc: 'נראה מעולה בכל מכשיר', bgColor: 'bg-green-50', color: 'text-green-600' },
              { Icon: Zap, title: 'מהיר וקל', desc: 'מענה לשאלות פשוטות ודף מוכן תוך דקות', bgColor: 'bg-orange-50', color: 'text-orange-600' }
            ].map((feature, idx) => (
              <Card key={idx} className="p-5 sm:p-6 hover:shadow-lg transition-shadow rounded-xl">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-lg ${feature.bgColor} flex items-center justify-center flex-shrink-0`}>
                    <feature.Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${feature.color}`} />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm sm:text-base">{feature.desc}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Footer />
      <ChatWidget />
    </div>
  );
}
