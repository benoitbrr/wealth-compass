import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, TrendingUp, Shield, Target, ArrowRight, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CommunityStrategy {
  id: string;
  name: string;
  profile: string;
  allocation: string;
  objective: string;
  riskLevel: "Prudent" | "Équilibré" | "Dynamique";
  indicativeReturn: string;
  horizon: string;
  details?: {
    allocationBreakdown: { label: string; value: number; color: string }[];
    rationale: string;
    projection: string;
  };
}

const communityStrategies: CommunityStrategy[] = [
  {
    id: "comm-1",
    name: "Stratégie \"Revenus confortables\"",
    profile: "Couple 55 ans, profil prudent",
    allocation: "40 % fonds euro / monétaire, 35 % SCPI, 25 % produits structurés prudents",
    objective: "Compléter les revenus avant la retraite avec une forte visibilité.",
    riskLevel: "Prudent",
    indicativeReturn: "2–3 %/an",
    horizon: "&lt; 5 ans",
    details: {
      allocationBreakdown: [
        { label: "Fonds euro / Monétaire", value: 40, color: "hsl(var(--primary))" },
        { label: "SCPI", value: 35, color: "hsl(var(--secondary))" },
        { label: "Produits structurés prudents", value: 25, color: "hsl(var(--accent))" },
      ],
      rationale:
        "Cette allocation vise à générer des revenus réguliers avec une faible volatilité. Les SCPI apportent des dividendes récurrents, tandis que les fonds euro et produits structurés prudents protègent le capital.",
      projection:
        "Sur 5 ans, rendement cumulé estimé entre 10-15% avec une volatilité très limitée (< 3%).",
    },
  },
  {
    id: "comm-2",
    name: "Stratégie \"Croissance Monde\"",
    profile: "Entrepreneur 42 ans, profil dynamique",
    allocation: "20 % fonds diversifiés, 40 % actions monde, 25 % Private Equity, 15 % immobilier",
    objective: "Faire croître un capital sur 10–15 ans.",
    riskLevel: "Dynamique",
    indicativeReturn: "5–7 %/an",
    horizon: "10-15 ans",
    details: {
      allocationBreakdown: [
        { label: "Actions monde", value: 40, color: "hsl(var(--primary))" },
        { label: "Private Equity", value: 25, color: "hsl(var(--secondary))" },
        { label: "Fonds diversifiés", value: 20, color: "hsl(var(--accent))" },
        { label: "Immobilier", value: 15, color: "hsl(var(--muted))" },
      ],
      rationale:
        "Allocation orientée croissance avec une forte exposition aux actions internationales et au Private Equity pour profiter de la croissance long terme des entreprises.",
      projection:
        "Sur 10-15 ans, rendement cumulé estimé entre 80-120% avec une volatilité modérée (8-12%).",
    },
  },
  {
    id: "comm-3",
    name: "Stratégie \"Patrimoine équilibré\"",
    profile: "Dirigeant 50 ans, profil équilibré",
    allocation: "30 % fonds euro / obligataire, 30 % fonds diversifiés, 25 % immobilier, 15 % produits structurés",
    objective: "Protéger le capital tout en battant l'inflation.",
    riskLevel: "Équilibré",
    indicativeReturn: "3–5 %/an",
    horizon: "5-10 ans",
    details: {
      allocationBreakdown: [
        { label: "Fonds euro / Obligataire", value: 30, color: "hsl(var(--primary))" },
        { label: "Fonds diversifiés", value: 30, color: "hsl(var(--secondary))" },
        { label: "Immobilier", value: 25, color: "hsl(var(--accent))" },
        { label: "Produits structurés", value: 15, color: "hsl(var(--muted))" },
      ],
      rationale:
        "Combinaison équilibrée entre sécurité (obligations, fonds euro) et croissance (fonds diversifiés, immobilier) pour protéger le capital tout en battant l'inflation.",
      projection:
        "Sur 5-10 ans, rendement cumulé estimé entre 20-40% avec une volatilité faible à modérée (4-6%).",
    },
  },
];

type RiskFilter = "all" | "Prudent" | "Équilibré" | "Dynamique";
type ObjectiveFilter = "all" | "Revenu" | "Croissance" | "Protection";
type HorizonFilter = "all" | "&lt; 5 ans" | "5-10 ans" | "&gt; 10 ans";

