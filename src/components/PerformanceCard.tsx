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
    <Card className="p-3 bg-card border-border hover:shadow-md transition-all duration-200 w-[280px] flex-shrink-0">
      <div className="space-y-2 w-full overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between w-full">
          <div className="space-y-0.5 min-w-0 flex-1">
            <h4 className="text-xs font-medium text-foreground truncate">{name}</h4>
            <p className="text-xl font-bold tracking-tight">{value.toLocaleString("fr-FR")} €</p>
          </div>
        </div>

        {/* Performance & Sparkline */}
        <div className="flex items-end justify-between gap-2 w-full">
          <div className={`flex items-center gap-1 text-xs flex-1 min-w-0 ${isPositive ? "text-secondary" : "text-destructive"}`}>
            {isPositive ? (
              <TrendingUp className="w-3 h-3 flex-shrink-0" />
            ) : (
              <TrendingDown className="w-3 h-3 flex-shrink-0" />
            )}
            <span className="font-medium truncate">
              {isPositive ? "+" : ""}{change.toLocaleString("fr-FR")} €
            </span>
            <span className="text-muted-foreground flex-shrink-0 text-[10px]">
              ({isPositive ? "+" : ""}{changePercent.toFixed(2)}%)
            </span>
          </div>

          {/* Mini Sparkline */}
          <div className="h-7 w-16 flex-shrink-0">
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
