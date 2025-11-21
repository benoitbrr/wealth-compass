import { Card } from "@/components/ui/card";
import { Landmark, TrendingUp, Home, Bitcoin, Briefcase, Shield } from "lucide-react";
import { usePortfolio } from "@/hooks/usePortfolio";
import { useMemo } from "react";

const Wealth = () => {
  const { positions, totalAssets, cashBalance, loading } = usePortfolio();

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

    const total = totalAssets || 1;

    return [
      {
        id: 'cash',
        name: "Liquidités",
        icon: Landmark,
        amount: cashBalance,
        percentage: (cashBalance / total) * 100,
      },
      {
        id: 'stocks',
        name: "Marchés cotés",
        icon: TrendingUp,
        amount: stocksValue,
        percentage: (stocksValue / total) * 100,
      },
      {
        id: 'real-estate',
        name: "Immobilier",
        icon: Home,
        amount: realEstateValue,
        percentage: (realEstateValue / total) * 100,
      },
      {
        id: 'private-equity',
        name: "Private Equity",
        icon: Briefcase,
        amount: privateEquityValue,
        percentage: (privateEquityValue / total) * 100,
      },
      {
        id: 'crypto',
        name: "Crypto",
        icon: Bitcoin,
        amount: cryptoValue,
        percentage: (cryptoValue / total) * 100,
      },
    ];
  }, [positions, totalAssets, cashBalance]);

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
        <h1 className="text-3xl font-bold mb-2">Répartition de votre patrimoine</h1>
        <p className="text-muted-foreground">Vue par grande classe d'actifs</p>
      </div>

      {/* Asset Bubbles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {categoryData.map((category) => {
          const isEmpty = category.amount === 0;
          
          return (
            <div
              key={category.id}
              className={`cursor-pointer transition-all duration-300 ${
                isEmpty ? 'opacity-50 hover:opacity-75' : 'hover:scale-105'
              }`}
              onClick={() => console.log(`Clicked on ${category.name}`)}
            >
              <Card className={`
                relative overflow-hidden
                rounded-2xl
                aspect-square
                p-6
                flex flex-col items-center justify-center
                text-center
                transition-all duration-300
                ${isEmpty 
                  ? 'bg-muted/30 border-muted hover:bg-muted/40' 
                  : 'bg-card hover:shadow-2xl hover:border-primary/30 shadow-lg'
                }
              `}>
                {/* Icon bubble */}
                <div className={`
                  w-16 h-16 rounded-full 
                  flex items-center justify-center
                  mb-4
                  transition-all duration-300
                  ${isEmpty 
                    ? 'bg-muted/50' 
                    : 'bg-gradient-to-br from-primary/20 to-secondary/20'
                  }
                `}>
                  <category.icon className={`w-8 h-8 ${isEmpty ? 'text-muted-foreground' : 'text-primary'}`} />
                </div>

                {/* Category name */}
                <h3 className={`font-semibold text-base mb-3 ${isEmpty ? 'text-muted-foreground' : 'text-foreground'}`}>
                  {category.name}
                </h3>

                {/* Amount */}
                <p className={`text-2xl font-bold mb-2 ${isEmpty ? 'text-muted-foreground' : 'text-foreground'}`}>
                  {category.amount.toLocaleString("fr-FR")} €
                </p>

                {/* Percentage */}
                <div className={`
                  px-3 py-1 rounded-full text-xs font-medium
                  ${isEmpty 
                    ? 'bg-muted text-muted-foreground' 
                    : 'bg-primary/10 text-primary'
                  }
                `}>
                  {category.percentage.toFixed(1)}%
                </div>

                {/* Subtle shine effect for active bubbles */}
                {!isEmpty && (
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                )}
              </Card>
            </div>
          );
        })}
      </div>

      {/* Summary Card */}
      <Card className="p-8 bg-gradient-to-br from-secondary/10 to-bnp-dark-green/10 border-2 border-secondary/30 shadow-premium">
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
