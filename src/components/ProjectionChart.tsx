import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface ProjectionChartProps {
  current: number;
  projected: number;
  years: number;
  scenario: "conservative" | "balanced" | "dynamic";
}

const ProjectionChart = ({ current, projected, years }: ProjectionChartProps) => {
  const generateData = () => {
    const data = [];
    const increment = (projected - current) / years;
    
    for (let i = 0; i <= years; i++) {
      data.push({
        year: i === 0 ? "Aujourd'hui" : `+${i}a`,
        value: Math.round(current + (increment * i)),
      });
    }
    return data;
  };

  const data = generateData();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis 
          dataKey="year" 
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
        <Area 
          type="monotone" 
          dataKey="value" 
          stroke="hsl(var(--secondary))" 
          strokeWidth={3}
          fillOpacity={1}
          fill="url(#colorValue)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default ProjectionChart;
