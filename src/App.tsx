import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { OnboardingProvider } from "@/contexts/OnboardingContext";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import ChatOnboarding from "./pages/ChatOnboarding";
import Dashboard from "./pages/Dashboard";
import Wealth from "./pages/Wealth";
import Analysis from "./pages/Analysis";
import Invest from "./pages/Invest";
import InvestDefineStrategy from "./pages/InvestDefineStrategy";
import InvestExploreSolutions from "./pages/InvestExploreSolutions";
import Tools from "./pages/Tools";
import Community from "./pages/Community";
import MyStrategy from "./pages/MyStrategy";
import Recommendations from "./pages/Recommendations";
import NotFound from "./pages/NotFound";
import DashboardLayout from "@/components/DashboardLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <OnboardingProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/onboarding" element={<ChatOnboarding />} />
            
            {/* Protected routes with sidebar */}
            <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
            <Route path="/wealth" element={<DashboardLayout><Wealth /></DashboardLayout>} />
            <Route path="/analysis" element={<DashboardLayout><Analysis /></DashboardLayout>} />
            <Route path="/invest" element={<DashboardLayout><Invest /></DashboardLayout>} />
            <Route path="/invest/define" element={<DashboardLayout><InvestDefineStrategy /></DashboardLayout>} />
            <Route path="/invest/explore" element={<DashboardLayout><InvestExploreSolutions /></DashboardLayout>} />
            <Route path="/tools" element={<DashboardLayout><Tools /></DashboardLayout>} />
            <Route path="/community" element={<DashboardLayout><Community /></DashboardLayout>} />
            <Route path="/my-strategy" element={<DashboardLayout><MyStrategy /></DashboardLayout>} />
            <Route path="/recommendations" element={<DashboardLayout><Recommendations /></DashboardLayout>} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </OnboardingProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
