import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target, TrendingUp, Shield, ArrowRight, Edit } from "lucide-react";
import { useInvestmentProfile } from "@/hooks/useInvestmentProfile";
import { usePortfolio } from "@/hooks/usePortfolio";

const MyStrategy = () => {
  const navigate = useNavigate();
  const { investmentProfile, loading: profileLoading } = useInvestmentProfile();
  const { totalAssets, cashBalance, loading: portfolioLoading } = usePortfolio();

  if (profileLoading || portfolioLoading) {
    return (
      <div className="w-full h-full overflow-x-hidden flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!investmentProfile?.selected_strategy) {
    return (
      <div className="w-full h-full overflow-x-hidden">
        <div className="px-5 py-8 max-w-4xl mx-auto">
          <Card className="p-8 bg-gradient-to-br from-secondary/10 to-bnp-dark-green/10 border-2 border-secondary/30">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/20 mb-4">
                <Target className="w-8 h-8 text-secondary" />
              </div>
              
              <h1 className="text-2xl font-bold">Ma stratégie d'investissement</h1>
              
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Vous n'avez pas encore défini de stratégie d'investissement. 
                Commencez par définir votre profil investisseur et choisir une stratégie adaptée à vos objectifs.
              </p>
              
              <div className="pt-4">
                <Button 
                  onClick={() => navigate("/invest")}
                  size="lg"
                  className="bg-secondary hover:bg-bnp-dark-green"
                >
                  <Target className="mr-2 w-5 h-5" />
                  Définir ma stratégie
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Get strategy details
  const getStrategyIcon = (strategy: string) => {
    if (strategy.includes("Stabilité")) return Shield;
    if (strategy.includes("Équilibre")) return Target;
    return TrendingUp;
  };

  const getStrategyBadge = (riskAppetite: string | null) => {
    if (!riskAppetite) return "Modéré";
    if (riskAppetite.includes("prudent")) return "Prudent";
    if (riskAppetite.includes("Équilibré")) return "Équilibré";
    if (riskAppetite.includes("Dynamique")) return "Dynamique";
    return riskAppetite;
  };

  const StrategyIcon = getStrategyIcon(investmentProfile.selected_strategy);

  return (
    <div className="w-full h-full overflow-x-hidden">
      <div className="px-5 py-8 max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Ma stratégie d'investissement</h1>
            <p className="text-muted-foreground">
              Votre stratégie personnalisée basée sur votre profil investisseur
            </p>
          </div>
          <Button
            onClick={() => navigate("/invest/define")}
            variant="outline"
            size="lg"
          >
            <Edit className="w-4 h-4 mr-2" />
            Modifier
          </Button>
        </div>

        {/* Selected Strategy */}
        <Card className="p-6 border-2 border-primary/50">
          <div className="flex items-start gap-6">
            <div className="p-4 rounded-xl bg-secondary/20">
              <StrategyIcon className="w-8 h-8 text-secondary" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h2 className="text-2xl font-bold">{investmentProfile.selected_strategy}</h2>
                <Badge className="bg-primary">Stratégie active</Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Profil de risque</p>
                  <p className="font-semibold">{getStrategyBadge(investmentProfile.risk_appetite)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Objectif principal</p>
                  <p className="font-semibold">{investmentProfile.main_goal || "Non défini"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Horizon d'investissement</p>
                  <p className="font-semibold">Long terme</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Profil investisseur */}
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4">Votre profil investisseur</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Expérience</p>
              <p className="font-medium">{investmentProfile.experience || "Non renseignée"}</p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground mb-2">Défi principal</p>
              <p className="font-medium">{investmentProfile.main_challenge || "Non renseigné"}</p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground mb-2">Niveau de patrimoine</p>
              <p className="font-medium">{investmentProfile.wealth_level || "Non renseigné"}</p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground mb-2">Catégories d'actifs souhaitées</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {investmentProfile.asset_categories && investmentProfile.asset_categories.length > 0 ? (
                  investmentProfile.asset_categories.map((category, idx) => (
                    <Badge key={idx} variant="secondary">{category}</Badge>
                  ))
                ) : (
                  <p className="font-medium">Non renseignées</p>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Portfolio Overview */}
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4">Vue d'ensemble du patrimoine</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Patrimoine total</p>
              <p className="text-2xl font-bold text-primary">
                {totalAssets.toLocaleString('fr-FR')} €
              </p>
            </div>
            
            <div className="p-4 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Liquidités</p>
              <p className="text-2xl font-bold">
                {cashBalance.toLocaleString('fr-FR')} €
              </p>
            </div>
            
            <div className="p-4 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Investissements</p>
              <p className="text-2xl font-bold">
                {(totalAssets - cashBalance).toLocaleString('fr-FR')} €
              </p>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex gap-4">
          <Button
            onClick={() => navigate("/invest/explore")}
            size="lg"
            className="flex-1 bg-secondary hover:bg-bnp-dark-green"
          >
            <TrendingUp className="w-5 h-5 mr-2" />
            Explorer les solutions d'investissement
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MyStrategy;
