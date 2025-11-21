import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BNPLogo from "@/components/BNPLogo";
import ProfileBriefCard from "@/components/ProfileBriefCard";
import AdvisorContactTab from "@/components/AdvisorContactTab";
import StrategyFinderTab from "@/components/StrategyFinderTab";

const ProfileSummary = () => {
  const navigate = useNavigate();
  const { data } = useOnboarding();
  const [activeTab, setActiveTab] = useState("strategy");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-xl z-50 shadow-card">
        <div className="container mx-auto px-4 py-4">
          <BNPLogo />
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-5xl mx-auto px-4 py-8">
        {/* Profile Brief */}
        <ProfileBriefCard data={data} />

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
          <TabsList className="grid w-full grid-cols-2 h-auto p-1 bg-muted/50">
            <TabsTrigger 
              value="advisor" 
              className="rounded-lg py-3 text-sm font-medium data-[state=active]:bg-card data-[state=active]:shadow-sm"
            >
              Contacter un conseiller
            </TabsTrigger>
            <TabsTrigger 
              value="strategy"
              className="rounded-lg py-3 text-sm font-medium data-[state=active]:bg-card data-[state=active]:shadow-sm"
            >
              Trouver une stratégie
            </TabsTrigger>
          </TabsList>

          <TabsContent value="advisor" className="mt-6">
            <AdvisorContactTab />
          </TabsContent>

          <TabsContent value="strategy" className="mt-6">
            <StrategyFinderTab profileData={data} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ProfileSummary;
