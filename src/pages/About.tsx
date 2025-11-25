import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';
import { useNavigate } from 'react-router-dom';
import { AnimatedParticles } from '@/components/AnimatedParticles';
import { ChatWidget } from '@/components/ChatWidget';
import {
  Target,
  Heart,
  Users,
  Lightbulb,
  Zap,
  Globe,
  TrendingUp,
  ArrowRight,
  Shield,
  Award,
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
      description: 'אנחנו ממוקדים בתוצאות מדידות ובשיפור מתמיד',
    },
    {
      icon: Shield,
      title: 'שקיפות',
      description: 'תמחור ברור, תהליכים פתוחים וללא הפתעות',
    },
  ];

  const stats = [
    { number: '10,000+', label: 'קמפיינים שנוצרו', icon: Sparkles },
    { number: '1,000+', label: 'עסקים מרוצים', icon: Users },
    { number: '$5M+', label: 'תקציב שנוהל', icon: TrendingUp },
    { number: '250%', label: 'ROI ממוצע', icon: Award },
  ];

  const team = [
    {
      name: 'תמיר בן יחיאל',
      role: 'מייסד ו-CEO',
      description: 'מומחה בשיווק דיגיטלי וקריאייטיב, מוביל את החזון של AdSync להפוך שיווק לנגיש ויעיל לכולם',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80',
      isActive: true,
    },
    {
      name: 'מצטרף בקרוב',
      role: 'CTO',
      description: 'מחפשים מהנדס/ת תוכנה מוכשר/ת להוביל את הפיתוח הטכנולוגי',
      isActive: false,
    },
    {
      name: 'מצטרף בקרוב',
      role: 'Head of Product',
      description: 'מחפשים איש/אשת מוצר להוביל את חווית המשתמש והחדשנות',
      isActive: false,
    },
  ];

  const timeline = [
    { year: '2023', event: 'הקמת החברה', description: 'החזון להפוך שיווק לנגיש לכולם' },
    { year: '2024', event: 'השקת המוצר', description: '100 עסקים ראשונים הצטרפו' },
    { year: '2024', event: 'צמיחה מהירה', description: '1,000+ עסקים משתמשים בפלטפורמה' },
    { year: '2025', event: 'הרחבה גלובלית', description: 'תמיכה ב-4 שפות ו-9 פלטפורמות' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <AnimatedParticles />

      {/* Hero */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
              המשימה שלנו: להפוך שיווק לפשוט
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              אנחנו מאמינים שכל עסק, קטן כגדול, צריך לקבל גישה לכלי שיווק מתקדמים.
              בוסטי נוצרה כדי להפוך את השיווק הדיגיטלי לנגיש, מהיר ויעיל.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card
                key={stat.label}
                className="glass-card p-6 text-center hover-scale animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-4xl font-bold gradient-text mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">הסיפור שלנו</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  בוסטי נולדה מתוך חוויה אישית. ראינו עסקים קטנים שנאבקים עם שיווק דיגיטלי -
                  מתמודדים עם עלויות גבוהות, תהליכים מסורבלים ותוצאות לא ברורות.
                </p>
                <p>
                  החלטנו לשנות את זה. בנינו פלטפורמה שמשלבת את הכוח של בינה מלאכותית עם
                  מומחיות שיווקית, כדי ליצור קמפיינים איכותיים תוך דקות במקום שבועות.
                </p>
                <p>
                  היום, אלפי עסקים משתמשים בבוסטי כדי להשיק קמפיינים, לחסוך זמן ולהשיג
                  תוצאות טובות יותר. וזו רק ההתחלה.
                </p>
              </div>
            </div>

            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80"
                  alt="Team collaboration"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-2 text-white">
                    <Sparkles className="w-5 h-5" />
                    <p className="text-lg font-semibold">
                      צוות שדוחף גבולות בשיווק דיגיטלי
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">הערכים שלנו</h2>
            <p className="text-xl text-muted-foreground">
              העקרונות שמנחים אותנו בכל יום
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <Card
                key={value.title}
                className="glass-card p-6 text-center hover-scale animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">המסע שלנו</h2>
          </div>

          <div className="max-w-3xl mx-auto">
            {timeline.map((item, index) => (
              <div
                key={item.year}
                className="flex gap-6 mb-8 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Zap className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <Card className="glass-card p-6 flex-1">
                  <div className="text-primary font-bold mb-2">{item.year}</div>
                  <h3 className="text-xl font-semibold mb-2">{item.event}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">הצוות שלנו</h2>
            <p className="text-xl text-muted-foreground">
              האנשים שעובדים קשה כדי להביא לכם את החוויה הטובה ביותר
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <Card
                key={member.name + index}
                className={`glass-card p-6 text-center hover-scale animate-fade-in ${
                  !member.isActive ? 'opacity-60 border-dashed' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {member.isActive && member.image ? (
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-primary/20">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center border-2 border-dashed border-muted-foreground/30">
                    <Users className="w-12 h-12 text-muted-foreground/50" />
                  </div>
                )}
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <div className={`font-medium mb-3 ${member.isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                  {member.role}
                </div>
                <p className="text-muted-foreground text-sm">{member.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 gradient-text">
            רוצה להצטרף למסע?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            הצטרף לאלפי עסקים שכבר משתמשים בבוסטי כדי לצמוח
          </p>
          <Button size="lg" onClick={() => navigate('/brief')} className="text-lg px-8">
            התחל עכשיו
            <ArrowRight className="w-5 h-5 mr-2" />
          </Button>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
}
