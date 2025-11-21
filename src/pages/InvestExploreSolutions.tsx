import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lightbulb, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AppointmentModal from "@/components/AppointmentModal";

type ProductType = "Private Equity" | "Immobilier" | "Produits structurés" | "Fonds" | "Assurance-vie" | "SCPI" | "Mix";

interface ProductUniverseItem {
  id: string;
  name: string;
  description: string;
  types: ProductType[];
  riskLevel: "Prudent" | "Équilibré" | "Dynamique";
  isMix?: boolean;
}

const productUniverse: ProductUniverseItem[] = [
  {
    id: "pe-direct",
    name: "Accès Private Equity institutionnel",
    description:
      "Fonds de Private Equity sélectionnés par les équipes BNP, avec tickets d'entrée adaptés aux clients Private.",
    types: ["Private Equity"],
    riskLevel: "Dynamique",
  },
  {
    id: "immo-scpi",
    name: "SCPI diversifiées européennes",
    description: "Sélection de SCPI immobilières gérées par des sociétés reconnues, pour générer un revenu régulier.",
    types: ["Immobilier", "SCPI"],
    riskLevel: "Prudent",
  },
  {
    id: "struct-protect",
    name: "Produits structurés à capital partiellement protégé",
    description: "Produits indexés sur des indices actions avec mécanismes de protection du capital à l'échéance.",
    types: ["Produits structurés"],
    riskLevel: "Équilibré",
  },
  {
    id: "funds-diversified",
    name: "Fonds diversifiés multi-classes d'actifs",
    description: "Portefeuilles gérés par BNP combinant obligations, actions et liquidités selon votre profil.",
    types: ["Fonds", "Assurance-vie"],
    riskLevel: "Équilibré",
  },
  {
    id: "mix-income",
    name: "Mix Revenu & Stabilité",
    description: "Combinaison de SCPI, fonds obligataires et produits structurés prudents pour des revenus réguliers.",
    types: ["Immobilier", "SCPI", "Produits structurés", "Mix"],
    riskLevel: "Prudent",
    isMix: true,
  },
  {
    id: "mix-growth",
    name: "Mix Croissance long terme",
    description: "Allocation orientée croissance avec Private Equity, fonds actions monde et une part d'immobilier.",
    types: ["Private Equity", "Fonds", "Immobilier", "Mix"],
    riskLevel: "Dynamique",
    isMix: true,
  },
];

const AVAILABLE_FILTERS: ProductType[] = [
  "Private Equity",
  "Immobilier",
  "Produits structurés",
  "Fonds",
  "Assurance-vie",
  "SCPI",
  "Mix",
];

const InvestExploreSolutions = () => {
  const navigate = useNavigate();
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<ProductType[]>([]);
  const [investmentAmount, setInvestmentAmount] = useState("");

  const toggleFilter = (type: ProductType) => {
    setSelectedFilters((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]));
  };

  const filteredProducts = useMemo(() => {
    if (selectedFilters.length === 0) return productUniverse;
    return productUniverse.filter((product) => product.types.some((t) => selectedFilters.includes(t)));
  }, [selectedFilters]);

  const getRecommendation = () => {
    const amount = parseInt(investmentAmount);
    if (!amount || isNaN(amount)) return null;

    if (amount < 10000) {
      return "Pour ce montant, nous recommandons de commencer par des fonds diversifiés accessibles avec l'assurance-vie.";
    } else if (amount < 50000) {
      return "Recommandation BNP : 60% fonds diversifiés + 40% SCPI pour un mix équilibré revenu/croissance.";
    } else if (amount < 150000) {
      return "Recommandation BNP : 40% SCPI + 30% fonds actions + 20% produits structurés + 10% Private Equity.";
    } else {
      return "Recommandation BNP : accès aux solutions institutionnelles (Private Equity, fonds dédiés, produits sur-mesure).";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">Explorer les solutions d'investissement</h1>
          <p className="text-sm text-muted-foreground">
            Filtrez par type de produits ou explorez des mix construits par nos équipes.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {AVAILABLE_FILTERS.map((filter) => {
            const isActive = selectedFilters.includes(filter);
            return (
              <Button
                key={filter}
                size="sm"
                variant={isActive ? "secondary" : "outline"}
                className="rounded-full text-xs"
                onClick={() => toggleFilter(filter)}
              >
                {filter}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Investment Amount & Recommendation */}
      <Card className="p-5 bg-secondary/5">
        <Label htmlFor="amount" className="mb-2 block">
          Montant que vous souhaitez investir (optionnel)
        </Label>
        <div className="flex gap-3 items-end">
          <div className="flex-1">
            <Input
              id="amount"
              type="number"
              placeholder="Ex: 50 000"
              value={investmentAmount}
              onChange={(e) => setInvestmentAmount(e.target.value)}
            />
          </div>
        </div>
        {getRecommendation() && (
          <div className="mt-4 p-4 rounded-lg bg-secondary/10 border border-secondary/20">
            <p className="text-sm font-medium mb-1">💡 Recommandation BNP</p>
            <p className="text-sm text-muted-foreground">{getRecommendation()}</p>
          </div>
        )}
      </Card>

      {/* Products Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="p-5 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold">{product.name}</h3>
                <Badge
                  variant={
                    product.riskLevel === "Prudent"
                      ? "outline"
                      : product.riskLevel === "Équilibré"
                        ? "secondary"
                        : "default"
                  }
                >
                  {product.riskLevel}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{product.description}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {product.types.map((t) => (
                  <Badge key={t} variant="outline" className="text-[10px]">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>
            {product.isMix && (
              <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                <Lightbulb className="w-3 h-3" />
                Mix multi-produits proposé par BNP
              </div>
            )}
            <div className="flex gap-2 mt-4">
              <Button
                size="sm"
                className="flex-1"
                onClick={() => navigate("/my-strategy")}
              >
                Ajouter à ma stratégie
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowAppointmentModal(true)}
              >
                En parler
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Link to Community */}
      <Card className="p-5 bg-gradient-to-br from-secondary/5 to-bnp-dark-green/5 border-secondary/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-secondary" />
            <div>
              <h3 className="font-semibold">Voir les stratégies d'autres clients</h3>
              <p className="text-sm text-muted-foreground">
                Inspirez-vous de configurations anonymisées
              </p>
            </div>
          </div>
          <Button variant="outline" onClick={() => navigate("/community")}>
            Accéder à la Communauté
          </Button>
        </div>
      </Card>

      {/* Appointment Modal */}
      <AppointmentModal isOpen={showAppointmentModal} onClose={() => setShowAppointmentModal(false)} />
    </div>
  );
};

export default InvestExploreSolutions;
