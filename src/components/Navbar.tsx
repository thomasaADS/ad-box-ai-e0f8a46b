import { Link, useLocation, useNavigate } from "react-router-dom";
import { Logo } from "./Logo";
import { Button } from "./ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import { Menu, X, LogOut, User, Languages, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";

export const Navbar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { language, setLanguage } = useLanguage();
  const { theme, setTheme, actualTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const languages = [
    { code: 'he', name: 'עברית', flag: '🇮🇱' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
  ];

  const navItems = [
    { path: "/", label: "בית" },
    { path: "/how-it-works", label: "איך זה עובד" },
    { path: "/pricing", label: "תמחור" },
    { path: "/about", label: "אודות" },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Logo className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">AdSync</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === item.path.split("#")[0] ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  {actualTheme === 'dark' ? (
                    <Moon className="h-4 w-4" />
                  ) : (
                    <Sun className="h-4 w-4" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuLabel>ערכת נושא</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => setTheme('light')}
                  className={theme === 'light' ? 'bg-accent' : ''}
                >
                  <Sun className="h-4 w-4 mr-2" />
                  <span>מצב יום</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setTheme('dark')}
                  className={theme === 'dark' ? 'bg-accent' : ''}
                >
                  <Moon className="h-4 w-4 mr-2" />
                  <span>מצב לילה</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setTheme('system')}
                  className={theme === 'system' ? 'bg-accent' : ''}
                >
                  <span className="mr-2">💻</span>
                  <span>אוטומטי</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Languages className="h-4 w-4" />
                  <span>{languages.find(l => l.code === language)?.flag}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>בחר שפה / Select Language</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {languages.map((lang) => (
                  <DropdownMenuItem 
                    key={lang.code}
                    onClick={() => setLanguage(lang.code as any)}
                    className={language === lang.code ? 'bg-accent' : ''}
                  >
                    <span className="mr-2">{lang.flag}</span>
                    <span className="font-medium">{lang.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {user ? (
              <>
                <Button asChild variant="outline">
                  <Link to="/dashboard">לוח בקרה</Link>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => navigate('/settings')}>
                      הגדרות
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="h-4 w-4 mr-2" />
                      התנתק
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button asChild variant="outline">
                  <Link to="/auth">התחבר</Link>
                </Button>
                <Button asChild className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  <Link to="/brief">התחל חינם 🚀</Link>
                </Button>
              </>
            )}
          </div>


          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.path}
                  href={item.path}
                  className="text-sm font-medium text-muted-foreground hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              {user ? (
                <>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                      לוח בקרה
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/settings" onClick={() => setIsMenuOpen(false)}>
                      הגדרות
                    </Link>
                  </Button>
                  <Button variant="destructive" className="w-full" onClick={() => {
                    setIsMenuOpen(false);
                    handleSignOut();
                  }}>
                    <LogOut className="h-4 w-4 mr-2" />
                    התנתק
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                      התחבר
                    </Link>
                  </Button>
                  <Button asChild className="w-full bg-gradient-to-r from-purple-600 to-pink-600">
                    <Link to="/brief" onClick={() => setIsMenuOpen(false)}>
                      התחל חינם 🚀
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
