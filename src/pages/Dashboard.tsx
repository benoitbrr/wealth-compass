import { useNavigate } from "react-router-dom";
import WealthEvolutionChart from "@/components/WealthEvolutionChart";
import DonutAllocation from "@/components/DonutAllocation";
import PerformanceCarousel from "@/components/PerformanceCarousel";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, TrendingUp } from "lucide-react";
import { usePortfolio } from "@/hooks/usePortfolio";
import { useInvestmentProfile } from "@/hooks/useInvestmentProfile";

const performanceAssets = [
  {
    name: "PEA Actions",
    value: 437747,
    change: 8755,
    changePercent: 2.04,
    sparklineData: [420000, 425000, 422000, 430000, 435000, 437747],
  },
  {
    name: "Immobilier locatif",
    value: 374356,
    change: 3744,
    changePercent: 1.01,
    sparklineData: [365000, 368000, 370000, 371000, 373000, 374356],
  },
  {
    name: "Assurance-vie",
    value: 249570,
    change: 1248,
    changePercent: 0.5,
    sparklineData: [245000, 246000, 247000, 248000, 249000, 249570],
  },
  {
    name: "Compte-titres",
    value: 124785,
    change: -1872,
    changePercent: -1.48,
    sparklineData: [130000, 128000, 127000, 126000, 125000, 124785],
  },
  {
    name: "Private Equity",
    value: 61392,
    change: 1839,
    changePercent: 3.09,
    sparklineData: [58000, 59000, 59500, 60000, 60800, 61392],
  },
  {
    name: "Crypto",
    value: 48900,
    change: 2445,
    changePercent: 5.26,
    sparklineData: [45000, 46000, 46800, 47500, 48200, 48900],
  },
  {
    name: "Livret A",
    value: 22300,
    change: 89,
    changePercent: 0.4,
    sparklineData: [22100, 22150, 22200, 22250, 22280, 22300],
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { totalAssets, cashBalance, accounts, positions, loading } = usePortfolio();
  const { investmentProfile } = useInvestmentProfile();

  // Check if user has defined a strategy
  const hasStrategy = !!investmentProfile?.selected_strategy;
  const hasInvestments = positions.length > 0;

  if (loading) {
    return (
      <div className="w-full h-full overflow-x-hidden flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

  // Empty state - no strategy defined yet
  if (!hasStrategy) {
    return (
      <div className="w-full h-full overflow-x-hidden">
        <div className="px-5 py-8 max-w-6xl mx-auto space-y-6">
          {/* Section Compte Courant */}
          <Card className="p-6 bg-card border">
            <h2 className="text-lg font-semibold mb-4">Compte courant</h2>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-primary">
                {cashBalance.toLocaleString('fr-FR')}
              </span>
              <span className="text-xl text-muted-foreground">€</span>
            </div>
          </Card>

          {/* Section Investissements */}
          <Card className="p-8 bg-gradient-to-br from-secondary/10 to-bnp-dark-green/10 border-2 border-secondary/30">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/20 mb-4">
                <Target className="w-8 h-8 text-secondary" />
              </div>
              
              <h2 className="text-2xl font-bold">Investissements</h2>
              
              <p className="text-muted-foreground">
                Vous n'avez pas encore défini votre stratégie d'investissement.
              </p>
              
              <div className="pt-4">
                <Button 
                  onClick={() => navigate("/invest")}
                  size="lg"
                  className="bg-secondary hover:bg-bnp-dark-green"
                >
                  <TrendingUp className="mr-2 w-5 h-5" />
                  Investir
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // User has strategy but no investments yet (60M cash only)
  if (!hasInvestments) {
    return (
      <div className="w-full h-full overflow-x-hidden">
        <div className="px-5 py-8 max-w-6xl mx-auto space-y-6">
          {/* Wealth Overview */}
          <Card className="p-6 bg-card border">
            <h2 className="text-lg font-semibold mb-4">Patrimoine total</h2>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-4xl font-bold text-primary">
                {totalAssets.toLocaleString('fr-FR')}
              </span>
              <span className="text-2xl text-muted-foreground">€</span>
            </div>

            {/* Accounts breakdown */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground">Comptes</h3>
              {accounts.map((account) => (
                <div key={account.id} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm">{account.name}</span>
                  <span className="font-semibold">
                    {Number(account.balance).toLocaleString('fr-FR')} {account.currency}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Strategy Status */}
          <Card className="p-8 bg-gradient-to-br from-secondary/10 to-bnp-dark-green/10 border-2 border-secondary/30">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/20 mb-4">
                <Target className="w-8 h-8 text-secondary" />
              </div>
              
              <h2 className="text-2xl font-bold">Stratégie définie</h2>
              
              <p className="text-muted-foreground">
                Vous avez sélectionné : <strong>{investmentProfile.selected_strategy}</strong>
              </p>
              
              <p className="text-sm text-muted-foreground">
                Vos fonds sont actuellement sur votre compte courant. 
                Explorez les solutions d'investissement pour commencer à déployer votre stratégie.
              </p>
              
              <div className="pt-4 flex gap-4 justify-center">
                <Button 
                  onClick={() => navigate("/invest/explore")}
                  size="lg"
                  className="bg-secondary hover:bg-bnp-dark-green"
                >
                  <TrendingUp className="mr-2 w-5 h-5" />
                  Explorer les solutions
                </Button>
                <Button 
                  onClick={() => navigate("/my-strategy")}
                  size="lg"
                  variant="outline"
                >
                  Voir ma stratégie
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Full dashboard with investments
  return (
    <div className="w-full h-full overflow-x-hidden">
      <div className="px-5 py-3 space-y-3 max-w-6xl mx-auto">
        {/* Ligne du haut : courbe + donut */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.7fr_1fr] gap-3 w-full">
          <div className="w-full min-w-0">
            <WealthEvolutionChart />
          </div>
          <div className="w-full min-w-0">
            <DonutAllocation />
          </div>
        </div>

        {/* Ligne du bas : Ma performance */}
        <PerformanceCarousel assets={performanceAssets} />
      </div>
    </div>
  );
};

export default Dashboard;
