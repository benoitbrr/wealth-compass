import { Card } from "@/components/ui/card";
import { Building2, TrendingUp, Home, Bitcoin, Briefcase, PiggyBank, Shield } from "lucide-react";
import AssetCard from "@/components/AssetCard";

const Wealth = () => {
  const assets = [
    {
      category: "Comptes BNP Paribas",
      icon: Building2,
      color: "text-primary",
      items: [
        { name: "Compte courant", amount: 45230, change: 2.3 },
        { name: "Compte Premium", amount: 125000, change: 0.8 },
      ]
    },
    {
      category: "Assurances-vie BNP",
      icon: PiggyBank,
      color: "text-secondary",
      items: [
        { name: "Horizon Patrimoine", amount: 380000, change: 5.2 },
        { name: "Multisupport Excellence", amount: 225000, change: 4.1 },
      ]
    },
    {
      category: "Immobilier",
      icon: Home,
      color: "text-chart-3",
      items: [
        { name: "Résidence principale (Paris 16e)", amount: 1250000, change: 8.5 },
        { name: "Appartement locatif (Lyon)", amount: 320000, change: 6.2 },
      ]
    },
    {
      category: "Bourse & Placements",
      icon: TrendingUp,
      color: "text-chart-4",
      items: [
        { name: "PEA", amount: 185000, change: 12.8 },
        { name: "Compte-titres", amount: 142000, change: -2.1 },
      ]
    },
    {
      category: "Crypto-actifs",
      icon: Bitcoin,
      color: "text-chart-5",
      items: [
        { name: "Bitcoin", amount: 58420, change: 15.3 },
        { name: "Ethereum", amount: 32000, change: 8.7 },
      ]
    },
    {
      category: "Private Equity",
      icon: Briefcase,
      color: "text-primary",
      items: [
        { name: "Fonds Innovation Tech", amount: 150000, change: 18.2 },
      ]
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Patrimoine détaillé</h1>
        <p className="text-muted-foreground">Vue exhaustive de tous vos actifs</p>
      </div>

      <div className="space-y-8">
        {assets.map((category, idx) => (
          <div key={idx} className="animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-secondary/10">
                <category.icon className={`w-6 h-6 ${category.color}`} />
              </div>
              <h2 className="text-xl font-semibold">{category.category}</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {category.items.map((item, itemIdx) => (
                <AssetCard
                  key={itemIdx}
                  name={item.name}
                  amount={item.amount}
                  change={item.change}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Summary Card */}
      <Card className="mt-8 p-6 bg-gradient-to-br from-secondary/10 to-bnp-dark-green/10 border-2 border-secondary/30 shadow-premium">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">Patrimoine total consolidé</p>
          <p className="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-bnp-dark-green bg-clip-text text-transparent mb-4">
            2 847 650 €
          </p>
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            <Shield className="w-3 h-3" />
            Données sécurisées BNP Paribas Wealth Management
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Wealth;
