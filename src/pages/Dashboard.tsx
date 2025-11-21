import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, ArrowUpRight, Bell, Menu, Shield, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AssetChart from "@/components/AssetChart";
import AllocationPie from "@/components/AllocationPie";
import InsightCard from "@/components/InsightCard";
import BNPLogo from "@/components/BNPLogo";
import ThemeToggle from "@/components/ThemeToggle";
import BNPPattern from "@/components/BNPPattern";

const Dashboard = () => {
  const navigate = useNavigate();

  const totalWealth = 2847650;
  const dayChange = 12480;
  const dayChangePercent = 0.44;
  const weekChange = -8920;
  const weekChangePercent = -0.31;

  return (
    <div className="min-h-screen bg-background bnp-pattern relative">
      <BNPPattern />
      
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-xl sticky top-0 z-50 shadow-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <BNPLogo />
              <nav className="hidden md:flex items-center gap-2">
                <Button variant="ghost" onClick={() => navigate("/dashboard")} className="font-medium">
                  Dashboard
                </Button>
                <Button variant="ghost" onClick={() => navigate("/wealth")}>Patrimoine</Button>
                <Button variant="ghost" onClick={() => navigate("/simulator")}>Simulateur</Button>
                <Button variant="ghost" onClick={() => navigate("/recommendations")}>
                  Insights
                  <Badge variant="secondary" className="ml-2 h-5 px-1.5 text-xs">AI</Badge>
                </Button>
              </nav>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full"></span>
              </Button>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-7xl relative">
        {/* Wealth Overview */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="w-5 h-5 text-secondary" />
            <p className="text-sm font-medium text-muted-foreground">Patrimoine total consolidé</p>
          </div>
          <div className="flex items-baseline gap-4 mb-4">
            <h2 className="text-6xl font-bold tracking-tight bg-gradient-to-r from-primary via-secondary to-bnp-dark-green bg-clip-text text-transparent">
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
          <Card className="p-6 animate-fade-in border-2 hover:border-secondary/20 transition-all shadow-card hover:shadow-premium group" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-lg">Évolution du patrimoine</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  <Sparkles className="w-3 h-3 inline mr-1" />
                  Powered by BNP Paribas Wealth Analytics
                </p>
              </div>
              <Button variant="ghost" size="sm" className="text-xs">
                1A
              </Button>
            </div>
            <AssetChart />
          </Card>

          <Card className="p-6 animate-fade-in border-2 hover:border-secondary/20 transition-all shadow-card hover:shadow-premium" style={{ animationDelay: "0.2s" }}>
            <div className="mb-4">
              <h3 className="font-semibold text-lg">Répartition des actifs</h3>
              <p className="text-xs text-muted-foreground mt-1">
                <Shield className="w-3 h-3 inline mr-1" />
                Analyse BNP Private Banking
              </p>
            </div>
            <AllocationPie />
          </Card>
        </div>

        {/* Insights */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-xl flex items-center gap-2">
                Insights & Recommandations
                <Badge variant="secondary" className="text-xs">
                  <Sparkles className="w-3 h-3 mr-1" />
                  IA + Expert
                </Badge>
              </h3>
              <p className="text-sm text-muted-foreground mt-1">Analyses personnalisées par nos experts BNP</p>
            </div>
            <Button variant="ghost" onClick={() => navigate("/recommendations")} className="hover:text-secondary">
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
          <Card className="p-6 cursor-pointer hover:shadow-premium transition-all border-2 hover:border-primary/20 group" onClick={() => navigate("/wealth")}>
            <h4 className="font-semibold mb-2 group-hover:text-secondary transition-colors">Vue détaillée</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Explorez tous vos actifs en détail
            </p>
            <Button variant="ghost" size="sm" className="w-full group-hover:bg-secondary/10">
              Accéder
              <ArrowUpRight className="ml-2 w-4 h-4" />
            </Button>
          </Card>
          
          <Card className="p-6 cursor-pointer hover:shadow-premium transition-all border-2 hover:border-primary/20 group" onClick={() => navigate("/simulator")}>
            <h4 className="font-semibold mb-2 group-hover:text-secondary transition-colors">Simulateur patrimonial</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Projetez votre patrimoine futur
            </p>
            <Button variant="ghost" size="sm" className="w-full group-hover:bg-secondary/10">
              Simuler
              <ArrowUpRight className="ml-2 w-4 h-4" />
            </Button>
          </Card>

          <Card className="p-6 cursor-pointer hover:shadow-premium transition-all bg-gradient-to-br from-secondary/10 to-bnp-dark-green/10 border-2 border-secondary/30 hover:border-secondary/50 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <Shield className="w-6 h-6 text-secondary mb-2" />
            <h4 className="font-semibold mb-2 relative">Votre conseiller BNP</h4>
            <p className="text-sm text-muted-foreground mb-3 relative">
              Expertise Private Banking dédiée
            </p>
            <Button size="sm" className="w-full bg-secondary hover:bg-bnp-dark-green relative">
              Prendre RDV
              <ArrowUpRight className="ml-2 w-4 h-4" />
            </Button>
          </Card>
        </div>
        
        {/* BNP Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-2">
            <Shield className="w-3 h-3" />
            Sécurisé par BNP Paribas • Données chiffrées • Conformité RGPD
          </p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
