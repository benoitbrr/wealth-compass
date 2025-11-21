import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Target, Calendar } from "lucide-react";
import GuidedQuestionnaire from "@/components/GuidedQuestionnaire";
import PrebuiltStrategies from "@/components/PrebuiltStrategies";
import CustomStrategyBuilder from "@/components/CustomStrategyBuilder";
import AppointmentModal from "@/components/AppointmentModal";

const Invest = () => {
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [questionnaireCompleted, setQuestionnaireCompleted] = useState(false);

  // Mock profile data - in real app, this would come from context
  const profileData = {
    firstName: "Client",
    age: 35,
    country: "France",
    experience: "Intermédiaire",
    riskAppetite: "Équilibré",
    mainGoal: "Faire fructifier mon patrimoine"
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/20 mb-4">
          <Target className="w-8 h-8 text-secondary" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Définir ma stratégie d'investissement</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Bienvenue chez BNP Private Banking. Nous allons vous aider à définir une stratégie 
          d'investissement adaptée à votre situation et vos objectifs.
        </p>
      </div>

      {/* SECTION A - Commencer mon profil investisseur */}
      <div className="space-y-8 mb-12">
        <GuidedQuestionnaire 
          profileData={profileData}
          onComplete={(strategy) => {
            setSelectedStrategy(strategy);
            setQuestionnaireCompleted(true);
          }}
        />
      </div>

      <Separator className="my-12" />

      {/* SECTION B - Stratégies recommandées */}
      <div className="mb-12">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold mb-2">Stratégies recommandées pour vous</h2>
          <p className="text-muted-foreground">
            Découvrez nos allocations prêtes à l'emploi, conçues par nos experts BNP Private Banking
          </p>
        </div>
        <PrebuiltStrategies onSelect={(strategy) => setSelectedStrategy(strategy)} />
      </div>

      <Separator className="my-12" />

      {/* SECTION C - Créer ma propre stratégie */}
      <div className="mb-12">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold mb-2">Créer ma propre stratégie</h2>
          <p className="text-muted-foreground">
            Vous avez déjà des convictions fortes ? Construisez votre propre allocation
          </p>
        </div>
        <CustomStrategyBuilder onComplete={(strategy) => setSelectedStrategy(strategy)} />
      </div>

      <Separator className="my-12" />

      {/* SECTION D - Contacter un conseiller */}
      <Card className="p-6 bg-gradient-to-br from-secondary/10 to-bnp-dark-green/10 border-2 border-secondary/30">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary/20 mb-4">
            <Calendar className="w-6 h-6 text-secondary" />
          </div>
          <h3 className="text-xl font-bold mb-3">Besoin d'accompagnement ?</h3>
          <p className="text-muted-foreground mb-6">
            Échangez directement avec un expert BNP Private Banking pour structurer votre patrimoine 
            et affiner votre stratégie d'investissement.
          </p>
          <Button 
            onClick={() => setShowAppointmentModal(true)}
            size="lg"
            className="bg-secondary hover:bg-bnp-dark-green"
          >
            <Calendar className="mr-2 w-5 h-5" />
            Planifier un rendez-vous
          </Button>
        </div>
      </Card>

      {/* Appointment Modal */}
      <AppointmentModal 
        isOpen={showAppointmentModal} 
        onClose={() => setShowAppointmentModal(false)} 
      />
    </div>
  );
};

export default Invest;
