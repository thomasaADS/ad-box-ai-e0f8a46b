import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { SEOHead } from '@/components/SEOHead';
import { Home, ArrowRight, Search, Sparkles } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead
        title="404 - הדף לא נמצא"
        description="הדף שחיפשת לא נמצא. חזור לדף הבית של AdSync וצור קמפיינים מקצועיים עם AI."
        noIndex={true}
      />

      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-lg mx-auto">
          <div className="relative mb-8">
            <span className="text-[120px] sm:text-[180px] font-extrabold gradient-text leading-none opacity-20">
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <Search className="w-16 sm:w-20 h-16 sm:h-20 text-primary animate-float" />
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            הדף לא נמצא
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            נראה שהדף שחיפשת לא קיים או שהוסר.
            <br />
            אל דאגה, יש לנו הרבה דברים טובים שמחכים לך!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate('/')}
              className="text-lg px-8 py-6 rounded-xl"
            >
              <Home className="w-5 h-5 ml-2" />
              חזור לדף הבית
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/brief')}
              className="text-lg px-8 py-6 rounded-xl"
            >
              <Sparkles className="w-5 h-5 ml-2" />
              צור קמפיין
            </Button>
          </div>

          <div className="mt-12 pt-8 border-t">
            <p className="text-sm text-muted-foreground mb-4">דפים פופולריים:</p>
            <div className="flex flex-wrap gap-3 justify-center">
              {[
                { label: 'איך זה עובד', path: '/how-it-works' },
                { label: 'תמחור', path: '/pricing' },
                { label: 'דף נחיתה', path: '/landing-page-builder' },
                { label: 'אודות', path: '/about' },
              ].map((link) => (
                <Button
                  key={link.path}
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate(link.path)}
                  className="text-sm"
                >
                  {link.label}
                  <ArrowRight className="w-3 h-3 mr-1" />
                </Button>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
