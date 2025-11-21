import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PieChart, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react";
import AllocationPie from "@/components/AllocationPie";
import AssetChart from "@/components/AssetChart";

const Analysis = () => {
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
          <p className="text-2xl font-bold text-secondary">+12.8%</p>
        </Card>
        
        <Card className="p-4 border-2">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Volatilité</p>
            <AlertCircle className="w-4 h-4 text-warning" />
          </div>
          <p className="text-2xl font-bold">Modérée</p>
        </Card>

        <Card className="p-4 border-2">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Diversification</p>
            <PieChart className="w-4 h-4 text-primary" />
          </div>
          <p className="text-2xl font-bold">Bonne</p>
        </Card>

        <Card className="p-4 border-2 border-secondary/20">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Score global</p>
            <CheckCircle2 className="w-4 h-4 text-secondary" />
          </div>
          <p className="text-2xl font-bold text-secondary">8.5/10</p>
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
              Votre allocation est bien diversifiée. Considérez une légère augmentation de votre exposition aux actifs de croissance pour optimiser le rendement à long terme.
            </p>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <Badge variant="secondary">Profil équilibré</Badge>
          <Badge variant="outline">Risque maîtrisé</Badge>
        </div>
      </Card>
    </div>
  );
};

export default Analysis;
