import { Link } from 'react-router-dom';
import { Sparkles, Facebook, Instagram, Linkedin, Mail, Phone, Heart, MapPin, Zap, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';

export const Footer = () => {
  const productLinks = [
    { label: 'יצירת קמפיין', href: '/brief' },
    { label: 'בונה דפי נחיתה AI', href: '/landing-page-builder' },
    { label: 'דשבורד', href: '/dashboard' },
    { label: 'אנליטיקס', href: '/analytics' },
    { label: 'תמחור', href: '/pricing' },
  ];

  const serviceLinks = [
    { label: 'פרסום בפייסבוק', href: '/services/facebook-ads' },
    { label: 'פרסום בגוגל', href: '/services/google-ads' },
    { label: 'פרסום בטיקטוק', href: '/services/tiktok-ads' },
    { label: 'דפי נחיתה', href: '/services/landing-pages' },
  ];

  const companyLinks = [
    { label: 'אודות', href: '/about' },
    { label: 'איך זה עובד', href: '/how-it-works' },
    { label: 'מדיניות פרטיות', href: '/privacy' },
    { label: 'תנאי שימוש', href: '/terms' },
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/adsync', label: 'Facebook', color: 'hover:text-blue-500 hover:bg-blue-500/10' },
    { icon: Instagram, href: 'https://instagram.com/adsync', label: 'Instagram', color: 'hover:text-pink-500 hover:bg-pink-500/10' },
    { icon: Linkedin, href: 'https://linkedin.com/company/adsync', label: 'LinkedIn', color: 'hover:text-blue-600 hover:bg-blue-600/10' },
  ];

  return (
    <footer className="border-t border-border/50 bg-gradient-to-b from-background to-muted/30">
      {/* Newsletter / CTA Bar */}
      <div className="container mx-auto px-4 py-8 sm:py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-cyan-500/10 border border-primary/10">
          <div>
            <h3 className="font-bold text-lg mb-1">מוכנים ליצור קמפיינים מנצחים?</h3>
            <p className="text-sm text-muted-foreground">התחילו בחינם ותראו תוצאות תוך דקות</p>
          </div>
          <Button
            asChild
            className="rounded-lg font-semibold shadow-md hover:shadow-lg transition-all shrink-0"
            style={{
              background: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)',
              color: 'white',
            }}
          >
            <Link to="/brief" className="flex items-center gap-1.5">
              <Zap className="w-4 h-4" />
              התחל בחינם
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-12 sm:pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <h3 className="font-extrabold text-xl mb-3">
              <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-pink-500 bg-clip-text text-transparent">
                AdSync
              </span>
            </h3>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              מנוע AI מתקדם ליצירת קמפיינים פרסומיים, מודעות ודפי נחיתה מקצועיים - תוך דקות.
            </p>
            <div className="flex gap-2.5 mb-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-xl bg-muted/50 border border-border/50 flex items-center justify-center transition-all duration-200 ${social.color} hover:scale-110`}
                    aria-label={social.label}
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-bold mb-4 text-sm">מוצר</h4>
            <nav className="flex flex-col gap-2.5" aria-label="Product links">
              {productLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-4 text-sm">שירותים</h4>
            <nav className="flex flex-col gap-2.5" aria-label="Service links">
              {serviceLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold mb-4 text-sm">חברה</h4>
            <nav className="flex flex-col gap-2.5" aria-label="Company links">
              {companyLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4 text-sm">צור קשר</h4>
            <div className="flex flex-col gap-3">
              <a href="mailto:info@adsync.co.il" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                info@adsync.co.il
              </a>
              <a href="tel:+972721234567" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                072-123-4567
              </a>
              <span className="text-sm text-muted-foreground flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0" />
                תל אביב, ישראל
              </span>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-border/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} AdSync. כל הזכויות שמורות.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                Made with AI in Israel
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
