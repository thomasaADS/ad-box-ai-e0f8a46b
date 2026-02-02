import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ScrollToTop } from "@/components/ScrollToTop";

import Index from "./pages/Index";
import Brief from "./pages/Brief";
import Generate from "./pages/Generate";
import Dashboard from "./pages/Dashboard";
import AnalyticsDashboard from "./pages/AnalyticsDashboard";
import Settings from "./pages/Settings";
import MyCampaigns from "./pages/MyCampaigns";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Auth from "./pages/Auth";
import HowItWorks from "./pages/HowItWorks";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import LandingPageBuilder from "./pages/LandingPageBuilder";
import AIAgents from "./pages/AIAgents";
import { LoadingScreen } from "./components/LoadingScreen";

// SEO Service Pages
import FacebookAds from "./pages/services/FacebookAds";
import GoogleAds from "./pages/services/GoogleAds";
import TikTokAds from "./pages/services/TikTokAds";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <LoadingScreen />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              {/* Main Pages */}
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/about" element={<About />} />
              <Route path="/landing-page-builder" element={<LandingPageBuilder />} />
              <Route path="/ai-agents" element={<AIAgents />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />

              {/* App Pages */}
              <Route path="/brief" element={<Brief />} />
              <Route path="/generate" element={<Generate />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/analytics" element={<AnalyticsDashboard />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/my-campaigns" element={<MyCampaigns />} />

              {/* SEO Service Pages */}
              <Route path="/services/facebook-ads" element={<FacebookAds />} />
              <Route path="/services/google-ads" element={<GoogleAds />} />
              <Route path="/services/tiktok-ads" element={<TikTokAds />} />

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
