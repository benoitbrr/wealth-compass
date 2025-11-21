import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle2, Info } from "lucide-react";

interface InsightCardProps {
  type: "warning" | "success" | "info";
  title: string;
  description: string;
  action: string;
}

const InsightCard = ({ type, title, description, action }: InsightCardProps) => {
  const getIcon = () => {
    switch (type) {
      case "warning": return <AlertTriangle className="w-5 h-5 text-warning" />;
      case "success": return <CheckCircle2 className="w-5 h-5 text-secondary" />;
      case "info": return <Info className="w-5 h-5 text-chart-3" />;
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case "warning": return "border-warning/20";
      case "success": return "border-secondary/20";
      case "info": return "border-chart-3/20";
    }
  };

  return (
    <Card className={`p-4 hover:shadow-md transition-shadow ${getBorderColor()}`}>
      <div className="flex items-start gap-3 mb-3">
        {getIcon()}
        <div className="flex-1">
          <h4 className="font-semibold text-sm mb-1">{title}</h4>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      <Button variant="ghost" size="sm" className="w-full text-xs">
        {action}
      </Button>
    </Card>
  );
};

export default InsightCard;
