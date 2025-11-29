import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';
import { useNavigate } from 'react-router-dom';
import { ChatWidget } from '@/components/ChatWidget';
import {
  Target,
  Heart,
  Users,
  Lightbulb,
  Zap,
  TrendingUp,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export default function About() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const values = [
    {
      icon: Lightbulb,
      title: 'חדשנות',
      description: 'אנחנו תמיד מחפשים דרכים חדשות ויצירתיות לפתור בעיות שיווק',
    },
    {
      icon: Heart,
      title: 'מחויבות ללקוח',
      description: 'ההצלחה שלך היא ההצלחה שלנו - אנחנו כאן בשבילך',
    },
    {
      icon: Target,
      title: 'תוצאות',
      description: 'אנחנו מתמקדים במה שחשוב - להביא לך לקוחות ומכירות',
    },
    {
      icon: Zap,
      title: 'מהירות',
      description: 'זמן זה כסף - ליצור קמפיינים תוך דקות במקום שעות',
    },
  ];

  const team = [
    {
      name: 'תומאס',
      role: 'CEO & מייסד',
      description: 'יזם סדרתי עם 10+ שנות ניסיון בשיווק דיגיטלי',
    },
    {
      name: 'הצוות שלנו',
      role: 'מומחי AI ושיווק',
      description: 'צוות מקצועי המשלב טכנולוגיה וקריאטיביות',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background relative overflow-hidden">
      {/* Star Background - same as home */}
      <div className="stars-layer-1"></div>
      <div className="stars-layer-2"></div>
      <div className="stars-layer-3"></div>

      <Navbar />

      <main className="container mx-auto px-4 py-16 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6">
            המשימה שלנו: להפוך שיווק לפשוט
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            אנחנו מאמינים שכל עסק, קטן כגדול, צריך לקבל גישה לכלי שיווק מתקדמים. בוסטי נוצרה כדי
            להפוך את השיווק הדיגיטלי לזמין, מהיר ויעיל.
          </p>
        </div>

        {/* Image - Team */}
        <div className="mb-16">
          <img 
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&auto=format&fit=crop"
            alt="Our Team"
            className="rounded-2xl shadow-2xl mx-auto max-w-4xl w-full"
          />
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12 gradient-text">
            הערכים שלנו
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <Card key={value.title} className="p-6 text-center hover:shadow-xl transition-all bg-card/80 backdrop-blur-sm">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold gradient-text mb-2">250%</div>
              <p className="text-muted-foreground">ROI ממוצע</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold gradient-text mb-2">+$5M</div>
              <p className="text-muted-foreground">תקציב שוחל</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold gradient-text mb-2">+1,000</div>
              <p className="text-muted-foreground">עסקים מרוצים</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold gradient-text mb-2">10,000+</div>
              <p className="text-muted-foreground">קמפיינים שנוצרו</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <Card className="p-12 text-center bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-2 border-primary/20">
          <Sparkles className="h-16 w-16 text-primary mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-4 gradient-text">
            מוכנים להתחיל?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            צור את הקמפיין הראשון שלך בפחות מדקה. ללא כרטיס אשראי.
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate('/brief')}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-xl transition-all gap-2"
            >
              יצירת קמפיין חינם
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </Card>
      </main>

      <Footer />
      <ChatWidget />
    </div>
  );
}
