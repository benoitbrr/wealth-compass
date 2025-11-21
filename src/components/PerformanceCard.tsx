import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

interface PerformanceCardProps {
  name: string;
  value: number;
  change: number;
  changePercent: number;
  sparklineData: number[];
  icon?: string;
}

const PerformanceCard = ({
  name,
  value,
  change,
  changePercent,
  sparklineData,
}: PerformanceCardProps) => {
  const isPositive = change >= 0;
  const chartData = sparklineData.map((value, index) => ({ index, value }));

  return (
    <Card className="p-4 bg-card border-border hover:shadow-md transition-all duration-200 min-w-[280px]">
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h4 className="text-sm font-medium text-foreground">{name}</h4>
            <p className="text-2xl font-bold tracking-tight">{value.toLocaleString("fr-FR")} €</p>
          </div>
        </div>

        {/* Performance & Sparkline */}
        <div className="flex items-end justify-between gap-3">
          <div className={`flex items-center gap-1 text-sm ${isPositive ? "text-secondary" : "text-destructive"}`}>
            {isPositive ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span className="font-medium">
              {isPositive ? "+" : ""}{change.toLocaleString("fr-FR")} €
            </span>
            <span className="text-muted-foreground">
              ({isPositive ? "+" : ""}{changePercent.toFixed(2)}%)
            </span>
          </div>

          {/* Mini Sparkline */}
          <div className="h-8 w-20">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={isPositive ? "hsl(var(--secondary))" : "hsl(var(--destructive))"}
                  strokeWidth={1.5}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PerformanceCard;