const Community = () => {
  const navigate = useNavigate();
  const [selectedStrategy, setSelectedStrategy] = useState<CommunityStrategy | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [riskFilter, setRiskFilter] = useState<RiskFilter>("all");
  const [objectiveFilter, setObjectiveFilter] = useState<ObjectiveFilter>("all");
  const [horizonFilter, setHorizonFilter] = useState<HorizonFilter>("all");

  const filteredStrategies = communityStrategies.filter((strategy) => {
    if (riskFilter !== "all" && strategy.riskLevel !== riskFilter) return false;
    if (objectiveFilter !== "all") {
      const obj = objectiveFilter.toLowerCase();
      if (!strategy.objective.toLowerCase().includes(obj)) return false;
    }
    if (horizonFilter !== "all" && strategy.horizon !== horizonFilter) return false;
    return true;
  });

  const handleViewDetail = (strategy: CommunityStrategy) => {
    setSelectedStrategy(strategy);
    setShowDetailModal(true);
  };

  const handleUseAsBase = () => {
    setShowDetailModal(false);
    navigate("/invest#strategies");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/20 mb-4">
          <Users className="w-8 h-8 text-secondary" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Communauté & stratégies de placement</h1>
        <p className="text-muted-foreground max-w-2xl">
          Inspirez-vous de stratégies anonymisées de clients aux profils similaires. Ces exemples ne constituent pas
          un conseil personnalisé, mais illustrent des approches courantes.
        </p>
      </div>

      {/* Filters */}
      <Card className="p-5 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-4 h-4 text-secondary" />
          <h3 className="font-semibold">Filtres</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm font-medium mb-2">Profil de risque</p>
            <div className="flex flex-wrap gap-2">
              {(["all", "Prudent", "Équilibré", "Dynamique"] as RiskFilter[]).map((filter) => (
                <Button
                  key={filter}
                  size="sm"
                  variant={riskFilter === filter ? "secondary" : "outline"}
                  onClick={() => setRiskFilter(filter)}
                  className="text-xs"
                >
                  {filter === "all" ? "Tous" : filter}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Objectif</p>
            <div className="flex flex-wrap gap-2">
              {(["all", "Revenu", "Croissance", "Protection"] as ObjectiveFilter[]).map((filter) => (
                <Button
                  key={filter}
                  size="sm"
                  variant={objectiveFilter === filter ? "secondary" : "outline"}
                  onClick={() => setObjectiveFilter(filter)}
                  className="text-xs"
                >
                  {filter === "all" ? "Tous" : filter}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Horizon</p>
            <div className="flex flex-wrap gap-2">
              {(["all", "&lt; 5 ans", "5-10 ans", "&gt; 10 ans"] as HorizonFilter[]).map((filter) => (
                <Button
                  key={filter}
                  size="sm"
                  variant={horizonFilter === filter ? "secondary" : "outline"}
                  onClick={() => setHorizonFilter(filter)}
                  className="text-xs"
                >
                  {filter === "all" ? "Tous" : filter}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Strategies Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        {filteredStrategies.map((strategy) => (
          <Card
            key={strategy.id}
            className="p-4 flex flex-col justify-between hover:border-secondary/60 transition cursor-pointer"
            onClick={() => handleViewDetail(strategy)}
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-sm">{strategy.name}</h3>
                <Badge variant="outline" className="text-xs">
                  {strategy.riskLevel}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{strategy.profile}</p>
              <p className="text-xs mt-2 leading-relaxed">{strategy.allocation}</p>
              <p className="text-xs text-muted-foreground mt-2">
                <span className="font-medium">Objectif :</span> {strategy.objective}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-3 h-3 text-secondary" />
                <span className="font-medium">{strategy.indicativeReturn}</span>
              </div>
              <Button size="sm" variant="ghost" className="text-xs h-7">
                Voir détails
                <ArrowRight className="ml-1 w-3 h-3" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredStrategies.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">
            Aucune stratégie ne correspond à vos filtres. Essayez de modifier vos critères.
          </p>
        </Card>
      )}

      {/* Detail Modal */}
      <Dialog open={showDetailModal} onOpenChange={setShowDetailModal}>
        <DialogContent className="sm:max-w-2xl">
          {selectedStrategy && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedStrategy.name}</DialogTitle>
                <DialogDescription>{selectedStrategy.profile}</DialogDescription>
              </DialogHeader>

              <div className="space-y-6 py-4">
                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-3 rounded-lg bg-secondary/5 border">
                    <div className="flex items-center gap-2 mb-1">
                      <Shield className="w-4 h-4 text-secondary" />
                      <span className="text-xs text-muted-foreground">Risque</span>
                    </div>
                    <p className="font-semibold">{selectedStrategy.riskLevel}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/5 border">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="w-4 h-4 text-secondary" />
                      <span className="text-xs text-muted-foreground">Rendement</span>
                    </div>
                    <p className="font-semibold">{selectedStrategy.indicativeReturn}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/5 border">
                    <div className="flex items-center gap-2 mb-1">
                      <Target className="w-4 h-4 text-secondary" />
                      <span className="text-xs text-muted-foreground">Horizon</span>
                    </div>
                    <p className="font-semibold">{selectedStrategy.horizon}</p>
                  </div>
                </div>

                {/* Allocation Breakdown */}
                {selectedStrategy.details && (
                  <>
                    <div>
                      <h4 className="font-semibold mb-3">Répartition détaillée</h4>
                      <div className="space-y-2">
                        {selectedStrategy.details.allocationBreakdown.map((item, idx) => (
                          <div key={idx}>
                            <div className="flex justify-between text-sm mb-1">
                              <span>{item.label}</span>
                              <span className="font-medium">{item.value}%</span>
                            </div>
                            <div className="h-2 rounded-full bg-muted overflow-hidden">
                              <div
                                className="h-full transition-all"
                                style={{
                                  width: `${item.value}%`,
                                  backgroundColor: item.color,
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Rationale */}
                    <div>
                      <h4 className="font-semibold mb-2">Rationnel</h4>
                      <p className="text-sm text-muted-foreground">{selectedStrategy.details.rationale}</p>
                    </div>

                    {/* Projection */}
                    <div className="p-4 rounded-lg bg-secondary/5 border border-secondary/20">
                      <h4 className="font-semibold mb-2">Projection</h4>
                      <p className="text-sm text-muted-foreground">{selectedStrategy.details.projection}</p>
                    </div>
                  </>
                )}

                {/* Objective */}
                <div>
                  <h4 className="font-semibold mb-2">Objectif</h4>
                  <p className="text-sm text-muted-foreground">{selectedStrategy.objective}</p>
                </div>
              </div>

              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setShowDetailModal(false)}>
                  Fermer
                </Button>
                <Button onClick={handleUseAsBase} className="bg-secondary hover:bg-bnp-dark-green">
                  Utiliser comme base
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Community;
