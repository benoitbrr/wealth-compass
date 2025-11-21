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
        "group relative flex aspect-square w-full max-w-[180px] mx-auto flex-col items-center justify-center gap-2 rounded-full border border-border/60 bg-muted/30 text-card-foreground shadow-sm transition-all hover:-translate-y-1 hover:border-primary/60 hover:bg-primary/10 hover:shadow-lg",
        className,
      )}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/15 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div className="space-y-1">
        <h3 className="font-semibold text-sm md:text-base text-card-foreground">{title}</h3>
        <p className="text-xs md:text-sm text-muted-foreground break-words">{subtitle}</p>
      </div>
    </Card>
  );
};

export default AssetCard;
