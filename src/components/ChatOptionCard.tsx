import { Card } from "@/components/ui/card";
import { Check, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatOptionCardProps {
  label: string;
  description?: string;
  icon?: LucideIcon;
  selected?: boolean;
  onClick: () => void;
  delay?: number;
}

const ChatOptionCard = ({ 
  label, 
  description, 
  icon: Icon, 
  selected, 
  onClick,
  delay = 0 
}: ChatOptionCardProps) => {
  return (
    <Card 
      className={cn(
        "p-4 cursor-pointer transition-all hover:shadow-premium border-2 animate-fade-in group relative overflow-hidden",
        selected 
          ? "border-secondary bg-gradient-to-br from-secondary/10 to-bnp-dark-green/10" 
          : "border-border hover:border-secondary/30"
      )}
      onClick={onClick}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className={cn(
        "absolute inset-0 bg-gradient-to-r from-secondary/5 to-transparent opacity-0 transition-opacity",
        !selected && "group-hover:opacity-100"
      )} />
      
      <div className="flex items-start gap-3 relative">
        {Icon && (
          <div className={cn(
            "p-2 rounded-lg transition-colors",
            selected ? "bg-secondary/20" : "bg-muted"
          )}>
            <Icon className={cn(
              "w-5 h-5 transition-colors",
              selected ? "text-secondary" : "text-muted-foreground"
            )} />
          </div>
        )}
        
        <div className="flex-1">
          <div className="flex items-center justify-between gap-2">
            <h4 className={cn(
              "font-semibold transition-colors",
              selected && "text-secondary"
            )}>
              {label}
            </h4>
            {selected && (
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-secondary flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ChatOptionCard;
