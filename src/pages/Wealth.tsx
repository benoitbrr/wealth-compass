import { Card } from "@/components/ui/card";
import { Landmark, TrendingUp, Home, Bitcoin, Briefcase, Shield } from "lucide-react";
import AssetCard from "@/components/AssetCard";
import { usePortfolio } from "@/hooks/usePortfolio";
import { useMemo } from "react";

const Wealth = () => {
  const { accounts, positions, totalAssets, cashBalance, loading } = usePortfolio();

  // Calculate aggregated values per asset category
  const categoryData = useMemo(() => {
    const stocksValue = positions
      .filter(p => ['STOCK', 'FUND', 'ETF'].includes(p.asset_type))
      .reduce((sum, p) => sum + Number(p.current_value), 0);
    
    const realEstateValue = positions
      .filter(p => ['REAL_ESTATE', 'SCPI', 'OPCI'].includes(p.asset_type))
      .reduce((sum, p) => sum + Number(p.current_value), 0);
    
    const privateEquityValue = positions
      .filter(p => ['PRIVATE_EQUITY', 'PE_FUND'].includes(p.asset_type))
      .reduce((sum, p) => sum + Number(p.current_value), 0);
    
    const cryptoValue = positions
      .filter(p => ['CRYPTO'].includes(p.asset_type))
      .reduce((sum, p) => sum + Number(p.current_value), 0);

    const total = totalAssets || 1; // Avoid division by zero

    return [
      {
        id: 'cash',
        name: "Liquidités",
        subtitle: "Comptes courants, livrets, trésorerie",
        icon: Landmark,
        amount: cashBalance,
        percentage: (cashBalance / total) * 100,
        change: 0,
      },
      {
        id: 'stocks',
        name: "Marchés cotés",
        subtitle: "Actions, ETF, OPCVM",
        icon: TrendingUp,
        amount: stocksValue,
        percentage: (stocksValue / total) * 100,
        change: 0,
      },
      {
        id: 'real-estate',
        name: "Immobilier",
        subtitle: "Biens en direct, SCPI, OPCI",
        icon: Home,
        amount: realEstateValue,
        percentage: (realEstateValue / total) * 100,
        change: 0,
      },
      {
        id: 'private-equity',
        name: "Private Equity",
        subtitle: "Fonds non cotés, co-investissements",
        icon: Briefcase,
        amount: privateEquityValue,
        percentage: (privateEquityValue / total) * 100,
        change: 0,
      },
      {
        id: 'crypto',
        name: "Crypto",
        subtitle: "Portefeuilles et plateformes d'échange",
        icon: Bitcoin,
        amount: cryptoValue,
        percentage: (cryptoValue / total) * 100,
        change: 0,
      },
    ];
  }, [accounts, positions, totalAssets, cashBalance]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Chargement de votre portefeuille...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Portefeuille</h1>
        <p className="text-muted-foreground">Vue d'ensemble de vos actifs par catégorie</p>
      </div>

      {/* Portfolio Bubbles Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
        {categoryData.map((category) => (
          <div
            key={category.id}
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => console.log(`Clicked on ${category.name}`)}
          >
            <Card className="p-5 h-full hover:shadow-lg transition-all hover:border-primary/20">
              <div className="flex items-start gap-3 mb-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <category.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm mb-0.5">{category.name}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-1">{category.subtitle}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold mb-1">
                  {category.amount.toLocaleString("fr-FR")} €
                </p>
                <p className="text-sm text-muted-foreground">
                  {category.percentage.toFixed(1)}% du patrimoine
                </p>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* Summary Card */}
      <Card className="mt-8 p-6 bg-gradient-to-br from-secondary/10 to-bnp-dark-green/10 border-2 border-secondary/30 shadow-premium">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">Patrimoine total consolidé</p>
          <p className="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-bnp-dark-green bg-clip-text text-transparent mb-4">
            {totalAssets.toLocaleString("fr-FR")} €
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
