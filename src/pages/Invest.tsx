import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Target, Calendar, Filter, SlidersHorizontal, Users, Lightbulb, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import GuidedQuestionnaire from "@/components/GuidedQuestionnaire";
import PrebuiltStrategies from "@/components/PrebuiltStrategies";
import CustomStrategyBuilder from "@/components/CustomStrategyBuilder";
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

const Invest = () => {
  const navigate = useNavigate();
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [questionnaireCompleted, setQuestionnaireCompleted] = useState(false);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<ProductType[]>([]);
  const [investmentAmount, setInvestmentAmount] = useState("");

  // Mock profile data
  const profileData = {
    firstName: "Client",
    age: 35,
    country: "France",
    experience: "Intermédiaire",
    riskAppetite: "Équilibré",
    mainGoal: "Faire fructifier mon patrimoine",
  };

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
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-10">
      {/* HEADER */}
      <section>
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/20 mb-4">
            <Target className="w-8 h-8 text-secondary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Définir ma stratégie d'investissement</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Bienvenue chez BNP Private Banking. Nous vous aidons à définir une stratégie adaptée à votre situation.
          </p>
        </div>

        {/* Two main options */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-secondary/30">
            <div className="flex flex-col h-full">
              <div className="mb-4">
                <div className="inline-flex p-3 rounded-lg bg-secondary/20 mb-3">
                  <SlidersHorizontal className="w-6 h-6 text-secondary" />
                </div>
                <h2 className="text-xl font-bold mb-2">Définir ma stratégie</h2>
                <p className="text-sm text-muted-foreground">
                  Questionnaire guidé et stratégies recommandées adaptées à votre profil.
                </p>
              </div>
              <Button
                onClick={() => {
                  const element = document.getElementById("section-a");
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }}
                className="mt-auto"
              >
                Commencer
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-secondary/30">
            <div className="flex flex-col h-full">
              <div className="mb-4">
                <div className="inline-flex p-3 rounded-lg bg-secondary/20 mb-3">
                  <Filter className="w-6 h-6 text-secondary" />
                </div>
                <h2 className="text-xl font-bold mb-2">Explorer les solutions</h2>
                <p className="text-sm text-muted-foreground">
                  Filtrez par type de produits et construisez votre propre mix d'investissement.
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  const element = document.getElementById("section-b");
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }}
                className="mt-auto"
              >
                Explorer
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </Card>
        </div>

        <div className="text-center mt-6">
          <Button variant="link" onClick={() => setShowAppointmentModal(true)}>
            Besoin d'un conseiller ?
          </Button>
        </div>
      </section>

      <Separator />

      {/* SECTION A – Définir ma stratégie */}
      <section id="section-a" className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Définir ma stratégie</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choisissez votre parcours
          </p>
        </div>

        {/* Two sub-options */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card className="p-5 flex flex-col justify-between">
            <div className="space-y-2">
              <h2 className="font-semibold flex items-center gap-2">
                <Calendar className="w-4 h-4 text-secondary" />
                Être accompagné par un conseiller
              </h2>
              <p className="text-sm text-muted-foreground">
                Un expert BNP Private Banking vous aide à structurer votre stratégie et valider vos choix.
              </p>
            </div>
            <Button className="mt-4" variant="outline" onClick={() => setShowAppointmentModal(true)}>
              Planifier un rendez-vous
            </Button>
          </Card>

          <Card className="p-5 flex flex-col justify-between">
            <div className="space-y-2">
              <h2 className="font-semibold flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-secondary" />
                Répondre à des questions
              </h2>
              <p className="text-sm text-muted-foreground">
                Répondez à quelques questions pour obtenir une proposition d'allocation adaptée à votre profil.
              </p>
            </div>
            <Button
              className="mt-4"
              onClick={() => setShowQuestionnaire(true)}
              variant={showQuestionnaire ? "default" : "outline"}
            >
              Commencer le questionnaire
            </Button>
          </Card>
        </div>

        {/* Questionnaire */}
        {showQuestionnaire && (
          <div className="space-y-6">
            <GuidedQuestionnaire
              profileData={profileData}
              onComplete={(strategyIdOrName: string) => {
                setSelectedStrategy(strategyIdOrName);
                setQuestionnaireCompleted(true);
              }}
            />

            {questionnaireCompleted && (
              <Card className="p-5 bg-gradient-to-br from-secondary/10 to-bnp-dark-green/10 border-secondary/30">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="font-semibold mb-1">Votre stratégie recommandée</h3>
                    <p className="text-sm text-muted-foreground">
                      À partir de vos réponses, nous avons identifié une stratégie adaptée à votre profil.
                    </p>
                    {selectedStrategy && (
                      <p className="mt-2 text-sm">
                        Stratégie suggérée : <span className="font-medium">{selectedStrategy}</span>
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        const element = document.getElementById("strategies");
                        if (element) element.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      Voir stratégies recommandées
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        const element = document.getElementById("custom-builder");
                        if (element) element.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      Créer ma propre stratégie
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </div>
        )}

        {/* Prebuilt Strategies */}
        <div id="strategies">
          <PrebuiltStrategies onSelect={(strategyIdOrName: string) => setSelectedStrategy(strategyIdOrName)} />
        </div>

        {/* Custom Strategy Builder */}
        <div id="custom-builder">
          <div className="mb-6 text-center">
            <h2 className="text-xl font-bold mb-1">Créer ma propre stratégie</h2>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              Vous avez des convictions particulières ? Ajustez les grandes classes d'actifs pour construire une
              allocation sur mesure.
            </p>
          </div>
          <CustomStrategyBuilder onComplete={(strategyIdOrName: string) => setSelectedStrategy(strategyIdOrName)} />
        </div>
      </section>

      <Separator />

      {/* SECTION B – Explorer les solutions */}
      <section id="section-b" className="space-y-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-xl font-bold">Explorer les solutions d'investissement</h2>
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
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </Card>
      </section>

      <Separator />

      {/* SECTION – Contacter un conseiller */}
      <section>
        <Card className="p-6 bg-gradient-to-br from-secondary/10 to-bnp-dark-green/10 border-2 border-secondary/30">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary/20 mb-4">
              <Calendar className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="text-xl font-bold mb-3">Besoin d'un avis expert ?</h3>
            <p className="text-muted-foreground mb-6">
              Partagez vos réponses et la stratégie que vous envisagez avec un conseiller BNP Private Banking pour
              sécuriser vos décisions.
            </p>
            <Button
              onClick={() => setShowAppointmentModal(true)}
              size="lg"
              className="bg-secondary hover:bg-bnp-dark-green"
            >
              <Calendar className="mr-2 w-5 h-5" />
              Planifier un rendez-vous
            </Button>
          </div>
        </Card>
      </section>

      {/* Appointment Modal */}
      <AppointmentModal isOpen={showAppointmentModal} onClose={() => setShowAppointmentModal(false)} />
    </div>
  );
};

export default Invest;
