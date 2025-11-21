import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface AssetCardProps {
  name: string;
  amount: number;
  change: number;
}

const AssetCard = ({ name, amount, change }: AssetCardProps) => {
  return (
    <Card className="p-4 hover:shadow-md transition-all hover:border-primary/20">
      <h3 className="font-medium mb-3 text-sm">{name}</h3>
      <p className="text-2xl font-bold mb-2">{amount.toLocaleString("fr-FR")} €</p>
      <div className="flex items-center gap-2">
        {change >= 0 ? (
          <TrendingUp className="w-4 h-4 text-secondary" />
        ) : (
          <TrendingDown className="w-4 h-4 text-destructive" />
        )}
        <span className={`text-sm font-medium ${change >= 0 ? "text-secondary" : "text-destructive"}`}>
          {change >= 0 ? "+" : ""}{change}% sur 1 an
        </span>
      </div>
    </Card>
  );
};

export default AssetCard;
