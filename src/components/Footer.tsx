import { useTranslation } from '@/hooks/useTranslation';

export const Footer = () => {
  const { t } = useTranslation();

  const links = [
    { label: t('footer.about'), href: '#' },
    { label: t('footer.contact'), href: '#' },
    { label: t('footer.privacy'), href: '/privacy' },
    { label: t('footer.terms'), href: '/terms' },
  ];

  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {t('footer.copyright')}
          </p>
          <div className="flex gap-6">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
