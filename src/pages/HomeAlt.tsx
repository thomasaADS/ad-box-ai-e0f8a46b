import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ChatWidget } from '@/components/ChatWidget';
import { SEOHead } from '@/components/SEOHead';
import { HeroSection } from '@/components/landing/HeroSection';
import { LogosBar } from '@/components/landing/LogosBar';
import { StatsSection } from '@/components/landing/StatsSection';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { ProductDemo } from '@/components/landing/ProductDemo';
import { PricingSection } from '@/components/landing/PricingSection';
import { GlobeSection } from '@/components/landing/GlobeSection';
import { TestimonialsSection } from '@/components/landing/TestimonialsSection';
import { FAQSection } from '@/components/landing/FAQSection';
import { CTASection } from '@/components/landing/CTASection';
import { AgentsSection } from '@/components/landing/AgentsSection';

const HomeAlt = () => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'ARIA - פלטפורמת AI ליצירת קמפיינים פרסומיים',
    description: 'צור קמפיינים מקצועיים עם AI תוך דקות',
    url: 'https://aria.co.il',
  };

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="ARIA - מנוע AI ליצירת פרסום מקצועי | קמפיינים ומודעות"
        description="צור מודעות וקמפיינים מקצועיים עם AI תוך דקות. עד 14x יותר המרות. Meta, Google, TikTok ועוד. התחל חינם."
        keywords="AI פרסום, קמפיינים פרסומיים, יצירת מודעות, שיווק דיגיטלי, פרסום פייסבוק, פרסום גוגל, ARIA"
        canonicalUrl="/"
        structuredData={structuredData}
      />

      <Navbar />

      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Logos / Social Proof Bar */}
      <LogosBar />

      {/* 3. Stats Section */}
      <StatsSection />

      {/* 4. Features - How It Works */}
      <FeaturesSection />

      {/* 5. AI Agents Team */}
      <AgentsSection />

      {/* 6. Product Demo */}
      <ProductDemo />

      {/* 6. Pricing */}
      <PricingSection />

      {/* 7. Globe / Global Section */}
      <GlobeSection />

      {/* 8. Testimonials */}
      <TestimonialsSection />

      {/* 9. FAQ */}
      <FAQSection />

      {/* 10. Final CTA */}
      <CTASection />

      <Footer />

      <ChatWidget />
    </div>
  );
};

export default HomeAlt;
