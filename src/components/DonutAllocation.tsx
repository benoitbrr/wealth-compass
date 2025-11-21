import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { usePortfolio } from "@/hooks/usePortfolio";

const DonutAllocation = () => {
  const { accounts, positions, totalAssets, loading } = usePortfolio();

  // Build allocation data from real portfolio data
  const allocationData = [];
  
  // Add cash from accounts
  const totalCash = accounts.reduce((sum, acc) => sum + Number(acc.balance), 0);
  if (totalCash > 0) {
    allocationData.push({
      name: "Liquidités",
      value: totalCash,
      color: "hsl(var(--chart-1))",
    });
  }

  // Group positions by asset type
  const positionsByType: Record<string, number> = {};
  positions.forEach((pos) => {
    const type = pos.asset_type;
    positionsByType[type] = (positionsByType[type] || 0) + Number(pos.current_value);
  });

  // Add positions to allocation data with appropriate colors
  const colorMap: Record<string, string> = {
    STOCK: "hsl(var(--secondary))",
    FUND: "hsl(var(--chart-2))",
    ETF: "hsl(var(--chart-3))",
    BOND: "hsl(var(--chart-4))",
    REAL_ESTATE: "hsl(var(--chart-5))",
    SCPI: "hsl(var(--chart-5))",
    PE: "hsl(var(--primary))",
    CRYPTO: "hsl(var(--accent))",
  };

  Object.entries(positionsByType).forEach(([type, value]) => {
    allocationData.push({
      name: type,
      value,
      color: colorMap[type] || "hsl(var(--muted))",
    });
  });

  if (loading) {
    return (
      <Card className="p-4 bg-card border-border w-full h-[320px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </Card>
    );
  }

  return (
    <Card className="p-4 bg-card border-border hover:shadow-lg transition-shadow duration-300 w-full h-[320px] max-h-[320px] flex flex-col overflow-hidden">
      <div className="space-y-2 w-full h-full flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0">
          <h3 className="text-xs font-medium text-muted-foreground">Répartition</h3>
        </div>

        {/* Donut Chart */}
        <div className="relative w-full h-[160px] max-h-[160px] flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={allocationData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={allocationData.length > 1 ? 2 : 0}
                dataKey="value"
              >
                {allocationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
                formatter={(value: number) => [
                  `${value.toLocaleString("fr-FR")} €`,
                  `${((value / totalAssets) * 100).toFixed(1)}%`,
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
          
          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[10px] text-muted-foreground font-medium">Total</span>
            <span className="text-base font-bold tracking-tight mt-0.5">
              {totalAssets.toLocaleString("fr-FR")} €
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-1 w-full overflow-y-auto flex-1">
          {allocationData.length === 0 ? (
            <div className="text-xs text-muted-foreground text-center py-4">
              Aucune allocation pour le moment
            </div>
          ) : (
            allocationData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs gap-2">
                <div className="flex items-center gap-1.5 min-w-0 flex-1">
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-foreground truncate text-[11px]">{item.name}</span>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <span className="font-medium text-[11px]">{item.value.toLocaleString("fr-FR")} €</span>
                  <span className="text-muted-foreground text-[10px]">
                    {((item.value / totalAssets) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Card>
  );
};

export default DonutAllocation;
