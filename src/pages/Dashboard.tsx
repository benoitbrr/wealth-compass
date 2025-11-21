import DashboardLayout from "@/components/DashboardLayout";
import WealthEvolutionChart from "@/components/WealthEvolutionChart";
import DonutAllocation from "@/components/DonutAllocation";
import PerformanceCard from "@/components/PerformanceCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const performanceAssets = [
  {
    name: "PEA Actions",
    value: 437747,
    change: 8755,
    changePercent: 2.04,
    sparklineData: [420000, 425000, 422000, 430000, 435000, 437747],
  },
  {
    name: "Immobilier locatif",
    value: 374356,
    change: 3744,
    changePercent: 1.01,
    sparklineData: [365000, 368000, 370000, 371000, 373000, 374356],
  },
  {
    name: "Assurance-vie",
    value: 249570,
    change: 1248,
    changePercent: 0.50,
    sparklineData: [245000, 246000, 247000, 248000, 249000, 249570],
  },
  {
    name: "Compte-titres",
    value: 124785,
    change: -1872,
    changePercent: -1.48,
    sparklineData: [130000, 128000, 127000, 126000, 125000, 124785],
  },
  {
    name: "Private Equity",
    value: 61392,
    change: 1839,
    changePercent: 3.09,
    sparklineData: [58000, 59000, 59500, 60000, 60800, 61392],
  },
];

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="p-6 space-y-6 max-w-[1400px] mx-auto">
        {/* Top Section: Chart + Donut */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <WealthEvolutionChart />
          <DonutAllocation />
        </div>

        {/* Performance Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight">Ma performance</h2>
            <span className="text-sm text-muted-foreground">Dernière mise à jour : aujourd'hui</span>
          </div>

          <ScrollArea className="w-full">
            <div className="flex gap-4 pb-4">
              {performanceAssets.map((asset) => (
                <PerformanceCard
                  key={asset.name}
                  name={asset.name}
                  value={asset.value}
                  change={asset.change}
                  changePercent={asset.changePercent}
                  sparklineData={asset.sparklineData}
                />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
