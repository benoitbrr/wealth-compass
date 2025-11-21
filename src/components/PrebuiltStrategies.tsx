import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, TrendingUp, Target } from "lucide-react";

interface Strategy {
  id: string;
  title: string;
  description: string;
  riskLevel: string;
  target: string;
  allocation: { label: string; value: number; color: string }[];
  icon: any;
  badge: string;
}

const strategies: Strategy[] = [
  {
    id: "stability",
    title: "Stabilité & Revenu",
    description: "Pour protéger votre capital tout en générant des revenus réguliers.",
    riskLevel: "Bas",
    target: "2-3%",
    allocation: [
      { label: "Fonds euros / Monétaire", value: 40, color: "hsl(var(--primary))" },
      { label: "Obligations prudentes", value: 35, color: "hsl(var(--secondary))" },
      { label: "Immobilier / SCPI", value: 25, color: "hsl(var(--accent))" },
    ],
    icon: Shield,
    badge: "Prudent",
  },
  {
    id: "balance",
    title: "Équilibre & Croissance",
    description: "Pour chercher une performance supérieure à l'inflation tout en maîtrisant le risque.",
    riskLevel: "Moyen",
    target: "3-5%",
    allocation: [
      { label: "Fonds diversifiés", value: 30, color: "hsl(var(--primary))" },
      { label: "Actions", value: 25, color: "hsl(var(--secondary))" },
      { label: "Obligations", value: 20, color: "hsl(var(--accent))" },
      { label: "Immobilier", value: 15, color: "hsl(var(--muted))" },
      { label: "Private Equity", value: 10, color: "hsl(var(--chart-1))" },
    ],
    icon: Target,
    badge: "Équilibré",
  },
  {
    id: "growth",
    title: "Croissance long terme",
    description: "Pour accepter plus de volatilité et viser une croissance forte à long terme.",
    riskLevel: "Élevé",
    target: "5-7%",
    allocation: [
      { label: "Actions internationales", value: 45, color: "hsl(var(--primary))" },
      { label: "Fonds thématiques", value: 25, color: "hsl(var(--secondary))" },
      { label: "Private Equity", value: 15, color: "hsl(var(--accent))" },
      { label: "Immobilier", value: 10, color: "hsl(var(--muted))" },
      { label: "Monétaire", value: 5, color: "hsl(var(--chart-1))" },
    ],
    icon: TrendingUp,
    badge: "Dynamique",
  },
];

interface PrebuiltStrategiesProps {
  onSelect: (strategy: string) => void;
}

const PrebuiltStrategies = ({ onSelect }: PrebuiltStrategiesProps) => {
  return (
    <div>
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2">Stratégies prêtes à l'emploi</h3>
        <p className="text-sm text-muted-foreground">
          Choisissez une stratégie d'investissement adaptée à votre profil
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {strategies.map((strategy) => {
          const Icon = strategy.icon;
          const total = strategy.allocation.reduce((sum, item) => sum + item.value, 0);

          return (
            <Card
              key={strategy.id}
              className="p-5 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 rounded-lg bg-secondary/20">
                  <Icon className="w-5 h-5 text-secondary" />
                </div>
                <Badge variant="secondary" className="text-xs">
                  {strategy.badge}
                </Badge>
              </div>

              <h4 className="font-bold mb-2">{strategy.title}</h4>
              <p className="text-sm text-muted-foreground mb-4">
                {strategy.description}
              </p>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Niveau de risque</span>
                  <span className="font-medium">{strategy.riskLevel}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Rendement cible</span>
                  <span className="font-medium">{strategy.target} / an</span>
                </div>
              </div>

              {/* Simple bar visualization */}
              <div className="mb-4">
                <p className="text-xs font-medium mb-2">Répartition :</p>
                <div className="flex h-3 rounded-full overflow-hidden mb-2">
                  {strategy.allocation.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        width: `${(item.value / total) * 100}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  ))}
                </div>
                <div className="space-y-1">
                  {strategy.allocation.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-xs">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="font-medium">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                onClick={() => onSelect(strategy.id)}
                className="w-full bg-primary hover:bg-bnp-dark-green"
                size="sm"
              >
                Choisir cette stratégie
              </Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default PrebuiltStrategies;
