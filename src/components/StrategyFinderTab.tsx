import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import GuidedQuestionnaire from "@/components/GuidedQuestionnaire";
import PrebuiltStrategies from "@/components/PrebuiltStrategies";
import CustomStrategyBuilder from "@/components/CustomStrategyBuilder";
import { ArrowRight, RotateCcw } from "lucide-react";

interface StrategyFinderTabProps {
  profileData: any;
}

const StrategyFinderTab = ({ profileData }: StrategyFinderTabProps) => {
  const navigate = useNavigate();
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      {/* Guided Questionnaire */}
      <GuidedQuestionnaire 
        profileData={profileData}
        onComplete={(strategy) => setSelectedStrategy(strategy)}
      />

      <Separator className="my-8" />

      {/* Prebuilt Strategies */}
      <PrebuiltStrategies onSelect={(strategy) => setSelectedStrategy(strategy)} />

      <Separator className="my-8" />

      {/* Custom Strategy Builder */}
      <CustomStrategyBuilder onComplete={(strategy) => setSelectedStrategy(strategy)} />

      <Separator className="my-8" />

      {/* Final CTA */}
      <Card className="p-8 bg-gradient-to-br from-secondary/10 to-bnp-dark-green/10 border-2 border-secondary/30">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">Prochaine étape</h3>
          <p className="text-muted-foreground mb-6">
            En créant votre espace BNP E-Private, nous pourrons relier votre stratégie à vos comptes et suivre votre patrimoine en temps réel.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              onClick={() => navigate("/dashboard")}
              size="lg"
              className="bg-[#00A693] hover:bg-[#00957F]"
            >
              Créer mon espace et continuer
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            
            <Button 
              variant="outline"
              size="lg"
              onClick={() => navigate("/onboarding")}
            >
              <RotateCcw className="mr-2 w-4 h-4" />
              Revoir mon profil
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StrategyFinderTab;
