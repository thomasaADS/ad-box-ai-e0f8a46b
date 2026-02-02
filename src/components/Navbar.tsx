import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { Button } from './ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, X, LogOut, User, ChevronDown, Sparkles, Zap, Bot } from 'lucide-react';
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
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-sm'
          : 'bg-transparent backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 sm:h-18">
          <Link to="/" className="hover:opacity-90 transition-opacity">
            <Logo size="sm" showText={true} />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium px-3.5 py-2 rounded-lg transition-all duration-200 hover:bg-primary/5 hover:text-primary ${
                  location.pathname === item.path
                    ? 'text-primary bg-primary/5'
                    : 'text-muted-foreground'
                }`}
              >
                {item.label}
              </Link>
            ))}

            <DropdownMenu>
              <DropdownMenuTrigger className="text-sm font-medium px-3.5 py-2 rounded-lg transition-all duration-200 hover:bg-primary/5 hover:text-primary text-muted-foreground inline-flex items-center gap-1 outline-none">
                שירותים
                <ChevronDown className="w-3 h-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-52">
                {serviceItems.map((item) => (
                  <DropdownMenuItem key={item.path} onClick={() => navigate(item.path)} className="cursor-pointer">
                    {item.label}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/landing-page-builder')} className="cursor-pointer">
                  <Sparkles className="w-3.5 h-3.5 ml-2 text-purple-500" />
                  מחולל קמפיינים AI
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/ai-agents')} className="cursor-pointer">
                  <Bot className="w-3.5 h-3.5 ml-2 text-blue-500" />
                  סוכני AI
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <>
                <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                  <Link to="/dashboard">{t('nav.dashboard')}</Link>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => navigate('/my-campaigns')} className="cursor-pointer">
                      הקמפיינים שלי
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/analytics')} className="cursor-pointer">
                      אנליטיקס
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer">
                      {t('nav.settings')}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="text-red-600 cursor-pointer">
                      <LogOut className="h-4 w-4 ml-2" />
                      {t('nav.logout')}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                  <Link to="/auth">{t('nav.login')}</Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
                  style={{
                    background: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)',
                    color: 'white',
                    border: 'none',
                  }}
                >
                  <Link to="/brief" className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" />
                    {t('nav.getStarted')}
                  </Link>
                </Button>
              </>
            )}
          </div>

          <button
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-[700px] opacity-100 pb-6' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="pt-3 border-t border-border/50">
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

              <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-2">
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

              <Link
                to="/landing-page-builder"
                className="text-sm font-medium px-6 py-2.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-primary transition-colors flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                מחולל קמפיינים AI
              </Link>
              <Link
                to="/ai-agents"
                className="text-sm font-medium px-6 py-2.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-primary transition-colors flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Bot className="w-3.5 h-3.5 text-blue-500" />
                סוכני AI
              </Link>

              <div className="mt-4 pt-4 border-t border-border/50 flex flex-col gap-2.5 px-2">
                {user ? (
                  <>
                    <Button asChild variant="outline" className="w-full justify-center rounded-lg">
                      <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                        {t('nav.dashboard')}
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full justify-center rounded-lg">
                      <Link to="/settings" onClick={() => setIsMenuOpen(false)}>
                        {t('nav.settings')}
                      </Link>
                    </Button>
                    <Button
                      variant="destructive"
                      className="w-full justify-center rounded-lg"
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
                    <Button asChild variant="outline" className="w-full justify-center rounded-lg">
                      <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                        {t('nav.login')}
                      </Link>
                    </Button>
                    <Button
                      asChild
                      className="w-full justify-center rounded-lg font-semibold"
                      style={{
                        background: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)',
                        color: 'white',
                      }}
                    >
                      <Link to="/brief" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5" />
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
