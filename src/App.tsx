import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import Astrology from "./pages/Astrology";
import Numerology from "./pages/Numerology";
import Vastu from "./pages/Vastu";
import Palmistry from "./pages/Palmistry";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { Scroll } from "lucide-react";
import ScrolltoTop from "./components/ScrolltoTop";
import TermsAndPolicy from "./pages/Terms&Policy";
import PrivacyPolicy from "./pages/Privacypolicypage";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <ScrolltoTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/astrology" element={<Astrology />} />
            <Route path="/numerology" element={<Numerology />} />
            <Route path="/vastu" element={<Vastu />} />
            <Route path="/palmistry" element={<Palmistry />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<TermsAndPolicy />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
