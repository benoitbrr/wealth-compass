import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { OnboardingProvider } from "@/contexts/OnboardingContext";
import Landing from "./pages/Landing";
import ChatOnboarding from "./pages/ChatOnboarding";
import ProfileSummary from "./pages/ProfileSummary";
import Dashboard from "./pages/Dashboard";
import Wealth from "./pages/Wealth";
import Recommendations from "./pages/Recommendations";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <OnboardingProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/onboarding" element={<ChatOnboarding />} />
            <Route path="/profile-summary" element={<ProfileSummary />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/wealth" element={<Wealth />} />
            <Route path="/recommendations" element={<Recommendations />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </OnboardingProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
