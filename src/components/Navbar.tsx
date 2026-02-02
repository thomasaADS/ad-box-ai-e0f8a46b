import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { Button } from './ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, X, LogOut, User, Zap } from 'lucide-react';
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
    { path: '/', label: 'בית' },
    { path: '/how-it-works', label: 'תכונות' },
    { path: '/ai-agents', label: 'סוכני AI' },
    { path: '/brief', label: 'מחולל קמפיינים' },
    { path: '/pricing', label: 'תמחור' },
    { path: '/', label: 'שאלות נפוצות', hash: '#faq' },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleNavClick = (item: { path: string; hash?: string }) => {
    if (item.hash && location.pathname === '/') {
      const el = document.querySelector(item.hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    navigate(item.path);
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm'
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
            {navItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleNavClick(item)}
                className={`text-sm font-medium px-3.5 py-2 rounded-lg transition-all duration-200 hover:bg-purple-50 hover:text-purple-600 ${
                  location.pathname === item.path && !item.hash
                    ? 'text-purple-600 bg-purple-50'
                    : 'text-gray-500'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-purple-600"
                >
                  <Link to="/dashboard">{t('nav.dashboard')}</Link>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem
                      onClick={() => navigate('/my-campaigns')}
                      className="cursor-pointer"
                    >
                      הקמפיינים שלי
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => navigate('/analytics')}
                      className="cursor-pointer"
                    >
                      אנליטיקס
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => navigate('/settings')}
                      className="cursor-pointer"
                    >
                      {t('nav.settings')}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleSignOut}
                      className="text-red-600 cursor-pointer"
                    >
                      <LogOut className="h-4 w-4 ml-2" />
                      {t('nav.logout')}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-purple-600"
                >
                  <Link to="/auth">התחבר</Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="rounded-lg font-semibold shadow-md hover:shadow-lg transition-all bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <Link to="/brief" className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" />
                    התחל בחינם
                  </Link>
                </Button>
              </>
            )}
          </div>

          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-[500px] opacity-100 pb-6' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="pt-3 border-t border-gray-100">
            <div className="flex flex-col gap-1">
              {navItems.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleNavClick(item);
                  }}
                  className={`text-sm font-medium px-4 py-3 rounded-lg transition-colors text-right ${
                    location.pathname === item.path && !item.hash
                      ? 'text-purple-600 bg-purple-50'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-purple-600'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-2.5 px-2">
                {user ? (
                  <>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full justify-center rounded-lg"
                    >
                      <Link
                        to="/dashboard"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {t('nav.dashboard')}
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
                    <Button
                      asChild
                      variant="outline"
                      className="w-full justify-center rounded-lg"
                    >
                      <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                        התחבר
                      </Link>
                    </Button>
                    <Button
                      asChild
                      className="w-full justify-center rounded-lg font-semibold bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      <Link
                        to="/brief"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-1.5"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        התחל בחינם
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
