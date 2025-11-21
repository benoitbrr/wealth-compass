import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Shield, Target, ArrowRight } from "lucide-react";

const Invest = () => {
  const products = [
    {
      title: "Assurance-vie Multisupport",
      type: "Sécurisé",
      performance: "+4.2%",
      risk: "Faible",
      description: "Investissement progressif avec garantie en capital"
    },
    {
      title: "PEA Dynamique",
      type: "Croissance",
      performance: "+8.5%",
      risk: "Modéré",
      description: "Actions européennes sélectionnées par nos experts"
    },
    {
      title: "Private Equity",
      type: "Premium",
      performance: "+12.8%",
      risk: "Élevé",
      description: "Accès exclusif aux fonds non cotés"
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Investir avec BNP</h1>
        <p className="text-muted-foreground">Suggestions d'allocation et produits recommandés</p>
      </div>

      {/* Recommendation Banner */}
      <Card className="p-6 mb-8 bg-gradient-to-br from-secondary/10 to-bnp-dark-green/10 border-2 border-secondary/30">
        <div className="flex items-start gap-3">
          <div className="p-3 rounded-lg bg-secondary/20">
            <Target className="w-6 h-6 text-secondary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">Recommandation personnalisée</h3>
            <p className="text-muted-foreground mb-4">
              Basé sur votre profil équilibré, nous vous suggérons de diversifier avec 60% en fonds sécurisés et 40% en actifs de croissance.
            </p>
            <Button className="bg-secondary hover:bg-bnp-dark-green">
              Voir l'allocation suggérée
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Products Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {products.map((product, idx) => (
          <Card key={idx} className="p-6 border-2 hover:border-secondary/30 hover:shadow-premium transition-all group">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="secondary">{product.type}</Badge>
                <span className="text-sm font-semibold text-secondary">{product.performance}</span>
              </div>
              <h3 className="font-bold text-lg mb-2">{product.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{product.description}</p>
            </div>

            <div className="flex items-center gap-2 mb-4 text-sm">
              {product.risk === "Faible" ? (
                <Shield className="w-4 h-4 text-secondary" />
              ) : product.risk === "Modéré" ? (
                <TrendingUp className="w-4 h-4 text-warning" />
              ) : (
                <TrendingUp className="w-4 h-4 text-destructive" />
              )}
              <span className="text-muted-foreground">Risque {product.risk.toLowerCase()}</span>
            </div>

            <Button variant="outline" className="w-full border-2 group-hover:border-secondary/50">
              En savoir plus
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Invest;
