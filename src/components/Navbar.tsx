import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { Button } from './ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, X, LogOut, User, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from './ui/dropdown-menu';

export const Navbar = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { path: '/', label: t('nav.home') },
    { path: '/how-it-works', label: t('nav.howItWorks') },
    { path: '/pricing', label: t('nav.pricing') },
    { path: '/about', label: t('nav.about') },
  ];

  const serviceItems = [
    { path: '/services/facebook-ads', label: 'פרסום בפייסבוק' },
    { path: '/services/google-ads', label: 'פרסום בגוגל' },
    { path: '/services/tiktok-ads', label: 'פרסום בטיקטוק' },
    { path: '/services/landing-pages', label: 'דפי נחיתה' },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-lg border-b border-border shadow-sm'
          : 'bg-background/80 backdrop-blur-md border-b border-border'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="hover:opacity-90 transition-opacity">
            <Logo size="sm" showText={true} />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium px-3 py-2 rounded-lg transition-colors hover:bg-muted hover:text-primary ${
                  location.pathname === item.path
                    ? 'text-primary bg-primary/5'
                    : 'text-muted-foreground'
                }`}
              >
                {item.label}
              </Link>
            ))}

            <DropdownMenu>
              <DropdownMenuTrigger className="text-sm font-medium px-3 py-2 rounded-lg transition-colors hover:bg-muted hover:text-primary text-muted-foreground inline-flex items-center gap-1 outline-none">
                שירותים
                <ChevronDown className="w-3 h-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-48">
                {serviceItems.map((item) => (
                  <DropdownMenuItem key={item.path} onClick={() => navigate(item.path)}>
                    {item.label}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/landing-page-builder')}>
                  בונה דפי נחיתה AI
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Button asChild variant="outline" size="sm">
                  <Link to="/dashboard">{t('nav.dashboard')}</Link>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => navigate('/my-campaigns')}>
                      הקמפיינים שלי
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/analytics')}>
                      אנליטיקס
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/settings')}>
                      {t('nav.settings')}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                      <LogOut className="h-4 w-4 ml-2" />
                      {t('nav.logout')}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button asChild variant="ghost" size="sm">
                  <Link to="/auth">{t('nav.login')}</Link>
                </Button>
                <Button asChild size="sm">
                  <Link to="/brief">{t('nav.getStarted')}</Link>
                </Button>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-[600px] opacity-100 pb-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="pt-2 border-t border-border">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium px-4 py-3 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? 'text-primary bg-primary/5'
                      : 'text-muted-foreground hover:bg-muted hover:text-primary'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                שירותים
              </div>
              {serviceItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-sm font-medium px-6 py-2.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <div className="mt-3 pt-3 border-t border-border flex flex-col gap-2 px-2">
                {user ? (
                  <>
                    <Button asChild variant="outline" className="w-full justify-center">
                      <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                        {t('nav.dashboard')}
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full justify-center">
                      <Link to="/settings" onClick={() => setIsMenuOpen(false)}>
                        {t('nav.settings')}
                      </Link>
                    </Button>
                    <Button
                      variant="destructive"
                      className="w-full justify-center"
                      onClick={() => {
                        setIsMenuOpen(false);
                        handleSignOut();
                      }}
                    >
                      <LogOut className="h-4 w-4 ml-2" />
                      {t('nav.logout')}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button asChild variant="outline" className="w-full justify-center">
                      <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                        {t('nav.login')}
                      </Link>
                    </Button>
                    <Button asChild className="w-full justify-center">
                      <Link to="/brief" onClick={() => setIsMenuOpen(false)}>
                        {t('nav.getStarted')}
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
