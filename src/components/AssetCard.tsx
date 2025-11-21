import { Card } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface AssetCardProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  onClick?: () => void;
  className?: string;
}

const AssetCard = ({ title, subtitle, icon: Icon, onClick, className }: AssetCardProps) => {
  return (
    <Card
      role={onClick ? "button" : undefined}
      onClick={onClick}
      className={cn(
        "group flex aspect-[4/3] md:aspect-square w-full flex-col items-center justify-center gap-3 rounded-2xl border border-border/60 bg-muted/40 px-4 py-5 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-card hover:shadow-lg",
        className,
      )}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div className="space-y-1">
        <h3 className="font-semibold text-sm md:text-base text-card-foreground">{title}</h3>
        <p className="text-xs md:text-sm text-muted-foreground">{subtitle}</p>
      </div>
    </Card>
  );
};

export default AssetCard;
