import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, Search, TrendingUp } from "lucide-react";
import { usePortfolio } from "@/hooks/usePortfolio";
import { useInvestmentProfile } from "@/hooks/useInvestmentProfile";

const Invest = () => {
  const navigate = useNavigate();
  const { totalAssets, cashBalance } = usePortfolio();
  const { investmentProfile } = useInvestmentProfile();

  const investedValue = totalAssets - cashBalance;

  return (
    <div className="w-full h-full overflow-x-hidden">
      <div className="px-5 py-8 max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold">Investir</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Construisez une stratégie d'investissement adaptée à votre profil et à vos objectifs patrimoniaux.
          </p>
        </div>

        {/* Current Situation */}
        <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Votre situation actuelle
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Patrimoine total</p>
                <p className="text-2xl font-bold text-primary">{totalAssets.toLocaleString('fr-FR')} €</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Liquidités</p>
                <p className="text-xl font-semibold">{cashBalance.toLocaleString('fr-FR')} €</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Déjà investi</p>
                <p className="text-xl font-semibold">{investedValue.toLocaleString('fr-FR')} €</p>
              </div>
            </div>
            {investmentProfile?.selected_strategy && (
              <div className="pt-3 border-t border-border/50">
                <p className="text-sm">
                  <span className="text-muted-foreground">Stratégie actuelle :</span>{' '}
                  <span className="font-semibold text-primary">{investmentProfile.selected_strategy}</span>
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* Two main options */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Define Strategy */}
          <Card className="p-8 bg-gradient-to-br from-secondary/10 to-bnp-dark-green/10 border-2 border-secondary/30 hover:shadow-xl transition-all">
            <div className="flex flex-col h-full">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/20 mb-6">
                <Target className="w-8 h-8 text-secondary" />
              </div>
              
              <h2 className="text-2xl font-bold mb-3">Définir ma stratégie</h2>
              <p className="text-muted-foreground mb-6 flex-1">
                Répondez à un questionnaire personnalisé ou choisissez parmi nos stratégies recommandées 
                pour construire une allocation adaptée à votre profil.
              </p>
              
              <Button 
                onClick={() => navigate("/onboarding")}
                size="lg"
                className="w-full bg-secondary hover:bg-bnp-dark-green"
              >
                Commencer
              </Button>
            </div>
          </Card>

          {/* Explore Solutions */}
          <Card className="p-8 border-2 hover:shadow-xl transition-all">
            <div className="flex flex-col h-full">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-6">
                <Search className="w-8 h-8 text-primary" />
              </div>
              
              <h2 className="text-2xl font-bold mb-3">Explorer les solutions</h2>
              <p className="text-muted-foreground mb-6 flex-1">
                Parcourez notre catalogue de produits d'investissement (fonds, immobilier, private equity, etc.) 
                et construisez votre mix produit par produit.
              </p>
              
              <Button 
                onClick={() => navigate("/invest/explore")}
                size="lg"
                variant="outline"
                className="w-full"
              >
                Explorer
              </Button>
            </div>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="text-center pt-4">
          <p className="text-sm text-muted-foreground">
            Besoin d'accompagnement ? Un conseiller BNP Paribas Private Banking peut vous aider.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Invest;
