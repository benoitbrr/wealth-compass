import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, SlidersHorizontal, Filter, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Invest = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/20 mb-4">
          <Target className="w-8 h-8 text-secondary" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Choisir comment définir ma stratégie</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Bienvenue chez BNP Private Banking. Deux parcours s'offrent à vous pour construire votre stratégie d'investissement.
        </p>
      </div>

      {/* Two main option cards */}
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Card className="p-8 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-secondary/30">
          <div className="flex flex-col h-full">
            <div className="mb-6">
              <div className="inline-flex p-3 rounded-lg bg-secondary/20 mb-4">
                <SlidersHorizontal className="w-8 h-8 text-secondary" />
              </div>
              <h2 className="text-2xl font-bold mb-3">Définir ma stratégie avec un questionnaire et des stratégies proposées</h2>
              <p className="text-muted-foreground">
                Répondez à un questionnaire guidé pour obtenir des stratégies recommandées adaptées à votre profil et vos objectifs.
              </p>
            </div>
            <Button
              onClick={() => navigate("/onboarding")}
              className="mt-auto"
              size="lg"
            >
              Commencer
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </Card>

        <Card className="p-8 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-secondary/30">
          <div className="flex flex-col h-full">
            <div className="mb-6">
              <div className="inline-flex p-3 rounded-lg bg-secondary/20 mb-4">
                <Filter className="w-8 h-8 text-secondary" />
              </div>
              <h2 className="text-2xl font-bold mb-3">Explorer les solutions d'investissement et construire mon mix produit par produit</h2>
              <p className="text-muted-foreground">
                Parcourez notre univers de produits et construisez votre propre allocation en combinant les solutions de votre choix.
              </p>
            </div>
            <Button
              onClick={() => navigate("/invest/explore")}
              variant="outline"
              className="mt-auto"
              size="lg"
            >
              Explorer
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Invest;
