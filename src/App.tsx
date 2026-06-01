import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AppDemo from "./pages/AppDemo";
import AppPremium from "./pages/AppPremium";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import CommunityGuidelines from "./pages/CommunityGuidelines";
import FindACofounder from "./pages/FindACofounder";
import ConnectsFounders from "./pages/ConnectsFounders";
import CofounderslabAlternative from "./pages/CofounderslabAlternative";
import Blog from "./pages/Blog";
import ChildSafetyPolicy from "./pages/blog/ChildSafetyPolicy";
import SeoLanding from "./pages/SeoLanding";
import NotFound from "./pages/NotFound";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/app" element={<AppDemo />} />
          <Route path="/app/premium" element={<AppPremium />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/community-guidelines" element={<CommunityGuidelines />} />
          <Route path="/find-a-cofounder" element={<FindACofounder />} />
          <Route path="/connects-founders" element={<ConnectsFounders />} />
          <Route path="/cofounderslab-alternative" element={<CofounderslabAlternative />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/child-safety-and-protection-policy" element={<ChildSafetyPolicy />} />
          <Route path="/:slug" element={<SeoLanding />} />
          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
