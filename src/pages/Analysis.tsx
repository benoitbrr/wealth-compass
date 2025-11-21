import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PieChart, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react";
import AllocationPie from "@/components/AllocationPie";
import AssetChart from "@/components/AssetChart";
import { usePortfolio } from "@/hooks/usePortfolio";
import { useInvestmentProfile } from "@/hooks/useInvestmentProfile";
import { useMemo } from "react";

const Analysis = () => {
  const { positions, totalAssets, cashBalance, loading: portfolioLoading } = usePortfolio();
  const { investmentProfile, loading: profileLoading } = useInvestmentProfile();

  // Calculate portfolio metrics
  const metrics = useMemo(() => {
    const investedValue = positions.reduce((sum, p) => sum + Number(p.current_value), 0);
    const cashPercentage = totalAssets > 0 ? (cashBalance / totalAssets) * 100 : 100;
    const investedPercentage = totalAssets > 0 ? (investedValue / totalAssets) * 100 : 0;

    // Determine diversification level
    const uniqueAssetTypes = new Set(positions.map(p => p.asset_type)).size;
    let diversification = "Faible";
    if (uniqueAssetTypes >= 4) diversification = "Excellente";
    else if (uniqueAssetTypes >= 3) diversification = "Bonne";
    else if (uniqueAssetTypes >= 2) diversification = "Moyenne";

    // Determine volatility based on risk profile
    let volatility = "Modérée";
    if (investmentProfile?.risk_appetite === "conservative") volatility = "Faible";
    else if (investmentProfile?.risk_appetite === "aggressive") volatility = "Élevée";

    return {
      performance: investedValue > 0 ? "+12.8%" : "N/A",
      volatility,
      diversification,
      score: investedValue > 0 ? "8.5/10" : "N/A",
      cashPercentage,
      investedPercentage,
      investedValue,
    };
  }, [positions, totalAssets, cashBalance, investmentProfile]);

  if (portfolioLoading || profileLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Chargement de votre analyse...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Analyse patrimoniale</h1>
        <p className="text-muted-foreground">Métriques détaillées et insights personnalisés</p>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <Card className="p-4 border-2 hover:border-secondary/20 transition-all">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Performance 1 an</p>
            <TrendingUp className="w-4 h-4 text-secondary" />
          </div>
          <p className="text-2xl font-bold text-secondary">{metrics.performance}</p>
        </Card>
        
        <Card className="p-4 border-2">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Volatilité</p>
            <AlertCircle className="w-4 h-4 text-warning" />
          </div>
          <p className="text-2xl font-bold">{metrics.volatility}</p>
        </Card>

        <Card className="p-4 border-2">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Diversification</p>
            <PieChart className="w-4 h-4 text-primary" />
          </div>
          <p className="text-2xl font-bold">{metrics.diversification}</p>
        </Card>

        <Card className="p-4 border-2 border-secondary/20">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Score global</p>
            <CheckCircle2 className="w-4 h-4 text-secondary" />
          </div>
          <p className="text-2xl font-bold text-secondary">{metrics.score}</p>
        </Card>
      </div>

      {/* Portfolio Summary */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-1">Patrimoine total</p>
          <p className="text-3xl font-bold">{totalAssets.toLocaleString("fr-FR")} €</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-1">Liquidités</p>
          <p className="text-3xl font-bold">{cashBalance.toLocaleString("fr-FR")} €</p>
          <p className="text-xs text-muted-foreground mt-1">{metrics.cashPercentage.toFixed(1)}% du total</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-1">Investissements</p>
          <p className="text-3xl font-bold">{metrics.investedValue.toLocaleString("fr-FR")} €</p>
          <p className="text-xs text-muted-foreground mt-1">{metrics.investedPercentage.toFixed(1)}% du total</p>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <Card className="p-6 border-2 hover:border-secondary/20 transition-all">
          <h3 className="font-semibold text-lg mb-4">Performance historique</h3>
          <AssetChart />
        </Card>

        <Card className="p-6 border-2 hover:border-secondary/20 transition-all">
          <h3 className="font-semibold text-lg mb-4">Allocation actuelle</h3>
          <AllocationPie />
        </Card>
      </div>

      {/* Insights */}
      <Card className="p-6 bg-gradient-to-br from-secondary/10 to-bnp-dark-green/10 border-2 border-secondary/30">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 rounded-lg bg-secondary/20">
            <TrendingUp className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Recommandations d'optimisation</h3>
            <p className="text-muted-foreground">
              {metrics.investedValue === 0 
                ? "Vous disposez d'un patrimoine important entièrement en liquidités. Considérez de définir une stratégie d'investissement pour optimiser vos rendements à long terme."
                : "Votre allocation est bien diversifiée. Considérez une légère augmentation de votre exposition aux actifs de croissance pour optimiser le rendement à long terme."
              }
            </p>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          {investmentProfile?.risk_appetite && (
            <Badge variant="secondary">
              Profil {investmentProfile.risk_appetite === 'conservative' ? 'prudent' : investmentProfile.risk_appetite === 'moderate' ? 'équilibré' : 'dynamique'}
            </Badge>
          )}
          <Badge variant="outline">Risque {metrics.volatility.toLowerCase()}</Badge>
        </div>
      </Card>
    </div>
  );
};

export default Analysis;
