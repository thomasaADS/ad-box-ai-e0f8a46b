import { Link } from 'react-router-dom';
import { Sparkles, Facebook, Instagram, Linkedin, Mail, Phone, Heart, MapPin } from 'lucide-react';

export const Footer = () => {
  const productLinks = [
    { label: 'יצירת קמפיין', href: '/brief' },
    { label: 'דשבורד', href: '/dashboard' },
    { label: 'בונה דפי נחיתה', href: '/landing-page-builder' },
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
    { icon: Facebook, href: 'https://facebook.com/adsync', label: 'Facebook', color: 'hover:text-blue-600' },
    { icon: Instagram, href: 'https://instagram.com/adsync', label: 'Instagram', color: 'hover:text-pink-600' },
    { icon: Linkedin, href: 'https://linkedin.com/company/adsync', label: 'LinkedIn', color: 'hover:text-blue-700' },
  ];

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <h3 className="font-bold text-xl mb-3 gradient-text">AdSync</h3>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              פלטפורמת AI מתקדמת ליצירת קמפיינים פרסומיים מקצועיים תוך דקות.
            </p>
            <div className="flex gap-3 mb-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center transition-all ${social.color} hover:scale-110`}
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4 text-sm">מוצר</h4>
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
            <h4 className="font-semibold mb-4 text-sm">שירותים</h4>
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
            <h4 className="font-semibold mb-4 text-sm">חברה</h4>
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
            <h4 className="font-semibold mb-4 text-sm">צור קשר</h4>
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

            <Link
              to="/landing-page-builder"
              className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium hover:shadow-lg transition-all hover:scale-105"
            >
              <Sparkles className="h-3.5 w-3.5" />
              בנה דף נחיתה
            </Link>
          </div>
        </div>

        <div className="pt-6 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} AdSync. כל הזכויות שמורות.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                Made in Israel
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
