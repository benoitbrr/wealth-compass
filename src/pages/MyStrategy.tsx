import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Send, Edit2, TrendingUp, Shield, Target, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface Product {
  id: string;
  name: string;
  category: string;
  amount: number;
  expectedReturn: string;
  risk: string;
}

const MyStrategy = () => {
  const navigate = useNavigate();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [comments, setComments] = useState("");

  // Mock data - in real app, this would come from context/state
  const [products] = useState<Product[]>([
    {
      id: "1",
      name: "SCPI diversifiées européennes",
      category: "Immobilier",
      amount: 50000,
      expectedReturn: "4-5%",
      risk: "Moyen",
    },
    {
      id: "2",
      name: "Fonds diversifiés multi-classes",
      category: "Fonds",
      amount: 30000,
      expectedReturn: "3-5%",
      risk: "Moyen",
    },
    {
      id: "3",
      name: "Private Equity institutionnel",
      category: "Private Equity",
      amount: 20000,
      expectedReturn: "6-8%",
      risk: "Élevé",
    },
  ]);

  const totalAmount = products.reduce((sum, p) => sum + p.amount, 0);
  const globalRisk = "Équilibré";
  const targetReturn = "4-6%";
  const averageHorizon = "5-7 ans";

  const allocation = [
    { label: "Immobilier", value: 50, color: "hsl(var(--secondary))" },
    { label: "Fonds", value: 30, color: "hsl(var(--primary))" },
    { label: "Private Equity", value: 20, color: "hsl(var(--accent))" },
  ];

  const handleSendToAdvisor = () => {
    setShowConfirmDialog(false);
    toast({
      title: "Stratégie transmise !",
      description: "Votre conseiller vous recontactera sous 24h.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/invest")}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour à Investir
        </Button>
        <h1 className="text-3xl font-bold mb-2">Ma stratégie d'investissement</h1>
        <p className="text-muted-foreground">
          Votre allocation en cours de préparation
        </p>
      </div>

      <div className="grid gap-6">
        {/* Investor Profile */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Mon profil investisseur</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-secondary/20">
                <Shield className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Appétence au risque</p>
                <p className="font-medium">Équilibré</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-secondary/20">
                <Target className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Objectif principal</p>
                <p className="font-medium">Croissance du patrimoine</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-secondary/20">
                <Clock className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Horizon</p>
                <p className="font-medium">{averageHorizon}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Products List */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Produits sélectionnés</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/invest")}
            >
              <Edit2 className="w-4 h-4 mr-2" />
              Modifier
            </Button>
          </div>

          <div className="space-y-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/5 transition"
              >
                <div className="flex-1">
                  <h3 className="font-medium mb-1">{product.name}</h3>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Badge variant="outline" className="text-xs">
                      {product.category}
                    </Badge>
                    <span>Risque : {product.risk}</span>
                    <span>Rendement : {product.expectedReturn}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">
                    {product.amount.toLocaleString("fr-FR")} €
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Separator className="my-4" />

          <div className="flex justify-between items-center">
            <span className="font-semibold">Total à investir</span>
            <span className="text-2xl font-bold text-secondary">
              {totalAmount.toLocaleString("fr-FR")} €
            </span>
          </div>
        </Card>

        {/* Overview */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Vue d'ensemble</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Donut Chart */}
            <div>
              <p className="text-sm font-medium mb-4">Répartition par catégorie</p>
              <div className="space-y-3">
                {allocation.map((item, idx) => (
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

            {/* Metrics */}
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-secondary/5 border border-secondary/20">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-secondary" />
                  <span className="text-sm text-muted-foreground">
                    Profil de risque global
                  </span>
                </div>
                <p className="text-xl font-bold">{globalRisk}</p>
              </div>

              <div className="p-4 rounded-lg bg-secondary/5 border border-secondary/20">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-secondary" />
                  <span className="text-sm text-muted-foreground">
                    Rendement cible (annualisé)
                  </span>
                </div>
                <p className="text-xl font-bold">{targetReturn}</p>
              </div>

              <div className="p-4 rounded-lg bg-secondary/5 border border-secondary/20">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-secondary" />
                  <span className="text-sm text-muted-foreground">
                    Horizon d'investissement moyen
                  </span>
                </div>
                <p className="text-xl font-bold">{averageHorizon}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex gap-4">
          <Button
            onClick={() => setShowConfirmDialog(true)}
            size="lg"
            className="flex-1 bg-secondary hover:bg-bnp-dark-green"
          >
            <Send className="w-5 h-5 mr-2" />
            Transmettre à mon conseiller
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate("/invest")}
          >
            <Edit2 className="w-5 h-5 mr-2" />
            Modifier ma stratégie
          </Button>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Transmettre ma stratégie</DialogTitle>
            <DialogDescription>
              Votre stratégie sera envoyée à votre conseiller BNP Private Banking.
              Ajoutez un commentaire si nécessaire.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Textarea
              placeholder="Commentaires ou questions pour votre conseiller..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows={4}
            />
          </div>

          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              Annuler
            </Button>
            <Button
              onClick={handleSendToAdvisor}
              className="bg-secondary hover:bg-bnp-dark-green"
            >
              <Send className="w-4 h-4 mr-2" />
              Envoyer
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyStrategy;
