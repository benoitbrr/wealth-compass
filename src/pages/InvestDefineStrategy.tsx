import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar, SlidersHorizontal, TrendingUp } from "lucide-react";

import GuidedQuestionnaire from "@/components/GuidedQuestionnaire";
import PrebuiltStrategies from "@/components/PrebuiltStrategies";
import AppointmentModal from "@/components/AppointmentModal";
import { usePortfolio } from "@/hooks/usePortfolio";
import { useInvestmentProfile } from "@/hooks/useInvestmentProfile";

const InvestDefineStrategy = () => {
  const navigate = useNavigate();
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [questionnaireCompleted, setQuestionnaireCompleted] = useState(false);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  
  const { totalAssets, cashBalance, positions } = usePortfolio();
  const { investmentProfile } = useInvestmentProfile();

  const investedValue = positions.reduce((sum, pos) => sum + Number(pos.current_value), 0);
  const cashPercentage = totalAssets > 0 ? (cashBalance / totalAssets) * 100 : 0;
  const investedPercentage = totalAssets > 0 ? (investedValue / totalAssets) * 100 : 0;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-10">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Définir ma stratégie</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Choisissez votre parcours pour construire une stratégie adaptée à votre profil.
        </p>
      </div>

      {/* Current Situation Summary */}
      <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-primary/10">
            <TrendingUp className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold mb-2">Votre situation actuelle</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Patrimoine total</p>
                <p className="text-xl font-bold text-primary">{totalAssets.toLocaleString('fr-FR')} €</p>
              </div>
              <div>
                <p className="text-muted-foreground">En liquidités</p>
                <p className="text-lg font-semibold">
                  {cashBalance.toLocaleString('fr-FR')} € 
                  <span className="text-sm text-muted-foreground ml-2">({cashPercentage.toFixed(0)}%)</span>
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Déjà investi</p>
                <p className="text-lg font-semibold">
                  {investedValue.toLocaleString('fr-FR')} € 
                  <span className="text-sm text-muted-foreground ml-2">({investedPercentage.toFixed(0)}%)</span>
                </p>
              </div>
            </div>
            {investmentProfile?.selected_strategy && (
              <div className="mt-3 pt-3 border-t border-border/50">
                <p className="text-sm">
                  <span className="text-muted-foreground">Stratégie actuelle :</span>{' '}
                  <span className="font-semibold text-primary">{investmentProfile.selected_strategy}</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Two sub-options */}
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Card className="p-5 flex flex-col justify-between">
          <div className="space-y-2">
            <h2 className="font-semibold flex items-center gap-2">
              <Calendar className="w-4 h-4 text-secondary" />
              Être accompagné par un conseiller
            </h2>
            <p className="text-sm text-muted-foreground">
              Un expert BNP Private Banking vous aide à structurer votre stratégie et valider vos choix.
            </p>
          </div>
          <Button className="mt-4" variant="outline" onClick={() => setShowAppointmentModal(true)}>
            Planifier un rendez-vous
          </Button>
        </Card>

        <Card className="p-5 flex flex-col justify-between">
          <div className="space-y-2">
            <h2 className="font-semibold flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-secondary" />
              Répondre à des questions
            </h2>
            <p className="text-sm text-muted-foreground">
              Répondez à quelques questions pour obtenir une proposition d&apos;allocation adaptée à votre profil.
            </p>
          </div>
          <Button
            className="mt-4"
            onClick={() => navigate("/onboarding")}
            variant="outline"
          >
            Commencer le questionnaire
          </Button>
        </Card>
      </div>

      {/* Questionnaire */}
      {showQuestionnaire && (
        <div className="space-y-6">
          <GuidedQuestionnaire
            profileData={{
              firstName: "Client",
              age: 35,
              country: "France",
              experience: investmentProfile?.experience || "Intermédiaire",
              riskAppetite: investmentProfile?.risk_appetite || "Équilibré",
              mainGoal: investmentProfile?.main_goal || "Faire fructifier mon patrimoine",
            }}
            onComplete={(strategyIdOrName: string) => {
              setSelectedStrategy(strategyIdOrName);
              setQuestionnaireCompleted(true);
            }}
          />

          {questionnaireCompleted && (
            <Card className="p-5 bg-gradient-to-br from-secondary/10 to-bnp-dark-green/10 border-secondary/30">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="font-semibold mb-1">Votre stratégie recommandée</h3>
                  <p className="text-sm text-muted-foreground">
                    À partir de vos réponses, nous avons identifié une stratégie adaptée à votre profil.
                  </p>
                  {selectedStrategy && (
                    <p className="mt-2 text-sm">
                      Stratégie suggérée : <span className="font-medium">{selectedStrategy}</span>
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      const element = document.getElementById("strategies");
                      if (element) element.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Voir stratégies recommandées
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      )}

      <Separator />

      {/* Prebuilt Strategies */}
      <div id="strategies">
        <PrebuiltStrategies onSelect={(strategyIdOrName: string) => setSelectedStrategy(strategyIdOrName)} />
      </div>

      {/* Appointment Modal */}
      <AppointmentModal isOpen={showAppointmentModal} onClose={() => setShowAppointmentModal(false)} />
    </div>
  );
};

export default InvestDefineStrategy;
