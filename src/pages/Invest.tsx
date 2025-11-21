import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Target, Calendar, Filter, SlidersHorizontal, Users, Lightbulb } from "lucide-react";

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
      "Fonds de Private Equity sélectionnés par les équipes BNP, avec tickets d’entrée adaptés aux clients Private.",
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
    description: "Produits indexés sur des indices actions avec mécanismes de protection du capital à l’échéance.",
    types: ["Produits structurés"],
    riskLevel: "Équilibré",
  },
  {
    id: "funds-diversified",
    name: "Fonds diversifiés multi-classes d’actifs",
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
    description: "Allocation orientée croissance avec Private Equity, fonds actions monde et une part d’immobilier.",
    types: ["Private Equity", "Fonds", "Immobilier", "Mix"],
    riskLevel: "Dynamique",
    isMix: true,
  },
];

const communityStrategies = [
  {
    id: "comm-1",
    name: "Stratégie “Revenus confortables”",
    profile: "Couple 55 ans, profil prudent",
    allocation: "40 % fonds euro / monétaire, 35 % SCPI, 25 % produits structurés prudents",
    objective: "Compléter les revenus avant la retraite avec une forte visibilité.",
    riskLevel: "Prudent",
    indicativeReturn: "2–3 %/an",
  },
  {
    id: "comm-2",
    name: "Stratégie “Croissance Monde”",
    profile: "Entrepreneur 42 ans, profil dynamique",
    allocation: "20 % fonds diversifiés, 40 % actions monde, 25 % Private Equity, 15 % immobilier",
    objective: "Faire croître un capital sur 10–15 ans.",
    riskLevel: "Dynamique",
    indicativeReturn: "5–7 %/an",
  },
  {
    id: "comm-3",
    name: "Stratégie “Patrimoine équilibré”",
    profile: "Dirigeant 50 ans, profil équilibré",
    allocation: "30 % fonds euro / obligataire, 30 % fonds diversifiés, 25 % immobilier, 15 % produits structurés",
    objective: "Protéger le capital tout en battant l’inflation.",
    riskLevel: "Équilibré",
    indicativeReturn: "3–5 %/an",
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
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [questionnaireCompleted, setQuestionnaireCompleted] = useState(false);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<ProductType[]>([]);

  // Mock profile data - in real app, this would come from context
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

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-10">
      {/* HEADER */}
      <section className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/20 mb-4">
          <Target className="w-8 h-8 text-secondary" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Définir ma stratégie d&apos;investissement</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Bienvenue chez BNP Private Banking. À partir de votre profil et de vos objectifs, nous vous aidons à explorer
          les solutions d’investissement : accompagnement par un conseiller, mix de produits ou stratégie personnalisée.
        </p>
      </section>

      {/* SECTION 0 – Choisir comment commencer */}
      <section className="grid gap-4 md:grid-cols-3">
        <Card className="p-5 flex flex-col justify-between">
          <div className="space-y-2">
            <h2 className="font-semibold flex items-center gap-2">
              <Calendar className="w-4 h-4 text-secondary" />
              Parler à un conseiller
            </h2>
            <p className="text-sm text-muted-foreground">
              Un expert BNP Private Banking vous accompagne pour structurer votre patrimoine et valider vos choix.
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
              Découvrir ma stratégie
            </h2>
            <p className="text-sm text-muted-foreground">
              Répondez à quelques questions pour obtenir une proposition d’allocation adaptée à votre profil.
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

        <Card className="p-5 flex flex-col justify-between">
          <div className="space-y-2">
            <h2 className="font-semibold flex items-center gap-2">
              <Filter className="w-4 h-4 text-secondary" />
              Explorer les produits & mix
            </h2>
            <p className="text-sm text-muted-foreground">
              Filtrez par type de produits (PE, immobilier, produits structurés, etc.) et explorez des combinaisons
              possibles.
            </p>
          </div>
          <a href="#produits" className="mt-4">
            <Button variant="outline" className="w-full">
              Voir les univers d&apos;investissement
            </Button>
          </a>
        </Card>
      </section>

      <Separator />

      {/* SECTION A – Questionnaire profil investisseur */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold">Mon profil investisseur & stratégie proposée</h2>
            <p className="text-sm text-muted-foreground">
              Répondez à quelques questions pour générer une stratégie adaptée.
            </p>
          </div>
          {!showQuestionnaire && (
            <Button variant="ghost" size="sm" onClick={() => setShowQuestionnaire(true)}>
              Lancer le questionnaire
            </Button>
          )}
        </div>

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
                      À partir de vos réponses, nous avons identifié une stratégie adaptée à votre profil. Vous pouvez
                      l’affiner en explorant nos allocations prêtes à l’emploi ou en construisant votre propre
                      stratégie.
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
                      Voir les stratégies recommandées
                    </Button>
                    <Button variant="ghost" onClick={() => setShowAppointmentModal(true)}>
                      Discuter avec un conseiller
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </div>
        )}
      </section>

      <Separator />

      {/* SECTION B – Univers produits & mix */}
      <section id="produits" className="space-y-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-xl font-bold">Explorer les univers d’investissement</h2>
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
                  Exemple de combinaison multi-produits.
                </div>
              )}
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* SECTION C – Stratégies recommandées & builder */}
      <section id="strategies" className="space-y-10">
        <div>
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold mb-2">Stratégies recommandées pour vous</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Découvrez nos allocations prêtes à l&apos;emploi, conçues par nos équipes BNP Private Banking, puis
              ajustez si besoin.
            </p>
          </div>
          <PrebuiltStrategies onSelect={(strategyIdOrName: string) => setSelectedStrategy(strategyIdOrName)} />
        </div>

        <div>
          <div className="mb-6 text-center">
            <h2 className="text-xl font-bold mb-1">Créer ma propre stratégie</h2>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              Vous avez des convictions particulières ? Ajustez les grandes classes d’actifs pour construire une
              allocation sur mesure.
            </p>
          </div>
          <CustomStrategyBuilder onComplete={(strategyIdOrName: string) => setSelectedStrategy(strategyIdOrName)} />
        </div>
      </section>

      <Separator />

      {/* SECTION D – Stratégies de la communauté */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-secondary" />
          <h2 className="text-xl font-bold">Stratégies de la communauté</h2>
        </div>
        <p className="text-sm text-muted-foreground max-w-2xl">
          Inspirez-vous de configurations anonymisées de clients aux profils similaires au vôtre. Ces exemples ne
          constituent pas un conseil personnalisé, mais illustrent des approches courantes.
        </p>

        <div className="grid gap-4 md:grid-cols-3">
          {communityStrategies.map((s) => (
            <Card key={s.id} className="p-4 flex flex-col justify-between hover:border-secondary/60 transition">
              <div className="space-y-1">
                <h3 className="font-semibold text-sm">{s.name}</h3>
                <p className="text-xs text-muted-foreground">{s.profile}</p>
                <p className="text-xs mt-2">{s.allocation}</p>
                <p className="text-xs text-muted-foreground mt-2">Objectif : {s.objective}</p>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs">
                <Badge variant="outline">{s.riskLevel}</Badge>
                <span className="text-muted-foreground">Cible : {s.indicativeReturn}</span>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* SECTION E – Contacter un conseiller (bloc final) */}
      <section>
        <Card className="p-6 bg-gradient-to-br from-secondary/10 to-bnp-dark-green/10 border-2 border-secondary/30">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary/20 mb-4">
              <Calendar className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="text-xl font-bold mb-3">Besoin d&apos;un avis expert ?</h3>
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
