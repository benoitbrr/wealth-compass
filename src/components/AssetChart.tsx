import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const AssetChart = () => {
  const data = [
    { month: "Jan", value: 2650000 },
    { month: "Fév", value: 2680000 },
    { month: "Mar", value: 2720000 },
    { month: "Avr", value: 2710000 },
    { month: "Mai", value: 2750000 },
    { month: "Jun", value: 2780000 },
    { month: "Jul", value: 2760000 },
    { month: "Aoû", value: 2790000 },
    { month: "Sep", value: 2820000 },
    { month: "Oct", value: 2810000 },
    { month: "Nov", value: 2835000 },
    { month: "Déc", value: 2847650 },
  ];

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <XAxis 
          dataKey="month" 
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickLine={false}
        />
        <YAxis 
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickLine={false}
          tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
          }}
          formatter={(value: number) => [`${value.toLocaleString("fr-FR")} €`, "Patrimoine"]}
        />
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke="hsl(var(--secondary))" 
          strokeWidth={3}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default AssetChart;
