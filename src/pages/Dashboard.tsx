import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, ArrowUpRight, Bell, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AssetChart from "@/components/AssetChart";
import AllocationPie from "@/components/AllocationPie";
import InsightCard from "@/components/InsightCard";

const Dashboard = () => {
  const navigate = useNavigate();

  const totalWealth = 2847650;
  const dayChange = 12480;
  const dayChangePercent = 0.44;
  const weekChange = -8920;
  const weekChangePercent = -0.31;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold text-primary">E-Private</h1>
              <nav className="hidden md:flex items-center gap-6">
                <Button variant="ghost" onClick={() => navigate("/dashboard")}>Dashboard</Button>
                <Button variant="ghost" onClick={() => navigate("/wealth")}>Patrimoine</Button>
                <Button variant="ghost" onClick={() => navigate("/simulator")}>Simulateur</Button>
                <Button variant="ghost" onClick={() => navigate("/recommendations")}>Insights</Button>
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Wealth Overview */}
        <div className="mb-8 animate-fade-in">
          <p className="text-sm text-muted-foreground mb-2">Patrimoine total</p>
          <div className="flex items-baseline gap-4 mb-4">
            <h2 className="text-5xl font-bold">
              {totalWealth.toLocaleString("fr-FR")} €
            </h2>
          </div>
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              {dayChange >= 0 ? (
                <TrendingUp className="w-4 h-4 text-secondary" />
              ) : (
                <TrendingDown className="w-4 h-4 text-destructive" />
              )}
              <span className={`font-medium ${dayChange >= 0 ? "text-secondary" : "text-destructive"}`}>
                {dayChange >= 0 ? "+" : ""}{dayChange.toLocaleString("fr-FR")} € ({dayChangePercent >= 0 ? "+" : ""}{dayChangePercent}%)
              </span>
              <span className="text-sm text-muted-foreground">24h</span>
            </div>
            <div className="flex items-center gap-2">
              {weekChange >= 0 ? (
                <TrendingUp className="w-4 h-4 text-secondary" />
              ) : (
                <TrendingDown className="w-4 h-4 text-destructive" />
              )}
              <span className={`font-medium ${weekChange >= 0 ? "text-secondary" : "text-destructive"}`}>
                {weekChange >= 0 ? "+" : ""}{weekChange.toLocaleString("fr-FR")} € ({weekChangePercent >= 0 ? "+" : ""}{weekChangePercent}%)
              </span>
              <span className="text-sm text-muted-foreground">7j</span>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Évolution du patrimoine</h3>
              <Button variant="ghost" size="sm" className="text-xs">
                1A
              </Button>
            </div>
            <AssetChart />
          </Card>

          <Card className="p-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <h3 className="font-semibold text-lg mb-4">Répartition des actifs</h3>
            <AllocationPie />
          </Card>
        </div>

        {/* Insights */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-xl">Insights & Recommandations</h3>
            <Button variant="ghost" onClick={() => navigate("/recommendations")}>
              Voir tout
              <ArrowUpRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <InsightCard
              type="warning"
              title="Concentration liquidités"
              description="Votre allocation en liquidités (32%) est supérieure à la recommandation pour votre profil."
              action="Optimiser"
            />
            <InsightCard
              type="success"
              title="Performance excellente"
              description="Vos investissements immobiliers surperforment de +15% vs marché."
              action="Analyser"
            />
            <InsightCard
              type="info"
              title="Opportunité crypto"
              description="Diversification possible avec 5% en actifs numériques sécurisés."
              action="Découvrir"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="p-6 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/wealth")}>
            <h4 className="font-semibold mb-2">Vue détaillée</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Explorez tous vos actifs en détail
            </p>
            <Button variant="ghost" size="sm" className="w-full">
              Accéder
              <ArrowUpRight className="ml-2 w-4 h-4" />
            </Button>
          </Card>
          
          <Card className="p-6 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/simulator")}>
            <h4 className="font-semibold mb-2">Simulateur</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Projetez votre patrimoine futur
            </p>
            <Button variant="ghost" size="sm" className="w-full">
              Simuler
              <ArrowUpRight className="ml-2 w-4 h-4" />
            </Button>
          </Card>

          <Card className="p-6 cursor-pointer hover:shadow-lg transition-shadow bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
            <h4 className="font-semibold mb-2">Expert BNP</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Contactez votre conseiller dédié
            </p>
            <Button variant="outline" size="sm" className="w-full">
              Prendre RDV
              <ArrowUpRight className="ml-2 w-4 h-4" />
            </Button>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
