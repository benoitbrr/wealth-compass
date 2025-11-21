import DashboardLayout from "@/components/DashboardLayout";
import WealthEvolutionChart from "@/components/WealthEvolutionChart";
import DonutAllocation from "@/components/DonutAllocation";
import PerformanceCarousel from "@/components/PerformanceCarousel";

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
    changePercent: 0.5,
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
  {
    name: "Crypto",
    value: 48900,
    change: 2445,
    changePercent: 5.26,
    sparklineData: [45000, 46000, 46800, 47500, 48200, 48900],
  },
  {
    name: "Livret A",
    value: 22300,
    change: 89,
    changePercent: 0.4,
    sparklineData: [22100, 22150, 22200, 22250, 22280, 22300],
  },
];

const Dashboard = () => {
  return (
    <div className="w-full h-full overflow-x-hidden">
      <div className="px-4 py-4 md:px-6 md:py-6 space-y-4 max-w-6xl mx-auto">
        {/* Ligne du haut : courbe + donut */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.7fr_1fr] gap-4 w-full">
          <div className="w-full min-w-0">
            <WealthEvolutionChart />
          </div>
          <div className="w-full min-w-0 flex items-stretch">
            <div className="w-full h-full max-h-[340px] rounded-xl overflow-hidden">
              <DonutAllocation />
            </div>
          </div>
        </div>

        {/* Ligne du bas : Ma performance */}
        <PerformanceCarousel assets={performanceAssets} />
      </div>
    </div>
  );
};

export default Dashboard;
