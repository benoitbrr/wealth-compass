import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const timeRanges = [
  { label: "1J", value: "1d" },
  { label: "7J", value: "7d" },
  { label: "1M", value: "1m" },
  { label: "1A", value: "1y" },
  { label: "YTD", value: "ytd" },
  { label: "TOUT", value: "all" },
];

const data = [
  { date: "Jan", value: 850000 },
  { date: "Fév", value: 920000 },
  { date: "Mar", value: 880000 },
  { date: "Avr", value: 950000 },
  { date: "Mai", value: 1020000 },
  { date: "Juin", value: 980000 },
  { date: "Juil", value: 1050000 },
  { date: "Août", value: 1100000 },
  { date: "Sep", value: 1080000 },
  { date: "Oct", value: 1150000 },
  { date: "Nov", value: 1200000 },
  { date: "Déc", value: 1247850 },
];

const WealthEvolutionChart = () => {
  const [selectedRange, setSelectedRange] = useState("1y");

  return (
    <Card className="p-4 md:p-6 bg-card border-border hover:shadow-lg transition-shadow duration-300 w-full">
      <div className="space-y-4 md:space-y-6 w-full overflow-hidden">
        {/* Header */}
        <div className="space-y-2 w-full">
          <h3 className="text-sm font-medium text-muted-foreground">Patrimoine total</h3>
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-3">
            <span className="text-2xl md:text-3xl font-bold tracking-tight">1 247 850 €</span>
            <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm flex-wrap">
              <div className="flex items-center gap-1 text-secondary">
                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="font-medium">+12 450 €</span>
                <span className="text-muted-foreground">(+1.01%)</span>
              </div>
              <span className="text-muted-foreground">24h</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground flex-wrap">
            <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-secondary" />
            <span className="text-secondary font-medium">+32 100 €</span>
            <span>(+2.65%)</span>
            <span className="ml-1">7j</span>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="flex gap-1 bg-muted/30 dark:bg-muted/10 p-1 rounded-lg w-full sm:w-fit overflow-x-auto">
          {timeRanges.map((range) => (
            <Button
              key={range.value}
              variant={selectedRange === range.value ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setSelectedRange(range.value)}
              className={`h-7 sm:h-8 px-2 sm:px-3 text-xs font-medium transition-all flex-shrink-0 ${
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
        <div className="h-[200px] sm:h-[240px] md:h-[280px] -mx-2 w-full overflow-hidden">
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
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                tickFormatter={(value) => `${(value / 1000)}k`}
                dx={-10}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "12px",
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
