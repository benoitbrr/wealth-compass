import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const AllocationPie = () => {
  const data = [
    { name: "Immobilier", value: 55, color: "hsl(var(--chart-3))" },
    { name: "Assurance-vie", value: 21, color: "hsl(var(--secondary))" },
    { name: "Liquidités", value: 6, color: "hsl(var(--chart-1))" },
    { name: "Bourse", value: 11, color: "hsl(var(--chart-4))" },
    { name: "Crypto", value: 3, color: "hsl(var(--chart-5))" },
    { name: "Private Equity", value: 4, color: "hsl(var(--primary))" },
  ];

  return (
    <div>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
            formatter={(value: number) => [`${value}%`, ""]}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="grid grid-cols-2 gap-3 mt-4">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-muted-foreground">{item.name}</span>
            <span className="text-sm font-medium ml-auto">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllocationPie;
