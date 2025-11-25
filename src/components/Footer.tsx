import { Heart } from 'lucide-react';

export const Footer = () => {
  const links = [
    { label: 'אודות', href: '/about' },
    { label: 'צור קשר', href: '#contact' },
    { label: 'מדיניות פרטיות', href: '/privacy' },
    { label: 'תנאי שימוש', href: '/terms' },
  ];

  return (
    <footer className="border-t border-border bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>© 2025 AdSync. כל הזכויות שמורות.</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:flex items-center gap-1">
              נבנה עם <Heart className="w-3 h-3 fill-red-500 text-red-500" /> בישראל
            </span>
          </div>
          <div className="flex flex-wrap gap-6 justify-center">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-purple-600 transition-colors font-medium"
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
