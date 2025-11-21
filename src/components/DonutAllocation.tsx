import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const allocationData = [
  { name: "Actions", value: 437747, color: "hsl(var(--secondary))" },
  { name: "Immobilier", value: 374356, color: "hsl(var(--chart-2))" },
  { name: "Obligations", value: 249570, color: "hsl(var(--chart-3))" },
  { name: "Liquidités", value: 124785, color: "hsl(var(--chart-4))" },
  { name: "Private Equity", value: 61392, color: "hsl(var(--chart-5))" },
];

const DonutAllocation = () => {
  const total = allocationData.reduce((acc, item) => acc + item.value, 0);

  return (
    <Card className="p-4 bg-card border-border hover:shadow-lg transition-shadow duration-300 w-full h-[360px] flex flex-col">
      <div className="space-y-3 w-full overflow-hidden flex-1 flex flex-col">
        {/* Header */}
        <div>
          <h3 className="text-xs font-medium text-muted-foreground">Répartition</h3>
        </div>

        {/* Donut Chart */}
        <div className="relative flex-1 w-full min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={allocationData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={95}
                paddingAngle={2}
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
                  `${((value / total) * 100).toFixed(1)}%`,
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
          
          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xs text-muted-foreground font-medium">Total</span>
            <span className="text-lg font-bold tracking-tight mt-0.5">
              {total.toLocaleString("fr-FR")} €
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-1.5 w-full overflow-x-hidden">
          {allocationData.map((item) => (
            <div key={item.name} className="flex items-center justify-between text-xs gap-2">
              <div className="flex items-center gap-1.5 min-w-0 flex-1">
                <div
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-foreground truncate text-xs">{item.name}</span>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <span className="font-medium text-xs">{item.value.toLocaleString("fr-FR")} €</span>
                <span className="text-muted-foreground text-[10px]">
                  {((item.value / total) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default DonutAllocation;
