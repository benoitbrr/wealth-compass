import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, TrendingUp, Sparkles, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProjectionChart from "@/components/ProjectionChart";
import BNPLogo from "@/components/BNPLogo";
import ThemeToggle from "@/components/ThemeToggle";
import BNPPattern from "@/components/BNPPattern";

const Simulator = () => {
  const navigate = useNavigate();
  const [monthlySavings, setMonthlySavings] = useState([2000]);
  const [horizon, setHorizon] = useState([15]);
  const [scenario, setScenario] = useState<"conservative" | "balanced" | "dynamic">("balanced");

  const currentWealth = 2847650;
  const scenarios = {
    conservative: { rate: 3, label: "Conservateur", color: "text-chart-3" },
    balanced: { rate: 5, label: "Équilibré", color: "text-secondary" },
    dynamic: { rate: 7, label: "Dynamique", color: "text-chart-4" }
  };

  const calculateFutureValue = () => {
    const rate = scenarios[scenario].rate / 100;
    const months = horizon[0] * 12;
    const monthly = monthlySavings[0];
    
    const futureFromCurrent = currentWealth * Math.pow(1 + rate, horizon[0]);
    const futureFromSavings = monthly * ((Math.pow(1 + rate / 12, months) - 1) / (rate / 12)) * (1 + rate / 12);
    
    return Math.round(futureFromCurrent + futureFromSavings);
  };

  const projectedWealth = calculateFutureValue();
  const totalGain = projectedWealth - currentWealth - (monthlySavings[0] * 12 * horizon[0]);

  return (
    <div className="min-h-screen bg-background bnp-pattern relative">
      <BNPPattern />
      
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-xl sticky top-0 z-50 shadow-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <BNPLogo />
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:block">
                <h1 className="text-lg font-bold">Simulateur patrimonial</h1>
                <p className="text-xs text-muted-foreground">
                  <Sparkles className="w-3 h-3 inline mr-1" />
                  Projections BNP Wealth Analytics
                </p>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8 max-w-6xl relative">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Controls */}
          <div className="space-y-6">
            <Card className="p-6 border-2 hover:border-secondary/20 shadow-card">
              <h3 className="font-semibold text-lg mb-6">Paramètres de simulation</h3>
              
              <div className="space-y-6">
                {/* Monthly Savings */}
                <div>
                  <Label className="text-base mb-3 block">
                    Épargne mensuelle : <span className="text-secondary font-semibold">{monthlySavings[0].toLocaleString("fr-FR")} €</span>
                  </Label>
                  <Slider
                    value={monthlySavings}
                    onValueChange={setMonthlySavings}
                    min={0}
                    max={10000}
                    step={100}
                    className="w-full"
                  />
                </div>

                {/* Horizon */}
                <div>
                  <Label className="text-base mb-3 block">
                    Horizon de placement : <span className="text-secondary font-semibold">{horizon[0]} ans</span>
                  </Label>
                  <Slider
                    value={horizon}
                    onValueChange={setHorizon}
                    min={1}
                    max={30}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Scenario */}
                <div>
                  <Label className="text-base mb-3 block">Scénario de rendement</Label>
                  <div className="grid grid-cols-3 gap-3">
                    <Button
                      variant={scenario === "conservative" ? "default" : "outline"}
                      onClick={() => setScenario("conservative")}
                      className="h-auto py-3 flex-col"
                    >
                      <span className="font-semibold">Prudent</span>
                      <span className="text-xs">~3% /an</span>
                    </Button>
                    <Button
                      variant={scenario === "balanced" ? "default" : "outline"}
                      onClick={() => setScenario("balanced")}
                      className="h-auto py-3 flex-col bg-secondary hover:bg-bnp-dark-green"
                    >
                      <span className="font-semibold">Équilibré</span>
                      <span className="text-xs">~5% /an</span>
                    </Button>
                    <Button
                      variant={scenario === "dynamic" ? "default" : "outline"}
                      onClick={() => setScenario("dynamic")}
                      className="h-auto py-3 flex-col"
                    >
                      <span className="font-semibold">Dynamique</span>
                      <span className="text-xs">~7% /an</span>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Results */}
            <Card className="p-6 bg-gradient-to-br from-secondary/10 to-bnp-dark-green/10 border-2 border-secondary/30 shadow-premium">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                Projection
                <Sparkles className="w-4 h-4 text-secondary" />
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Patrimoine actuel</p>
                  <p className="text-2xl font-bold">{currentWealth.toLocaleString("fr-FR")} €</p>
                </div>
                <div className="border-t pt-4">
                  <p className="text-sm text-muted-foreground mb-1">Patrimoine projeté dans {horizon[0]} ans</p>
                  <p className="text-4xl font-bold bg-gradient-to-r from-secondary to-bnp-dark-green bg-clip-text text-transparent">
                    {projectedWealth.toLocaleString("fr-FR")} €
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-secondary" />
                  <span className="font-semibold text-secondary">+{totalGain.toLocaleString("fr-FR")} € de gains</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Chart */}
          <Card className="p-6 border-2 hover:border-secondary/20 shadow-card">
            <div className="mb-4">
              <h3 className="font-semibold text-lg">Évolution projetée</h3>
              <p className="text-xs text-muted-foreground mt-1">
                <Shield className="w-3 h-3 inline mr-1" />
                Modèle BNP Paribas Wealth Management
              </p>
            </div>
            <ProjectionChart 
              current={currentWealth}
              projected={projectedWealth}
              years={horizon[0]}
              scenario={scenario}
            />
            <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
              <p className="text-sm text-muted-foreground">
                <strong>Note :</strong> Ces projections sont basées sur des hypothèses de rendement moyens. 
                Les performances passées ne préjugent pas des performances futures. Scénario {scenarios[scenario].label.toLowerCase()}.
              </p>
            </div>
          </Card>
        </div>

        {/* CTA */}
        <Card className="mt-8 p-8 text-center bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-secondary/20 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <Shield className="w-12 h-12 text-secondary mx-auto mb-4" />
          <h3 className="font-semibold text-xl mb-2 relative">Besoin d'aide pour optimiser votre stratégie ?</h3>
          <p className="text-muted-foreground mb-4 relative">
            Nos experts BNP Paribas Wealth Management sont à votre disposition
          </p>
          <Button size="lg" className="bg-secondary hover:bg-bnp-dark-green relative">
            Prendre rendez-vous avec un conseiller
          </Button>
        </Card>
      </main>
    </div>
  );
};

export default Simulator;
