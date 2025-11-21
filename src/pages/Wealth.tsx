"use client";

import { useMemo } from "react";
import AssetCard from "@/components/AssetCard";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Landmark, TrendingUp, Bitcoin, Home, Briefcase, type LucideIcon } from "lucide-react";
// À adapter si ton hook est ailleurs
import { usePortfolio } from "@/hooks/usePortfolio";

type PortfolioCategoryKey = "cash" | "listed" | "realEstate" | "privateEquity" | "crypto";

interface PortfolioCategory {
  key: PortfolioCategoryKey;
  title: string;
  description: string;
  icon: LucideIcon;
  value: number;
  allocation: number;
  muted: boolean;
}

function formatCurrency(amount: number, currency: string = "EUR") {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function PortfolioPage() {
  const { accounts, positions, totalAssets, cashBalance, loading, error } = usePortfolio();

  const categories: PortfolioCategory[] = useMemo(() => {
    const safeTotal = totalAssets > 0 ? totalAssets : 1; // éviter division par 0

    // Exemple de logique générique sur les positions
    const listedValue =
      positions
        ?.filter((p) => ["STOCK", "FUND", "ETF"].includes(p.asset_type.toUpperCase()))
        .reduce((sum, p) => sum + (p.current_value ?? 0), 0) ?? 0;

    const realEstateValue =
      positions
        ?.filter((p) => ["REAL_ESTATE", "SCPI", "OPCI"].includes(p.asset_type.toUpperCase()))
        .reduce((sum, p) => sum + (p.current_value ?? 0), 0) ?? 0;

    const privateEquityValue =
      positions
        ?.filter((p) => ["PRIVATE_EQUITY", "PE"].includes(p.asset_type.toUpperCase()))
        .reduce((sum, p) => sum + (p.current_value ?? 0), 0) ?? 0;

    const cryptoValue =
      positions
        ?.filter((p) => ["CRYPTO"].includes(p.asset_type.toUpperCase()))
        .reduce((sum, p) => sum + (p.current_value ?? 0), 0) ?? 0;

    const base: Omit<PortfolioCategory, "value" | "allocation" | "muted">[] = [
      {
        key: "cash",
        title: "Liquidités",
        description: "Comptes courants, livrets, trésorerie",
        icon: Landmark,
      },
      {
        key: "listed",
        title: "Marchés cotés",
        description: "Actions, ETF, OPCVM",
        icon: TrendingUp,
      },
      {
        key: "realEstate",
        title: "Immobilier",
        description: "Biens en direct, SCPI, OPCI",
        icon: Home,
      },
      {
        key: "privateEquity",
        title: "Private Equity",
        description: "Fonds non cotés, co-investissements",
        icon: Briefcase,
      },
      {
        key: "crypto",
        title: "Crypto",
        description: "Portefeuilles & plateformes d’échange",
        icon: Bitcoin,
      },
    ];

    const valuesByKey: Record<PortfolioCategoryKey, number> = {
      cash: cashBalance ?? 0,
      listed: listedValue,
      realEstate: realEstateValue,
      privateEquity: privateEquityValue,
      crypto: cryptoValue,
    };

    return base.map((c) => {
      const value = valuesByKey[c.key] ?? 0;
      const allocation = (value / safeTotal) * 100;

      return {
        ...c,
        value,
        allocation,
        muted: value === 0,
      };
    });
  }, [cashBalance, positions, totalAssets]);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-56" />
        <Skeleton className="h-6 w-80" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-40 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold">Portefeuille</h1>
        <p className="text-sm text-red-500">Une erreur est survenue lors du chargement de votre portefeuille.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Portefeuille */}
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-display font-semibold">Portefeuille</h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Vue globale de votre patrimoine et de sa répartition par grandes classes d’actifs.
        </p>
        <p className="text-sm text-muted-foreground">
          Valeur totale des actifs : <span className="font-semibold">{formatCurrency(totalAssets || 0)}</span>
        </p>
      </div>

      {/* BULLes d’actifs */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-lg md:text-xl font-semibold">Répartition de votre patrimoine</h2>
            <p className="text-sm text-muted-foreground">
              Chaque bulle représente une grande classe d’actifs dans votre portefeuille.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const valueLabel = formatCurrency(cat.value);
            const allocationLabel = totalAssets > 0 ? `${cat.allocation.toFixed(1)} %` : "0 %";

            // On utilise AssetCard comme "bulle" : titre + sous-titre dynamiques
            return (
              <div
                key={cat.key}
                className={`transition-transform hover:-translate-y-1 ${cat.muted ? "opacity-60" : ""}`}
              >
                <AssetCard
                  title={cat.title}
                  subtitle={`${valueLabel} • ${allocationLabel}`}
                  icon={Icon}
                  onClick={() => {
                    // Préparation pour plus tard (drill-down par catégorie)
                    console.log("Open details for category:", cat.key);
                  }}
                  // Si AssetCard accepte une prop className, tu peux ajouter :
                  // className="rounded-2xl h-full"
                />
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
