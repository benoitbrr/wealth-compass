import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, AlertTriangle, TrendingUp, Sparkles, Shield, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BNPLogo from "@/components/BNPLogo";
import ThemeToggle from "@/components/ThemeToggle";
import BNPPattern from "@/components/BNPPattern";

const Recommendations = () => {
  const navigate = useNavigate();

  const recommendations = [
    {
      id: 1,
      type: "optimization",
      priority: "high",
      icon: AlertTriangle,
      iconColor: "text-warning",
      title: "Optimiser votre allocation liquidités",
      description: "Votre allocation en liquidités (32% du patrimoine total) est supérieure à la recommandation pour votre profil dynamique. Nous suggérons de réduire à 15% pour améliorer le rendement global.",
      impact: "Gain potentiel annuel : +28 500 €",
      actions: [
        "Transférer 450k€ vers assurance-vie multisupport",
        "Investir 200k€ en fonds Private Equity",
      ],
      cta: "Appliquer la recommandation"
    },
    {
      id: 2,
      type: "opportunity",
      priority: "medium",
      icon: TrendingUp,
      iconColor: "text-secondary",
      title: "Opportunité immobilier commercial",
      description: "Nos experts ont identifié une SCPI premium (rendement 5.8%) alignée avec votre profil. Diversification géographique Europe.",
      impact: "Rendement visé : 5.8% / an",
      actions: [
        "SCPI Patrimoine Premium - parts disponibles",
        "Ticket min. : 100 000 €",
      ],
      cta: "En savoir plus"
    },
    {
      id: 3,
      type: "protection",
      priority: "medium",
      icon: Shield,
      iconColor: "text-chart-3",
      title: "Renforcer votre protection patrimoine",
      description: "Avec l'augmentation de votre patrimoine (+18% en 2 ans), il est recommandé d'ajuster vos garanties assurances et succession.",
      impact: "Sécurisation optimale",
      actions: [
        "Révision contrats assurance",
        "Optimisation transmission",
      ],
      cta: "Prendre RDV expert"
    },
    {
      id: 4,
      type: "diversification",
      priority: "low",
      icon: Sparkles,
      iconColor: "text-chart-5",
      title: "Diversification crypto sécurisée",
      description: "Une allocation de 3-5% en actifs numériques via notre solution institutionnelle BNP Digital Assets pourrait améliorer votre diversification.",
      impact: "Décorrélation portefeuille",
      actions: [
        "Bitcoin & Ethereum institutionnels",
        "Custody BNP sécurisée",
      ],
      cta: "Découvrir l'offre"
    },
    {
      id: 5,
      type: "performance",
      priority: "low",
      icon: Target,
      iconColor: "text-secondary",
      title: "Optimisation fiscale PEA",
      description: "Votre PEA arrive à maturité (>5 ans). Possibilité de retrait partiel sans impôt pour réinvestissement stratégique.",
      impact: "Économie fiscale potentielle",
      actions: [
        "Retrait partiel optimisé",
        "Réinvestissement Private Equity",
      ],
      cta: "Simuler"
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "default";
      case "low": return "secondary";
      default: return "default";
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "high": return "Prioritaire";
      case "medium": return "Conseillé";
      case "low": return "Opportunité";
      default: return priority;
    }
  };

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
                <h1 className="text-lg font-bold">Recommandations personnalisées</h1>
                <p className="text-xs text-muted-foreground">
                  <Sparkles className="w-3 h-3 inline mr-1" />
                  IA + Expertise BNP
                </p>
              </div>
              <Badge variant="secondary" className="hidden md:flex">
                <Sparkles className="w-3 h-3 mr-1" />
                IA + Expert
              </Badge>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8 max-w-5xl relative">
        {/* Summary */}
        <Card className="p-6 mb-8 bg-gradient-to-br from-secondary/10 to-bnp-dark-green/10 border-2 border-secondary/30 shadow-premium">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                5 recommandations actives
                <Sparkles className="w-5 h-5 text-secondary" />
              </h2>
              <p className="text-muted-foreground">
                Gain potentiel annuel total : <span className="font-bold text-secondary text-lg">+32 800 €</span>
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                <Shield className="w-3 h-3 inline mr-1" />
                Analyses validées par nos experts BNP Paribas Wealth Management
              </p>
            </div>
            <Button className="bg-secondary hover:bg-bnp-dark-green">
              Tout appliquer
            </Button>
          </div>
        </Card>

        {/* Recommendations List */}
        <div className="space-y-6">
          {recommendations.map((rec, idx) => (
            <Card 
              key={rec.id} 
              className="p-6 hover:shadow-premium transition-all border-2 hover:border-secondary/30 animate-fade-in group"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg bg-secondary/10 ${rec.iconColor} group-hover:scale-110 transition-transform`}>
                  <rec.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <Badge variant={getPriorityColor(rec.priority)} className="mb-2">
                        {getPriorityLabel(rec.priority)}
                      </Badge>
                      <h3 className="font-semibold text-lg">{rec.title}</h3>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{rec.description}</p>
                  
                  <div className="bg-secondary/10 rounded-lg p-3 mb-4 inline-block">
                    <p className="text-sm font-medium text-secondary">{rec.impact}</p>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Actions recommandées :</p>
                    <ul className="space-y-1">
                      {rec.actions.map((action, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-secondary mt-1">•</span>
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-3">
                    <Button className="bg-secondary hover:bg-bnp-dark-green">{rec.cta}</Button>
                    <Button variant="ghost">En savoir plus</Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Expert CTA */}
        <Card className="mt-8 p-8 text-center bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-secondary/20 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <Shield className="w-12 h-12 text-secondary mx-auto mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-2xl font-bold mb-2 relative">Besoin d'un avis personnalisé ?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto relative">
            Nos conseillers BNP Paribas Wealth Management sont disponibles pour analyser 
            vos besoins spécifiques et vous accompagner dans vos décisions patrimoniales.
          </p>
          <Button size="lg" className="bg-secondary hover:bg-bnp-dark-green relative">
            Contacter mon conseiller dédié
          </Button>
        </Card>
      </main>
    </div>
  );
};

export default Recommendations;
