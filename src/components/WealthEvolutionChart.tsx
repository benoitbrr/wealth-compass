import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { usePortfolio } from "@/hooks/usePortfolio";

const timeRanges = [
  { label: "1J", value: "1d" },
  { label: "7J", value: "7d" },
  { label: "1M", value: "1m" },
  { label: "1A", value: "1y" },
  { label: "YTD", value: "ytd" },
  { label: "TOUT", value: "all" },
];

const WealthEvolutionChart = () => {
  const [selectedRange, setSelectedRange] = useState("1y");
  const { totalAssets, loading } = usePortfolio();

  // Generate flat historical data showing current total assets
  // In a real app, this would come from historical portfolio snapshots
  const data = Array.from({ length: 12 }, (_, i) => ({
    date: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"][i],
    value: totalAssets,
  }));

  if (loading) {
    return (
      <Card className="p-4 bg-card border-border w-full h-[320px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </Card>
    );
  }

  return (
    <Card className="p-4 bg-card border-border hover:shadow-lg transition-shadow duration-300 w-full h-[320px] flex flex-col">
      <div className="space-y-2 w-full overflow-hidden flex-1 flex flex-col">
        {/* Header */}
        <div className="space-y-1 w-full">
          <h3 className="text-xs font-medium text-muted-foreground">Patrimoine total</h3>
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
            <span className="text-2xl font-bold tracking-tight">
              {totalAssets.toLocaleString('fr-FR')} €
            </span>
            <div className="flex items-center gap-2 text-xs flex-wrap">
              <div className="flex items-center gap-1 text-muted-foreground">
                <TrendingUp className="w-3 h-3" />
                <span className="font-medium">0 €</span>
                <span className="text-muted-foreground">(0.00%)</span>
              </div>
              <span className="text-muted-foreground">24h</span>
            </div>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="flex gap-1 bg-muted/30 dark:bg-muted/10 p-0.5 rounded-lg w-full sm:w-fit overflow-x-auto">
          {timeRanges.map((range) => (
            <Button
              key={range.value}
              variant={selectedRange === range.value ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setSelectedRange(range.value)}
              className={`h-6 px-2 text-[10px] font-medium transition-all flex-shrink-0 ${
                selectedRange === range.value
                  ? "bg-secondary/20 text-secondary hover:bg-secondary/30"
                  : "hover:bg-muted/50 text-muted-foreground"
              }`}
            >
              {range.label}
            </Button>
          ))}
        </div>

        {/* Chart */}
        <div className="flex-1 -mx-2 w-full overflow-hidden min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--secondary))" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                dy={8}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                tickFormatter={(value) => {
                  if (value >= 1000000) return `${(value / 1000000).toFixed(0)}M`;
                  return `${(value / 1000).toFixed(0)}k`;
                }}
                dx={-8}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "11px",
                }}
                formatter={(value: number) => [`${value.toLocaleString("fr-FR")} €`, "Valeur"]}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--secondary))"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: "hsl(var(--secondary))" }}
                fill="url(#lineGradient)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
};

export default WealthEvolutionChart;
