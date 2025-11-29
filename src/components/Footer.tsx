import { useTranslation } from '@/hooks/useTranslation';
import { Sparkles } from 'lucide-react';

export const Footer = () => {
  const { t } = useTranslation();

  const links = [
    { label: t('footer.about'), href: '/about' },
    { label: t('footer.contact'), href: '#' },
    { label: t('footer.privacy'), href: '/privacy' },
    { label: t('footer.terms'), href: '/terms' },
  ];

  return (
    <footer className="border-t border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="font-bold text-lg mb-4 gradient-text">AdSync</h3>
            <p className="text-sm text-muted-foreground">
              פלטפורמת AI מתקדמת ליצירת קמפיינים מנצחים תוך דקות
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">קישורים מהירים</h4>
            <div className="flex flex-col gap-2">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div>
            <h4 className="font-semibold mb-4">בנה את האתר שלך</h4>
            <a
              href="/landing-page-builder"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:shadow-lg transition-all"
            >
              <Sparkles className="h-4 w-4" />
              בנה דף נחיתה עם AI
            </a>
          </div>
        </div>

        <div className="pt-6 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};
