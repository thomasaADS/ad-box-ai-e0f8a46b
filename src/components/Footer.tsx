import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Heart } from 'lucide-react';

export const Footer = () => {
  const links = [
    { label: 'אודות', href: '/about' },
    { label: 'תנאי שימוש', href: '/terms' },
    { label: 'מדיניות פרטיות', href: '/privacy' },
    { label: 'צור קשר', href: '/about' },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      href: 'https://facebook.com/aria.ai',
      label: 'Facebook',
      color: 'hover:text-blue-500 hover:bg-blue-50',
    },
    {
      icon: Instagram,
      href: 'https://instagram.com/aria.ai',
      label: 'Instagram',
      color: 'hover:text-pink-500 hover:bg-pink-50',
    },
    {
      icon: Linkedin,
      href: 'https://linkedin.com/company/aria-ai',
      label: 'LinkedIn',
      color: 'hover:text-blue-600 hover:bg-blue-50',
    },
  ];

  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
          {/* Logo & description */}
          <div className="text-center md:text-right">
            <h3 className="font-extrabold text-xl mb-2">
              <span className="bg-gradient-to-l from-purple-600 to-violet-500 bg-clip-text text-transparent">
                A.R.I.A
              </span>
            </h3>
            <p className="text-sm text-gray-400 max-w-sm">
              מנוע AI מתקדם ליצירת קמפיינים פרסומיים מקצועיים - תוך דקות.
            </p>
          </div>

          {/* Social links */}
          <div className="flex gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center transition-all duration-200 ${social.color} hover:scale-110 text-gray-400`}
                  aria-label={social.label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
          {links.map((link) => (
            <Link
              key={link.href + link.label}
              to={link.href}
              className="text-sm text-gray-400 hover:text-purple-600 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-gray-100">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} A.R.I.A. כל הזכויות שמורות.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <span className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" />
                Made with AI in Israel
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
